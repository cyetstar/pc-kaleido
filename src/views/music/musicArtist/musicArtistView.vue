<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 00:14:19
 * @Description: 艺术家详情页面
-->
<template>
  <section class="h-page-section">
    <div class="relative">
      <h-title-module title="艺人信息" class="mb-6" />
      <a-row :gutter="16">
        <h-col :span="8">
          <div class="flex justify-center">
            <div class="w-xs">
              <h-plex-image :plex-thumb="record.thumb" />
            </div>
          </div>
        </h-col>
        <h-col :span="16">
          <h1>{{ record.title }}</h1>
          <p>{{ record.area }}</p>
          <p>{{ record.summary }}</p>
          <p>
            <a
              v-if="record.musicbrainzId"
              target="_blank"
              :href="'https://musicbrainz.org/release/' + record.musicbrainzId"
              class="pr-15px"
              ><img width="30" :src="musicbrainz" class="inline" />
            </a>
            <a target="_blank" href="" class="pr-15px"
              ><img width="30" :src="plex" class="inline"
            /></a>
            <a
              v-if="record.neteaseId"
              target="_blank"
              :href="'https://music.163.com/#/artist?id=' + record.neteaseId"
              class="pr-15px"
              ><img width="30" :src="netease" class="inline" />
            </a>
          </p>
        </h-col>
      </a-row>
      <div class="absolute right-0 top-0">
        <a-space>
          <h-button @click="onSyncPlexById">同步Plex</h-button>
          <h-button @click="onSearchNetease">匹配网易云</h-button>
        </a-space>
      </div>
    </div>

    <div class="mt-8">
      <h-title-module title="专辑列表" class="mb-6" />
      <a-row :gutter="16">
        <template :key="albumRecord.id" v-for="albumRecord in albumRecords">
          <a-col :span="4" class="mb-16px">
            <a-card>
              <template #cover>
                <h-plex-image
                  class="cover"
                  :preview="false"
                  :plex-thumb="albumRecord.thumb"
                  @click="onViewRecord(albumRecord.id)"
                />
              </template>
              <a-card-meta :title="albumRecord.title"></a-card-meta>
            </a-card>
          </a-col>
        </template>
      </a-row>
    </div>
  </section>

  <music-artist-search-netease
    ref="refMusicArtistSearchNetease"
    @match-success="onMatchSuccess"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  apiMusicArtistSyncPlexById,
  apiMusicArtistView,
} from "@/api/music/musicArtistApi.ts";
import musicbrainz from "@/assets/images/musicbrainz.png";
import plex from "@/assets/images/plex.png";
import netease from "@/assets/images/netease.png";
import { apiMusicAlbumListByArtistId } from "@/api/music/musicAlbumApi";
import { message } from "ant-design-vue";
import MusicArtistSearchNetease from "@/views/music/musicArtist/musicArtistSearchNetease.vue";

const route = useRoute();
const router = useRouter();
const id = route.query.id;

const record = ref({});
const albumRecords = ref([]);
const refMusicArtistSearchNetease = ref();
const initData = () => {
  apiMusicArtistView({ id }).then((res) => (record.value = res));
  apiMusicAlbumListByArtistId({ artistId: id }).then(
    (res) => (albumRecords.value = res)
  );
};

const onViewRecord = (id) => {
  router.push({ path: "/music/musicAlbum/view", query: { id } });
};

const onSyncPlexById = () => {
  apiMusicArtistSyncPlexById({ id }).then(() => {
    message.success("同步成功");
  });
};

const onSearchNetease = () => {
  refMusicArtistSearchNetease.value.show(record.value);
};

const onMatchSuccess = ({ neteaseId }) => {
  record.value.neteaseId = neteaseId;
};

onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped></style>

<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品详情页面
-->
<template>
  <section class="h-page-section">
    <div class="relative">
      <h-title-module title="专辑信息" class="mb-6" />
      <a-row :gutter="16">
        <h-col :span="8">
          <div class="flex justify-center">
            <div class="w-xs">
              <h-plex-image :plex-thumb="record.plexThumb" />
            </div>
          </div>
        </h-col>
        <h-col :span="16">
          <h1>{{ record.title }}</h1>
          <h1>
            <a
              v-for="artist in record.musicArtistDTOList"
              @click="onViewArtist(artist.id)"
              >{{ artist.name }}</a
            >
          </h1>
          <p>{{ record.date }}</p>
          <p>{{ record.label }}</p>
          <p>
            <a-tag v-if="record.type">{{ record.type }}</a-tag>
            <a-tag v-if="record.genre">{{ record.genre }}</a-tag>
            <a-tag v-if="record.media">{{ record.media }}</a-tag>
          </p>
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
              :href="'https://music.163.com/#/album?id=' + record.neteaseId"
              class="pr-15px"
              ><img width="30" :src="netease" class="inline" />
            </a>
          </p>
        </h-col>
      </a-row>
      <div class="absolute right-0 top-0">
        <a-space>
          <h-button @click="onUpdateAudioTag">读取Tag</h-button>
          <h-button @click="onSearchNetease">匹配网易云</h-button>
          <h-button :disabled="!record.neteaseId" @click="onDownloadLyric"
            >下载歌词
          </h-button>
        </a-space>
      </div>
    </div>

    <div class="mt-8">
      <h-title-module title="歌曲列表" class="mb-6" />
      <a-table :pagination="false" size="small" :data-source="trackRecords">
        <a-table-column
          title="曲号"
          width="10%"
          data-index="trackNumber"
          align="center"
        ></a-table-column>
        <a-table-column
          title="歌名"
          width="75%"
          data-index="title"
        ></a-table-column>
        <a-table-column title="歌词" width="5%" align="center">
          <template #="{ record }">
            <file-text-outlined
              v-if="record.sfygc === '1'"
              @click="onViewLyrics(record)"
            />
          </template>
        </a-table-column>
        <a-table-column
          title="曲长"
          width="10%"
          data-index="lengthLabel"
          align="center"
        >
        </a-table-column>
      </a-table>
    </div>

    <a-modal v-model:visible="modalLyricsVisible" :footer="null">
      <template #title>“{{ modalLyricsTitle }}”歌词</template>
      <template v-for="lyrics in lyrics">
        <p>{{ lyrics }}</p>
      </template>
    </a-modal>

    <music-album-search-netease
      ref="refMusicAlbumSearchNetease"
      @match-success="onMatchSuccess"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  apiMusicAlbumDownloadLyric,
  apiMusicAlbumUpdateAudioTag,
  apiMusicAlbumView,
} from "@/api/music/musicAlbumApi.ts";
import {
  apiMusicTrackViewLyrics,
  apiMusicTrackListByAlbumId,
} from "@/api/music/musicTrackApi";
import { message } from "ant-design-vue";
import { FileTextOutlined } from "@ant-design/icons-vue";
import musicbrainz from "@/assets/images/musicbrainz.png";
import plex from "@/assets/images/plex.png";
import netease from "@/assets/images/netease.png";
import MusicAlbumSearchNetease from "@/views/music/musicAlbum/musicAlbumSearchNetease.vue";

const route = useRoute();
const id = route.query.id;

const record = ref({});
const trackRecords = ref([]);
const modalLyricsVisible = ref(false);
const modalLyricsTitle = ref();
const lyrics = ref();

const refMusicAlbumSearchNetease = ref();

const initData = () => {
  Promise.all([
    apiMusicAlbumView({ id }),
    apiMusicTrackListByAlbumId({ albumId: id }),
  ]).then(([res1, res2]) => {
    record.value = res1;
    trackRecords.value = res2;
  });
};

const router = useRouter();
const onViewArtist = (id) => {
  router.push({ path: "/music/musicArtist/view", query: { id } });
};

const onUpdateAudioTag = () => {
  apiMusicAlbumUpdateAudioTag({ id }).then((res) => {
    message.success("读取成功");
    initData();
  });
};

const onSearchNetease = () => {
  refMusicAlbumSearchNetease.value.show(record.value);
};

const onMatchSuccess = ({ neteaseId }) => {
  record.value.neteaseId = neteaseId;
};

const onDownloadLyric = () => {
  apiMusicAlbumDownloadLyric({ id: record.value.id }).then(() => {
    message.success("下载成功");
    initData();
  });
};

const onViewLyrics = (record) => {
  apiMusicTrackViewLyrics({ id: record.id }).then((res) => {
    lyrics.value = res;
    modalLyricsTitle.value = record.bt;
    modalLyricsVisible.value = true;
  });
};

onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped></style>

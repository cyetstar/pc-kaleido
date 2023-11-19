<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 00:14:19
 * @Description: 艺术家详情页面
-->
<template>
  <section class="h-page-section">
    <div class="relative">
      <h-title-module title="艺人信息" />
      <a-row :gutter="16" class="mt-6">
        <h-col :span="8">
          <div class="flex justify-center">
            <div class="w-xs">
              <h-plex-image :plex-thumb="record.plexThumb" />
            </div>
          </div>
        </h-col>
        <h-col :span="16">
          <h1>{{ record.mc }}</h1>
          <p>
            <a-tag v-if="record.gjdq">{{ record.gjdq }}</a-tag>
            <a-tag v-if="record.ysjlx">{{ record.ysjlx }}</a-tag>
          </p>
          <p>{{ record.plexId }}</p>
          <p>{{ record.jj }}</p>
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
          <h-button @click="onSearchNetease">匹配网易云</h-button>
        </a-space>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { musicArtistViewApi } from "@/api/music/musicArtistApi.ts";
import musicbrainz from "@/assets/images/musicbrainz.png";
import plex from "@/assets/images/plex.png";
import netease from "@/assets/images/netease.png";
import HPlexImage from "@c/common/PlexImage/PlexImage.vue";

const route = useRoute();
const id = route.query.id;

const record = ref({});
const initData = () => {
  musicArtistViewApi({ id }).then((res) => {
    record.value = res;
  });
};
onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped></style>

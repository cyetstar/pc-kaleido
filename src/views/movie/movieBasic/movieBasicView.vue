<!--
 * @Author: cyetstar
 * @Date: 2023-11-26 01:20:15
 * @Description: 电影详情页面
-->
<template>
  <section class="h-page-section">
    <div class="relative">
      <h-title-module title="电影信息" class="mb-6" />
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
          <p>{{ record.originalTitle }}</p>
          <p>{{ record.year }}</p>
          <p>{{ record.studio }}</p>
          <p>{{ record.rating }}</p>
          <p>
            <a-tag v-if="record.contentRating">{{
              record.contentRating
            }}</a-tag>
          </p>
          <p>{{ record.summary }}</p>
          <p>
            <a
              v-if="record.imdb"
              target="_blank"
              :href="'https://musicbrainz.org/release/' + record.imdb"
              class="pr-15px"
              ><img width="30" :src="musicbrainz" class="inline" />
            </a>
            <a target="_blank" href="" class="pr-15px"
              ><img width="30" :src="plex" class="inline"
            /></a>
          </p>
        </h-col>
      </a-row>
      <div class="absolute right-0 top-0">
        <a-space>
          <h-button @click="onUpdateAudioTag">读取Tag</h-button>
          <h-button @click="onSyncPlexById">同步Plex</h-button>
          <h-button @click="onSearchNetease">匹配网易云</h-button>
          <h-button :disabled="!record.neteaseId" @click="onDownloadLyric"
            >下载歌词
          </h-button>
        </a-space>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { apiMovieBasicView } from "@/api/movie/movieBasicApi.ts";
import musicbrainz from "@/assets/images/musicbrainz.png";
import plex from "@/assets/images/plex.png";
import netease from "@/assets/images/netease.png";

const route = useRoute();
const id = route.query.id;

const record = ref({});
const initData = async () => {
  const res = await apiMovieBasicView({ id });
  record.value = res;
};
onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped>
.view-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20;
}

.view-item {
  width: 50%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;

  &-label {
    min-width: 90px;
  }

  &-value {
    flex: 1;
  }
}
</style>

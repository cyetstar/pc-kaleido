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
              <h-plex-image class="h-poster" :plex-thumb="record.thumb" />
            </div>
          </div>
        </h-col>
        <h-col :span="16">
          <h1 class="text-18px">{{ record.title }}</h1>
          <p>{{ record.originalTitle }} ({{ record.year }})</p>
          <p>{{ record.studio }}</p>
          <p class="flex">
            <span class="mr-2">{{ record.rating }} 分</span>
            <a-rate v-model:value="rating" disabled allow-half />
          </p>
          <p>
            <a-tag v-if="record.contentRating"
              >{{ record.contentRating }}
            </a-tag>
            <a-tag v-for="item in record.countryList" :key="item.id"
              >{{ item.idLabel }}
            </a-tag>
            <a-tag v-for="item in record.genreList" :key="item.id"
              >{{ item.idLabel }}
            </a-tag>
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
          <h-button @click="onReadNFO">读取NFO</h-button>
          <h-button @click="onSyncPlexById">同步Plex</h-button>
        </a-space>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
  apiMovieBasicView,
  apiMovieReadNFO,
} from "@/api/movie/movieBasicApi.ts";
import musicbrainz from "@/assets/images/musicbrainz.png";
import plex from "@/assets/images/plex.png";
import { message } from "ant-design-vue";

const route = useRoute();
const id = route.query.id;
const rating = computed(() => record.value.rating / 2);

const record = ref({});
const initData = async () => {
  apiMovieBasicView({ id }).then((res) => (record.value = res));
};

const onReadNFO = () => {
  apiMovieReadNFO({ id }).then((res) => {
    if (res) {
      message.success("读取成功");
      initData();
    } else {
      message.error("读取失败");
    }
  });
};

const onSyncPlexById = () => {
  apiMovieBasicSyncPlex({ id }).then((res) => {
    if (res) {
      message.success("同步成功");
    } else {
      message.error("同步失败");
    }
  });
};
onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped></style>

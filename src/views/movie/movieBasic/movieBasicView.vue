<!--
 * @Author: cyetstar
 * @Date: 2023-11-26 01:20:15
 * @Description: 电影详情页面
-->
<template>
  <section class="h-page-section">
    <a-page-header :title="record.title" @back="() => $router.go(-1)">
      <template #backIcon>
        <LeftOutlined/>
      </template>
      <template #extra>
        <a-space>
          <h-button @click="onReadNFO">读取NFO</h-button>
          <h-button @click="onSyncPlexById">同步Plex</h-button>
        </a-space>
      </template>
    </a-page-header>
    <a-row>
      <h-col :span="8">
        <div class="flex justify-center">
          <k-plex-image
              class="h-poster"
              style="width: 250px"
              :plex-thumb="record.thumb"
          />
        </div>
      </h-col>
      <h-col :span="16" class="pr-20px">
        <p>{{ record.originalTitle }} ({{ record.year }})</p>
        <p>{{ record.studio }}</p>
        <p class="flex">
          <span class="mr-2">{{ record.rating }} 分</span>
          <a-rate v-model:value="rating" disabled allow-half/>
        </p>
        <p>
          <a-tag v-if="record.contentRating">{{ record.contentRating }}</a-tag>
          <a-tag v-for="item in record.countryList" :key="item.id"
          >{{ item.idLabel }}
          </a-tag>
          <a-tag v-for="item in record.genreList" :key="item.id"
          >{{ item.idLabel }}
          </a-tag>
          <a-tag v-for="item in record.languageList" :key="item.id"
          >{{ item.idLabel }}
          </a-tag>
          <a-tag v-for="item in record.tagList" :key="item">{{ item }}</a-tag>
        </p>
        <p>
          <section v-for="(item, index) in record.summaryList" :key="index">
            {{ item }}
          </section>
        </p>
        <p class="flex">
          <span class="mr-2">导演:</span>
          <span class="flex-1">
            <template v-for="(item, index) in record.directorList">
              <span v-if="index !== 0" class="px-2">/</span>
              <a @click="onViewArtist(item.id)">{{ item.name }}</a>
            </template>
          </span>
        </p>
        <p class="flex">
          <span class="mr-2">编剧:</span>
          <span class="flex-1">
            <template v-for="(item, index) in record.writerList">
              <span v-if="index !== 0" class="px-2">/</span>
              <a @click="onViewArtist(item.id)">{{ item.name }}</a>
            </template>
          </span>
        </p>
        <p class="flex">
          <span class="mr-2">主演:</span>
          <span class="flex-1">
            <template v-for="(item, index) in record.actorList">
              <span v-if="index !== 0" class="px-2">/</span>
              <a @click="onViewArtist(item.id)">{{ item.name }}</a>
            </template>
          </span>
        </p>
        <p class="flex" v-if="isNotEmpty(record.akaList)">
          <span class="mr-2">又名:</span>
          <span class="flex-1">
            <template v-for="(item, index) in record.akaList">
              <span v-if="index !== 0" class="px-2">/</span>
              {{ item }}
            </template>
          </span>
        </p>
        <p class="flex" v-if="isNotEmpty(record.website)">
          <span class="mr-2">官网:</span>
          <span class="flex-1">{{ record.website }}</span>
        </p>
        <p>
          <k-logo-link type="plex" :id="record.id" class="mr-3"/>
          <k-logo-link type="imdb" :id="record.imdb" class="mr-3"/>
          <k-logo-link type="douban" :id="record.doubanId" class="mr-3"/>
        </p>
      </h-col>
    </a-row>
  </section>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import {useRoute} from "vue-router";
import {
  apiMovieBasicReadNFO,
  apiMovieBasicSyncPlex,
  apiMovieBasicView,
} from "@/api/movie/movieBasicApi.ts";
import {message} from "ant-design-vue";
import {LeftOutlined} from "@ant-design/icons-vue";
import {isEmpty, isNotEmpty} from "@/utils/is";

const route = useRoute();
const id = route.query.id;
const rating = computed(() => record.value.rating / 2);

const record = ref({});
const initData = async () => {
  apiMovieBasicView({id}).then((res) => {
    res.tagList = res.tagList.filter(s =>
        // 过滤已经存在的tag记录
        !res.countryList.some(item => item.idLabel === s)
        && !res.languageList.some(item => item.idLabel === s)
        && !res.genreList.some(item => item.idLabel === s)
    );
    console.log(res.tagList)
    record.value = res
  });
};

const onReadNFO = () => {
  apiMovieBasicReadNFO({id}).then((res) => {
    if (res) {
      message.success("读取成功");
      initData();
    } else {
      message.error("读取失败");
    }
  });
};

const onSyncPlexById = () => {
  apiMovieBasicSyncPlex({id}).then((res) => {
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

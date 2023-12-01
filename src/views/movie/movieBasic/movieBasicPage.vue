<!--
 * @Author: cyetstar
 * @Date: 2023-11-26 01:20:15
 * @Description: 电影列表页面
-->
<template>
  <section class="h-form-wrapper">
    <div class="h-page-header">
      <!--    <h-form-search-->
      <!--      v-model:form="searchForm"-->
      <!--      @search="onSearch"-->
      <!--      @reset="onReset"-->
      <!--    >-->
      <!--      <h-col :span="6">-->
      <!--        <h-input label="电影名" v-model:value="searchForm.title" name="title" />-->
      <!--      </h-col>-->
      <!--      <h-col :span="6">-->
      <!--        <h-input-->
      <!--          label="原片名"-->
      <!--          v-model:value="searchForm.originalTitle"-->
      <!--          name="originalTitle"-->
      <!--        />-->
      <!--      </h-col>-->
      <!--    </h-form-search>-->

      <a-space class="h-btn-space">
        <h-button type="primary" @click="onSyncPlex">同步Plex</h-button>
      </a-space>
    </div>
    <div class="h-form-body" ref="refScrollGrid" @scroll="onScrollGrid">
      <div v-if="pageResult.records.length === 0">
        <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" />
      </div>
      <div v-else class="grid grid-cols-24 gap-x-3 gap-y-3">
        <template :key="record.id" v-for="record in pageResult.records">
          <a-card class="col-span-3">
            <template #cover>
              <h-plex-image
                class="h-poster"
                :preview="false"
                :plex-thumb="record.thumb"
                @click="onViewRecord(record.id)"
              />
            </template>
            <a-card-meta
              :title="record.title"
              :description="record.year"
            ></a-card-meta>
          </a-card>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onActivated } from "vue";
import {
  apiMovieBasicPage,
  apiMovieBasicSyncPlex,
} from "@/api/movie/movieBasicApi.ts";

import { Empty, message } from "ant-design-vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";

const router = useRouter();
const appStore = useAppStore();
const refScrollGrid = ref();
const loading = ref(true);
const searchForm = ref({});
const pageResult = ref({
  records: [],
  pageNumber: 0,
  pageSize: 36,
});

onMounted(() => {
  loadData({ ...searchForm.value });
});

onActivated(() => {
  refScrollGrid.value.scrollTop = appStore.getScrollTop("movie");
});

onBeforeRouteLeave((to, from, next) => {
  appStore.setScrollTop(refScrollGrid.value.scrollTop, "movie");
  next();
});

const loadData = () => {
  loading.value = true;
  const data = {
    pageNumber: pageResult.value.pageNumber + 1,
    pageSize: pageResult.value.pageSize,
    searchCount: true,
  };
  apiMovieBasicPage(data).then((res) => {
    loading.value = false;
    pageResult.value.records.push(...res.records);
    pageResult.value.pageNumber = res.pageNumber;
    pageResult.value.pageSize = res.pageSize;
  });
};

const onViewRecord = (id) => {
  router.push({ path: "/movie/movieBasic/view", query: { id } });
};

const onSyncPlex = () => {
  apiMovieBasicSyncPlex().then((res) => {
    message.success("同步完成");
  });
};

const onScrollGrid = () => {
  const containerHeight = refScrollGrid.value.clientHeight;
  // 获取滚动容器滚动的高度
  const scrollHeight = refScrollGrid.value.scrollHeight;
  // 获取滚动容器滚动的距离
  const scrollTop = refScrollGrid.value.scrollTop;
  // 判断是否滑倒底部
  if (
    containerHeight + scrollTop >= scrollHeight - 50 &&
    loading.value !== true
  ) {
    loadData();
  }
};
</script>

<style lang="less" scoped></style>

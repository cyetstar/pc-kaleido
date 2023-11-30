<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品列表页面
-->
<template>
  <section class="h-form-wrapper">
    <div class="h-page-header">
      <!--    <h-form-search-->
      <!--      ref="refFormSearch"-->
      <!--      v-model:form="searchForm"-->
      <!--      @search="onSearch"-->
      <!--      @reset="onReset"-->
      <!--    >-->
      <!--      <h-col :span="6">-->
      <!--        <h-input label="标题" v-model:value="searchForm.title" name="title" />-->
      <!--      </h-col>-->
      <!--      <h-col :span="6">-->
      <!--        <h-input-->
      <!--          label="艺术家"-->
      <!--          v-model:value="searchForm.artists"-->
      <!--          name="artists"-->
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
                class="h-cover"
                type="music"
                :preview="false"
                :plex-thumb="record.thumb"
                @click="onViewRecord(record.id)"
              />
            </template>
            <a-card-meta
              :title="record.title"
              :description="
                record.artists ||
                '--' + ' (' + (record.originallyAvailableAt || '?') + ')'
              "
            >
            </a-card-meta>
          </a-card>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onActivated } from "vue";
import {
  apiMusicAlbumPage,
  apiMusicAlbumSyncPlex,
} from "@/api/music/musicAlbumApi.ts";

import { Empty, message } from "ant-design-vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";

const refScrollGrid = ref();
const searchForm = ref({});
const pageResult = ref({
  records: [],
  pageNumber: 0,
  pageSize: 36,
});
let route = useRoute();

onMounted(() => {
  loadData({ ...searchForm.value });
});

onActivated(() => {
  refScrollGrid.value.scrollTop = appStore.$state.scrollTop;
});

const appStore = useAppStore();
onBeforeRouteLeave((to, from, next) => {
  appStore.setScrollTop(refScrollGrid.value.scrollTop);
  next();
});

const onSyncPlex = () => {
  apiMusicAlbumSyncPlex().then((res) => {
    message.success("同步完成");
  });
};

const loadData = () => {
  loading.value = true;
  const data = {
    pageNumber: pageResult.value.pageNumber + 1,
    pageSize: pageResult.value.pageSize,
    searchCount: true,
  };
  apiMusicAlbumPage(data).then((res) => {
    loading.value = false;
    pageResult.value.records.push(...res.records);
    pageResult.value.pageNumber = res.pageNumber;
    pageResult.value.pageSize = res.pageSize;
  });
};

const router = useRouter();
const onViewRecord = (id) => {
  router.push({ path: "/music/musicAlbum/view", query: { id } });
};
const loading = ref(false);
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

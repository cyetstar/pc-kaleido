<!--
 * @Author: cyetstar
 * @Date: 2023-11-28 01:40:40
 * @Description: 剧集列表页面
-->
<template>
  <section class="k-page-section">
    <div class="px-24px">
      <a-space class="h-btn-space">
        <h-button type="primary" @click="onSyncPlex">同步Plex</h-button>
      </a-space>
    </div>
    <section ref="refScrollGrid" @scroll="onScrollGrid">
      <div v-if="pageResult.records.length === 0">
        <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" />
      </div>
      <div v-else class="grid grid-cols-24 gap-6">
        <template :key="record.id" v-for="record in pageResult.records">
          <a-card class="k-card col-span-3">
            <template #cover>
              <k-plex-image
                class="h-poster cursor-pointer"
                :preview="false"
                :plex-thumb="record.thumb"
                @click="onViewRecord(record.id)"
              />
            </template>
            <a-card-meta :title="record.title" :description="record.year">
            </a-card-meta>
          </a-card>
        </template>
      </div>
    </section>
  </section>
</template>

<script setup>
import { Empty, message } from "ant-design-vue";
import { onActivated, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { apiTvshowShowPage } from "@/api/tvshow/tvshowShowApi";
import { apiTvshowEpisodeSyncPlex } from "@/api/tvshow/tvshowEpisodeApi";
import { useAppStore } from "@/store/modules/app";

const router = useRouter();
const appStore = useAppStore();
const refScrollGrid = ref();
const searchForm = ref({});
const loading = ref(false);
const pageResult = ref({
  records: [],
  pageNumber: 0,
  pageSize: 36,
});

onMounted(() => {
  loadData({ ...searchForm.value });
});

onActivated(() => {
  refScrollGrid.value.scrollTop = appStore.getScrollTop("tvshow");
});

onBeforeRouteLeave((to, from, next) => {
  appStore.setScrollTop(refScrollGrid.value.scrollTop, "tvshow");
  next();
});

const onSyncPlex = () => {
  apiTvshowEpisodeSyncPlex().then((res) => {
    if (res) {
      message.success("开始同步");
    }
  });
};

const onViewRecord = (id) => {
  router.push({ path: "/tvshow/tvshowShow/view", query: { id } });
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
const loadData = () => {
  loading.value = true;
  const data = {
    pageNumber: pageResult.value.pageNumber + 1,
    pageSize: pageResult.value.pageSize,
    searchCount: true,
  };
  apiTvshowShowPage(data).then((res) => {
    loading.value = false;
    pageResult.value.records.push(...res.records);
    pageResult.value.pageNumber = res.pageNumber;
    pageResult.value.pageSize = res.pageSize;
  });
};
</script>

<style lang="less" scoped></style>

<!--
 * @Author: cyetstar
 * @Date: 2023-11-26 01:20:15
 * @Description: 电影列表页面
-->
<template>
  <section class="k-page-section">
    <div class="k-search-form">
      <div class="flex justify-between items-center">
        <a-form :model="searchForm">
          <h-input
            v-model:value="searchForm.keyword"
            placeholder="关键字"
            search
            @search="onSearch"
          />
        </a-form>
        <a-space>
          <h-button @click="onUpdateSource">更新源</h-button>
          <h-button @click="onReadNFO">读取NFO</h-button>
          <h-button @click="onSyncPlex">同步Plex</h-button>
          <h-button @click="onOpenDownloadFolder">打开下载目录</h-button>
        </a-space>
      </div>
      <div class="flex justify-between items-center mt-4 mb-2">
        <div class="flex items-center">
          <a-cascader :options="dicts" @change="onChangeFilter">
            <a href="#" v-if="isEmpty(filterText)">筛选</a>
            <a href="#" v-else> {{ filterText }} </a>
          </a-cascader>
          <close-circle-outlined
            v-if="isNotEmpty(filterText)"
            class="ml-2 cursor-pointer"
            @click="onClearFilter"
          />
        </div>
        <div>总记录数: {{ pageResult.total }}</div>
      </div>
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
            <a-card-meta
              :title="record.title"
              :description="record.year"
            ></a-card-meta>
          </a-card>
        </template>
      </div>
    </section>
  </section>
  <movie-basic-download-folder ref="refMovieBasicDownloadFolder" />
</template>

<script setup>
import { ref, onMounted, onActivated } from "vue";
import {
  apiMovieBasicPage,
  apiMovieBasicReadNFO,
  apiMovieBasicSyncPlex,
  apiMovieBasicUpdateSource,
} from "@/api/movie/movieBasicApi.ts";

import { Empty, message } from "ant-design-vue";
import { DownOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import MovieBasicDownloadFolder from "@/views/movie/movieBasic/movieBasicDownloadFolder.vue";
import { apiSysDictListByDictType } from "@/api/sysadmin/sysDictApi";
import { isEmpty, isNotEmpty } from "@ht/util";

const router = useRouter();
const appStore = useAppStore();
const dicts = ref([
  {
    label: "类型",
    value: "genre",
  },
  {
    label: "国家地区",
    value: "country",
  },
  {
    label: "分级",
    value: "contentRating",
  },
  {
    label: "年代",
    value: "decade",
  },
  {
    label: "年份",
    value: "year",
  },
]);
const refScrollGrid = ref();
const refMovieBasicDownloadFolder = ref();
const loading = ref(true);
const searchForm = ref({});
const pageResult = ref({
  records: [],
  pageNumber: 0,
  pageSize: 100,
});
const filterText = ref();

onMounted(() => {
  loadData();
  initFilter();
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
    ...searchForm.value,
  };
  apiMovieBasicPage(data).then((res) => {
    loading.value = false;
    pageResult.value.records.push(...res.records);
    pageResult.value.pageNumber = res.pageNumber;
    pageResult.value.pageSize = res.pageSize;
    pageResult.value.total = res.total;
  });
};

const onSearch = () => {
  pageResult.value.pageNumber = 0;
  pageResult.value.records = [];
  loadData();
};

const onViewRecord = (id) => {
  router.push({ path: "/movie/movieBasic/view", query: { id } });
};

const onUpdateSource = () => {
  apiMovieBasicUpdateSource().then((res) => {
    message.success("开始更新");
  });
};

const onSyncPlex = () => {
  apiMovieBasicSyncPlex().then((res) => {
    message.success("开始同步");
  });
};

const onReadNFO = () => {
  apiMovieBasicReadNFO().then((res) => {
    message.success("开始处理");
  });
};

const onOpenDownloadFolder = () => {
  refMovieBasicDownloadFolder.value.show();
};

const initFilter = () => {
  dicts.value.forEach((s) => {
    let type = appStore.$state.config["plexMovieLibraryId"] + s.value;
    apiSysDictListByDictType(type).then((r) => {
      s.children = r.map((m) => ({ label: m.text, value: m.value }));
    });
  });
};

const clearFilter = () => {
  filterText.value = null;
  dicts.value.forEach((s) => {
    searchForm.value[s.value] = null;
  });
};

const onChangeFilter = (value, selectedOptions) => {
  clearFilter();
  filterText.value = selectedOptions.map((s) => s.label).join(" : ");
  searchForm.value[value[0]] = value[1];
  onSearch();
};

const onClearFilter = () => {
  clearFilter();
  onSearch();
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

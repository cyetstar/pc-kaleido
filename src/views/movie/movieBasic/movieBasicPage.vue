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
          <h-button @click="onMovieUpdateSource"
            >{{
              appStore.actions["movieUpdateSource"] ? "取消更新" : "更新文件源"
            }}
          </h-button>
          <h-button @click="onMovieCheckThreadStatus"
            >{{
              appStore.actions["movieCheckThreadStatus"]
                ? "取消检测"
                : "检测发布"
            }}
          </h-button>
          <h-button @click="onMovieMatchInfo"
            >{{ appStore.actions["movieMatchInfo"] ? "取消匹配" : "匹配信息" }}
          </h-button>
          <h-button @click="onMovieReadNFO"
            >{{ appStore.actions["movieReadNFO"] ? "取消读取" : "读取NFO" }}
          </h-button>
          <h-button @click="onMovieExportNFO"
            >{{ appStore.actions["movieExportNFO"] ? "取消导出" : "导出NFO" }}
          </h-button>
          <h-button @click="onMovieSyncPlex"
            >{{ appStore.actions["movieSyncPlex"] ? "取消同步" : "同步Plex" }}
          </h-button>
          <h-button @click="onMovieAnalyze"
            >{{ appStore.actions["movieAnalyze"] ? "取消分析" : "分析文件" }}
          </h-button>
          <h-button @click="onOpenDownloadFolder">打开下载目录</h-button>
        </a-space>
      </div>
      <div class="flex justify-between items-center mt-4 mb-2">
        <div class="flex items-center">
          <a-cascader
            v-model:value="filter.value"
            :options="cascaderOptions"
            @change="onChangeCascader"
          >
            <a href="#" v-if="isEmpty(filter.value)">筛选</a>
            <a href="#" v-else> {{ filter.text }} </a>
          </a-cascader>
          <close-circle-outlined
            v-if="isNotEmpty(filter.value)"
            class="ml-2 cursor-pointer"
            @click="onClearCascader"
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
          <a-card class="k-card col-span-3" :bordered="false">
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
import { onActivated, onMounted, ref } from "vue";
import { apiMovieBasicPage } from "@/api/movie/movieBasicApi.ts";

import { Empty, message } from "ant-design-vue";
import { CloseCircleOutlined } from "@ant-design/icons-vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { apiSysDictListByDictType } from "@/api/sysadmin/sysDictApi";
import { isEmpty, isNotEmpty } from "@ht/util";
import { triggerAction } from "@/utils/action";
import MovieBasicDownloadFolder from "@/views/movie/movieBasic/movieBasicDownloadFolder.vue";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const actions = ref(appStore.actions);
const cascaderOptions = ref([
  {
    label: "类型",
    value: "genreId",
    type: "movieGenre",
  },
  {
    label: "国家地区",
    value: "countryId",
    type: "movieCountry",
  },
  {
    label: "分级",
    value: "contentRating",
    type: "movieContentRating",
  },
  {
    label: "年代",
    value: "decade",
    type: "movieDecade",
  },
  {
    label: "年份",
    value: "year",
    type: "movieYear",
  },
  {
    label: "多文件",
    value: "multipleFiles",
    type: "sfbz",
  },
  {
    label: "低质量",
    value: "lowQuality",
    type: "sfbz",
  },
  {
    label: "国语配音",
    value: "mandarin",
    type: "sfbz",
  },
  {
    label: "无字幕",
    value: "noSubtitle",
    type: "sfbz",
  },
]);
const refScrollGrid = ref();
const refMovieBasicDownloadFolder = ref();
const loading = ref(true);
const searchForm = ref({});
const pageResult = ref({
  records: [],
  pageNumber: 0,
  pageSize: 50,
});

const filter = ref({
  key: "",
  value: "",
  text: "",
});

const setFilter = (key, value, text) => {
  searchForm.value[key] = value;
  filter.value.key = key;
  filter.value.value = value;
  filter.value.text = text;
};

const clearFilter = () => {
  searchForm.value[filter.value.key] = "";
  filter.value.key = "";
  filter.value.value = "";
  filter.value.text = "";
};

const initCascader = () => {
  cascaderOptions.value.forEach((s) => {
    apiSysDictListByDictType(s.type).then((r) => {
      s.children = r.map((m) => ({ label: m.text, value: m.value }));
    });
  });
};

onMounted(() => {
  loadData();
  initCascader();
});

onActivated(() => {
  refScrollGrid.value.scrollTop = appStore.getScrollTop("movie");
  if (route.params.load) {
    const actorId = route.params.actorId;
    if (actorId) {
      setFilter("actorId", actorId, "演职员: " + route.params.actorName);
    }
    onSearch();
  }
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

const onMovieUpdateSource = () => {
  triggerAction("movieUpdateSource");
};

const onMovieCheckThreadStatus = () => {
  triggerAction("movieCheckThreadStatus");
};

const onMovieMatchInfo = () => {
  triggerAction("movieMatchInfo", searchForm.value);
};

const onMovieReadNFO = () => {
  triggerAction("movieReadNFO", searchForm.value);
};

const onMovieExportNFO = () => {
  triggerAction("movieExportNFO", searchForm.value);
};

const onMovieSyncPlex = () => {
  triggerAction("movieSyncPlex", searchForm.value);
};

const onMovieAnalyze = () => {
  triggerAction("movieAnalyze", searchForm.value);
};

const onOpenDownloadFolder = () => {
  refMovieBasicDownloadFolder.value.show();
};

const onChangeCascader = (value, selectedOptions) => {
  setFilter(value[0], value[1], selectedOptions.map((s) => s.label).join(": "));
  onSearch();
};

const onClearCascader = () => {
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

<!--
 * @Author: cyetstar
 * @Date: 2023-11-28 01:40:40
 * @Description: 剧集列表页面
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
          <h-button @click="onSyncPlex">同步Plex</h-button>
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
          <a-card class="k-card col-span-3" :bordered="false">
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
import { isEmpty, isNotEmpty } from "@ht/util";
import { CloseCircleOutlined } from "@ant-design/icons-vue";
import { apiSysDictListByDictType } from "@/api/sysadmin/sysDictApi";

const router = useRouter();
const appStore = useAppStore();
const dicts = ref([
  {
    label: "类型",
    value: "genre",
  },
  {
    label: "分级",
    value: "contentRating",
  },
  {
    label: "年份",
    value: "year",
  },
]);
const refScrollGrid = ref();
const searchForm = ref({});
const loading = ref(false);
const pageResult = ref({
  records: [],
  pageNumber: 0,
  pageSize: 36,
});
const filterText = ref();

onMounted(() => {
  loadData();
  initFilter();
});

onActivated(() => {
  refScrollGrid.value.scrollTop = appStore.getScrollTop("tvshow");
});

onBeforeRouteLeave((to, from, next) => {
  appStore.setScrollTop(refScrollGrid.value.scrollTop, "tvshow");
  next();
});

const onSearch = () => {
  pageResult.value.pageNumber = 0;
  pageResult.value.records = [];
  loadData();
};

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

const initFilter = () => {
  dicts.value.forEach((s) => {
    let type = appStore.$state.config["plexTvshowLibraryId"] + s.value;
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
const loadData = () => {
  loading.value = true;
  const data = {
    pageNumber: pageResult.value.pageNumber + 1,
    pageSize: pageResult.value.pageSize,
    searchCount: true,
    ...searchForm.value,
  };
  apiTvshowShowPage(data).then((res) => {
    loading.value = false;
    pageResult.value.records.push(...res.records);
    pageResult.value.pageNumber = res.pageNumber;
    pageResult.value.pageSize = res.pageSize;
    pageResult.value.total = res.total;
  });
};
</script>

<style lang="less" scoped></style>

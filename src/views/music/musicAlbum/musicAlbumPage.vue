<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品列表页面
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
          <k-action-button
            action="musicReadAudioTag"
            ok-text="读取Tag"
            cancel-text="取消读取"
            :form="searchForm"
          />
          <k-action-button
            action="musicDownloadLyric"
            ok-text="下载歌词"
            cancel-text="取消下载"
            :form="searchForm"
          />
          <k-action-button
            action="musicSyncPlex"
            ok-text="同步Plex"
            cancel-text="取消同步"
          />
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
                class="h-cover cursor-pointer"
                type="music"
                :preview="false"
                :plex-thumb="record.thumb"
                @click="onViewRecord(record.id)"
              />
              <div class="absolute top-0 left-0 m-2px">
                <k-logo-link
                  type="plex"
                  :id="record.id"
                  :width="20"
                  class="mr-1"
                />
                <k-logo-link
                  type="netease"
                  :id="record.neteaseId"
                  :width="20"
                />
              </div>
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
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted, onActivated } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { Empty, message } from "ant-design-vue";
import { CloseCircleOutlined } from "@ant-design/icons-vue";
import { isEmpty, isNotEmpty } from "@ht/util";
import { useAppStore } from "@/store/modules/app";
import {
  apiMusicAlbumPage,
  apiMusicAlbumSyncPlex,
} from "@/api/music/musicAlbumApi.ts";
import { apiSysDictListByDictType } from "@/api/sysadmin/sysDictApi";
import KActionButton from "@c/ActionButton/ActionButton.vue";

const router = useRouter();
const appStore = useAppStore();
const dicts = ref([
  {
    label: "类型",
    value: "genre",
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
const searchForm = ref({});
const loading = ref(false);
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
  refScrollGrid.value.scrollTop = appStore.getScrollTop("music");
});

onBeforeRouteLeave((to, from, next) => {
  appStore.setScrollTop(refScrollGrid.value.scrollTop, "music");
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
  apiMusicAlbumPage(data).then((res) => {
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
  router.push({ path: "/music/musicAlbum/view", query: { id } });
};

const initFilter = () => {
  dicts.value.forEach((s) => {
    let type = appStore.$state.config["plexMusicLibraryId"] + s.value;
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

<style lang="less"></style>

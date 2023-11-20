<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品列表页面
-->
<template>
  <section class="h-page-section">
    <h-form-search
      ref="refFormSearch"
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
    >
      <h-col :span="6">
        <h-input label="标题" v-model:value="searchForm.title" name="title" />
      </h-col>
      <h-col :span="6">
        <h-input
          label="艺术家"
          v-model:value="searchForm.artists"
          name="artists"
        />
      </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button type="primary" @click="onSyncPlex">同步Plex</h-button>
      <h-button-delete
        plain
        :disabled="selectedRowKeys.length === 0"
        @delete="onDeleteRecord(selectedRowKeys)"
      />
    </a-space>

    <div>
      <a-row :gutter="16">
        <template :key="record.id" v-for="record in pageResult.records">
          <a-col :md="4" :xxl="3" class="mb-16px">
            <a-card>
              <template #cover>
                <h-plex-image
                  class="cover"
                  :preview="false"
                  :plex-thumb="record.plexThumb"
                  @click="onViewRecord(record.id)"
                />
              </template>
              <a-card-meta
                :title="record.title"
                :description="
                  record.artists ||
                  '--' + ' (' + (record.releaseDate || '?') + ')'
                "
              >
              </a-card-meta>
            </a-card>
          </a-col>
        </template>
      </a-row>
      <div>
        <a-empty
          v-if="pageResult.records.length === 0"
          :image="Empty.PRESENTED_IMAGE_SIMPLE"
        />
      </div>
      <div class="flex justify-end">
        <a-pagination
          v-model:current="pageResult.pageNumber"
          :show-total="(total) => `共 ${total} 张`"
          :total="pageResult.total"
          :page-size="pageResult.pageSize"
          :show-size-changer="false"
          @change="onChange"
          show-less-items
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  apiMusicAlbumDelete,
  apiMusicAlbumPage,
  apiMusicAlbumSyncPlex,
} from "@/api/music/musicAlbumApi.ts";

import { Empty, message } from "ant-design-vue";
import { useRouter } from "vue-router";

const searchForm = ref({
  bt: "",
  ysj: "",
});
const pageResult = ref({
  records: [],
  pageNumber: 0,
  total: 0,
  pageSize: 36,
});
const selectedRowKeys = ref([]);

onMounted(() => {
  // console.log("init");
  loadData({ ...searchForm.value });
});

const onSyncPlex = () => {
  apiMusicAlbumSyncPlex().then((res) => {
    message.success("同步完成");
  });
};

const onSearch = () => {
  loadData({ ...searchForm.value });
};

const onReset = () => {
  loadData({ ...searchForm.value });
};

const onChange = (pageNumber) => {
  loadData({ pageNumber, ...searchForm.value });
};

const loadData = (data) => {
  data.searchCount = true;
  data.pageSize = pageResult.value.pageSize;
  apiMusicAlbumPage(data).then((res) => {
    pageResult.value = res;
  });
};

const router = useRouter();
const onViewRecord = (id) => {
  router.push({ path: "/music/musicAlbum/view", query: { id } });
};

const onDeleteRecord = (recordId) => {
  const id = Array.isArray(recordId) ? recordId : [recordId];
  apiMusicAlbumDelete(id).then((res) => {
    if (res) {
      message.success("删除成功！");
    }
  });
};
</script>

<style lang="less">
.cover {
  object-fit: cover;
  width: 100%;
  flex: 1;
  height: 190px;
}
</style>

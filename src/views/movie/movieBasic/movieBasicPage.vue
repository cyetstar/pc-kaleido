<!--
 * @Author: cyetstar
 * @Date: 2023-11-26 01:20:15
 * @Description: 电影列表页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <h-form-search
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
    >
      <h-col :span="6">
        <h-input label="电影名" v-model:value="searchForm.title" name="title" />
      </h-col>
      <h-col :span="6">
        <h-input
          label="原片名"
          v-model:value="searchForm.originalTitle"
          name="originalTitle"
        />
      </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button type="primary" @click="onSyncPlex">同步Plex</h-button>
      <h-button-delete
        v-permissKey="'movieBasic:delete'"
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
                  :plex-thumb="record.thumb"
                  @click="onViewRecord(record.id)"
                />
              </template>
              <a-card-meta :title="record.title"></a-card-meta>
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
import { ref, getCurrentInstance, onMounted } from "vue";
import {
  apiMovieBasicPage,
  apiMovieBasicDelete,
  apiMovieBasicSyncPlex,
} from "@/api/movie/movieBasicApi.ts";

import { Empty, message } from "ant-design-vue";
import { useRouter } from "vue-router";

const tableRef = ref();
const searchForm = ref({});
const pageResult = ref({
  records: [],
  pageNumber: 0,
  total: 0,
  pageSize: 36,
});
const onSearch = () => {
  tableRef.value.load(1);
};

const onReset = () => {
  tableRef.value.load(1);
};

const loadData = (data) => {
  data.searchCount = true;
  data.pageSize = pageResult.value.pageSize;
  apiMovieBasicPage(data).then((res) => {
    pageResult.value = res;
  });
};

const onSelectionChange = () => {};

const formRef = ref();
const onCreateRecord = () => {
  formRef.value.create();
};
const router = useRouter();
const onViewRecord = (id) => {
  router.push({ path: "/movie/movieBasic/view", query: { id } });
};
const onUpdateRecord = (id) => {
  formRef.value.update(id);
};

const selectedRowKeys = ref([]);
const onDeleteRecord = (recordId) => {
  const id = Array.isArray(recordId) ? recordId : [recordId];
  apiMovieBasicDelete(id).then((res) => {
    if (res) {
      tableRef.value.load();
      message.success("删除成功！");
    }
  });
};

const onSyncPlex = () => {
  apiMovieBasicSyncPlex().then((res) => {
    message.success("同步完成");
  });
};

onMounted(() => {
  // console.log("init");
  loadData({ ...searchForm.value });
});
</script>

<style lang="less" scoped></style>

<!--
 * @Author: cyetstar
 * @Date: 2023-11-26 01:20:15
 * @Description: 电影集合列表页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <h-form-search v-model:form="searchForm" @search="onSearch" @reset="onReset">
        <h-col :span="6">
          <h-input label="标题"
                     v-model:value="searchForm.title" name="title"/>
        </h-col>
        <h-col :span="6">
          <h-input label="简介"
                     v-model:value="searchForm.summary" name="summary"/>
        </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button v-permissKey="'movieCollection:create'" type="primary" @click="onCreateRecord">新增</h-button>
      <h-button-delete v-permissKey="'movieCollection:delete'" plain :disabled="selectedRowKeys.length === 0"
                       @delete="onDeleteRecord(selectedRowKeys)"/>
      <h-button v-permissKey="'movieCollection:export'" @click="onShowExportRecord">导出</h-button>
    </a-space>

    <h-table-data ref="tableRef" row-key="id" @loadData="onLoadData" @selection-change="onSelectionChange">
        <a-table-column title="主键" data-index="id" align="center"></a-table-column>
        <a-table-column title="标题" data-index="title" align="center"></a-table-column>
        <a-table-column title="简介" data-index="summary" align="center"></a-table-column>
      <a-table-column title="操作" align="center" width="300px">
        <template #="{ record }">
          <a-space :size="0">
            <h-button type="primary" size="small" link v-permissKey="'movieCollection:view'"
                      @click="onViewRecord(record.id)">详情</h-button>
            <h-button type="primary" size="small" link v-permissKey="'movieCollection:update'"
                      @click="onUpdateRecord(record.id)">编辑</h-button>
            <h-button-delete size="small" link v-permissKey="'movieCollection:delete'"
                             @delete="onDeleteRecord(record.id)">删除</h-button-delete>
          </a-space>
        </template>
      </a-table-column>
    </h-table-data>

    <movieCollectionForm ref="formRef" @save-complete="onSaveComplete"></movieCollectionForm>

    <h-modal-export ref="exportRef" @loadColumn="onLoadColumn" @export="onExport"></h-modal-export>
  </section>
</template>

<script setup>
import movieCollectionForm from './movieCollectionForm.vue';
import { ref, getCurrentInstance } from 'vue';
import {apiMovieCollectionPage, apiMovieCollectionDelete, apiMovieCollectionColumn, apiMovieCollectionExport} from "@/api/movie/movieCollectionApi.ts"

import { message } from "ant-design-vue";
import { useRouter } from 'vue-router';

const searchForm = ref({
  id: "",
  title: "",
  summary: "",
});

const tableRef = ref();
const onSearch = () => {
  tableRef.value.load(1);
};

const onReset = () => {
  tableRef.value.load(1);
};

const onLoadData = (params, callbacks) => {
  callbacks(apiMovieCollectionPage({ ...params, ...searchForm.value, searchCount: true }));
};

const onSelectionChange = () => { };

const formRef = ref();
const onCreateRecord = () => {
  formRef.value.create();
}
const router = useRouter()
const onViewRecord = (id) => {
  router.push({ path: "/movieCollection/view", query: { id } })
}
const onUpdateRecord = (id) => {
  formRef.value.update(id);
};
const onSaveComplete = () => {
  tableRef.value.load(1);
};

const selectedRowKeys = ref([]);
const onDeleteRecord = (recordId) => {
  const id = Array.isArray(recordId) ? recordId : [recordId];
  apiMovieCollectionDelete(id).then(res => {
    if (res) {
      tableRef.value.load();
      message.success("删除成功！");
    }
  });
}

const { proxy } = getCurrentInstance();
const exportRef = ref();
const onShowExport = () => {
  exportRef.value.show();
};

const onLoadColumn = (callbacks) => {
  callbacks(apiMovieCollectionColumn);
};

const onExport = async (params) => {
  const data = await apiMovieCollectionExport({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "电影集合");
};
</script>

<style lang='less' scoped>
  :deep(.ant-modal-body) {
    padding: 0 24px;
  }

  :deep(.ant-modal-footer) {
    border-top: none;
  }

  .table-box {
    margin-top: 20px;
  }

  .view-line {
    display: flex;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;

  &:not(:last-child) {
     border-bottom: 1px solid #f2f2f2;
   }

  .line-name {
    color: #333333;
    font-size: 14px;
  }

  .line-value {
    color: #666666;
    font-size: 14px;
  }
  }

  .table-line {
    display: flex;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;

  &:not(:last-child) {
     border-bottom: 1px solid #f2f2f2;
   }

  .table-item {
    width: calc(100% / 3);
    text-align: center;

  &:first-child {
     text-align: left;
   }

  &:last-child {
     text-align: right;
   }
  }
  }

  .table-header {
    font-weight: 700;
  }

  .edit-icon {
    font-size: 16px;
    margin-left: 12px;
    color: #666;
    cursor: pointer;
  }
</style>
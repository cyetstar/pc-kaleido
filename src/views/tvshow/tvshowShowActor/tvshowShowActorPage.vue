<!--
 * @Author: cyetstar
 * @Date: 2023-11-28 01:40:40
 * @Description: 剧集演职员关联表列表页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <h-form-search v-model:form="searchForm" @search="onSearch" @reset="onReset">
        <h-col :span="6">
          <h-input label="剧集id"
                     v-model:value="searchForm.showId" name="showId"/>
        </h-col>
        <h-col :span="6">
          <h-input label="演职员id"
                     v-model:value="searchForm.actorId" name="actorId"/>
        </h-col>
        <h-col :span="6">
          <h-input label="角色"
                     v-model:value="searchForm.role" name="role"/>
        </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button v-permissKey="'tvshowShowActor:create'" type="primary" @click="onCreateRecord">新增</h-button>
      <h-button-delete v-permissKey="'tvshowShowActor:delete'" plain :disabled="selectedRowKeys.length === 0"
                       @delete="onDeleteRecord(selectedRowKeys)"/>
      <h-button v-permissKey="'tvshowShowActor:export'" @click="onShowExportRecord">导出</h-button>
    </a-space>

    <h-table-data ref="tableRef" row-key="id" @loadData="onLoadData" @selection-change="onSelectionChange">
        <a-table-column title="主键" data-index="id" align="center"></a-table-column>
        <a-table-column title="剧集id" data-index="showId" align="center"></a-table-column>
        <a-table-column title="演职员id" data-index="actorId" align="center"></a-table-column>
        <a-table-column title="角色" data-index="role" align="center"></a-table-column>
      <a-table-column title="操作" align="center" width="300px">
        <template #="{ record }">
          <a-space :size="0">
            <h-button type="primary" size="small" link v-permissKey="'tvshowShowActor:view'"
                      @click="onViewRecord(record.id)">详情</h-button>
            <h-button type="primary" size="small" link v-permissKey="'tvshowShowActor:update'"
                      @click="onUpdateRecord(record.id)">编辑</h-button>
            <h-button-delete size="small" link v-permissKey="'tvshowShowActor:delete'"
                             @delete="onDeleteRecord(record.id)">删除</h-button-delete>
          </a-space>
        </template>
      </a-table-column>
    </h-table-data>

    <tvshowShowActorForm ref="formRef" @save-complete="onSaveComplete"></tvshowShowActorForm>

    <h-modal-export ref="exportRef" @loadColumn="onLoadColumn" @export="onExport"></h-modal-export>
  </section>
</template>

<script setup>
import tvshowShowActorForm from './tvshowShowActorForm.vue';
import { ref, getCurrentInstance } from 'vue';
import {apiTvshowShowActorPage, apiTvshowShowActorDelete, apiTvshowShowActorColumn, apiTvshowShowActorExport} from "@/api/tvshow/tvshowShowActorApi.ts"

import { message } from "ant-design-vue";
import { useRouter } from 'vue-router';

const searchForm = ref({
  id: "",
  showId: "",
  actorId: "",
  role: "",
});

const tableRef = ref();
const onSearch = () => {
  tableRef.value.load(1);
};

const onReset = () => {
  tableRef.value.load(1);
};

const onLoadData = (params, callbacks) => {
  callbacks(apiTvshowShowActorPage({ ...params, ...searchForm.value, searchCount: true }));
};

const onSelectionChange = () => { };

const formRef = ref();
const onCreateRecord = () => {
  formRef.value.create();
}
const router = useRouter()
const onViewRecord = (id) => {
  router.push({ path: "tvshow/tvshowShowActor/view", query: { id } })
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
  apiTvshowShowActorDelete(id).then(res => {
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
  callbacks(apiTvshowShowActorColumn);
};

const onExport = async (params) => {
  const data = await apiTvshowShowActorExport({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "剧集演职员关联表");
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
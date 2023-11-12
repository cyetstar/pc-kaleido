<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 00:14:19
 * @Description: 曲目列表页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <h-form-search v-model:form="searchForm" @search="onSearch" @reset="onReset">
        <h-col :span="6">
          <h-select label="发行品id" dict-type="releaseId"
                    v-model:value="searchForm.releaseId" name="releaseId"/>
        </h-col>
        <h-col :span="6">
          <h-input label="MusicBrainzId"
                     v-model:value="searchForm.musicbrainzId" name="musicbrainzId"/>
        </h-col>
        <h-col :span="6">
          <h-input label="Plex编号"
                     v-model:value="searchForm.plexId" name="plexId"/>
        </h-col>
        <h-col :span="6">
          <h-input label="标题"
                     v-model:value="searchForm.bt" name="bt"/>
        </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button v-permissKey="'musicTrack:create'" type="primary" @click="onCreateRecord">新增</h-button>
      <h-button-delete v-permissKey="'musicTrack:delete'" plain :disabled="selectedRowKeys.length === 0"
                       @delete="onDeleteRecord(selectedRowKeys)"/>
      <h-button v-permissKey="'musicTrack:export'" @click="onShowExportRecord">导出</h-button>
    </a-space>

    <h-table-data ref="tableRef" row-key="id" @loadData="loadData" @selection-change="selectionChange">
        <a-table-column title="主键" data-index="id" align="center"></a-table-column>
        <a-table-column title="发行品id" data-index="releaseId" align="center"></a-table-column>
        <a-table-column title="MusicBrainzId" data-index="musicbrainzId" align="center"></a-table-column>
        <a-table-column title="Plex编号" data-index="plexId" align="center"></a-table-column>
        <a-table-column title="标题" data-index="bt" align="center"></a-table-column>
        <a-table-column title="艺术家" data-index="ysj" align="center"></a-table-column>
        <a-table-column title="长度" data-index="cd" align="center"></a-table-column>
      <a-table-column title="操作" align="center" width="300px">
        <template #="{ record }">
          <a-space :size="0">
            <h-button type="primary" size="small" link v-permissKey="'musicTrack:view'"
                      @click="onViewRecord(record.id)">详情</h-button>
            <h-button type="primary" size="small" link v-permissKey="'musicTrack:update'"
                      @click="onUpdateRecord(record.id)">编辑</h-button>
            <h-button-delete size="small" link v-permissKey="'musicTrack:delete'"
                             @delete="onDeleteRecord(record.id)">删除</h-button-delete>
          </a-space>
        </template>
      </a-table-column>
    </h-table-data>

    <musicTrackForm ref="formRef" @save-complete="saveComplete"></musicTrackForm>

    <h-modal-export ref="exportRef" @loadColumn="loadColumn" @export="onExport"></h-modal-export>
  </section>
</template>

<script setup>
import musicTrackForm from './musicTrackForm.vue';
import { ref, getCurrentInstance } from 'vue';
import {musicTrackPageApi, musicTrackDeleteApi, musicTrackColumnApi, musicTrackExportApi} from "@/api/music/musicTrackApi.ts"

import { message } from "ant-design-vue";
import { useRouter } from 'vue-router';

const searchForm = ref({
  id: "",
  releaseId: "",
  musicbrainzId: "",
  plexId: "",
  bt: "",
  ysj: "",
  cd: "",
});

const tableRef = ref();
const onSearch = () => {
  tableRef.value.load(1);
};

const onReset = () => {
  tableRef.value.load(1);
};

const loadData = (params, callbacks) => {
  callbacks(musicTrackPageApi({ ...params, ...searchForm.value, searchCount: true }));
};

const selectionChange = () => { };

const formRef = ref();
const onCreateRecord = () => {
  formRef.value.create();
}
const router = useRouter()
const onViewRecord = (id) => {
  router.push({ path: "/musicTrack/view", query: { id } })
}
const onUpdateRecord = (id) => {
  formRef.value.update(id);
};
const saveComplete = () => {
  tableRef.value.load(1);
};

const selectedRowKeys = ref([]);
const onDeleteRecord = (recordId) => {
  const id = Array.isArray(recordId) ? recordId : [recordId];
  musicTrackDeleteApi(id).then(res => {
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

const loadColumn = (callbacks) => {
  callbacks(musicTrackColumnApi);
};

const onExport = async (params) => {
  const data = await musicTrackExportApi({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "曲目");
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
<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 00:14:19
 * @Description: 艺术家列表页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <h-form-search v-model:form="searchForm" @search="onSearch" @reset="onReset">
        <h-col :span="6">
          <h-input label="MusicBrainzId"
                     v-model:value="searchForm.musicbrainzId" name="musicbrainzId"/>
        </h-col>
        <h-col :span="6">
          <h-input label="Plex编号"
                     v-model:value="searchForm.plexId" name="plexId"/>
        </h-col>
        <h-col :span="6">
          <h-input label="名称"
                     v-model:value="searchForm.mc" name="mc"/>
        </h-col>
        <h-col :span="6">
          <h-select label="艺术家类型" dict-type="ysjlx"
                    v-model:value="searchForm.ysjlx" name="ysjlx"/>
        </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button v-permissKey="'musicArtist:create'" type="primary" @click="onCreateRecord">新增</h-button>
      <h-button-delete v-permissKey="'musicArtist:delete'" plain :disabled="selectedRowKeys.length === 0"
                       @delete="onDeleteRecord(selectedRowKeys)"/>
      <h-button v-permissKey="'musicArtist:export'" @click="onShowExportRecord">导出</h-button>
    </a-space>

    <h-table-data ref="tableRef" row-key="id" @loadData="loadData" @selection-change="selectionChange">
        <a-table-column title="主键" data-index="id" align="center"></a-table-column>
        <a-table-column title="MusicBrainzId" data-index="musicbrainzId" align="center"></a-table-column>
        <a-table-column title="Plex编号" data-index="plexId" align="center"></a-table-column>
        <a-table-column title="名称" data-index="mc" align="center"></a-table-column>
        <a-table-column title="艺术家类型" data-index="ysjlx" align="center"></a-table-column>
        <a-table-column title="国家地区" data-index="gjdq" align="center"></a-table-column>
        <a-table-column title="简介" data-index="jj" align="center"></a-table-column>
      <a-table-column title="操作" align="center" width="300px">
        <template #="{ record }">
          <a-space :size="0">
            <h-button type="primary" size="small" link v-permissKey="'musicArtist:view'"
                      @click="onViewRecord(record.id)">详情</h-button>
            <h-button type="primary" size="small" link v-permissKey="'musicArtist:update'"
                      @click="onUpdateRecord(record.id)">编辑</h-button>
            <h-button-delete size="small" link v-permissKey="'musicArtist:delete'"
                             @delete="onDeleteRecord(record.id)">删除</h-button-delete>
          </a-space>
        </template>
      </a-table-column>
    </h-table-data>

    <musicArtistForm ref="formRef" @save-complete="saveComplete"></musicArtistForm>

    <h-modal-export ref="exportRef" @loadColumn="loadColumn" @export="onExport"></h-modal-export>
  </section>
</template>

<script setup>
import musicArtistForm from './musicArtistForm.vue';
import { ref, getCurrentInstance } from 'vue';
import {musicArtistPageApi, musicArtistDeleteApi, musicArtistColumnApi, musicArtistExportApi} from "@/api/music/musicArtistApi.ts"

import { message } from "ant-design-vue";
import { useRouter } from 'vue-router';

const searchForm = ref({
  id: "",
  musicbrainzId: "",
  plexId: "",
  mc: "",
  ysjlx: "",
  gjdq: "",
  jj: "",
});

const tableRef = ref();
const onSearch = () => {
  tableRef.value.load(1);
};

const onReset = () => {
  tableRef.value.load(1);
};

const loadData = (params, callbacks) => {
  callbacks(musicArtistPageApi({ ...params, ...searchForm.value, searchCount: true }));
};

const selectionChange = () => { };

const formRef = ref();
const onCreateRecord = () => {
  formRef.value.create();
}
const router = useRouter()
const onViewRecord = (id) => {
  router.push({ path: "/musicArtist/view", query: { id } })
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
  musicArtistDeleteApi(id).then(res => {
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
  callbacks(musicArtistColumnApi);
};

const onExport = async (params) => {
  const data = await musicArtistExportApi({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "艺术家");
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
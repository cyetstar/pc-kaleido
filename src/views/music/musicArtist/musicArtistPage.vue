<!--
 * @Author: cyetstar
 * @Date: 2023-11-20 22:35:49
 * @Description: 艺术家列表页面
-->
<template>
  <section class="h-page-section">
    <h-form-search
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
    >
      <h-col :span="6">
        <h-input
          label="MusicBrainz编号"
          v-model:value="searchForm.musicbrainzId"
          name="musicbrainzId"
        />
      </h-col>
      <h-col :span="6">
        <h-input
          label="Plex编号"
          v-model:value="searchForm.plexId"
          name="plexId"
        />
      </h-col>
      <h-col :span="6">
        <h-select-datetime
          label="创建时间"
          type="datetime"
          v-model:value="searchForm.cjsj"
          name="cjsj"
        />
      </h-col>
      <h-col :span="6">
        <h-select-datetime
          label="修改时间"
          type="datetime"
          v-model:value="searchForm.xgsj"
          name="xgsj"
        />
      </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button
        v-permissKey="'musicArtist:create'"
        type="primary"
        @click="onCreateRecord"
        >新增</h-button
      >
      <h-button-delete
        v-permissKey="'musicArtist:delete'"
        plain
        :disabled="selectedRowKeys.length === 0"
        @delete="onDeleteRecord(selectedRowKeys)"
      />
      <h-button v-permissKey="'musicArtist:export'" @click="onShowExportRecord"
        >导出</h-button
      >
    </a-space>

    <h-table-data
      ref="tableRef"
      row-key="id"
      @loadData="onLoadData"
      @selection-change="onSelectionChange"
    >
      <a-table-column
        title="主键"
        data-index="id"
        align="center"
      ></a-table-column>
      <a-table-column
        title="MusicBrainz编号"
        data-index="musicbrainzId"
        align="center"
      ></a-table-column>
      <a-table-column
        title="Plex编号"
        data-index="plexId"
        align="center"
      ></a-table-column>
      <a-table-column
        title="创建时间"
        data-index="cjsj"
        align="center"
      ></a-table-column>
      <a-table-column
        title="修改时间"
        data-index="xgsj"
        align="center"
      ></a-table-column>
      <a-table-column
        title="Plex缩略图"
        data-index="plexThumb"
        align="center"
      ></a-table-column>
      <a-table-column
        title="网易云音乐编号"
        data-index="neteaseId"
        align="center"
      ></a-table-column>
      <a-table-column title="操作" align="center" width="300px">
        <template #="{ record }">
          <a-space :size="0">
            <h-button
              type="primary"
              size="small"
              link
              v-permissKey="'musicArtist:view'"
              @click="onViewRecord(record.id)"
              >详情</h-button
            >
            <h-button
              type="primary"
              size="small"
              link
              v-permissKey="'musicArtist:update'"
              @click="onUpdateRecord(record.id)"
              >编辑</h-button
            >
            <h-button-delete
              size="small"
              link
              v-permissKey="'musicArtist:delete'"
              @delete="onDeleteRecord(record.id)"
              >删除</h-button-delete
            >
          </a-space>
        </template>
      </a-table-column>
    </h-table-data>

    <musicArtistForm
      ref="formRef"
      @save-complete="onSaveComplete"
    ></musicArtistForm>

    <h-modal-export
      ref="exportRef"
      @loadColumn="onLoadColumn"
      @export="onExport"
    ></h-modal-export>
  </section>
</template>

<script setup>
import musicArtistForm from "./musicArtistForm.vue";
import { ref, getCurrentInstance } from "vue";
import {
  apiMusicArtistPage,
  apiMusicArtistDelete,
  apiMusicArtistColumn,
  apiMusicArtistExport,
} from "@/api/music/musicArtistApi.ts";

import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const searchForm = ref({
  id: "",
  musicbrainzId: "",
  plexId: "",
  cjsj: "",
  xgsj: "",
  plexThumb: "",
  neteaseId: "",
});

const tableRef = ref();
const onSearch = () => {
  tableRef.value.load(1);
};

const onReset = () => {
  tableRef.value.load(1);
};

const onLoadData = (params, callbacks) => {
  callbacks(
    apiMusicArtistPage({ ...params, ...searchForm.value, searchCount: true })
  );
};

const onSelectionChange = () => {};

const formRef = ref();
const onCreateRecord = () => {
  formRef.value.create();
};
const router = useRouter();
const onViewRecord = (id) => {
  router.push({ path: "/musicArtist/view", query: { id } });
};
const onUpdateRecord = (id) => {
  formRef.value.update(id);
};
const onSaveComplete = () => {
  tableRef.value.load(1);
};

const selectedRowKeys = ref([]);
const onDeleteRecord = (recordId) => {
  const id = Array.isArray(recordId) ? recordId : [recordId];
  apiMusicArtistDelete(id).then((res) => {
    if (res) {
      tableRef.value.load();
      message.success("删除成功！");
    }
  });
};

const { proxy } = getCurrentInstance();
const exportRef = ref();
const onShowExport = () => {
  exportRef.value.show();
};

const onLoadColumn = (callbacks) => {
  callbacks(apiMusicArtistColumn);
};

const onExport = async (params) => {
  const data = await apiMusicArtistExport({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "艺术家");
};
</script>

<style lang="less" scoped>
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

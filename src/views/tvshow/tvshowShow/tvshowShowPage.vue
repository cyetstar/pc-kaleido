<!--
 * @Author: cyetstar
 * @Date: 2023-11-28 01:40:40
 * @Description: 剧集列表页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <h-form-search
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
    >
      <h-col :span="6">
        <h-input label="剧集名" v-model:value="searchForm.title" name="title" />
      </h-col>
      <h-col :span="6">
        <h-input
          label="原剧集名"
          v-model:value="searchForm.originalTitle"
          name="originalTitle"
        />
      </h-col>
      <h-col :span="6">
        <h-input
          label="制片公司"
          v-model:value="searchForm.studio"
          name="studio"
        />
      </h-col>
      <h-col :span="6">
        <h-input
          label="剧集评级"
          v-model:value="searchForm.contentRating"
          name="contentRating"
        />
      </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button type="primary" @click="onSyncPlex">同步Plex</h-button>
    </a-space>

    <div v-if="pageResult.records.length === 0">
      <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" />
    </div>
    <div v-else>
      <div class="grid grid-cols-24 gap-x-3 gap-y-3">
        <template :key="record.id" v-for="record in pageResult.records">
          <a-card class="col-span-3">
            <template #cover>
              <h-plex-image
                class="h-poster"
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
  apiTvshowShowPage,
  apiTvshowShowDelete,
  apiTvshowShowColumn,
  apiTvshowShowExport,
} from "@/api/tvshow/tvshowShowApi.ts";

import { Empty, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { apiTvshowEpisodeSyncPlex } from "@/api/tvshow/tvshowEpisodeApi";

const searchForm = ref({});
const pageResult = ref({
  records: [],
  pageNumber: 0,
  total: 0,
  pageSize: 36,
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
    apiTvshowShowPage({ ...params, ...searchForm.value, searchCount: true })
  );
};

const onSelectionChange = () => {};

const formRef = ref();
const onCreateRecord = () => {
  formRef.value.create();
};
const router = useRouter();
const onViewRecord = (id) => {
  router.push({ path: "tvshow/tvshowShow/view", query: { id } });
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
  apiTvshowShowDelete(id).then((res) => {
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
  callbacks(apiTvshowShowColumn);
};

const onExport = async (params) => {
  const data = await apiTvshowShowExport({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "剧集");
};

onMounted(() => {
  // console.log("init");
  loadData({ ...searchForm.value });
});

const loadData = (data) => {
  data.searchCount = true;
  data.pageSize = pageResult.value.pageSize;
  apiTvshowShowPage(data).then((res) => {
    pageResult.value = res;
  });
};

const onSyncPlex = () => {
  apiTvshowEpisodeSyncPlex().then((res) => {
    if (res) {
      message.success("同步完成");
    } else {
      message.error("同步失败");
    }
  });
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

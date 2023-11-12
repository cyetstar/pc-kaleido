<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品列表页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <h-form-search
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
    >
      <h-col :span="6">
        <h-input label="标题" v-model:value="searchForm.bt" name="bt" />
      </h-col>
      <h-col :span="6">
        <h-input label="艺术家" v-model:value="searchForm.ysj" name="ysj" />
      </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button
        v-permissKey="'musicRelease:create'"
        type="primary"
        @click="onCreateRecord"
        >新增
      </h-button>
      <h-button-delete
        v-permissKey="'musicRelease:delete'"
        plain
        :disabled="selectedRowKeys.length === 0"
        @delete="onDeleteRecord(selectedRowKeys)"
      />
      <h-button v-permissKey="'musicRelease:export'" @click="onShowExportRecord"
        >导出
      </h-button>
    </a-space>

    <div class="flex flex-wrap">
      <a-row :gutter="16">
        <template :key="record.id" v-for="record in records">
          <a-col :span="4" class="mb-16px">
            <a-card @click="onViewRecord(record.id)">
              <template #cover>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              </template>
              <a-card-meta
                :title="record.bt"
                :description="
                  record.ysj || '--' + ' (' + (record.rq || '?') + ')'
                "
              >
              </a-card-meta>
            </a-card>
          </a-col>
        </template>
      </a-row>
    </div>

    <musicReleaseForm
      ref="formRef"
      @save-complete="saveComplete"
    ></musicReleaseForm>

    <h-modal-export
      ref="exportRef"
      @loadColumn="loadColumn"
      @export="onExport"
    ></h-modal-export>
  </section>
</template>

<script setup>
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons-vue";
import musicReleaseForm from "./musicReleaseForm.vue";
import { ref, getCurrentInstance, onMounted } from "vue";
import {
  musicReleasePageApi,
  musicReleaseDeleteApi,
  musicReleaseColumnApi,
  musicReleaseExportApi,
} from "@/api/music/musicReleaseApi.ts";

import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const searchForm = ref({
  id: "",
  musicbrainzId: "",
  plexId: "",
  bt: "",
  ysj: "",
  zjlx: "",
  yylp: "",
});

const records = ref([]);

onMounted(() => {
  loadData({ ...searchForm.value });
});

const onSearch = () => {
  tableRef.value.load(1);
};

const onReset = () => {
  tableRef.value.load(1);
};

const loadData = (data) => {
  musicReleasePageApi(data).then((res) => {
    records.value = res.records;
  });
};

const selectionChange = () => {};

const formRef = ref();
const onCreateRecord = () => {
  formRef.value.create();
};
const router = useRouter();
const onViewRecord = (id) => {
  router.push({ path: "/musicRelease/view", query: { id } });
};
const onUpdateRecord = (id) => {
  formRef.value.update(id);
};
const saveComplete = () => {
  tableRef.value.load(1);
};

const selectedRowKeys = ref([]);
const onDeleteRecord = (recordId) => {
  const id = Array.isArray(recordId) ? recordId : [recordId];
  musicReleaseDeleteApi(id).then((res) => {
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

const loadColumn = (callbacks) => {
  callbacks(musicReleaseColumnApi);
};

const onExport = async (params) => {
  const data = await musicReleaseExportApi({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "发行品");
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

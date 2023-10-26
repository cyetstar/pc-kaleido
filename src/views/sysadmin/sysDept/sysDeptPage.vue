<!--
 * @Author: xiadawei
 * @Date: 2023-10-14 12:08:49
 * @Description: 部门表列表页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <h-form-search
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
      :search-count="true"
    >
      <h-col :span="4">
        <h-input
          label="部门编码"
          v-model:value="searchForm.deptCode"
          name="deptCode"
        />
      </h-col>
      <h-col :span="4">
        <h-input
          label="父部门编码"
          v-model:value="searchForm.parentCode"
          name="parentCode"
        />
      </h-col>
      <h-col :span="4">
        <h-select
          label="父部门id"
          dict-type="parentId"
          v-model:value="searchForm.parentId"
          name="parentId"
        />
      </h-col>
      <h-col :span="4">
        <h-input
          label="部门名称"
          v-model:value="searchForm.deptName"
          name="deptName"
        />
      </h-col>
    </h-form-search>
    <a-space class="h-btn-space">
      <h-button type="primary" @click="onCreate">新增</h-button>
      <h-button-delete @delete="onDeleteRecords"></h-button-delete>
      <h-button @click="onShowExport">导出</h-button>
    </a-space>

    <h-table-data
      ref="tableRef"
      row-key="id"
      @loadData="loadData"
      @selection-change="selectionChange"
    >
      <a-table-column
        title="id"
        data-index="id"
        align="center"
      ></a-table-column>
      <a-table-column
        title="部门编码"
        data-index="deptCode"
        align="center"
      ></a-table-column>
      <a-table-column
        title="父部门编码"
        data-index="parentCode"
        align="center"
      ></a-table-column>
      <a-table-column
        title="父部门id"
        data-index="parentId"
        align="center"
      ></a-table-column>
      <a-table-column
        title="部门名称"
        data-index="deptName"
        align="center"
      ></a-table-column>
      <a-table-column
        title="负责人"
        data-index="leader"
        align="center"
      ></a-table-column>
      <a-table-column
        title="联系电话"
        data-index="phone"
        align="center"
      ></a-table-column>
      <a-table-column title="操作" align="center" width="300px">
        <template #="{ record }">
          <a-space>
            <span class="h-action-text" @click="onViewRecord(record.id)"
              >详情</span
            >
            <span class="h-action-text" @click="onUpdateRecord(record.id)"
              >编辑</span
            >
            <a-popconfirm
              title="确定删除该条纪录吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeleteRecords(record.id)"
            >
              <span class="h-action-danger-text">删除</span>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table-column>
    </h-table-data>

    <sysDeptForm ref="formRef" @save-complete="saveComplete"></sysDeptForm>

    <h-modal-export
      ref="exportRef"
      @loadColumn="loadColumn"
      @export="onExport"
    ></h-modal-export>
  </section>
</template>

<script setup>
import sysDeptForm from "./sysDeptForm.vue";
import { ref, getCurrentInstance } from "vue";
import {
  sysDeptPageApi,
  sysDeptDeleteApi,
  sysDeptColumnApi,
  sysDeptExportApi,
} from "@/api/sysadmin/sysDeptApi.ts";

import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const searchForm = ref({
  id: "",
  deptCode: "",
  parentCode: "",
  parentId: "",
  deptName: "",
  leader: "",
  phone: "",
});

const tableRef = ref();
const onSearch = () => {
  tableRef.value.load(1);
};

const onReset = () => {
  tableRef.value.load(1);
};

const loadData = (params, callbacks) => {
  callbacks(sysDeptPageApi({ ...params, ...searchForm.value }));
};

const selectionChange = () => {};

const formRef = ref();
const onCreate = () => {
  formRef.value.create();
};
const router = useRouter();
const onViewRecord = (id) => {
  router.push({ path: "/sysDept/view", query: { id } });
};
const onUpdateRecord = (id) => {
  formRef.value.update(id);
};
const saveComplete = () => {
  tableRef.value.load(1);
};

const selectedRowKeys = ref([]);
const onDeleteRecords = async (recordId) => {
  const id = recordId ? [recordId] : selectedRowKeys.value;
  const res = await sysDeptDeleteApi(id);
  if (res) {
    tableRef.value.load(1);
    message.success("删除成功！");
  }
};

const { proxy } = getCurrentInstance();
const exportRef = ref();
const onShowExport = () => {
  exportRef.value.show();
};

const loadColumn = (callbacks) => {
  callbacks(sysDeptColumnApi);
};

const onExport = async (params) => {
  const data = await sysDeptExportApi({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "部门表");
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

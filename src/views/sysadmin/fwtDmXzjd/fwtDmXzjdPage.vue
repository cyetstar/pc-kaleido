<!--
 * @Author: gongxiaofei
 * @Date: 2023-06-30 10:05:34
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-09-11 10:20:03
 * @Description: 乡镇街道
-->
<template>
  <section class="h-page-section">
    <h-form-search
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
    >
      <a-col :span="6">
        <h-input v-model:value="searchForm.dmmc" label="街道名称" name="dmmc" />
      </a-col>
      <a-col :span="6">
        <h-input v-model:value="searchForm.dmzm" label="街道代码" name="dmzm" />
      </a-col>
      <a-col :span="5">
        <h-select
          v-model:value="searchForm.yxbz"
          label="有效标志"
          name="yxbz"
          :columns="yxbzDict"
        ></h-select>
      </a-col>
    </h-form-search>
    <a-space class="py-12px">
      <h-button
        v-permissKey="'fwtDmXzjd:create'"
        type="primary"
        @click="onAddXzjd"
      >
        <span>新增</span>
      </h-button>
      <a-popconfirm
        title="状态删除请选择编辑，真实删除后不可恢复，确认删除吗?"
        ok-text="确定"
        cancel-text="取消"
        @confirm="onDeleteXzjd"
      >
        <h-button
          v-permissKey="'fwtDmXzjd:delete'"
          type="danger"
          plain
          :disabled="selectedRowKeys.length === 0"
          >删除</h-button
        >
      </a-popconfirm>
      <h-button v-permissKey="'fwtDmXzjd:export'" @click="showExport"
        >导出</h-button
      >
    </a-space>
    <h-table-data
      ref="tableRef"
      row-key="id"
      @loadData="loadData"
      @selection-change="selectionChange"
    >
      <a-table-column title="街道名称" data-index="dmmc"></a-table-column>
      <a-table-column title="代码" data-index="dmzm"></a-table-column>
      <a-table-column title="顺序号" data-index="dmsx"></a-table-column>
      <a-table-column title="操作" key="action">
        <template #="{ record }">
          <a-space>
            <span
              v-permissKey="'fwtDmXzjd:update'"
              class="h-action-text"
              @click="onEditXzjd(record.dmzm)"
              >编辑</span
            >
            <a-popconfirm
              title="状态删除请选择编辑，真实删除后不可恢复，确认删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeleteXzjd(record.dmzm)"
            >
              <span v-permissKey="'fwtDmXzjd:delete'" class="h-action-text"
                >删除</span
              >
            </a-popconfirm>
          </a-space>
        </template>
      </a-table-column>
    </h-table-data>

    <a-modal
      v-model:visible="xzjdModalData.visible"
      :title="xzjdModalData.type === '0' ? '新增乡镇街道' : '编辑乡镇街道'"
      width="800px"
      @cancel="onCancelXzjdModal"
      @ok="onSubmitXzjdModal"
    >
      <a-form
        :model="xzjdModalData.form"
        :label-col="{ span: 8 }"
        ref="roleFormRef"
      >
        <a-row>
          <a-col :span="12">
            <h-input
              required
              label="街道名称"
              name="dmmc"
              v-model:value="xzjdModalData.form.dmmc"
            ></h-input>
          </a-col>
          <a-col :span="12">
            <h-input
              :disabled="xzjdModalData.type === '1'"
              required
              label="街道代码"
              name="dmzm"
              v-model:value="xzjdModalData.form.dmzm"
            ></h-input>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <h-input
              required
              label="顺序号"
              name="dmsx"
              v-model:value="xzjdModalData.form.dmsx"
            ></h-input>
          </a-col>
          <a-col :span="12">
            <h-select
              v-model:value="xzjdModalData.form.yxbz"
              label="有效标志"
              name="yxbz"
              :columns="yxbzDict"
            ></h-select>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

    <h-modal-export
      ref="exportRef"
      @loadColumn="loadColumn"
      @export="onExport"
    ></h-modal-export>
  </section>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import ModuleTitle from "@/components/common/ModuleTitle.vue";
import {
  fwtDmXzjdPageApi,
  fwtDmXzjdDeleteApi,
  fwtDmXzjdCreate,
  fwtDmXzjdUpdateApi,
  fwtDmXzjdViewApi,
  fwtDmXzjdColumnApi,
  fwtDmXzjdExportApi,
} from "@/api/sysadmin/fwtDmXzjdApi";
import { yxbzDict } from "@/config/dict";
import { message } from "ant-design-vue";
const { proxy } = getCurrentInstance() as any;

let searchForm = ref<{ dmmc: string; dmzm: string; yxbz: string }>({
  dmmc: "",
  dmzm: "",
  yxbz: "",
});

const loadData = (params: any, callbacks: any) => {
  callbacks(fwtDmXzjdPageApi({ ...params, ...searchForm.value }));
  selectedRowKeys.value = [];
};
const selectionChange = (keys: string[]) => {
  selectedRowKeys.value = keys;
};
const tableRef = ref();
const onSearch = () => {
  tableRef.value.load(1);
};
const onReset = () => {
  tableRef.value.load(1);
};

const roleFormRef = ref();
let xzjdModalData = ref<any>({
  visible: false,
  type: "0",
  form: {},
});
const onAddXzjd = () => {
  xzjdModalData.value.type = "0";
  xzjdModalData.value.visible = true;
};
const onEditXzjd = async (id: string) => {
  const res = await fwtDmXzjdViewApi(id);
  xzjdModalData.value.type = "1";
  xzjdModalData.value.form = res;
  xzjdModalData.value.visible = true;
};
const onCancelXzjdModal = () => {
  xzjdModalData.value.visible = false;
  xzjdModalData.value.form = {};
};
const onSubmitXzjdModal = async () => {
  try {
    const res =
      xzjdModalData.value.type === "0"
        ? await fwtDmXzjdCreate(xzjdModalData.value.form)
        : await fwtDmXzjdUpdateApi(xzjdModalData.value.form);
    if (res) {
      message.success(
        xzjdModalData.value.type === "0" ? "新增成功" : "编辑成功"
      );
      xzjdModalData.value.visible = false;
      tableRef.value.load(1);
    }
  } catch (e) {}
};

let selectedRowKeys = ref<string[]>([]);
const onDeleteXzjd = async (recordId?: string) => {
  let id = recordId ? [recordId] : selectedRowKeys.value;
  let res = await fwtDmXzjdDeleteApi(id);
  if (res) {
    tableRef.value.load();
    message.success("删除成功！");
  }
};

const exportRef = ref();
const showExport = () => {
  exportRef.value.show();
};
const loadColumn = (callbacks: any) => {
  callbacks(fwtDmXzjdColumnApi);
};
const onExport = async (params: any) => {
  const data = await fwtDmXzjdExportApi({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "行政区划");
};
</script>

<style lang="less" scoped>
.box {
  border: 1px solid var(--border-color1);
  border-radius: var(--border-radius-box) var(--border-radius-box) 0 0;
  border-bottom: none;
}

.borders {
  border: 1px solid var(--border-color1);
  border-bottom: none;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}
</style>

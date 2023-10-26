<!--
 * @Author: gongxiaofei
 * @Date: 2023-06-30 10:23:46
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-14 15:43:09
 * @Description: 综治网格
-->
<template>
  <section class="h-page-section">
    <h-form-search
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
    >
      <a-col :span="5">
        <h-input v-model:value="searchForm.dmmc" label="网格名称" name="dmmc" />
      </a-col>
      <a-col :span="5">
        <h-input v-model:value="searchForm.dmzm" label="网格代码" name="dmzm" />
      </a-col>
      <a-col :span="5">
        <h-select-ssxq
          label="所属辖区"
          name="deptCode"
          @fwtDmXzqh="listSsxq"
          data-type="ga"
          v-model:value="searchForm.ssxq"
        ></h-select-ssxq>
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
    <a-space class="h-btn-space">
      <h-button
        v-permissKey="'fwtDmWg:create'"
        type="primary"
        @click="onCreateRecord"
        >新增</h-button
      >
      <h-button-delete
        v-permissKey="'fwtDmWg:delete'"
        plain
        :disabled="selectedRowKeys.length === 0"
        @delete="onDeleteRecord(selectedRowKeys)"
      />
      <h-button v-permissKey="'fwtDmWg:export'" @click="showExport"
        >导出</h-button
      >
    </a-space>
    <h-table-data
      ref="tableRef"
      row-key="dmzm"
      @loadData="loadData"
      @selection-change="selectionChange"
    >
      <a-table-column title="网格名称" data-index="dmmc"></a-table-column>
      <a-table-column title="网格代码" data-index="dmzm"></a-table-column>
      <a-table-column title="所属辖区" data-index="ssxqLabel"></a-table-column>
      <a-table-column title="操作" key="action">
        <template #="{ record }">
          <a-space :size="0">
            <h-button
              type="primary"
              size="small"
              link
              v-permissKey="'fwtDmWg:update'"
              @click="onUpdateRecord(record.dmzm)"
              >编辑</h-button
            >
            <h-button-delete
              size="small"
              link
              v-permissKey="'fwtDmWg:delete'"
              @delete="onDeleteRecord(record.dmzm)"
              >删除</h-button-delete
            >
          </a-space>
        </template>
      </a-table-column>
    </h-table-data>

    <a-modal
      v-model:visible="wgModalData.visible"
      :title="wgModalData.type === '0' ? '新增综治网格' : '编辑综治网格'"
      width="800px"
      @cancel="onCancelWgModal"
      @ok="onSubmitWgModal"
    >
      <a-form
        :model="wgModalData.form"
        :label-col="{ span: 8 }"
        ref="roleFormRef"
      >
        <a-row>
          <a-col :span="12">
            <h-input
              required
              label="网格名称"
              name="dmmc"
              v-model:value="wgModalData.form.dmmc"
            ></h-input>
          </a-col>
          <a-col :span="12">
            <h-input
              :disabled="wgModalData.type === '1'"
              required
              label="网格代码"
              name="dmzm"
              v-model:value="wgModalData.form.dmzm"
            ></h-input>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <h-select-ssxq
              class="flex-1"
              v-model:value="wgModalData.form.ssxq"
              name="ssxq"
              @listSsxq="listSsxq"
              :data-type="'zf'"
              label="行政区域"
              require
              :default-value="wgModalData.form.ssxq"
              :require-level="12"
              :min-level="12"
            ></h-select-ssxq>
          </a-col>
          <a-col :span="12">
            <h-select
              v-model:value="wgModalData.form.yxbz"
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
  fwtDmWgDeleteApi,
  fwtDmWgCreateApi,
  fwtDmWgUpdateApi,
  fwtDmWgViewApi,
  fwtDmWgColumnApi,
  fwtDmWgExport,
  // ssxqListByParentApi,
} from "@/api/sysadmin/fwtDmWgApi";
import { yxbzDict } from "@/config/dict";
import { message } from "ant-design-vue";
import { fwtDmXzjdPageApi } from "@/api/sysadmin/fwtDmXzjdApi";
import HButtonDelete from "@c/common/ButtonDelete/ButtonDelete.vue";
import HButton from "@c/common/Button/Button.vue";

const { proxy } = getCurrentInstance() as any;

let searchForm = ref<{
  dmmc: string;
  dmzm: string;
  ssxq: string;
  yxbz: string;
}>({
  dmmc: "",
  dmzm: "",
  ssxq: "",
  yxbz: "",
});

let selectedRowKeys = ref<string[]>([]);
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
let wgModalData = ref<any>({
  visible: false,
  type: "0",
  form: {},
});
const onCreateRecord = () => {
  wgModalData.value.type = "0";
  wgModalData.value.visible = true;
};
const onUpdateRecord = async (id: string) => {
  const res = await fwtDmWgViewApi(id);
  wgModalData.value.type = "1";
  wgModalData.value.form = res;
  wgModalData.value.visible = true;
};
const onCancelWgModal = () => {
  wgModalData.value.visible = false;
  wgModalData.value.form = {};
};
const onSubmitWgModal = async () => {
  try {
    const res =
      wgModalData.value.type === "0"
        ? await fwtDmWgCreateApi(wgModalData.value.form)
        : await fwtDmWgUpdateApi(wgModalData.value.form);
    if (res) {
      message.success(wgModalData.value.type === "0" ? "新增成功" : "编辑成功");
      wgModalData.value.visible = false;
      tableRef.value.load(1);
    }
  } catch (e) {}
};

const onDeleteRecord = (recordId: string | string[]) => {
  let id = typeof recordId === "string" ? [recordId] : recordId;
  fwtDmWgDeleteApi(id).then((res) => {
    if (res) {
      tableRef.value.load();
      message.success("删除成功！");
    }
  });
};

const exportRef = ref();
const showExport = () => {
  exportRef.value.show();
};
const loadColumn = (callbacks: any) => {
  callbacks(fwtDmWgColumnApi);
};
const onExport = async (params: any) => {
  const data = await fwtDmWgExport({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "综治网格");
};
</script>

<style lang="less" scoped></style>

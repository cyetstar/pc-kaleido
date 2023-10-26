<!--
 * @Author: gongxiaofei
 * @Date: 2023-06-30 10:23:07
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-14 15:42:07
 * @Description: 社区乡村
-->
<template>
  <section class="h-page-section">
    <h-form-search
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
    >
      <a-col :span="4">
        <h-input
          v-model:value="searchForm.dmmc"
          label="社区乡村名称"
          name="dmmc"
        />
      </a-col>
      <a-col :span="4">
        <h-input
          v-model:value="searchForm.dmzm"
          label="社区乡村代码"
          name="dmzm"
        />
      </a-col>
      <a-col :span="4">
        <h-select
          v-model:value="searchForm.yxbz"
          label="有效标志"
          name="yxbz"
          dict-type="yxbz"
        ></h-select>
      </a-col>
    </h-form-search>
    <a-space class="h-btn-space">
      <h-button
        v-permissKey="'fwtDmSqjwh:create'"
        type="primary"
        @click="onAddJwh"
      >
        <span>新增</span>
      </h-button>
      <a-popconfirm
        title="状态删除请选择编辑，真实删除后不可恢复，确认删除吗?"
        ok-text="确定"
        cancel-text="取消"
        @confirm="onDeleteJwh"
      >
        <h-button
          v-permissKey="'fwtDmJwh:delete'"
          type="danger"
          plain
          :disabled="selectedRowKeys.length === 0"
          >删除</h-button
        >
      </a-popconfirm>
      <h-button v-permissKey="'fwtDmJwh:export'" @click="showExport"
        >导出</h-button
      >
    </a-space>
    <h-table-data
      ref="tableRef"
      row-key="id"
      @loadData="loadData"
      @selection-change="selectionChange"
    >
      <a-table-column title="社区乡村名称" data-index="dmmc"></a-table-column>
      <a-table-column title="社区乡村代码" data-index="dmzm"></a-table-column>
      <a-table-column title="派出所" data-index="pcsdmLabel"></a-table-column>
      <a-table-column
        title="乡镇街道"
        data-index="xzjddmLabel"
      ></a-table-column>
      <a-table-column title="顺序号" data-index="dmsx"></a-table-column>
      <a-table-column title="操作" key="action">
        <template #="{ record }">
          <a-space class="h-column-space">
            <span
              v-permissKey="'fwtDmSqjwh:update'"
              class="h-action-text"
              @click="onEditJwh(record.dmzm)"
              >编辑</span
            >
            <a-popconfirm
              title="状态删除请选择编辑，真实删除后不可恢复，确认删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onDeleteJwh(record.dmzm)"
            >
              <span v-permissKey="'fwtDmSqjwh:delete'" class="h-action-text"
                >删除</span
              >
            </a-popconfirm>
          </a-space>
        </template>
      </a-table-column>
    </h-table-data>

    <a-modal
      v-model:visible="jwhModalData.visible"
      :title="jwhModalData.type === '0' ? '新增社区乡村' : '编辑社区乡村'"
      width="800px"
      @cancel="onCancelJwhModal"
      @ok="onSubmitJwhModal"
    >
      <a-form
        :model="jwhModalData.form"
        :label-col="{ span: 8 }"
        ref="roleFormRef"
      >
        <a-row>
          <a-col :span="12">
            <h-input
              required
              label="社区乡村名称"
              name="dmmc"
              v-model:value="jwhModalData.form.dmmc"
            ></h-input>
          </a-col>
          <a-col :span="12">
            <h-input
              :disabled="jwhModalData.type === '1'"
              required
              label="社区乡村代码"
              name="dmzm"
              v-model:value="jwhModalData.form.dmzm"
            ></h-input>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <h-select-ssxq
              class="flex-1"
              v-model:value="jwhModalData.form.pcsdm"
              name="pcsdm"
              @listSsxq="listSsxq"
              :data-type="'ga'"
              label="派出所"
              require
              :default-value="jwhModalData.form.pcsdm"
              :min-level="9"
              :require-level="9"
            ></h-select-ssxq>
          </a-col>
          <a-col :span="12">
            <h-select-ssxq
              class="flex-1"
              v-model:value="jwhModalData.form.xzjddm"
              name="xzjddm"
              @listSsxq="listSsxq"
              :data-type="'zf'"
              label="乡镇街道"
              require
              :default-value="jwhModalData.form.xzjddm"
              :min-level="9"
              :require-level="9"
            ></h-select-ssxq>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <h-input
              required
              label="顺序号"
              name="dmsx"
              v-model:value="jwhModalData.form.dmsx"
            ></h-input>
          </a-col>
          <a-col :span="12">
            <h-select
              v-model:value="jwhModalData.form.yxbz"
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
  fwtDmSqjwhPageApi,
  fwtDmSqjwhDeleteApi,
  fwtDmSqjwhCreateApi,
  fwtDmSqjwhUpdateApi,
  fwtDmSqjwhViewApi,
  fwtDmSqjwhColumnApi,
  fwtDmSqjwhExportApi,
  // ssxqListByParentApi,
} from "@/api/sysadmin/fwtDmSqjwhApi";
import { yxbzDict } from "@/config/dict";
import { message } from "ant-design-vue";
const { proxy } = getCurrentInstance() as any;

let searchForm = ref<{ dmmc: string; dmzm: string; yxbz: string }>({
  dmmc: "",
  dmzm: "",
  yxbz: "",
});

const loadData = (params: any, callbacks: any) => {
  callbacks(fwtDmSqjwhPageApi({ ...params, ...searchForm.value }));
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
let jwhModalData = ref<any>({
  visible: false,
  type: "0",
  form: {
    dmzm: "",
    dmmc: "",
    dmsx: "",
    pcsdm: "",
    xzjddm: "",
    yxbz: "1",
  },
});
const onAddJwh = () => {
  jwhModalData.value.type = "0";
  jwhModalData.value.visible = true;
};
const onEditJwh = async (id: string) => {
  const res = await fwtDmSqjwhViewApi(id);
  jwhModalData.value.type = "1";
  jwhModalData.value.form = res;
  jwhModalData.value.visible = true;
};
const onCancelJwhModal = () => {
  jwhModalData.value.visible = false;
  jwhModalData.value.form = {
    dmzm: "",
    dmmc: "",
    dmsx: "",
    pcsdm: "",
    xzjddm: "",
    yxbz: "1",
  };
};
const onSubmitJwhModal = async () => {
  try {
    const res =
      jwhModalData.value.type === "0"
        ? await fwtDmSqjwhCreateApi(jwhModalData.value.form)
        : await fwtDmSqjwhUpdateApi(jwhModalData.value.form);
    if (res) {
      message.success(
        jwhModalData.value.type === "0" ? "新增成功" : "编辑成功"
      );
      jwhModalData.value.visible = false;
      tableRef.value.load(1);
    }
  } catch (e) {}
};

let selectedRowKeys = ref<string[]>([]);
const onDeleteJwh = async (recordId?: string) => {
  let id = recordId ? [recordId] : selectedRowKeys.value;
  let res = await fwtDmSqjwhDeleteApi(id);
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
  callbacks(fwtDmSqjwhColumnApi);
};
const onExport = async (params: any) => {
  const data = await fwtDmSqjwhExportApi({
    ...params,
    ...searchForm.value,
  });
  proxy.$dowloadExcel(data, "社区乡村");
};

const listSsxq = (callbacks: any) => {
  // callbacks(ssxqListByParentApi);
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

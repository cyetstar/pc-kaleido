<!--
 * @Author: gongxiaofei
 * @Date: 2023-07-03 17:10:09
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-07-03 17:29:42
 * @Description: 字典详情
-->
<template>
  <section class="h-page-section">
    <ModuleTitle title="基本信息" class="mb-20px"></ModuleTitle>
    <a-row>
      <h-col :span="8">
        <span style="color: #333">字典名称：{{ form.name }}</span>
      </h-col>
      <h-col :span="8">
        <span style="color: #333">字典类型：{{ form.type }}</span>
      </h-col>
    </a-row>

    <ModuleTitle title="字典项" class="mt-40px"></ModuleTitle>

    <a-space class="h-btn-space">
      <h-button type="primary" @click="onCreateBatchRecord">批量新增</h-button>
      <h-button type="primary" @click="onCreateRecord">新增</h-button>
    </a-space>

    <a-table
      bordered
      size="small"
      row-key="id"
      :pagination="false"
      :dataSource="dataSource"
    >
      <a-table-column title="字典项名" data-index="label"></a-table-column>
      <a-table-column title="字典项值" data-index="value"></a-table-column>
      <a-table-column title="顺序" data-index="sort"></a-table-column>
      <a-table-column title="操作" key="action">
        <template v-slot="{ record }">
          <a-space :size="0">
            <h-button
              type="primary"
              link
              size="small"
              v-permissKey="'sysDict:update'"
              @click="onUpdateRecord(record.id)"
              >编辑</h-button
            >
            <h-button-delete
              link
              size="small"
              v-permissKey="'sysDict:delete'"
              @delete="onDeleteRecord(record.id)"
              >删除</h-button-delete
            >
          </a-space>
        </template>
      </a-table-column>
    </a-table>

    <sys-dict-form ref="formRef" @save-complete="saveComplete"></sys-dict-form>
    <sys-dict-create-batch
      ref="formBatchRef"
      @save-complete="saveComplete"
    ></sys-dict-create-batch>
  </section>
</template>

<script setup lang="ts">
import sysDictForm from "../sysDict/sysDictForm.vue";
import sysDictCreateBatch from "../sysDict/sysDictCreateBatch.vue";
import ModuleTitle from "@/components/common/ModuleTitle.vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { sysDictTypeViewApi } from "@/api/sysadmin/sysDictTypeApi";
import {
  sysDictDeleteApi,
  sysDictListByDictTypeApi,
} from "@/api/sysadmin/sysDictApi";

let formRef = ref();
let formBatchRef = ref();
let dataSource = ref<[]>();

const route = useRoute();
const router = useRouter();

let id = ref<string>((route.query.id as string) || "");
let form = reactive<any>({
  name: "",
  type: "",
});

onMounted(() => {
  initData();
});

const initData = async () => {
  if (id) {
    sysDictTypeViewApi(id.value).then((data) => {
      Object.assign(form, data);
      return listByDictType();
    });
  }
};
const listByDictType = async () => {
  sysDictListByDictTypeApi(form.type).then((data) => {
    dataSource.value = data;
  });
};

const onUpdateRecord = (id: string) => {
  formRef.value.update(id);
};
const onDeleteRecord = async (id: string | string[]) => {
  let ids = typeof id === "string" ? [id] : id;
  sysDictDeleteApi(ids).then((res) => {
    if (res) {
      message.success("操作成功！");
      listByDictType();
    }
  });
};
const onCreateRecord = () => {
  formRef.value.create(form.type);
};

const onCreateBatchRecord = () => {
  formBatchRef.value.create(form.type);
};
const saveComplete = () => {
  listByDictType();
};

let selectedRowKeys = ref<string[]>([]);
const selectionChange = (keys: string[]) => {
  selectedRowKeys.value = keys;
};
</script>

<style lang="less" scoped></style>

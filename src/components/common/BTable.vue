<!--
 * @Author: gongxiaofei
 * @Date: 2022-06-23 14:24:23
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-08-04 10:22:25
 * @Description: 基础公共table组件
-->
<template>
  <a-table
    :data-source="tableData"
    bordered
    :columns="columns"
    :loading="state.loading"
    :row-selection="{
      selectedRowKeys: state.selectedRowKeys,
      onChange: onSelectChange,
    }"
    :pagination="pagination"
    @change="handleChange"
  >
    <!-- <template #[item]="scope" v-for="item in renderArr">
      <slot :name="item" :scope="scope"></slot>
    </template> -->
    <a-table-column>
      <template #headerCell="{ column }">
        <slot :name="column.title">
          {{ column.title }}
        </slot>
      </template>
      <template #bodyCell="{ column, record }">
        <slot :name="column.dataIndex" :row="record">
          <!-- {{ row[column.dataIndex] }} -->
        </slot>
      </template>
    </a-table-column>
  </a-table>
</template>

<script setup lang="ts" name="BTable">
import { reactive } from "vue";

const emits = defineEmits(["batch"]);

type Key = string | number;
interface columnsType {
  title: string;
  dataIndex: string;
  slotName: string;
}
interface PropsType {
  tableData: [];
  columns: [];
  mergeData?: [];
  pagination?: any;
}

// interface paginationType {
//   current: number
//   total: number
//   pageSiez: number
//   showTotal: () => string
//   showQuickJumper: boolean
//   showSizeChanger: boolean
// }

const props = withDefaults(defineProps<PropsType>(), {
  tableData: () => [],
  columns: () => [],
  mergeData: () => [],
  pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
    showTotal: (t: string | number) => `共 ${t} 条记录`,
    showQuickJumper: true,
    showSizeChanger: true,
  },
});

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [],
  loading: false,
});

const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  emits("batch", selectedRowKeys);
  // state.selectedRowKeys = selectedRowKeys
};

const handleChange = () => {};
</script>

<style lang="less"></style>

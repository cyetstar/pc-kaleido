<!--
 * @Author: gongxiaofei
 * @Date: 2022-06-23 17:45:16
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-07-29 10:30:10
 * @Description: 
-->
<template>
  <!-- 表格组件 -->
  <a-table
    :dataSource="dataSource"
    :columns="columns"
    :pagination="false"
    :row-selection="isSelect ? rowSelection1 : null"
  >
    <template #[item]="scope" v-for="item in renderArr">
      <slot :name="item" :scope="scope"></slot>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
// 把setup放在 script 标签里面,相当于 setup()语法糖, 具体可以看vue的官网
import { useSlots } from "vue";
//如果要知道使用插槽的实例需要引入 useSlots

defineProps({
  dataSource: Object,
  columns: Object,
  isSelect: Boolean,
});
// defineProps是3.2中新的语法,不需要从 vue里面引入出来

const slots = useSlots();
// 插槽的实例

const renderArr = Object.keys(slots);
// 渲染的数据

const emits = defineEmits(["batch"]);

// 是否多选
const rowSelection1 = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
    emits("batch", selectedRowKeys);
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};
</script>

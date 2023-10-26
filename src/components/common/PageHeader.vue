<!--
 * @Author: gongxiaofei
 * @Date: 2022-08-07 15:30:28
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-06-13 14:19:37
 * @Description: 页头组件
-->
<template>
  <a-page-header class="page-header" :title="title" @back="handleClick">
    <template #backIcon>
      <left-outlined />
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
import { ref, withDefaults } from "vue";
import { LeftOutlined } from "@ant-design/icons-vue";
import { router } from "@/router";
interface PageHeader {
  title: string;
  subTitle?: string;
}
const props = withDefaults(defineProps<PageHeader>(), {
  title: "",
});

const emits = defineEmits(["goBack"]);

const handleClick = () => {
  emits("goBack");
  // router.back()
};
</script>
<style lang="less" scoped>
.page-header {
  // box-shadow: 0px 2px 8px 0px #EEEEEE;
}
:deep(.ant-page-header-heading-left) {
  cursor: pointer;
}
:deep(.ant-page-header-back-button) {
  display: flex !important;
}
</style>

<!--
 * @Author: songtao
 * @Date: 2023-06-16 15:23:19
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-18 15:29:39
 * @Description: 模块标题组件
-->
<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      <span class="w-6px h-16px bg-[var(--theme-color)] rounded-3px"></span>
      <span class="title">{{ title }}</span>
    </div>
    <div>
      <slot name="operate"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 22px;
  margin-left: 8px;
}
</style>

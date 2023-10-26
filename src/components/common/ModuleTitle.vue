<!--
 * @Author: gongxiaofei
 * @Date: 2023-04-11 15:46:54
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-06-13 14:29:09
 * @Description: 模块标题组件
-->
<template>
  <div class="flex justify-between">
    <div class="flex items-center">
      <span class="w-4px h-15px bg-[var(--theme-color)] rounded-2px"></span>
      <span class="color-[var(--font-color)] text-16px font-800 ml-7px">{{
        title
      }}</span>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";

type Title = {
  title: string;
};
const props = withDefaults(defineProps<Title>(), {
  title: "",
});
</script>

<style lang="less" scoped></style>

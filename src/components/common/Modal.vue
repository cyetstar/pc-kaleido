<!--
 * @Author: gongxiaofei
 * @Date: 2022-08-10 11:02:18
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-08-10 14:16:49
 * @Description: 
-->
<template>
  <section class="modal bg-[#FFFFFF] rounded-5px p-20px">
    <!-- <slot name="solt"></slot> -->
    <div class="flex justify-between">
      <div class="flex items-center mb-20px">
        <span class="w-4px h-15px bg-[#0071FF] rounded-2px"></span>
        <span class="color-[#333333] text-16px font-800 ml-7px">{{
          title
        }}</span>
      </div>
      <slot name="titleOther"></slot>
    </div>
    <slot name="headerOther"></slot>
    <slot name="modalMain"></slot>
  </section>
</template>

<script setup lang="ts">
interface Modal {
  title: string;
}
const props = withDefaults(defineProps<Modal>(), {
  title: "",
});
</script>

<style lang="less" scoped></style>

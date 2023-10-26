<!--
 * @Author: gongxiaofei
 * @Date: 2022-08-05 14:05:19
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-09-26 14:44:20
 * @Description: 
-->
<template>
  <section id="main-section">
    <router-view v-slot="{ Component }" :key="route.fullPath">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="less" scoped>
#main-section {
  background: rgba(238, 238, 238, 0.93);
}
</style>

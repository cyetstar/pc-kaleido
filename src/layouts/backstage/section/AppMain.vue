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
        <h-global-config
          :plex-url="appStore.$state.plexUrl"
          :plex-token="appStore.$state.plexToken"
        >
          <component :is="Component"></component>
        </h-global-config>
      </transition>
    </router-view>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/modules/app";
const route = useRoute();
const appStore = useAppStore();
</script>

<style lang="less" scoped>
#main-section {
  background: rgba(238, 238, 238, 0.93);
}
</style>

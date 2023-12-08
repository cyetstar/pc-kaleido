<!--
 * @Author: gongxiaofei
 * @Date: 2022-08-05 14:05:19
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-09-26 14:44:20
 * @Description: 
-->
<template>
  <section id="main-section">
    <k-global-config
      :plex-url="appStore.$state.config.plexUrl"
      :plex-token="appStore.$state.config.plexToken"
    >
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component
            v-if="route.meta.keepAlive"
            :is="Component"
            :key="route.name"
          />
        </keep-alive>
        <component
          v-if="!route.meta.keepAlive"
          :is="Component"
          :key="route.name"
        />
      </router-view>
    </k-global-config>
  </section>
</template>

<script setup>
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
</script>

<style lang="less" scoped>
#main-section {
  background: rgba(238, 238, 238, 0.93);
}
</style>

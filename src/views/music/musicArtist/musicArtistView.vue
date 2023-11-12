<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 00:14:19
 * @Description: 艺术家详情页面
-->
<template>
  <section class="page-section">
    <div class="view-box">
      <div class="view-item">
        <span class="view-item-label">主键: </span>
        <span class="view-item-value">{{ viewData.id }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">MusicBrainzId: </span>
        <span class="view-item-value">{{ viewData.musicbrainzId }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">Plex编号: </span>
        <span class="view-item-value">{{ viewData.plexId }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">名称: </span>
        <span class="view-item-value">{{ viewData.mc }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">艺术家类型: </span>
        <span class="view-item-value">{{ viewData.ysjlx }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">国家地区: </span>
        <span class="view-item-value">{{ viewData.gjdq }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">简介: </span>
        <span class="view-item-value">{{ viewData.jj }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">创建时间: </span>
        <span class="view-item-value">{{ viewData.cjsj }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">修改时间: </span>
        <span class="view-item-value">{{ viewData.xgsj }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {musicArtistViewApi} from "@/api/music/musicArtistApi.ts";

const route = useRoute()
const id = route.query.id

const viewData = ref({})
const getView = async () => {
  const res = await musicArtistViewApi({ id })
  viewData.value = res
}
onMounted(() => {
  getView()
})
</script>

<style lang='less' scoped>
  .view-box {
    display: flex;
    flex-wrap: wrap;
    gap: 20;
  }

  .view-item {
    width: 50%;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: 14px;

  &-label {
     min-width: 90px;
   }

  &-value {
     flex: 1;
   }
  }
</style>
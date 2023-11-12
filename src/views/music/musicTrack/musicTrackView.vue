<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 00:14:19
 * @Description: 曲目详情页面
-->
<template>
  <section class="page-section">
    <div class="view-box">
      <div class="view-item">
        <span class="view-item-label">主键: </span>
        <span class="view-item-value">{{ viewData.id }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">发行品id: </span>
        <span class="view-item-value">{{ viewData.releaseId }}</span>
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
        <span class="view-item-label">标题: </span>
        <span class="view-item-value">{{ viewData.bt }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">艺术家: </span>
        <span class="view-item-value">{{ viewData.ysj }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">长度: </span>
        <span class="view-item-value">{{ viewData.cd }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">曲号: </span>
        <span class="view-item-value">{{ viewData.qh }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">碟号: </span>
        <span class="view-item-value">{{ viewData.dh }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">文件格式: </span>
        <span class="view-item-value">{{ viewData.wjgs }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">文件路径: </span>
        <span class="view-item-value">{{ viewData.wjlj }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">是否有歌词: </span>
        <span class="view-item-value">{{ viewData.sfygc }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">是否缺损: </span>
        <span class="view-item-value">{{ viewData.sfqs }}</span>
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
import {musicTrackViewApi} from "@/api/music/musicTrackApi.ts";

const route = useRoute()
const id = route.query.id

const viewData = ref({})
const getView = async () => {
  const res = await musicTrackViewApi({ id })
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
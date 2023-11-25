<!--
 * @Author: cyetstar
 * @Date: 2023-11-26 01:20:15
 * @Description: 电影标签详情页面
-->
<template>
  <section class="page-section">
    <div class="view-box">
      <div class="view-item">
        <span class="view-item-label">电影id: </span>
        <span class="view-item-value">{{ record.movieId }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">主键: </span>
        <span class="view-item-value">{{ record.id }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">标识: </span>
        <span class="view-item-value">{{ record.tag }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {apiMovieTagView} from "@/api/movie/movieTagApi.ts";

const route = useRoute()
const id = route.query.id

const record = ref({})
const initData = async () => {
  const res = await apiMovieTagView({ id })
  record.value = res
}
onMounted(() => {
  initData()
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
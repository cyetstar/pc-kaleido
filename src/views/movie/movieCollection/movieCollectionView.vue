<!--
 * @Author: cyetstar
 * @Date: 2023-11-26 01:20:15
 * @Description: 电影集合详情页面
-->
<template>
  <section class="k-view-section">
    <a-page-header :title="record.title" @back="() => $router.go(-1)">
      <template #backIcon>
        <LeftOutlined/>
      </template>
      <template #extra>
        <a-space>
          <h-button-delete @delete="onDelete">删除</h-button-delete>
          <h-button @click="onSyncPlexById">同步Plex</h-button>
        </a-space>
      </template>
    </a-page-header>
    <section class="flex">
      <k-plex-image
          style="width: 250px"
          class="h-poster"
          :plex-thumb="record.thumb"/>
      <div class="flex-1 ml-8">
        <p>
          <p v-for="(item, index) in record.summaryList" :key="index">
            {{ item }}
          </p>
        </p>
        <p>
          <k-logo-link type="plex" :id="record.id" class="mr-3"/>
        </p>
      </div>
    </section>
    <section v-if="isNotEmpty(movieList)">
      <h-module-title title="电影"/>
      <div class="grid grid-cols-24 gap-6">
        <template :key="item.id" v-for="item in movieList">
          <a-card class="k-card col-span-3">
            <template #cover>
              <k-plex-image
                  class="h-thumb cursor-pointer"
                  :preview="false"
                  :plex-thumb="item.thumb"
                  @click="onViewMovieRecord(item.id)"
              />
            </template>
            <a-card-meta
                :title="item.title"
                :description="item.year"
            ></a-card-meta>
          </a-card>
        </template>
      </div>
    </section>
  </section>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {apiMovieCollectionDelete, apiMovieCollectionView} from "@/api/movie/movieCollectionApi.ts";
import {isNotEmpty} from "@ht/util";
import {apiMovieBasicListByCollectionId, apiMovieCollectionSyncPlexById} from "@/api/movie/movieBasicApi";
import {message} from "ant-design-vue";

const route = useRoute()
const router = useRouter()
const id = route.query.id

const record = ref({})
const movieList = ref([])
const initData = async () => {
  apiMovieCollectionView({id}).then(res => {
    record.value = res
  })
  apiMovieBasicListByCollectionId({collectionId: id}).then(res => {
    movieList.value = res
  })
}

const onSyncPlexById = (id) => {
  apiMovieCollectionSyncPlexById({id}).then(res => {
    if (res) {
      message.success("同步成功");
      initData();
    }
  })
}

const onViewMovieRecord = (id) => {
  router.push({path: "/movie/movieBasic/view", query: {id}});
}

const onDelete = () => {
  apiMovieCollectionDelete([id]).then((res) => {
    if (res) {
      message.success('删除成功');
      router.push("/movie/movieCollection/page");
    } else {
      message.error('删除失败');
    }

  })
}
onMounted(() => {
  initData()
})
</script>
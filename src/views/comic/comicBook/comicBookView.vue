<!--
 * @Author: cyetstar
 * @Date: 2024-03-12 17:49:02
 * @Description: 漫画书籍详情页面
-->
<template>
  <section class="k-view-section">
    <a-page-header :title="record.title" @back="() => $router.go(-1)">
      <template #backIcon>
        <LeftOutlined/>
      </template>
      <template #extra>
        <a-space>
          <h-button @click="onFileManage">文件管理</h-button>
          <h-button @click="onReadNFO">读取NFO</h-button>
          <h-button @click="onSyncPlex">同步Plex</h-button>
        </a-space>
      </template>
    </a-page-header>
    <section class="flex">
      <k-cover-image v-if="record.id"
          class="h-poster"
          style="width: 250px"
          type="comic" sub="book"
          :thumb="record.id"
      />
      <p v-if="isNotEmpty(summaryList)">
        <p v-for="(item, index) in summaryList" :key="index">
          {{ item }}
        </p>
      </p>
      <div class="flex-1 ml-8">
        <p class="flex" v-if="isNotEmpty(record.authorList)">
          <span class="mr-2">作者:</span>
          <span class="flex-1">
            <template v-for="(item, index) in record.authorList">
              <span v-if="index !== 0" class="px-2">/</span>
              {{ item.name }}
            </template>
          </span>
        </p>
        <p class="flex" v-if="isNotEmpty(record.pageCount)">
          <span class="mr-2">页数:</span>
          <span class="flex-1">{{ record.pageCount }}</span>
        </p>
        <p class="flex" v-if="isNotEmpty(record.fileSize)">
          <span class="mr-2">文件大小:</span>
          <span class="flex-1">{{ record.fileSizeLabel }}</span>
        </p>
        <p>
          <k-logo-link type="komga" sub="book" :id="record.id" class="mr-3"/>
          <k-logo-link type="bgm" :id="record.bgmId" class="mr-3"/>
        </p>
      </div>
    </section>
    <section v-if="isNotEmpty(record.actorList)">
      <h-module-title title="主演"/>
      <div class="grid grid-cols-24 gap-6">
        <template :key="item.id" v-for="item in actorList">
          <a-card class="k-card col-span-3">
            <template #cover>
              <k-plex-image
                  class="h-thumb"
                  :preview="false"
                  :plex-thumb="item.thumb"
              />
            </template>
            <a-card-meta
                :title="item.name"
                :description="item.playRole"
            ></a-card-meta>
          </a-card>
        </template>
      </div>
    </section>
  </section>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import {FileTextOutlined, LeftOutlined} from "@ant-design/icons-vue";
import {useRoute, useRouter} from "vue-router";
import {isNotEmpty} from "@ht/util";
import {apiComicBookView} from "@/api/comic/comicBookApi";

const route = useRoute()
const router = useRouter()
const record = ref({})
const id = route.query.id;
const actorList = computed(() => {
  if (isNotEmpty(record.value.actorList) && record.value.actorList.length > 8) {
    return record.value.actorList.slice(0, 8)
  }
  return record.value.actorList;
});
const summaryList = computed(() => {
  if (isNotEmpty(record.value.summary)) {
    return record.value.summary.split("\n")
  }
  return null;
});

const initData = async () => {
  apiComicBookView({id}).then((res) => {
    record.value = res
  });
};

onMounted(() => {
  initData()
})
</script>
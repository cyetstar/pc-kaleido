<!--
 * @Author: cyetstar
 * @Date: 2023-11-28 01:40:40
 * @Description: 剧集详情页面
-->
<template>
  <section class="h-page-section">
    <a-page-header :title="record.title" @back="() => $router.go(-1)">
      <template #backIcon>
        <LeftOutlined/>
      </template>
      <template #extra>
        <a-space>
          <h-button @click="onSearchDouban">匹配豆瓣</h-button>
          <h-button @click="onViewNFO">查看NFO</h-button>
          <h-button @click="onReadNFO">读取NFO</h-button>
          <h-button @click="onRefreshPlexById">刷新Plex</h-button>
          <h-button @click="onSyncPlexById">同步Plex</h-button>
        </a-space>
      </template>
    </a-page-header>
    <a-row class="mb-4">
      <h-col :span="8">
        <div class="flex justify-center">
          <k-plex-image
              class="h-poster"
              style="width: 250px"
              :plex-thumb="record.thumb"
          />
        </div>
      </h-col>
      <h-col :span="16" class="pr-20px">
        <p>{{ record.originalTitle }} ({{ record.year }})</p>
        <p class="flex">
          <span class="mr-2">{{ record.rating }} 分</span>
          <a-rate v-model:value="rating" disabled allow-half/>
        </p>
        <p>
          <a-tag v-if="record.contentRating">{{ record.contentRating }}</a-tag>
          <a-tag v-for="item in record.genreList" :key="item.id"
          >{{ item.idLabel }}
          </a-tag>
        </p>
        <p>
          <section v-for="(item, index) in record.summaryList" :key="index">
            {{ item }}
          </section>
        </p>
        <p class="flex" v-if="isNotEmpty(record.studio)">
          <span class="mr-2">制片方:</span>
          <span class="flex-1">{{ record.studio }}</span>
        </p>
        <p>
          <k-logo-link type="plex" :id="record.id" class="mr-3"/>
          <k-logo-link type="imdb" :id="record.imdb" class="mr-3"/>
          <k-logo-link type="douban" :id="record.doubanId" class="mr-3"/>
        </p>
      </h-col>
    </a-row>
    <div class="p-20px">
      <h-module-title title="主演"/>
      <div class="grid grid-cols-24 gap-x-3 gap-y-3">
        <template :key="item.id" v-for="item in actorList">
          <h-col :span="3">
            <a-card>
              <template #cover>
                <k-plex-image
                    class="h-thumb"
                    :preview="false"
                    :plex-thumb="item.thumb"
                    @click="onViewRecord(item.id)"
                />
              </template>
              <a-card-meta
                  :title="item.name"
                  :description="item.playRole"
              ></a-card-meta>
            </a-card>
          </h-col>
        </template>
      </div>

    </div>
  </section>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import { useRoute } from "vue-router";
import {apiTvshowShowView} from "@/api/tvshow/tvshowShowApi.ts";
import {LeftOutlined} from "@ant-design/icons-vue";
import {isNotEmpty} from "@/utils/is";

const route = useRoute()
const record = ref({})
const id = route.query.id;
const rating = computed(() => record.value.rating / 2);
const actorList = computed(() => {
  if (isNotEmpty(record.value.actorList) && record.value.actorList.length > 8) {
    return record.value.actorList.slice(0, 8)
  }
});

const initData = async () => {
  apiTvshowShowView({id}).then((res) => {
    record.value = res
  });
};
onMounted(() => {
  initData()
})
</script>
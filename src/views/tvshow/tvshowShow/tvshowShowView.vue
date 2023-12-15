<!--
 * @Author: cyetstar
 * @Date: 2023-11-28 01:40:40
 * @Description: 剧集详情页面
-->
<template>
  <section class="k-view-section">
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
    <section class="flex">
      <k-plex-image
          class="h-poster"
          style="width: 250px"
          :plex-thumb="record.thumb"
      />
      <div class="flex-1 ml-8">
        <p>{{ record.originalTitle }} <span v-if="isNotEmpty(record.year)">({{ record.year }})</span></p>
        <p class="flex items-center">
          <span v-if="isNotEmpty(record.rating)" class="mr-2">{{ record.rating }} 分</span>
          <a-rate v-model:value="rating" disabled allow-half/>
        </p>
        <p>
          <a-tag v-if="record.contentRating">{{ record.contentRating }}</a-tag>
          <a-tag v-for="item in record.genreList" :key="item.id"
          >{{ item.idLabel }}
          </a-tag>
        </p>
        <p v-if="isNotEmpty(summaryList)">
          <p v-for="(item, index) in summaryList" :key="index">
            {{ item }}
          </p>
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
      </div>
    </section>
    <section v-if="isNotEmpty(episodeRecords)">
      <h-module-title title="单集"/>
      <div class="flex mb-6" v-for="episodeRecord in episodeRecords" :key="episodeRecord.id">
        <k-plex-image
            style="object-fit: cover; aspect-ratio: 16 / 9; width: 200px"
            :plex-thumb="episodeRecord.thumb"
        />
        <div class="flex-1 ml-6">
          <p>第 {{ episodeRecord.episodeIndex }} 集 {{ episodeRecord.title }}</p>
          <p>{{ episodeRecord.summary }}</p>
        </div>
      </div>
    </section>
    <section v-if="isNotEmpty(seasonRecords)">
      <h-module-title title="单季"/>
      <div class="grid grid-cols-24 gap-6">
        <template :key="seasonRecord.id" v-for="seasonRecord in seasonRecords">
          <a-card class="k-card col-span-3">
            <template #cover>
              <k-plex-image
                  class="h-poster"
                  :preview="false"
                  :plex-thumb="seasonRecord.thumb"
                  @click="onViewSeason(seasonRecord.id)"
              />
            </template>
            <a-card-meta :title="seasonRecord.title">
            </a-card-meta>
          </a-card>
        </template>
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
import {apiTvshowShowView} from "@/api/tvshow/tvshowShowApi.ts";
import {apiTvshowEpisodePage} from "@/api/tvshow/tvshowEpisodeApi";
import {apiTvshowSeasonPage} from "@/api/tvshow/tvshowSeasonApi";

const route = useRoute()
const router = useRouter()
const record = ref({})
const episodeRecords = ref([]);
const seasonRecords = ref([]);
const id = route.query.id;
const rating = computed(() => record.value.rating / 2);
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
  apiTvshowShowView({id}).then((res) => {
    record.value = res
    if (res.totalSeasons === 1) {
      apiTvshowEpisodePage({pageSize: 1000, showId: id}).then(({records}) => {
        episodeRecords.value = records
      })
    } else {
      apiTvshowSeasonPage({pageSize: 1000, showId: id}).then(({records}) => {
        seasonRecords.value = records
      })
    }
  });
};

const onViewSeason = (id) => {
  router.push({path: "/tvshow/tvshowSeason/view", query: {id, title: record.value.title}})
};

onMounted(() => {
  initData()
})
</script>
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
          <h-button @click="onFileManage">文件管理</h-button>
          <h-button @click="onReadNFO">读取NFO</h-button>
          <h-button @click="onSyncPlex">同步Plex</h-button>
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
        <p>
          <k-logo-link type="plex" :id="record.id" class="mr-3"/>
          <k-logo-link type="imdb" :id="record.imdb" class="mr-3"/>
          <k-logo-link type="tmdbtv" :id="record.tmdbId" class="mr-3"/>
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
  <tvshow-season-file-manage ref="refTvshowSeasonFileManage"/>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import {FileTextOutlined, LeftOutlined} from "@ant-design/icons-vue";
import {useRoute, useRouter} from "vue-router";
import {isNotEmpty} from "@ht/util";
import {apiTvshowEpisodePage} from "@/api/tvshow/tvshowEpisodeApi";
import {
  apiTvshowSeasonPage,
  apiTvshowSeasonReadNFO,
  apiTvshowSeasonSyncPlex,
  apiTvshowSeasonView
} from "@/api/tvshow/tvshowSeasonApi";
import {apiTvshowShowReadNFO, apiTvshowShowSyncPlex} from "@/api/tvshow/tvshowShowApi";
import {message} from "ant-design-vue";
import TvshowShowFileManage from "@/views/tvshow/tvshowShow/tvshowShowFileManage.vue";
import TvshowSeasonFileManage from "@/views/tvshow/tvshowSeason/tvshowSeasonFileManage.vue";

const route = useRoute()
const router = useRouter()
const record = ref({})
const episodeRecords = ref([]);
const seasonRecords = ref([]);
const refTvshowSeasonFileManage = ref();
const id = route.query.id;
const title = route.query.title
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
  apiTvshowSeasonView({id}).then((res) => {
    record.value = res
  });
  apiTvshowEpisodePage({pageSize: 1000, seasonId: id}).then(({records}) => {
    episodeRecords.value = records
  })
};

const onFileManage = () => {
  refTvshowSeasonFileManage.value.show(id);
};

const onReadNFO = () => {
  apiTvshowSeasonReadNFO({id}).then((res) => {
    if (res) {
      message.success("读取成功");
      initData();
    } else {
      message.error("读取失败");
    }
  })
}

const onSyncPlex = () => {
  apiTvshowSeasonSyncPlex({id}).then((res) => {
    if (res) {
      message.success("同步成功");
      initData();
    } else {
      message.error("读取失败");
    }
  })
}


onMounted(() => {
  initData()
})
</script>
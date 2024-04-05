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
          <h-button @click="onSearchInfo">抓取信息</h-button>
          <h-button @click="onReadNFO">读取NFO</h-button>
          <h-button @click="onSyncPlex">同步Plex</h-button>
        </a-space>
      </template>
    </a-page-header>
    <section class="flex">
      <div>
        <k-cover-image v-if="record.id"
            class="h-poster"
            style="width: 250px"
            type="comic"
            :thumb="record.id"
        />
      </div>
      <div class="flex-1 ml-8">
        <p class="flex items-center">
          <span v-if="isNotEmpty(record.rating)" class="mr-2">{{ record.rating }} 分</span>
          <a-rate v-model:value="rating" disabled allow-half/>
        </p>
        <p>
          <a-tag v-for="item in record.tagList" :key="item.id"
          >{{ item.value }}
          </a-tag>
        </p>
        <p v-if="isNotEmpty(summaryList)">
          <p v-for="(item, index) in summaryList" :key="index">
            {{ item }}
          </p>
        </p>
        <p class="flex" v-if="isNotEmpty(record.authorList)">
          <span class="mr-2">作者:</span>
          <span class="flex-1">
          <template v-for="(item, index) in record.authorList">
            <span v-if="index !== 0" class="px-2">/</span>
            {{ item.name }}
          </template>
        </span>
        </p>
        <p class="flex" v-if="isNotEmpty(record.publisher)">
          <span class="mr-2">出版社:</span>
          <span class="flex-1">{{ record.publisher }}</span>
        </p>
        <p class="flex" v-if="isNotEmpty(record.alternateTitleList)">
          <span class="mr-2">又名:</span>
          <span class="flex-1">
            <template v-for="(item, index) in record.alternateTitleList">
              <span v-if="index !== 0" class="px-2">/</span>
              {{ item }}
            </template>
          </span>
        </p>
        <p>
          <k-logo-link type="komga" sub="series" :id="record.id" class="mr-3"/>
          <k-logo-link type="bgm" :id="record.bgmId" class="mr-3"/>
        </p>
      </div>
    </section>
    <section v-if="isNotEmpty(bookRecords)">
      <h-module-title title="单卷"/>
      <div class="grid grid-cols-24 gap-6">
        <template :key="bookRecord.id" v-for="bookRecord in bookRecords">
          <a-card class="k-card col-span-3" :bordered="false">
            <template #cover>
              <k-cover-image
                  class="h-poster cursor-pointer"
                  type="comic" sub="book"
                  :preview="false"
                  :thumb="bookRecord.id"
                  @click="onViewBook(bookRecord.id)"
              />
            </template>
            <a-card-meta :title="bookRecord.title">
            </a-card-meta>
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
import {apiTvshowShowReadNFO, apiTvshowShowSyncPlex, apiTvshowShowView} from "@/api/tvshow/tvshowShowApi.ts";
import {message} from "ant-design-vue";
import {apiComicSeriesView} from "@/api/comic/comicSeriesApi";
import {apiComicBookPage} from "@/api/comic/comicBookApi";

const route = useRoute()
const router = useRouter()
const record = ref({})
const bookRecords = ref([]);
const refTvshowShowSearchInfo = ref();
const refTvshowShowFileManage = ref();
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
  apiComicSeriesView({id}).then((res) => {
    record.value = res
    apiComicBookPage({pageSize: 1000, orderBy: "ASC:book_number", seriesId: id}).then(({records}) => {
      bookRecords.value = records
    })
  });
};

const onViewBook = (id) => {
  router.push({path: "/comic/comicBook/view", query: {id}})
};


const onSearchInfo = () => {
  refTvshowShowSearchInfo.value.show(record.value)
}

const onFileManage = () => {
  refTvshowShowFileManage.value.show(id);
};
const onReadNFO = () => {
  apiTvshowShowReadNFO({id}).then((res) => {
    if (res) {
      message.success("读取成功");
      initData();
    } else {
      message.error("读取失败");
    }
  })
}

const onSyncPlex = () => {
  apiTvshowShowSyncPlex({id}).then((res) => {
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
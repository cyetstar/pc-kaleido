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
          <h-button @click="onOpenComicInfo">查看ComicInfo</h-button>
          <h-button @click="onSetCover">设置封面</h-button>
        </a-space>
      </template>
    </a-page-header>
    <section class="flex">
      <div>
        <k-cover-image v-if="record.id"
                       class="h-poster"
                       style="width: 250px"
                       type="comic" sub="book"
                       :thumb="record.id"
        />
      </div>
      <div class="flex-1 ml-8">
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
               <a @click="onViewAuthor(item)">{{ item.name }}</a>
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
        <p class="flex">
          <span class="mr-2">文件:</span>
          <span class="flex-1">{{ record.path }}</span>
        </p>
        <p>
          <k-logo-link type="komga" sub="book" :id="record.id" class="mr-3"/>
          <k-logo-link type="bgm" :id="record.bgmId" class="mr-3"/>
        </p>
      </div>
    </section>
  </section>
  <comic-book-set-cover ref="refComicBookSetCover"></comic-book-set-cover>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import {FileTextOutlined, LeftOutlined} from "@ant-design/icons-vue";
import {useRoute, useRouter} from "vue-router";
import {isNotEmpty} from "@ht/util";
import {apiComicBookOpenComicInfo, apiComicBookView} from "@/api/comic/comicBookApi";
import ComicBookSetCover from "@/views/comic/comicBook/comicBookSetCover.vue";

const route = useRoute()
const router = useRouter()
const record = ref({})
const refComicBookSetCover = ref();
const id = route.query.id;
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

const onOpenComicInfo = ()=>{
  apiComicBookOpenComicInfo({id})
}
const onSetCover = () => {
  refComicBookSetCover.value.show(record.value);
}

const onViewAuthor = (author) => {
  router.push({name: "comicSeriesPage", params: {keyword: author.name, load: true}});
}

onMounted(() => {
  initData()
})
</script>
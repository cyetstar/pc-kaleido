<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品表单页面
-->
<template>
  <a-modal
    ref="formRef"
    v-model:visible="visible"
    :title="`匹配【${title}】信息`"
    width="960px"
    :footer="null"
  >
    <div class="flex gap-2">
      <h-radio
        v-model:value="searchForm.type"
        button
        name="type"
        :columns="typeColumns"
      />
      <h-input
        class="flex-1"
        placeholder=""
        v-model:value="searchForm.keyword"
        name="keyword"
        @keyup.enter="onSearch"
      />
      <h-button @click="onSearch">搜索</h-button>
      <h-button @click="onMatch">无法匹配</h-button>
    </div>

    <a-table
      size="small"
      :data-source="dataSource"
      :loading="loading"
      :row-class-name="addRowColor"
      class="mt-3"
    >
      <a-table-column title="海报" align="center" width="150px">
        <template #="{ record }">
          <a :href="getUrl(record)" target="_blank" class="flex justify-center">
            <img
              :src="record.poster"
              :width="80"
              referrerpolicy="no-referrer"
            />
          </a>
        </template>
      </a-table-column>
      <a-table-column title="影片信息">
        <template #="{ record }">
          <p>
            <a :href="getUrl(record)" target="_blank">
              {{ record.title }}
            </a>
            <k-logo-link type="plex" :width="20" :id="record.id" class="ml-3" />
          </p>
          <p class="text-muted" v-if="isNotEmpty(record.originalTitle)">
            {{ record.originalTitle }}
          </p>
          <div class="text-muted">{{ record.year }}</div>
        </template>
      </a-table-column>
      <a-table-column title="操作" align="center" width="150px">
        <template #="{ record }">
          <a-space :size="0">
            <h-button
              v-if="isNotEmpty(record.id)"
              type="primary"
              size="small"
              link
              @click="onFileManage(record)"
              >查看文件
            </h-button>
            <h-button type="primary" size="small" link @click="onMatch(record)"
              >匹配
            </h-button>
            <h-button
              v-if="type !== 'path'"
              type="primary"
              size="small"
              link
              @click="onDownloadPoster(record)"
              >下载海报
            </h-button>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
  </a-modal>
  <movie-basic-file-manage ref="refMovieBasicFileManage" />
</template>

<script setup>
import { computed, ref } from "vue";
import { message } from "ant-design-vue";
import {
  apiMovieBasicDownloadPoster,
  apiMovieBasicMatchInfo,
  apiMovieBasicMatchPath,
  apiMovieBasicSearchInfo,
} from "@/api/movie/movieBasicApi";
import { isNotEmpty } from "@ht/util";
import MovieBasicFileManage from "@/views/movie/movieBasic/movieBasicFileManage.vue";

const emits = defineEmits(["match-success"]);
const refMovieBasicFileManage = ref();
const title = ref();
const type = ref();
const loading = ref();
let visible = ref();
let showRecord = {};
let pathRecord = {};
let dataSource = ref([]);
let searchForm = ref({
  type: "douban",
  keyword: "",
});
let typeColumns = [
  {
    text: "豆瓣",
    value: "douban",
  },
  {
    text: "TMDB",
    value: "tmdb",
  },
];

const getUrl = (record) => {
  if (isNotEmpty(record.doubanId)) {
    return `https://movie.douban.com/subject/${record.doubanId}/`;
  } else {
    return `https://www.themoviedb.org/movie/${record.tmdbId}/`;
  }
};

const show = (source, showType) => {
  visible.value = true;
  type.value = showType;
  dataSource.value = [];
  if (type.value === "path") {
    pathRecord = source;
    title.value = source.name;
    searchForm.value.keyword = pathRecord.name.replaceAll("\.", " ");
  } else {
    showRecord = source;
    title.value = source.title;
    searchForm.value.keyword = showRecord.title;
  }
};

const onSearch = () => {
  loading.value = true;
  apiMovieBasicSearchInfo(searchForm.value).then((res) => {
    dataSource.value = res;
    loading.value = false;
  });
};

const onFileManage = (infoRecord) => {
  refMovieBasicFileManage.value.show(infoRecord.id);
};

const onMatch = (record) => {
  if (type.value === "path") {
    apiMovieBasicMatchPath({ ...pathRecord, ...record }).then(() => {
      message.success("匹配成功");
      visible.value = false;
      emits("match-success");
    });
  } else {
    apiMovieBasicMatchInfo({ ...showRecord, ...record, ...searchForm.value })
      .then(() => {
        message.success("匹配成功");
        visible.value = false;
        emits("match-success");
      })
      .catch(() => {
        loading.value = false;
      });
  }
};

const onDownloadPoster = (record) => {
  loading.value = true;
  let url = record.poster.replace("s_ratio_poster", "m_ratio_poster");
  apiMovieBasicDownloadPoster({ id: showRecord.id, url: url }).then(() => {
    message.success("下载成功");
    visible.value = false;
  });
};

const addRowColor = (record) => {
  if (
    (record.doubanId && record.doubanId === showRecord.doubanId) ||
    (record.tmdbId && record.tmdbId === showRecord.tmdbId)
  ) {
    return "bg-highlight";
  }
};
defineExpose({
  show,
  addRowColor,
});
</script>

<style lang="less" scoped></style>

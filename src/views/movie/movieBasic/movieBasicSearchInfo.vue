<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品表单页面
-->
<template>
  <a-modal
    ref="formRef"
    v-model:visible="visible"
    title="匹配信息"
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
      />
      <h-button @click="onSearch">搜索</h-button>
      <h-button @click="onMatch">自动匹配</h-button>
    </div>

    <a-table
      size="small"
      :data-source="dataSource"
      :loading="loading"
      class="mt-3"
    >
      <a-table-column align="center">
        <template #="{ record }">
          <check-circle-two-tone
            two-tone-color="#52c41a"
            v-if="record.doubanId === movieRecord.doubanId"
          />
        </template>
      </a-table-column>
      <a-table-column title="海报" align="center" width="120px">
        <template #="{ record }">
          <a :href="getUrl(record)" target="_blank">
            <img
              :src="record.poster"
              :width="80"
              referrerpolicy="no-referrer"
            />
          </a>
        </template>
      </a-table-column>
      <a-table-column title="影片名" data-index="title" align="  ">
        <template #="{ record }">
          {{ record.title }}
          <span v-if="isNotEmpty(record.originalTitle)">
            / {{ record.originalTitle }}
          </span>
        </template>
      </a-table-column>
      <a-table-column
        title="年份"
        data-index="year"
        align="center"
      ></a-table-column>
      <a-table-column title="操作" align="center" width="150px">
        <template #="{ record }">
          <a-space :size="0">
            <h-button type="primary" size="small" link @click="onMatch(record)"
              >匹配信息
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
</template>

<script setup>
import { computed, ref } from "vue";
import { CheckCircleTwoTone } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import {
  apiMovieBasicDownloadPoster,
  apiMovieBasicMatchInfo,
  apiMovieBasicMatchPath,
  apiMovieBasicSearchInfo,
} from "@/api/movie/movieBasicApi";
import { isNotEmpty } from "@ht/util";

const emits = defineEmits(["match-success"]);
const type = ref();
const loading = ref();
let movieRecord = {};
let pathRecord = {};
let visible = ref();
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

const show = (record, showType) => {
  visible.value = true;
  type.value = showType;
  dataSource.value = [];
  if (type.value === "path") {
    pathRecord = record;
    searchForm.value.keyword = pathRecord.name.replaceAll("\.", " ");
  } else {
    movieRecord = record;
    searchForm.value.keyword = movieRecord.title;
  }
};

const onSearch = () => {
  loading.value = true;
  apiMovieBasicSearchInfo(searchForm.value).then((res) => {
    dataSource.value = res;
    loading.value = false;
  });
};

const onMatch = (record) => {
  if (type.value === "path") {
    apiMovieBasicMatchPath({ ...pathRecord, ...record }).then((res) => {
      message.success("匹配成功");
      visible.value = false;
      emits("match-success");
    });
  } else {
    apiMovieBasicMatchInfo({ ...movieRecord, ...record, ...searchForm.value })
      .then((res) => {
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
  apiMovieBasicDownloadPoster({ id: movieRecord.id, url: url }).then((res) => {
    message.success("下载成功");
    visible.value = false;
  });
};

defineExpose({
  show,
});
</script>

<style lang="less" scoped></style>

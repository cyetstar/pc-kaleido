<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品表单页面
-->
<template>
  <a-modal
    ref="formRef"
    v-model:visible="visible"
    title="抓取信息"
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
        @blur="onSearch"
        @keyup.enter.native="$event.target.blur()"
      />
      <h-button @click="onSearch">搜索</h-button>
      <h-button @click="onMatch">自动抓取</h-button>
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
          <a
            :href="`https://movie.douban.com/subject/${record.doubanId}/`"
            target="_blank"
            class="flex justify-center"
          >
            <img
              :src="record.poster"
              :width="80"
              referrerpolicy="no-referrer"
            />
          </a>
        </template>
      </a-table-column>
      <a-table-column title="剧集信息">
        <template #="{ record }">
          <p>
            {{ record.title }}
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
import { ref } from "vue";
import { message } from "ant-design-vue";
import { isNotEmpty } from "@ht/util";
import {
  apiTvshowShowDownloadPoster,
  apiTvshowShowMatchInfo,
  apiTvshowShowMatchPath,
  apiTvshowShowSearchInfo,
} from "@/api/tvshow/tvshowShowApi";

const emits = defineEmits(["match-success"]);
const type = ref();
const loading = ref();
let showRecord = {};
let visible = ref();
let pathRecords = [];
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
];

const show = (records, showType) => {
  visible.value = true;
  type.value = showType;
  dataSource.value = [];
  if (type.value === "path") {
    let pathRecord = records[0];
    pathRecords = records;
    searchForm.value.keyword = pathRecord.name.replaceAll("\.", " ");
  } else {
    showRecord = records;
    searchForm.value.keyword = showRecord.title;
  }
};

const onSearch = () => {
  loading.value = true;
  apiTvshowShowSearchInfo(searchForm.value).then((res) => {
    dataSource.value = res;
    loading.value = false;
  });
};

const onMatch = (record) => {
  if (type.value === "path") {
    apiTvshowShowMatchPath({
      paths: pathRecords.map((s) => s.path),
      ...record,
    }).then((res) => {
      message.success("抓取成功");
      visible.value = false;
      emits("match-success");
    });
  } else {
    apiTvshowShowMatchInfo({ ...showRecord, ...record, ...searchForm.value })
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
  apiTvshowShowDownloadPoster({ id: showRecord.id, url: url }).then((res) => {
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

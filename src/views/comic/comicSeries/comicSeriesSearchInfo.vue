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
        v-model:value="searchForm.ver"
        button
        name="ver"
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
      <a-table-column title="封面" align="center" width="150px">
        <template #="{ record }">
          <a
            :href="`https://bgm.tv/subject/${record.bgmId}`"
            target="_blank"
            class="flex justify-center"
          >
            <img :src="record.cover" :width="80" referrerpolicy="no-referrer" />
          </a>
        </template>
      </a-table-column>
      <a-table-column title="漫画信息">
        <template #="{ record }">
          <p>
            {{ record.series }}
          </p>
          <p class="text-muted" v-if="isNotEmpty(record.originalSeries)">
            {{ record.originalSeries }}
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
  apiComicSeriesMatchInfo,
  apiComicSeriesMatchPath,
  apiComicSeriesSearchInfo,
} from "@/api/comic/comicSeriesApi";

const emits = defineEmits(["match-success"]);
const type = ref();
const loading = ref();
let visible = ref();
let record = {};
let dataSource = ref([]);
let searchForm = ref({
  ver: "1",
  keyword: "",
});
let typeColumns = [
  {
    text: "番组",
    value: "1",
  },
  {
    text: "番组（新）",
    value: "0",
  },
];

const show = (source, showType) => {
  record = source;
  visible.value = true;
  type.value = showType;
  dataSource.value = [];
  if (type.value === "path") {
    searchForm.value.keyword = record.name.replaceAll("\.", " ");
  } else {
    searchForm.value.keyword = record.title;
  }
};

const onSearch = () => {
  loading.value = true;
  apiComicSeriesSearchInfo(searchForm.value).then((res) => {
    dataSource.value = res;
    loading.value = false;
  });
};

const onMatch = (infoRecord) => {
  if (type.value === "path") {
    apiComicSeriesMatchPath({
      path: record.path,
      ...infoRecord,
    }).then(() => {
      message.success("抓取成功");
      visible.value = false;
      emits("match-success");
    });
  } else {
    apiComicSeriesMatchInfo({ ...record, ...infoRecord, ...searchForm.value })
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

const addRowColor = (infoRecord) => {
  if (infoRecord.bgmId && record.bgmId === infoRecord.bgmId) {
    return "bg-highlight";
  }
};
defineExpose({
  show,
  addRowColor,
});
</script>

<style lang="less" scoped></style>

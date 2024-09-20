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
        v-model:value="searchForm.source"
        button
        name="source"
        :columns="sourceColumns"
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
      :pagination="false"
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
            <a :href="`https://bgm.tv/subject/${record.bgmId}`" target="_blank">
              {{ record.series }}
            </a>
            <k-logo-link
              type="komga"
              :width="20"
              :id="record.existId"
              class="ml-3"
            />
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
          </a-space>
        </template>
      </a-table-column>
    </a-table>
  </a-modal>
  <comic-series-file-manage ref="refComicSeriesFileManage" />
</template>

<script setup>
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { isNotEmpty } from "@ht/util";
import {
  apiComicSeriesMatchInfo,
  apiComicSeriesMatchPath,
  apiComicSeriesSearchInfo,
} from "@/api/comic/comicSeriesApi";
import ComicSeriesFileManage from "@/views/comic/comicSeries/comicSeriesFileManage.vue";

const emits = defineEmits(["match-success"]);
const refComicSeriesFileManage = ref();

const title = ref();
const type = ref();
const loading = ref();
const visible = ref();
let record = {};
const dataSource = ref([]);
const searchForm = ref({
  source: "bgm",
  keyword: "",
});
const sourceColumns = [
  {
    text: "bgm",
    value: "bgm",
  },
  {
    text: "bgm(v0)",
    value: "bgm_v0",
  },
];

const show = (source, recordType) => {
  record = source;
  visible.value = true;
  type.value = recordType;
  dataSource.value = [];
  if (type.value === "path") {
    title.value = record.name;
    searchForm.value = {
      keyword: record.name.replaceAll("[", "").replaceAll("]", "").trim(),
      source: "bgm",
    };
  } else {
    title.value = record.title;
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

const onFileManage = (infoRecord) => {
  refComicSeriesFileManage.value.show(infoRecord.id);
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

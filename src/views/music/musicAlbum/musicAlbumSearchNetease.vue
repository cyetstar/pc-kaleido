<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品表单页面
-->
<template>
  <a-modal
    ref="formRef"
    v-model:visible="visible"
    title="匹配网易云"
    width="960px"
    :footer="null"
  >
    <a-form layout="inline">
      <h-input
        class="w-300px"
        placeholder=""
        v-model:value="form.keywords"
        name="keywords"
        @keyup.enter="onSearch"
      />
      <h-button @click="onSearch">搜索</h-button>
    </a-form>

    <a-table
      size="small"
      :data-source="dataSource"
      :loading="loading"
      :row-class-name="addRowColor"
      class="mt-3"
    >
      <a-table-column title="封面" align="center" :width="150">
        <template #="{ record }">
          <a
            :href="`https://music.163.com/#/album?id=${record.neteaseId}`"
            target="_blank"
            class="flex justify-center"
          >
            <img
              :src="record.picUrl"
              :width="100"
              referrerpolicy="no-referrer"
            />
          </a>
        </template>
      </a-table-column>
      <a-table-column title="专辑名">
        <template #="{ record }">
          <p>
            {{ record.title }}
          </p>
          <p class="text-muted">
            {{ record.artist }}
          </p>
          <div class="text-muted">{{ record.publishTime }}</div>
        </template>
      </a-table-column>
      <a-table-column title="操作" align="center" width="150px">
        <template #="{ record }">
          <a-space :size="0">
            <h-button type="primary" size="small" link @click="onMatch(record)"
              >匹配信息
            </h-button>
            <h-button
              type="primary"
              size="small"
              link
              @click="onDownloadCover(record)"
              >下载封面
            </h-button>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
  </a-modal>
</template>

<script setup>
import { ref } from "vue";
import { CheckCircleTwoTone } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import {
  apiMusicAlbumSearchNetease,
  apiMusicAlbumMatchNetease,
  apiMusicAlbumDownloadCover,
} from "@/api/music/musicAlbumApi.ts";
import { isNotEmpty } from "@ht/util";

const emits = defineEmits(["match-success"]);
const loading = ref();
let albumRecord = {};
let visible = ref();
let dataSource = ref([]);
let form = ref({
  keywords: "",
});

const show = (record) => {
  visible.value = true;
  albumRecord = record;
  form.value.keywords = albumRecord.title + " " + albumRecord.artists;
  onSearch();
};

const onSearch = () => {
  loading.value = true;
  apiMusicAlbumSearchNetease(form.value).then((res) => {
    dataSource.value = res;
    loading.value = false;
  });
};

const onMatch = (record) => {
  loading.value = true;
  apiMusicAlbumMatchNetease({ ...albumRecord, ...record }).then((res) => {
    message.success("匹配成功");
    visible.value = false;
    loading.value = false;
    emits("match-success");
  });
};

const onDownloadCover = (record) => {
  loading.value = true;
  apiMusicAlbumDownloadCover({ id: albumRecord.id, url: record.picUrl }).then(
    (res) => {
      message.success("下载成功");
      visible.value = false;
      loading.value = false;
    }
  );
};

const addRowColor = (record) => {
  if (record && record.neteaseId === albumRecord.neteaseId) {
    return "bg-highlight";
  }
};

defineExpose({
  show,
  addRowColor,
});
</script>

<style lang="less" scoped></style>

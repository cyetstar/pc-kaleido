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
    width="800px"
    :footer="null"
  >
    <a-form layout="inline">
      <h-input
        class="w-300px"
        placeholder=""
        v-model:value="form.keywords"
        name="keywords"
      />
      <h-button @click="onSearch">搜索</h-button>
    </a-form>

    <a-table size="small" :data-source="dataSource" class="mt-3">
      <a-table-column align="center">
        <template #="{ record }">
          <check-circle-two-tone
            two-tone-color="#52c41a"
            v-if="record.neteaseId === albumRecord.neteaseId"
          />
        </template>
      </a-table-column>
      <a-table-column title="封面" align="center">
        <template #="{ record }">
          <a-image :src="record.picUrl" :width="100" />
        </template>
      </a-table-column>
      <a-table-column
        title="专辑名"
        data-index="title"
        align="center"
      ></a-table-column>
      <a-table-column
        title="艺术家"
        data-index="artist"
        align="center"
      ></a-table-column>
      <a-table-column
        title="发行日期"
        data-index="publishTime"
        align="center"
      ></a-table-column>
      <a-table-column title="操作" align="center">
        <template #="{ record }">
          <a-space :size="0">
            <h-button type="primary" size="small" link @click="onMatch(record)"
              >匹配
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
} from "@/api/music/musicAlbumApi.ts";

const emits = defineEmits(["match-success"]);

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
  apiMusicAlbumSearchNetease(form.value).then((res) => {
    dataSource.value = res;
  });
};

const onMatch = (record) => {
  apiMusicAlbumMatchNetease({ id: albumRecord.id, ...record }).then(() => {
    message.success("匹配成功");
    visible.value = false;
    emits("match-success", record);
  });
};

defineExpose({
  show,
});
</script>

<style lang="less" scoped></style>

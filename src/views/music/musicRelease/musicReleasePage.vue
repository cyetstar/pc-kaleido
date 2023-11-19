<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品列表页面
-->
<template>
  <section class="h-page-section">
    <h-form-search
      ref="refFormSearch"
      v-model:form="searchForm"
      @search="onSearch"
      @reset="onReset"
    >
      <h-col :span="6">
        <h-input label="标题" v-model:value="searchForm.bt" name="bt" />
      </h-col>
      <h-col :span="6">
        <h-input label="艺术家" v-model:value="searchForm.ysj" name="ysj" />
      </h-col>
    </h-form-search>

    <a-space class="h-btn-space">
      <h-button type="primary" @click="onSyncPlex">同步Plex</h-button>
      <h-button-delete
        plain
        :disabled="selectedRowKeys.length === 0"
        @delete="onDeleteRecord(selectedRowKeys)"
      />
    </a-space>

    <div>
      <a-row :gutter="16">
        <template :key="record.id" v-for="record in pageResult.records">
          <a-col :span="4" class="mb-16px">
            <a-card>
              <template #cover>
                <h-plex-image
                  class="cover"
                  :preview="false"
                  :plex-thumb="record.plexThumb"
                  @click="onViewRecord(record.id)"
                />
              </template>
              <a-card-meta
                :title="record.bt"
                :description="
                  record.ysj || '--' + ' (' + (record.rq || '?') + ')'
                "
              >
              </a-card-meta>
            </a-card>
          </a-col>
        </template>
      </a-row>
      <div>
        <a-empty
          v-if="pageResult.records.length === 0"
          :image="Empty.PRESENTED_IMAGE_SIMPLE"
        />
      </div>
      <div class="flex justify-end">
        <a-pagination
          v-model:current="pageResult.pageNumber"
          :show-total="(total) => `共 ${total} 张`"
          :total="pageResult.total"
          :page-size="pageResult.pageSize"
          :show-size-changer="false"
          @change="onChange"
          show-less-items
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  musicReleasePageApi,
  musicReleaseDeleteApi,
  apiMusicReleaseSyncPlex,
} from "@/api/music/musicReleaseApi.ts";

import { Empty, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { getFilePath } from "@/utils/http/helper";
import musicDefault from "@/assets/images/music-default.png";
import HPlexImage from "@c/common/PlexImage/PlexImage.vue";

const searchForm = ref({
  bt: "",
  ysj: "",
});
const pageResult = ref({
  records: [],
  pageNumber: 0,
  total: 0,
  pageSize: 36,
});
const selectedRowKeys = ref([]);

onMounted(() => {
  // console.log("init");
  loadData({ ...searchForm.value });
});

const onSyncPlex = () => {
  apiMusicReleaseSyncPlex().then((res) => {
    message.success("同步完成");
  });
};

const onSearch = () => {
  loadData({ ...searchForm.value });
};

const onReset = () => {
  loadData({ ...searchForm.value });
};

const onChange = (pageNumber) => {
  loadData({ pageNumber, ...searchForm.value });
};

const loadData = (data) => {
  data.searchCount = true;
  data.pageSize = pageResult.value.pageSize;
  musicReleasePageApi(data).then((res) => {
    pageResult.value = res;
  });
};

const getCover = (id) => {
  return getFilePath() + "musicRelease/cover/" + id;
};

const getErrorCover = (e) => {
  e.target.src = musicDefault;
};

const router = useRouter();
const onViewRecord = (id) => {
  router.push({ path: "/musicRelease/view", query: { id } });
};

const onDeleteRecord = (recordId) => {
  const id = Array.isArray(recordId) ? recordId : [recordId];
  musicReleaseDeleteApi(id).then((res) => {
    if (res) {
      message.success("删除成功！");
    }
  });
};
</script>

<style lang="less">
.cover {
  object-fit: cover;
  width: 100%;
  flex: 1;
  height: 190px;
}
</style>

<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品详情页面
-->
<template>
  <section class="h-page-section">
    <div class="flex">
      <div class="mr-8px">
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </div>
      <div>
        <h1>{{ record.bt }}</h1>
        <h1>{{ record.ysj }}</h1>
        <h1>{{ record.rq }}</h1>
        <p>{{ record.musicbrainzId }}</p>
        <p>{{ record.plexId }}</p>
        <p>{{ record.zjlx }}</p>
        <p>{{ record.yylp }}</p>
        <p>{{ record.cpgs }}</p>
      </div>
      <div>
        <h-button @click="onUpdateAudioTag">读取Tag</h-button>
      </div>
    </div>
    <div>
      <h1>歌曲列表</h1>
      <a-table :data-source="trackRecords">
        <a-table-column
          title="曲目号"
          data-index="qh"
          align="center"
        ></a-table-column>
        <a-table-column
          title="标题"
          data-index="bt"
          align="center"
        ></a-table-column>
        <a-table-column
          title="长度"
          data-index="cd"
          align="center"
        ></a-table-column>
      </a-table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  apiMusicReleaseUpdateAudioTag,
  musicReleaseViewApi,
} from "@/api/music/musicReleaseApi.ts";
import { musicTrackListByReleaseIdApi } from "@/api/music/musicTrackApi";

const route = useRoute();
const id = route.query.id;

const record = ref({});
const trackRecords = ref([]);
const initData = () => {
  musicReleaseViewApi({ id }).then((res) => {
    record.value = res;
  });
  musicTrackListByReleaseIdApi({ releaseId: id }).then((res) => {
    trackRecords.value = res;
  });
};

const onUpdateAudioTag = () => {
  apiMusicReleaseUpdateAudioTag({ id }).then((res) => {
    message.success("读取成功");
  });
};

const loadData = (params, callback) => {};
onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped>
.view-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20;
}

.view-item {
  width: 50%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;

  &-label {
    min-width: 90px;
  }

  &-value {
    flex: 1;
  }
}
</style>

<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 15:19:06
 * @Description: 系统配置表表单页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <a-form ref="refForm" :label-col="{ span: 6 }" v-model:form="form">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="plex" tab="Plex">
          <h-col :span="12">
            <h-input
              label="Plex访问地址"
              name="plexUrl"
              v-model:value="form.plexUrl"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="Plex Token"
              name="plexToken"
              v-model:value="form.plexToken"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="Plex重试次数"
              name="plexRetries"
              v-model:value="form.plexRetries"
            />
          </h-col>
          <h-col :span="12">
            <h-select
              label="Plex电影资料库"
              :columns="columns"
              name="plexMovieLibraryId"
              @change="onChange($event, 'movie')"
              v-model:value="form.plexMovieLibraryId"
            />
          </h-col>
          <h-col :span="12">
            <h-select
              label="Plex剧集资料库"
              :columns="columns"
              name="plexTvshowLibraryId"
              @change="onChange($event, 'tvshow')"
              v-model:value="form.plexTvshowLibraryId"
            />
          </h-col>
          <h-col :span="12">
            <h-select
              label="Plex音乐资料库"
              :columns="columns"
              name="plexMusicLibraryId"
              @change="onChange($event, 'music')"
              v-model:value="form.plexMusicLibraryId"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="movie" tab="电影">
          <h-col :span="12">
            <h-input
              label="电影资料库目录"
              name="movieLibraryPath"
              v-model:value="form.movieLibraryPath"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="电影回收站"
              name="movieTrashPath"
              v-model:value="form.movieTrashPath"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="电影下载目录"
              name="movieDownloadPath"
              v-model:value="form.movieDownloadPath"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="tvshow" tab="剧集">
          <h-col :span="12">
            <h-input
              label="剧集资料库目录"
              name="tvshowLibraryPath"
              v-model:value="form.tvshowLibraryPath"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="剧集回收站"
              name="tvshowTrashPath"
              v-model:value="form.tvshowTrashPath"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="剧集下载目录"
              name="tvshowDownloadPath"
              v-model:value="form.tvshowDownloadPath"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="music" tab="音乐">
          <h-col :span="12">
            <h-input
              label="音乐资料库位置"
              name="musicLibraryPath"
              v-model:value="form.musicLibraryPath"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              text-area
              label="音乐资料库忽略文件"
              name="musicExcludePath"
              v-model:value="form.musicExcludePath"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="third" tab="第三方接口">
          <h-col :span="12">
            <h-input
              label="网易云音乐API地址"
              name="neteaseUrl"
              v-model:value="form.neteaseUrl"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="豆瓣APIKey"
              name="doubanApikey"
              v-model:value="form.doubanApikey"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="TMM地址"
              name="tmmUrl"
              v-model:value="form.tmmUrl"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="other" tab="其他">
          <h-col :span="12">
            <h-input
              label="单次抓取信息延时（秒）"
              name="matchInfoSleepSecond"
              v-model:value="form.matchInfoSleepSecond"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="单次下载歌词延时（秒）"
              name="downloadLyricSleepSecond"
              v-model:value="form.downloadLyricSleepSecond"
            />
          </h-col>
        </a-tab-pane>
      </a-tabs>
      <h-col :span="12" :offset="3">
        <h-button type="primary" @click="onSave">保存</h-button>
      </h-col>
    </a-form>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import { apiPlexGetLibraries } from "@/api/plexApi";
import {
  apiSysConfigFindByKeys,
  apiSysConfigSave,
} from "@/api/sysadmin/sysConfigApi";
import { useAppStore } from "@/store/modules/app";

let appStore = useAppStore();
let activeKey = ref();
let columns = ref([]);

let form = ref({
  plexUrl: "",
  plexToken: "",
  plexRetries: "3",
  plexMovieLibraryId: "",
  plexTvshowLibraryId: "",
  plexMusicLibraryId: "",
  movieLibraryPath: "",
  movieTrashPath: "/movie/#recycle",
  movieDownloadPath: "",
  tvshowLibraryPath: "",
  tvshowTrashPath: "/movie/#recycle",
  tvshowDownloadPath: "",
  musicLibraryPath: "",
  musicExcludePath: "",
  neteaseUrl: "",
  doubanApikey: "",
  tmmUrl: "",
  matchInfoSleepSecond: "3",
  downloadLyricSleepSecond: "3",
});

onMounted(() => {
  initData();
});

const initData = () => {
  apiSysConfigFindByKeys(Object.keys(form.value)).then((res) => {
    form.value = res;
    if (form.value.plexUrl && form.value.plexToken) {
      apiPlexGetLibraries(form.value).then((res) => {
        columns.value = res.map((s) => ({ text: s.name, value: s.key, ...s }));
      });
    }
  });
};

const onChange = (e, type) => {
  if (type === "movie") {
    form.value.plexMovieLibraryPath = e.path;
  } else if (type === "tvshow") {
    form.value.plexTvshowLibraryPath = e.path;
  } else if (type === "music") {
    form.value.plexMusicLibraryPath = e.path;
  }
};

const onSave = async () => {
  apiSysConfigSave(form.value).then((res) => {
    if (res) {
      appStore.initAppConfig();
      message.success("操作成功");
    }
  });
};
</script>

<style lang="less" scoped></style>

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
        <a-tab-pane key="komga" tab="Komga">
          <h-col :span="12">
            <h-input
              label="Komga地址"
              name="komgaUrl"
              v-model:value="form.komgaUrl"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="Komga账号"
              name="komgaUsername"
              v-model:value="form.komgaUsername"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="Komga密码"
              name="komgaPassword"
              v-model:value="form.komgaPassword"
            />
          </h-col>
          <h-col :span="12">
            <h-select
              label="Komga漫画资料库"
              :columns="columns"
              name="komgaComicLibraryId"
              @change="onChange($event, 'comic')"
              v-model:value="form.komgaComicLibraryId"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="dir" tab="目录">
          <h-col :span="12">
            <h-input
              label="电影资料库目录"
              name="movieLibraryPath"
              v-model:value="form.movieLibraryPath"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="剧集资料库目录"
              name="tvshowLibraryPath"
              v-model:value="form.tvshowLibraryPath"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="音乐资料库目录"
              name="musicLibraryPath"
              v-model:value="form.musicLibraryPath"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="漫画资料库目录"
              name="comicLibraryPath"
              v-model:value="form.comicLibraryPath"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="third" tab="TMM">
          <h-col :span="12">
            <h-input
              label="TMM地址"
              name="tmmUrl"
              v-model:value="form.tmmUrl"
            />
          </h-col>
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
              label="豆瓣Cookie"
              text-area
              name="doubanCookie"
              v-model:value="form.doubanCookie"
            />
          </h-col>
          <h-col :span="12">
            <h-input
              label="番组计划AccessToken"
              name="bgmAccessToken"
              v-model:value="form.bgmAccessToken"
            />
            <h-col :offset="6">
              <a href="https://next.bgm.tv/demo/access-token/create"
                >https://next.bgm.tv/demo/access-token/create</a
              ></h-col
            >
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
          <h-col :span="12">
            <h-radio
              label="是否自动刷新Plex"
              name="refreshMetadata"
              v-model:value="form.refreshMetadata"
              dict-type="sfbz"
            />
          </h-col>
          <h-col :span="12">
            <h-radio
              label="是否开启重写ComicInfo"
              name="writeComicInfo"
              v-model:value="form.writeComicInfo"
              dict-type="sfbz"
            />
          </h-col>
          <h-col :span="12">
            <h-radio
              label="是否开启重写MovieNFO"
              name="writeMovieNFO"
              v-model:value="form.writeMovieNFO"
              dict-type="sfbz"
            />
          </h-col>
        </a-tab-pane>
      </a-tabs>
      <h-col :span="12" :offset="3" class="mt-3">
        <h-button type="primary" @click="onSave">保存</h-button>
      </h-col>
    </a-form>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import { apiPlexListLibrary } from "@/api/plexApi";
import {
  apiSysConfigFindByKeys,
  apiSysConfigSave,
} from "@/api/sysadmin/sysConfigApi";
import { useAppStore } from "@/store/modules/app";
import { apiKomgaListLibrary } from "@/api/komgaApi";

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

  komgaUrl: "",
  komgaUsername: "",
  komgaPassword: "",
  komgaComicLibraryId: "",

  neteaseUrl: "",
  doubanApikey: "",
  doubanCookie: "",
  bgmAccessToken: "",
  tmmUrl: "",
  matchInfoSleepSecond: "3",
  downloadLyricSleepSecond: "3",
  refreshMetadata: "1",
  writeComicInfo: "1",
  writeMovieNFO: "1",

  movieLibraryPath: "",
  tvshowLibraryPath: "",
  musicLibraryPath: "",
  comicLibraryPath: "",
});

onMounted(() => {
  initData();
});

const initData = () => {
  apiSysConfigFindByKeys(Object.keys(form.value)).then((res) => {
    form.value = res;
    columns.value = [];
    Promise.all([apiPlexListLibrary(), apiKomgaListLibrary()]).then(
      ([res1, res2]) => {
        res1.forEach((s) => {
          columns.value.push({ text: s.name, value: s.key, ...s });
        });
        res2.forEach((s) => {
          columns.value.push({ text: s.name, value: s.key, ...s });
        });
      }
    );
  });
};

const onChange = (e, type) => {
  if (type === "movie") {
    form.value.plexMovieLibraryPath = e.path;
  } else if (type === "tvshow") {
    form.value.plexTvshowLibraryPath = e.path;
  } else if (type === "music") {
    form.value.plexMusicLibraryPath = e.path;
  } else if (type === "comic") {
    form.value.komgaComicLibraryPath = e.path;
  }
};

const onSave = async () => {
  apiSysConfigSave(form.value).then((res) => {
    if (res) {
      Promise.all([apiPlexListLibrary(), apiKomgaListLibrary()]).then(
        ([res1, res2]) => {
          columns.value = [];
          res1.forEach((s) => {
            columns.value.push({ text: s.name, value: s.key, ...s });
          });
          res2.forEach((s) => {
            columns.value.push({ text: s.name, value: s.key, ...s });
          });
        }
      );
      appStore.initAppConfig();
      message.success("操作成功");
    }
  });
};
</script>

<style lang="less" scoped></style>

<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品详情页面
-->
<template>
  <section class="h-page-section">
    <div class="relative">
      <h-title-module title="专辑信息" />
      <a-row :gutter="16" class="mt-6">
        <h-col :span="8">
          <div class="flex justify-center">
            <div class="w-xs">
              <h-plex-image :plex-thumb="record.plexThumb" />
            </div>
          </div>
        </h-col>
        <h-col :span="16">
          <h1>{{ record.bt }}</h1>
          <h1>
            <a
              v-for="artist in record.musicArtistDTOList"
              @click="onViewArtist(artist.id)"
              >{{ artist.mc }}</a
            >
          </h1>
          <p>{{ record.rq }}</p>
          <p>{{ record.cpgs }}</p>
          <p>
            <a-tag v-if="record.zjlx">{{ record.zjlx }}</a-tag>
            <a-tag v-if="record.yylp">{{ record.yylp }}</a-tag>
            <a-tag v-if="record.mt">{{ record.mt }}</a-tag>
          </p>
          <p>{{ record.jj }}</p>
          <p>
            <a
              v-if="record.musicbrainzId"
              target="_blank"
              :href="'https://musicbrainz.org/release/' + record.musicbrainzId"
              class="pr-15px"
              ><img width="30" :src="musicbrainz" class="inline" />
            </a>
            <a target="_blank" href="" class="pr-15px"
              ><img width="30" :src="plex" class="inline"
            /></a>
            <a
              v-if="record.neteaseId"
              target="_blank"
              :href="'https://music.163.com/#/album?id=' + record.neteaseId"
              class="pr-15px"
              ><img width="30" :src="netease" class="inline" />
            </a>
          </p>
        </h-col>
      </a-row>
      <div class="absolute right-0 top-0">
        <a-space>
          <h-button @click="onUpdateAudioTag">读取Tag</h-button>
          <h-button @click="onSearchNetease">匹配网易云</h-button>
          <h-button :disabled="!record.neteaseId" @click="onDownloadLyric"
            >下载歌词
          </h-button>
        </a-space>
      </div>
    </div>

    <div class="mt-8">
      <h-title-module title="歌曲列表" />
      <a-table
        class="mt-6"
        :pagination="false"
        size="small"
        :data-source="trackRecords"
      >
        <a-table-column
          title="曲号"
          width="10%"
          data-index="qh"
          align="center"
        ></a-table-column>
        <a-table-column
          title="歌名"
          width="75%"
          data-index="bt"
        ></a-table-column>
        <a-table-column title="歌词" width="5%" align="center">
          <template #="{ record }">
            <file-text-outlined
              v-if="record.sfygc === '1'"
              @click="onViewLyrics(record)"
            />
          </template>
        </a-table-column>
        <a-table-column
          title="曲长"
          width="10%"
          data-index="qcLabel"
          align="center"
        >
        </a-table-column>
      </a-table>
    </div>

    <a-modal v-model:visible="modalLyricsVisible" :footer="null">
      <template #title>“{{ modalLyricsTitle }}”歌词</template>
      <template v-for="lyrics in lyrics">
        <p>{{ lyrics }}</p>
      </template>
    </a-modal>

    <music-release-search-netease
      ref="refMusicReleaseSearchNetease"
      @match-success="onMatchSuccess"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  apiMusicReleaseDownloadLyric,
  apiMusicReleaseUpdateAudioTag,
  musicReleaseViewApi,
} from "@/api/music/musicReleaseApi.ts";
import {
  apiMusicTrackViewLyrics,
  musicTrackListByReleaseIdApi,
} from "@/api/music/musicTrackApi";
import { message } from "ant-design-vue";
import { FileTextOutlined } from "@ant-design/icons-vue";
import { getFilePath } from "@/utils/http/helper";
import musicDefault from "@/assets/images/music-default.png";
import musicbrainz from "@/assets/images/musicbrainz.png";
import plex from "@/assets/images/plex.png";
import netease from "@/assets/images/netease.png";
import MusicReleaseSearchNetease from "@/views/music/musicRelease/musicReleaseSearchNetease.vue";
import HPlexImage from "@c/common/PlexImage/PlexImage.vue";

const route = useRoute();
const id = route.query.id;

const record = ref({});
const trackRecords = ref([]);
const modalLyricsVisible = ref(false);
const modalLyricsTitle = ref();
const lyrics = ref();

const refMusicReleaseSearchNetease = ref();

const cover = ref(getFilePath() + "musicRelease/cover/" + id);
const initData = () => {
  Promise.all([
    musicReleaseViewApi({ id }),
    musicTrackListByReleaseIdApi({ releaseId: id }),
  ]).then(([res1, res2]) => {
    record.value = res1;
    trackRecords.value = res2;
  });
};

const router = useRouter();
const onViewArtist = (id) => {
  router.push({ path: "/musicArtist/view", query: { id } });
};

const onUpdateAudioTag = () => {
  apiMusicReleaseUpdateAudioTag({ id }).then((res) => {
    message.success("读取成功");
    initData();
  });
};

const onSearchNetease = () => {
  refMusicReleaseSearchNetease.value.show(record.value);
};

const onMatchSuccess = ({ neteaseId }) => {
  record.value.neteaseId = neteaseId;
};

const onDownloadLyric = () => {
  apiMusicReleaseDownloadLyric({ id: record.value.id }).then(() => {
    message.success("下载成功");
    initData();
  });
};

const onViewLyrics = (record) => {
  apiMusicTrackViewLyrics({ id: record.id }).then((res) => {
    lyrics.value = res;
    modalLyricsTitle.value = record.bt;
    modalLyricsVisible.value = true;
  });
};

const getCover = (id) => {
  return getFilePath() + "musicRelease/cover/" + id;
};

const getErrorCover = (e) => {
  e.target.src = musicDefault;
};

onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped></style>

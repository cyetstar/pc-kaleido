<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品表单页面
-->
<template>
  <k-file-modal ref="refFileModal">
    <template #footer>
      <h-button plain type="primary" @click="onMatch">手动抓取</h-button>
    </template>
  </k-file-modal>
  <tvshow-show-search-info
    ref="refTvshowShowSearchInfo"
    @match-success="onMatchSuccess"
  />
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "@/store/modules/app";
import TvshowShowSearchInfo from "@/views/tvshow/tvshowShow/tvshowShowSearchInfo.vue";

const emits = defineEmits(["match-success"]);

const appStore = useAppStore();
const refFileModal = ref();
const refTvshowShowSearchInfo = ref();

const show = () => {
  const path = appStore.$state.config["tvshowDownloadPath"];
  refFileModal.value.show(path);
};

const onMatch = () => {
  let paths = refFileModal.value.selectedRows;
  refTvshowShowSearchInfo.value.show(paths, "path");
};

const onMatchSuccess = () => {
  refFileModal.value.load();
};

defineExpose({
  show,
});
</script>

<style lang="less" scoped></style>

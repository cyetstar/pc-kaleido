<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品表单页面
-->
<template>
  <k-file-modal ref="refFileModal">
    <template #footer>
      <h-button plain type="primary" @click="onMove">一键搬运</h-button>
    </template>
  </k-file-modal>
</template>

<script setup>
import { ref } from "vue";
import {
  CheckOutlined,
  EditOutlined,
  FolderFilled,
  LeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
import { useAppStore } from "@/store/modules/app";
import {
  apiFileDelete,
  apiFileList,
  apiFileMove,
  apiFileRename,
} from "@/api/sysadmin/fileApi";
import { message } from "ant-design-vue";
import { apiMovieBasicViewPath } from "@/api/movie/movieBasicApi";

const emits = defineEmits(["match-success"]);

const appStore = useAppStore();
const movieDownloadPath = appStore.$state.config["movieDownloadPath"];
const movieLibraryPath = appStore.$state.config["movieLibraryPath"];
const refFileModal = ref();

const show = () => {
  refFileModal.value.show(movieDownloadPath);
};

const onMove = () => {
  let pathList = refFileModal.value.selectedRows.map((s) => s.path);
  apiFileMove({ pathList, destPath: movieLibraryPath }).then((res) => {
    if (res) {
      message.success("开始搬运");
    }
  });
};

defineExpose({
  show,
});
</script>

<style lang="less" scoped></style>

<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品表单页面
-->
<template>
  <k-file-modal ref="refFileModal">
    <template #footer>
      <a-upload
        v-model:file-list="fileList"
        name="file"
        :showUploadList="false"
        :custom-request="uploadFile"
      >
      </a-upload>
    </template>
  </k-file-modal>
</template>

<script setup>
import { ref } from "vue";

import { message } from "ant-design-vue";
import { apiMovieBasicUploadPoster } from "@/api/movie/movieBasicApi";
import { apiComicSeriesViewPath } from "@/api/comic/comicSeriesApi";

const emits = defineEmits(["match-success"]);

const fileList = ref([]);
const refFileModal = ref();
let id = null;
let path = null;

const show = (recordId) => {
  id = recordId;
  apiComicSeriesViewPath({ id }).then((res) => {
    path = res;
    refFileModal.value.show(path);
  });
};

const uploadFile = (options) => {
  apiMovieBasicUploadPoster({
    id,
    path,
    file: options.file,
  }).then((res) => {
    if (res) {
      refFileModal.value.load();
    } else {
      message.error("上传失败");
    }
  });
};

defineExpose({
  show,
});
</script>

<style lang="less" scoped></style>

<!--
 * @Author: cyetstar
 * @Date: 2024-03-12 17:49:02
 * @Description: 漫画书籍详情页面
-->
<template>
  <a-modal
    ref="formRef"
    v-model:visible="visible"
    title="设置封面页"
    width="1280px"
  >
    <div class="flex">
      <div>
        <vue-picture-cropper
          :boxStyle="{
            width: '900px',
            height: '350px',
            backgroundColor: '#f8f8f8',
            margin: 'auto',
          }"
          :img="url"
          :options="{
            viewMode: 1,
            zoomable: false,
            dragMode: 'crop',
            initialAspectRatio: 21 / 29.7,
          }"
          @ready="onReady"
          @cropend="onCropend"
        />
      </div>
      <div class="flex-1 mx-8">
        <img
          :src="newUrl"
          class=""
          style="object-fit: contain; height: 350px"
        />
      </div>
    </div>
    <h-module-title title="页码" class="mt-4" />
    <div class="mt-4">
      <h-radio button :columns="columns" v-model:value="number" />
    </div>
    <template #footer>
      <h-button type="default" @click="onFixed"
        >{{ !fixed ? "固定比例" : "取消固定" }}
      </h-button>
      <h-button type="primary" @click="onSubmit">确认选定</h-button>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, onMounted, computed, inject } from "vue";
import { FileTextOutlined, LeftOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import VuePictureCropper, { cropper } from "vue-picture-cropper";
import {
  apiComicBookListPage,
  apiComicBookUploadCover,
  apiComicBookView,
} from "@/api/comic/comicBookApi";
import { message } from "ant-design-vue";

const route = useRoute();
const router = useRouter();
const record = ref({});
let visible = ref();
let number = ref(1);
let columns = ref([]);
let id = null;
let newUrl = ref();
let url = computed(() => {
  let url = inject("imageUrl");
  url = url + "page?id=" + id + "&number=" + number.value;
  return url;
});
let fixed = ref(false);

const initData = () => {
  apiComicBookListPage({ id }).then((res) => {
    columns.value = res.map((s) => ({ text: s.number, value: s.number }));
  });
};

const show = (bookId) => {
  id = bookId;
  visible.value = true;
  initData();
};

const onReady = () => {
  if (!cropper) return;
  cropper.setCropBoxData({
    left: 0,
    top: 0,
  });
  newUrl.value = cropper.getDataURL();
};
const onCropend = () => {
  if (!cropper) return;
  newUrl.value = cropper.getDataURL();
};

const onFixed = () => {
  if (!cropper) return;
  if (fixed.value) {
    cropper.setAspectRatio(NaN);
  } else {
    cropper.setAspectRatio(21 / 29.7);
  }
  fixed.value = !fixed.value;
};

const onSubmit = () => {
  if (!cropper) return;
  // let cropBoxData = cropper.getCropBoxData();
  let data = cropper.getData();
  let scale = 300 / data.width;
  cropper.scale(scale, scale);
  // console.log(data.height / cropBoxData.height);
  // console.log(cropBoxData);
  // console.log(data);
  cropper
    .getFile()
    .then((file) => {
      return apiComicBookUploadCover({ id, file });
    })
    .then((res) => {
      if (res) {
        message.success("设置成功");
        visible.value = false;
      } else {
        message.error("设置失败");
      }
    });
};

defineExpose({
  show,
});
</script>
<style lang="less">
.ant-radio-button-wrapper {
  width: 32px;
  text-align: center;
  padding: 0;
  margin: 1px;
}
</style>

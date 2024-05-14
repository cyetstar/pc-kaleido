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
    style="top: 20px"
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
    <h-module-title title="单卷" class="mt-4" />
    <div class="mt-4 flex">
      <h-radio
        button
        :columns="bookColumns"
        v-model:value="bookNumber"
        @change="onChangeBook"
      />
      <h-button
        type="primary"
        class="ml-3"
        @click="onSubmitNextBook"
        :disabled="maxBookNumber === bookNumber"
        >确认且下一卷
      </h-button>
    </div>
    <h-module-title title="页码" class="mt-4" />
    <div class="mt-4">
      <h-radio button :columns="pageColumns" v-model:value="pageNumber" />
    </div>
    <template #footer>
      <h-button type="default" @click="onFixed"
        >{{ !fixed ? "固定比例" : "取消固定" }}
      </h-button>
      <h-button type="primary" @click="onSubmit">确认</h-button>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import VuePictureCropper, { cropper } from "vue-picture-cropper";
import { ImageCompressor } from "image-compressor";
import {
  apiComicBookPage,
  apiComicBookUploadCover,
} from "@/api/comic/comicBookApi";
import { message } from "ant-design-vue";
import { useAppStore } from "@/store/modules/app";

const route = useRoute();
const router = useRouter();
let visible = ref();
let record = ref({});
let bookNumber = ref(-1);
let pageNumber = ref(1);
let pageColumns = ref([]);
let bookColumns = ref([]);

let id = null;
let maxBookNumber = ref(0);
let newUrl = ref();

let url = computed(() => {
  let url = inject("imageUrl");
  url = url + "page?id=" + record.value.id + "&number=" + pageNumber.value;
  return url;
});

let fixed = ref(false);
let appStore = useAppStore();

const genPageColumns = () => {
  pageColumns.value = [];
  for (let i = 1; i <= record.value.pageCount; i++) {
    pageColumns.value.push({ text: i, value: i });
  }
};

const initData = () => {
  apiComicBookPage({
    pageSize: 1000,
    orderBy: "ASC:book_number",
    seriesId: record.value.seriesId,
  }).then((res) => {
    bookColumns.value = res.records.map((s) => ({
      text: s.bookNumber,
      value: s.bookNumber,
      ...s,
    }));

    maxBookNumber.value = Math.max.apply(
      Math,
      res.records.map((s) => {
        return s.bookNumber;
      })
    );
    genPageColumns();
  });
};

const show = (bookRecord) => {
  record.value = bookRecord;
  bookNumber.value = record.value.bookNumber;
  pageNumber.value = 1;
  visible.value = true;
  initData();
};

const onChangeBook = (e) => {
  record.value = bookColumns.value.filter((s) => s.value === e.bookNumber)[0];
  if (record.value.pageCount < pageNumber.value) {
    pageNumber.value = record.value.pageCount;
  }
  genPageColumns();
};

const onReady = () => {
  if (!cropper) return;
  let cropBoxData = appStore.$state.cropBoxData;
  cropper.setCropBoxData(cropBoxData);
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

const onSubmitNextBook = () => {
  if (maxBookNumber.value === bookNumber.value) {
    return;
  }
  onSubmit();
  bookNumber.value = bookNumber.value + 1;
  onChangeBook({ bookNumber: bookNumber.value });
};

const onSubmit = () => {
  if (!cropper) return;
  let dataURL = cropper.getDataURL();
  const imageCompressor = new ImageCompressor();
  const compressorSettings = {
    toWidth: 300,
    mimeType: "image/jpg",
    mode: "strict",
    speed: "low",
  };
  imageCompressor.run(dataURL, compressorSettings, (data) => {
    apiComicBookUploadCover({ id: record.value.id, data }).then((res) => {
      if (res) {
        let data = cropper.getCropBoxData();
        appStore.setCropBoxData(data);
        message.success("设置成功");
      } else {
        message.error("设置失败");
      }
    });
  });
};

defineExpose({
  show,
});
</script>
<style lang="less" scoped>
/deep/ .ant-radio-button-wrapper {
  width: 32px;
  text-align: center;
  padding: 0;
  margin: 1px;
}
</style>

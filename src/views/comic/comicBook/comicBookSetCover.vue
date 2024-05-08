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
    <div class="mt-4">
      <h-radio
        button
        :columns="bookColumns"
        v-model:value="bookNumber"
        @change="onChangeBook"
      />
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
import { ref, onMounted, computed, inject } from "vue";
import { FileTextOutlined, LeftOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import VuePictureCropper, { cropper } from "vue-picture-cropper";
import {
  apiComicBookListPage,
  apiComicBookPage,
  apiComicBookUploadCover,
  apiComicBookView,
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
let pageCount = 0;
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
  record.value = bookColumns.value[e.bookNumber - 1];
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

const onSubmit = () => {
  if (!cropper) return;
  cropper
    .getFile()
    .then((file) => {
      return apiComicBookUploadCover({ id: record.value.id, file });
    })
    .then((res) => {
      if (res) {
        let data = cropper.getCropBoxData();
        appStore.setCropBoxData(data);
        message.success("设置成功");
      } else {
        message.error("设置失败");
      }
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

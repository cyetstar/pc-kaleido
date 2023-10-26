<!--
 * @Author: gongxiaofei
 * @Date: 2023-04-14 15:43:21
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-04-17 11:26:56
 * @Description: 
-->
<template>
  <div class="container">
    <a-modal
      v-model:visible="importVisible"
      @ok="toImportExcel"
      @cancel="importVisible = false"
    >
      <template #title>
        <module-title title="批量导入"></module-title>
      </template>
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :custom-request="afterRead"
        :before-upload="beforeUpload"
      >
        <p class="ant-upload-drag-icon flex justify-center pt-20px">
          <img class="w-48px h-49px" src="@/assets/icons/import-box.png" />
        </p>
        <p class="ant-upload-text">点击或者拖拽文件到此区域上传文件</p>
        <p class="ant-upload-hint">
          支持扩展名：.rar .zip .doc .docx .pdf .jpg...
        </p>
      </a-upload-dragger>
      <div class="flex justify-end mt-30px">
        <a @click="downloadTemplate">点击下载导入模板</a>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineEmits } from "vue";
import type { UploadProps } from "ant-design-vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message, Upload } from "ant-design-vue";
import { envParse } from "../../../build/utils";
import ModuleTitle from "@/components/common/ModuleTitle.vue";
// const { VITE_EXCEL_PATH } = envParse(import.meta.env);

const emits = defineEmits(["importExcel"]);
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  templateName: {
    type: String,
    default: "",
  },
});
const importVisible = ref(false);

const show = () => {
  importVisible.value = true;
};
const fileList = ref([]);
const toImportExcel = async () => {};
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  console.log(file.type.indexOf(".sheet"));

  const isExcel = file.type.indexOf(".sheet") > -1;
  if (!isExcel) {
    message.error("只能导入Excel文件");
    return Upload.LIST_IGNORE;
  }
  return true;
};
const afterRead = (options: any) => {
  console.log(options);

  emits("importExcel", async (callbacks: any, tableRef: any) => {
    message.loading({ content: "导入中...", key: "importkey" });
    try {
      const formData = new FormData();
      formData.append("file", options.file);
      let res = await callbacks(formData);
      message.success({ content: "导入成功", key: "importkey" });
      options.status = "done";
      options.onSuccess(res, res);
      importVisible.value = false;
      tableRef.value.load(1);
    } catch (error) {
      options.onError();
      options.status = "error";
    }
  });
};
defineExpose({ show });

const downloadTemplate = () => {
  if (!props.url) return;
  // 这里是绝对路径，不用加.点
  return fetch(props.url).then((res) =>
    res.blob().then((blob) => {
      let a = document.createElement("a");
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = props.templateName;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  );
};
</script>

<style lang="less" scoped></style>

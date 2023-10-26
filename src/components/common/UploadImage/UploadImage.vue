<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-26 10:02:57
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-10-12 10:17:25
 * @Description: 
-->
<template>
  <div>
    <a-upload
      name="file"
      list-type="picture-card"
      class="avatar-uploader"
      v-model:file-list="images"
      :maxCount="maxCount"
      :custom-request="afterRead"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @remove="deleteFile"
    >
      <div>
        <plus-outlined />
        <div style="margin-top: 8px">上传</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onMounted,
  watch,
  toRaw,
} from "vue";
import { FormItem, Upload, message } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import type { UploadProps } from "ant-design-vue";

export default defineComponent({
  name: "HUploadImage",
  components: {
    AFormItem: FormItem,
    AUpload: Upload,
    PlusOutlined,
  },
  props: {
    value: {
      type: Array,
      default: [],
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: [],
    },
    // 单位为kb
    maxSize: {
      type: Number,
      default: 0,
    },
    maxCount: {
      type: Number,
      default: null,
    },
    fileUrl: {
      type: String,
      default: "/file/",
    },
  },
  emits: ["update:value", "uploadFileInfo", "deleteFileInfo"],
  setup(props, { emit }) {
    let thumbUrl = computed(() => `${props.fileUrl}/medium/`);
    let originalUrl = computed(() => `${props.fileUrl}/original/`);
    // let fileIds = ({
    //   get: () => {
    //     return [...props.value] || [];
    //   },
    //   set: (val) => {
    //     console.log(val, 1111);

    //     emit("update:value", val);
    //   },
    // });
    let fileIds = ref<any>([...props.value]);
    watch(
      fileIds,
      (newVal) => {
        emit("update:value", newVal);
      },
      {
        deep: true,
      }
    );
    watch(
      () => props.value,
      (newVal) => {
        fileIds.value = newVal;
        initData();
      }
    );
    let images = ref<any>([]);

    const initData = () => {
      if (fileIds.value) {
        images.value = fileIds.value.map((item: any) => ({
          uid: item,
          name: item,
          status: "done",
          thumbUrl: thumbUrl.value + item,
          response: { fileId: item },
          url: originalUrl.value + item,
        }));
      }
    };

    let previewImage = ref<string>("");
    let previewVisible = ref<boolean>(false);

    const getBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const handlePreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };

    const handleCancel = () => {
      previewVisible.value = false;
    };

    const afterRead = (options: any) => {
      emit("uploadFileInfo", async (callbacks: any) => {
        try {
          let res = await callbacks(options.file);
          fileIds.value.push(res.fileId);
          // images.value.push({
          //   uid: name,
          //   name: name,
          //   status: "done",
          //   thumbUrl: url,
          //   url: url,
          // });
          message.success("上传成功");
          options.status = "done";
          options.onSuccess(res, options.file);
        } catch (error) {
          alert(error);
          options.onError();
          options.status = "error";
          // /亲测下面的一行是关键，没上传成功的要过滤掉，必须写在status后面才能自动删掉失败的上传文件
          setTimeout(() => {
            images.value = images.value.filter(
              (ele: any) => ele.status == "done"
            );
          }, 1000);
        }
      });
    };

    const getMaxSize = () => {
      return props.maxSize > 0 ? props.maxSize * 1024 : false;
    };

    const beforeUpload: UploadProps["beforeUpload"] = (file) => {
      console.log(file);

      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("只能上传jpg/png格式的图片");
        return Upload.LIST_IGNORE;
      }
      const size: any = file.size / 1024;
      if (getMaxSize() && size > getMaxSize()) {
        message.error(`图片大小不能超过${props.maxSize}Kb`);
        return false;
      }
      return true;
    };

    const deleteFile: UploadProps["remove"] = (options: any) => {
      return new Promise<any>((resolve, reject) => {
        let fileId = options?.response?.fileId;
        if (!fileId) {
          message.error("缺少文件id");
          return reject(false);
        }
        emit("deleteFileInfo", async (callbacks: any) => {
          let data = await callbacks(fileId);
          if (data) {
            resolve(true);
            message.success("操作成功！");
            fileIds.value = fileIds.value.filter(
              (item: any) => item !== fileId
            );
          } else {
            reject(false);
            message.error("操作失败！");
          }
        });
      });
    };

    // onMounted(() => {
    //   initData();
    // });

    return {
      images,
      handlePreview,
      handleCancel,
      afterRead,
      beforeUpload,
      deleteFile,
      previewVisible,
      previewImage,
      fileIds,
    };
  },
});
</script>

<style lang="less" scoped></style>

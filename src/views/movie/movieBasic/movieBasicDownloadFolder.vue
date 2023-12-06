<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品表单页面
-->
<template>
  <a-modal
    ref="refModal"
    v-model:visible="visible"
    title="下载目录"
    width="960px"
    :footer="null"
  >
    <div class="flex">
      <h-button small @click="onBack" :disabled="history.length === 0">
        <left-outlined />
      </h-button>
      <h-button class="mx-2" small @click="onRefresh">
        <reload-outlined />
      </h-button>
      <a-input v-model:value="searchForm.path" readonly />
      <h-button class="mx-2" @click="onMoveFile">一键搬运</h-button>
      <h-button-delete
        :disabled="selectedRows.length === 0"
        @delete="onDeleteFile"
        >删除
      </h-button-delete>
    </div>
    <h-table-data
      ref="refTableData"
      :show-index="false"
      :show-pagination="false"
      :page-size="100"
      @load-data="onLoadData"
      class="mt-4 mb-8"
      @selection-change="onSelectionChange"
      :scroll="{ y: 400 }"
    >
      <a-table-column title="名称" width="540px">
        <template #="{ record }">
          <div v-if="record.editable" class="flex items-center">
            <a-input class="flex-1" v-model:value="record.name" />
            <check-outlined class="ml-2" @click="onRenameFile(record)" />
          </div>
          <div v-else class="flex justify-between items-center cursor-pointer">
            <span @click="record.isDir ? onOpenFolder(record) : null">
              <folder-filled
                v-if="record.isDir"
                class="mr-2"
                :style="{
                  fontSize: '20px',
                  color: '#1890ff',
                }"
              />
              {{ record.name }}</span
            >
            <edit-outlined @click="record.editable = true" />
          </div>
        </template>
      </a-table-column>
      <a-table-column title="修改日期" data-index="lastModified" align="center">
      </a-table-column>
      <a-table-column title="大小" align="center">
        <template #="{ record }">
          <span v-if="!record.isDir">{{ record.lengthLabel }}</span>
        </template>
      </a-table-column>
    </h-table-data>
  </a-modal>
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

const emits = defineEmits(["match-success"]);

const appStore = useAppStore();
const movieDownloadPath = appStore.$state.config["movieDownloadPath"];
const movieLibraryPath = appStore.$state.config["movieLibraryPath"];
const visible = ref();
const refTableData = ref();
const searchForm = ref({});
const history = ref([]);
const selectedRows = ref([]);

const show = () => {
  visible.value = true;
  searchForm.value.path = movieDownloadPath;
  if (refTableData.value) {
    refTableData.value.load(1);
  }
};

const onLoadData = (params, callbacks) => {
  callbacks(
    apiFileList({ ...params, ...searchForm.value }).then((res) => {
      return Promise.resolve({
        records: res,
        pageSize: params.pageSize,
      });
    })
  );
};

const onSelectionChange = (keys, rows) => {
  selectedRows.value = rows;
};

const onOpenFolder = (record) => {
  history.value.push(searchForm.value.path);
  searchForm.value.path = record.path;
  refTableData.value.load(1);
};

const onBack = () => {
  searchForm.value.path = history.value.pop();
  refTableData.value.load(1);
};

const onRefresh = () => {
  refTableData.value.load(1);
};

const onRenameFile = (record) => {
  record.editable = false;
  let pathArray = record.path.split("/").slice(0, -1);
  pathArray.push(record.name);
  let newPath = pathArray.join("/");
  if (record.path === newPath) {
    return;
  }
  apiFileRename({
    path: record.path,
    newPath,
  }).then((res) => {
    if (res) {
      refTableData.value.load(1);
    } else {
      message.error("删除失败");
    }
  });
};

const onDeleteFile = () => {
  let path = selectedRows.value.map((s) => s.path);
  apiFileDelete(path).then((res) => {
    if (res) {
      refTableData.value.load(1);
    } else {
      message.error("删除失败");
    }
  });
};

const onMoveFile = () => {
  let pathList = selectedRows.value.map((s) => s.path);
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

<!--
 * @Author: gongxiaofei
 * @Date: 2023-07-03 17:29:00
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-07-03 17:29:01
 * @Description: 
-->
<template>
  <a-modal
    ref="refModal"
    v-model:visible="visible"
    :title="title"
    :width="width"
  >
    <div class="flex">
      <h-button small @click="onBack" :disabled="history.length === 0">
        <left-outlined />
      </h-button>
      <h-button class="mx-2" small @click="onRefresh">
        <reload-outlined />
      </h-button>
      <a-input v-model:value="searchForm.path" readonly />
      <div class="ml-2">
        <h-button-delete
          :disabled="selectedRows.length === 0"
          @delete="onDeleteFile"
          >删除
        </h-button-delete>
      </div>
    </div>
    <h-table-data
      ref="refTableData"
      :show-index="false"
      :show-pagination="false"
      :page-size="100"
      @load-data="onLoadData"
      class="my-4"
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
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from "vue";
import { message, Modal, Input, Table } from "ant-design-vue";
import {
  CheckOutlined,
  EditOutlined,
  FolderFilled,
  LeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
import { HButton, HButtonDelete, HTableData } from "hta-ui";
import {
  apiFileDelete,
  apiFileList,
  apiFileRename,
} from "@/api/sysadmin/fileApi";

export default defineComponent({
  name: "KFileModal",
  components: {
    AModal: Modal,
    AInput: Input,
    ATableColumn: Table.Column,
    CheckOutlined: CheckOutlined,
    EditOutlined: EditOutlined,
    FolderFilled: FolderFilled,
    LeftOutlined: LeftOutlined,
    ReloadOutlined: ReloadOutlined,
    HButton,
    HButtonDelete,
    HTableData,
  },
  props: {
    title: {
      type: String,
      default: "文件管理",
    },
    width: {
      type: Number,
      default: 960,
    },
  },

  setup(props, { emit }) {
    let visible = ref(false);
    const searchForm = ref({});
    const history = ref([]);
    const selectedRows = ref([]);
    const refTableData = ref();

    const show = (path) => {
      searchForm.value.path = path;
      visible.value = true;
    };

    const load = () => {
      refTableData.value.load(1);
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
          message.error("重命名失败");
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
    return {
      visible,
      searchForm,
      history,
      selectedRows,
      refTableData,

      onLoadData,
      onSelectionChange,
      onRefresh,
      onBack,
      onOpenFolder,
      onRenameFile,
      onDeleteFile,
      show,
      load,
    };
  },
});
</script>

<style lang="less" scoped></style>

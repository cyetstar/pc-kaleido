<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-20 10:39:57
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-07-07 14:23:47
 * @Description: 
-->
<template>
  <a-table
    size="small"
    :rowKey="rowKey"
    :loading="loading"
    :data-source="dataRecords"
    :pagination="pagination"
    :row-selection="selection"
    @change="pageChange"
  >
    <a-table-column
      title="序号"
      data-index="uid"
      :width="50"
      align="center"
    ></a-table-column>
    <slot></slot>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Table } from "ant-design-vue";

export default defineComponent({
  name: "HTableData",
  components: {
    ATable: Table,
  },
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    rowKey: {
      type: String,
      default: "uid",
    },
  },
  emits: ["loadData", "selection-change"],
  setup(props, { emit }) {
    let pagination = ref<any>({
      current: 1,
      total: 0,
      pageSize: 10,
      showTotal: null,
      showQuickJumper: false,
      showSizeChanger: true,
      showLessItems: true,
      pageSizeOptions: ["10", "20", "50", "100"],
    });

    let selection = ref<any>({
      selectedRows: [],
      selectedRowKeys: [],
      onChange: (keys: string[], rows: any) => {
        selection.value.selectedRowKeys = keys;
        selection.value.selectedRows = rows;
        emit("selection-change", keys, rows);
      },
    });

    let dataRecords = ref([]);
    let loading = ref<boolean>(false);

    const load = (
      pageNumber: number = pagination.value.current,
      pageSize: number = pagination.value.pageSize
    ) => {
      loading.value = true;
      emit("loadData", { pageNumber, pageSize }, async (callbacks: any) => {
        const {
          records,
          total,
          pageSize: ps,
          pageNumber: pn,
          searchCount,
        } = await callbacks;
        loading.value = false;
        dataRecords.value = records
          ? records.reduce((list: any, item: any, index: number) => {
              list.push({
                ...item,
                uid: index + 1 + (pageNumber - 1) * pageSize,
              });
              return list;
            }, [])
          : [];
        pagination.value = {
          ...pagination.value,
          showQuickJumper: searchCount,
          showTotal: (total: number | string) =>
            searchCount ? `共${total}条记录` : "",
          current: pn,
          total,
          pageSize: ps,
        };

        if (!searchCount) {
          if (dataRecords.value.length === pageSize) {
            pagination.value.total =
              (pn - 1) * ps + dataRecords.value.length + 1;
          } else {
            pagination.value.total = (pn - 1) * ps + dataRecords.value.length;
          }
        }
      });
    };

    const pageChange = (pagination: any) => {
      load(pagination.current, pagination.pageSize);
    };

    const clearSelectedRows = () => {
      selection.value.selectedRowKeys = [];
      selection.value.selectedRows = [];
    };

    onMounted(() => {
      load();
    });

    return {
      pagination,
      selection,
      dataRecords,
      loading,
      load,

      pageChange,
      clearSelectedRows,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../styles/table-datat.less";
:deep(.ant-table) {
  //border: 1px solid #e5e7eb;
  overflow: hidden;
  border-radius: 8px;
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    width: 0;
  }
}
</style>

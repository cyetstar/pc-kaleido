<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-15 09:23:31
 * @LastEditors: bobi
 * @LastEditTime: 2023-02-23 14:34:38
 * @Description: 导出对话框
-->
<template>
  <h-form-modal
    ref="modalRef"
    v-model:form="form"
    title="导出选项"
    ok-text="导出"
    :hide-after-submit="false"
    width="720px"
    @submit="onSubmit"
  >
    <a-col>
      <a-transfer
        :data-source="data"
        :titles="['可选列', '输出列']"
        :list-style="{
          width: '352px',
          height: '300px',
        }"
        :target-keys="targetKeys"
        :selected-keys="selectedKeys"
        :render="(item) => item.title"
        @change="handleChange"
        @selectChange="handleSelectChange"
      />
    </a-col>
    <a-col :span="10" style="margin-top: 12px">
      <h-select
        required
        name="pageSize"
        v-model:value="form.pageSize"
        label="导出记录数"
        :columns="columns"
      ></h-select>
    </a-col>
  </h-form-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import { Col, Transfer, message } from "ant-design-vue";
import HFormModal from "../FormModal";
import HSelect from "../Select";

interface DataItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}
export default defineComponent({
  name: "HModalExport",
  components: {
    ACol: Col,
    ATransfer: Transfer,
    HFormModal,
    HSelect,
  },
  emits: ["loadColumn", "export"],
  setup(props, { emit }) {
    let modalRef = ref();

    let form = ref<any>({
      pageSize: "",
      columns: [],
    });

    let data = ref<DataItem[]>([]);

    let targetKeys = ref<string[]>([]);

    let selectedKeys = ref<string[]>([]);

    const columns = [
      {
        value: 500,
        label: "500条",
      },
      {
        value: 1000,
        label: "1000条",
      },
      {
        value: 2000,
        label: "2000条",
      },
      {
        value: 5000,
        label: "5000条",
      },
    ];

    interface dictItem {
      name: string;
      code: string;
    }
    const show = () => {
      emit("loadColumn", async (callbacks: any) => {
        let res = await callbacks();
        data.value = res.reduce((list: DataItem[], item: dictItem) => {
          list.push({
            title: item.name,
            key: item.code,
          });
          return list;
        }, []);
        modalRef.value.show();
      });
    };

    const handleChange = (keys: string[]) => {
      targetKeys.value = keys;
    };

    const handleSelectChange = (
      sourceSelectedKeys: string[],
      targetSelectedKeys: string[]
    ) => {
      selectedKeys.value = [...sourceSelectedKeys, ...targetSelectedKeys];
    };

    const onSubmit = () => {
      if (targetKeys.value.length === 0) {
        message.warn("请选择需要输出列！");
        return false;
      }
      form.value.columns = targetKeys.value;
      let { columns: list, ...other } = form.value;
      emit("export", { ...other, columns: list.join(",") });
      modalRef.value.hide();
    };

    return {
      modalRef,
      form,
      data,
      targetKeys,
      selectedKeys,
      columns,

      show,
      handleChange,
      handleSelectChange,
      onSubmit,
    };
  },
});
</script>

<style lang="less" scoped></style>

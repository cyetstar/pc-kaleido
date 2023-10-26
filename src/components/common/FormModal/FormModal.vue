<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-13 13:53:04
 * @LastEditors: bobi
 * @LastEditTime: 2023-02-23 15:07:38
 * @Description: 弹框表单
-->
<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask="mask"
    :cancelText="cancelText"
    :okText="okText"
    :centered="centered"
    :bodyStyle="bodyStyle"
    :wrapClassName="wrapClassName"
    :closable="closable"
    :destroyOnClose="destroyOnClose"
    :confirmLoading="confirmLoading"
    :width="width"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      <slot name="icon"></slot>
    </template>
    <a-form
      ref="formRef"
      :name="name"
      :model="formData"
      :layout="layout"
      :labelAlign="labelAlign"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-row :gutter="24">
        <slot></slot>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Form, Modal, Row } from "ant-design-vue";
import { formModalProps } from "./types";

export default defineComponent({
  name: "HFormModal",
  components: {
    AModal: Modal,
    AForm: Form,
    ARow: Row,
  },
  props: formModalProps,
  emits: ["cancel", "submit", "update:form"],
  setup(props, { emit }) {
    let visible = ref<boolean>(false);

    let formRef = ref();

    let formData = ref<any>({});

    let defaultFormData = Object.assign({}, props.form);

    const show = () => {
      visible.value = true;
    };

    const hide = () => {
      visible.value = false;
    };

    const reset = () => {
      Object.keys(formData.value).forEach((key: string) => {
        formData.value[key] = defaultFormData[key] || "";
      });
    };

    const handleOk = () => {
      formRef.value.validateFields().then(() => {
        emit("submit", formData.value);
        if (props.hideAfterSubmit) {
          hide();
        }
      });
    };

    const handleCancel = () => {
      emit("cancel");
      hide();
    };

    watch(
      () => formData.value,
      (newVal) => {
        emit("update:form", newVal);
      },
      { deep: true }
    );

    watch(
      () => props.form,
      (newVal) => {
        formData.value = newVal;
      },
      { deep: true, immediate: true }
    );

    return {
      visible,
      formRef,
      formData,

      show,
      hide,
      reset,
      handleOk,
      handleCancel,
    };
  },
});
</script>

<style lang="less" scoped></style>

<!--
 * @Author: gongxiaofei
 * @Date: 2022-07-29 10:25:47
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-08-06 14:51:59
 * @Description: 基础弹框
-->
<template>
  <a-modal
    :visible="visible"
    :title="title"
    :width="width"
    :closable="closable"
  >
    <template #footer>
      <a-button v-if="!noCancel" key="back" @click="cancel">{{
        cancelText
      }}</a-button>
      <a-button
        key="submit"
        :type="okType"
        :loading="confirmLoading"
        @click="submit"
      >
        {{ okText }}
      </a-button>
    </template>
    <!-- <a-form ref="formRef" name="form" :model="formData">

    </a-form> -->
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, withDefaults } from "vue";
import type { FormInstance } from "ant-design-vue";

interface BaseModal {
  visible: boolean;
  // type?: boolean,
  title?: string;
  width?: number;
  closable?: boolean;
  noCancel?: boolean;
  cancelText?: string;
  okText?: string;
  okType?: string;
  confirmLoading?: boolean;
  destroyOnClose?: boolean;
  centered?: boolean;
}
const props = withDefaults(defineProps<BaseModal>(), {
  visible: false,
  title: "",
  width: 800,
  closable: false,
  noCancel: true,
  cancelText: "取消",
  okType: "primary",
  okText: "保存",
  confirmLoading: false,
});

const formRef = ref<FormInstance>();

interface FormData {}
const formData = ref();

const cancel = () => {};

const submit = () => {};
</script>

<style lang="scss"></style>

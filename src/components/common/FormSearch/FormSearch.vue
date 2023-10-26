<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-14 09:11:45
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-10-11 10:36:10
 * @Description:
-->
<template>
  <a-form ref="formSearchRef" :model="formData" :layout="layout">
    <a-row :gutter="32">
      <slot></slot>
      <slot v-if="advance" name="advance"></slot>
      <a-col :span="$slots.advance ? actionSpan + 2 : actionSpan">
        <a-space>
          <a-switch
            v-model:checked="formData.searchCount"
            un-checked-children="查总数"
            checked-children="查总数"
          ></a-switch>
          <h-button type="primary" @click="onSearch">查询</h-button>
          <h-button @click="onReset">重置</h-button>
          <h-button v-if="$slots.advance" @click="onAdvancedSearch">
            更多筛选
          </h-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Form, Row, Switch, Col, Button, Space } from "ant-design-vue";
import HButton from "@c/common/Button/Button.vue";

export default defineComponent({
  name: "HFormSearch",
  components: {
    HButton,
    AForm: Form,
    ARow: Row,
    ACol: Col,
    ASwitch: Switch,
    AButton: Button,
    ASpace: Space,
  },
  setup(props, { emit }) {
    let formSearchRef = ref();
    let formData: any = ref({ ...props.form, searchCount: props.searchCount });
    let defaultFormData = Object.assign({}, props.form);
    props.form = Object.assign(props.form, { searchCount: props.searchCount });

    const onSearch = () => {
      emit("search", formData.value);
    };

    const onReset = () => {
      Object.keys(formData.value).forEach((key: string) => {
        if (key !== "searchCount") {
          formData.value[key] = defaultFormData[key] || null;
        } else {
          formData.value.searchCount = false;
        }
      });
      emit("reset", formData.value);
    };

    let advance = ref<boolean>(false);
    const onAdvancedSearch = () => {
      advance.value = !advance.value;
    };

    watch(
      () => formData.value,
      (newVal) => {
        // console.log("watch", newVal);
        emit("update:form", newVal);
      },
      {
        deep: true,
      }
    );

    watch(
      () => props.form,
      (newVal) => {
        // console.log("watch2", newVal);
        formData.value = newVal;
      },
      {
        deep: true,
      }
    );

    return {
      formSearchRef,
      formData,
      defaultFormData,
      advance,
      onSearch,
      onReset,
      onAdvancedSearch,
    };
  },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    searchCount: {
      type: Boolean,
      default: false,
    },
    actionSpan: {
      type: Number,
      default: 4,
    },
    layout: {
      type: String as any,
      default: "horizontal",
    },
  },
  emits: ["update:form", "search", "reset"],
});
</script>

<style lang="less" scoped></style>

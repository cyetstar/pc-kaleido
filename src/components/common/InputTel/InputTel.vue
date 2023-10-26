<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-09 11:57:49
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-12-09 14:26:30
 * @Description: 手机号码校验输入框
-->
<template>
  <h-input v-model:value="inputVal" :rules="inputRules"></h-input>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import HInput from "../Input";
import type { Rule } from "ant-design-vue/es/form";
import { Form } from "ant-design-vue";

export default defineComponent({
  name: "HInputTel",
  components: {
    HInput,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    rules: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit, attrs }) {
    const formItemContext = Form.useInjectFormItemContext();

    let inputVal = computed({
      get: () => props.value,
      set: (val) => {
        emit("update:value", val);
        formItemContext.onFieldChange();
      },
    });

    let inputRules = computed(() => {
      return [
        ...props.rules,
        {
          validator: checkMobile,
          message: `请输入合法${attrs.label || ""}`,
          trigger: ["change", "blur"],
        },
      ];
    });

    const checkMobile = (_rule: Rule, value: string) => {
      if (!value || value === null || value === undefined)
        return Promise.resolve();
      const result = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value);
      if (result) {
        return Promise.resolve();
      } else {
        return Promise.reject(_rule.message);
      }
    };

    return {
      inputVal,
      inputRules,
    };
  },
});
</script>

<style lang="less" scoped></style>

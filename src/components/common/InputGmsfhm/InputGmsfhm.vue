<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-09 14:33:39
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-10-08 17:32:11
 * @Description: 公民身份号码input
-->
<template>
  <h-input
    search
    v-model:value="inputVal"
    :rules="inputRules"
    @blur="onBlur"
    @search="onSearch"
  ></h-input>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import HInput from "../Input";
import type { Rule } from "ant-design-vue/es/form";
import { Form } from "ant-design-vue";
import idUtils from "@/utils/idUtils";

export default defineComponent({
  name: "HInputGmsfhm",
  components: { HInput },
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
  emits: ["update:value", "explain", "search"],
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
          validator: checkIdCard,
          message: `请输入合法${attrs.label || ""}`,
          trigger: ["change", "blur"],
        },
      ];
    });

    const checkIdCard = async (_rule: Rule, value: string) => {
      if (!value || value === null || value === undefined)
        return Promise.resolve();
      let res = await idUtils.checkIdCardNo(value);
      if (res) {
        return Promise.resolve();
      } else {
        return Promise.reject(_rule.message);
      }
    };

    const onBlur = (e: Event) => {
      const len = inputVal.value.length;
      if (len === 18 || len === 15) {
        const xb = idUtils.getXbFromId(inputVal.value);
        const csrq = idUtils.getCsrqFromId(inputVal.value);
        const hksx = idUtils.getHksxFromId(inputVal.value);
        console.log(xb, csrq, hksx);
        emit("explain", { xb, csrq, hksx });
      }
    };

    const onSearch = (e: Event) => {
      emit("search", e);
    };

    return {
      inputVal,
      inputRules,
      onBlur,
      onSearch,
    };
  },
});
</script>

<style lang="less" scoped></style>

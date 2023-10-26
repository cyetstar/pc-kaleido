<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-09 16:22:32
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-12-12 09:41:23
 * @Description: 密码input，包含密码强度、两次密码校验
-->
<template>
  <h-input password v-model:value="inputVal" :rules="inputRules"></h-input>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import HInput from "../Input";
import type { Rule } from "ant-design-vue/es/form";
import { Form } from "ant-design-vue";
const PsdStrengthObj: any = {
  low: {
    message: "至少1位数字,1个小写字母,最少6位",
    regexp: /^(?=.*[a-z])(?=.*\d){6,20}/,
  },
  medium: {
    message: "至少1位数字,1个小写字母,1个特殊字符,最少8位",
    regexp: /^(?=.*[a-z])(?=.*\d)(?=.*?[^\w\s]){8,20}/,
  },
  high: {
    message: "至少1位数字,1个小写字母,1个大写字母,1个特殊字符,最少8位",
    regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[^\w\s]){8,20}/,
  },
};
export default defineComponent({
  name: "HInputPassword",
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
    strength: {
      type: [String, Boolean],
      default: "low",
    },
    password: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const formItemContext = Form.useInjectFormItemContext();

    let innerPassword = computed(() => props.password);

    let inputVal = computed({
      get: () => props.value,
      set: (val) => {
        emit("update:value", val);
        formItemContext.onFieldChange();
      },
    });

    let inputRules = computed(() => {
      let rules = [
        ...props.rules,
        {
          validator: checkTwice,
          message: "两次输入不一致",
          trigger: ["change", "blur"],
        },
      ];
      if (!props.strength) {
        rules.push({
          validator: checkPassword,
          message: PsdStrengthObj[props.strength as string].message,
          trigger: ["change", "blur"],
        });
      }
      return rules;
    });

    const checkPassword = (_rule: Rule, value: string) => {
      if (!value || value === undefined) return Promise.resolve();
      const reg = PsdStrengthObj[props.strength as string].regexp;
      const res = reg.test(value);
      if (res) {
        return Promise.resolve();
      } else {
        return Promise.reject(_rule.message);
      }
    };

    const checkTwice = (_rule: Rule, value: string) => {
      if (
        innerPassword.value === undefined ||
        innerPassword.value.length === 0
      ) {
        return Promise.resolve();
      } else if (value === innerPassword.value) {
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

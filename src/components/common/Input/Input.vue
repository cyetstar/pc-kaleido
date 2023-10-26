<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-08 15:29:31
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-10-14 17:20:30
 * @Description: input输入框组件
-->
<template>
  <a-form-item
    :label="label"
    :name="name"
    :rules="inputRules"
    :labelCol="labelCol"
  >
    <component
      :is="componentName"
      :id="id"
      v-model:value="inputVal"
      :defaultValue="defaultValue"
      :maxlength="maxlength"
      :disabled="disabled"
      :border="border"
      :showCount="showCount"
      :size="size"
      :allowClear="allowClear"
      :placeholder="inputPlaceholder"
      :loading="loading"
      v-bind="$attrs"
      :autocomplete="componentName === 'AInputPassword' ? 'new-password' : ''"
      @change="onChange"
      @search="onSearch"
      @blur="onBlur"
    >
      <slot name="prefix"></slot>
      <slot name="suffix"></slot>
    </component>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { Form, FormItem, Input } from "ant-design-vue";
import { inputProps } from "./types";

export default defineComponent({
  name: "HInput",
  components: {
    AFormItem: FormItem,
    AInput: Input,
    AInputSearch: Input.Search,
    AInputPassword: Input.Password,
    AInputTextArea: Input.TextArea,
  },
  props: inputProps,
  emits: ["update:value", "change", "search", "blur"],
  setup(props, { emit }) {
    const formItemContext = Form.useInjectFormItemContext();

    let componentName = computed(() => {
      if (props.search) {
        return Input.Search.name;
      } else if (props.password) {
        return Input.Password.name;
      } else if (props.textArea) {
        return Input.TextArea.name;
      } else {
        return Input.name;
      }
    });

    // let inputVal = ref<string>(props.value || "");
    let inputVal = computed({
      get: () => props.value || "",
      set: (val) => {
        emit("update:value", val);
        formItemContext.onFieldChange();
      },
    });

    let inputPlaceholder = computed(() => {
      return props.placeholder ?? `请输入${props.label || ""}`;
    });

    let inputRules: any = computed(() => {
      let rules = [...props.rules];
      if (props.required) {
        rules.push({
          required: true,
          message: `请输入${props.label || ""}`,
          trigger: ["blur", "change"],
        });
      }
      if (props.unique) {
        rules.push({
          validator: checkUnique,
          message: `${props.label || ""}存在重复`,
          trigger: "blur",
        });
      }
      return rules;
    });

    const checkUnique = async (_rule: Rule, value: string) => {
      if (props.unique) {
        let res = await props.unique(value);
        console.log(res);
        if (res) {
          return Promise.resolve();
        } else {
          return Promise.reject(_rule.message);
        }
      } else {
        return Promise.resolve();
      }
    };

    const onChange = (e: Event) => {
      // emit("update:value", (e.target as any).value);
      // formItemContext.onFieldChange();
      emit("change", e);
    };

    const onSearch = (value: string) => {
      emit("search", value);
    };

    const onBlur = (e: Event) => {
      emit("blur", e);
    };

    return {
      componentName,
      inputVal,
      inputPlaceholder,
      inputRules,
      onChange,
      onSearch,
      onBlur,
    };
  },
});
</script>

<style lang="less" scoped></style>

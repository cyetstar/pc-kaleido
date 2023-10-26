<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-12 14:00:39
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-01-07 17:16:42
 * @Description: 
-->
<template>
  <a-form-item :label="label" :name="name" :rules="innerRules">
    <a-checkbox-group>
      <a-checkbox
        v-for="item in columnData"
        :key="item[fieldNames.value]"
        :value="item[fieldNames.value]"
        >{{ item[fieldNames.label] }}</a-checkbox
      >
    </a-checkbox-group>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, inject } from "vue";
import { FormItem, CheckboxGroup, Checkbox } from "ant-design-vue";
import { checkboxProps } from "./types";

export default defineComponent({
  name: "HCheckbox",
  component: {
    AFormItem: FormItem,
    ACheckbxoGroup: CheckboxGroup,
    ACheckbox: Checkbox,
  },
  props: checkboxProps,
  emits: ["update:value", "change", "listDictByType"],
  setup(props, { emit }) {
    let checkboxVal = ref<string>(props.value || "");

    let innerRules: any = computed(() => {
      let rules = [...props.rules];
      if (props.require) {
        rules.push({
          required: true,
          message: `请选择${props.label || ""}`,
        });
      }
      return rules;
    });

    let columnData = props.columns || [];

    const initData = () => {
      if (columnData.length > 0 || !props.dictType) return;
      emit("listDictByType", async (callbacks: any) => {
        columnData = await callbacks(props.dictType);
      });
    };

    const onChange = (e: Event) => {
      let targetVal = (e.target as any).value;
      emit("update:value", targetVal);
      const option = columnData.find((s: any) => s.value === targetVal);
      emit("change", { value: targetVal, text: option?.text ?? "" });
    };

    onMounted(() => {
      initData();
    });

    return {
      innerRules,
      columnData,
      checkboxVal,
      onChange,
    };
  },
});
</script>

<style lang="less" scoped></style>

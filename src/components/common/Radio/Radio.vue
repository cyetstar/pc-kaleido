<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-12 09:40:20
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-12-19 10:05:20
 * @Description: 单选框radio
-->
<template>
  <a-form-item :label="label" :name="name" :rules="innerRules">
    <a-radio-group
      v-model:value="radioVal"
      @change="onChange"
      :disabled="disabled"
    >
      <component
        :is="componentName"
        v-for="item in columnData"
        :key="item[fieldNames.value]"
        :value="item[fieldNames.value]"
        >{{ item[fieldNames.label] }}</component
      >
    </a-radio-group>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, inject } from "vue";
import { FormItem, RadioGroup, Radio } from "ant-design-vue";
import { radioProps } from "./types";

export default defineComponent({
  name: "HRadio",
  components: { AFormItem: FormItem, ARadioGroup: RadioGroup, ARadio: Radio },
  props: radioProps,
  emits: ["update:value", "change", "listDictByType"],
  setup(props, { emit }) {
    // let listDictByType: any = inject("listDictByType");

    let radioVal = ref<string>(props.value || "");

    let componentName = props.button ? Radio.Button.name : Radio.name;

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
      componentName,
      innerRules,
      columnData,
      radioVal,
      onChange,
    };
  },
});
</script>

<style lang="less" scoped></style>

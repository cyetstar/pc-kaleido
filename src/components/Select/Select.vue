<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-12 14:47:14
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-01-13 11:31:21
 * @Description:
-->
<template>
  <a-form-item :label="label" :name="name" :rules="innerRules">
    <a-select
      v-model:value="selectVal"
      :placeholder="`请选择${label || ''}`"
      :mode="mode"
      :disabled="disabled"
      @change="onChange"
      allowClear
    >
      <a-select-option
        v-for="item in columnData"
        :key="item[fieldNames.value]"
        :value="item[fieldNames.value]"
        >{{ item[fieldNames.label] }}</a-select-option
      >
      <template #notFoundContent>
        <slot name="notFoundContent"></slot>
      </template>
      <template #placeholder>
        <slot name="placeholder"></slot>
      </template>
    </a-select>
  </a-form-item>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onMounted,
  inject,
  watch,
} from "vue";
import { FormItem, Select, SelectOption } from "ant-design-vue";
import { selectProps } from "./types";

export default defineComponent({
  name: "HSelect",
  components: {
    AFormItem: FormItem,
    ASelect: Select,
    ASelectOption: SelectOption,
  },
  props: selectProps,
  emits: ["update:value", "change"],
  setup(props, { emit }) {
    let listDictByType = inject<Function>("listDictByType");

    let selectVal = computed({
      get: () => {
        if (Array.isArray(props.value)) {
          return props.value;
        } else {
          return props.value;
        }
      },
      set: (val) => {
        emit("update:value", val);
      },
    });

    let innerRules: any = computed(() => {
      let rules = [...props.rules];
      if (props.required) {
        rules.push({
          required: true,
          message: `请选择${props.label || ""}`,
        });
      }
      return rules;
    });
    let columnData = ref<any>(props.columns || []);

    const initData = () => {
      if (columnData.length > 0 || !props.dictType) return;
      listDictByType!(props.dictType).then((res: any) => {
        columnData.value = res;
      });
    };

    const onChange = (e: Event) => {
      let targetVal = e;
      const option = columnData.value.find((s: any) => s.value === targetVal);
      emit("change", option);
    };

    onMounted(() => {
      initData();
    });

    watch(
      () => props.columns,
      (newVal) => {
        columnData.value = newVal;
      }
    );

    return {
      innerRules,
      columnData,
      selectVal,
      onChange,
    };
  },
});
</script>

<style lang="less" scoped></style>

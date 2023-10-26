<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-12 14:47:14
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-07-04 14:32:42
 * @Description:
-->
<template>
  <a-form-item :label="label" :name="name" :rules="innerRules">
    <a-select
      v-model:value="selectVal"
      :placeholder="selectPlaceholder"
      :mode="mode"
      :disabled="disabled"
      @change="onChange"
      :allowClear="$props.allowClear"
      v-bind="$attrs"
    >
      <a-select-option
        v-for="item in columnData"
        :key="item[fieldNames.value]"
        :value="item[fieldNames.value]"
        >{{ item[fieldNames.label] }}
      </a-select-option>
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
  watch,
} from "vue";
import { FormItem, Select, SelectOption } from "ant-design-vue";
import { selectProps } from "./types";
import { sysDictListByTypeApi } from "@/api/sysadmin/sysDictApi";

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
    let selectVal = computed({
      get: () => {
        if (Array.isArray(props.value)) {
          return props.value;
        } else if (!props.value) {
          return undefined; //ant官网提示：placeholder 只有在 value = undefined 才会显示，对于其它的 null、0、'' 等等对于 JS 语言都是有意义的值。
        } else {
          return props.value;
        }
      },
      set: (val) => {
        emit("update:value", val);
      },
    });
    let selectPlaceholder = computed(() => {
      return props.placeholder || `请选择${props.label || ""}`;
    });

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

    let columnData = ref<any>(props.columns || []);

    const initData = () => {
      if (columnData.value.length > 0 || !props.dictType) return;
      sysDictListByTypeApi(props.dictType).then((data) => {
        if (props.filterColumns) {
          columnData.value = data.filter(props.filterColumns);
        } else {
          columnData.value = data;
        }
      });
      // emit("listDictByType", async (callbacks: any) => {
      //   const { tree } = await callbacks({ dmzm: props.dictType });
      //   columnData.value = tree;
      // });
    };

    const onChange = (value: any) => {
      let targetVal = value;
      const option = columnData.value.find(
        (s: any) => s[props.fieldNames.value] == targetVal
      );
      emit("change", { ...option, value: targetVal, text: option?.text ?? "" });
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
      selectPlaceholder,
      columnData,
      selectVal,
      onChange,
    };
  },
});
</script>

<style lang="less" scoped></style>

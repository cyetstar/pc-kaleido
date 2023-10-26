<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-19 10:08:41
 * @LastEditors: bobi
 * @LastEditTime: 2023-03-09 16:58:51
 * @Description: 所属辖区级联选择框
-->
<template>
  <a-form-item :label="label" :name="name" :rules="innerRules">
    <a-cascader
      ref="ssxqCascader"
      :defaultValue="defaultValue"
      v-model:value="model"
      :fieldNames="fieldNames"
      placeholder="请选择"
      change-on-select
      :options="options"
      v-bind="$attrs"
      :displayRender="displayRender"
      :loadData="loadData"
      @change="onChange"
    ></a-cascader>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import { FormItem, Cascader } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import type { CascaderProps } from "ant-design-vue";
import { selectProps } from "./types";
import { listByParentApi } from "@/api/sysadmin/ssxqApi";

export default defineComponent({
  name: "HSelectSsxq",
  components: {
    AFormItem: FormItem,
    ACascader: Cascader,
  },
  props: selectProps,
  emits: ["update:value", "change", "listSsxq"],
  setup(props, { emit }) {
    let ssxqCascader = ref();

    let defaultValue = ref<string[]>([]);

    let model = ref<string[]>([]);

    let inner = ref<boolean>(false);

    interface OptionItem {
      text: string;
      value: string | number;
      children: OptionItem[];
    }

    let options = ref<OptionItem[]>([]);

    const checkLevel = async (_rule: Rule, value: string) => {
      let res = value.length >= props.requireLevel;
      if (res) {
        return Promise.resolve();
      } else {
        return Promise.reject(_rule.message);
      }
    };

    let innerRules: any = computed(() => {
      let rules = [...props.rules];
      if (props.require) {
        rules.push({
          required: true,
          message: `请选择${props.label || ""}`,
        });
      }
      if (props.requireLevel) {
        interface Msg {
          [propName: number]: string;
        }

        let messages: Msg = {
          6: "区县",
          9: "镇街",
          12: "社区",
          15: "网格",
        };
        rules.push({
          validator: checkLevel,
          message: `请选择到${messages[props.requireLevel]}`,
        });
      }
      return rules;
    });

    const finds = (options: any, findValue: string | number): Array<string> => {
      for (let option of options) {
        if (option.value === findValue) {
          return [option.value];
        }
        if (option.children !== undefined && option.children.length > 0) {
          let items: any = finds(option.children, findValue);
          return items !== undefined
            ? [option.value, ...items]
            : [option.value];
        }
      }
      return [];
    };

    const findText = (options: any, findValue: string | number | undefined) => {
      for (let option of options) {
        if (option.value === findValue) {
          return option.text;
        }
        if (option.children !== undefined && option.children.length > 0) {
          let text: any = findText(option.children, findValue);
          if (isValidValue(text)) {
            return text;
          }
        }
      }
    };

    const isValidValue = (value: any) => {
      return value !== null && value !== undefined && value.length > 0;
    };

    const initData = () => {
      //
      let value = Array.isArray(props.value) ? props.value.join() : props.value;

      listByParentApi({
        ssxq: value,
        glmType: props.glmType ?? "none",
        minLevel: props.minLevel,
        abbr: props.abbr,
        root: props.root,
        init: true,
        dataType: props.dataType,
      }).then((data) => {
        options.value = data;
        if (value) {
          defaultValue.value = finds(data, value as string) as string[];
        }
        // console.log("data", data);
        // console.log("value", value);
        // console.log("defaultValue.value", defaultValue.value);
        model.value = defaultValue.value;
        if (!isValidValue(value) && isValidValue(defaultValue.value)) {
          inner.value = true;
          // emit("update:value", defaultValue.value.at(-1));
        }
      });
      // emit("listSsxq", async (callbacks: any) => {
      //   let data = await callbacks({
      //     ssxq: value,
      //     glmType: props.glmType ?? "none",
      //     minLevel: props.minLevel,
      //     abbr: props.abbr,
      //     root: props.root,
      //     init: true,
      //     dataType: props.dataType,
      //   });
      //   options.value = data;
      //   if (value) {
      //     defaultValue.value = finds(data, value as string) as string[];
      //   }
      //   console.log("data", data);
      //   console.log("value", value);
      //   console.log("defaultValue.value", defaultValue.value);
      //   model.value = defaultValue.value;
      //   if (!isValidValue(value) && isValidValue(defaultValue.value)) {
      //     inner.value = true;
      //     // emit("update:value", defaultValue.value.at(-1));
      //   }
      // });
    };

    const loadData: CascaderProps["loadData"] = (selectedOptions) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      listByParentApi({
        ssxq: targetOption.value,
        glmType: props.glmType ?? "none",
        minLevel: props.minLevel,
        abbr: props.abbr,
        dataType: props.dataType,
      }).then((data) => {
        targetOption.loading = false;
        if (data && data.length > 0) {
          targetOption.children = data;
        } else {
          targetOption.children = [];
          targetOption.isLeaf = true;
        }
        options.value = [...options.value];
      });

      // emit("listSsxq", async (callbacks: any) => {
      //   let data = await callbacks({
      //     ssxq: targetOption.value,
      //     glmType: props.glmType ?? "none",
      //     minLevel: props.minLevel,
      //     abbr: props.abbr,
      //     dataType: props.dataType,
      //   });
      //   targetOption.loading = false;
      //   if (data && data.length > 0) {
      //     targetOption.children = data;
      //   } else {
      //     targetOption.children = [];
      //     targetOption.isLeaf = true;
      //   }
      //   options.value = [...options.value];
      // });
    };

    const onChange = (value: string[], selectedOptions: any) => {
      // console.log("-----", value, selectedOptions);
      let val;
      if (value) {
        // val = value.at(-1) as string | number;
        val = value[value.length - 1] as string | number;
        inner.value = true;
      }
      // console.log("model.value", model.value);
      emit("update:value", val);
      // emit("change", { value: val, text: findText(options.value, val) }); //原方法
      emit("change", { value: val, text: createText(selectedOptions) }); //改造
    };
    const createText = (sOptions: any) => {
      let text = sOptions;
      const createFullName = () => {
        let fullN = "";
        sOptions.forEach((item: any) => {
          fullN += item.text;
        });
        return fullN;
      };
      if (sOptions?.length) {
        text = props.fullName
          ? createFullName()
          : sOptions[sOptions.length - 1].text;
      }
      return text;
    };

    const displayRender = ({ labels, selectedOptions }) => {
      return labels[labels.length - 1];
    };

    // watch(
    //   () => model.value,
    //   (newVal) => {
    //     let val;
    //     console.log("watch model", model.value);
    //     if (newVal) {
    //       val = newVal.at(-1) as string | number;
    //     }
    //     emit("update:value", val);
    //   }
    // );

    // watch(
    //   () => props.defaultValue,
    //   (newVal) => {
    //     initData();
    //   }
    // );
    watch(
      () => props.value,
      (newVal) => {
        initData();
      }
    );

    onMounted(() => {
      initData();
    });

    return {
      ssxqCascader,
      defaultValue,
      model,
      options,

      innerRules,
      loadData,
      onChange,
      displayRender,
    };
  },
});
</script>

<style lang="less" scoped></style>

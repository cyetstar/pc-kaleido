<template>
  <a-form-item :label="label" :name="name" :rules="inputRules">
    <component
      :is="componentName"
      :show-time="showTime"
      v-bind="$attrs"
      format="YYYY-MM-DD HH:mm:ss"
      value-format="YYYYMMDDHHmmss"
      :style="{ width: '100%' }"
    >
    </component>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { FormItem, DatePicker } from "ant-design-vue";
export default defineComponent({
  name: "HDatePicker",
  components: {
    AFormItem: FormItem,
    ADatePicker: DatePicker,
    ARangePicker: DatePicker.RangePicker,
  },
  props: {
    label: String,
    name: String,
    required: Boolean,
    range: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: [],
    },
    showTime: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const componentName = computed(() => {
      if (props.range) {
        return DatePicker.RangePicker.name;
      } else {
        return DatePicker;
      }
    });

    const inputRules: any = computed(() => {
      let rules = [...props.rules];
      if (props.required) {
        rules.push({
          required: true,
          message: `请选择${props.label || ""}`,
          trigger: ["blur", "change"],
        });
      }
      return rules;
    });

    return {
      componentName,
      inputRules,
    };
  },
});
</script>

<style lang="less" scoped></style>

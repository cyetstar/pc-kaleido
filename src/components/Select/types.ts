/*
 * @Author: gongxiaofei
 * @Date: 2022-12-12 14:56:46
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-01-08 14:18:38
 * @Description:
 */
import { ExtractPropTypes, PropType } from "vue";

// interface ColumnsItem {
//   text: string;
//   value: string | number;
//   [propsName: string]: string | number;
// }
// interface FieldName {
//   label: string;
//   value: string;
// }
const ModeType = ["multiple", "tags", "combobox"];

export const selectProps = {
  label: String,
  name: String,
  rules: {
    type: Array,
    default: [],
  },
  value: [String, Array, Number],
  dictType: String,
  columns: {
    type: Array as any,
    default: [],
  },
  fieldNames: {
    type: Object as any,
    default: {
      label: "text",
      value: "value",
    },
  },
  disabled: Boolean,
  required: Boolean,
  button: Boolean,
  justify: Boolean,
  mode: {
    type: Object as PropType<
      "multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE"
    >,
    default: "",
    validator(value: string) {
      return ModeType.includes(value);
    },
  },
  bordered: Boolean,
  allowClear: Boolean,
};

export type SelectProps = ExtractPropTypes<typeof selectProps>;

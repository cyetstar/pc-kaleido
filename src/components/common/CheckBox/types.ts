/*
 * @Author: gongxiaofei
 * @Date: 2022-12-12 14:19:52
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-01-07 17:16:21
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
export const checkboxProps = {
  label: String,
  name: String,
  rules: {
    type: Array,
    default: [],
  },
  value: null,
  dictType: String,
  columns: {
    type: Array as any,
    default: [],
  },
  fieldNames: {
    type: Object,
    default: {
      label: "text",
      value: "value",
    },
  },
  disabled: Boolean,
  require: Boolean,
  button: Boolean,
  justify: Boolean,
};

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;

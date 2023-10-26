/*
 * @Author: gongxiaofei
 * @Date: 2022-12-12 10:48:41
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-01-08 14:20:02
 * @Description:
 */
import { ExtractPropTypes, PropType } from "vue";

// interface ColumnsItem {
//   text: string,
//   value: string | number
//   [propsName: string]: string | number
// }
// interface FieldName {
//   label: string
//   value: string
// }
export const radioProps = {
  label: String,
  name: String,
  rules: {
    type: Array,
    default: [],
  },
  value: String,
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
  require: Boolean,
  button: Boolean,
  justify: Boolean,
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;

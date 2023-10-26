/*
 * @Author: gongxiaofei
 * @Date: 2022-12-12 14:56:46
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-10-14 17:19:30
 * @Description:
 */
import { ExtractPropTypes, PropType } from "vue";

interface ColumnsItem {
  text: string;
  value: string | number;
  [propsName: string]: string | number;
}
interface FieldName {
  label: string;
  value: string;
}
const ModeType = ["multiple", "tags", "combobox", "undefined"];

export const selectProps = {
  label: String,
  name: String,
  rules: {
    type: Array,
    default: [],
  },
  value: [String, Array, Number] as any,
  dictType: String,
  columns: {
    type: Array as PropType<ColumnsItem[]>,
    default: [],
  },
  fieldNames: {
    type: Object as PropType<FieldName>,
    default: {
      label: "text",
      value: "value",
    },
  },
  disabled: Boolean,
  require: Boolean,
  button: Boolean,
  justify: Boolean,
  mode: {
    type: String as PropType<
      "multiple" | "tags" | "SECRET_COMBOBOX_MODE_DO_NOT_USE"
    >,
    default: "undefined",
    validator(value: string) {
      return ModeType.includes(value);
    },
  },
  bordered: Boolean,
  allowClear: {
    type: Boolean,
    default: true,
  },
  placeholder: String,
  filterColumns: Function,
};

export type SelectProps = ExtractPropTypes<typeof selectProps>;

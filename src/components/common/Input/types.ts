/*
 * @Author: gongxiaofei
 * @Date: 2022-12-08 16:39:36
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-12-09 10:50:45
 * @Description:
 */
import { ExtractPropTypes } from "vue";

const InputSize = ["default", "large", "small"];

export const inputProps = {
  label: String,
  name: String,
  labelCol: Object,
  required: Boolean,
  search: Boolean,
  password: Boolean,
  textArea: Boolean,
  id: String,
  value: String,
  defaultValue: String,
  maxlength: Number,
  disabled: Boolean,
  border: Boolean,
  showCount: Boolean,
  placeholder: String,
  loading: Boolean,
  size: {
    type: String,
    default: "default",
    validator(value: string) {
      return InputSize.includes(value);
    },
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
  rules: {
    type: Array,
    default: [],
  },
  unique: Function,
};

export type InputProps = ExtractPropTypes<typeof inputProps>;

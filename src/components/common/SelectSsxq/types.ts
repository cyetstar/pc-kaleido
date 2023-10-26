/*
 * @Author: gongxiaofei
 * @Date: 2022-12-12 14:56:46
 * @LastEditors: bobi
 * @LastEditTime: 2023-02-07 10:05:09
 * @Description:
 */
import { ExtractPropTypes, PropType } from "vue";

// interface FieldName {
//   label?: string;
//   value?: string;
//   children?: string;
// }

export const selectProps = {
  label: String,
  name: String,
  rules: {
    type: Array,
    default: [],
  },
  value: [String, Array, Number],
  defaultValue: [String, Array, Number],
  dictType: String,
  //ga 公安 行政区分
  dataType: {
    type: String,
    default: ''
  },
  fieldNames: {
    type: Object as any,
    default: {
      label: "text",
      value: "value",
      children: "children",
    },
  },
  //最小级别（6区县/9镇街/12村社/15网格）
  minLevel: {
    type: Number,
    default: 12,
  },
  readonly: Boolean,
  disabled: Boolean,
  require: Boolean,
  //要求最小级别（6区县/9镇街/12村社/15网格）
  requireLevel: {
    type: Number,
    default: 0,
  },
  //显示根辖区
  root: {
    type: Boolean,
    default: true,
  },
  //行政区划简称
  abbr: {
    type: Boolean,
    default: true,
  },
  //根据类型过滤，用户能查询的数据，默认位查询过滤码，其他可选（szbm, cxglm）
  glmType: {
    type: [String, Boolean],
    default: "cxglm",
  },
  //是否在onchange返回全称
  fullName:{
    type:Boolean,
    default:true
  }
};

export type SelectProps = ExtractPropTypes<typeof selectProps>;

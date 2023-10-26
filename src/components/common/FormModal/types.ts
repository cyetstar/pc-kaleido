/*
 * @Author: gongxiaofei
 * @Date: 2022-12-13 14:15:49
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-10-08 10:14:52
 * @Description:
 */
import { ExtractPropTypes, PropType } from "vue";
import type { FormLayout } from "ant-design-vue/lib/form/Form";
import type { FormLabelAlign } from "ant-design-vue/lib/form/interface";
const LabelAligns = ["left", "right"];
const Layouts = ["horizontal", "vertical", "inline"];

export const formModalProps = {
  closable: Boolean,
  wrapClassName: String,
  confirmLoading: Boolean,
  bodyStyle: Object,
  centered: Boolean,
  destroyOnClose: Boolean,
  mask: {
    type: Boolean,
    default: true
  },
  okText: {
    type: String,
    default: "保存",
  },
  cancelText: {
    type: String,
    default: "关闭",
  },
  title: String,
  width: [String, Number],
  form: {
    type: Object,
    default: {},
  },
  name: String,
  labelAlign: {
    type: String as PropType<FormLabelAlign>,
    default: "right",
    validator(value: string) {
      return LabelAligns.includes(value);
    },
  },
  layout: {
    type: String as PropType<FormLayout>,
    default: "horizontal",
    validator(value: string) {
      return Layouts.includes(value);
    },
  },
  labelCol: Object,
  wrapperCol: Object,
  hideAfterSubmit: Boolean,
};

export type FormModalProps = ExtractPropTypes<typeof formModalProps>;

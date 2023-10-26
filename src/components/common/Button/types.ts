/*
 * @Author: gongxiaofei
 * @Date: 2022-12-05 11:02:39
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-01-10 09:08:36
 * @Description:
 */
import { ExtractPropTypes, PropType } from "vue";
import type { ButtonShape, ButtonSize } from "ant-design-vue/lib/button";

export const ButtonType = [
  "default",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
];
export const ButtonSizes = ["large", "middle", "small"];
export const ButtonShapes = ["default", "circle", "round"];

export const buttonProps = {
  type: {
    type: String,
    default: "default",
    validator(value: string) {
      return ButtonType.includes(value);
    },
  },
  plain: Boolean,
  link: Boolean,
  disabled: Boolean,
  loading: Boolean,
  shape: {
    type: String as PropType<ButtonShape>,
    default: "default",
    validator(value: string) {
      return ButtonShapes.includes(value);
    },
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: "middle",
    validator(value: string) {
      return ButtonSizes.includes(value);
    },
  },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

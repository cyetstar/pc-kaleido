import { ExtractPropTypes, PropType } from "vue";

const pickerType = ["default", "range"]
export const datePickerProps = {
  type: String,
  default: "default",
  validator(value: string) {
    return pickerType.includes(value);
  },
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;
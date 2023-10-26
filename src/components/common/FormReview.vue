<!--
 * @Author: gongxiaofei
 * @Date: 2022-11-16 10:14:48
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-11-17 10:09:55
 * @Description: 
-->
<template>
  <div class="bg-[#FFF] flex border rounded-5px">
    <div class="flex-1 max-h-700px overflow-y-auto">
      <formFields
        :fieldList="fieldList"
        :selectId="selectId"
        :formConfig="formConfig"
        @selectWidget="selectWidget"
      ></formFields>
    </div>
    <div
      class="ml-20px w-300px max-h-700px overflow-y-auto right"
      v-if="fieldConfig.id"
    >
      <fieldsOptions
        :designer="defineDesignerConfig"
        :fieldConfig="fieldConfig"
      ></fieldsOptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import formFields from "@/components/formReview/formFields.vue";
import fieldsOptions from "@/components/formReview/fieldsOptions.vue";
import defineDesignerConfig from "@/config/design";

const props = defineProps({
  formFieldList: {
    type: Array,
    default: [],
  },
  formConfig: {
    type: Object,
    default: () => {},
  },
});

const fieldList = ref<any>([...props.formFieldList]);
let fieldConfig = ref<any>({});
const selectWidget = (selectedField: any) => {
  fieldConfig.value = selectedField;
  selectId.value = selectedField.id;
};
let selectId = ref<string>("");
onMounted(() => {
  selectId.value = fieldList.value[0].id;
  fieldConfig.value = fieldList.value[0];
});
</script>

<style lang="less" scoped>
.right {
  border-left: 1px solid rgb(229, 231, 235);
}
</style>

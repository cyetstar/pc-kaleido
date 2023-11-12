<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 15:19:06
 * @Description: 系统配置表表单页面
-->
<template>
  <section class="h-page-section" ref="appManagePage">
    <a-form
      ref="formRef"
      :label-col="{ span: 4 }"
      width="600px"
      v-model:form="form"
      title="系统配置表"
      @submit="submit"
    >
      <h-col :span="24">
        <h-input
          label="配置名称"
          v-model:value="form.configName"
          name="configName"
        />
      </h-col>
      <h-col :span="24">
        <h-input
          label="配置键名"
          v-model:value="form.configKey"
          name="configKey"
        />
      </h-col>
      <h-col :span="24">
        <h-input
          label="配置键值"
          v-model:value="form.configValue"
          name="configValue"
        />
      </h-col>
      <h-col :span="24">
        <h-select
          label="是否已删除1：已删除，0：未删除"
          dict-type="isDeleted"
          v-model:value="form.isDeleted"
          name="isDeleted"
        />
      </h-col>
      <h-col :span="24">
        <h-select
          label="创建时间"
          dict-type="createTime"
          v-model:value="form.createTime"
          name="createTime"
        />
      </h-col>
      <h-col :span="24">
        <h-select
          label="更新时间"
          dict-type="updateTime"
          v-model:value="form.updateTime"
          name="updateTime"
        />
      </h-col>
      <h-col :span="24">
        <h-input
          label="创建人"
          v-model:value="form.createdBy"
          name="createdBy"
        />
      </h-col>
      <h-col :span="24">
        <h-input
          label="更新人"
          v-model:value="form.updatedBy"
          name="updatedBy"
        />
      </h-col>
    </a-form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";

const emits = defineEmits(["save-complete"]);

let formAction = ref("create");

let formRef = ref();

let form = ref({
  id: "",
  configName: "",
  configKey: "",
  configValue: "",
  isDeleted: "",
  createTime: "",
  updateTime: "",
  createdBy: "",
  updatedBy: "",
});

const create = () => {
  formAction.value = "create";
  formRef.value.reset();
  formRef.value.show();
};

const update = async (id) => {
  formAction.value = "update";
  formRef.value.reset();
  form.value = await sysConfigViewApi({ id });
  formRef.value.show();
};

const submit = async () => {
  try {
    if (formAction.value === "create") {
      let res = await sysConfigCreateApi(form.value);
      if (res) {
        message.success("操作成功");
        emits("save-complete");
        formRef.value.hide();
      }
    } else if (formAction.value === "update") {
      let res = await sysConfigUpdateApi(form.value);
      if (res) {
        message.success("操作成功");
        emits("save-complete");
        formRef.value.hide();
      }
    }
  } catch (e) {}
};

defineExpose({
  create,
  update,
});
</script>

<style lang="less" scoped></style>

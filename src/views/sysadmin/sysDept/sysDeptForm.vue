<!--
 * @Author: xiadawei
 * @Date: 2023-10-14 12:08:49
 * @Description: 部门表表单页面
-->
<template>
  <h-form-modal
    ref="formRef"
    :label-col="{ span: 4 }"
    width="600px"
    v-model:form="form"
    title="部门表"
    @submit="submit"
  >
    <h-col :span="24">
      <h-input label="部门编码" v-model:value="form.deptCode" name="deptCode" />
    </h-col>
    <h-col :span="24">
      <h-input
        label="父部门编码"
        v-model:value="form.parentCode"
        name="parentCode"
      />
    </h-col>
    <h-col :span="24">
      <h-select
        label="父部门id"
        dict-type="parentId"
        v-model:value="form.parentId"
        name="parentId"
      />
    </h-col>
    <h-col :span="24">
      <h-input label="部门名称" v-model:value="form.deptName" name="deptName" />
    </h-col>
    <h-col :span="24">
      <h-input label="负责人" v-model:value="form.leader" name="leader" />
    </h-col>
    <h-col :span="24">
      <h-input label="联系电话" v-model:value="form.phone" name="phone" />
    </h-col>
    <h-col :span="24">
      <h-input label="邮箱" v-model:value="form.email" name="email" />
    </h-col>
    <h-col :span="24">
      <h-select
        label="顺序号"
        dict-type="orderNum"
        v-model:value="form.orderNum"
        name="orderNum"
      />
    </h-col>
    <h-col :span="24">
      <h-select
        label="子节点数"
        dict-type="subCount"
        v-model:value="form.subCount"
        name="subCount"
      />
    </h-col>
    <h-col :span="24">
      <h-select
        label="是否启用"
        dict-type="isEnabled"
        v-model:value="form.isEnabled"
        name="isEnabled"
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
      <h-input label="创建人" v-model:value="form.createdBy" name="createdBy" />
    </h-col>
    <h-col :span="24">
      <h-input label="更新人" v-model:value="form.updatedBy" name="updatedBy" />
    </h-col>
    <h-col :span="24">
      <h-input label="" v-model:value="form.ancestors" name="ancestors" />
    </h-col>
  </h-form-modal>
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import {
  sysDeptViewApi,
  sysDeptCreateApi,
  sysDeptUpdateApi,
} from "@/api/sysadmin/sysDeptApi";

const emits = defineEmits(["save-complete"]);

let formAction = ref("create");

let formRef = ref();

let form = ref({
  id: "",
  deptCode: "",
  parentCode: "",
  parentId: "",
  deptName: "",
  leader: "",
  phone: "",
  email: "",
  orderNum: "",
  subCount: "",
  isEnabled: "",
  isDeleted: "",
  createTime: "",
  updateTime: "",
  createdBy: "",
  updatedBy: "",
  ancestors: "",
});

const create = () => {
  formAction.value = "create";
  formRef.value.reset();
  formRef.value.show();
};

const update = async (id) => {
  formAction.value = "update";
  formRef.value.reset();
  form.value = await sysDeptViewApi({ id });
  formRef.value.show();
};

const submit = async () => {
  try {
    if (formAction.value === "create") {
      let res = await sysDeptCreateApi(form.value);
      if (res) {
        message.success("操作成功");
        emits("save-complete");
        formRef.value.hide();
      }
    } else if (formAction.value === "update") {
      let res = await sysDeptUpdateApi(form.value);
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

<!--
 * @Author: xiadawei
 * @Date: 2023-11-11 21:13:09
 * @Description: 发行品表单页面
-->
<template>
  <h-form-modal
    ref="formRef"
    :label-col="{ span: 4 }"
    width="600px"
    v-model:form="form"
    title="发行品"
    @submit="submit"
  >
    <h-col :span="24">
      <h-input
        label="MusicBrainzId"
        v-model:value="form.musicbrainzId"
        name="musicbrainzId"
      />
    </h-col>
    <h-col :span="24">
      <h-input label="Plex编号" v-model:value="form.plexId" name="plexId" />
    </h-col>
    <h-col :span="24">
      <h-input label="标题" v-model:value="form.bt" name="bt" />
    </h-col>
    <h-col :span="24">
      <h-input label="艺术家" v-model:value="form.ysj" name="ysj" />
    </h-col>
    <h-col :span="24">
      <h-input label="专辑类型" v-model:value="form.zjlx" name="zjlx" />
    </h-col>
    <h-col :span="24">
      <h-input label="音乐流派" v-model:value="form.yylp" name="yylp" />
    </h-col>
    <h-col :span="24">
      <h-input label="发行国家" v-model:value="form.fxgj" name="fxgj" />
    </h-col>
    <h-col :span="24">
      <h-select-datetime label="日期" v-model:value="form.rq" name="rq" />
    </h-col>
    <h-col :span="24">
      <h-input label="唱片公司" v-model:value="form.cpgs" name="cpgs" />
    </h-col>
    <h-col :span="24">
      <h-select-datetime
        label="首发日期"
        v-model:value="form.sfrq"
        name="sfrq"
      />
    </h-col>
    <h-col :span="24">
      <h-select
        label="碟数"
        dict-type="zds"
        v-model:value="form.zds"
        name="zds"
      />
    </h-col>
    <h-col :span="24">
      <h-select
        label="音轨数"
        dict-type="ygs"
        v-model:value="form.ygs"
        name="ygs"
      />
    </h-col>
    <h-col :span="24">
      <h-select label="媒体" dict-type="mt" v-model:value="form.mt" name="mt" />
    </h-col>
    <h-col :span="24">
      <h-select
        label="是否缺损"
        dict-type="sfqs"
        v-model:value="form.sfqs"
        name="sfqs"
      />
    </h-col>
    <h-col :span="24">
      <h-input label="文件路径" v-model:value="form.wjlj" name="wjlj" />
    </h-col>
    <h-col :span="24">
      <h-select-datetime
        label="创建时间"
        type="datetime"
        v-model:value="form.cjsj"
        name="cjsj"
      />
    </h-col>
    <h-col :span="24">
      <h-select-datetime
        label="修改时间"
        type="datetime"
        v-model:value="form.xgsj"
        name="xgsj"
      />
    </h-col>
  </h-form-modal>
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import {
  musicReleaseViewApi,
  musicReleaseCreateApi,
  musicReleaseUpdateApi,
} from "@/api/music/musicReleaseApi.ts";

const emits = defineEmits(["save-complete"]);

let formAction = ref("create");

let formRef = ref();

let form = ref({
  id: "",
  musicbrainzId: "",
  plexId: "",
  bt: "",
  ysj: "",
  zjlx: "",
  yylp: "",
  fxgj: "",
  rq: "",
  cpgs: "",
  sfrq: "",
  zds: "",
  ygs: "",
  mt: "",
  sfqs: "",
  wjlj: "",
  cjsj: "",
  xgsj: "",
});

const create = () => {
  formAction.value = "create";
  formRef.value.reset();
  formRef.value.show();
};

const update = async (id) => {
  formAction.value = "update";
  formRef.value.reset();
  form.value = await musicReleaseViewApi({ id });
  formRef.value.show();
};

const submit = async () => {
  try {
    if (formAction.value === "create") {
      let res = await musicReleaseCreateApi(form.value);
      if (res) {
        message.success("操作成功");
        emits("save-complete");
        formRef.value.hide();
      }
    } else if (formAction.value === "update") {
      let res = await musicReleaseUpdateApi(form.value);
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

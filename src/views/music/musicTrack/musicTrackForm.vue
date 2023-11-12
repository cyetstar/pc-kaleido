<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 00:14:19
 * @Description: 曲目表单页面
-->
<template>
    <h-form-modal ref="formRef" :label-col="{ span: 4 }" width="600px" v-model:form="form" title="曲目"
                  @submit="submit">
                <h-col :span="24">
                        <h-select label="发行品id" dict-type="releaseId"
                                  v-model:value="form.releaseId" name="releaseId"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="MusicBrainzId" v-model:value="form.musicbrainzId"
                                 name="musicbrainzId"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="Plex编号" v-model:value="form.plexId"
                                 name="plexId"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="标题" v-model:value="form.bt"
                                 name="bt"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="艺术家" v-model:value="form.ysj"
                                 name="ysj"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="长度" v-model:value="form.cd"
                                 name="cd"/>
                </h-col>
                <h-col :span="24">
                        <h-select label="曲号" dict-type="qh"
                                  v-model:value="form.qh" name="qh"/>
                </h-col>
                <h-col :span="24">
                        <h-select label="碟号" dict-type="dh"
                                  v-model:value="form.dh" name="dh"/>
                </h-col>
                <h-col :span="24">
                        <h-select label="文件格式" dict-type="wjgs"
                                  v-model:value="form.wjgs" name="wjgs"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="文件路径" v-model:value="form.wjlj"
                                 name="wjlj"/>
                </h-col>
                <h-col :span="24">
                        <h-select label="是否有歌词" dict-type="sfygc"
                                  v-model:value="form.sfygc" name="sfygc"/>
                </h-col>
                <h-col :span="24">
                        <h-select label="是否缺损" dict-type="sfqs"
                                  v-model:value="form.sfqs" name="sfqs"/>
                </h-col>
                <h-col :span="24">
                        <h-select-datetime label="创建时间" type="datetime"
                                           v-model:value="form.cjsj" name="cjsj"/>
                </h-col>
                <h-col :span="24">
                        <h-select-datetime label="修改时间" type="datetime"
                                           v-model:value="form.xgsj" name="xgsj"/>
                </h-col>
    </h-form-modal>
</template>

<script setup>
  import {ref} from "vue";
  import {message} from "ant-design-vue";

  const emits = defineEmits(["save-complete"]);

    let formAction = ref("create");

    let formRef = ref();

    let form = ref({
        id: "",
        releaseId: "",
        musicbrainzId: "",
        plexId: "",
        bt: "",
        ysj: "",
        cd: "",
        qh: "",
        dh: "",
        wjgs: "",
        wjlj: "",
        sfygc: "",
        sfqs: "",
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
        form.value = await musicTrackViewApi({id});
        formRef.value.show();
    };

    const submit = async () => {
        try {
            if (formAction.value === "create") {
                let res = await musicTrackCreateApi(form.value);
                if (res) {
                    message.success("操作成功");
                    emits("save-complete");
                    formRef.value.hide();
                }
            } else if (formAction.value === "update") {
                let res = await musicTrackUpdateApi(form.value);
                if (res) {
                    message.success("操作成功");
                    emits("save-complete");
                    formRef.value.hide();
                }
            }
        } catch (e) {
        }
    };

    defineExpose({
        create,
        update,
    });
</script>

<style lang="less" scoped></style>

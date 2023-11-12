<!--
 * @Author: xiadawei
 * @Date: 2023-11-12 00:14:19
 * @Description: 艺术家表单页面
-->
<template>
    <h-form-modal ref="formRef" :label-col="{ span: 4 }" width="600px" v-model:form="form" title="艺术家"
                  @submit="submit">
                <h-col :span="24">
                        <h-input label="MusicBrainzId" v-model:value="form.musicbrainzId"
                                 name="musicbrainzId"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="Plex编号" v-model:value="form.plexId"
                                 name="plexId"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="名称" v-model:value="form.mc"
                                 name="mc"/>
                </h-col>
                <h-col :span="24">
                        <h-select label="艺术家类型" dict-type="ysjlx"
                                  v-model:value="form.ysjlx" name="ysjlx"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="国家地区" v-model:value="form.gjdq"
                                 name="gjdq"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="简介" v-model:value="form.jj"
                                 name="jj"/>
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
        musicbrainzId: "",
        plexId: "",
        mc: "",
        ysjlx: "",
        gjdq: "",
        jj: "",
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
        form.value = await musicArtistViewApi({id});
        formRef.value.show();
    };

    const submit = async () => {
        try {
            if (formAction.value === "create") {
                let res = await musicArtistCreateApi(form.value);
                if (res) {
                    message.success("操作成功");
                    emits("save-complete");
                    formRef.value.hide();
                }
            } else if (formAction.value === "update") {
                let res = await musicArtistUpdateApi(form.value);
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

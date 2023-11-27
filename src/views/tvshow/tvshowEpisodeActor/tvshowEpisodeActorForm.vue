<!--
 * @Author: cyetstar
 * @Date: 2023-11-28 01:40:40
 * @Description: 单集演职员关联表表单页面
-->
<template>
    <h-form-modal ref="formRef" :label-col="{ span: 4 }" width="600px" v-model:form="form" title="单集演职员关联表"
                  @submit="onSubmit">
                <h-col :span="24">
                        <h-input label="单集id" v-model:value="form.episodeId"
                                 name="episodeId"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="演职员id" v-model:value="form.actorId"
                                 name="actorId"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="角色" v-model:value="form.role"
                                 name="role"/>
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
        episodeId: "",
        actorId: "",
        role: "",
    });

    const create = () => {
        formAction.value = "create";
        formRef.value.reset();
        formRef.value.show();
    };

    const update = async (id) => {
        formAction.value = "update";
        formRef.value.reset();
        form.value = await apiTvshowEpisodeActorView({id});
        formRef.value.show();
    };

    const onSubmit = async () => {
        try {
            if (formAction.value === "create") {
                let res = await apiTvshowEpisodeActorCreate(form.value);
                if (res) {
                    message.success("操作成功");
                    emits("save-complete");
                    formRef.value.hide();
                }
            } else if (formAction.value === "update") {
                let res = await apiTvshowEpisodeActorUpdate(form.value);
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

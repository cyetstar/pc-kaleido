<!--
 * @Author: cyetstar
 * @Date: 2024-03-12 17:49:02
 * @Description: 漫画系列表单页面
-->
<template>
    <h-form-modal ref="formRef" :label-col="{ span: 4 }" width="600px" v-model:form="form" title="漫画系列"
                  @submit="onSubmit">
                <h-col :span="24">
                        <h-input label="标题" v-model:value="form.title"
                                 name="title"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="简介" v-model:value="form.summary"
                                 name="summary"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="出版社" v-model:value="form.publisher"
                                 name="publisher"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="卷数" v-model:value="form.bookCount"
                                 name="bookCount"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="评分" v-model:value="form.rating"
                                 name="rating"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="状态" v-model:value="form.status"
                                 name="status"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="路径" v-model:value="form.path"
                                 name="path"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="封面" v-model:value="form.cover"
                                 name="cover"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="番组计划编号" v-model:value="form.bgmId"
                                 name="bgmId"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="加入时间" v-model:value="form.addedAt"
                                 name="addedAt"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="更新时间" v-model:value="form.updatedAt"
                                 name="updatedAt"/>
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
        title: "",
        summary: "",
        publisher: "",
        bookCount: "",
        rating: "",
        status: "",
        path: "",
        cover: "",
        bgmId: "",
        addedAt: "",
        updatedAt: "",
    });

    const create = () => {
        formAction.value = "create";
        formRef.value.reset();
        formRef.value.show();
    };

    const update = async (id) => {
        formAction.value = "update";
        formRef.value.reset();
        form.value = await apiComicSeriesView({id});
        formRef.value.show();
    };

    const onSubmit = async () => {
        try {
            if (formAction.value === "create") {
                let res = await apiComicSeriesCreate(form.value);
                if (res) {
                    message.success("操作成功");
                    emits("save-complete");
                    formRef.value.hide();
                }
            } else if (formAction.value === "update") {
                let res = await apiComicSeriesUpdate(form.value);
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

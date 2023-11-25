<!--
 * @Author: cyetstar
 * @Date: 2023-11-26 01:20:15
 * @Description: 电影表单页面
-->
<template>
    <h-form-modal ref="formRef" :label-col="{ span: 4 }" width="600px" v-model:form="form" title="电影"
                  @submit="onSubmit">
                <h-col :span="24">
                        <h-input label="电影名" v-model:value="form.title"
                                 name="title"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="原片名" v-model:value="form.originalTitle"
                                 name="originalTitle"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="排序名" v-model:value="form.titleSort"
                                 name="titleSort"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="首映年份" v-model:value="form.year"
                                 name="year"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="海报" v-model:value="form.thumb"
                                 name="thumb"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="艺术图" v-model:value="form.art"
                                 name="art"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="用户评分" v-model:value="form.userRating"
                                 name="userRating"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="简介" v-model:value="form.summary"
                                 name="summary"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="片长(秒)" v-model:value="form.duration"
                                 name="duration"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="电影评级" v-model:value="form.contentRating"
                                 name="contentRating"/>
                </h-col>
                <h-col :span="24">
                        <h-select-datetime label="首映日期"
                                           v-model:value="form.originallyAvailableAt" name="originallyAvailableAt"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="电影公司" v-model:value="form.studio"
                                 name="studio"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="评分" v-model:value="form.rating"
                                 name="rating"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="观看时间" v-model:value="form.lastViewedAt"
                                 name="lastViewedAt"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="观看次数" v-model:value="form.viewCount"
                                 name="viewCount"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="IMDb编号" v-model:value="form.imdb"
                                 name="imdb"/>
                </h-col>
                <h-col :span="24">
                        <h-input label="豆瓣编号" v-model:value="form.doubanId"
                                 name="doubanId"/>
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
        originalTitle: "",
        titleSort: "",
        year: "",
        thumb: "",
        art: "",
        userRating: "",
        summary: "",
        duration: "",
        contentRating: "",
        originallyAvailableAt: "",
        studio: "",
        rating: "",
        lastViewedAt: "",
        viewCount: "",
        imdb: "",
        doubanId: "",
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
        form.value = await apiMovieBasicView({id});
        formRef.value.show();
    };

    const onSubmit = async () => {
        try {
            if (formAction.value === "create") {
                let res = await apiMovieBasicCreate(form.value);
                if (res) {
                    message.success("操作成功");
                    emits("save-complete");
                    formRef.value.hide();
                }
            } else if (formAction.value === "update") {
                let res = await apiMovieBasicUpdate(form.value);
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

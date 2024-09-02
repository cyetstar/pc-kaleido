<!--
 * @Author: cyetstar
 * @Date: 2024-03-12 17:49:02
 * @Description: 漫画系列表单页面
-->
<template>
  <h-form-modal
    ref="formRef"
    :label-col="{ span: 4 }"
    width="1000px"
    v-model:form="form"
    title="漫画系列"
    @submit="onSubmit"
  >
    <a-col :span="24">
      <a-tabs v-model:activeKey="activeKey" tab-position="left">
        <a-tab-pane key="basic" tab="基本">
          <h-col :span="24">
            <h-input label="标题" v-model:value="form.title" name="title" />
          </h-col>
          <h-col :span="24">
            <h-input
              label="原标题"
              v-model:value="form.originalTitle"
              name="originalTitle"
            />
          </h-col>
          <h-col :span="24">
            <h-input
              label="简介"
              text-area
              rows="4"
              v-model:value="form.summary"
              name="summary"
            />
          </h-col>
          <h-col :span="24">
            <h-input
              label="出版社"
              v-model:value="form.publisher"
              name="publisher"
            />
          </h-col>
          <h-col :span="24">
            <h-input
              label="卷数"
              v-model:value="form.bookCount"
              name="bookCount"
            />
          </h-col>
          <h-col :span="24">
            <h-input label="评分" v-model:value="form.rating" name="rating" />
          </h-col>
          <h-col :span="24">
            <h-radio
              label="状态"
              v-model:value="form.status"
              dict-type="comic.series.status"
              name="status"
            />
          </h-col>
          <h-col :span="24">
            <h-input
              label="番组计划编号"
              v-model:value="form.bgmId"
              name="bgmId"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="authors" tab="作者">
          <h-col :span="24">
            <k-select-author
              v-model:value="form.writerIdList"
              name="writerIdList"
              label="作者"
            />
          </h-col>
          <h-col :span="24">
            <k-select-author
              v-model:value="form.pencillerIdList"
              name="pencillerIdList"
              label="作画"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="tags" tab="标签">
          <h-col :span="24">
            <h-select
              mode="tags"
              label="标签"
              v-model:value="form.tagList"
              name="tagList"
            />
          </h-col>
        </a-tab-pane>
        <a-tab-pane key="akas" tab="别名">
          <h-col :span="24">
            <template
              :key="i"
              v-for="(alternateTitle, i) in form.alternateTitleList"
            >
              <h-input
                label="别名"
                v-model:value="form.alternateTitleList[i]"
                :name="'alternateTitle' + i"
                search
                @search="onEnterButton(i)"
                :allowClear="false"
              >
                <template #enterButton>
                  <PlusOutlined v-if="i === 0" />
                  <MinusOutlined v-else />
                </template>
              </h-input>
            </template>
          </h-col>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </h-form-modal>
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import {
  apiComicSeriesCreate,
  apiComicSeriesUpdate,
  apiComicSeriesView,
} from "@/api/comic/comicSeriesApi";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";

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
  bgmId: "",
});

let activeKey = ref("basic");
let authorOptions = ref([]);

const create = () => {
  formAction.value = "create";
  formRef.value.reset();
  formRef.value.show();
};

const update = async (id) => {
  formAction.value = "update";
  formRef.value.reset();
  form.value = await apiComicSeriesView({ id });
  if (form.value.writerList.length > 0) {
    form.value.writerIdList = form.value.writerList.map((s) => s.id);
  }
  if (form.value.pencillerList.length > 0) {
    form.value.pencillerIdList = form.value.pencillerList.map((s) => s.id);
  }
  if (form.value.alternateTitleList.length === 0) {
    form.value.alternateTitleList.push("");
  }
  formRef.value.show();
};

const onEnterButton = (i) => {
  if (i === 0) {
    form.value.alternateTitleList.push("");
  } else {
    form.value.alternateTitleList.splice(i, 1);
  }
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
      form.value.alternateTitleList = form.value.alternateTitleList.filter(
        (s) => s !== ""
      );
      let res = await apiComicSeriesUpdate(form.value);
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

<style lang="less" scoped>
/deep/ .ant-input-search-button {
  background: #fff;
  border: 1px solid #d9d9d9;
  color: #00000072;
  padding: 4px 10px;
}
</style>

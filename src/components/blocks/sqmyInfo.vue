<!--
 * @Author: gongxiaofei
 * @Date: 2023-10-17 11:06:30
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-19 17:57:40
 * @Description: 社情民意基础信息
-->
<template>
  <section class="sqmy-base-info">
    <module-title title="处理进度"></module-title>
    <step-line :active="baseInfo.jd"></step-line>
    <module-title title="社区民意信息"></module-title>
    <a-row class="mt-20px">
      <h-col :span="8">
        <span>社情民意编号：</span>
        <span>{{ baseInfo.sqmybh }}</span>
      </h-col>
      <h-col :span="8">
        <span>当前状态：</span>
        <span>{{ baseInfo.dqztLabel }}</span>
      </h-col>
      <h-col :span="8">
        <span>社情民意标签：</span>
        <span>{{ baseInfo.sqmybqLabel }}</span>
      </h-col>
      <h-col :span="8">
        <span>来源渠道：</span>
        <span>{{ baseInfo.lyqdLabel }}</span>
      </h-col>
      <h-col :span="8">
        <span>投诉人：</span>
        <span>{{ baseInfo.tsr }}</span>
      </h-col>
      <h-col :span="8">
        <span>投诉电话：</span>
        <span>{{ baseInfo.tsdh }}</span>
      </h-col>
      <h-col :span="8">
        <span>上报时间：</span>
        <span>{{ baseInfo.sbsj }}</span>
      </h-col>
      <h-col :span="16">
        <span>社要求办结时间：</span>
        <span>{{ baseInfo.yqbjsj }}</span>
      </h-col>
      <h-col :span="24">
        <span>事件发生地址：</span>
        <span>{{ baseInfo.sjfsdz }}</span>
      </h-col>
      <h-col :span="24">
        <span>社情民意内容：</span>
        <span>{{ baseInfo.sqmynr }}</span>
      </h-col>
    </a-row>
    <module-title class="mt-20px" title="社区民意追踪"></module-title>
    <a-table class="mt-20px" :data-source="jdInfo" :pagination="false">
      <a-table-column
        title="操作类型"
        data-index="czlx"
        align="center"
      ></a-table-column>
      <a-table-column
        title="操作人"
        data-index="czr"
        align="center"
      ></a-table-column>
      <a-table-column
        title="执行结果"
        data-index="zxjgLabel"
        align="center"
      ></a-table-column>
      <a-table-column
        title="操作时间"
        data-index="czsj"
        align="center"
      ></a-table-column>
      <a-table-column
        title="说明"
        data-index="sm"
        align="center"
      ></a-table-column>
    </a-table>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import ModuleTitle from "@/components/ModuleTitle.vue";
import stepLine from "@/components/blocks/stepLine.vue";

const props = defineProps({
  baseInfo: {
    type: Object,
    default: () => {},
  },
  jdInfo: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="less" scoped></style>

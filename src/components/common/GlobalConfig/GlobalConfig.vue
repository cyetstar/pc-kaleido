<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-05 10:59:16
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-04-17 13:52:54
 * @Description: 基础button组件
-->
<template>
  <slot></slot>
</template>

<script lang="ts">
import { provide, defineComponent } from "vue";

export default defineComponent({
  name: "HGlobalConfig",
  props: {
    listDictByType: Function,
    listSsxq: Function,
    thumbSize: {
      type: String,
      default: "medium",
    },
    fileUrl: {
      type: String,
      default: "/file/",
    },
    plexUrl: {
      type: String,
      default: "http://127.0.0.1:32400",
    },
    plexToken: String,
  },
  setup(props, context) {
    provide("listDictByType", props.listDictByType);
    provide("listSsxq", props.listSsxq);
    provide("fileUrl", props.fileUrl);
    provide("thumbSize", props.thumbSize);
    provide("plexUrl", props.plexUrl);
    provide("plexToken", props.plexToken);
  },
});
</script>

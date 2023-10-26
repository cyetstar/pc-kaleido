<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-06 16:51:10
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-12-07 09:24:23
 * @Description: 编辑功能button组件
-->
<template>
  <h-button @click="handleClick">
    <template v-if="$slots.icon" #icon>
      <slot name="icon"></slot>
    </template>
    <span>{{ btnText }}</span>
  </h-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HButton from "../Button";

export default defineComponent({
  name: "HButtonUpdate",
  components: { HButton },
  props: {
    btnText: {
      type: String,
      default: "编辑",
    },
  },
  emits: ["update"],
  setup(props, context) {
    const handleClick = ($event: Event) => {
      context.emit("update", $event);
    };

    return {
      handleClick,
    };
  },
});
</script>

<style lang="less" scoped></style>

<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-05 10:59:16
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-04-17 13:52:54
 * @Description: 基础button组件
-->
<template>
  <a-button
    :size="size"
    :loading="loading"
    :class="btnClass"
    @click="handleClick"
  >
    <template v-if="$slots.icon || link" #icon>
      <slot name="icon"></slot>
    </template>
    <slot></slot>
  </a-button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Button } from "ant-design-vue";
import { buttonProps } from "./types";

export default defineComponent({
  name: "HButton",
  props: buttonProps,
  components: {
    AButton: Button,
  },
  emits: ["click"],
  setup(props, context) {
    const btnClass = computed(() => {
      let { plain, link, type, disabled } = props;
      return [
        `hta-btn-${plain ? "outline-" : ""}${type}`,
        link ? `is-link` : "",
        disabled ? `is-disabled` : "",
      ];
    });

    const handleClick = ($event: Event) => {
      if (props.loading || props.disabled) return;
      context.emit("click", $event);
    };

    return {
      btnClass,
      handleClick,
    };
  },
});
</script>

<style lang="less" scoped>
.ant-btn {
  display: flex !important;
  align-items: center;
}
@import "../styles/button";
</style>

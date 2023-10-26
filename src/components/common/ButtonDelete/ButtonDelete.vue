<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-06 17:23:55
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-12-07 09:24:27
 * @Description: 删除功能button组件
-->
<template>
  <div>
    <a-popconfirm
      :title="title"
      :ok-text="okText"
      :cancel-text="cancelText"
      @confirm="handleConfirm"
    >
      <h-button type="danger" v-bind="$attrs">
        <template v-if="$slots.icon" #icon>
          <slot name="icon"></slot>
        </template>
        <span>{{ btnText }}</span>
      </h-button>
    </a-popconfirm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HButton from "../Button";
import { Popconfirm } from "ant-design-vue";

export default defineComponent({
  name: "HButtonDelete",
  props: {
    btnText: {
      type: String,
      default: "删除",
    },
    okText: {
      type: String,
      default: "是",
    },
    cancelText: {
      type: String,
      default: "否",
    },
    title: {
      type: String,
      default: "确定删除这条记录?",
    },
  },
  components: {
    HButton,
    APopconfirm: Popconfirm,
  },
  emits: ["delete"],
  setup(props, context) {
    const handleConfirm = ($event: Event) => {
      context.emit("delete", $event);
    };

    return {
      handleConfirm,
    };
  },
});
</script>

<style lang="less" scoped></style>

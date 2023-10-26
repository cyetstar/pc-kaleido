<!--
 * @Author: gongxiaofei
 * @Date: 2022-12-08 09:43:05
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-12-08 11:02:10
 * @Description: Col组件
-->
<template>
  <a-col :style="style">
    <slot></slot>
  </a-col>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Col } from "ant-design-vue";

export default defineComponent({
  name: "HCol",
  components: {
    ACol: Col,
  },
  props: {
    rightOffset: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    let style = computed(() => {
      let right = (100 / 24) * props.rightOffset + "%";

      return {
        marginRight: right,
      };
    });

    return {
      style,
    };
  },
});
</script>

<style lang="less" scoped>
.offset {
  margin-right: 150px;
}
</style>

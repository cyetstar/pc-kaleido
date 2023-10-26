<!--
 * @Author: gongxiaofei
 * @Date: 2023-10-19 00:15:11
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-19 17:58:13
 * @Description: 步骤条
-->
<template>
  <section class="steps-line-box">
    <ol class="steps">
      <li
        v-for="i in steps"
        :key="i.value"
        :class="[active === i.value ? 'active' : '']"
        :value="i.value"
      >
        {{ i.text }}
      </li>
    </ol>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";

const props = defineProps({
  active: {
    type: String,
    default: "1",
  },
});
const steps = [
  {
    text: "采集",
    value: "1",
  },
  {
    text: "交办",
    value: "2",
  },
  {
    text: "签收",
    value: "3",
  },
  {
    text: "办结",
    value: "4",
  },
  {
    text: "审核",
    value: "5",
  },
  {
    text: "回访",
    value: "6",
  },
  {
    text: "归档",
    value: "7",
  },
];
</script>

<style lang="less" scoped>
.steps {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 20px 10px;
  list-style: none;
  --normal-color: #333;
  --active-color: #389e0d;
}
.steps > li {
  color: var(--active-color);
}
.steps > li::before {
  content: attr(value);
  display: inline-block;
  width: 27px;
  height: 27px;
  line-height: 27px;
  margin-right: 13.5px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid;
  flex-shrink: 0;
  color: #fff;
  background-color: var(--active-color);
}
.steps > li {
  flex: auto;
  display: flex;
  align-items: center;
}
.steps > li:last-child {
  flex: none;
}
.steps > li:not(:last-child)::after {
  content: "";
  flex: 1;
  margin: 0 10px;
  border-bottom: 2.5px solid;
}
.steps > .active::before {
  color: #fff;
  background-color: var(--active-color);
  border-color: var(--active-color);
  transform: scale(1.2);
}
.steps > .active::after {
  color: #cccccc;
}
.steps > .active ~ li {
  color: var(--normal-color);
}
.steps > .active ~ li::after {
  color: #cccccc;
}
.steps > .active ~ li::before {
  color: var(--normal-color);
  border-color: #979797;
  background-color: #fff;
}
</style>

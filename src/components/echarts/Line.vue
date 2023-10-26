<!--
 * @Author: gongxiaofei
 * @Date: 2023-10-18 17:23:15
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-18 21:44:44
 * @Description: 折线图
-->
<template>
  <section class="line-box">
    <v-chart :option="opts" :style="styleObj" autoresize></v-chart>
  </section>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  styleObj: {
    type: Object,
    default: {
      width: "100%",
      height: "323px",
    },
  },
  data: {
    type: Array,
    default: [],
  },
});

const opts = ref({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        color: "#57617B",
      },
    },
    formatter: function (params) {
      const { axisValueLabel, data } = params[0];
      const obj = JSON.parse(axisValueLabel);
      const { title } = obj;
      return `<div style="color: rgba(0, 0, 0, 0.65); font-size: 14px">${data}件</div><div style="color: #999999">${title}</div>`;
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#F1F1F1",
        },
      },
      axisLabel: {
        fontSize: 12,
        color: "#999999",
        formatter: function (value) {
          const obj = JSON.parse(value);
          const { title, subTitle } = obj;
          let str = "";
          if (subTitle) {
            str = `${obj.title}\n{a|${obj.subTitle}}`;
          } else {
            str = `${obj.title}`;
          }
          return str;
        },
        rich: {
          a: {
            padding: [10, 0, 0, 0],
          },
        },
      },
      axisTick: {
        show: false,
      },
      data: [],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "件/单位",
      nameTextStyle: {
        color: "#999999",
        padding: [0, 0, 0, -10],
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#F1F1F1",
        },
      },
      axisLabel: {
        margin: 10,
        fontSize: 14,
        color: "#999999",
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 5,
      showSymbol: false,
      lineStyle: {
        width: 2,
        color: "#0043A1",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: "rgba(0, 140, 255, 1)",
            },
            {
              offset: 0.8,
              color: "rgba(0, 140, 255, .1)",
            },
          ],
          false
        ),
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowBlur: 10,
      },
      itemStyle: {
        color: "rgba(0, 140, 255, 1)",
        borderColor: "#0043A1",
        borderWidth: 2,
      },
      data: [],
    },
  ],
});

watch(
  () => props.data,
  (newData) => {
    const x = [];
    const y = [];
    const xLabel = [];
    newData.forEach((item) => {
      const { today, count, todayLabel } = item;
      let str = JSON.stringify({
        title: today,
        subTitle: todayLabel,
      });
      x.push(str);
      y.push(count);
    });
    opts.value.xAxis[0].data = x;
    opts.value.series[0].data = y;
  },
  {
    deep: true,
  }
);
</script>

<style lang="less" scoped></style>

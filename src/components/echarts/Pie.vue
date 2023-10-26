<!--
 * @Author: gongxiaofei
 * @Date: 2023-10-18 10:19:55
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-20 09:56:30
 * @Description: 饼图
-->
<template>
  <section class="pie-chart">
    <v-chart
      ref="CardRingRef"
      :option="option"
      :style="styleObj"
      theme="dark"
    ></v-chart>
    <div>{{ title }}</div>
  </section>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import up from "../../assets/icons/icon-up.png";
import down from "../../assets/icons/icon-down.png";

const props = defineProps({
  styleObj: {
    type: Object,
    default: () => ({
      width: "175px",
      height: "175px",
    }),
  },
  title: {
    type: String,
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  },
  value: {
    type: Number,
    default: 0,
  },
  subValue: {
    type: Number,
    default: 0,
  },
  colors: {
    type: Array,
    default: () => ["#17CA82", "#E1FCF1"],
  },
});

const option = ref({});
watch(
  () => props.value,
  (newVal) => {
    option.value = {
      backgroundColor: "transparent",
      title: {
        text: props.value,
        textStyle: {
          color: "#333333",
          fontSize: 28,
          fontFamily: "D-DIN-Bold",
        },
        left: "center",
        top: 55,
        subtext: `{a|${props.subTitle}}{b|}{c|${props.subValue}%}`,
        subtextStyle: {
          rich: {
            a: {
              color: "#666666",
              fontSize: 13,
            },
            b: {
              backgroundColor: {
                image: props.subValue < 0 ? down : up,
              },
              width: props.subValue === 0 ? 0 : 24,
              height: props.subValue === 0 ? 0 : 24,
            },
            c: {
              color:
                props.subValue === 0
                  ? "#333333"
                  : props.subValue < 0
                  ? "#EA0000"
                  : "#4DC897",
              fontSize: 20,
              fontFamily: "DIN-Alternate-Bold",
            },
          },
        },
      },
      angleAxis: {
        max: 100,
        clockwise: true,
        // 隐藏刻度线
        show: false,
        startAngle: 90,
      },
      radiusAxis: {
        type: "category",
        show: true,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      polar: [
        {
          center: ["50%", "50%"], //中心点位置
          radius: "170%", //图形大小
        },
      ],
      series: [
        {
          type: "bar",
          z: 10,
          data: props.subValue,
          showBackground: false,
          backgroundStyle: {
            color: "transparent",
            borderWidth: 10,
            width: 10,
          },
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 20,
          itemStyle: {
            opacity: 1,
            color: props.colors[0],
            shadowBlur: 5,
            shadowColor: "transparent",
          },
        },
        {
          type: "pie",
          name: "内层细圆环",
          radius: ["80%", "90%"],
          startAngle: 90,
          clockwise: true,
          itemStyle: {
            color: props.colors[1],
          },
          tooltip: {
            show: false,
          },
          label: {
            show: false,
          },
          data: [100],
        },
      ],
    };
  }
);
</script>

<style lang="less" scoped>
.pie-chart {
  text-align: center;
  color: #666;
  .px2vw(font-size, 19);
}
</style>

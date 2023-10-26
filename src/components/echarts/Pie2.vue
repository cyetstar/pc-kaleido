<!--
 * @Author: gongxiaofei
 * @Date: 2023-10-18 14:39:06
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-18 20:01:08
 * @Description: 饼图
-->
<template>
  <section class="pie2-box">
    <v-chart
      ref="yjlxRef"
      :option="options"
      :style="{ width: '100%', height: '211px' }"
    ></v-chart>
    <div class="legends-box">
      <div v-for="(item, index) in data?.children" class="legends-item">
        <span
          class="legend-round"
          :style="{ background: pieColor[index] }"
        ></span>
        <span style="color: #333; margin-left: 12px">
          {{ item.name }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";

const props = defineProps({
  legends: {
    type: Array,
    default: () => [],
  },
  pieColor: {
    type: Array,
    default: [],
  },
  data: {
    type: Object,
    default: () => {},
  },
});

const yjlxTotal = ref("200");
const options = ref({});

watch(
  () => props.data,
  (news) => {
    options.value = {
      backgroundColor: "transparent",
      color: props.pieColor,
      title: [
        {
          text: ["{value|" + news.children[0]?.total + "}", "{title|起}"].join(
            " "
          ),
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              value: {
                fontSize: 16,
                fontWeight: "500",
                color: "#333",
              },
              title: {
                fontSize: 14,
                fontWeight: "400",
                color: "#666",
              },
            },
          },
        },
      ],
      series: [
        {
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "50%"],
          itemStyle: {
            borderColor: "#FFF",
            borderWidth: 2,
          },
          label: {
            formatter: (params) => {
              return (
                "{name|" +
                params.name +
                "}\n{value|" +
                params.value +
                " 起 " +
                params.percent.toFixed() +
                "%}"
              );
            },
            rich: {
              name: {
                fontSize: 14,
                padding: [20, 0, 0, 4],
                color: "#333",
              },
              value: {
                fontSize: 14,
                fontWeight: "500",
                padding: [8, 0, 0, 4],
                color: "inherit",
              },
            },
          },
          labelLine: {
            length: 8,
            length2: 48,
            lineStyle: {
              type: "dashed",
            },
          },
          data: news.children,
        },
      ],
    };
  },
  {
    deep: true,
  }
);
</script>

<style lang="less" scoped>
.pie2-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .legends-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .px2vh(margin-top, 70);
    .px2vw(gap, 31);
    .legends-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  .legend-round {
    width: 8px;
    height: 8px;
    border-radius: 8px;
  }
}
</style>

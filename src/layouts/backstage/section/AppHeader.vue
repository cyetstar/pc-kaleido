<!--
 * @Author: gongxiaofei
 * @Date: 2022-06-23 09:42:25
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-10-12 14:24:30
 * @Description: 
-->
<template>
  <section id="header-bar">
    <div class="flex items-center">
      <div
        class="text-[var(--theme-color)] tracking-2px font-350 cursor-pointer title"
        @click="router.replace('/')"
      >
        {{ title }}
      </div>
      <div class="menu-box">
        <div
          :class="[
            'menu-item',
            activeMenu === i.name ? 'menu-item-active' : '',
          ]"
          v-for="i in menuRoute"
          :key="i.name"
          @click="onChangeMenu(i)"
        >
          {{ i.title }}
        </div>
      </div>
    </div>

    <aside class="flex items-center">
      <header-notice></header-notice>
      <header-user class="ml-12px"></header-user>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import headerNotice from "./HeaderNotice.vue";
import headerUser from "./HeaderUser.vue";
// import { menuRoute } from "@/router/routes/index";
import { useMenuStore } from "@/store/modules/menu";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  enterce: {},
});

const menuStore = useMenuStore();
const router = useRouter();
const menuRoute = computed(() => menuStore.$state.menus);
const activeMenu = computed(() => menuStore.$state.activeMenu);

const onChangeMenu = (route: any) => {
  const { name, children } = route;
  menuStore.setMenu(name, children);
  router.push(getPath(route));
};

const getPath = (route: any): string => {
  const { path, children } = route;
  if (path) {
    return path;
  } else {
    return getPath(children[0]);
  }
};
</script>

<style lang="less" scoped>
#header-bar {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px 0 44px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);

  .title {
    font-size: 30px;
    font-family: YouSheBiaoTiHei;
  }
}

.menu-box {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-left: 70px;
  height: 48px;

  .menu-item {
    min-width: 74px;
    text-align: center;
    height: 100%;
    line-height: 48px;
    cursor: pointer;
  }

  .menu-item-active {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      width: 72px;
      height: 4px;
      border-radius: 2px;
      left: 0;
      bottom: 0;
      background-color: var(--theme-color);
    }
  }
}

:deep(.ant-menu) {
  background: transparent !important;
}
</style>

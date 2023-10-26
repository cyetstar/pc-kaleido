<!--
 * @Author: gongxiaofei
 * @Date: 2022-08-05 14:29:05
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-19 14:53:51
 * @Description: 
-->
<template>
  <section class="h-[calc(100%-15px)] bg-[#FFF] mt-15px">
    <section
      :class="[
        collapsed ? 'w-50px' : 'w-200px',
        'h-[calc(100%-36px)] box-border',
      ]"
    >
      <a-menu
        mode="inline"
        :inline-collapsed="collapsed"
        :inlineIndent="10"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
      >
        <template
          v-for="item in menus"
          :key="item.path ? item.path : item.name"
        >
          <template v-if="item.children && item.children.length">
            <sub-menu
              :key="item.path ? item.path : item.name"
              :menu-info="item"
              :level="level"
            ></sub-menu>
          </template>
          <template v-else>
            <a-menu-item
              :key="item.path ? item.path : item.name"
              @click="router.push(item.path)"
            >
              {{ item.title }}
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </section>
    <div
      :class="[
        'w-[100%] h-32px flex items-center box-border border-t text-gray-500',
        collapsed ? 'pl-15px' : 'pl-31px',
      ]"
    >
      <MenuUnfoldOutlined
        class="text-18px cursor-pointer"
        v-if="collapsed"
        @click="onCollapsed"
      />
      <template v-else>
        <MenuFoldOutlined
          class="text-18px cursor-pointer pr-6px"
          @click="onCollapsed"
        />
        收起菜单栏
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  onMounted,
  getCurrentInstance,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import SubMenu from "./SubMenu.vue";
import { useMenuStore } from "@/store/modules/menu";

const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance() as any;

const collapsed = ref<boolean>(false);
const menuStore = useMenuStore();
const menus = computed(() => {
  const list: any = menuStore.$state.subMenu;
  return list;
});

const openKeys = ref<string[]>([]);

const selectedKeys = ref<string[]>([]);

const level = 1;

const onCollapsed = () => {
  collapsed.value = !collapsed.value;
};

const findMenuPath = (menus: any[], path?: string): Array<string> => {
  for (const menu of menus) {
    if (path === menu.path) {
      return [menu.path];
    }
    if (menu.children !== undefined && menu.children.length > 0) {
      let paths: any = findMenuPath(menu.children, path);
      if (paths.length > 0) {
        return [menu.path ? menu.path : menu.name, ...paths];
      }
    }
  }
  return [];
};

watch(
  () => route.path,
  (newVal) => {
    let keys = findMenuPath(menuStore.subMenu, newVal);
    if (keys.length > 0) {
      selectedKeys.value = [keys[keys.length - 1]];
      openKeys.value = keys;
    }
  },
  {
    immediate: true,
  }
);
// onMounted(() => {
//   const path = route.path;
//   selectedKeys.value = [path];
// });
</script>

<style lang="less" scoped>
:deep(.ant-menu) {
  color: var(--menu-font-color);
}

:deep(.ant-menu-submenu-arrow) {
  color: var(--menu-font-color);
}

:deep(.ant-menu-inline) {
  border: none;
}

:deep(.ant-menu-sub.ant-menu-inline) {
  background-color: #fff;
}

//:deep(.ant-menu-submenu-selected) {
//  color: #fff;
//}

:deep(.ant-menu-item-selected) {
  color: #fff !important;
  background-color: var(--theme-color) !important;

  &::after {
    display: none;
  }
}

:deep(.ant-menu-title-content) {
  display: flex;
  align-items: center;
}

:deep(.ant-menu.ant-menu-inline-collapsed) {
  width: 50px;
  border: none;
}

:deep(ant-menu-item) {
  color: var(--menu-font-color);
}

:deep(.ant-menu-item:hover) {
  font-weight: 500;
  color: var(--menu-font-color);
  background-color: var(--light-grey-color);
}

:deep(.ant-menu-item-active) {
  color: var(--menu-font-color);
  background-color: var(--light-grey-color);
}

:deep(.ant-menu-item-selected.ant-menu-item:hover) {
  color: #fff !important;
  background-color: var(--theme-color) !important;
}

:deep(.ant-menu.ant-menu-inline-collapsed > .ant-menu-item) {
  padding: 0 15px;
}
</style>

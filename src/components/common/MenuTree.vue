<!--
 * @Author: gongxiaofei
 * @Date: 2022-08-17 10:40:09
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-06-13 14:27:47
 * @Description: 
-->
<template>
  <section id="menu-tree" class="menu-tree">
    <a-tree
      :tree-data="menuTree"
      :fieldNames="fieldNames"
      v-model:selectedKeys="selectedKeys"
      v-model:expandedKeys="openKeys"
      :load-data="loadData"
      :showIcon="true"
      @select="handleSelect"
      :defaultExpandAll="true"
      class="overflow-y-auto h-[calc(100vh-110px)] pb-10px"
      :style="{ height: treeHeight }"
    >
      <template #icon="{ dm }">
        <template v-if="dm == 330200000000">
          <img class="w-16px h-16px mr-7px" src="@/assets/icons/i-police.png" />
        </template>
      </template>
      <template #switcherIcon="{ switcherCls }">
        <down-outlined :class="switcherCls" />
      </template>
    </a-tree>
    <div
      v-if="showCollapsed"
      class="w-[100%] h-44px flex align-center pl-20px pt-10px pb-10px cursor-pointer"
      style="border-top: 1px solid #dddddd"
      @click="handleCollapse"
    >
      <menu-fold-outlined :style="{ fontSize: '20px', color: '#333333' }" />
    </div>
  </section>
  <div
    v-if="collapsed"
    class="fixed bottom-0px bg-[#FFFFFF] w-44px h-44px rounded-[50%] flex items-center justify-center cursor-pointer z-10"
    @click="handleCollapse"
  >
    <menu-unfold-outlined :style="{ fontSize: '20px', color: '#333333' }" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import type { TreeProps } from "ant-design-vue";
import { MenuTree } from "#/menuTree";
import { getTreeByDmzm, getDeptChildren } from "@/api/_common/area";
import { getElementTop } from "@/utils/utils";

interface Props {
  showCollapsed?: boolean;
  collapsed: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showCollapsed: true,
  collapsed: false,
});
const menuTree = ref<MenuTree[]>([]);
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
const fieldNames: TreeProps["fieldNames"] = {
  children: "children",
  title: "jc",
  key: "dm",
};

const getTree = async () => {
  const data = await getTreeByDmzm({ dmzm: 330200000000 });
  const parent = data.children[0];
  const { dm } = parent;
  let children = await getDeptChildren({ dm });
  openKeys.value = [dm];
  menuTree.value = [{ ...parent, children }];
};

const loadData: TreeProps["loadData"] = async (treeNode: any) => {
  const { dm } = treeNode;
  const data = await getDeptChildren({ dm });
  data.forEach((r: any) => {
    r.isLeaf = !r.end;
  });
  treeNode.dataRef.children = data;
  menuTree.value = [...menuTree.value];
};

const emits = defineEmits(["handleSelect", "handleCollapse"]);
const handleSelect = (selectedKeys: any) => {
  emits("handleSelect", selectedKeys[0]);
};

const handleCollapse = () => {
  emits("handleCollapse");
};

onMounted(() => {
  getTree();
  getHeightAndSet();
});

const treeHeight = ref<string>("");
function getHeightAndSet() {
  let dom = document.getElementById("menu-tree");
  let offsetTop = getElementTop(dom);
  let height = window.innerHeight - offsetTop;
  treeHeight.value = `${props.showCollapsed ? height - 44 : height}px`;
}
</script>

<style lang="less" scoped>
.menu-tree {
  height: 100%;
  padding-bottom: 20px;
}
:deep(.ant-tree) {
  .ant-tree-iconEle {
    display: flex;
    align-items: center;
  }
  .ant-tree-switcher {
    position: absolute;
    right: 0;
    z-index: 10;
    width: 20px;
    height: 40px;
    display: flex;
  }
  .ant-tree-node-content-wrapper {
    display: flex;
    flex: 1;
    padding-left: 10px;
  }
  .ant-tree-treenode {
    width: 100%;
    height: 40px;
    align-items: center;
    padding: 0;
  }
  .ant-tree-treenode-leaf-last {
    .ant-tree-indent {
      width: auto;
    }
  }
  .ant-tree-node-content-wrapper:hover {
    background: transparent;
  }
  .ant-tree-treenode-selected {
    background: #0071ff;
    .expanded {
      border-color: #fff;
    }
    .ant-tree-title {
      color: #ffffff;
    }
    .ant-tree-node-selected {
      background: transparent;
    }
  }
}
.input-style {
  @apply w-190px h-30px text-[#999999] text-14px bg-transparent border-none rounded-none outline-none focus: (shadow-none) !important;
}
:deep(.ant-input-affix-wrapper) {
  display: flex;
  align-content: center;
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #c0c4cc;
  border-radius: 4px;
  .ant-input-suffix {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .ant-input {
    .input-style();
  }
}
:deep(.anticon) {
  display: flex;
  align-items: center;
}
</style>

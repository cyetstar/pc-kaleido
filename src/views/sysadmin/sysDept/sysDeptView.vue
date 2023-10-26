<!--
 * @Author: xiadawei
 * @Date: 2023-10-14 12:08:49
 * @Description: 部门表详情页面
-->
<template>
  <section class="h-page-section">
    <div class="view-box">
      <div class="view-item">
        <span class="view-item-label">id: </span>
        <span class="view-item-value">{{ viewData.id }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">部门编码: </span>
        <span class="view-item-value">{{ viewData.deptCode }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">父部门编码: </span>
        <span class="view-item-value">{{ viewData.parentCode }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">父部门id: </span>
        <span class="view-item-value">{{ viewData.parentId }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">部门名称: </span>
        <span class="view-item-value">{{ viewData.deptName }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">负责人: </span>
        <span class="view-item-value">{{ viewData.leader }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">联系电话: </span>
        <span class="view-item-value">{{ viewData.phone }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">邮箱: </span>
        <span class="view-item-value">{{ viewData.email }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">顺序号: </span>
        <span class="view-item-value">{{ viewData.orderNum }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">子节点数: </span>
        <span class="view-item-value">{{ viewData.subCount }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">是否启用: </span>
        <span class="view-item-value">{{ viewData.isEnabled }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">是否已删除1：已删除，0：未删除: </span>
        <span class="view-item-value">{{ viewData.isDeleted }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">创建时间: </span>
        <span class="view-item-value">{{ viewData.createTime }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">更新时间: </span>
        <span class="view-item-value">{{ viewData.updateTime }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">创建人: </span>
        <span class="view-item-value">{{ viewData.createdBy }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">更新人: </span>
        <span class="view-item-value">{{ viewData.updatedBy }}</span>
      </div>
      <div class="view-item">
        <span class="view-item-label">: </span>
        <span class="view-item-value">{{ viewData.ancestors }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { sysDeptViewApi } from "@/api/sysadmin/sysDeptApi";

const route = useRoute();
const id = route.query.id;

const viewData = ref({});
const getView = async () => {
  const res = await sysDeptViewApi({ id });
  viewData.value = res;
};
onMounted(() => {
  getView();
});
</script>

<style lang="less" scoped>
.view-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.view-item {
  width: 50%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;

  &-label {
    min-width: 90px;
  }

  &-value {
    flex: 1;
  }
}
</style>

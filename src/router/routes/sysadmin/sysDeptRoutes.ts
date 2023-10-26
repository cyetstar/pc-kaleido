import type { AppRouteConfig } from "@/router/types";

const sysDeptRoute: AppRouteConfig[] = [
  {
    path: "/sysadmin/sysDept/page",
    name: "sysDeptPage",
    component: () => import("@/views/sysadmin/sysDept/sysDeptPage.vue"),
    meta: {
      title: "组织管理",
      requiresAuth: false,
    },
  },
  {
    path: "/sysadmin/sysDept/view",
    name: "sysDeptView",
    component: () => import("@/views/sysadmin/sysDept/sysDeptView.vue"),
    hidden: true,
    meta: {
      title: "组织详情",
      requiresAuth: false,
    },
  },
];

export default sysDeptRoute;

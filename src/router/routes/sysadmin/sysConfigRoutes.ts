import type { AppRouteConfig } from "@/router/types";

const sysConfigRoute: AppRouteConfig[] = [
  {
    path: "/sysConfig/page",
    name: "SysConfigPage",
    component: () => import("@/views/sysadmin/sysConfig/sysConfigPage.vue"),
    meta: {
      title: "系统配置表",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "/sysConfig/view",
    name: "SysConfigView",
    component: () => import("@/views/sysadmin/sysConfig/sysConfigView.vue"),
    meta: {
      title: "系统配置表详情",
      requiresAuth: false,
    },
  },
]

export default sysConfigRoute
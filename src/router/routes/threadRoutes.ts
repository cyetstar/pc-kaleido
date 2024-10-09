import type { AppRouteConfig } from "@/router/types";

const threadRoutes: AppRouteConfig[] = [
  {
    path: "/thread/page",
    name: "threadPage",
    component: () => import("@/views/thread/threadPage.vue"),
    meta: {
      title: "发布记录",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "/thread/view",
    name: "threadView",
    component: () => import("@/views/thread/threadView.vue"),
    meta: {
      title: "发布记录详情",
      requiresAuth: false,
    },
  },
];

export default threadRoutes;

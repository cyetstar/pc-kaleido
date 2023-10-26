import type { AppRouteConfig } from "@/router/types";

const fwtDmWgRoute: AppRouteConfig[] = [
  {
    path: "/sysadmin/fwtDmWg/page",
    name: "fwtDmWgPage",
    component: () => import("@/views/sysadmin/fwtDmWg/fwtDmWgPage.vue"),
    meta: {
      title: "综治网格",
      requiresAuth: false,
    },
  },
];

export default fwtDmWgRoute;

import type { AppRouteConfig } from "@/router/types";

const fwtDmXzqhRoute: AppRouteConfig[] = [
  {
    path: "/sysadmin/fwtDmXzqh/page",
    name: "fwtDmXzqhPage",
    component: () => import("@/views/sysadmin/fwtDmXzqh/fwtDmXzqhPage.vue"),
    meta: {
      title: "行政区划",
      requiresAuth: false,
    },
  },
];

export default fwtDmXzqhRoute;

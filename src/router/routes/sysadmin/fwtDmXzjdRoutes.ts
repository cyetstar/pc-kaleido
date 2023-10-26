import type { AppRouteConfig } from "@/router/types";

const fwtDmXzjdRoute: AppRouteConfig[] = [
  {
    path: "/sysadmin/fwtDmXzjd/page",
    name: "fwtDmXzjdPage",
    component: () => import("@/views/sysadmin/fwtDmXzjd/fwtDmXzjdPage.vue"),
    meta: {
      title: "乡镇街道",
      requiresAuth: false,
    },
  },
];

export default fwtDmXzjdRoute;

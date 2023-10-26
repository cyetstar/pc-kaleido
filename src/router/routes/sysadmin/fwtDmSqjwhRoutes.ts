import type { AppRouteConfig } from "@/router/types";

const fwtDmSqjwhRoute: AppRouteConfig[] = [
  {
    path: "/sysadmin/fwtDmSqjwh/page",
    name: "fwtDmSqjwhPage",
    component: () => import("@/views/sysadmin/fwtDmSqjwh/fwtDmSqjwhPage.vue"),
    meta: {
      title: "社区居委会",
      requiresAuth: false,
    },
  },
];

export default fwtDmSqjwhRoute;

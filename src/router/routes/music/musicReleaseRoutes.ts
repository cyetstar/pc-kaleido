import type { AppRouteConfig } from "@/router/types";

const musicReleaseRoute: AppRouteConfig[] = [
  {
    path: "/musicRelease/page",
    name: "MusicReleasePage",
    component: () => import("@/views/music/musicRelease/musicReleasePage.vue"),
    meta: {
      title: "发行品",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "/musicRelease/view",
    name: "MusicReleaseView",
    component: () => import("@/views/music/musicRelease/musicReleaseView.vue"),
    meta: {
      title: "发行品详情",
      requiresAuth: false,
    },
  },
];

export default musicReleaseRoute;

import type { AppRouteConfig } from "@/router/types";

const tvshowActorRoute: AppRouteConfig[] = [
  {
    path: "/tvshowActor/page",
    name: "TvshowActorPage",
    component: () => import("@/views/tvshow/tvshowActor/tvshowActorPage.vue"),
    meta: {
      title: "剧集演职员",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "/tvshowActor/view",
    name: "TvshowActorView",
    component: () => import("@/views/tvshow/tvshowActor/tvshowActorView.vue"),
    meta: {
      title: "剧集演职员详情",
      requiresAuth: false,
    },
  },
]

export default tvshowActorRoute
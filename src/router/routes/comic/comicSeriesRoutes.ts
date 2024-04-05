import type { AppRouteConfig } from "@/router/types";

const comicSeriesRoute: AppRouteConfig[] = [
  {
    path: "comic/comicSeries/page",
    name: "comicSeriesPage",
    component: () => import("@/views/comic/comicSeries/comicSeriesPage.vue"),
    meta: {
      title: "漫画系列",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "comic/comicSeries/view",
    name: "comicSeriesView",
    component: () => import("@/views/comic/comicSeries/comicSeriesView.vue"),
    meta: {
      title: "漫画系列详情",
      requiresAuth: false,
    },
  },
]

export default comicSeriesRoute
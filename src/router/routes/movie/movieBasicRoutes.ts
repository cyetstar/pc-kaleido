import type { AppRouteConfig } from "@/router/types";

const movieBasicRoute: AppRouteConfig[] = [
  {
    path: "/movie/movieBasic/page",
    name: "MovieBasicPage",
    component: () => import("@/views/movie/movieBasic/movieBasicPage.vue"),
    meta: {
      title: "电影",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "/movie/movieBasic/view",
    name: "MovieBasicView",
    component: () => import("@/views/movie/movieBasic/movieBasicView.vue"),
    meta: {
      title: "电影详情",
      requiresAuth: false,
    },
  },
];

export default movieBasicRoute;

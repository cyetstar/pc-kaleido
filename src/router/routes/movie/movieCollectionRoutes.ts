import type { AppRouteConfig } from "@/router/types";

const movieCollectionRoute: AppRouteConfig[] = [
  {
    path: "/movie/movieCollection/page",
    name: "MovieCollectionPage",
    component: () =>
      import("@/views/movie/movieCollection/movieCollectionPage.vue"),
    meta: {
      title: "电影集合",
    },
  },
  {
    path: "/movie/movieCollection/view",
    name: "MovieCollectionView",
    component: () =>
      import("@/views/movie/movieCollection/movieCollectionView.vue"),
    meta: {
      title: "电影集合详情",
    },
  },
];

export default movieCollectionRoute;

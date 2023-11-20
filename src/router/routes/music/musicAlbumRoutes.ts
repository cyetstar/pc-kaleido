import type { AppRouteConfig } from "@/router/types";

const musicAlbumRoutes: AppRouteConfig[] = [
  {
    path: "/music/musicAlbum/page",
    name: "musicAlbumPage",
    component: () => import("@/views/music/musicAlbum/musicAlbumPage.vue"),
    meta: {
      title: "专辑",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "/music/musicAlbum/view",
    name: "musicAlbumView",
    component: () => import("@/views/music/musicAlbum/musicAlbumView.vue"),
    meta: {
      title: "专辑详情",
      requiresAuth: false,
    },
  },
];

export default musicAlbumRoutes;

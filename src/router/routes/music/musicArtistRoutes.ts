import type { AppRouteConfig } from "@/router/types";

const musicArtistRoutes: AppRouteConfig[] = [
  {
    path: "/music/musicArtist/page",
    name: "musicArtistPage",
    component: () => import("@/views/music/musicArtist/musicArtistPage.vue"),
    meta: {
      title: "艺术家",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "/music/musicArtist/view",
    name: "musicArtistView",
    component: () => import("@/views/music/musicArtist/musicArtistView.vue"),
    meta: {
      title: "艺术家详情",
      requiresAuth: false,
    },
  },
];

export default musicArtistRoutes;

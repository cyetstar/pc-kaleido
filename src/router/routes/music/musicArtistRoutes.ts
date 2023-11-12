import type { AppRouteConfig } from "@/router/types";

const musicArtistRoute: AppRouteConfig[] = [
  {
    path: "/musicArtist/page",
    name: "MusicArtistPage",
    component: () => import("@/views/music/musicArtist/musicArtistPage.vue"),
    meta: {
      title: "艺术家",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "/musicArtist/view",
    name: "MusicArtistView",
    component: () => import("@/views/music/musicArtist/musicArtistView.vue"),
    meta: {
      title: "艺术家详情",
      requiresAuth: false,
    },
  },
]

export default musicArtistRoute
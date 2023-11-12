import type { AppRouteConfig } from "@/router/types";

const musicTrackRoute: AppRouteConfig[] = [
  {
    path: "/musicTrack/page",
    name: "MusicTrackPage",
    component: () => import("@/views/music/musicTrack/musicTrackPage.vue"),
    meta: {
      title: "曲目",
      requiresAuth: false,
      icon: ["i-home.png", "i-home-active.png"],
    },
  },
  {
    path: "/musicTrack/view",
    name: "MusicTrackView",
    component: () => import("@/views/music/musicTrack/musicTrackView.vue"),
    meta: {
      title: "曲目详情",
      requiresAuth: false,
    },
  },
]

export default musicTrackRoute
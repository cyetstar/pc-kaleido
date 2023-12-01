import { defineStore } from "pinia";
import { apiSysConfigFindByKeys } from "@/api/sysadmin/sysConfigApi";

interface AppState {
  plexUrl: string;
  plexToken: string;
  scrollTop: {
    movie: number;
    music: number;
    tvshow: number;
  };
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    plexUrl: "",
    plexToken: "",
    scrollTop: {
      movie: 0,
      music: 0,
      tvshow: 0,
    },
  }),
  actions: {
    async initAppConfig() {
      return apiSysConfigFindByKeys(["plexUrl", "plexToken"]).then((res) => {
        this.plexUrl = res.plexUrl;
        this.plexToken = res.plexToken;
      });
    },

    setScrollTop(scrollTop: number, type: "movie" | "music" | "tvshow") {
      this.scrollTop[type] = scrollTop;
    },
    getScrollTop(type: "movie" | "music" | "tvshow") {
      return this.scrollTop[type];
    },

    clearAppState() {
      this.$reset();
    },
  },
  persist: {
    key: "APP_STORE",
    storage: window.sessionStorage,
  },
});

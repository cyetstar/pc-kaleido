import { defineStore } from "pinia";
import { apiSysConfigFindByKeys } from "@/api/sysadmin/sysConfigApi";

interface AppState {
  config: any;
  scrollTop: any;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    config: {},
    scrollTop: {},
  }),
  actions: {
    async initAppConfig() {
      return apiSysConfigFindByKeys([
        "plexUrl",
        "plexToken",
        "plexMovieLibraryId",
        "plexTvshowLibraryId",
        "plexMusicLibraryId",
        "movieLibraryPath",
        "movieDownloadPath",
      ]).then((res) => {
        this.config = { ...res };
      });
    },

    setScrollTop(scrollTop: number, type: string) {
      this.scrollTop[type] = scrollTop;
    },
    getScrollTop(type: string) {
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

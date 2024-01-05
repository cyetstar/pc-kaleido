import { defineStore } from "pinia";
import { isEmpty, isNotEmpty } from "@ht/util";
import { apiSysConfigFindByKeys } from "@/api/sysadmin/sysConfigApi";

interface AppState {
  config: any;
  scrollTop: any;
  actions: any;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    config: {},
    scrollTop: {},
    actions: {},
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

    updateAction(actionList: [any]) {
      const actionRunnings: string[] = [];
      if (isNotEmpty(actionList)) {
        actionList.forEach((s) => {
          this.actions[s.action] = s.running;
          if (s.running) {
            actionRunnings.push(s.action);
          }
        });
      }
      Object.keys(this.actions)
        .filter((s: string) => !actionRunnings.includes(s))
        .forEach((s: string) => {
          this.actions[s] = false;
        });
    },

    stopAction(action: string) {
      this.actions[action] = false;
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

import { defineStore } from "pinia";
import { apiSysConfigFindByKeys } from "@/api/sysadmin/sysConfigApi";

interface AppState {
  plexUrl: string;
  plexToken: string;
  scrollTop: number;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    plexUrl: "",
    plexToken: "",
    scrollTop: 0,
  }),
  actions: {
    async initAppConfig() {
      return apiSysConfigFindByKeys(["plexUrl", "plexToken"]).then((res) => {
        this.plexUrl = res.plexUrl;
        this.plexToken = res.plexToken;
      });
    },

    setScrollTop(scrollTop: number) {
      this.scrollTop = scrollTop;
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

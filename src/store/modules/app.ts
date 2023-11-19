import type { AppRouteConfig } from "@/router/types";
import { defineStore } from "pinia";
import { sysMenuTreeApi } from "@/api/sysadmin/sysMenuApi";
import { apiSysConfigFindByKeys } from "@/api/sysadmin/sysConfigApi";
import { apiPlexGetLibraries } from "@/api/plexApi";

interface AppState {
  visitedViews: AppRouteConfig[];
  cachedViews: AppRouteConfig[];
  collapsed: boolean;
  plexUrl: string;
  plexToken: string;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    visitedViews: [],
    cachedViews: [],
    collapsed: false,
    plexUrl: "",
    plexToken: "",
  }),
  actions: {
    addVisitedView(view: AppRouteConfig) {
      if (this.visitedViews.every((r) => r.path !== view.path)) {
        this.visitedViews.push(view);
      }
    },

    deleteVisitedView(view: AppRouteConfig) {
      const viewIndex = this.visitedViews.findIndex(
        ({ path }) => path === view.path
      );
      viewIndex > -1 && this.visitedViews.splice(viewIndex, 1);
    },

    addCachedView(view: AppRouteConfig) {
      if (this.cachedViews.every((r) => r.path !== view.path)) {
        this.cachedViews.push(view);
      }
    },

    deleteCachedView(view: AppRouteConfig) {
      const viewIndex = this.cachedViews.findIndex(
        ({ path }) => path === view.path
      );
      viewIndex > -1 && this.cachedViews.splice(viewIndex, 1);
    },

    setCollapsed(collapse: boolean) {
      this.collapsed = collapse;
    },

    clearAppState() {
      this.$reset();
    },

    async initAppConfig() {
      return apiSysConfigFindByKeys(["plexUrl", "plexToken"]).then((res) => {
        console.log(res);
        this.plexUrl = res.plexUrl;
        this.plexToken = res.plexToken;
      });
    },
  },
  persist: {
    key: "APP_STORE",
    storage: window.sessionStorage,
  },
});

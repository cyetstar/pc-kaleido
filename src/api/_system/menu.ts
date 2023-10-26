import type { BuildMenuModel } from "./model/menuModel";
import { useFetch } from "@/utils/http";

enum Api {
  BUILD_MENU = "sysadmin/menu/build",
}

export const buildMenuApi = () => {
  return useFetch.get<BuildMenuModel[]>({
    url: Api.BUILD_MENU,
  });
};

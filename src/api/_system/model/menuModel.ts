import type { MenuType } from "@/enums/menuEnum";
import type { DateLogModel } from "@/api/model/baseModel";
import type { AppRouteConfig } from "@/router/types";

export interface BuildMenuModel
  extends Omit<AppRouteConfig, "name" | "component" | "redirect" | "children"> {
  name: Nullable<string>;
  component: string;
  redirect?: Nullable<string>;
  children: BuildMenuModel[];
}

export interface MenuModel
  extends Omit<BuildMenuModel, "meta" | "children">,
    DateLogModel {
  title: string;
  type: MenuType;
  app: string;
  orderNum: number;
  parentId: number;
  icon: string;
  hasChildren: boolean;
  [key: string]: unknown;
}

export interface BuildMenuModel
  extends Omit<AppRouteConfig, "name" | "component" | "redirect" | "children"> {
  name: Nullable<string>;
  component: string;
  redirect?: Nullable<string>;
  children: BuildMenuModel[];
}

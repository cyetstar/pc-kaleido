/*
 * @Author: gongxiaofei
 * @Date: 2022-08-22 09:16:24
 * @LastEditors: songtao
 * @LastEditTime: 2023-10-18 15:38:02
 * @Description:
 */
import type {AppRouteConfig} from "../types";
import {PageLayout} from "@/router/constant";

import sysDeptRoutes from "@/router/routes/sysadmin/sysDeptRoutes";
import sysUserRoutes from "@/router/routes/sysadmin/sysUserRoutes";
import sysRoleRoutes from "@/router/routes/sysadmin/sysRoleRoutes";
import sysResourceRoutes from "@/router/routes/sysadmin/sysResourceRoutes";
import sysMenuRoutes from "@/router/routes/sysadmin/sysMenuRoutes";
import fwtDmXzqhRoutes from "@/router/routes/sysadmin/fwtDmXzqhRoutes";
import fwtDmXzjdRoutes from "@/router/routes/sysadmin/fwtDmXzjdRoutes";
import fwtDmSqjwhRoutes from "@/router/routes/sysadmin/fwtDmSqjwhRoutes";
import fwtDmWgRoutes from "@/router/routes/sysadmin/fwtDmWgRoutes";
import webLogRoutes from "@/router/routes/sysadmin/webLogRoutes";
import sysDictTypeRoutes from "@/router/routes/sysadmin/sysDictTypeRoutes";
import sysLogRoutes from "@/router/routes/sysadmin/sysLogRoutes";

const LoginRoute: AppRouteConfig = {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    hidden: true,
    meta: {
        title: "登录",
        requiresAuth: false,
    }
}

const BackstageRoute: AppRouteConfig = {
    path: "/",
    name: "backstage",
    component: PageLayout,
    children: [
        {
            path: "/:path(.*)*",
            name: "PageNotFound",
            component: () => import("@/views/error/PageNotFound.vue"),
            hidden: true,
            meta: {
                title: "404 - Page Not Found",
                requiresAuth: false,
            },
        },
        ...sysUserRoutes,
        ...sysRoleRoutes,
        ...sysDeptRoutes,
        ...sysMenuRoutes,
        ...sysResourceRoutes,
        ...sysDictTypeRoutes,
        ...fwtDmXzqhRoutes,
        ...fwtDmXzjdRoutes,
        ...fwtDmSqjwhRoutes,
        ...fwtDmWgRoutes,
        ...webLogRoutes,
        ...sysLogRoutes,
    ],
};
export const allRoutes = [LoginRoute, BackstageRoute];
export const menuRoute = [BackstageRoute]
export const basicRoutes = [BackstageRoute];

/*
 * @Author: gongxiaofei
 * @Date: 2023-06-29 09:19:01
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-09-11 10:19:31
 * @Description:
 */
export interface resourceItem {
  type: string;
  name: string;
  action?: string[];
  children?: resourceItem[];
}

export const SYSADMIN_RESOURCE: resourceItem[] = [
  {
    type: "sysUser",
    name: "用户管理",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "sysDept",
    name: "部门表",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "sysMenu",
    name: "菜单管理",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "sysRole",
    name: "角色管理",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "sysResource",
    name: "资源管理",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "sysDictType",
    name: "字典类型",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "sysDict",
    name: "字典管理",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "sysConfig",
    name: "系统配置表",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "webLog",
    name: "操作日志",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "sysLog",
    name: "系统日志",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
];

export const MUSIC_RESOURCE: resourceItem[] = [
  {
    type: "musicRelease",
    name: "发行品",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "musicArtist",
    name: "艺术家",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
  {
    type: "musicTrack",
    name: "曲目",
    action: ["page", "view", "create", "update", "delete", "export", "other"],
  },
];

export const ALL_RESOURCE: resourceItem[] = [
  ...SYSADMIN_RESOURCE,
  ...MUSIC_RESOURCE,
];

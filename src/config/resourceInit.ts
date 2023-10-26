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
    children?: resourceItem[]
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
        type: "fwtDmXzqh",
        name: "行政区划",
        action: ["page", "view", "create", "update", "delete", "export", "other"],
    },
    {
        type: "fwtDmXzjd",
        name: "乡镇街道",
        action: ["page", "view", "create", "update", "delete", "export", "other"],
    },
    {
        type: "fwtDmSqjwh",
        name: "社区乡村",
        action: ["page", "view", "create", "update", "delete", "export", "other"],
    },
    {
        type: "fwtDmWg",
        name: "综治网格",
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

export const OPEN_RESOURCE: resourceItem[] = [
    {
        type: "openYyJb",
        name: "应用管理",
        action: ["page", "view", "create", "update", "delete", "export", "other"],
    },
    {
        type: "openLog",
        name: "请求日志",
        action: ["page", "view", "create", "update", "delete", "export", "other"],
    },
]

export const BASE_RESOURCE: resourceItem[] = [
    {
        type: "pcsSjJbFxyh",
        name: "风险隐患",
        action: ["page", "pageDcs", "pageDqs", "pageDfk", "pageDsh", "pageYgd",
            "view", "create", "update", "delete", "export", "exportDcs", "exportDqs", "exportDfk", "exportDsh", "exportYgd", "other"],
    },
    {
        type: "pcsSjJbSqmy",
        name: "社情民意",
        action: ["page", "pageDjb", "pageDbj", "pageDsh", "pageDhf", "view", "create", "update", "delete", "export", "other"],
    },
];

export const TYCJ_RESOURCE: resourceItem[] = [
    {
        type: "tycjYyRegister",
        name: "应用注册",
        action: ["page", "view", "create", "update", "enable", "unenable", "apply"],
    },
    {
        type: "tycjYyAudit",
        name: "应用审核",
        action: ["page", "view", "audit"],
    },
    {
        type: "tycjYyRole",
        name: "应用角色",
        action: ["page", "create", "update", "delete", "setPermission"],
    },
    {
        type: "tycjYyUser",
        name: "应用成员",
        action: ["page", "setRole"],
    },

    {
        type: "tycjZl",
        name: "任务管理",
        action: ["page", "view", "create"],
    },
    {
        type: "tycjZlType",
        name: "任务接入",
        action: ["page", "view", "create", "update"],
    },
    {
        type: "tycjZlReceive",
        name: "接收设置",
        action: ["page", "other"],
    },

    {
        type: "tycjBzSjx",
        name: "数据项管理",
        action: ["page", "create", "delete"],
    },
    {
        type: "tycjBzSjy",
        name: "数据元管理",
        action: ["page", "create", "update", "delete", "import"],
    },
    {
        type: "tycjBzXdc",
        name: "限定词管理",
        action: ["page", "create", "update", "delete", "import"],
    },
    {
        type: "tycjBzInterface",
        name: "标准接口",
        action: ["page", "view", "create"],
    },
    {
        type: "tycjBzDict",
        name: "数据字典",
        action: ["page", "view", "create", "update", "delete"],
    },
]

export const ALL_RESOURCE: resourceItem[] = [...SYSADMIN_RESOURCE, ...OPEN_RESOURCE, ...BASE_RESOURCE]

/*
 * @Author: gongxiaofei
 * @Date: 2023-06-29 11:30:09
 * @LastEditors: ximusunian ximusunian@gmail.com
 * @LastEditTime: 2023-10-09 13:51:48
 * @Description:
 */
export const MENUS = [
  {
    title: "电影",
    name: "movie",
    children: [
      {
        title: "电影",
        name: "movieBasicPage",
        path: "/movie/movieBasic/page",
        permission: "movieBasic:page",
      },
      {
        title: "电影集合",
        name: "movieCollectionPage",
        path: "/movie/movieCollection/page",
        permission: "movieCollection:page",
      },
    ],
  },
  {
    title: "剧集",
    name: "tvshow",
    children: [
      {
        title: "剧集",
        name: "tvshowShowPage",
        path: "/tvshow/tvshowShow/page",
        permission: "tvshowShow:page",
      },
    ],
  },
  {
    title: "音乐",
    name: "music",
    children: [
      {
        title: "专辑",
        name: "musicAlbumPage",
        path: "/music/musicAlbum/page",
        permission: "musicAlbum:page",
      },
      {
        title: "艺术家",
        name: "musicArtistPage",
        path: "/music/musicArtist/page",
        permission: "musicArtist:page",
      },
    ],
  },
  {
    title: "系统管理",
    name: "sysadmin",
    children: [
      {
        title: "用户管理",
        name: "SysUserPage",
        path: "/sysadmin/sysUser/page",
        permission: "sysUser:page",
      },
      {
        title: "角色管理",
        name: "SysRolePage",
        path: "/sysadmin/sysRole/page",
        permission: "sysRole:page",
      },
      {
        title: "菜单管理",
        name: "SysMenuPage",
        path: "/sysadmin/sysMenu/page",
        permission: "sysMenu:page",
      },
      {
        title: "资源管理",
        name: "SysResourcePage",
        path: "/sysadmin/sysResource/page",
        permission: "sysResource:page",
      },
      {
        title: "字典管理",
        name: "sysDictTypePage",
        path: "/sysadmin/sysDictType/page",
        permission: "sysDictType:page",
      },
      {
        title: "系统配置",
        name: "SysConfigForm",
        path: "/sysadmin/sysConfig/form",
        permission: "sysConfig:create",
      },
      {
        title: "操作日志",
        name: "webLogPage",
        path: "/sysadmin/webLog/page",
        permission: "webLog:page",
      },
      {
        title: "系统日志",
        name: "SysLogPage",
        path: "/sysadmin/sysLog/page",
        permission: "sysLog:page",
      },
    ],
  },
];

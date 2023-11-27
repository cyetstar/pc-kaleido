export const MENUS = [
  {
      title: "父菜单",
      name: "parent",
      children: [
        // ---  请将下列内容粘贴到menuInit.ts文件中 START ----
        {
          title: "剧集演职员关联表",
          name: "TvshowShowActorPage",
          path: "/tvshowShowActor/page",
          permission: "tvshowShowActor:page",
        }
        // ---  请将以上内容粘贴到menuInit.ts文件中 END ----
      ]
  }
]
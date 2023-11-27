export const MENUS = [
  {
      title: "父菜单",
      name: "parent",
      children: [
        // ---  请将下列内容粘贴到menuInit.ts文件中 START ----
        {
          title: "剧集演职员",
          name: "TvshowActorPage",
          path: "/tvshowActor/page",
          permission: "tvshowActor:page",
        }
        // ---  请将以上内容粘贴到menuInit.ts文件中 END ----
      ]
  }
]
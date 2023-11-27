export const MENUS = [
  {
      title: "父菜单",
      name: "parent",
      children: [
        // ---  请将下列内容粘贴到menuInit.ts文件中 START ----
        {
          title: "单集演职员关联表",
          name: "TvshowEpisodeActorPage",
          path: "/tvshowEpisodeActor/page",
          permission: "tvshowEpisodeActor:page",
        }
        // ---  请将以上内容粘贴到menuInit.ts文件中 END ----
      ]
  }
]
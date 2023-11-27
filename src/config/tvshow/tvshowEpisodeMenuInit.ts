export const MENUS = [
  {
      title: "父菜单",
      name: "parent",
      children: [
        // ---  请将下列内容粘贴到menuInit.ts文件中 START ----
        {
          title: "单集",
          name: "TvshowEpisodePage",
          path: "/tvshowEpisode/page",
          permission: "tvshowEpisode:page",
        }
        // ---  请将以上内容粘贴到menuInit.ts文件中 END ----
      ]
  }
]
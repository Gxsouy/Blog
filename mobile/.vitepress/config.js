module.exports = {
  title: "Gxsouy",
  base: "/",
  description: "Keep on going never give up",
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  searchMaxSuggestions: 10,
  lastUpdated: true,
  themeConfig: {
    logo: "avatar.jpg",
    smoothScroll: true,
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "引导",
        items: [
          {
            text: "Js",
            link: "/docs/Js/",
          },
          {
            text: "Js_Adv",
            link: "/docs/Js_Adv/",
          },
          {
            text: "LeetCode",
            link: "/docs/LeetCode/",
          },
          {
            text: "Vue",
            link: "/docs/Vue/",
          },
        ],
      },
      {
        text: "Github",
        link: "https://github.com/gxsouy",
        target: "_blank",
      },
      {
        text: "Gitee(码云)",
        link: "https://gitee.com/gxsouy",
        target: "_blank",
      },
    ],
    sidebar: [
      {
        text: "首页",
        link: "/",
        collapsable: false,
      },
      {
        text: "Js",
        link: "/docs/Js/index",
        children: [
          {
            text: "Array",
            link: "/docs/Js/Array",
          },
          {
            text: "Class",
            link: "/docs/Js/Class",
          },
          {
            text: "Clone",
            link: "/docs/Js/Clone",
          },
          {
            text: "Closure",
            link: "/docs/Js/Closure",
          },
          {
            text: "Code-promise",
            link: "/docs/Js/Code-promise",
          },
          {
            text: "Code",
            link: "/docs/Js/Code",
          },
          {
            text: "EventLoop",
            link: "/docs/Js/EventLoop",
          },
          {
            text: "Function",
            link: "/docs/Js/Function",
          },
          {
            text: "Map-Set",
            link: "/docs/Js/Map-Set",
          },
          {
            text: "Methods",
            link: "/docs/Js/Methods",
          },
          {
            text: "Modular",
            link: "/docs/Js/Modular",
          },
          {
            text: "Object",
            link: "/docs/Js/Object",
          },
          {
            text: "Promise",
            link: "/docs/Js/Promise",
          },
          {
            text: "Prototype",
            link: "/docs/Js/Prototype",
          },
          {
            text: "RegExp",
            link: "/docs/Js/RegExp",
          },
          {
            text: "Symbol",
            link: "/docs/Js/Symbol",
          },
        ],
      },
      {
        text: "Js_Adv",
        link: "/docs/Js_Adv/index",
        children: [
          {
            text: "CodeQuality",
            link: "/docs/Js_Adv/CodeQuality",
          },
          {
            text: "CommonFunction",
            link: "/docs/Js_Adv/CommonFunction",
          },
          {
            text: "Function",
            link: "/docs/Js_Adv/Function",
          },
          {
            text: "Memory",
            link: "/docs/Js_Adv/Memory",
          },
          {
            text: "Sub",
            link: "/docs/Js_Adv/Sub",
          },
          {
            text: "Type",
            link: "/docs/Js_Adv/Type",
          },
          {
            text: "Underscore",
            link: "/docs/Js_Adv/Underscore",
          },
        ],
      },
      {
        text: "LeetCode",
        link: "/docs/LeetCode/index",
        children: [
          {
            text: "NumberSum",
            link: "/docs/LeetCode/NumberSum",
          },
          {
            text: "RemoveElement",
            link: "/docs/LeetCode/removeElement",
          },
        ],
      },
      {
        text: "Vue",
        link: "/docs/Vue/index",
        children: [
          {
            text: "Base",
            link: "/docs/Vue/Base",
          },
          {
            text: "Component",
            link: "/docs/Vue/Component",
          },
        ],
      },
    ],
  },
};

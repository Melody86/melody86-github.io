// https://github.com/vuejs/vitepress/blob/498f302de429152c1aa133219fe8615bbdeb6c69/src/node/config.ts

const nav = require("./utils/nav.js")
const sidebar = require("./utils/sidebar.js")

const BASE_DIR = 'docs/'                 //md 文件存放根目录
const REPO = "melody86/melody86-github.io"
const author = "Melody"
const docsBranch = "gh-pages"
const outputDir = 'public'                  //编译后输出目录

async function getConfig(){

  const sidebarData =  await sidebar()
  console.log('sidebarData22222: ', JSON.stringify(sidebarData))
  return {

    base: '/',     //部署不在根目录时，可配置路径前缀
    lang: 'en-CN',
    title: "望月台·手抄",
    description: "取次花丛懒回顾，半缘修道半缘君",
    dest: outputDir,

    plugins: [
      '@vuepress/plugin-back-to-top',
      [
        '@vuepress/plugin-search',
        {
          locales: {
              "/": {
                  placeholder: "Search",
              },
              "/zh/": {
                  placeholder: "搜索",
              },
          },
        },
      ],
    ],

    head: [
      [
        "meta",
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
        },
      ],
      ["meta", { name: "keywords", content: "望月台手抄" }],
      ["link", { rel: "icon", href: "/favicon.ico" }],
      // 引入 Gitalk
      [
        "link",
        { rel: "stylesheet", href: "https://unpkg.com/gitalk/dist/gitalk.css" },
      ],
      [
        "link",
        { rel: "stylesheet", href: "/libjs/swiper-bundle.min.css" },
      ],
      [
        "link",
        { rel: "stylesheet", href: "/libjs/APlayer.min.css" },
      ],
      ["script", { src: "https://unpkg.com/gitalk/dist/gitalk.min.js" }],
      ["script", { src: "/libjs/swiper-bundle.min.js" }],
      ["script", { src: "/libjs/APlayer.min.js" }],
      
    ],

    themeConfig: {
      // repo: REPO,
      docsDir: BASE_DIR,
      author,
      // docsBranch,
      // search: true,
      nav,
      sidebar: sidebarData,
      // pages: string[]
      // page meta
      editLinks: true,
      editLinkText: '在 GitHub 上编辑此页',
      lastUpdated: '上次更新',
      algolia: {
        apiKey: 'your_api_key',
        indexName: 'index_name',
        searchParameters: {
          facetFilters: ['tags:guide,api']
        }
      },
      musicList: [
        {
          name: 'At My Worst',
          artist: 'Pink Sweat$ / Kehlani',
          cover: '/audio/at-my-worst.jpeg',
          url: '/audio/01 - At My Worst (feat. Kehlani).mp3'
          
        },{
          name: 'Ghosts',
          artist: 'New Empire',
          cover: '/audio/Ghosts.png',
          url: '/audio/New Empire - Ghosts.mp3'
          
        }
        
      ]
    },

  }
}

module.exports =  getConfig()


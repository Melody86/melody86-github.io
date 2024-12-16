---
resume: true
navbar: false
sidebar: false
aside: true
prev: false
next: false
date: 2021-12-30
title: 前端开发工程师-赖辉
tags:
  -
describe:
---

<Progress />
## 个人信息

- 赖辉 / 男 / 1992
- 硕士 / 深圳大学·计算机与软件学院
- 求职意向：前端开发工程师
- 手 机：13 0066 21143
- 邮 箱：1075119315@qq.com
- 籍 贯：江西瑞金
- 现 居 地：深圳市 龙岗区
- [blog.c9ai.com](https://blog.c9ai.com/)

## 专业技能

- 通过 CET-6
- 熟练掌握 Html5/Css3/JavaScript/ES6/TypeSrcipt
- 熟悉 React、Hybrid App (Android)、NodeJs、Vue3/Vue2
- 熟悉 Umi、Turbo、Webpack、Gulp、Vite 打包配置，有页面性能优化经验
- 熟悉 NextJS、Lowcode，了解 SpringBoot 等后台及运维相关技能
- 掌握 RAG，有模型训练和多个应用 demo 开发经验
- 熟悉 公众号 H5、小游戏和小程序开发，能解决移动端常见兼容性问题
- 熟悉 Git 版本控制，Shell 脚本，Linux 常用命令，Nginx 配置

## 教育背景

- 2015.9-2018.6 &nbsp;&nbsp;&nbsp;&nbsp; 深圳大学&nbsp;&nbsp;&nbsp;&nbsp; 计算机与软件学院&nbsp;&nbsp;&nbsp;&nbsp; 软件工程&nbsp;&nbsp;&nbsp;&nbsp; 硕士&nbsp;&nbsp;&nbsp;&nbsp; 学术型
- 2011.9-2015.6&nbsp;&nbsp;&nbsp;&nbsp; 江西理工大学&nbsp;&nbsp;&nbsp;&nbsp; 信息工程学院&nbsp;&nbsp;&nbsp;&nbsp; 计算机科学与技术&nbsp;&nbsp;&nbsp;&nbsp; 本科

## 工作经验

**2022 年 06~至今 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 众安银行(香港第一虚拟银行) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; INVEST WEB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 资深前端开发**<br>
<span style="color: gray">主要负责众安银行 Invest 多个营销增长活动需求的承接。完成了 `离线包多包架构升级`、`Nextjs服务端渲染项目构建优化`(60%+)、`WEB灰度方案设计落地`、`扫码工具开发`等。</span><br>
**2018 年 07~2022 年 05 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 平安银行股份有限公司 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 移动平台开发团队 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 前端开发** <br>
<span style="color: gray">负责平安银行多个`营销游戏`、`小程序`、`公众号及其后管`的开发上线。场景复用优化游戏内存使用、拆分弹幕任务降低卡顿、MPA 项目首屏加载优化等。</span>

## 荣誉奖励

- 会议论文：PCM2017 《A Novel Texture Exemplars Extraction Approach Based on Patches Homogeneity and Defect Detection》CCF C 类. 第一作者.
- 会议论文：PCM2017 《Repetitiveness Metric Based on Automatic Texture Exemplar》CCF C 类. 第二作者.
- 2016-2017 年度 深圳大学优秀研究生
- 2014 年 三等奖学金
- 2014 年 6 月 江西省电脑知识竞赛一等奖

## 众安银行项目经验

### 离线包多包架构升级

**2023.03~至今 &nbsp;&nbsp;&nbsp;&nbsp; 28 投资日+基金年报+股票卡回赠 &nbsp;&nbsp;&nbsp;&nbsp; 前端接口人**

- 项目技术: `React + Umi + turbo + Jsbridge`
- 主要职责:
  1. 早期接入离线包频繁出现白屏问题，通过日志分析出架构存在:匹配入口文件不准确、缺失包版本管理、webview 缓存池优化 bug 等缺陷;
  2. 负责白屏、兼容性问题定位，梳理离线包交互流程图，并推动离线包管理平台和 app 改造;
  3. 持续优化离线包项目，线上版本在 cdn 加速下平均加载耗时约`800ms`左右，离线包版本平均加载耗时`200ms`内;
  4. 基于现有能力结合 Turbo 进行多包架构的设计和实现，支持多域名、在线/离线版本构建，完成活动配置化下线脚本;
  5. 基于稳定的多包架构，快速迭代多个增长活动。包括每期投资日、基金年包、股票卡回赠、小数股兑换、股票 pre-heat 等;
  6. 实现多种复杂场景切换动效，合理编排组件加载顺序，减少页面重排，持续优化页面性能并进行项目沉淀；
- 项目简述: `Invest业务线由22年组建，为不依赖于银行活动周期窗口，打造了基金自身的投资活动品牌28投资日。帮助用户形成每月底28日大促的认知，以促进银行的开户、首投和AUM。截止23年8月以来，28投资日上线4期，累计开户数75972，投资用户数16194，累计AUM 7.11亿，均已超额完成当月dream版本okr。`

### Nextjs 服务端渲染项目

**2023.03~至今 &nbsp;&nbsp;&nbsp;&nbsp; 货币基金落地页+Crypto 官网 &nbsp;&nbsp;&nbsp;&nbsp; 主要前端开发**

- 项目技术: `React + nextjs + express + docker`
- 主要职责:
  1. 服务端渲染项目三台集群部署须一个多小时，针对构建耗时长问题提出优化方案并开发 Nextjs 构建优化插件;
  2. 约束项目结构结，减少 docker 文件复制，针对文件重复上传 CDN 实现摘要对比算法，国际化文案 Shaking、pnpm 缓存加速等;
  3. 开发 Nextjs 插件，支持多个域的接入，portal 项目单次构建从`16.58`分钟耗时缩减到`6.1`分钟，提效`63%`;
  4. 该 ISR 项目通过定时任务更新国际化文案，每次发布后都需要手动刷新页面触发更新，编写 prebuild 脚本，提前批量同步文案;
  5. 基于银行官网项目升级实现 Crypto 官网，在短期内完成了:响应式组件开发、银行路由转发、IP 地址拦截、埋点、监控、SEO 等;
  6. 持续主动优化体验和性能。Crypto 官网行情接口每一秒访问一次，通过监听用户浏览位置触发接口请求;
- 项目简述: `为满足公司 H5主页面加载时间不超过1秒的标准，公司搭建了基于nextjs的服务点渲染项目。已完成了Crypto官网、货币基金落地页、基金年报、基金专题页、公司市场观点等导流和动态资讯等的需求开发。`

## 平安银行项目经验

### 营销游戏和小程序

**2021.01~2022.05 &nbsp;&nbsp;&nbsp;&nbsp; 数字村小程序 + 跳一跳/飞翔灯泡仔游戏/火箭飞升游戏 &nbsp;&nbsp;&nbsp;&nbsp; 项目负责人**

- 项目技术: `Vue3 + Vite + PaxPC + Hilo + Gulp`
- 主要职责:
  1. 负责游戏基础类模块化开发，包括舞台、玩家、计分器、微信分享类等;
  2. 优化内存使用，场景切换时复用舞台实例，对于弹幕任务耗时太长卡顿严重问题，进行任务拆分;
  3. 基于 gulp 插件配置 scss 预编译、babel、uglify、JS 文件打包优化，多环境下打包变量切换等;
  4. 基于腾讯位置服务 JS API 进行个性化手绘图的开发，抽象景点 DomMarker 类，渲染 VNode 为真实 DOM，提高开发效率;
  5. 景点标注渲染，事件绑定与点击穿透，景点筛选工具、景点目录、景点详情等功能的实现;
  6. 承接平安科技、悬崖村 NFT 活动需求，为数字村及数字口袋引流;
  7. 负责 Vue3 框架新项目搭建，Vite 多环境下打包配置，基于 vueuse 实现点击和滑动卡片的显隐操作;
  8. NFT 藏品需求，小程序首页/个人中心改版，骨架屏、保存藏品到手机组件(APP 和小程序差异)的开发;
- 项目简述: `数字村小程序是“乡村振兴”为主题，为用户提供平安银行综合金融服务的重点项目。小程序主要包括: MBA课堂、乡村文旅、乡村头条、地方特色馆、优选理财/融资推荐、党费缴纳等功能; 后管系统更提供了用户角色、菜单权限、ICON、轮播图、MBA课堂、文旅路线等的配置化管理功能。`。`跳一跳小游戏是交易银行事业部向外推广相关产品的营销活动类项目。内部推广效果较好，进而迁移到数字口袋进行获客引流。飞翔灯泡仔游戏为2021年科技奇PA说的推广热身小游戏，玩法借鉴自Flappy bird。火箭飞升为响应火箭发射宣传而开发的一款营销游戏，玩法借鉴自支付宝锦鲤跳龙门游戏。`

### 微信公众号及后管系统

**2020.04~2020.10 &nbsp;&nbsp;&nbsp;&nbsp; 创新微信公众号+数字口袋公众号 &nbsp;&nbsp;&nbsp;&nbsp; 前端开发负责人**

- 项目技术: `Vue + Webpack + zxEditor + Paxui(基于mint封装) + PaxPC(基于antd封装) + hiper`
- 主要职责:
  1. 项目打包优化，有效将 bundle 大小缩减 **17.19%**，多入口平均加载 JS 数减少 **50%+**, 移动网络下首屏加载耗时从 1370ms 降至约 **880ms**左右;
  2. 针对单、多入口项目打包物过多进行 splitchunks 依赖细化配置优化，配合魔法注释避免重复打包等;
  3. 应用异步加载和 H5 的 async、defer 属性优化 JS 加载顺序，延后埋点请求、微信 sdk 等的加载等;
  4. 使用 hiper 工具进行性能分析时，发现存在**请求并发阻塞问题**，根据 puppeteer 官方文档进行改进;
  5. 规范多个环境下的变量配置，在编译打包时输出核验，前端静态资源发布系统 RMS 的 Shell 脚本配置;
  6. 基于 vue-cropper 封装图片裁剪组件，支持封面选取及相册选取;
  7. 移动端富文本插件 zxEditor 配置，fastclick、展示编辑切换无限增加`section`标签等问题处理;
- 项目描述: `创新公众号为对公数据化经营的品宣、推广、运营项目。内部用户可通过UM认证登录后查看各个模块的文章信息，通过微信自定义分享进行转发，管理员可以在移动端编辑富文本，存入草稿箱，也可以对模块进行编辑维护，对模块/文章进行左滑删除。`

<div id="resume-stuff">

## 作品及材料

1. [众安-portal-web 项目打包优化](http://panel.c9ai.com:8012/onlinePreview?url=aHR0cDovL2M5YWkuY29tOjgwMTIvZGVtby9wb3J0YWwtd2Vi6aG555uu5omT5YyF5LyY5YyWLnBwdHg%3D)
2. [众安-Hybrid App 前端开发简介](https://www.yuque.com/laihui-otp81/oras88/oq8h9c?singleDoc#)
3. [平安-Webpack 打包及首屏加载优化.pptx](http://panel.c9ai.com:8012/onlinePreview?url=aHR0cHM6Ly9maWxlLmM5YWkuY29tL3Jlc3VtZS9XZWJwYWNr5omT5YyF5Y%2BK6aaW5bGP5Yqg6L295LyY5YyWLnBwdHg%3D)
4. [平安-21 年汇报.pptx](http://panel.c9ai.com:8012/onlinePreview?url=aHR0cHM6Ly9maWxlLmM5YWkuY29tL3Jlc3VtZS8yMeW5tOaAu%2Be7k%2Baxh%2BaKpS5wcHR4#)
5. [在校-硕士毕业答辩 PPT.pptx](http://panel.c9ai.com:8012/onlinePreview?url=aHR0cDovL3BhbmVsLmM5YWkuY29tOjgwMTIvZGVtby%2Fmr5XkuJrnrZTovqkt6LWW6L6JLnBwdHg%3D)
6. [在校-A Novel Texture Exemplars Extraction Approach Based on Patches Homogeneity and Defect Detection.pdf](http://panel.c9ai.com:8012/onlinePreview?url=aHR0cHM6Ly9maWxlLmM5YWkuY29tL3Jlc3VtZS9BIE5vdmVsIFRleHR1cmUgRXhlbXBsYXJzIEV4dHJhY3Rpb24gQXBwcm9hY2ggQmFzZWQgb24gUGF0Y2hlcyBIb21vZ2VuZWl0eSBhbmQgRGVmZWN0IERldGVjdGlvbi5wZGY%3D)
7. [在校-毕业论文.pdf](http://panel.c9ai.com:8012/onlinePreview?url=aHR0cHM6Ly9maWxlLmM5YWkuY29tL3Jlc3VtZS%2Fmr5XkuJrorr7orqEt6LWW6L6JLnBkZg%3D%3D&officePreviewType=pdf)

</div>

<div id="resume-works">
  <br>
  *下栏在PC端/移动端横屏效果更好，微信浏览器打开可进行预览*
  <br>

  <ClientOnly>
  <effect-swiper height="700" :picList="[
    { title: '离线包项目', 
      link: 'https://bank-invest-uat.zaintl.con/invest/offline/hk/invest-day9/index?hide_app_bar=true&showTips=N',
      qrcode: '/images/resume/offline-web1.png',
      desc: '离线包项目是基于turbo实现的多包架构，具备离线包的高性能和线上版本支撑的稳定性。当离线包资源不可用时，可fallback到线上。', 
      example: [ '/images/resume/offline-web2.png'], 
    },
    { title: '数字村小程序-个性化地图', 
      link: 'https://test-b-fat.pingan.com.cn/stb/xczx/app/index.html#/cliffVillageNFT/index',
      qrcode: '/images/resume/szc.png',
      desc: '组内首个vue3项目，基于腾讯位置服务进行个性化手绘图的开发，APP、小程序多渠道支持悬崖村NFT活动需求。主要负责景点标注类渲染，口袋用户体系对接，小程序、原生差异及兼容性问题处理。', 
      example: [ '/images/resume/szc1.jpg', '/images/resume/szc2.jpeg'], 
    },
    { 
      title: '跳一跳小游戏', 
      link: 'https://my-uat1.orangebank.com.cn/mp/lightboy/jump/www/index.html',
      qrcode: '/images/resume/lightboy-jump.png',
      desc: '跳一跳小游戏是交易银行事业部向外推广相关产品的营销活动类项目。内部推广效果较好，进而迁移到数字口袋进行获客引流。', 
      example: [ '/images/resume/lightboy-jump1.jpeg', '/images/resume/lightboy-jump2.jpeg'], 
    },
    { title: '飞翔灯泡仔小游戏', 
      link: 'https://b.pingan.com.cn/stb/emc-cospace/lightboy/bird/index.html',
      qrcode: '/images/resume/lightboy-bird.png',
      desc: '飞翔灯泡仔游戏为2021年科技奇PA说的推广热身小游戏，玩法借鉴自Flappy bird。', 
      example: [ '/images/resume/lightboy-bird1.jpeg', '/images/resume/lightboy-bird2.jpeg'], 
    },
    { title: '火箭飞升小游戏', 
      link: 'https://b.pingan.com.cn/stb/dps-campaign-game/RocketRush/www/index.html',
      qrcode: '/images/resume/rocket-rush.png',
      desc: '火箭飞升为响应火箭发射宣传而开发的一款营销游戏，玩法借鉴自支付宝锦鲤跳龙门游戏。', 
      example: [ '/images/resume/rocket-rush1.jpeg', '/images/resume/rocket-rush2.jpeg'], 
    }
    ]" />
  </ClientOnly>
</div>

<style>
  @media screen and (max-width: 420px) {
  body {
    font-size: 14px;
  }
  .vp-doc :not(pre, h1, h2, h3, h4, h5, h6) > code{
    color: gray !important;
  }
}
</style>

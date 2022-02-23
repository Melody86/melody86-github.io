---
date: 2022-02-13
title: 基于VitePress搭建的博客
tags:
  - VitePress
  - Blog
describe: VuePress相对成熟，github上也有较多的主题可以进行配置，但是它基于webpack打包速度慢，且主要都是在vue2的基础上开发的。由此我选择了VitePress作为博客的框架，参考`Moking1997`的[vitepress-blog](https://github.com/Moking1997/vitepress-blog)的项目进行开发。

---

VuePress相对成熟，github上也有较多的主题可以进行配置，但是它基于webpack打包速度慢，且主要都是在vue2的基础上开发的。由此我选择了VitePress作为博客的框架，参考`Moking1997`的[vitepress-blog](https://github.com/Moking1997/vitepress-blog)的项目进行开发。

## 主要功能点
- 将VitePress作为依赖引入, 方便进行后续升级
- 动态生成SideBar
- 基于hitokoto动态增加打字效果
- 集成Swiper, 实现首页轮播跳转
- 集成Vue3-Aplayer音乐播放器
- 配置内置Algolia搜索功能


待补充完善:
- Gitalk 评论
- 文章按时间轴归档
- 文章分类
- ···

## 主要遇到的问题

### 1. 一言句子接口返回长度不固定, 如何动态更新样式表？

[Aurora](https://aurora-animate.xcye.xyz/) 实现的文字打印效果经常因为接口无响应而页面显示不流畅，且用[easy-typer-js](https://inner.ink/)实现的打字效果，实际是在setInterval中频繁操作DOM中文本。其实博客的[一言句子](https://developer.hitokoto.cn/)不需要频繁的调用接口，在特定时间区间内通过animation动态显示打印效果在页面上的性能体验会好些。

因此我参考了博客上的另外一种方式，`@keyframe typing`动态增加`<span>`的`width`, 并设置`overflow: hidden` 将超出部分隐藏掉，来模拟打字效果。但是我的[一言句子](https://developer.hitokoto.cn/)是通过接口动态获取的，那现在的问题是如何动态的去修改`@keyframe typing`的`width`，@keyframe 也无法传入参数。

度娘谷歌一顿关键词搜索词之后，终于找到[这个博客](https://docs.microsoft.com/zh-cn/archive/blogs/msdn_answers/part-i-using-javascript-to-set-keyframes-in-css-animations-windows-store-apps-ie)的实现方式: 在document的styleSheets中遍历同名同类型(keyframe)的cssRules，再通过cssRule的 **deleteRule** 和 **appendRule** 分别删除跟添加原有的样式。（多了一种操作样式表的方式）
```js
//遍历document样式表 特定样式relus, 返回对应索引
function getDocumentCSSRule(name, type) {
    let rule
    let ss = document.styleSheets
    let cssRule

    for (var i = 0; i < ss.length; i++) {
        try{
        for (var x = 0; x < ss[i].cssRules.length; x++) {
            rule = ss[i].cssRules[x]
            // rule.name 兼容scoped下选择器筛选，（如：typing-59b014f3）
            if (rule.type === type && rule.name && (rule.name === name || rule.name.indexOf(name+'-') >= 0)) {
                return rule
            }
        }
        }catch(e){
            continue
        }
    }
    return cssRule
}
```
另外还有个问题，在实现过程中发现句子中包含中英文，width是以em为单位，中文越多打印结束后空白部分越多，因此计算句子总长度时需以中文2个字符、英文一个字符计算，且animationDuration与句子的总长度应该是正比例关系。

```js
// 获取hitokoto接口句子，计算长度后，获取typing样式删除原有样式再添加
···
randomWords.value = res.data.hitokoto
// <Home> 为AsyncComponent, onMounted的时候 #header-random-words可能还没挂载
const randElem = document.getElementById('header-random-words')
const randomWordsLen = getSentenceLen(res.data.hitokoto)  //中文两个字符，英文一个
if(randElem){
    randElem.style.width = randomWordsLen / 2 + 'em'
    const steps = `steps(${ res.data.hitokoto.length }, end)`
    randElem.style.animationTimingFunction = steps
    randElem.style.webkitAnimationTimingFunction = steps
    randElem.style.animationDuration = 200 * randomWordsLen+"ms"

    let relus = getDocumentCSSRule('typing', CSSRule.KEYFRAMES_RULE)  //获取样式索引
    if(relus){
      relus.deleteRule("40%") //删除之前动画样式
      relus.deleteRule("60%")
      relus.deleteRule("100%")
      
      relus.appendRule(`40% { width: ${ randomWordsLen / 2 }em; }`) //停顿一段时间
      relus.appendRule(`60% { width: ${ randomWordsLen / 2 }em; }`) //停顿一段时间
      relus.appendRule(`100% { width: 0`) 
    }
}
···
```

主要的代码如上，打印document样式表中，`@keyframe tying`的 `CSSRule` 也始终保持一个。同时一言并发的限制，接口报错时也不会影响到页面的渲染。
![avatar](/images/keyframe.png)

偶然一次发现typing效果首次没有执行，排查发现vitepress中Home组件为AsyncComponent, 在onMounted的时候 #header-random-words可能还没挂载 (正常是子组件挂载完之后再执行父组件的onMounted)。框架内部的事件不好处理，就只能将这部分打字的功能封装成组件，在组件的onMounted里面调用接口、渲染。

### 2. 读取本地md文件，生成SideBar数据时，VitePress中defineConfig不能声明为异步方法
VitePress默认会读取.vitepress/theme/index.js作为入口文件，支持开发者进行主题修改。文件.vitepress/theme/config.js也提供进行默认主题的配置，包括设置header，导航(nva)，侧边栏(sidebar)等，配置的参数可以通过vitepress.useData.theme读取到。

vitepress官方提供了[两种方式修改config配置](https://vitepress.vuejs.org/guide/configuration.html#overview)
```js
//1. CMD导出为JS对象
module.exports = {
  title: 'Hello VitePress',
  description: 'Just playing around.'
}
```
```js
//2. ESM导出带类型的为JS对象或者方法
const config = {
  // ...
}

export default config

//2. ESM导出带类型的为JS对象或者方法
import { defineConfig } from 'vitepress'

export default defineConfig({
  // ...
})
```

开始考虑到实现读取本地md文件生成sidbar数据需要用到ES6的async/await方法，就选了第二种方法。在方法的外层标识为async后development环境能正常执行，build时报 `await is only valid in async functions and the top level bodies of modules`

npm组件的包默认都是输出CMD的文件格式，通过配置`"type": "module"`可以输出ESM的格式。查看vitepress项目package.json的配置，输出的是为CMD的JS文件。虽然vitepress官方提供了EMS module和defineConfig()方法搭配使用的配置方式。

```sh
.
├─ docs
│  ├─ .vitepress
│  │  ├─ theme
│  │  │  └─ index.js
│  │  └─ config.js
│  └─ index.md
└─ package.json
```

### 3. Vue3-Aplayer的CMD包入参包含window, VitePress编译不通过
vitepress build模式下需要通过node进行渲染，而此时node环境没有window，document等DOM对象。对于一些NPM上的CMD包，没办法直接进行
  
  Error ERR_REQUIRE_ESM: require() of ES Module *** not supported. [#476](https://github.com/vuejs/vitepress/issues/476)

### 4. Swiper.min.css编译不通过


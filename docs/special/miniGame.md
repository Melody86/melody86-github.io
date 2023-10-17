---
date: 
title: 小游戏开发
tags:
  - Hilo
  - egret
describe: 
---

# 营销类游戏项目

## Hilo

[Hilo](http://hiloteam.github.io/Hilo/docs/api-zh/index.html) 是阿里在16年左右推出的跨端互动游戏框架，目前已经停止维护。因为当时零售部门提供了较多营销游戏模板，为快速迭代满足业务短期需求，故在原有Hilo框架模板上进行自定义开发。后因模板开发方式陈旧不适合多人开发，且有不少框架问题，决定选用其他框架。详细对比可参考其博客的介绍：[HTML5游戏引擎深度测评](https://www.jianshu.com/p/0469cd7b1711)

简单说下自己的看法。对比Hilo, cocos2d-js, egret三者，稍复杂点的游戏建议还是用egert进行。cocos2d-js 偏向于C++，且[文档](https://docs.cocos2d-x.org/api-ref/js/V3.13/)对前端开发不够友好。egret基于ts开发，提供了较多可视化工具。按上面测试博客所说，市场上58%的游戏都是基于egret开发的。[VueEgret](https://hsuna.github.io/vue-egret/example/)将egret与vue相结合的方式也值得借鉴，这将大幅提升开发效率。

### 1. H5适配

游戏部分采用Hilo框架实现，通过canvas渲染，为方便开发，部分结果、排行等弹窗由H5实现。

游戏通过flexible进行移动端适配，IOS下根据dpr计算viewport下的scale (scale=1/dpr)达到适配的效果, 因为android厂商对dpr进行了修改，flexible对安卓的兼容性不好，就统一当成dpr=1处理。

其他说明

<span style="color: rgb(71, 101, 130); font-size:0.9em">1. amfe-flexible适配方案为[过渡方案](https://github.com/amfe/article/issues/17)官方已经停止维护，
[vw/vh](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)兼容性已经完善，推荐用这种方式。<br>
2. 开发过程中遇到长短屏，做元素适配时可参考 [手机屏幕尺寸大全](https://www.strerr.com/screen.html)</span>

flexible的适配方式就是将屏幕分成100份，1rem = 10a。项目中flexible2.0.0与[amfe-flexible](https://github.com/amfe/lib-flexible/tree/master) 仓库中版本有细微差异。 取的是html标签的getBoundingClientRect宽度计算对应fontSize的大小。对于750的设计稿 RemUnit = 750 / 100 = 7.5，那么对于实际的设备按比例计算，他应该设置的fontSize大小就为：

```js
 let t = window.document.getElementsByTagName('html')[0].getBoundingClientRect().width
 rem = t / 7.5 （屏幕宽度 t/dpr > 750时，按750算）
 // iphoneX下 t = 1125, rem = 150px
```
**因此对于设计师给的设计稿，切换到750px的标准像素模式下，取切图的0.01倍数即为对应rem的值。** 根据这样的规则即可进行H5的开发。

### 2. Hilo适配

游戏部分通过Hilo.Stage构建舞台实例，实际将一个canvas挂在在DOM节点下面。默认情况下stage的宽高是canvas的宽高，为统一显示效果, 设置canvas宽为750px，高度按比例缩放，通过Hilo.Stage构造函数中的scaleX、scaleY对canvas进行整体缩放，以正常显示在window中。

```js
//Games/RocketRush/www/js/index.js
 stage = this.stage = new Hilo.Stage({
        renderType: 'canvas',
        container: document.querySelector('#js-game-wrap'),
        width: this.width,
        height: canvasH,
        scaleX: window.innerWidth / this.width,
        scaleY: window.innerHeight / this.height,
})

// Hilo/build/amd/hilo/renderer/CanvasRender.js
if (scaleX != 1 || scaleY != 1) ctx.scale(scaleX, scaleY);

```
**因此对于设计师给的设计稿，切换到750px的标准像素模式下，取切图的像素值即为对应Hilo.stage中元素大小的值。** 根据这样的规则即可进行Hilo中适配开发。

<span style="color: red">⚠️注意：</span><br>
APP中会添加顶部导航栏，iphoneX以后版本因为底部没有物理返回键，在公众号中会默认添加虚拟返回键部分。注意在不同dpr设备下高度的适配。

目前UI给的图片一般是2倍、3倍图，按2倍图的标准添加到项目中即可。

### 3. 缓存
因为打包未配置文件hash，当遇到缓存无法难以清理时，可在资源路径的后面拼接参数进行验证，如
`https://.../www/images/home/homeBg.jpg?isPax=Y` <br>拼接参数后： <br>
`https://.../www/images/home/homeBg.jpg?isPax=Y&time=124`


## 安全
所谓“道高一尺魔高一丈”，尽管是月活突破5亿的微信跳一跳小游戏在git上面也能搜到很多的破解代码。目前我们做的游戏大多是基于微信浏览器，且设置了一定的门槛，包括登录用户，降低奖品吸引力。但是仍有玩家企图通过刷分来薅羊毛，主要方式包括：篡改接口数据，模拟用户操作这两种方式。第一种方式的防范措施主要是增强游戏前端与后台的数据交互，以及用户登录的校验。第二种对于裸奔的H5，尽管打包压缩之后，还是可以在模拟器上分析到代码进行修改，或者应用图像分析的一些方法模拟游戏运行。已知android及小程序可以调用原生方法拦截到截屏事件，可以进行相应的处理，但是H5上还是没有好的方案。

<!-- todo -->
[WebAssembly](https://www.wasm.com.cn/) 能够将C/C++/Go/Rust等语言实现的代码编译为浏览器可执行的机器码，大多的APP加密方案都是通过原生加密进行通信的，是否可以通过 WebAssembly 将这部分加密或原生库编译为wasm的文件，进而提升性能和安全性，是一个比较有意义的事情。

### 关于视频加密

偶然一次想在Netflix上截图，发现都是黑屏时，再搜索相关的原因和实现方式上发现，奈飞用的是W3C的 [Encrypted Media Extensions(EME)](https://www.w3.org/TR/encrypted-media/)加密媒体扩展技术。 初步了解，这种技术只对媒体类的流有效，没办法对营销类游戏(canvas/opengl)进行加工。
---
date: 2021-05-17
title: CSS
tags:
  - CSS
describe: css
---
## display: none; visibility: hidden; opacity:0;

1. `display:none;` 隐藏后改变页面布局，不可添加点击事件，transition无效

2. `visibility:hidden;`  不改变页面布局，不可添加点击事件，transition无效

3. `opacity:0;`  不改变页面布局，可添加点击事件，transition有效

        transition    transition-propert | transition-duration | transition-timing-function | transition-delay 
        渡效果的 CSS 属性的名称 | 完成过渡效果耗时 | 速度曲线 | 何时开始; 默认值：all 0 ease 0

## ShadowDOM

在页面上经常能看到 `#shadow-root`的标签，这其实是[ShadowDOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)的一个根节点。在通过Element.attachShadow()创建shadowRoot时设置mode为close，则外部无法通过JS这个元素并进行操作，这样就可以将一个内部实现隐藏的、独立的DOM添加到宿主元素上。比如常见的video标签。

![avatar](/images/shadow-dom-video.png)

shadow-dom主要包含下面几个部分。
![avatar](/images/shadow-dom.png)

##  link 与 @import 的区别

- link 是HTML方式， @import 是CSS方式
- link 最大限度支持并行下载， @import 过多嵌套导致串行下载，出现浏览器样式闪烁 FOUC
- link 可以通过 rel="alternate stylesheet" 指定候选样式
- 浏览器对 link 支持早于 @import ，可以使用 @import 对老浏览器隐藏样式
- @import 必须在样式规则之前，可以在css文件中引用其他文件

总体来说：link优于@import。 `FOCU: 文档样式短暂失效(Flash of Unstyled Content)`

## CSS盒子模型

- W3C模型 (标准模型)
  - width = content, height = content
  - box-sizing: content-box
- IE模型
  - width = padding+broder+content
  - box-sizing: border-box

## JS如何设置、获取盒模型对应的宽和高
- 方式一：通过`DOM`节点的 `style` 样式获取
```js
element.style.width/height;
```
> 缺点：通过这种方式，只能获取**行内样式**，不能获取`内嵌`的样式和`外链`的样式。

- 方式二（通用型）
```js
window.getComputedStyle(element).width/height;
```
> 方式二能兼容 `Chrome`、火狐。是通用型方式。

- 方式三（IE独有的）

```javascript
element.currentStyle.width/height;
```
> 和方式二相同，但这种方式只有IE独有。获取到的即时运行完之后的宽高（三种css样式都可以获取）。

- 方式四
```javascript
element.getBoundingClientRect().width/height;
```
> 此 `api` 的作用是：获取一个元素的绝对位置。绝对位置是视窗 `viewport` 左上角的绝对位置。此 `api` 可以拿到四个属性：`left`、`top`、`width`、`height`。

## CSS选择器
- id选择器 #id
- 类选择器 .class
- 标签选择器 div, h1, p
- 相邻选择器 h1 + p
- 子选择器 ul > li
- 后代选择器 li a
- 通配符选择器 *
- 属性选择器 a[rel='external']
- 伪类选择器 a:hover, li:nth-child

## CSS优先级算法

- 优先级就近原则，同权重情况下样式定义最近者为准
- 载入样式以最后载入的定位为准
- 优先级为: !important > id > class > tag important 比 内联优先级高

## BFC

[BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)块级格式上下文(Block Formatting Context)，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

1. 下列方式会创建块格式化上下文：

  - 根元素（`<html></html>`）
  - 浮动元素（元素的 float 不是 none）
  - 绝对定位元素（元素的 position 为 absolute 或 fixed）
  - 行内块元素（元素的 display 为 inline-block）
  - overflow 计算值(Computed)不为 visible 的块元素
  - display 值为 flow-root 的元素       //无副作用BFC，创建一个上下文，里面将进行 flow layout
  - contain 值为 layout、content 或 paint 的元素
  - 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
  ...

2. 概述:
  - 内部的box会在垂直方向上，一个接一个的放置
  - Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻box的margin会发生重叠
  - BFC区域不会与float box重叠
  - BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
  
3. 应用:
  - 利用BFC避免margin重叠，外层用div包裹
  - 清除浮动：overflow: hidden

**清除浮动**

创建一个会包含这个浮动的 BFC，通常的做法是设置父元素 overflow: auto 或者设置其他的非默认的 overflow: visible 的值。可能会出现一些不需要的东西，比如滚动条或者一些剪切的阴影。也可以使用 display: flow-root (兼容性)

**外边距合并**

块的上外边距(margin-top)和下外边距(margin-bottom)有时合并(折叠)为单个边距，其大小为单个边距的最大值(或如果它们相等，则仅为其中一个).

    有三种情况会形成外边距重叠:
    1. 同一层相邻元素之间
    2. 没有内容将父元素和子元素分开
    3. 空的块级元素
## CSS 垂直居中

* 单行文本：line-height 和 height高度设置成一样;

* 已知高度的块级子元素，采用绝对定位和负边距

```css
.container {
  position: relative;
}
.vertical {
  height: 300px;  /*子元素高度*/
  position: absolute;
  top:50%;  /*父元素高度50%*/
  margin-top: -150px; /*自身高度一半*/
}
```
* 未知高度的块级父子元素居中，模拟表格布局
* 缺点：IE67不兼容，父级 overflow：hidden 失效
 
```css
.container {
      display: table;
    }
    .content {
      display: table-cell;
      vertical-align: middle;
    }

```
    
* 新增 inline-block 兄弟元素，设置 vertical-align
   - 缺点：需要增加额外标签，IE67不兼容
   
```css
.container {
  height: 100%; /*定义父级高度，作为参考*/
}
.extra .vertical{
  display: inline-block;  /*行内块显示*/
  vertical-align: middle; /*垂直居中*/
}
.extra {
  height: 100%; /*设置新增元素高度为100%*/
}
```
* 绝对定位配合 CSS3 位移

```css
.vertical {
  position: absolute;
  top: 50%;  /*父元素高度50%*/
  transform: translateY(-50%, -50%);
}
```

* CSS3弹性盒模型

```css
.container {
  display:flex;
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
}
```

## Flex布局
CSS 弹性盒子布局
1. 属性
   
   flex、flex-grow、flex-basis、flex-shrink、flex-direction、order<br>
   flex-wrap（换行）、flex-flow( flex-direction 和 flex-wrap 的简写)
2. flex: 1
```css
    flex: 2             //  一个值, 无单位数字: flex-grow
    flex: 10px          //  一个值, width/height: flex-basis
    flex: 1 30px;       //  两个值: flex-grow | flex-basis
    flex: 1 1 100px;    //  三个值: flex-grow | flex-shrink | flex-basis

    flex-grow: 负值无效，指定了flex容器中剩余空间的多少应该分配给项目（flex增长系数）
    flex-shrink: 负值无效, 指定了 flex 元素的收缩规则,
    flex-basis: 若值为0，则必须加上单位，以免被视作伸缩性。省略时默认值为 0。(初始值为 auto). 指定了 flex 元素在主轴方向上的初始大小
    
```

## css效果 
常见问题及解决方案：https://github.com/Mmzer/think/issues/3#onepx

1. 多行文本省略

```css
    /* 单行 */
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    /* 部分浏览器还需要加上width属性 */

    /* 多行 */
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
```
2. margin: auto
```css
margin: auto
 /* 上边 | 左边右边 | 下边 */
margin: 1em auto 2em;
 /* auto指平分剩余空间   
    只设置了左侧为auto,那么父元素剩余的空间都会分给左侧,就实现了float:right */
```
3. 三角形
  
```css
/* 把上、左、右三条边隐藏掉（颜色设为 transparent）*/
 #demo {
   width: 0;
   height: 0;
   border-width: 20px;
   border-style: solid;
   border-color: transparent transparent red transparent;
 }
```

## 其他

- 比较大的JS、CSS文件会丢进磁盘，反之丢进内存；内存使用率比较高的时候，文件优先进入磁盘

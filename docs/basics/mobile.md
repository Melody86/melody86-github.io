---
date: 2021-05-17
title: 移动端
tags:
  - mobile
describe: 移动端
---

参考阅读 https://github.com/amfe/article/issues/17

# 像素
- 物理像素/设备像素 (<**dp**: device pixels[android], **pt**: device pixels[IOS])
 
    屏幕出厂时设置好的像素点, 和屏幕尺寸大小有关，单位pt。

- 设备独立像素(density-independent pixel)
  
  也称为密度无关像素

- DPI (Dots Per Inch) 
  
  最早用来描述打印机性能，表示打印机最多能用多少个墨点来打印一寸的内容，值越高，打印出来的东西越清晰锐利

- PPI (Pixels Per Inch)
  
  每寸能够容纳多少颗像素，用于描述屏幕的像素密度。这里的像素指的是设备的物理像素，是一个物理单位。<br>
  计算方法是：对角线上设备像素个数 / 对角线的英尺长度

- DPR (Device Pixel Ratio) 设备像素比
  
  设备像素比 = 设备像素 / 设备独立像素<br>
  在Retina屏的iphone上，DPR为2，即1个css像素相当于2个物理像素<br>
  可通过window.devicePixelRatio获取<br>
  css中，可通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询


- CSS像素
  
  指 CSS 样式代码中使用的逻辑像素，在 CSS 规范中，长度单位可以分为两类，绝对(absolute)单位以及相对(relative)单位。px 是一个相对单位，相对的是设备像素(device pixel)


# ViewPort

浏览器中网站可见内容部分，视口外的内容在被滚动进来之前都是不可见的。

**layout viewport** [浏览器默认viewport]:   window.clientWidth/document.documentElement.clientWidth/document.body.clientWidth  <br>
**visual viewport** [浏览器可视区域大小]:    window.innerWidth/   <br>
**ideal viewport** [理想viewport]: 没有一个固定的尺寸，不同的设备拥有有不同的 ideal viewport。

## meta标签对ideal viewport进行设置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<!-- width 和 initial scale不一致时, 浏览器会取当中较大的那个 -->
<!-- 两者各有一个小缺陷，就是iphone、ipad以及IE 会横竖屏不分，通通以竖屏的ideal viewport宽度为准. 最完美的写法应该是，两者都写上去，initial-scale=1 解决了 iphone、ipad的毛病，width=device-width则解决了IE的毛病 -->
```

# Flexible.js
移动端自适应中除了，1. vw/vh， 2. 百分比，3. 媒体查询外，主要就是通过REM进行适配。
https://github.com/amfe/lib-flexible

    官方说明：由于viewport单位  得到众多浏览器的兼容，lib-flexible这个过渡方案已经可以放弃使用...
    这里的viewport单位指的就是vw、vh， flexible方案就是模仿这种方案，因为早些时候 vw还没有得到很好的兼容。

    vw缺陷
    - px转换成 vw不一定能完全整除，因此有一定的像素差。

    - 比如当容器使用 vw， margin采用 px时，很容易造成整体宽度超过 100vw，从而影响布局效果。当然我们也是可以避免的，例如使用 padding代替 margin，结合 calc()函数使用等等
  
  **Vue中vw适配方案**：https://www.w3cplus.com/mobile/vw-layout-in-vue.html

```js
// 源码就这么多，慢慢看吧

(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
```
将设计稿中的各元素的px转换成rem

    目前Flexible会将视觉稿分成100份（主要为了以后能更好的兼容vh和vw），而每一份被称为一个单位a。同时1rem单位被认定为10a。针对我们这份视觉稿可以计算出：
    1a = 7.5px
    1rem = 75px
    那么我们这个示例的稿子就分成了10a，也就是整个宽度为10rem，对应的font-size为75px

# 移动端 1px问题
PC端中viewport就是浏览器窗口的宽高，css中1px一般对应电脑屏幕的1个物理像素。移动端1个css像素可能对应1px、2px、3px物理像素。

实现方法：

1. background-image
   ```css
    div{
        -moz-border-image:url(/i/border.png) 30 30 stretch; /* Old Firefox */
        -webkit-border-image:url(border.png) 30 30 stretch; /* Safari 5 */
        -o-border-image:url(border.png) 30 30 stretch; /* Opera */
        border-image:url(border.png) 30 30 stretch;
    }
    /* 优点：可以设置单条、多条表框。缺点：更换颜色和样式麻烦，某些设备上会模糊。 */
   ```
2. background-image
   ```css
   .background-image-1px {
        background: url(../img/line.png) repeat-x left bottom;
        -webkit-background-size: 100% 1px; background-size: 100% 1px;
    }
   ```
3. box-shadow模拟边框
   ```css
   .box-shadow-1px {
        box-shadow: inset 0px -1px 1px -1px #c8c7cc;
    }
    /* 优点：代码少，兼容性好。缺点：边框有阴影，颜色变浅 */
   ```
4. 伪元素+transform
   构建1个伪元素, border为1px, 再以transform缩放到50%。
   ```css
    /* 设计稿是750,采用1：100的比例,font-size为100*(100vw/750) */
    .border-1px {
        position: relative;
    }
    @media screen and (-webkit-min-device-pixel-ratio: 2) {
        .border-1px:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }

    优点：可以满足所有场景，且修改灵活。缺点：对于已使用伪类的元素要多层嵌套。
    ```

5. JS计算rem基准值和viewport缩放值

```js
/* 设计稿是750,采用1：100的比例,font-size为100 * (docEl.clientWidth * dpr / 750) */
var dpr, rem, scale;
var docEl = document.documentElement;
var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]');
dpr = window.devicePixelRatio || 1;
rem = 100 * (docEl.clientWidth * dpr / 750);
scale = 1 / dpr;
// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
// 设置data-dpr属性，留作的css hack之用，解决图片模糊问题和1px细线问题
docEl.setAttribute('data-dpr', dpr);
// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
```

6. 小数写px值
   ```css
   .border { border: 1px solid #999 }
    @media screen and (-webkit-min-device-pixel-ratio: 2) {
        .border { border: 0.5px solid #999 }
    }
    @media screen and (-webkit-min-device-pixel-ratio: 3) {
        .border { border: 0.333333px solid #999 }
    }
    /* IOS8下已经支持带小数的px值, media query对应devicePixelRatio有个查询值-webkit-min-device-pixel-ratio, css可以写成这样 */
   ```



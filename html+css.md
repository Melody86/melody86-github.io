参考阅读 https://github.com/amfe/article/issues/17

# 像素
- 物理像素/设备像素 (<font color="green">dp</font>: device pixels[android], <font color="green">pt</font>: device pixels[IOS])
 
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

# BFC
https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context

块级格式上下文(Block Formatting Context)，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

    下列方式会创建块格式化上下文：

    根元素（<html>）
    浮动元素（元素的 float 不是 none）
    绝对定位元素（元素的 position 为 absolute 或 fixed）
    行内块元素（元素的 display 为 inline-block）
    overflow 计算值(Computed)不为 visible 的块元素
    display 值为 flow-root 的元素       //无副作用BFC，创建一个上下文，里面将进行 flow layout
    contain 值为 layout、content 或 paint 的元素
    弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
    ...

**清除浮动**
创建一个会包含这个浮动的 BFC，通常的做法是设置父元素 overflow: auto 或者设置其他的非默认的 overflow: visible 的值。可能会出现一些不需要的东西，比如滚动条或者一些剪切的阴影。也可以使用 display: flow-root (兼容性)

**外边距合并**
块的上外边距(margin-top)和下外边距(margin-bottom)有时合并(折叠)为单个边距，其大小为单个边距的最大值(或如果它们相等，则仅为其中一个).

    有三种情况会形成外边距重叠:
    1. 同一层相邻元素之间
    2. 没有内容将父元素和子元素分开
    3. 空的块级元素

# Flex布局
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

# css效果 
https://github.com/Mmzer/think/issues/3#onepx
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
    /* 上边 | 左边右边 | 下边 */
    margin: 1em auto 2em;
    /* auto指平分剩余空间   
       只设置了左侧为auto,那么父元素剩余的空间都会分给左侧,就实现了float:right */

   ```


# setTimeout、setInterval、requestAnimationFrame

setInterval()和setTimeout()共享同一个ID池，并且clearInterval()和clearTimeout()在技术上是可互换使用的。

向setInterval()传递一个方法或者函数的时候，需要注意this指针的问题。
```js
let myArray = ['zero', 'one', 'two'];

myArray.myMethod = function (sProperty) {
    alert(arguments.length > 0 ? this[sProperty] : this);
};

myArray.myMethod();     // 输出 "zero,one,two"
myArray.myMethod(1);    // 输出 "one"
setTimeout(myArray.myMethod, 1000);         // 1S后输出 "[object Window]"
setTimeout(myArray.myMethod, 1500, "1");    // 1.5S后输出 "undefined"

// 开始我们想通过.call绑定this指向myArray对象，从而使得myArray.myMethod中this指针能够指向myArray
// 而setTimeout内部的this本应该指向window对象，this指向被修改后setTimeout执行报错
setTimeout.call(myArray, myArray.myMethod, 2000);    // 报错 Uncaught TypeError: Illegal invocation
setTimeout.call(myArray, myArray.myMethod, 2500, 2); // 报错 Uncaught TypeError: Illegal invocation

// 方法1：改写window.setTimeout和setInterval，当入参为回调函数时重新绑定this指针

var __nativeST__ = window.setTimeout, __nativeSI__ = window.setInterval;

window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
  var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeST__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};

window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
  var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeSI__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};

setTimeout(alert, 1500, 'Hello world!');                // 原来的调用方式功能正常
setTimeout.call(myArray, myArray.myMethod, 2000);       // 2S后输出 "zero,one,two"
setTimeout.call(myArray, myArray.myMethod, 2500, 2);    // 2.5S后输出 "two"

// 方法2  Function.prototype.bind() 


// 方法3 箭头函数 
setTimeout((a)=>{
    myArray.myMethod(a)
}, 1000, 1)             // 1S后输出 "one"

```
[MiniDaemon：一个用于管理定时器的小框架](https://github.com/madmurphy/minidaemon.js)

requestAnimationFrame

告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。为了提高性能和电池寿命，因此在大多数浏览器里，当requestAnimationFrame() 运行在后台标签页或者隐藏的`<iframe>` 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。

**ref:**

[HTML - Web application APIs](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

[ECMAScript - Jobs and Job Queues](https://tc39.es/ecma262/#sec-jobs-and-job-queues)

[从event loop规范探究javaScript异步及浏览器更新渲染时机 - 杨敬卓](https://github.com/aooy/blog/issues/5)
---
date: 2021-05-17
title: 浏览器
tags:
  - browser
describe: browser
---

## 事件代理
如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上
```html
<ul id="ul">
	<li>1</li>
    <li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
</ul>
<script>
	let ul = document.querySelector('##ul')
	ul.addEventListener('click', (event) => {
		console.log(event.target);
	})
</script>
```

事件代理的方式相对于直接给目标注册事件来说，有以下优点

  - 节省内存
  - 不需要给子节点注销事件

## JS运行机制

### 浏览器内核
默认每个Tab页面一个进程，互不影响，控制页面渲染，脚本执行，事件处理等（有时候会优化，如多个空白tab会合并成一个进程
Chrome浏览器为每个tab页面单独启用进程，因此每个tab网页都有由其独立的渲染引擎实例。
一个浏览器通常由以下常驻线程组成：
- GUI 渲染线程
- JavaScript引擎线程
- 定时触发器线程
- 事件触发线程
- 异步http请求线程


#### GUI 渲染线程
GUI渲染线程负责渲染浏览器界面HTML元素,当界面需要重绘(Repaint)或由于某种操作引发回流(reflow)时,
该线程就会执行。在Javascript引擎运行脚本期间,GUI渲染线程都是处于挂起状态

#### JavaScript引擎线程
Javascript引擎，也可以称为JS内核，主要负责处理Javascript脚本程序，例如V8引擎。
Javascript引擎线程理所当然是负责解析Javascript脚本，运行代码。
  
    GUI 渲染线程 与 JavaScript引擎线程互斥
    为了防止渲染出现不可预期的结果，浏览器设置GUI渲染线程与JavaScript引擎为互斥的关系，
    当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到引擎线程空闲时立即被执行。

#### 定时触发器线程
浏览器定时计数器并不是由JavaScript引擎计数的, 因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确, 因此通过单独线程来计时并触发定时是更为合理的方案。

#### 事件触发线程
当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理。这些事件可以是当前执行的代码块如定时任务、也可来自浏览器内核的其他线程如鼠标点击、AJAX异步请求等，但由于JS的单线程关系所有这些事件都得排队等待JS引擎处理。
#### 异步http请求线程
XMLHttpRequest在连接后是通过浏览器新开一个线程请求， 将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件放到 JavaScript引擎的处理队列中等待处理。


## 非I/O的异步API setTimeout()、setInterval()、process.nextTick()、setImmediate()
    setTimeout()和setInterval()与浏览器中的API是一致的，分别用于单次和多次定时执行任务。

    调用setTimeout()和setInterval()创建的定时器会被插入到定时器观察者内部的一个红黑树中，每次Tick执行时，会从该红黑树中迭代取出定时器对象，检查是否超过定时时间，如果超过，就形成一个时间，它的回调函数将立即执行。

    弊端：

    1）并非精确的（在容忍范围内）。尽管事件循环十分快，但是如果某一次循环占用的时间较多，那么下次循环时，它也许已经超时很久了。譬如通过setTimeout()设定一个任务在10毫秒后执行，但是在9毫秒后，有一个任务占用了5毫秒的CPU时间片，再次轮到定时器执行时，时间已经过期4毫秒。

    2）采用定时器需要动用红黑树，创建定时器对象和迭代等操作，而setTimeout(fn,0)的方式较为浪费性能。使用红黑树的操作时间复杂度为O(lg(n))

一个进程就是一个程序的实例 (操作系统创建内存，用来存放代码、运行中数据和一个执行任务的主线程)，线程是不能单独存在的，它是由进程来启动和管理的。

进程中任意一线程执行错误，都会导致整个进程的崩溃。线程之间共享进程中的数据。进程隔离是为保护操作系统中进程互不干扰的技术，每一个进程只能访问自己占有的数据。

早在2007年之前，市面上浏览器都是单进程的，问题：不稳定、不流畅、不安全。后进入多进程浏览器时代。

## JS事件循环 Event Loop
![avatar](/images/event-loop.png)

JS引擎执行顺序
- script脚本当做第一个宏任务开始顺序执行，将代码分为 “同步任务”、“异步任务”;
- 同步任务会直接进入主线程依次执行；
- 异步任务会再分为宏任务和微任务；
- 宏任务进入到Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中；
- 微任务(优先执行)也会进入到另一个Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中；
- 当主线程内的任务执行完毕，主线程(script中同步任务)为空时，会检查**微任务**的Event Queue，如果有任务，就全部执行，如果没有就执行下一个**宏任务**；
- 上述过程会不断重复，这就是Event Loop事件循环；

      只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。

宏任务(宿主: 浏览器/node环境、会触发新一轮Tick)
  1. script (可以理解为外层同步代码)
  2. setTimeout/setInterval
  3. UI rendering/UI事件(用户点击事件)
  4. postMessage，MessageChannel
  5. setImmediate，I/O（Node.js）

微任务(JS引擎发起)
  1. Promise
  2. MutaionObserver
  3. Object.observe（已废弃；Proxy 对象替代）
  4. process.nextTick（Node.js）

## 4. setTimeout、setInterval、requestAnimationFrame

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

1. 外部css 文件的加载会阻塞 dom解析 么？会阻塞渲染么？

    既不会阻塞解析，也不会阻塞渲染(chrome观察得出)
    但延迟加载的css会导致样式重新计算，从而导致 无样式闪烁 问题。

    默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。
    css不阻塞 dom 解析，但是阻塞渲染。按照 google 的文档阐述是这样的，在 domcontentloaded 之前不会执行渲染，因为这个事件标志着 dom 和 cssom 的完成，然后才会开始构建 render tree。
    
    浏览器并不是css外部链接并不会阻塞浏览器的渲染，但是会阻塞文档的 loaded，以及出现样式闪烁。


从event loop规范探究javaScript异步及浏览器更新渲染时机 https://github.com/aooy/blog/issues/5


- 进程：CPU资源分配最小单位，可包含多个线程
- 线程：CPU调度的最小单位，同进程下的线程共享程序的内存空间
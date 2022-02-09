---
date: 2021-05-17
title: 
tags:
  - 
describe: 
---
# Render11111

## 1.JS数据类型分类
### 1.1 分类
基本数据类型: String、Boolean、undefine、null、Number、Symbol

引用数据类型: Object, 包括Function、Array、Object
### 1.2 差异
基本数据类型: 存储在栈中; 函数传参方式是数值副本，修改内部值不影响外部传递的参数变量;

引用数据类型: 存储在堆内存(引用地址存储于栈中); 函数传参方式是引用地址值，修改内部值会影响外部传递的参数变量;

## 2.数据类型的判断

### 2.1 typeof

typeof返回表示数据类型的字符串, 不能判断null, array等。返回结果包括：number、boolean、string、symbol、object、undefined、function等7种数据类型。

`typeof null === 'object' // true`

### 2.2 instanceof

instanceof 测试一个对象在其原型链中是否存在一个构造函数的prototype属性，不能检测null, undefined。

语法：A instanceof B

    判断规则：沿着A的_proto_属性这条线来找，同时沿着B的prototype属性这条线，若果两条线能找到同一个引用，即 同一个对象，则返回true。

- `__proto__是每个对象都有的属性, 构造器的原型, 即__proto__===constructor.prototype`
- `prototype是函数才有的属性`

### 2.3 constructor

constructor作用和instanceof非常相似。但constructor检测 Object与instanceof不一样，还可以处理基本数据类型的检测。

不稳定，在重写的过程中很有可能出现把之前的constructor给覆盖了，这样检测出来的结果就是不准确的。

### 2.4 Object.prototype.toString.call

Object.prototype.toString.call() 是最准确最常用的方式。

## 3.浅拷贝、深拷贝

- 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。

      浅拷贝的实现方式
        Object.assign()：需注意的是目标对象只有一层的时候，是深拷贝
        Array.prototype.concat()
        Array.prototype.slice()

- 深拷贝就是在拷贝数据的时候，将数据的所有引用结构都拷贝一份。简单的说就是，在内存中存在两个数据结构完全相同又相互独立的数据，将引用型类型进行复制，而不是只复制其引用关系。
  
    深拷贝的实现方式：

      热门的函数库lodash，也有提供_.cloneDeep用来做深拷贝
      jquery 提供一个$.extend可以用来做深拷贝
      JSON.parse(JSON.stringify())
      手写递归方法

## 4. 作用域

JavaScript 代码执行过程中，需要先做**变量提升**，而之所以需要实现变量提升，是因为JavaScript 代码在执行之前需要先编译。

在**编译阶段**，变量和函数会被存放到变量环境中，变量的默认值会被设置为undefined；

在代码**执行阶段**，JavaScript 引擎会从变量环境中去查找自定义的变量和函数。

如果在编译阶段，存在两个相同的函数，那么最终存放在变量环境中的是最后定义的那个，这是因为后定义的会覆盖掉之前定义的。

### 执行上下文和执行栈
**执行上下文**：是 JavaScript 执行一段代码时的运行环境，在执行上下文中存在一个变量环境的对象（Viriable Environment），该对象中保存了变量提升的内容。

    1. 当 JavaScript 执行全局代码的时候，会编译全局代码并创建全局执行上下文，而且在整个页面的生存周期内，全局执行上下文只有一份。
    2. 当调用一个函数的时候，函数体内的代码会被编译，并创建函数执行上下文，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁。
    3. 当使用 eval 函数的时候，eval 的代码也会被编译，并创建执行上下文。

  
    创建执行上下文过程中：
      变量环境：函数内部通过 var 声明的变量，在编译阶段全都被存放到变量环境里面。
      词法环境：通过let 声明的变量，在编译阶段会被存放到词法环境（Lexical Environment）中。
  

**执行栈**：调用栈是 JavaScript 引擎追踪函数执行的一个机制。

一段代码如果定义了两个相同名字的函数，那么最终生效的是最后一个函数。

    如果有形参，先给形参赋值。进行私有作用域中的预解释，函数声明优先级比变量声明高，最后后者会被前者所覆盖，但是可以重新赋值私有作用域中的代码从上到下执行

### 作用域
作用域就是变量与函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期。

类型: 全局作用域、函数作用域、块级作用域(ES6)
- 全局作用域中的对象在代码中的任何地方都能访问，其生命周期伴随着页面的生命周期。
- 函数作用域就是在函数内部定义的变量或者函数，并且定义的变量或者函数只能在函数内部被访问。函数执行结束之后，函数内部定义的变量会被销毁。
- 块级作用域 ES6通过引入let和const关键字使JavaScript也能像其他语言一样拥有了块级作用域，解决了变量提升所带来的问题。

### 作用域链
作用域查找变量的链条称为作用域链；作用域链是通过词法作用域来确定的，而词法作用域反映了代码的结构。

**每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，我们把这个外部引用称为outer。**

外部引用跟函数调用没有关系，仅跟函数定义时的位置。如下面代码中 bar函数和foo函数的outer引用都指向了全局上下文。
```js
function bar(){
  console.log(myName);
}
function foo(){
  var myName = 'Lilei';
  bar();
  console.log(myName);
}
var myName='Wangwu';
foo();
```

当一段代码使用了一个变量时，JavaScript 引擎首先会在“当前的执行上下文”中查找该变量(**`对于块级作用域：词法环境->变量环境->outer词法环境->outer变量环境...`**)，如果在当前的变量环境中没有查找到，那么JavaScript 引擎会继续在 outer 所指向的执行上下文中查找。

## 5. 闭包
在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存。在内存中，我们就把这些变量的集合称为闭包。

    **MDN**: 
    一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），
    这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。
    在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

### 作用
- 使用闭包可以访问函数中的变量。
- 可以使变量长期保存在内存中，生命周期比较长。
  
### 回收
闭包不能滥用，否则会导致内存泄露，影响网页的性能。闭包使用完了后，要立即释放资源，将引用变量指向null。

    通常，如果引用闭包的函数是一个全局变量，那么闭包会一直存在直到页面关闭；但如果这个闭包以后不再使用的话，就会造成内存泄漏。
    如果引用闭包的函数是个局部变量，等函数销毁后，在下次 JavaScript 引擎执行垃圾回收时，
      判断闭包这块内容如果已经不再被使用了，那么 JavaScript 引擎的垃圾回收器就会回收这块内存。
    
如果该闭包会一直使用，那么它可以作为全局变量而存在；但如果使用频率不高，而且占用内存又比较大的话，那就尽量让它成为一个局部变量。

## 6. this指针
this指向是在创建函数上下文的时候创建的，也就是执行的时候。所以this永远都是指向调用它的那个对象。
    
    当函数作为构造函数使用时，在构造函数中使用this，则this指向的是通过构造函数创建出来的新的对象。
    当函数作为方法调用时，this指向全局对象window。

- 浏览器环境中: 
  - 严格模式下:    this指向undefined
  - 非严格模式下:  this指向window
- node环境中:   this指向global
- 箭头函数没有自己的this, 看其外层

**对于用户自定义的方法** 所有的函数调用都可以转换成apply或call的形式

    obj.child.method(p1, p2) 等价于 obj.child.method.call(obj.child, p1, p2)
    非严格模式：foo(p1,p2)     等价于 foo.call( window, p1, p2)
    严格模式：foo(p1,p2)       等价于 foo.call( undefined, p1, p2)

**JS内置的全局方法** 如setTimeout，不论是setTimeout()还是window.setTimeout()形式的调用，回调函数内部的this都会指向window

**另外** 
- setTimeout(fn,1000)中的fn中的this，永远都是指向window对象，无论是否严格模式。
- 回调函数中，this指向的是（（调用该回调函数）的函数）的调用对象<br>
  例如:`$("button").click( fn )` // fn里如果有this，指向的是button的DOM对象

## 7. JS运行机制

### 7.1 浏览器内核
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

### 7.2 JS事件循环
![avatar](https://cdn.nlark.com/yuque/0/2019/png/202915/1554359044585-d8824196-cb82-498f-af7d-5e04a5489bd9.png)

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

### 非I/O的异步API setTimeout()、setInterval()、process.nextTick()、setImmediate()
    setTimeout()和setInterval()与浏览器中的API是一致的，分别用于单次和多次定时执行任务。

    调用setTimeout()和setInterval()创建的定时器会被插入到定时器观察者内部的一个红黑树中，每次Tick执行时，会从该红黑树中迭代取出定时器对象，检查是否超过定时时间，如果超过，就形成一个时间，它的回调函数将立即执行。

    弊端：

    1）并非精确的（在容忍范围内）。尽管事件循环十分快，但是如果某一次循环占用的时间较多，那么下次循环时，它也许已经超时很久了。譬如通过setTimeout()设定一个任务在10毫秒后执行，但是在9毫秒后，有一个任务占用了5毫秒的CPU时间片，再次轮到定时器执行时，时间已经过期4毫秒。

    2）采用定时器需要动用红黑树，创建定时器对象和迭代等操作，而setTimeout(fn,0)的方式较为浪费性能。使用红黑树的操作时间复杂度为O(lg(n))

一个进程就是一个程序的实例 (操作系统创建内存，用来存放代码、运行中数据和一个执行任务的主线程)，线程是不能单独存在的，它是由进程来启动和管理的。

进程中任意一线程执行错误，都会导致整个进程的崩溃。线程之间共享进程中的数据。进程隔离是为保护操作系统中进程互不干扰的技术，每一个进程只能访问自己占有的数据。

早在2007年之前，市面上浏览器都是单进程的，问题：不稳定、不流畅、不安全。后进入多进程浏览器时代。



非对称加密的主要用途就是：密钥交换和数字签名
数字签名的作用主要是：确保发送的报文没有被篡改
非对称加密主要应用在密钥协商阶段，协商好密钥之后的通信就用对称加密了

<!-- 
@param total	必需。初始值, 或者计算结束后的返回值。
@param currentValue	必需。当前元素
@param currentIndex	可选。当前元素的索引
@param arr	可选。当前元素所属的数组对象。
@param initialValue	可选。传递给函数的初始值 
-->

原地修改nums数组

Aarray.reduce(function(total, currentValue, currentIndex, arr), initialValue) :方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。


## 函数柯里化

柯里化(Curring)，把接受多个参数的函数变成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数并且返回结果的新函数.

作用：参数复用、提前确认、延迟执行

```js
function curry(y){
  return function(x){
    return x-y
  }
}

curry(1)(4)   // 3
```

柯里化通用封装方法
```js
// 两个入参的柯里化函数 初步封装
var currying = function(fn){
  let _this = this;
  let argfn = Array.prototype.slice.call(arguments, 1);
  return function(){
    let args = argfn.concat(Array.prototype.slice.call(arguments));
    return fn.apply(_this, args);
  }
}


//支持多参数, 参数个数大于fn的入参个数时，递归柯里化
function curry(fn, ...args1) {
  return function(...args2) {
    const args = args1.concat(args2)
    if (args.length < fn.length) {
      return curry(fn, ...args)
    } else {
      return fn(...args)
    }
  }
}
function add(a, b, c) {
  return a + b + c
}
const curr = curry(add)
```

curry性能问题：

    1. 存取arguments对象通常要比存取命名参数要慢一点
    2. 一些老版本的浏览器在arguments.length的实现上是相当慢的
    3. 使用fn.apply( … ) 和 fn.call( … )通常比直接调用fn( … ) 稍微慢点
    4. 创建大量嵌套作用域和闭包函数会带来花销，无论是在内存还是速度上
   
    大部分应用中，主要的性能瓶颈是在操作DOM节点上，这js的性能损耗基本是可以忽略不计的，所以curry是可以直接放心的使用


QA:
 
1. 看代码执行输出
```js
let date = new Date();
 setTimeout(()=>{
     console.log(new Date() - date);  
},1000)
let a = 0;
while((new Date()-date)<3000){
     a++;
}
```

link: 

1. https://zhuanlan.zhihu.com/p/33167655
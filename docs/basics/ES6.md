---
date: 2021-05-17
title: ES6
tags:
  - ES6
describe: ES6
---

# ES6

## 1. let 和 const

ES5 只有全局作用域和函数作用域

下面变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

```js
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 6

//另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc

```

ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。

- ES6 允许块级作用域的任意嵌套。
- ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
- 允许在块级作用域内声明函数。函数声明类似于var，即会提升到全局作用域或函数作用域的头部。同时，函数声明还会提升到所在的块级作用域的头部。

const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

- ES5 只有两种声明变量的方法：var命令和function命令
- ES6 var, function, let, const, import, class

```js
// let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

```

###

## 2. Promise对象

## 3. Proxy

## 4. Async

```js
// QA:
// 实现delay函数逻辑，并打印出test返回值 1000
async function test() {
  console.log(1);
  const time = await delay(1000);
  console.log(2);
  return time;
}

// 实现：
async function delay(time){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log(1000)
            resolve()
        }, 1000);

    })
}
```

## 5. Class

## 6. Module

[前端模块化（AMD、CommonJS、UMD）总结](https://zhuanlan.zhihu.com/p/75980415)

## QA

1.  如何自己实现let?
  方式1：通过变量保存状态

  方式2：try-catch
  ```js
  for(var i = 0 ; i < 10 ; i++){
    try {
        throw i;
    } catch (e) {
        setTimeout(()=>{
            console.log(e)
        })
    }
  } 
  // try-catch伪造的块级作用域存在于catch里，其中e是一个有着类似于块级作用域变量的特性的独立变量
  // 他不是i，所以能够保留下i的状态的变化
  ```
  方式3：自执行函数

  方式4：map,forEach (通过map、 forEach保存状态)
  ```js
    for(var i = 0 ; i < 10 ; i++){
      [i].map((i)=>{
          setTimeout(()=>{
              console.log(i);
          })
      });
      [i].forEach((i) => {
          setTimeout(()=>{
              console.log(i);
          })
      });
  ```

**非循环中实现**
```js
  var name = 'World!';
  (function () {
      if (typeof name === 'undefined') {
          var name = 'Jack';  //立即执行函数内变量提升
          console.log('Goodbye ' + name);
      }else{
          console.log('Hello ' + name);
      }
  })()
  /* 立即执行函数 var name = 'Jack'; 内变量提升，输出 Goodbye Jack，实际执行顺序如下: */

  `use strict`
  var name = 'World!';

  (function () {

    if (typeof name === 'undefined') {     
        let name = 'Jack';     
        console.log('Goodbye ' + name);

    }else{
        console.log('Hello ' + name); 
    }

  })()

  /* let声明，没有变量提升, 输出 Hello World */
```
**简单的polyfill版本**

[知乎 polyfill](https://zhuanlan.zhihu.com/p/71640183)
```js
  `use strict`
  var name = 'World!';

  (function () {

    if (typeof name === 'undefined') {

        (function(){
            var name = 'Jack';
            console.log('Goodbye ' + name);
        })()

    }else{

        console.log('Hello ' + name);

    }

  })()
```

1. diff 算法为什么要从两边向中间比对，深度还是广度
2. nodejs 适合什么场景
3. compositionAPI和mixins的区别
4. vue3做了哪些优化
5. http2 二进制帧


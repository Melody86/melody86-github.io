# <center> 基础汇总2 </center>

### 7.3 Async和Await
async function 用于申明一个 function 是异步的； await，用于等待一个异步方法执行完成；async/await是一个用同步思维解决异步问题的方案。

async函数返回的是一个Promise。如果一个async函数的返回值不是promise，那么它将会被隐式地包装在一个promise中，可以使用then方法添加回调函数。如果没有在async函数中写return,那么promise对象resolve的值就是undefined

await 后面接 expression, 返回值为expression的值。await表达式会暂停整个async函数的执行进程并出让其控制权。当await后面的函数为promise时，要等resolve或reject返回之后才会恢复进程，promise返回值会作为await表达式的返回结果。当await后面的函数无返回值时表达式结果为undefined。如果函数体内有一个await表达式，async函数就一定会异步执行。在await表达式之后的代码可以被认为是存在在链式调用的then回调中，多个await表达式都将加入链式调用的then回调中，返回值将作为最后一个then回调的返回值

### 7.5 Promise
promise是一个对象，是异步编程的一种解决方案，通过链式调用解决回调地狱问题。

每个promise有三种状态，pending等待态,fulfilled成功态，rejected失败态。一个 promise 对象只能改变一次。无论成功还是失败，都会有一个结果数据。成功的结果数据一般称为 value，而失败的一般称为 reason。

**手写promise**
```js
function myPromise(exector){
  const self = this;
  this.state = 'pending';   // promise状态
  this.value;               //promise的值
  this.onFullfilledCb = []; //存储then方法中注册的回调函数(第一个参数)
  this.onRejectedCb = [];   //存储then方法中注册的回调函数(第二个参数)
  this.reason = '';         //失败原因

  try{
    exector(resolve, reject); // exector(resolve.bind(this), reject.bind(this))
  }cacth((e)=>{
    reject(e);
  });
  
  //成功执行
  function resolve(value){
    if(self.state === 'pending'){   //用bind之后,可使用this
      self.state = 'fullfilled';
      self.value = value;
      self.onFullfilledCb.forEach((fn)=>{ fn() })
    }
  }
  //失败执行
  function reject(e){
    if(self.state === 'pending'){
      self.state = 'rejected';
      self.reason = e;
      self.onRejectedCb.forEach((fn)=>{ fn(e) })
    }
  }
  
}

```
**手写 Promise.then**
```js
myPromise.prototype.then = function(onFullfiled, onRejected){
  const self = this;
  if(this.state === 'fullfiled'){
    onFullfiled(self.value);
  }
  if(this.state === 'rejected'){
    onRejected(self.reason);
  }
  if(this.state === 'pending'){
    this.onFullfilledCb.push(()=>{ onFullfiled(self.value )});
    this.onRejected.push(()=>{ onRejectedCb(self.reason )});
  }
  
}
```
**手写Promise.all**

```js
myPromise.prototype.all = function(promiseArray){
  return new myPromise((resolve, reject)=>{
    let resultCount = 0;
    let resultArray = new Array(promiseArray.length);

    for(var i=0; i<promise.length; i++){
      promise[i].then(res=>{
        resultCount++;
        resultArray[i] = res;
        if(resultCount === promise.length){
          resolve(resultArray);
        }
      }, error=>{reject(error)})
    }
  })
}
```

### 7.6 原型链与继承
#### 7.6.1 构造函数constructor
每个类都有一个默认无参的构造函数，初始化该类(new)的时候，先走构造函数，用于初始化成员变量和方法。

    在构造函数中使用时，super关键字将单独出现，并且必须在使用this关键字之前使用。
    super关键字也可以用来调用父对象上的函数。
    默认无参构造函数时, JS会自动在第一行添加super()函数，可以不用手动添加；
    自定义构造函数时，需要手动调用super函数, 否则会报错。

构造函数分为 实例成员 和 静态成员
- 实例成员：实例成员就是在构造函数内部，通过this添加的成员。实例成员只能通过实例化的对象来访问。
- 静态成员：在构造函数本身上添加的成员，只能通过构造函数来访问。

构造函数.prototype ==> 实例原型
实例原型.constructor ==> 构造函数

```js
function Star(name,age) {
  this.name = name; //实例成员
  this.age = age;   //实例成员
}
//静态成员
Star.sex = '女';
```
**new一个新对象的过程，发生了什么？**

    (1) 创建空对象 son {}
    (2) 准备原型链连接son.__proto__ = Father.prototype
    (3) 重新绑定this，使构造函数的this指向新对象Father.call(this)
    (4) 为新对象属性赋值son.name
    (5) 返回this return this，此时的新对象就拥有了构造函数的方法和属性了

#### 7.6.2 原型

每一个javascript对象(除null外)创建的时候，都会与之关联另一个对象（父类对象），这个父类对象就是我们所说的原型，每一个对象都会从原型中“继承”属性。

    MDN:
      每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。
      原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。
      这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

- **对象的原型prototype** 【可以通过Object.getPrototypeOf(obj)或obj.__proto__获得】是每个实例都有的属性<br>
- **构造函数的prototype属性** 是构造函数的属性。JS实现类，是在 “...在对象实例和它的构造器之间建立一个链接（它是__proto__属性，是从构造函数的prototype属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。”(MDN)

JS中，每个函数都有一个prototype属性，这个属性指向函数的原型对象。

\__proto__ 是每个对象都有的属性, 大多数情况下，\__proto__可以理解为“构造器的原型”，但是通过 Object.create()创建的对象有可能不是， Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
```js
  __proto__ === constructor.prototype

  let a1 = { a: 1 };
  let a2 = Object.create(a1);
  console.log("a2.__proto__:", a2.__proto__); //Object {a: 1}
  console.log(a2.__proto__ === a1.constructor.prototype); //false
  let a3 = Object.create(a1.__proto__);
  console.log("a3.__proto__",a3.__proto__); 
  console.log(a3.__proto__ === a1.constructor.prototype); //true
```
#### 7.6.3 原型链
原型与原型之间通过__proto__层层串起来的直到Object.prototype.__proto__为null的链叫做原型链

![avatar](https://upload-images.jianshu.io/upload_images/1490251-3089c135df71c956.png?imageMogr2/auto-orient/strip|imageView2/2/w/604/format/webp)

#### 7.6.4 继承
继承方式

原型链继承、构造函数继承、原型链+借用构造函数的组合继承、ES6中class 的继承、组合继承优化1、组合继承优化2

- 1. 原型链继承
  
  Student.prototype = new Person() // 子类型的原型为父类型的一个实例对象

  特点：父类新增原型方法/原型属性，子类都能访问到; 简单，易于实现;

  缺点: 
    - 无法实现多继承; 
    - 来自原型对象的所有属性被所有实例共享
    - 创建子类实例时，无法向父类构造函数传参
    - 要想为子类新增属性和方法，必须要在Student.prototype = new Person() 之后执行，不能放到构造器中

- 2. 构造函数继承
  ```js 
  function Student(name, age, price) {
    Person.call(this, name, age)  //在子类型构造函数中通用call()调用父类型构造函数
    ...
  }
  ```
  特点：
  - 解决了原型链继承中子类实例共享父类引用属性的问题
  - 创建子类实例时，可以向父类传递参数
  - 可以实现多继承(call多个父类对象)

  缺点：
  - 实例并不是父类的实例，只是子类的实例
  - 只能继承父类的实例属性和方法，不能继承原型属性和方法
  - 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能


- 3. 原型链+借用构造函数的组合继承
  ```js
  function Person (name, age) {
  this.name = name,
  this.age = age,
  this.setAge = function () { }
  }
  Person.prototype.setAge = function () {
    console.log("111")
  }
  function Student (name, age, price) {
    Person.call(this, name, age)
    this.price = price
    this.setScore = function () { }
  }
  Student.prototype = new Person()
  Student.prototype.constructor = Student//组合继承也是需要修复构造函数指向的
  Student.prototype.sayHello = function () { }
  var s1 = new Student('Tom', 20, 15000)
  var s2 = new Student('Jack', 22, 14000)
  console.log(s1)
  console.log(s1.constructor) //Student
  console.log(p1.constructor) //Person    
  ```
  优点：
  - 可以继承实例属性/方法，也可以继承原型属性/方法
  - 不存在引用属性共享问题
  - 可传参
  - 函数可复用
  
  缺点：
  - 调用了两次父类构造函数，生成了两份实例

### 7.7 bind、apply、call

call、apply(第二个参数是一个参数数组)、bind都是改变this指向的方法。call、apply立即调用，bind返回绑定函数。

注意异常处理、fn = this找到要执行的函数、返回函数执行结果

**手写 apply**
```js
Function.prototype._Apply = function (content = window, args = []) {//给content和args添加默认值
  if (!(args instanceof Object)) {// 如果第二个参数不是对象的实例,就返回一个错误
      throw new TypeError('Create List From Array Like called on non-object');
  }
  const fn = Symbol();  //指定唯一属性，防止delete删除错误
  // 显示绑定函数this
  content.fn = this;
  // 执行fn方法,并接受返回值
  const res = arguments[1] ? content.fn(...arguments[1]) : content.fn()
  delete content.fn;// 删除fn方法
  return res
}
```
**手写 call**
```js
Function.prototype.Call = function(content=window){// 给执行上下文 添加默认值
  const fn = Symbol();  //指定唯一属性，防止delete删除错误
  content.fn = this//给 content 添加一个方法指向this；显示绑定this
  // 获取第一个参数以后的所有参数
  const args = Array.from(arguments).slice(1);
  // 调用上下文的fn属性, 此时函数的this指向上下文, 也就是我们传入的content
  const res = arguments.length > 1 ? content.fn(...args) : content.fn();
  // 删除上下文的content的fn方法, 避免污染上下文
  delete content.fn;
  return res
} 

注意: 参数拼接、返回函数<br>
new调用时this为fn的实例，否则fn执行上下文为入参context<br>
关联返回函数的原型, 避免在this上直接操作

```
**手写 bind**
```js
Function.prototype.bind = function() {
  var args = Array.prototype.slice.call(arguments);
  var context = args.splice(0,1)[0];
  var fn = this;
  var temp = function() {};
  var res =  function() {
      let rest = Array.prototype.slice.call(arguments);
      // 如果new被调用, new绑定this优先级高, this应该指向fn的实例 
      // new运算符时 因为维护过原型，所以this既是temp的实例，也是fn的实例
      return fn.apply(this instanceof temp ? this : context, args.concat(rest));
  }
  //维护res的原型, 避免直接在this上操作
  if(this.prototype) {
      temp.prototype = this.prototype;
  }
  res.prototype = new temp();
  return res;
}
```

**手写 new**

new 操作运算符
- 创建一个新的对象
- 继承父类原型上的方法.
- 添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
- 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。

```js
function _new(fn,...rest){
  //基于fn的prototype构建对象的原型
  const thisObj = Object.create(fn.prototype);
  //将thisObj作为fn的this，继承其属性，并获取返回结果为result
  const result = fn.apply(thisObj,rest);
  //根据result对象的类型决定返回结果, result 通过Object.create创建是Object的实例
  // 正常规定,如何fn返回的是null或undefined(也就是不返回内容),我们返回的是obj,否则返回 result
  return result instanceof Object ? result : thisObj;
  // 或者用下面方式判断
  // const isObject = typeof res === "object" && res !== null;
  // const isFunction = typeof res === "function";
  // return isObject || isFunction ? res : obj;
}
```
**手写 instanceof**

```js
const myInstanceof = (left, right) => {
  if (typeof left !== "object" || left === null) {
    return false;
  }
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
};
```

## 8. 函数节流和防抖
为了解决函数高频率触发，浏览器无法正常响应的情况。
[可视化](http://demo.nimius.net/debounce_throttle/)

### 8.1 防抖 (debounce)
函数防抖，就是指触发时间后在规定时间内函数只能执行一次，如果在规定时间内又触发了事件，则会重新计算函数执行时间。

**实现**
```js
function debounce(fn, delay){
  let timer;
  return function(){
    clearTimeout(timer);  //触发函数时, 重置
    timer = setTimeout(()=>{
      fn.apply(this, arguments);
    }, delay)
  }
}
```

应用场景
(连续事件触发一次)
- 搜索框搜索输入。只需用户最后一次输入完，再发送请求
- 手机号、邮箱验证输入检测
- 窗口大小Resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

### 8.2 节流(throttle)
限制一个函数在规定时间内只能执行一次。即连续触发事件时，在 n 秒中只执行一次函数。

**实现**
```js
function throttle(fn, delay){
  let isAvaliabed = true;
  return function(){
    const self = this;
    if(self.isAvaliabed){
      self.isAvaliabed = false;
      setTimeout(()=>{
        fn.bind(self, arguments);
        self.isAvaliabled = true;
      }, delay)
    }
  }
}
```

应用场景

- 滚动加载，加载更多或滚动底部监听
- 谷歌搜索框，搜索联想功能
- 高频点击提交，表单重复提交。

### 8.3 其他
- 块级： div p ul li form h
- 行内： em span a strong label
- W3C模型：width = content； IE模型：width = padding+broder+content
- 比较大的JS、CSS文件会丢进磁盘，反之丢进内存；内存使用率比较高的时候，文件优先进入磁盘；

  BFC(block formatting context) 块级格式化上下文
  内部的box会在垂直方向上，一个接一个的放置
  Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻box的margin会发生重叠
  BFC区域不会与float box重叠
  BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。

  利用BFC避免margin重叠，外层用div包裹
  清除浮动：overflow: hidden

- 进程：CPU资源分配最小单位，可包含多个线程
- 线程：CPU调度的最小单位，同进程下的线程共享程序的内存空间

sort排序需要指定入参 nums.sort((a,b)=>{return a-b}), 直接在nums上进行排序

## JS 手写
// 类数组转化为数组

```js
const toArr = (likeArr) => {
  const a1 = Array.from(likeArr);
  const a2 = Array.prototype.slice.call(likeArr);
  const a3 = [...likeArr];
  const a4 = Array.prototype.concat.apply([], likeArr);
};
```
// 函数珂里化
```js
function add(...args) {
  const totalArgs = [...args];
  function f(...args2) {
    totalArgs.push(...args2);
    return f;
  }
  f.toString = () => {
    return totalArgs.reduce((prev, curr) => prev + curr, 0);
  };
  return f;
}
// console.log(add(1, 2, 3)(4)(5).toString());
```

// 图片懒加载
```js
function lazyload() {
  const imgs = document.querySelectorAll("img");
  // 视口高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeight =
    document.documentElement.scrollTop || document.body.scrollTop;
  // 整个页面高度
  // document.documentElement.scrollHeight
  for (let i = 0; i < imgs.length; i++) {
    const offsetTop = imgs[i].offsetTop;
    if (offsetTop < viewHeight + scrollHeight) {
      imgs[i].src = imgs[i].dataset.src;
    }
  }
}
```

## 手写 Promise

```js
// 三种状态 不可逆
const ENUM = {
    PENDING: 'pending',
    FULLFILLED: 'fullfilled',
    REJECTED: 'rejected',
}
class myPromise{
    constructor(exector){
        this.status = ENUM.PENDING; //状态标识
        this.value = undefined;     //成功返回值
        this.reason = undefined;    //失败说明
        this.onRejectedCb = [];     //成功回调数组
        this.onFullFilledCb = [];   //失败回调数组

        try{
            exector(resolve, reject);
        }catch(e){
            this.reason = e;
            this.status = ENUM.REJECTED;
            reject(e);
        }
        const resolve = (value)=>{
            if(this.status === ENUM.PENDING){
                this.value = value;
                this.status = ENUM.FULLFILLED;
                //依次执行成功状态回调函数
                this.onFullFilledCb.forEach((cb)=>{
                    cb(this.value);
                })
            }
        }
        const reject = (reason)=>{
            if(this.status === ENUM.PENDING){
                this.reason = reason;
                this.status = ENUM.REJECTED;
                //依次执行失败状态回调函数
                this.onRejectedCb.forEach((cb)=>{
                    cb(this.reason);
                })
            }
        }
    }
} 

// Promise.then实现
// then方法传入两个参数 onFulfilled, onRejected
myPromise.prototype.then = function(onFulfilled, onRejected){
    //入参异常处理
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
        typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason);
            };

    // 保存this
    const self = this;
    return new myPromise((resolve, reject) => {
      if (self.status === ENUM.PENDING) {
        self.onFullFilledCb.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(self.value);
              result instanceof myPromise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
        self.onRejectedCb.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(self.reason);
              result instanceof myPromise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
      } else if (self.status === ENUM.FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(self.value);
            result instanceof myPromise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      } else if (self.status === ENUM.REJECTED) {
        try {
          setTimeout(() => {
            const result = onRejected(self.reason);
            result instanceof myPromise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      }
    });
}
myPromise.prototype.all = function(arrList){
  //入参异常处理
  if (!Array.isArray(arrList)) {
      const type = typeof arrList;
      return new TypeError(`TypeError: ${type} ${arrList} is not iterable`)
  }

  return new myPromise((resolve, reject) => {
      const backArr = []
      const count = 0
      const processResultByKey = (value, index) => {
          backArr[index] = value
          if (++count === arrList.length) {
              resolve(backArr)
          }
      }
      for (let i = 0; i < arrList.length; i++) {
          const item = arrList[i];
          if (item && item.then === 'function') {
              item.then((value) => {
                  processResultByKey(value, i)
              }, reject)
          } else {
              processResultByKey(item, i)
          }
      }
  })
}
```

https://codesandbox.io/s/javascript-shouxieti-rfo2c?file=/src/index.js


# QA
1. class P{}; console.log(P.\__proto__)  
    
    每个对象都有\__proto__的属性，大多情况下指向构造函数的原型. <br>
    每个函数都有一个prototype属性，这个属性指向函数的原型对象. <br>
    class实际是function的语法糖, P.__proto__ 实际是Function.prototype. <br>
    
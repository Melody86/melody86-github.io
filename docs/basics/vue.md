---
date: 2021-05-17
title: Vue3、Vue2原理
tags:
  - 
describe: 
---

# vue原理

## 1.生命周期
```js
var vm = new Vue({
  // 选项
})
```

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

通过Function方法实例化对象，执行原型上的 `_init(options)`方法。_init主要执行下面方法，进行：<br>
- initLifecycle 初始化生命周期 (定义周期状态标识: _isMounted, _isDestroyed...)
- initEvents 初始化事件
- initRender 初始化渲染函数
- 执行`beforeCreate`钩子 【data、el未初始化】
- initInjections 初始化injections 
- initState 初始化reactivity; 
        
        设置数据props【数据劫持】、data【数据劫持】、Methods、computed、watcher等。
        定义data数据，方法以及事件，并且完成数据劫持observe以及给组件实例配置watcher观察者实例.
- 执行`create`钩子 【data、el已初始化，但DOM元素未挂载】
    已可以拿到data下的数据以及methods下的方法, 根据权限才能进入的建议在beforeRouteEnter中处理
- 编译模板 
  
        判断入参中是否有el, 没有就等vm.$mount(el)调用; 
        然后再判断是否有template, 有则编译成render函数,否则编译el的outerHTML为template;

- 执行`beforeMount`钩子 
  
        渲染render函数: 生成虚拟VDom->渲染成真实dom->替换vm.$el.
        vm._render创建VNode, vm._update渲染真实DOM.

- 执行Mounted钩子 【DOM元素挂载完成】
- 执行beforeUpdate钩子
- 执行updated钩子
- 执行beforeDestory钩子 
- 执行destoryed钩子

      解除各种数据引用，移除事件监听，删除组件_watcher，删除子实例，删除自身self等

```js
// expose real self
vm._self = vm
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')

...

if (vm.$options.el) {
    vm.$mount(vm.$options.el)
}
```
![avatar](https://cn.vuejs.org/images/lifecycle.png)

**总结**

组件生命周期执行顺序：
  beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、activated、deactivated、beforeDestory、destoryed
    
    - vue先进行生命周期、事件、渲染函数等的初始化;
    - 执行beforeCreate钩子，此时data和el均未初始化，值为undefined;
    - 进行数据劫持、双向绑定;
    - 执行created钩子，此时可以对data进行操作，可进行数据请求将返回的数据赋给data，此时Dom元素el还未初始化;
    - 编译模板，根据是否有el和template进行编译;
    - 执行beforeMount钩子, data和el均已经初始化，但此时el并没有渲染进数据，el的值为“虚拟”的元素节点;
    - 渲染render函数，虚拟dom渲染成真实dom，并替换vm.$el;
    - 执行mounted钩子，此时el已经渲染完成并挂载到实例上，可挂载的dom进行操作
    - beforeUpdate和updated触发时，el中的数据都已经渲染完成，但只有updated钩子被调用时候，组件dom才被更新。
    
**父子组件传值&请求**

在父组件调用接口传递数据给子组件时，接口响应显然是异步的。这会导致无论你在父组件哪个钩子发请求，在子组件哪个钩子接收数据。都是取不到的。当子组件的mounted都执行完之后，此时可能父组件的请求才返回数据。会导致，从父组件传递给子组件的数据是undefined。

- 方案1: 通过v-if对子组件进行条件渲染, 数据的时候在去渲染子组件
- 方案2: 子组件中 watch 监听

## 2. 双向绑定
https://zhuanlan.zhihu.com/p/45081605

观察者模式是一种实现一对多关系解耦的行为设计模式。它主要涉及两个角色：观察目标、观察者。特点：观察者要直接订阅观察目标，观察目标一做出通知，观察者就要进行处理。

双向绑定解决的是如何在数据发生变化时更新视图。一个数据可能对应视图中的多个位置，符合观察者设计模式。因此在问题中，观察者Watcher为视图(render函数)、计算属性(computed)、侦听器(watch)，观察目标Dep为观察者依赖的数据。

![avatar](https://cn.vuejs.org/images/data.png)

### 2.1 实现原理:

数据劫持:
- 使用 Object.defineProperty() 监听对象的属性变化。
- 当属性变化时，触发依赖收集和更新视图。

依赖收集:
- 每个组件实例都有一个 Watcher 观察者实例。
- Watcher 观察者实例会收集所有依赖它的数据属性的 Dep 实例。
- 当数据属性变化时，会通知所有依赖它的 Watcher 观察者实例进行更新。

更新视图:
- Watcher 观察者实例会根据数据变化更新视图。
- Vue.js 提供了多种更新视图的方式，例如 diff 算法和虚拟 DOM。

在执行beforeCreate钩子之后，执行initSate过程中对props进行defineReactive、对data进行observe处理。observer尝试实例化observer对象，递归的对 对象和数组调用defineReactive。每个属性在被执行 defineReactive方法时，都创建了一个dep实例。

在getter函数中进行依赖收集：getter方法相对于dep实例形成了闭包，巧妙的保存了dep实例。当某个观察者函数访问了某个数据，就通过dep实例进行收集。即Dep.target(Watcher)存在时，通过dep.depend()最终将当前watcher添加至subs观察者数组中。
在setter函数中调用dep.notify()进行响应分发。
### 2.2 依赖收集: 

观察者Watcher：视图、计算属性、侦听器; <br>
观察目标Dep：依赖的数据;

+ Dep：数据的属性都会有Dep类实例，它内部有个subs队列，保存着依赖本数据的观察者(依赖数据的Watcher实例)，当数据变化时，调用dep.notify()通知观察者。
+ Watcher：扮演观察者的角色，进行观察者函数的包装处理。如render()函数，会被进行包装成一个Watcher实例。
  - 模板渲染：this._watcher = new Watcher(this, render, this._update)
+ Observer：辅助的可观测类，数组/对象通过它的转化，可成为可观测数据。

常见问题:

- 数组变更无法监听:
  - 无法监听数组的 push、pop、shift 等方法。
  - 可以使用 vm.$set 或 Array.prototype.splice 方法进行监听。
- 对象属性新增或删除无法监听:
  - 可以使用 Vue.set 方法进行监听。

访问对象属性，其取值与赋值操作，都能被Object.defineProperty()成功拦截，但是Object.defineProperty()在处理数组时除了重新赋值一个数组外，其他操作(根据索引赋值、push、pop、shift等)都不能被setter检测到。可以通过vm.$set、Array.splice 响应数组元素和长度的变化

至此，Vue 不能检测以下数组的变动：

    当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
    当你修改数组的长度时，例如：`vm.items.length = newLength`
    push、pop、shift等

defineProperty的缺陷

对象属性新增删除无法检测，导致视图不更新
数组的索引直接设置一个数组项无法检测，例：vm.items[indexOfItem] = newValue，新增索引也无法检测，导致视图不更新
原因如下：

Object.defineProperty 无法检测到对象属性的添加和删除 ，是因为这个方法只能监听已存在的属性。如果要解决可以使用Vue 提供的全局$set ，其本质也是给新增的属性手动 observer。
数组的索引直接设置一个数组项无法检测，并不是defineProperty的锅，而是尤大在设计上对性能的权衡
虽然说索引变更不是 defineProperty的锅，但新增索引的确是 defineProperty做不到的，所以就有了vue对数组的重写方法，还是跟$set一样，手动 observer。
附：vue对数组的重写方法是指：
重新定义数组的push,pop,shift,unshift,splice,sort,reverse方法，调用以上方法时key的订阅者列表会通知订阅者们“值已改变”。如果调用的是push,unshift,splice方法，递归处理新增加的项。

https://blog.csdn.net/yuanfangyoushan/article/details/108962324


vm.$set、Array.splice

  ```js
  // Vue.set
  Vue.set(vm.items, indexOfItem, newValue)

  // Array.prototype.splice
  vm.items.splice(indexOfItem, 1, newValue)

  vm.items.splice(newLength)
  ```

```js
/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}

```

有时你可能需要为已有对象赋值多个新 property，比如使用 Object.assign() 或 _.extend()。但是，这样添加到对象上的新 property 不会触发更新。在这种情况下，你应该用原对象与要混合进去的对象的 property 一起创建一个新的对象。

```js
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

## 3. Vue3、Vue2区别

https://mp.weixin.qq.com/s/dgC6zOkpo1ghyUYS680oWw

Vue3简要变化：利用新的语言特性(es6)、解决架构问题

1. 速度更快
- 重写虚拟 DOM 实现，使用更少内存和更快的 diff 算法。
- 编译模板优化，减少不必要的渲染工作。
  
2. 体积更小
- 通过 tree-shaking 和按需加载，只打包所需的代码。
- 移除了过时的代码和依赖项。
  
3. 更易维护
- 引入 Composition API，提供更灵活的代码组织方式。
- 更好的 TypeScript 支持。
  
4. 更接近原生
-  使用 Proxy 监听数据变化，而不是 Object.defineProperty。
-  更好的浏览器兼容性，包括 IE 11。

5. 更易使用
- 提供了一些新的 API 和语法糖，简化开发体验。

针对架构问题的解决方案：
- 组件化: 鼓励更细粒度的组件开发，提高代码复用性。
- 状态管理: 引入 Vuex 库，帮助管理复杂应用的状态。
- 路由管理: 引入 Vue Router 库，帮助管理应用的路由。

其他重要变化：
- 支持 TypeScript
- 支持 Web Components
- 支持 SSR (服务端渲染)

1. **Object.prototype vs Proxy**

    Object.prototype 
      - 检测不到对象属性的添加和删除<br>
      - 数组API方法无法监听到<br>
      - 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

    Proxy
      - 监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性了

## 4. 组件化
- 全局引入

- 局部引入

Vue.use()

    Vue.use(VueRouter)
    Vue.use(MintUI)
    axios不需要用 Vue.use 就能直接使用，是因为axios没有install. 直接 `import axios from 'axios'`
    如果当前已经注册过组件, 返回当前组件。否则调用组件里面的install方法。

```js
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

## 5. 传值
Vue 中常见的通信方案：
1. 通过 props 传递数据:
- 父组件向子组件传递数据。
- 子组件通过 props 接收数据。
- 适合父子组件之间的数据传递。

2. 通过 $emit 触发自定义事件:
- 子组件向父组件传递数据。
- 子组件通过 $emit 触发自定义事件，并传递数据。
- 父组件通过 $on 监听自定义事件，并接收数据。
- 适合父子组件之间的数据传递。

3. 使用 ref:
- 在父组件中获取子组件的实例。
- 通过子组件实例的属性或方法访问子组件的数据或方法。
- 适合父子组件之间的数据传递，以及需要在父组件中操作子组件的场景。

4. EventBus:
- 组件之间通过一个事件总线进行通信。
- 组件通过 $emit 触发事件，并传递数据。
- 组件通过 $on 监听事件，并接收数据。
- 适合兄弟组件、跨层级组件之间的数据传递。

5. parent 或 root:
- 通过共同祖辈的 $parent 或 $root 属性访问数据。
- 适合父子组件、兄弟组件之间的数据传递，以及需要访问根组件数据的情况。

6. attrs 与 listeners:
- 父组件向子组件传递非 props 的属性。
- 子组件通过 attrs 接收非 props 的属性。
- 父组件向子组件传递事件监听器。
- 子组件通过 listeners 接收事件监听器。
- 适合父子组件之间传递非 props 的数据和事件监听器。

7. Provide 与 Inject:
- 组件之间注入依赖关系。
- Provide 组件提供依赖关系。
- Inject 组件注入依赖关系。
- 适合跨层级组件之间的数据传递，以及需要解耦组件依赖关系的场景。

8. Vuex:
- 集中式状态管理。
- 组件通过 Vuex 访问和修改状态。
- 适合大型应用的状态管理。

## 6.diff算法
https://mp.weixin.qq.com/s/oZKowf4YLsVi67z777VKmA <br>
diff 算法是一种通过同层的树节点进行比较的高效算法

    特点：
        比较只会在同层级进行, 不会跨层级比较
        在diff比较的过程中，循环从两边向中间比较

算法策略：深度优先，同层比较

原理分析：当数据发生改变时，set方法会调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图

当数据发生改变时，订阅者watcher就会调用patch给真实的DOM打补丁

通过isSameVnode进行判断，相同则调用patchVnode方法

patchVnode做了以下操作：

    找到对应的真实dom，称为el
    如果都有都有文本节点且不相等，将el文本节点设置为Vnode的文本节点
    如果oldVnode有子节点而VNode没有，则删除el子节点
    如果oldVnode没有子节点而VNode有，则将VNode的子节点真实化后添加到el
    如果两者都有子节点，则执行updateChildren函数比较子节点

updateChildren主要做了以下操作：

    设置新旧VNode的头尾指针
    新旧头尾指针进行比较，循环向中间靠拢，根据情况调用patchVnode进行patch重复流程、调用createElem创建一个新节点，从哈希表寻找 key一致的VNode 节点再分情况操作

## 7. RealDOM 和 Virtual DOM
Virtual Dom 虚拟DOM：本质上是以JavaScript对象形式存在的DOM的描述。

RealDOM 和 Virtual DOM的区别：
- 虚拟DOM不会进行重排和重绘，而真实DOM会频繁重排与重绘；
- 虚拟 DOM 的总损耗是“虚拟 DOM 增删改+真实 DOM 差异增删改+排版与重绘”，真实 DOM 的总损耗是“真实 DOM 完全增删改+排版与重绘”

| 特性 | 真实 DOM | 虚拟 DOM | 详细说明 |
|---|---|---|---|
| 易用性 | 易用 | 简单方便 | 真实 DOM 可以直接操作，但需要编写大量代码来管理 DOM 元素。虚拟 DOM 使用类似 HTML 的语法来描述 UI，更加直观易懂。 |
| 效率 | 低 | 高 | 真实 DOM 的解析速度慢，内存占用量过高。虚拟 DOM 只是一个轻量级的 JavaScript 对象，占用内存更少，解析速度更快。 |
| 性能 | 差 | 好 | 频繁操作真实 DOM 容易导致重绘与回流，影响性能。虚拟 DOM 可以通过 diff 算法来最小化 DOM 操作的次数，提高性能。 |
| 跨平台 | 否 | 是 | 真实 DOM 是浏览器原生的 API，无法跨平台使用。虚拟 DOM 可以通过 React Native 等框架来实现跨平台开发。 |
| 极致优化 | 可 | 不可 | 真实 DOM 可以进行针对性的极致优化。虚拟 DOM 存在一定的抽象层，无法进行极致优化。 |
| 首次渲染速度 | 快 | 稍慢 | 首次渲染大量 DOM 时，虚拟 DOM 需要进行额外的计算，速度比直接操作真实 DOM 稍慢。 |


# QA 
1. beforeCreate、created、beforeMounted、mounted在父子组件中的执行顺序
   
    **加载渲染过程**: 父组件先创建，然后子组件创建，子组件先挂载，然后父组件挂载<br>
      父beforeCreate -> 父created -> 子beforeCreare -> 子created -> 子beforeMounted -> mounted.<br>
    **更新过程**: 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated.<br>
    **销毁过程**: 父beforeDestory -> 子beforeDestory -> 子destoryed -> 父destoryed.

2. vue能不能监听到数组push的变化？

    由于JavaScript的限制，Vue不能检测数组和对象的变化。对于数组Vue不能响应，利用索引直接设置一个数组项, 以及修改数组长度,push、pop、shift等方法，但是可以通过vm.$set和Array.splice检测变化。

3. 从浏览器返回html到渲染出页面，再到中间涉及到的优化点。DOM和css如何解析，如何渲染出元素？回流和重排怎么优化？
    
    屏幕刷新率60次/秒，每帧的合理耗时应该为: 1 秒/ 60 = 16.66 毫秒，但实际上浏览器还需要进行处理工作，因此每帧的执行耗时应该在10ms内完成，否则会出现抖动。

    - 执行过程: JavaScript -> Style -> Layout -> Paint -> Composite.  绘制Paint，就是填充像素的过程<br>
    - 重排：修改"Layout"属性，也就是改变元素的几何属性(宽度、高度、左侧或顶部位置等)，那么浏览器将必须检查所有其他元素，然后“自动重排”页面。<br>
    - 重绘：修改“paint only”属性(背景图片、文字颜色或阴影等)，即不会影响页面布局的属性，则浏览器会跳过布局，但仍将执行绘制。<br>
    - 合成：如果更改一个既不用重新布局也不用绘制的属性，则浏览器将只进行 合成Composite，例如动画或滚动.
  
     优化:
     - 减少 DOM 操作
     - 使用 CSS 动画代替 JavaScript 动画
     - 延迟加载资源
     - 使用 requestAnimationFrame 进行动画

4. 操作DOM为什么是昂贵的？
   
- JS引擎和DOM渲染引擎共享主线程，两者互斥，JS调用DOM API进行渲染，渲染完之后再执行JS代码，上下文切换时也很耗性能;<br>
- 很多DOM API的读写都频繁涉及到Layout的重排，以确保返回值的准确，之后还会触发页面的重绘;<br>
- 因此 **降低引擎切换频率、减小 DOM 变更规模才是DOM性能优化的关键。**

5. vue2和vue3的响应式能否监听到数组push的变化

Vue2： 无法直接监听数组 push 的变化。
  - 原因：Vue2 使用 Object.defineProperty 监听数据变化，而 Object.defineProperty 无法监听数组的某些变动，例如 push、pop、shift 等方法。
  - 解决方案：
    - 使用 vm.$set 方法修改数组
    - 使用 Array.prototype.splice 方法修改数组
    - 使用第三方库，例如 Vue.js-array-change

Vue3：可以直接监听数组 push 的变化。
  - 原因：Vue3 使用 Proxy 监听数据变化，而 Proxy 可以监听数组的变动。
  - 注意事项：
      - 仍然无法监听数组的某些变动，例如 sort、reverse 等方法
      - 需要使用 reactive 方法将数组转换为响应式对象

https://github.com/aooy/blog/issues/2 解析vue2.0的diff算法
# <center> vue原理 </center>

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
- <font color="green">执行beforeCreate钩子 </font>
- initInjections 初始化injections 
- initState 初始化reactivity; 
        
        设置数据props【数据劫持】、data【数据劫持】、Methods、computed、watcher等。
        定义data数据，方法以及事件，并且完成数据劫持observe以及给组件实例配置watcher观察者实例.
- <font color="green">执行create钩子 </font> 
    已可以拿到data下的数据以及methods下的方法, 根据权限才能进入的建议在beforeRouteEnter中处理
- 编译模板 
  
        判断入参中是否有el, 没有就等vm.$mount(el)调用; 
        然后再判断是否有template, 有则编译成render函数,否则编译el的outerHTML为template;

- <font color="green">执行beforeMount钩子 </font> 
  
        渲染render函数: 生成虚拟VDom->渲染成真实dom->替换vm.$el.
        vm._render创建VNode, vm._update渲染真实DOM.

- <font color="green">执行Mounted钩子 </font> 
- <font color="green">执行beforeUpdate钩子 </font> 
- <font color="green">执行updated钩子 </font> 
- <font color="green">执行beforeDestory钩子 </font> 
- <font color="green">执行destoryed钩子 </font>

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

## 2. 双向绑定
https://zhuanlan.zhihu.com/p/45081605

观察者模式是一种实现一对多关系解耦的行为设计模式。它主要涉及两个角色：观察目标、观察者。特点：观察者要直接订阅观察目标，观察目标一做出通知，观察者就要进行处理。

双向绑定解决的是如何在数据发生变化时更新视图。一个数据可能对应视图中的多个位置，符合观察者设计模式。因此在问题中，观察者Watcher为视图(render函数)、计算属性(computed)、侦听器(watch)，观察目标Dep为观察者依赖的数据。

![avatar](https://cn.vuejs.org/images/data.png)

在执行beforeCreate钩子之后，执行initSate过程中对props进行defineReactive、对data进行observe处理。observer尝试实例化observer对象，递归的对对象和数组调用defineReactive。每个属性在被执行 defineReactive方法时，都创建了一个dep实例。

在getter函数中进行依赖收集：getter方法相对于dep实例形成了闭包，巧妙的保存了dep实例。当某个观察者函数访问了某个数据，就通过dep实例进行收集。即Dep.target(Watcher)存在时，通过dep.depend()最终将当前watcher添加至subs观察者数组中。
在setter函数中调用dep.notify()进行响应分发。



### 2.1 依赖收集: 

观察者Watcher：视图、计算属性、侦听器; <br>
观察目标Dep：依赖的数据;

        Dep：数据的属性都会有Dep类实例，它内部有个subs队列，保存着依赖本数据的观察者(依赖数据的Watcher实例)，当数据变化时，调用dep.notify()通知观察者。
        Watcher：扮演观察者的角色，进行观察者函数的包装处理。如render()函数，会被进行包装成一个Watcher实例。
            - 模板渲染：this._watcher = new Watcher(this, render, this._update)
        Observer：辅助的可观测类，数组/对象通过它的转化，可成为可观测数据。

访问对象属性，其取值与赋值操作，都能被Object.defineProperty()成功拦截，但是Object.defineProperty()在处理数组时除了重新赋值一个数组外，其他操作(根据索引赋值、push、pop、shift等)都不能被setter检测到。Vue在数组的原型链上定义一系列操作方法，以此实现数组变更的检测，即定义一组原型方法`arr.__proto__`指向的那个原型对象上，如果浏览器不支持__proto__，那么就直接挂载在数组对象本身上。

至此，Vue 不能检测以下数组的变动：

    当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
    当你修改数组的长度时，例如：`vm.items.length = newLength`

### 2.2 依赖收集

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

Vue3新特性:
- 速度更快
- 体积减少
- 更易维护
- 更接近原生
- 更易使用

1. 重写虚拟Dom实现
2. 编译模板优化
3. 体积更小
        
        通过webpack的tree-shaking功能，可以将无用模块“剪辑”，仅打包需要的能够tree-shaking，有两大好处：
          对开发人员，能够对vue实现更多其他的功能，而不必担忧整体体积过大
          对使用者，打包出来的包体积变小了
4. 更易维护
   compositon Api

        可与现有的Options API一起使用
        灵活的逻辑组合与复用
        Vue3模块可以和其他框架搭配使用
5. typescript支持
6. 
Vue2 通过Object.defineProperty实现响应式, 不能兼容IE8以下浏览器;

**Object.prototype vs Proxy**
Object.prototype 

    检测不到对象属性的添加和删除
    数组API方法无法监听到
    需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

Proxy

    监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性了

## 4. 组件化
全局引入

局部引入

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
vue中常规的通信方案

    通过 props 传递、 $emit 触发自定义事件
    使用 ref
    EventBus: 兄弟组件传值。兄弟组件通过$emit触发自定义事件，$emit第二个参数为传递的数值。另一个兄弟组件通过$on监听自定义事件
    parent或root：通过共同祖辈$parent或者$root搭建通信侨联
    attrs 与 listeners
    Provide 与 Inject
    Vuex

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
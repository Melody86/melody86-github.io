---
date: 2024-03-13
title: React系列2
tags:
  - 
describe: 
---

[React技术揭秘](https://react.iamkasong.com/preparation/idea.html)

## 1. 受控组件和非受控组件
受控组件：在受控组件中，组件的 state 控制表单元素的值。当用户更改表单元素的值时，会触发一个事件，该事件会更新组件的 state，进而更新表单元素的值。

非受控组件：在非受控组件中，表单元素的值不受组件 state 的控制。表单元素的值由 DOM 自身管理。

在大多数情况下，建议使用受控组件，因为它们具有以下优势：

- 更容易维护
- 更易于测试
- 更易于实现复杂的功能

但是，在某些情况下，使用非受控组件可能更合适，例如：

- 表单元素的值不需要与组件 state 同步
- 需要使用第三方库来控制表单元素

## 2. 高阶函数
高阶函数（Higher-order function），至少满足下列一个条件的函数

- 接受一个或多个函数作为输入
- 输出一个函数
- 
在React中，高阶组件即接受一个或多个组件作为参数并且返回一个组件，本质也就是一个函数，并不是一个组件。高阶组件的这种实现方式，本质上是一个装饰者设计模式

高阶组件的主要功能是封装并分离组件的通用逻辑，让通用逻辑在组件间更好地被复用

但在使用高阶组件的同时，一般遵循一些约定，如下：

- props 保持一致
- 你不能在函数式（无状态）组件上使用 ref 属性，因为它没有实例。如果需要传递refs的话，则使用React.forwardRef
- 不要以任何方式改变原始组件 WrappedComponent
- 透传不相关 props 属性给被包裹的组件 WrappedComponent
- 不要再 render() 方法中使用高阶组件
- 使用 compose 组合高阶组件
- 包装显示名字以便于调试

## 3. [react中组件间过渡动画](https://vue3js.cn/interview/React/animation.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)
在react中实现过渡动画效果会有很多种选择，如react-transition-group，react-motion，Animated，以及原生的CSS都能完成切换动画

在react中，react-transition-group是一种很好的解决方案，其为元素添加enter，enter-active，exit，exit-active这一系列勾子

可以帮助我们方便的实现组件的入场和离场动画

其主要提供了三个主要的组件：

- CSSTransition：在前端开发中，结合 CSS 来完成过渡动画效果
- SwitchTransition：两个组件显示和隐藏切换时，使用该组件
- TransitionGroup：将多个动画组件包裹在其中，一般用于列表中元素的动画

## 4. 前端路由模式
前端路由是指在不刷新页面的情况下，根据用户输入的 URL 跳转到不同的页面或组件。

前端路由有两种主要模式：Hash 模式和 History 模式。

react-router主要分成了几个不同的包：

- react-router: 实现了路由的核心功能
- react-router-dom： 基于 react-router，加入了在浏览器运行环境下的一些功能
- react-router-native：基于 react-router，加入了 react-native 运行环境下的一些功能
- react-router-config: 用于配置静态路由的工具库

BrowserRouter、HashRouter 则是react-router-dom中History模式和Hash模式的API。

| 特性 | Hash 模式 | History 模式 |
|---|---|---|
| 原理 | 利用浏览器的历史记录 API 监听 URL 的哈希部分的变化 | 利用浏览器的历史记录 API push 或 replace 新的 URL 到历史记录中 |
| URL | 带有 # 号 | 不带 # 号 |
| 优点 | 简单易实现，不需要服务器端配置 | URL 美观，支持后退按钮 |
| 缺点 | URL 不美观，不支持后退按钮 | 需要服务器端配置 |
| API 方法 | `window.location.hash` | `window.history.pushState()`、`window.history.replaceState()` |

```js
// Hash 模式:
// 跳转到 /home 页面
window.location.hash = "#home";

// 监听 URL 哈希部分的变化
window.addEventListener("hashchange", () => {
  // 根据哈希部分的值跳转到相应的页面或组件
});
```

```js
// History 模式:
// 跳转到 /home 页面
window.history.pushState({}, "", "/home");

// 监听 URL 变化
window.addEventListener("popstate", () => {
  // 根据新的 URL 来跳转到相应的页面或组件
});
```

为什么Hash模式不支持后退按钮？

浏览器的后退按钮只会影响浏览器的历史记录，而不会影响URL的哈希部分。因此，当用户点击后退按钮时，浏览器只会回到上一个页面，而不会改变URL的哈希部分。

具体来说，Hash 模式下后退按钮不生效的原因有以下几点:

- Hash 值不属于浏览器历史记录的一部分: 浏览器历史记录只记录 URL 的路径和查询参数，而不包括哈希值。因此，当用户点击后退按钮时，浏览器只会根据历史记录中的 URL 来跳转到相应的页面，而不会考虑哈希值的变化。
- Hash 值改变不会触发页面刷新: 当使用 Hash 模式时，改变哈希值不会触发页面的刷新，因此不会更新浏览器的历史记录。这意味着，即使用户点击了后退按钮，浏览器也无法回到之前带有不同哈希值的页面。
- 前端路由库劫持了后退按钮事件: 为了实现前端路由，许多前端路由库会劫持浏览器的后退按钮事件，并根据当前的哈希值来进行相应的跳转。这也就导致了后退按钮无法正常地回到上一个页面。

解决方法:

如果您需要在 Hash 模式下支持后退按钮，可以考虑以下几种方法:

- 使用 window.history.pushState() API: 您可以使用 window.history.pushState() API 来将新的 URL 添加到浏览器的历史记录中，从而使后退按钮能够正常工作。
- 使用自定义后退按钮: 您可以自定义后退按钮的逻辑，使其能够根据哈希值的变化进行相应的跳转。
- 使用带有后退按钮的路由库: 有一些前端路由库，例如 react-router-hash-link，支持在 Hash 模式下使用后退按钮。

## 5.Immutable
Immutable，指的是不可变的数据。在 JavaScript 中，Immutable 对象一旦创建，就不能再被更改。任何对 Immutable 对象的修改都会返回一个新的对象，而原对象保持不变。

对 Immutable对象的任何修改或添加删除操作都会返回一个新的 Immutable对象

Immutable 实现的原理是 Persistent Data Structure（持久化数据结构）:

- 用一种数据结构来保存数据
- 当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会对内存造成浪费

也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变，同时为了避免 deepCopy把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享）

如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享

使用 Immutable 可以带来以下优势：

- 提高性能: Immutable 对象可以避免不必要的渲染，提升 React 应用的性能。
- 简化代码: Immutable 对象提供了简洁的 API 来进行数据操作，使代码更加易读易维护。
- 增强安全性: Immutable 对象可以防止意外的数据修改，提高代码的安全性。

如何使用 Immutable

Immutable.js 是一个用于创建和操作 Immutable 对象的 JavaScript 库。它提供了一系列常用的数据结构，例如 List、Map、Set 等。

```js
// fromJS()：将一个js数据转换为Immutable类型的数据
const obj = Immutable.fromJS({a:'123',b:'234'})

// toJS()：将一个Immutable数据转换为JS类型的数据
// is()：对两个对象进行比较
import { Map, is } from 'immutable'
const map1 = Map({ a: 1, b: 1, c: 1 })
const map2 = Map({ a: 1, b: 1, c: 1 })
map1 === map2   //false
Object.is(map1, map2) // false
is(map1, map2) // true

// get(key)：对数据或对象取值
// getIn([]) ：对嵌套对象或数组取值，传参为数组，表示位置
let abs = Immutable.fromJS({a: {b:2}});
abs.getIn(['a', 'b']) // 2
abs.getIn(['a', 'c']) // 子级没有值

let arr = Immutable.fromJS([1 ,2, 3, {a: 5}]);
arr.getIn([3, 'a']); // 5
arr.getIn([3, 'c']); // 子级没有值
```

Immutable通过is方法则可以完成对比，而无需像一样通过深度比较的方式比较

在使用redux过程中也可以结合Immutable，不使用Immutable前修改一个数据需要做一个深拷贝
```js
import '_' from 'lodash';

const Component = React.createClass({
  getInitialState() {
    return {
      data: { times: 0 }
    }
  },
  handleAdd() {
    let data = _.cloneDeep(this.state.data);
    data.times = data.times + 1;
    this.setState({ data: data });
  }
}

// 使用 Immutable 后
  getInitialState() {
    return {
      data: Map({ times: 0 })
    }
  },
  handleAdd() {
    this.setState({ data: this.state.data.update('times', v => v + 1) });
    // 这时的 times 并不会改变
    console.log(this.state.data.get('times'));
  }
```

## 6. React Render
首先，render函数在react中有两种形式：

在类组件中，指的是render方法：

```js
class Foo extends React.Component {
    render() {
        return <h1> Foo </h1>;
    }
}
```
在函数组件中，指的是函数组件本身：
```js
function Foo() {
    return <h1> Foo </h1>;
}
```
render函数里面可以编写JSX，JSX通过babel编译后转化成React.createElement这种形式，用于生成虚拟DOM，render函数返回的虚拟DOM与旧版本的树进行比较，决定如何更新 DOM 的必要步骤，然后进行 diff 比较，最终转化成真实DOM。

**Render函数触发时机**
- 类组件调用 setState 修改状态
- 函数组件通过useState hook修改状态
- 类组件重新渲染
- 函数组件重新渲染

组件的props 改变了，不一定触发 render 函数的执行，但是如果 props 的值来自于父组件或者祖先组件的 state，父组件或者祖先组件的 state 发生了改变，就会导致子组件的重新渲染。

## 7. React diff
传统的diff算法对两颗树进行一一比对算法复杂度达到O(n^2)，查找完差异后还需计算最小转换方式，最终达到的算法复杂度是O(n^3)。

| 特性 | Vue 2.x | Vue 3.x | React |
|---|---|---|---|
| 比较方式 | 基于树递归的双端对比 | 基于树递归的双端对比+最长递增子序列(减少移动次数) | 基于双指针递归的单端对比 |
| 考虑因素 | 元素的类型、属性、子节点 | 元素的类型、属性、子节点 | 元素的类型、key 属性 |
| 优化 | 无 | 静态提升、批量更新、新的虚拟 DOM | 由于fibre结构，节点只会从左向右移动，不会回退 |
| 性能 | 整体上较快 | 更快 | 在某些情况下更快 |


React、Vue2、Vue3 Diff 算法对比
一、基本概念

Diff 算法： 衡量虚拟 DOM 树差异的核心算法，用于计算更新真实 DOM 所需的最小操作集。
虚拟 DOM： JavaScript 对象表示的 DOM 树，用于抽象真实 DOM。
二、Diff 算法对比

框架	核心策略	优化策略	时间复杂度
React	单端对比	仅向右移动	O(n^2)
Vue2	双端对比	循环、跳过静态节点	O(n)
Vue3	双端对比 + 最长递增子序列	静态节点提升、循环优化	O(n log n)
三、具体对比

1. React
- 第一轮，从左向右新老节点进行比对查找能复用的旧节点，如果有新老节点比对不成功的，则停止这一轮的比对，并记录了停止的位置。
- 如果第一轮比对，能把所有的新节点都比对完毕，则删除旧节点还没进行比对的节点。
- 如果第一轮的比对，没能将所有的新节点都比对完毕，则继续从第一轮比对停止的位置继续开始循环新节点，拿每一个新节点去老节点里面进行查找，有匹配成功的则复用，没匹配成功的则在协调位置的时候打上 Placement 的标记。
- 在所有新节点比对完毕之后，检查还有没有没进行复用的旧节点，如果有，则全部删除。

2. Vue2
- 采用双端对比，从虚拟 DOM 树的头部和尾部同时向中间遍历，比较新旧节点的差异。
- 为了提高效率，Vue2 采用了以下优化策略：
  - 4个快速查找优化策略：[新数组开始, 新数组结尾] 与 [旧数组开始，旧数组结尾]进行组合对比。
  - 当上述优化策略查找不到时，进行循环查找。新数组有剩余节点则新增，旧数组有剩余则删除

3. Vue3
- 在 Vue2 的基础上，Vue3 增加了最长递增子序列算法，进一步提高了 Diff 算法的效率。

Vue3 Diff 算法简短流程：
- 左右比对：
  - 从左往右，相同则更新，不同则记录停止下标。
  - 从右往左，相同则更新，不同则记录停止下标。
  - 锁定复杂部分范围。
- 删除/创建节点：
  - 新节点比对完，删除老节点未比对节点。
  - 老节点比对完，创建新节点未比对节点。
- 复杂情况处理：
  - 新老节点都未比对完：
    - 新节点转为 key-下标 map。
    - 初始化新下标-旧下标数组，默认值 0。
    - 循环旧节点，查找新节点中是否存在：
      - 不存在则删除。
      - 存在则更新 map 和 newIndexToOldIndexMap。
    - 收集新节点下标数组。
    - 查找最长递增子序列。
    - 循环剩余新节点下标：
      - 不在 newIndexToOldIndexMap 中则创建。
      - 在 newIndexToOldIndexMap 中但不在最长递增子序列中则移动。

[React系列](https://vue3js.cn/interview/React/React.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)
[为什么 React 的 Diff 算法不采用 Vue 的双端对比算法](https://juejin.cn/post/7116141318853623839)
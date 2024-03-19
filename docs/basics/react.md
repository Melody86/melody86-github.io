---
date: 2023-10-24
title: react
tags:
  - 
describe: 
---

[React技术揭秘](https://react.iamkasong.com/preparation/idea.html)

## 1. React 的几种常见组件类型

类组件：类组件是使用 ES6 类定义的组件。它们具有状态和生命周期。

函数组件：函数组件是使用 `JavaScript` 函数定义的组件。它们没有状态和生命周期。在hooks出现之前，函数组件是无状态的，通过hooks (useState)也能成为有状态组件。

高阶组件：高阶组件是用于增强其他组件的函数。它们可以用于添加功能、共享逻辑或抽象代码。

Hooks：Hooks 是 React 16.8 中引入的新功能。它们允许在函数组件中使用状态和生命周期。

### hooks
在hooks出现以前，函数组件被称为无状态的组件，只负责渲染的工作。由于函数组件难以重用和共享组件中与状态相关的逻辑。因此在Reac 16.8开始引入了hook，是的函数组件也可以维护自身的状态及做一些逻辑方面的处理。

常见hook
- useState
- useEffect
- useReducer
- useCallback
- useMemo
- useRef

useEffect第一个参数接受一个回调函数，默认情况下，useEffect会在第一次渲染和更新之后都会执行，相当于在componentDidMount和componentDidUpdate两个生命周期函数中执行回调。

useEffect回调函数中可以返回一个清除函数，这是effect可选的清除机制，相当于类组件中componentwillUnmount生命周期函数，可做一些清除副作用的操作。

#### useCallback 和 useMemo 的区别
useCallback 和 useMemo 都是 React 中用于缓存函数或值的 Hook。它们的主要区别在于：

- useCallback 缓存的是函数本身，而 useMemo 缓存的是函数的返回值。
- useCallback 仅在依赖项发生变化时才会重新创建函数，而 useMemo 每次组件重新渲染都会重新计算返回值。

## 2. React 的常用状态管理方案

Redux：Redux 是一个流行的状态管理库。它用于将应用程序的状态存储在一个中央存储库中。

MobX：MobX 是另一个流行的状态管理库。它使用 observable 和 computed 来管理状态。

Context：Context 是 React 16.3 中引入的新功能。它用于在组件之间传递数据。

## 3. React 的路由机制
BrowserRouter：BrowserRouter 是基于浏览器的路由机制。它使用 URL 来确定要显示的组件。

HashRouter：HashRouter 是基于哈希的路由机制。它使用 URL 哈希来确定要显示的组件。

## 4. React 的性能优化技巧

PureComponent：PureComponent 是一个 React 组件，它可以避免不必要的渲染。

shouldComponentUpdate：shouldComponentUpdate 是一个 React 组件的生命周期方法。通过对比 state和 props的变化，可以阻止不必要的渲染。

memo：memo 是一个 React Hook，它可以用于缓存函数的结果，避免不必要的更新，其实也是一个高阶组件， 只能用于函数组件。

## 5. React特性
- JSX 语法
- 单向数据绑定
- 虚拟 DOM
- 声明式编程
  
  声明式编程是一种编程范式，它关注的是描述想要达到的目标，而不是如何实现它。与命令式编程相比，声明式编程更加关注最终状态，而不是中间过程。
  在 React 中，声明式编程体现在以下几个方面：

  使用 JSX 构建 UI
  JSX 是 JavaScript 的语法扩展，它允许使用类似 HTML 的语法来构建 UI。这使得 React 代码更加直观易懂，也更容易维护。

  JSX实际上是一种语法糖，在使用过程中会被babel进行编译转化为JS代码。实际就是为了简化 React.createElement方法。

  使用 state 和 props 来控制 UI
  state 和 props 是 React 组件中用来控制 UI 的两个重要概念。state 是组件内部的数据，props 是从父组件传递给子组件的数据。通过 state 和 props，我们可以动态地更新 UI。

  使用生命周期函数来控制组件行为
  React 组件的生命周期函数允许我们在组件的不同阶段执行特定的代码。这使得我们可以更好地控制组件的行为。
- Component（类组件、函数组件）


## 6. React生命周期

[react16.4+的生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) 可以分成三个阶段：创建阶段、更新阶段、卸载阶段

- 创建阶段：
  
  - constructor
  实例过程中自动调用的方法，在方法内部通过super关键字获取来自父组件的props。在该方法中，通常的操作为初始化state状态或者在this上挂载方法

  - getDerivedStateFromProps
  该方法是新增的生命周期方法，是一个静态的方法，因此不能访问到组件的实例。执行时机：组件创建和更新阶段，不论是props变化还是state变化，也会调用。在每次render方法前调用，第一个参数为即将更新的props，第二个参数为上一个状态的state，可以比较props 和 state来加一些限制条件，防止无用的state更新。该方法需要返回一个新的对象作为新的state或者返回null表示state状态不需要更新

  - render 类组件必须实现的方法，用于渲染DOM结构，可以访问组件state与prop属性。注意： 不要在 render 里面 setState, 否则会触发死循环导致内存崩溃

  - componentDidMount 组件挂载到真实DOM节点后执行，其在render方法之后执行。此方法多用于执行一些数据获取，事件监听等操作

- 更新阶段：该阶段的函数主要为如下方法：

  - getDerivedStateFromProps 介绍同上
  - shouldComponentUpdate 用于告知组件本身基于当前的props和state是否需要重新渲染组件，默认情况返回true。执行时机：到新的props或者state时都会调用，通过返回true或者false告知组件更新与否。一般情况，不建议在该周期方法中进行深层比较，会影响效率。同时也不能调用setState，否则会导致无限循环调用更新
  - render  介绍同上
  - getSnapshotBeforeUpdate 该周期函数在render后执行，执行之时DOM元素还没有被更新。该方法返回的一个Snapshot值，作为componentDidUpdate第三个参数传入。此方法的目的在于获取组件更新前的一些信息，比如组件的滚动位置之类的，在组件更新后可以根据这些信息恢复一些UI视觉上的状态。
  - componentDidUpdate 执行时机：组件更新结束后触发。在该方法中，可以根据前后的props和state的变化做相应的操作，如获取数据，修改DOM样式等。

- 卸载阶段
  - componentWillUnmount 此方法用于组件卸载前，清理一些注册是监听事件，或者取消订阅的网络请求等。一旦一个组件实例被卸载，其不会被再次挂载，而只可能是被重新创建。

## 7. setState
setState是React组件中用于更新state的方法，是一个异步函数，因此不能在 setState 调用之后立即访问更新后的 state，并且setState不能保证state的更新顺序。源码定义如下：
```js
/*
* @params partialState: 对象，或者函数
* @params callback: 回调函数，用于可以实时的获取到更新之后的数据
*/
Component.prototype.setState = function(partialState, callback) {
    invariant(
      typeof partialState === 'object' ||
        typeof partialState === 'function' ||
        partialState == null,
      'setState(...): takes an object of state variables to update or a ' +
        'function which returns an object of state variables.',
    );
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  };
```

React 使用批量更新来提高性能，所以会将多个state更新合并在一起，然后一次性执行它们。
```js
handleClick = () => {
    this.setState({
        count: this.state.count + 1,
    })
    console.log(this.state.count) // 1

    this.setState({
        count: this.state.count + 1,
    })
    console.log(this.state.count) // 1

    this.setState({
        count: this.state.count + 1,
    })
    console.log(this.state.count) // 1
}
```
点击之后，最终等价执行如下
```js
Object.assign(
  previousState,
  {index: state.count+ 1},
  {index: state.count+ 1},
  ...
)
// 由于后面的数据会覆盖前面的更改，所以最终只加了一次
```

**setTimeout和原生DOM同步性**

setTimeout 和原生 DOM 事件都是由浏览器触发的，它们不在 React 的控制范围内。因此，React 不会在这些情况下进行批量更新，setState 调用将立即执行。因此，在setTimeout或者原生dom事件中，setState是同步。

```js
changeText() {
  setTimeout(() => {
    this.setState({
      message: "你好啊"
    });
    console.log(this.state.message); // 你好啊
  }, 0);
}
```

## 8. React事件机制

React 事件机制具有以下特点：

- 声明式: 事件处理程序可以声明在组件的 JSX 代码中，这使得代码更加直观易懂。
- 委托: React 使用事件委托机制来提高性能。事件委托是指将事件处理程序注册到父元素上，而不是子元素上。
- 合成事件: React 使用合成事件来抽象浏览器原生事件，这使得事件处理程序更加一致。
- 冒泡: 事件会从子元素逐级向上冒泡到父元素，直到被某个元素处理。
- 捕获: 事件可以从父元素逐级向下捕获到子元素，直到被某个元素处理。

React 事件机制的流程如下：

1. 用户在浏览器中触发一个事件。
2. 浏览器将事件传递给 React 根元素。
3. React 根元素根据事件委托机制找到要处理事件的元素。
4. React 创建一个合成事件对象并将其传递给事件处理程序。
5. 事件处理程序执行相应的逻辑。
6. 事件处理程序返回一个布尔值。如果返回 true，则事件会继续冒泡或捕获。如果返回 false，则事件将被阻止。

React合成事件(SyntheticEvent)

合成事件是 React模拟原生 DOM事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器

根据 W3C规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口，例如：

```js
const button = <button onClick={handleClick}>按钮</button>
// 如果想要获得原生DOM事件，可以通过e.nativeEvent属性获取
const handleClick = (e) => console.log(e.nativeEvent);;
const button = <button onClick={handleClick}>按钮</button>
```

## 9. Refs
Refs在计算机中成为弹性文件系统(Resilient File System, 简称ReFS)

React中的Refs提供了一种方式，允许我们访问DOM节点或在render方法中创建React 元素。其本质为ReactDOM.render()返回的组件实例，如果是渲染组件则返回的是组件实例，如果渲染dom则返回具体的DOM节点。

创建ref的形式有三种：

- 传入字符串，字符串 ref 将被视为 DOM 元素的 ID，所以使用时可以通过 this.refs.传入的字符串的格式获取对应的元素
- 传入对象，对象是通过 React.createRef() 方式创建出来，拥有一个current属性，指向 DOM 元素或组件实例
- 传入函数，它将在每次组件渲染时执行，并接受当前的 DOM 元素或组件实例作为参数。该函数会在 DOM 被挂载时进行回调，这个函数会传入一个 元素对象，可以自己保存，使用时，直接拿到之前保存的元素对象即可。可以：
  - 测量 DOM 元素的尺寸
  - 添加事件监听器
  - 与第三方库进行交互
- 传入hook，hook是通过 useRef() 方式创建，使用时通过生成hook对象的 current 属性就是对应的元素。hook拥有自己的作用域，这意味着在 Hook 内部创建的 ref 只能在该 Hook 内使用。Hook 在每次组件重新渲染时都会重新执行，这意味着 Hook 内部的 ref 也会被重新创建。Hook 通常用于获取 DOM 元素或组件实例的引用，并在组件内部进行操作。

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    // 传入字符串
    // return <div ref="myref" />;

    // 传入对象
    // return <div ref={this.myRef} />;

    // 传入函数
    return <div ref={element => this.myref = element} />;

  }
}
// 传入字符串: 访问呢当前节点的方式:
this.refs.myref.innerHTML = "hello";
const element = document.getElementById("myref");

//  传入对象: 对该节点的引用可以在 ref 的 current 属性中访问
const node = this.myRef.current;

// 传入函数: 获取ref对象只需要通过先前存储的对象即可
const node = this.myref
```
传入hook
```js
function App(props) {
  const myref = useRef()
  return (
    <>
      <div ref={myref}></div>
    </>
  )
}
// 获取ref属性也是通过hook对象的current属性
const node = myref.current;
```
注意的是，不能在函数组件上使用ref属性，因为他们并没有实例，ref 不能用于获取文本节点或注释节点的引用。ref 不能用于获取非 DOM 元素的引用，例如自定义组件。
### 应用场景
- 对Dom元素的焦点控制、内容选择、控制
- 对Dom元素的内容设置及媒体播放
- 对Dom元素的操作和对组件实例的操作
- 集成第三方 DOM 库

### React 中的 refs 和 Vue 中的 refs 的异同
相同点:

- React 和 Vue 中的 refs 都用于获取 DOM 元素或组件实例的引用。
- 它们都可以在组件的 render 函数中使用。
- 它们都使用 ref 属性来创建引用。

不同点:
| 特性 | React | Vue |
|---|---|---|
| 创建方式 | 1. 使用 `ref` 属性 2. 使用 `createRef` 函数 | 1. 使用 `ref` 属性 2. 使用 `createRef` 函数 |
| 返回值 | 1. 字符串 2. 对象 3. 函数 | 1. 对象 |
| 更新 | 1. 每次渲染都会更新 2. 需要手动更新 | 1. 响应式 2. 自动更新 |
| 用途 | 1. 获取 DOM 元素或组件实例 2. 手动操作 DOM 3. 集成第三方库 | 1. 获取 DOM 元素或组件实例 2. 操作 DOM 3. 访问组件实例属性和方法 |


### 常见问题

1. 为什么有时要在节流防抖函数中使用Ref：
  - **避免重复渲染**：节流和防抖函数都会延迟函数的执行，这可能会导致组件重复渲染。通过使用 ref，我们可以将函数的执行与组件的渲染分离。只有当函数的返回值发生变化时，才会触发组件的重新渲染。
  - **提高性能**：节流和防抖函数可以通过减少函数调用的次数来提高性能。但是，如果函数内部使用了状态变量，那么每次函数执行都会导致状态变量更新，从而触发组件重新渲染。通过使用 ref，我们可以将状态变量存储在 ref 对象中，这样只有当 ref 对象的值发生变化时，才会触发组件重新渲染。
  - **避免内存泄漏**：如果节流或防抖函数使用了闭包，那么可能会导致内存泄漏。这是因为闭包会引用外部变量，即使外部变量不再使用，也无法被垃圾回收。通过使用 ref，我们可以将外部变量存储在 ref 对象中，这样当外部变量不再使用时，ref 对象可以被垃圾回收，从而避免内存泄漏。
```js
// 防抖 created by gemini
function useDebounce(fn, delay, deps) {
  const timeoutRef = useRef();

  const debouncedFn = useMemo(() => {
    function debouncedFn(...args) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    }

    return debouncedFn;
  }, deps);

  return debouncedFn;
}


// 节流 created by gemini
function useThrottle(fn, delay, deps) {
  const lastTimeRef = useRef(0);

  const throttledFn = useMemo(() => {
    function throttledFn(...args) {
      const now = Date.now();
      if (now - lastTimeRef.current < delay) {
        return;
      }

      lastTimeRef.current = now;
      fn(...args);
    }

    return throttledFn;
  }, deps);

  return throttledFn;
}
```  

[React系列](https://vue3js.cn/interview/React/React.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)
---
date: 2021-05-17
title: WebPack & Gulp 打包优化
tags:
  - webpack
  - gulp
describe: 
---
## Webpack
### 1. Webpack原理指引
webpack定制化了很多东西，小白根据推荐配置就能够快速上手，除一些博客、项目成熟的配置外，也可参考[webpack中官方的examples](https://github.com/webpack/webpack/tree/main/examples)。但是如果不懂webpack底层实现，还是比较难做性能优化以及插件开发。关于webpack原理部分，推荐阅读 [滴滴前端技术团队](https://juejin.cn/team/6943816493473726472/posts) 在掘金中发布的系列专栏。

  1. [webpack系列之一总览](https://juejin.cn/post/6844903726981840904)
  2. [webpack系列之二Tapable](https://juejin.cn/post/6844903750729990152)
  3. [webpack系列之三resolve](https://juejin.cn/post/6844903779712630797)
  4. [webpack系列之四loader详解1](https://juejin.cn/post/6844903780769595405)
  4. [webpack系列之四loader详解2](https://juejin.cn/post/6844903780769595405)
  4. [webpack系列之四loader详解3](https://juejin.cn/post/6844903780777984008)
  5. [webpack系列之五module生成1](https://juejin.cn/post/6844903780778000398)
  6. [webpack系列之五module生成2](https://juejin.cn/post/6844903833445859335)
  7. [webpack系列之六chunk图生成](https://juejin.cn/post/6844903864592777229)
  8. [webpack系列之七-附dependencyTemplates依赖模板](https://juejin.cn/post/6844903925171093518)
  9. [webpack系列之七-文件生成](https://juejin.cn/post/6844903925179482119)

webpack中所有的文件都是一个`module`，包括图片、文字、css、js文件等。webpakc支持了多中模块化方法，包括ES6、CommonJS、AMD等。根据一些共性将多个`module`打包在一起，就是`chunk`，而`chunk`主要分为 `initial`，和`non-initial`两种类型。`initial`为webpack每个入口文件(entry point)打包后创建的chunk，`non-initial`则是除入口文件的其他类型，包括：懒加载、动态引入或者SplitChunksPlugin生成的文件。

执行`npm run build`过程其实就是在读取package.json中的配置，执行对应 `node webpack webpack.prod.config.js`命令。node 根据webpack-cli去分析命令携带的参数，根据参数去执行打包过程。参考[webpack系列之一总览-webpack 编译总流程](https://juejin.cn/post/6844903726981840904#heading-3)中介绍以及下图的流程梳理。webpack在合并一些配置项、及初始化[编译器](https://webpack.js.org/api/compiler-hooks/)之后，遍历每个入口文件，分别进行打包。

![avatar](/images/webpack-compile.jpg)

### 2. Webpack 4.x打包优化
http://panel.c9ai.com:8012/onlinePreview?url=aHR0cHM6Ly9maWxlLmM5YWkuY29tL3Jlc3VtZS9XZWJwYWNr5omT5YyF5Y%2BK6aaW5bGP5Yqg6L295LyY5YyWLnBwdHg%3D

### 3. 依赖收集

从上面Webpack原理指引的图中，我们可以比较直观的看出，webpack其实最终也是通过抽象语法树AST去解析出模块之间的依赖，只是通过[Tapable](https://github.com/webpack/tapable)很好的在各个流程中插入自定义的配置及回调代码。 而抽象语法树的主要过程也可以简化为下面三个过程：编译 parse -> 转化 transform -> 生成 generate。parse主要包括两个阶段：词法分析和语法分析，词法分析将程序代码标记成数字、标点符号、运算符等类型也就是token，语法分析则根据这些token在代码段中的位置及相互关系以关联起来，也就是抽象成一棵树（如a+b，+为根节点，a,b分别为左右子节点）。更深入学习，可以参考jamiebuilds的[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)。

![avatar](/images/AST.png)

webpack在编译生成AST之后，分析require和import语句，触发对应的钩子收集相关依赖

require: call require:commonjs:item 钩子，在CommonJsRequireDependencyParserPlugin.js 中

```js
const dep = new CommonJsRequireDependency(param.string, param.range);
dep.loc = expr.loc;
dep.optional = !!parser.scope.inTry;
parser.state.current.addDependency(dep);
```

import:
```js
const module = parser.state.module;
const dep = new HarmonyCompatibilityDependency(module);
dep.loc = {
   start: {
      line: -1,
      column: 0
   },
   end: {
           line: -1,
      column: 0
   },
   index: -2
};
module.addDependency(dep);
```

每一个依赖(Dependency)的实体都包含一个module字段，指向被依赖的Module. 这样通过Module的dependencies数组成员就能找出该模块所依赖的其它模块。 webpack使用不同的Dependency子类，如AMDRequireDependency ，AMDDefineDependency ，AMDRequireArrayDependency，CommonJsRequireDependency，SystemImportDependency来表式不同的模块加载规范， 通过对应的DependencyParserPlugin来加载 AMD或CMD的模块。


### 4. Tree shaking
[tree shaking](https://www.cnblogs.com/sexintercourse/p/11901425.html) 

传统编译型的语言中，都是由编译器将Dead Code从AST（抽象语法树）中删除，javascript(解释型) 中实际是代码压缩优化工具uglify完成DCE的，通过rollup + uglify和 webpack + uglify 就能实现tree shaking。

ES6模块新特性：

    1. 只能作为模块顶层的语句出现
    2. import 的模块名只能是字符串常量
    3. import binding 是 immutable的

**ES6模块** 依赖关系是确定的，相比commonjs的reqire（动态，执行后才只要引用哪些模块），和运行时的状态无关，可以进行可靠的静态分析，整个依赖树可以被静态地推导出解析语法树。


package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

## Gulp


# QA
1. webpack如何挂载依赖？
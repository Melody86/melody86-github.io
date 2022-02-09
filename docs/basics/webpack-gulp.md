---
date: 2021-05-17
title: Webpack & Gulp
tags:
  - 
describe: 
---
# 依赖收集

编译 parse -> 转化 transform -> 生成 generate

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


# tree shaking
[tree shaking](https://www.cnblogs.com/sexintercourse/p/11901425.html) 

传统编译型的语言中，都是由编译器将Dead Code从AST（抽象语法树）中删除，javascript(解释型) 中实际是代码压缩优化工具uglify完成DCE的，通过rollup + uglify和 webpack + uglify 就能实现tree shaking。

ES6模块新特性：

        只能作为模块顶层的语句出现
        import 的模块名只能是字符串常量
        import binding 是 immutable的

**ES6模块** 依赖关系是确定的，相比commonjs的reqire（动态，执行后才只要引用哪些模块），和运行时的状态无关，可以进行可靠的静态分析，整个依赖树可以被静态地推导出解析语法树。


package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

# QA
1. webpack如何挂载依赖？
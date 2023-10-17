---
date: 2023-10-18
title: JSON.stringify序列化
tags:
  - JSON.stringify
describe: 
---

在前端处理数据过程中，我们经常要JSON.stringify进行序列化，再将数据设置在localstorage中。使用时再用JSON.pase进行反序列化转成对象。

## 语法
```js
JSON.stringify(value[, replacer [, space]])
```

## 参数
value
将要序列化成 一个 JSON 字符串的值。

replacer 可选
如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。

space 可选
指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为 10。该值若小于 1，则意味着没有空格；如果该参数为字符串（当字符串长度超过 10 个字母，取其前 10 个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

返回值
一个表示给定值的 JSON 字符串。

## 几个需要注意的问题

1. 由于 JSON 格式不支持对象引用，如果尝试编码带有循环引用的对象，将会抛出 TypeError 异常。所以在建议使用过程中注意用try catch获取到异常的提示。
```js
const circularReference = {};
circularReference.myself = circularReference;

// 序列化循环引用会抛出 "TypeError: cyclic object value" 错误
JSON.stringify(circularReference);
```

2. JSON.stringify只能序列化可枚举对象
```js
// 不可枚举的属性默认会被忽略：
JSON.stringify(
  Object.create(null, {
    x: { value: "x", enumerable: false },
    y: { value: "y", enumerable: true },
  }),
);
// "{"y":"y"}"

const a = { name: "Lee" }
Object.defineProperty(a, 'age', {    configurable: false,    value: 23, enumerable: false }) 

// a: { name: 'Lee', age: 23 }
// JSON.stringify(a)  { name: 'Lee' }
```




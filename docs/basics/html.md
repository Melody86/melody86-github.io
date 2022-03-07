---
date: 2021-05-17
title: HTML
tags:
  - HTML
describe: html
---

参考阅读 https://github.com/amfe/article/issues/17

## 行内元素、块级元素有哪些？ 空(void)元素有那些？

- 行内元素有：a b span img input select strong em label
- 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4 … p form
- 常见的空元素: `<br>` `<hr>` `<img>` `<input>` `<link>` `<meta>`

## H5中 doctype的作用

1. html5已经不是SGML语言的子集，因此不再需要文档类型定义。实际上，浏览器现在只是通过DOCTYPE 声明来决定使用何种模式(standard mode/quirk mode)来进行文档解析和渲染。

    In HTML5, the only purpose of the DOCTYPE is to activate full standards mode. Older versions of the HTML standard gave additional meaning to the DOCTYPE, but no browser has ever used the DOCTYPE for anything other than switching between quirks mode and standards mode.

2. defer属性对 module scripts 类型的脚本无效。该类脚本默认具有 defer 的效果

    defer: indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing DOMContentLoaded.

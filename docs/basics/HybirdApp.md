---
date: 2020-11-17
title: HybirdApp
tags:
  - HybirdApp
  - JSBridge
describe: 安卓混合开发
---

移动端内核容器统称webview, Iphone的UIWebView（iOS 2.0–12.0）、WKWebView（iOS 8.0+，macOS 10.10+）和Android的WebView。[Android从4.4 开始用Chromium动态加载实现网页渲染引擎](https://blog.csdn.net/sk719887916/article/details/86552854)。

Chromium 渲染引擎实际上是由Browser进程、Render进程和GPU进程组成的。其中，Browser进程负责将网页解析的UI合成 加速展现在页面上，Render 进程 只要负责加载和渲染网页，GPU 进程 负责 Browser 进程 和Render进程发出的GPU消息。

我们的创建WebView时候就会创建启动Chromium ，Chromium中有webCore引擎和[JsCore引擎](https://blog.csdn.net/sk719887916/article/details/86427050)。Chrome浏览器中的是V8引擎。

WebCore负责对HTML解析，CSS解析，渲染UI，调试信息等部分。


# JSBridge交互
## Android->H5: 
    通过javascriptInterface注解实现原生方法，webView.addJavascriptInterface进行绑定
    通过webview.evaluateJavascript("javascript:window['...']")，低版本通过webview.loadUrl(str)执行回调方法
    
```java
    // 本地
    webView.loadUrl("file:///android_asset/demo.html");

    //4.2之前, 使得webView加载js只需如下代码，向WebView中以指定的名称name注入指定的Java对象object：
    mWebView.addJavascriptInterface(new JsBridge(), "JsBridge");  
    //4.2之后调用需要在调用方法加入加入@JavascriptInterface注解,否则无法生效


    class jsObject {
        @JavascriptInterface
        public String toString(String args) { return "injectedObject" + args; }
    }
    webview.getSettings().setJavaScriptEnabled(true);
    webView.addJavascriptInterface(new JsObject(), "injectedObject");
    webView.loadData("", "text/html", null);
    webView.loadUrl("javascript:alert(injectedObject.toString())");  
    //或者在H5中调用window.injectedObject.toString()方法
    
```

## H5->Anroid
    调用window对象上的原生方法、回调方法

    通过WebViewClient.shouldOverrideUrlLoading() 这个API，原生可拦截Url，解析和执行本地方法


## 离线包、补丁包



---
date: 2021-05-17
title: HTTP/HTTPS
tags:
  - 
describe: 
---

## 浏览器输入url到页面加载完成发生了什么

https://www.yuque.com/jiuzaijiyilihuayigecha/cte0k5/flw0xm

![avatar](/images/http-url-entered.png)

DNS域名解析 —> TCP链接 —> HTML资源下载 —> 解析 —> 页面渲染

### 1.1 DNS域名解析
域名系统 DNS (Domain Name System)，是应用层协议。具体过程如下：

    ①用户主机上运行着DNS的客户端，就是我们的PC机或者手机客户端运行着DNS客户端了
    ②浏览器将接收到的url中抽取出域名字段，就是访问的主机名，比如
      http://www.baidu.com/, 
    并将这个主机名传送给DNS应用的客户端
    ③DNS客户机端向DNS服务器端发送一份查询报文，报文中包含着要访问的主机名字段（中间包括一些列缓存查询以及分布式DNS集群的工作）
    ④该DNS客户机最终会收到一份回答报文，其中包含有该主机名对应的IP地址
    ⑤一旦该浏览器收到来自DNS的IP地址，就可以向该IP地址定位的HTTP服务器发起TCP连接。

通过下面路径根据域名找对应的ip地址:
          
    客户端DNS缓存: 浏览器缓存->系统DNS缓存、Hosts文件->路由器缓存
    ISP（互联网服务提供商）DNS缓存
    根域名服务器：全球仅有13台根域名服务器，1个主根域名服务器，其余12为辅根域名服务器
    顶级域名服务器：顶级域名服务器收到请求后查看区域文件记录，若无则将其管辖范围内主域名服务器的IP地址告诉本地DNS服务器
    主域名服务器：主域名服务器接受到请求后查询自己的缓存
    保存结果至缓存：本地域名服务器把返回的结果保存到缓存，以备下一次使用

**[DNS 是基于 UDP 做的查询](https://www.zhihu.com/question/22587247/answer/66417484)**: 这样的无连接的，尽最大能力交付的不可靠数据连接。一次UDP服务器交换可以短到两个包: 一个查询包、一个响应包。一次TCP交换则至少包含9个包：三次握手初始化TCP会话、一个查询包、一个响应包以及四次分手的包交换。

### 1.2 TCP握手TLS握手

**TCP报文段重要字段**
    
    （1）序号（sequence number）：Seq序号，占32位，用来标识从TCP源端向目的端发送的字节流，发起方发送数据时对此进行标记。
    （2）确认号（acknowledgement number）：Ack序号，占32位，只有ACK标志位为1时，确认序号字段才有效，Ack=Seq+1。
    （3）标志位（Flags）：共6个，即URG、ACK、PSH、RST、SYN、FIN等。具体含义如下：
          URG：紧急指针（urgent pointer）有效。
          ACK：确认序号有效。
          PSH：接收方应该尽快将这个报文交给应用层。
          RST：重置连接。
          SYN：发起一个新连接。
          FIN：释放一个连接。
#### 1.2.1 TCP三次握手

1. 客户端发送TCP报文。 SYN=1: 请求建立新连接，该连接序列号 Seq=X;
2. 服务器接收到客户端TCP报文，返回一段TCP报文。<br>
   SYN=1, ACK=1: 数据接收正常，同意创建新连接; Seq=y: 当前TCP报文序列号; ack=x+1: 确认号为x+1;
3. 客户端收到服务器的报文，确认数据传输正常，返回TCP报文: <br>
   ACK=1: 确认收到服务端同意信号; seq=x+1: 收到服务端的确认号，并将其作为自己的序号; ack=y+1: 将服务端序号seq+1作为自己的ack值;<br>
   **客户端、服务端先后进入ESTABLISHED阶段，进行TCP数据传输**

![avatar](/images/tcp-handshake.jpeg)

**TCP为什么要三次握手**: 防止服务器端开启一些无用的连接增加服务器开销以及防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误.

#### 1.2.2 TCP 四次挥手
连接的释放必须是一方主动释放，另一方被动释放。与“三次挥手”一样，在客户端与服务器端传输的TCP报文中，双方的确认号Ack和序号Seq的值，都是在彼此Ack和Seq值的基础上进行计算的，这样做保证了TCP报文传输的连贯性，一旦出现某一方发出的TCP报文丢失，便无法继续"挥手"，以此确保了"四次挥手"的顺利完成。

![avatar](/images/TCP-wavehand.jpeg)

**TCP为什么要四次挥手**: 因为FIN释放连接报文与ACK确认接收报文是分别由第二次和第三次"握手"传输的。释放连接时，被动方服务器，突然收到主动方客户端释放连接的请求时并不能立即释放连接，因为还有必要的数据需要处理，所以服务器先返回ACK确认收到报文，经过CLOSE-WAIT阶段准备好释放连接之后，才能返回FIN释放连接报文。

#### 1.2.3 SSL/TLS握手
 SSL: secure sockets layer 安全套接层 <br>
 TLS: transport layer security 传输层安全<br>
 位于TCP/IP协议与各种应用层协议之间，为数据通讯提供安全支持。

越是底部的协议则越基础，越是表面的协议则越接近用户。所以，TCP握手是TLS握手的前提，只有TCP握手成功了才能进行TLS握手。作用：
    
    1. 认证用户和服务器，确保数据发送到正确的客户机和服务器；
    2. 加密数据以防止数据中途被窃取；
    3. 维护数据的完整性，确保数据在传输过程中不被改变

**协议分层**

SSL:
- SSL记录协议（SSL Record Protocol）：它建立在可靠的传输协议（如TCP）之上，为高层协议提供数据封装、压缩、加密等基本功能的支持，定义了传输的格式。
- SSL握手协议（SSL Handshake Protocol）：它建立在SSL记录协议之上，用于在实际的数据传输开始前，通讯双方进行身份认证、协商加密算法、交换加密密钥等。

TLS(建立在SSL 3.0协议规范之上，是SSL 3.0的后续版本):
- TLS 记录协议（TLS Record）较低的层为 TLS 记录协议，位于某个可靠的传输协议上面。
- TLS 握手协议（TLS Handshake）。

**TLS握手主要过程**

客户端：
1. 客户端生成的随机数x，用于之后的密钥生成
2. 客户端支持的加密算法列表（Cipher Suites）
3. TLS版本信息
4. 客户端支持的压缩算法列表（Compression Methods）
   
服务端：
1. 确认使用的加密通信协议版本，比如TLS 1.2版本。如果客户端和服务端支持的版本不一致，服务端关闭加密通信
2. 服务端生成的随机数y，用于之后的密钥生成
3. 在客户端发送的加密算法列表里选一个加密算法，比如RSA公钥加密
4. 服务器CA证书

加密套件（CipherList）/ 加密算法组合
1. 密钥交换：RSA，Diffie-Hellman，ECDH，PSK等非对称加密
2. 加密算法：SM国密、DES 56/56, RC2 56/128, RC4 128/128, AES 128/128, AES 256/256等 对称加密进行数据传输
3. 会话校验（MAC）算法，防止握手本身被串改：MD5，SHA等
4. PRF（伪随机数函数），用于生成“master secret”

### 1.3 缓存
HTTP缓存的几种状态码：

- 301 永久重定向，
- 302 临时重定向，
- 强缓存返回状态码200，
- 协商缓存返回状态码304not modified (Last Modified & Etag)；

强缓存：Expires [返回GMT格式绝对时间, 服务端和客户端时间不同步/跨时区时, 误差很大] <br>
      Cache-control [相对上次缓存时间, max-age=秒 ]

协商缓存：Last-modified/If-Modified-since, Etag/If-None-Match

浏览器缓存行为还和用户行为有关

![avatar](/images/cache-1.png)

CDN系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。

CDN的combo技术能把多个资源文件合并引用，减少请求次数。比如淘宝的写法：

```js
<link rel="stylesheet" href="//g.alicdn.com/msui/sm/0.6.2/css/??sm.min.css,sm-extend.min.css">

<script type='text/javascript' src='//g.alicdn.com/msui/sm/0.6.2/js/??sm.min.js,sm-extend.min.js' charset='utf-8'></script>
```

### 1.4 性能优化


参考博客:

- [详解 TCP 连接的“ 三次握手 ”与“ 四次挥手 ”](https://baijiahao.baidu.com/s?id=1654225744653405133&wfr=spider&for=pc)
- [SSL](https://www.jianshu.com/p/afd2acdcd31b)
- [详解TCP三次握手以及TLS-SSL握手](http://ocdman.github.io/2018/11/02/%E8%AF%A6%E8%A7%A3TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E4%BB%A5%E5%8F%8ATLS-SSL%E6%8F%A1%E6%89%8B/)


import{_ as n,c as a,o as s,a as t}from"./app.ff3b22ed.js";var e="/images/node-middleware.png",p="/images/csrf.jpeg";const f='{"title":"Web\u5B89\u5168","description":"","frontmatter":{"date":"2021-05-17T00:00:00.000Z","title":"Web\u5B89\u5168","tags":[null],"describe":null},"headers":[{"level":2,"title":"\u540C\u6E90\u7B56\u7565\u53CA\u9650\u5236\u5185\u5BB9","slug":"\u540C\u6E90\u7B56\u7565\u53CA\u9650\u5236\u5185\u5BB9"},{"level":2,"title":"\u89E3\u51B3\u65B9\u6848","slug":"\u89E3\u51B3\u65B9\u6848"},{"level":3,"title":"1. jsonp","slug":"_1-jsonp"},{"level":3,"title":"2. \u8DE8\u57DF\u8D44\u6E90\u5171\u4EABCORS [Cross-origin resource sharing]","slug":"_2-\u8DE8\u57DF\u8D44\u6E90\u5171\u4EABcors-cross-origin-resource-sharing"},{"level":3,"title":"3. postMessage","slug":"_3-postmessage"},{"level":3,"title":"4. websocket","slug":"_4-websocket"},{"level":3,"title":"5. Node\u4E2D\u95F4\u4EF6\u4EE3\u7406(\u4E24\u6B21\u8DE8\u57DF)","slug":"_5-node\u4E2D\u95F4\u4EF6\u4EE3\u7406-\u4E24\u6B21\u8DE8\u57DF"},{"level":3,"title":"6. nginx\u53CD\u5411\u4EE3\u7406","slug":"_6-nginx\u53CD\u5411\u4EE3\u7406"},{"level":3,"title":"7. window.name + iframe","slug":"_7-window-name-iframe"},{"level":3,"title":"8. location.hash + iframe","slug":"_8-location-hash-iframe"},{"level":3,"title":"9. document.domain + iframe","slug":"_9-document-domain-iframe"},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3"},{"level":2,"title":"\u8DE8\u7AD9\u811A\u672C\u6F0F\u6D1E(XSS)","slug":"\u8DE8\u7AD9\u811A\u672C\u6F0F\u6D1E-xss"},{"level":2,"title":"\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020CSRF","slug":"\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020csrf"}],"relativePath":"basics/webSecure.md","lastUpdated":1644512502123}',o={},c=t(`<h1 id="web\u5B89\u5168" tabindex="-1">web\u5B89\u5168 <a class="header-anchor" href="#web\u5B89\u5168" aria-hidden="true">#</a></h1><h1 id="\u8DE8\u57DF" tabindex="-1">\u8DE8\u57DF <a class="header-anchor" href="#\u8DE8\u57DF" aria-hidden="true">#</a></h1><h2 id="\u540C\u6E90\u7B56\u7565\u53CA\u9650\u5236\u5185\u5BB9" tabindex="-1">\u540C\u6E90\u7B56\u7565\u53CA\u9650\u5236\u5185\u5BB9 <a class="header-anchor" href="#\u540C\u6E90\u7B56\u7565\u53CA\u9650\u5236\u5185\u5BB9" aria-hidden="true">#</a></h2><ol><li><p>\u540C\u6E90\u662F\u6307&quot;\u534F\u8BAE+\u57DF\u540D+\u7AEF\u53E3&quot;\u4E09\u8005\u76F8\u540C\uFF0C\u5373\u4FBF\u4E24\u4E2A\u4E0D\u540C\u7684\u57DF\u540D\u6307\u5411\u540C\u4E00\u4E2Aip\u5730\u5740\uFF0C\u4E5F\u975E\u540C\u6E90\u3002</p></li><li><p>\u540C\u6E90\u7B56\u7565\u9650\u5236\u5185\u5BB9\u6709\uFF1A</p><ul><li>Cookie\u3001LocalStorage\u3001IndexedDB \u7B49\u5B58\u50A8\u6027\u5185\u5BB9</li><li>DOM \u8282\u70B9</li><li>AJAX \u8BF7\u6C42\u53D1\u9001\u540E\uFF0C\u7ED3\u679C\u88AB\u6D4F\u89C8\u5668\u62E6\u622A\u4E86</li></ul></li><li><p>\u4E09\u4E2A\u6807\u7B7E\u662F\u5141\u8BB8\u8DE8\u57DF\u52A0\u8F7D\u8D44\u6E90\uFF1A</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>XXX</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>XXX</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>XXX</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></li><li><p>\u8BF4\u660E</p><ul><li>\u5982\u679C\u662F\u534F\u8BAE\u548C\u7AEF\u53E3\u9020\u6210\u7684\u8DE8\u57DF\u95EE\u9898\u201C\u524D\u53F0\u201D\u662F\u65E0\u80FD\u4E3A\u529B\u7684\u3002</li><li>\u5728\u8DE8\u57DF\u95EE\u9898\u4E0A\uFF0C\u4EC5\u4EC5\u662F\u901A\u8FC7\u201CURL\u7684\u9996\u90E8\u201D\u6765\u8BC6\u522B\u800C\u4E0D\u4F1A\u6839\u636E\u57DF\u540D\u5BF9\u5E94\u7684IP\u5730\u5740\u662F\u5426\u76F8\u540C\u6765\u5224\u65AD\u3002\u201CURL\u7684\u9996\u90E8\u201D\u53EF\u4EE5\u7406\u89E3\u4E3A\u201C\u534F\u8BAE, \u57DF\u540D\u548C\u7AEF\u53E3\u5FC5\u987B\u5339\u914D\u201D\u3002</li><li>\u8DE8\u57DF\u5E76\u4E0D\u662F\u8BF7\u6C42\u53D1\u4E0D\u51FA\u53BB\uFF0C\u8BF7\u6C42\u80FD\u53D1\u51FA\u53BB\uFF0C\u670D\u52A1\u7AEF\u80FD\u6536\u5230\u8BF7\u6C42\u5E76\u6B63\u5E38\u8FD4\u56DE\u7ED3\u679C\uFF0C\u53EA\u662F\u7ED3\u679C\u88AB\u6D4F\u89C8\u5668\u62E6\u622A\u4E86\u3002\u8DE8\u57DF\u5E76\u4E0D\u80FD\u5B8C\u5168\u963B\u6B62 CSRF\uFF0C\u56E0\u4E3A\u8BF7\u6C42\u6BD5\u7ADF\u662F\u53D1\u51FA\u53BB\u4E86.</li></ul></li></ol><h2 id="\u89E3\u51B3\u65B9\u6848" tabindex="-1">\u89E3\u51B3\u65B9\u6848 <a class="header-anchor" href="#\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a></h2><h3 id="_1-jsonp" tabindex="-1">1. jsonp <a class="header-anchor" href="#_1-jsonp" aria-hidden="true">#</a></h3><ol><li><p>JSONP\u539F\u7406 \u5229\u7528 <code>&lt;script&gt;</code> \u6807\u7B7E\u6CA1\u6709\u8DE8\u57DF\u9650\u5236\u7684\u6F0F\u6D1E\uFF0C\u7F51\u9875\u53EF\u4EE5\u5F97\u5230\u4ECE\u5176\u4ED6\u6765\u6E90\u52A8\u6001\u4EA7\u751F\u7684 JSON \u6570\u636E\u3002JSONP\u8BF7\u6C42\u4E00\u5B9A\u9700\u8981\u5BF9\u65B9\u7684\u670D\u52A1\u5668\u505A\u652F\u6301\u624D\u53EF\u4EE5\u3002AJAX\u5C5E\u4E8E\u540C\u6E90\u7B56\u7565\uFF0CJSONP\u5C5E\u4E8E\u975E\u540C\u6E90\u7B56\u7565\uFF08\u8DE8\u57DF\u8BF7\u6C42\uFF09\u3002</p></li><li><p>JSONP\u4F18\u7F3A\u70B9\uFF1AJSONP\u4F18\u70B9\u662F\u7B80\u5355\u517C\u5BB9\u6027\u597D\uFF0C\u53EF\u7528\u4E8E\u89E3\u51B3\u4E3B\u6D41\u6D4F\u89C8\u5668\u7684\u8DE8\u57DF\u6570\u636E\u8BBF\u95EE\u7684\u95EE\u9898\u3002\u7F3A\u70B9\u662F<strong>\u4EC5\u652F\u6301get\u65B9\u6CD5\u5177\u6709\u5C40\u9650\u6027,\u4E0D\u5B89\u5168\u53EF\u80FD\u4F1A\u906D\u53D7XSS\u653B\u51FB</strong>\u3002</p></li><li><p>JSONP\u90FD\u662FGET\u548C\u5F02\u6B65\u8BF7\u6C42\u7684\uFF0C\u4E0D\u5B58\u5728\u5176\u4ED6\u7684\u8BF7\u6C42\u65B9\u5F0F\u548C\u540C\u6B65\u8BF7\u6C42\uFF0C\u4E14jQuery\u9ED8\u8BA4\u5C31\u4F1A\u7ED9JSONP\u7684\u8BF7\u6C42\u6E05\u9664\u7F13\u5B58\u3002</p></li></ol><h3 id="_2-\u8DE8\u57DF\u8D44\u6E90\u5171\u4EABcors-cross-origin-resource-sharing" tabindex="-1">2. \u8DE8\u57DF\u8D44\u6E90\u5171\u4EABCORS [Cross-origin resource sharing] <a class="header-anchor" href="#_2-\u8DE8\u57DF\u8D44\u6E90\u5171\u4EABcors-cross-origin-resource-sharing" aria-hidden="true">#</a></h3><p>\u6D4F\u89C8\u5668\u4E00\u65E6\u53D1\u73B0 AJAX \u8BF7\u6C42\u8DE8\u57DF\uFF0C\u5C31\u4F1A\u81EA\u52A8\u6DFB\u52A0\u4E00\u4E9B\u9644\u52A0\u7684\u5934\u4FE1\u606F(\u589E\u52A0Origin\u5B57\u6BB5)\uFF0C\u6709\u65F6\u8FD8\u4F1A\u591A\u51FA\u4E00\u6B21\u9644\u52A0\u7684\u8BF7\u6C42(\u590D\u6742\u8BF7\u6C42)\u3002\u670D\u52A1\u7AEF\u8BBE\u7F6E Access-Control-Allow-Origin \u5C31\u53EF\u4EE5\u5F00\u542F CORS\u3002 \u8BE5\u5C5E\u6027\u8868\u793A\u54EA\u4E9B\u57DF\u540D\u53EF\u4EE5\u8BBF\u95EE\u8D44\u6E90\uFF0C\u5982\u679C\u8BBE\u7F6E\u901A\u914D\u7B26\u5219\u8868\u793A\u6240\u6709\u7F51\u7AD9\u90FD\u53EF\u4EE5\u8BBF\u95EE\u8D44\u6E90\u3002</p><ol><li>\u7B80\u5355\u8BF7\u6C42: \u53EA\u8981\u540C\u65F6\u6EE1\u8DB3\u4EE5\u4E0B\u4E24\u5927\u6761\u4EF6\uFF0C\u5C31\u5C5E\u4E8E\u7B80\u5355\u8BF7\u6C42 <ul><li>\u6761\u4EF61\uFF1A\u4F7F\u7528\u4E0B\u5217\u65B9\u6CD5\u4E4B\u4E00\uFF1AGET\u3001HEAD\u3001POST</li><li>\u6761\u4EF62\uFF1AHTTP \u7684\u5934\u4FE1\u606F\u4E0D\u8D85\u51FA\u4EE5\u4E0B\u51E0\u79CD\u5B57\u6BB5 <ul><li>Accept</li><li>Accept-Language</li><li>Content-Language</li><li>Last-Event-ID</li><li>Content-Type \u7684\u503C\u4EC5\u9650\u4E8E\u4E0B\u5217\u4E09\u8005\u4E4B\u4E00\uFF1A<br> text/plain<br> multipart/form-data<br> application/x-www-form-urlencoded<br></li></ul></li></ul></li></ol><p>\u8BF7\u6C42\u4E2D\u7684\u4EFB\u610F XMLHttpRequestUpload \u5BF9\u8C61\u5747\u6CA1\u6709\u6CE8\u518C\u4EFB\u4F55\u4E8B\u4EF6\u76D1\u542C\u5668\uFF1B XMLHttpRequestUpload \u5BF9\u8C61\u53EF\u4EE5\u4F7F\u7528 XMLHttpRequest.upload \u5C5E\u6027\u8BBF\u95EE\u3002</p><ol><li>\u590D\u6742\u8BF7\u6C42: \u4E0D\u7B26\u5408\u4EE5\u4E0A\u6761\u4EF6\u7684\u8BF7\u6C42\u5C31\u80AF\u5B9A\u662F\u590D\u6742\u8BF7\u6C42\u4E86\u3002 \u590D\u6742\u8BF7\u6C42\u7684CORS\u8BF7\u6C42\uFF0C\u4F1A\u5728\u6B63\u5F0F\u901A\u4FE1\u4E4B\u524D\uFF0C\u589E\u52A0\u4E00\u6B21HTTP\u67E5\u8BE2\u8BF7\u6C42\uFF0C\u79F0\u4E3A&quot;\u9884\u68C0&quot;\u8BF7\u6C42,\u8BE5\u8BF7\u6C42\u662F option \u65B9\u6CD5\u7684\uFF0C\u901A\u8FC7\u8BE5\u8BF7\u6C42\u6765\u77E5\u9053\u670D\u52A1\u7AEF\u662F\u5426\u5141\u8BB8\u8DE8\u57DF\u8BF7\u6C42\u3002</li></ol><p>\u8FD9\u6837\u5212\u5206\u7684\u539F\u56E0\u662F\uFF0C\u8868\u5355\u5728\u5386\u53F2\u4E0A\u4E00\u76F4\u53EF\u4EE5\u8DE8\u57DF\u53D1\u51FA\u8BF7\u6C42\u3002\u7B80\u5355\u8BF7\u6C42\u5C31\u662F\u8868\u5355\u8BF7\u6C42\uFF0C\u6D4F\u89C8\u5668\u6CBF\u88AD\u4E86\u4F20\u7EDF\u7684\u5904\u7406\u65B9\u5F0F\uFF0C\u4E0D\u628A\u884C\u4E3A\u590D\u6742\u5316\uFF0C\u5426\u5219\u5F00\u53D1\u8005\u53EF\u80FD\u8F6C\u800C\u4F7F\u7528\u8868\u5355\uFF0C\u89C4\u907F CORS \u7684\u9650\u5236\u3002</p><div class="language-html"><pre><code>// index.html
let xhr = new XMLHttpRequest()
document.cookie = &#39;name=xiamen&#39; // cookie\u4E0D\u80FD\u8DE8\u57DF
xhr.withCredentials = true // \u524D\u7AEF\u8BBE\u7F6E\u662F\u5426\u5E26cookie
xhr.open(&#39;PUT&#39;, &#39;http://localhost:4000/getData&#39;, true)
xhr.setRequestHeader(&#39;name&#39;, &#39;xiamen&#39;)
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status &gt;= 200 &amp;&amp; xhr.status &lt; 300) || xhr.status === 304) {
      console.log(xhr.response)
      //\u5F97\u5230\u54CD\u5E94\u5934\uFF0C\u540E\u53F0\u9700\u8BBE\u7F6EAccess-Control-Expose-Headers
      console.log(xhr.getResponseHeader(&#39;name&#39;))
    }
  }
}
xhr.send()
</code></pre></div><div class="language-js"><pre><code><span class="token comment">//server1.js</span>
<span class="token keyword">let</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">//server2.js</span>
<span class="token keyword">let</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> whitList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;http://localhost:3000&#39;</span><span class="token punctuation">]</span> <span class="token comment">//\u8BBE\u7F6E\u767D\u540D\u5355</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> origin <span class="token operator">=</span> req<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>origin
  <span class="token keyword">if</span> <span class="token punctuation">(</span>whitList<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>origin<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u54EA\u4E2A\u6E90\u53EF\u4EE5\u8BBF\u95EE\u6211</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Allow-Origin&#39;</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span>
    <span class="token comment">// \u5141\u8BB8\u643A\u5E26\u54EA\u4E2A\u5934\u8BBF\u95EE\u6211</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Allow-Headers&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// \u5141\u8BB8\u54EA\u4E2A\u65B9\u6CD5\u8BBF\u95EE\u6211</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Allow-Methods&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;PUT&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// \u5141\u8BB8\u643A\u5E26cookie</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Allow-Credentials&#39;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token comment">// \u9884\u68C0\u7684\u5B58\u6D3B\u65F6\u95F4</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Max-Age&#39;</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>
    <span class="token comment">// \u5141\u8BB8\u8FD4\u56DE\u7684\u5934</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Expose-Headers&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>method <span class="token operator">===</span> <span class="token string">&#39;OPTIONS&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// OPTIONS\u8BF7\u6C42\u4E0D\u505A\u4EFB\u4F55\u5904\u7406</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&#39;/getData&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>headers<span class="token punctuation">)</span>
  res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;jw&#39;</span><span class="token punctuation">)</span> <span class="token comment">//\u8FD4\u56DE\u4E00\u4E2A\u54CD\u5E94\u5934\uFF0C\u540E\u53F0\u9700\u8BBE\u7F6E</span>
  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">&#39;\u6211\u4E0D\u7231\u4F60&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/getData&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>headers<span class="token punctuation">)</span>
  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">&#39;\u6211\u4E0D\u7231\u4F60&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">4000</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="_3-postmessage" tabindex="-1">3. postMessage <a class="header-anchor" href="#_3-postmessage" aria-hidden="true">#</a></h3><p>postMessage\u662FHTML5 XMLHttpRequest Level 2\u4E2D\u7684API\uFF0C\u4E14\u662F\u4E3A\u6570\u4E0D\u591A\u53EF\u4EE5\u8DE8\u57DF\u64CD\u4F5C\u7684window\u5C5E\u6027\u4E4B\u4E00\uFF0C\u5B83\u53EF\u7528\u4E8E\u89E3\u51B3\u4EE5\u4E0B\u65B9\u9762\u7684\u95EE\u9898\uFF1A</p><ul><li>\u9875\u9762\u548C\u5176\u6253\u5F00\u7684\u65B0\u7A97\u53E3\u7684\u6570\u636E\u4F20\u9012</li><li>\u591A\u7A97\u53E3\u4E4B\u95F4\u6D88\u606F\u4F20\u9012</li><li>\u9875\u9762\u4E0E\u5D4C\u5957\u7684iframe\u6D88\u606F\u4F20\u9012</li><li>\u4E0A\u9762\u4E09\u4E2A\u573A\u666F\u7684\u8DE8\u57DF\u6570\u636E\u4F20\u9012<br></li></ul><blockquote><p><strong>postMessage()\u65B9\u6CD5\u5141\u8BB8\u6765\u81EA\u4E0D\u540C\u6E90\u7684\u811A\u672C\u91C7\u7528\u5F02\u6B65\u65B9\u5F0F\u8FDB\u884C\u6709\u9650\u7684\u901A\u4FE1\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u8DE8\u6587\u672C\u6863\u3001\u591A\u7A97\u53E3\u3001\u8DE8\u57DF\u6D88\u606F\u4F20\u9012\u3002</strong></p></blockquote><p>otherWindow.postMessage(message, targetOrigin, [transfer]); message: \u5C06\u8981\u53D1\u9001\u5230\u5176\u4ED6 window\u7684\u6570\u636E\u3002 targetOrigin:\u901A\u8FC7\u7A97\u53E3\u7684origin\u5C5E\u6027\u6765\u6307\u5B9A\u54EA\u4E9B\u7A97\u53E3\u80FD\u63A5\u6536\u5230\u6D88\u606F\u4E8B\u4EF6\uFF0C\u5176\u503C\u53EF\u4EE5\u662F\u5B57\u7B26\u4E32&quot;*&quot;\uFF08\u8868\u793A\u65E0\u9650\u5236\uFF09\u6216\u8005\u4E00\u4E2AURI\u3002\u5728\u53D1\u9001\u6D88\u606F\u7684\u65F6\u5019\uFF0C\u5982\u679C\u76EE\u6807\u7A97\u53E3\u7684\u534F\u8BAE\u3001\u4E3B\u673A\u5730\u5740\u6216\u7AEF\u53E3\u8FD9\u4E09\u8005\u7684\u4EFB\u610F\u4E00\u9879\u4E0D\u5339\u914DtargetOrigin\u63D0\u4F9B\u7684\u503C\uFF0C\u90A3\u4E48\u6D88\u606F\u5C31\u4E0D\u4F1A\u88AB\u53D1\u9001\uFF1B\u53EA\u6709\u4E09\u8005\u5B8C\u5168\u5339\u914D\uFF0C\u6D88\u606F\u624D\u4F1A\u88AB\u53D1\u9001\u3002 transfer(\u53EF\u9009)\uFF1A\u662F\u4E00\u4E32\u548Cmessage \u540C\u65F6\u4F20\u9012\u7684 Transferable \u5BF9\u8C61. \u8FD9\u4E9B\u5BF9\u8C61\u7684\u6240\u6709\u6743\u5C06\u88AB\u8F6C\u79FB\u7ED9\u6D88\u606F\u7684\u63A5\u6536\u65B9\uFF0C\u800C\u53D1\u9001\u4E00\u65B9\u5C06\u4E0D\u518D\u4FDD\u6709\u6240\u6709\u6743\u3002</p><h3 id="_4-websocket" tabindex="-1">4. websocket <a class="header-anchor" href="#_4-websocket" aria-hidden="true">#</a></h3><p>Websocket\u662FHTML5\u7684\u4E00\u4E2A\u6301\u4E45\u5316\u7684\u534F\u8BAE\uFF0C\u5B83\u5B9E\u73B0\u4E86\u6D4F\u89C8\u5668\u4E0E\u670D\u52A1\u5668\u7684\u5168\u53CC\u5DE5\u901A\u4FE1\uFF0C\u540C\u65F6\u4E5F\u662F\u8DE8\u57DF\u7684\u4E00\u79CD\u89E3\u51B3\u65B9\u6848\u3002WebSocket\u548CHTTP\u90FD\u662F\u5E94\u7528\u5C42\u534F\u8BAE\uFF0C\u90FD\u57FA\u4E8E TCP \u534F\u8BAE\u3002\u4F46\u662F <strong>WebSocket \u662F\u4E00\u79CD\u53CC\u5411\u901A\u4FE1\u534F\u8BAE\uFF0C\u5728\u5EFA\u7ACB\u8FDE\u63A5\u4E4B\u540E\uFF0CWebSocket \u7684 server \u4E0E client \u90FD\u80FD\u4E3B\u52A8\u5411\u5BF9\u65B9\u53D1\u9001\u6216\u63A5\u6536\u6570\u636E\u3002</strong> \u540C\u65F6\uFF0CWebSocket \u5728\u5EFA\u7ACB\u8FDE\u63A5\u65F6\u9700\u8981\u501F\u52A9 HTTP \u534F\u8BAE\uFF0C\u8FDE\u63A5\u5EFA\u7ACB\u597D\u4E86\u4E4B\u540E client \u4E0E server \u4E4B\u95F4\u7684\u53CC\u5411\u901A\u4FE1\u5C31\u4E0E HTTP \u65E0\u5173\u4E86\u3002</p><p>\u539F\u751FWebSocket API\u4F7F\u7528\u8D77\u6765\u4E0D\u592A\u65B9\u4FBF\uFF0C<a href="http://xn--Socket-hz8ig3bo82im51b.io" target="_blank" rel="noopener noreferrer">\u6211\u4EEC\u4F7F\u7528Socket.io</a>\uFF0C\u5B83\u5F88\u597D\u5730\u5C01\u88C5\u4E86webSocket\u63A5\u53E3\uFF0C\u63D0\u4F9B\u4E86\u66F4\u7B80\u5355\u3001\u7075\u6D3B\u7684\u63A5\u53E3\uFF0C\u4E5F\u5BF9\u4E0D\u652F\u6301webSocket\u7684\u6D4F\u89C8\u5668\u63D0\u4F9B\u4E86\u5411\u4E0B\u517C\u5BB9\u3002</p><h3 id="_5-node\u4E2D\u95F4\u4EF6\u4EE3\u7406-\u4E24\u6B21\u8DE8\u57DF" tabindex="-1">5. Node\u4E2D\u95F4\u4EF6\u4EE3\u7406(\u4E24\u6B21\u8DE8\u57DF) <a class="header-anchor" href="#_5-node\u4E2D\u95F4\u4EF6\u4EE3\u7406-\u4E24\u6B21\u8DE8\u57DF" aria-hidden="true">#</a></h3><p>\u5B9E\u73B0\u539F\u7406\uFF1A\u540C\u6E90\u7B56\u7565\u662F\u6D4F\u89C8\u5668\u9700\u8981\u9075\u5FAA\u7684\u6807\u51C6\uFF0C\u800C\u5982\u679C\u662F\u670D\u52A1\u5668\u5411\u670D\u52A1\u5668\u8BF7\u6C42\u5C31\u65E0\u9700\u9075\u5FAA\u540C\u6E90\u7B56\u7565\u3002<br></p><p>\u4EE3\u7406\u670D\u52A1\u5668\uFF0C\u9700\u8981\u505A\u4EE5\u4E0B\u51E0\u4E2A\u6B65\u9AA4\uFF1A</p><ul><li>\u63A5\u53D7\u5BA2\u6237\u7AEF\u8BF7\u6C42 \u3002</li><li>\u5C06\u8BF7\u6C42 \u8F6C\u53D1\u7ED9\u670D\u52A1\u5668\u3002</li><li>\u62FF\u5230\u670D\u52A1\u5668 \u54CD\u5E94 \u6570\u636E\u3002</li><li>\u5C06 \u54CD\u5E94 \u8F6C\u53D1\u7ED9\u5BA2\u6237\u7AEF\u3002 <img src="`+e+`" alt="avatar"></li></ul><h3 id="_6-nginx\u53CD\u5411\u4EE3\u7406" tabindex="-1">6. nginx\u53CD\u5411\u4EE3\u7406 <a class="header-anchor" href="#_6-nginx\u53CD\u5411\u4EE3\u7406" aria-hidden="true">#</a></h3><p>\u5B9E\u73B0\u539F\u7406\u7C7B\u4F3C\u4E8ENode\u4E2D\u95F4\u4EF6\u4EE3\u7406\uFF0C\u9700\u8981\u4F60\u642D\u5EFA\u4E00\u4E2A\u4E2D\u8F6Cnginx\u670D\u52A1\u5668\uFF0C\u7528\u4E8E\u8F6C\u53D1\u8BF7\u6C42\u3002</p><p>\u4F7F\u7528nginx\u53CD\u5411\u4EE3\u7406\u5B9E\u73B0\u8DE8\u57DF\uFF0C\u662F\u6700\u7B80\u5355\u7684\u8DE8\u57DF\u65B9\u5F0F\u3002\u53EA\u9700\u8981\u4FEE\u6539nginx\u7684\u914D\u7F6E\u5373\u53EF\u89E3\u51B3\u8DE8\u57DF\u95EE\u9898\uFF0C\u652F\u6301\u6240\u6709\u6D4F\u89C8\u5668\uFF0C\u652F\u6301session\uFF0C\u4E0D\u9700\u8981\u4FEE\u6539\u4EFB\u4F55\u4EE3\u7801\uFF0C\u5E76\u4E14\u4E0D\u4F1A\u5F71\u54CD\u670D\u52A1\u5668\u6027\u80FD\u3002</p><p>\u5B9E\u73B0\u601D\u8DEF\uFF1A\u901A\u8FC7nginx\u914D\u7F6E\u4E00\u4E2A\u4EE3\u7406\u670D\u52A1\u5668\uFF08\u57DF\u540D\u4E0Edomain1\u76F8\u540C\uFF0C\u7AEF\u53E3\u4E0D\u540C\uFF09\u505A\u8DF3\u677F\u673A\uFF0C\u53CD\u5411\u4EE3\u7406\u8BBF\u95EEdomain2\u63A5\u53E3\uFF0C\u5E76\u4E14\u53EF\u4EE5\u987A\u4FBF\u4FEE\u6539cookie\u4E2Ddomain\u4FE1\u606F\uFF0C\u65B9\u4FBF\u5F53\u524D\u57DFcookie\u5199\u5165\uFF0C\u5B9E\u73B0\u8DE8\u57DF\u767B\u5F55\u3002</p><h3 id="_7-window-name-iframe" tabindex="-1">7. <a href="http://window.name" target="_blank" rel="noopener noreferrer">window.name</a> + iframe <a class="header-anchor" href="#_7-window-name-iframe" aria-hidden="true">#</a></h3><p>window.name\u5C5E\u6027\u7684\u72EC\u7279\u4E4B\u5904\uFF1Aname\u503C\u5728\u4E0D\u540C\u7684\u9875\u9762\uFF08\u751A\u81F3\u4E0D\u540C\u57DF\u540D\uFF09\u52A0\u8F7D\u540E\u4F9D\u65E7\u5B58\u5728\uFF0C\u5E76\u4E14\u53EF\u4EE5\u652F\u6301\u975E\u5E38\u957F\u7684 name \u503C\uFF082MB\uFF09\u3002</p><p>\u5176\u4E2Da.html\u548Cb.html\u662F\u540C\u57DF\u7684\uFF0C\u90FD\u662Fhttp://localhost:3000;\u800Cc.html\u662Fhttp://localhost:4000</p><h3 id="_8-location-hash-iframe" tabindex="-1">8. location.hash + iframe <a class="header-anchor" href="#_8-location-hash-iframe" aria-hidden="true">#</a></h3><p>\u5B9E\u73B0\u539F\u7406\uFF1A a.html\u6B32\u4E0Ec.html\u8DE8\u57DF\u76F8\u4E92\u901A\u4FE1\uFF0C\u901A\u8FC7\u4E2D\u95F4\u9875b.html\u6765\u5B9E\u73B0\u3002 \u4E09\u4E2A\u9875\u9762\uFF0C\u4E0D\u540C\u57DF\u4E4B\u95F4\u5229\u7528iframe\u7684location.hash\u4F20\u503C\uFF0C\u76F8\u540C\u57DF\u4E4B\u95F4\u76F4\u63A5js\u8BBF\u95EE\u6765\u901A\u4FE1\u3002</p><p>\u5177\u4F53\u5B9E\u73B0\u6B65\u9AA4\uFF1A\u4E00\u5F00\u59CBa.html\u7ED9c.html\u4F20\u4E00\u4E2Ahash\u503C\uFF0C\u7136\u540Ec.html\u6536\u5230hash\u503C\u540E\uFF0C\u518D\u628Ahash\u503C\u4F20\u9012\u7ED9b.html\uFF0C\u6700\u540Eb.html\u5C06\u7ED3\u679C\u653E\u5230a.html\u7684hash\u503C\u4E2D\u3002</p><h3 id="_9-document-domain-iframe" tabindex="-1">9. document.domain + iframe <a class="header-anchor" href="#_9-document-domain-iframe" aria-hidden="true">#</a></h3><p>\u8BE5\u65B9\u5F0F\u53EA\u80FD\u7528\u4E8E\u4E8C\u7EA7\u57DF\u540D\u76F8\u540C\u7684\u60C5\u51B5\u4E0B\uFF0C\u6BD4\u5982 <a href="http://a.test.com" target="_blank" rel="noopener noreferrer">a.test.com</a> \u548C <a href="http://b.test.com" target="_blank" rel="noopener noreferrer">b.test.com</a> \u9002\u7528\u4E8E\u8BE5\u65B9\u5F0F\u3002 \u53EA\u9700\u8981\u7ED9\u9875\u9762\u6DFB\u52A0 document.domain =&#39;<a href="http://test.com" target="_blank" rel="noopener noreferrer">test.com</a>&#39; \u8868\u793A\u4E8C\u7EA7\u57DF\u540D\u90FD\u76F8\u540C\u5C31\u53EF\u4EE5\u5B9E\u73B0\u8DE8\u57DF\u3002</p><p>\u5B9E\u73B0\u539F\u7406\uFF1A\u4E24\u4E2A\u9875\u9762\u90FD\u901A\u8FC7js\u5F3A\u5236\u8BBE\u7F6Edocument.domain\u4E3A\u57FA\u7840\u4E3B\u57DF\uFF0C\u5C31\u5B9E\u73B0\u4E86\u540C\u57DF\u3002</p><p>\u6211\u4EEC\u770B\u4E2A\u4F8B\u5B50\uFF1A\u9875\u9762<code>a.zf1.cn:3000/a.html</code>\u83B7\u53D6\u9875\u9762<code>b.zf1.cn:3000/b.html</code>\u4E2Da\u7684\u503C</p><h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2><ul><li>CORS\u652F\u6301\u6240\u6709\u7C7B\u578B\u7684HTTP\u8BF7\u6C42\uFF0C\u662F\u8DE8\u57DFHTTP\u8BF7\u6C42\u7684\u6839\u672C\u89E3\u51B3\u65B9\u6848</li><li>JSONP\u53EA\u652F\u6301GET\u8BF7\u6C42\uFF0CJSONP\u7684\u4F18\u52BF\u5728\u4E8E\u652F\u6301\u8001\u5F0F\u6D4F\u89C8\u5668\uFF0C\u4EE5\u53CA\u53EF\u4EE5\u5411\u4E0D\u652F\u6301CORS\u7684\u7F51\u7AD9\u8BF7\u6C42\u6570\u636E\u3002</li><li>\u4E0D\u7BA1\u662FNode\u4E2D\u95F4\u4EF6\u4EE3\u7406\u8FD8\u662Fnginx\u53CD\u5411\u4EE3\u7406\uFF0C\u4E3B\u8981\u662F\u901A\u8FC7\u540C\u6E90\u7B56\u7565\u5BF9\u670D\u52A1\u5668\u4E0D\u52A0\u9650\u5236\u3002</li><li>\u65E5\u5E38\u5DE5\u4F5C\u4E2D\uFF0C\u7528\u5F97\u6BD4\u8F83\u591A\u7684\u8DE8\u57DF\u65B9\u6848\u662Fcors\u548Cnginx\u53CD\u5411\u4EE3\u7406 <br></li></ul><h1 id="\u5B89\u5168" tabindex="-1">\u5B89\u5168 <a class="header-anchor" href="#\u5B89\u5168" aria-hidden="true">#</a></h1><h2 id="\u8DE8\u7AD9\u811A\u672C\u6F0F\u6D1E-xss" tabindex="-1">\u8DE8\u7AD9\u811A\u672C\u6F0F\u6D1E(XSS) <a class="header-anchor" href="#\u8DE8\u7AD9\u811A\u672C\u6F0F\u6D1E-xss" aria-hidden="true">#</a></h2><p>xss( Cross Site Scripting) \u6307\u6076\u610F\u653B\u51FB\u8005\u5F80web\u9875\u9762\u4E2D\u63D2\u5165\u6076\u610FScript\u4EE3\u7801\uFF0C\u5F53\u7528\u6237\u6D4F\u89C8\u7F51\u9875\u65F6\uFF0C\u6076\u610F\u4EE3\u7801\u88AB\u6267\u884C\uFF0C\u8FBE\u5230\u6076\u610F\u653B\u51FB\u76EE\u7684\u3002</p><p><strong>\u5206\u7C7B</strong>\uFF1A</p><pre><code>\u53CD\u5C04\u578BXSS\uFF1A&lt;\u975E\u6301\u4E45\u578B/\u53CD\u5C04\u578B&gt; \u653B\u51FB\u8005\u4E8B\u5148\u5236\u4F5C\u597D\u653B\u51FB\u94FE\u63A5, \u9700\u8981\u6B3A\u9A97\u7528\u6237\u81EA\u5DF1\u53BB\u70B9\u51FB\u94FE\u63A5\u624D\u80FD\u89E6\u53D1XSS\u4EE3\u7801\uFF08\u670D\u52A1\u5668\u4E2D\u6CA1\u6709\u8FD9\u6837\u7684\u9875\u9762\u548C\u5185\u5BB9\uFF09\uFF0C\u4E00\u822C\u5BB9\u6613\u51FA\u73B0\u5728\u641C\u7D22\u9875\u9762\u3002

\u5B58\u50A8\u578BXSS\uFF1A&lt;\u6301\u4E45\u578B/\u5B58\u50A8\u578B&gt; \u4EE3\u7801\u662F\u5B58\u50A8\u5728\u670D\u52A1\u5668\u4E2D\u7684\uFF0C\u5982\u5728\u4E2A\u4EBA\u4FE1\u606F\u6216\u53D1\u8868\u6587\u7AE0\u7B49\u5730\u65B9\uFF0C\u52A0\u5165\u4EE3\u7801\uFF0C\u5982\u679C\u6CA1\u6709\u8FC7\u6EE4\u6216\u8FC7\u6EE4\u4E0D\u4E25\uFF0C\u90A3\u4E48\u8FD9\u4E9B\u4EE3\u7801\u5C06\u50A8\u5B58\u5230\u670D\u52A1\u5668\u4E2D\uFF0C\u6BCF\u5F53\u6709\u7528\u6237\u8BBF\u95EE\u8BE5\u9875\u9762\u7684\u65F6\u5019\u90FD\u4F1A\u89E6\u53D1\u4EE3\u7801\u6267\u884C\uFF0C\u8FD9\u79CDXSS\u975E\u5E38\u5371\u9669\uFF0C\u5BB9\u6613\u9020\u6210\u8815\u866B\uFF0C\u5927\u91CF\u76D7\u7A83cookie

DOM\u578BXSS\uFF1A\u57FA\u4E8E\u6587\u6863\u5BF9\u8C61\u6A21\u578BDocument Objeet Model\uFF0CDOM)\u7684\u4E00\u79CD\u6F0F\u6D1E\u3002DOM\u662F\u4E00\u4E2A\u4E0E\u5E73\u53F0\u3001\u7F16\u7A0B\u8BED\u8A00\u65E0\u5173\u7684\u63A5\u53E3\uFF0C\u5B83\u5141\u8BB8\u7A0B\u5E8F\u6216\u811A\u672C\u52A8\u6001\u5730\u8BBF\u95EE\u548C\u66F4\u65B0\u6587\u6863\u5185\u5BB9\u3001\u7ED3\u6784\u548C\u6837\u5F0F\uFF0C\u5904\u7406\u540E\u7684\u7ED3\u679C\u80FD\u591F\u6210\u4E3A\u663E\u793A\u9875\u9762\u7684\u4E00\u90E8\u5206\u3002
</code></pre><p><strong>\u5F71\u54CD</strong>\uFF1A</p><pre><code>1. \u52AB\u6301\u8BBF\u95EE\uFF1A\u5728\u811A\u672C\u4E2D\u63D2\u5165\u6076\u610F\u4EE3\u7801\uFF0C\u9875\u9762\u81EA\u52A8\u8DF3\u8F6C\u5230\u7279\u5B9A\u9875\u9762
2. \u76D7\u7528cookie\u5B9E\u73B0\u65E0\u5BC6\u7801\u767B\u5F55
3. \u914D\u5408csrf\u653B\u51FB\u5B8C\u6210\u6076\u610F\u8BF7\u6C42
</code></pre><p><strong>\u9632\u8303</strong></p><pre><code>1. \u9996\u5148\u662F\u8FC7\u6EE4\u3002\u5BF9\u8BF8\u5982&lt;script&gt;\u3001&lt;img&gt;\u3001&lt;a&gt;\u7B49\u6807\u7B7E\u8FDB\u884C\u8FC7\u6EE4\u3002
2. \u5176\u6B21\u662F\u7F16\u7801\u3002\u50CF\u4E00\u4E9B\u5E38\u89C1\u7684\u7B26\u53F7\uFF0C\u5982&lt;&gt;\u5728\u8F93\u5165\u7684\u65F6\u5019\u8981\u5BF9\u5176\u8FDB\u884C\u8F6C\u6362\u7F16\u7801\uFF0C\u8FD9\u6837\u505A\u6D4F\u89C8\u5668\u662F\u4E0D\u4F1A\u5BF9\u8BE5\u6807\u7B7E\u8FDB\u884C\u89E3\u91CA\u6267\u884C\u7684\uFF0C\u540C\u65F6\u4E5F\u4E0D\u5F71\u54CD\u663E\u793A\u6548\u679C\u3002
3. \u6700\u540E\u662F\u9650\u5236\u3002\u901A\u8FC7\u4EE5\u4E0A\u7684\u6848\u4F8B\u6211\u4EEC\u4E0D\u96BE\u53D1\u73B0xss\u653B\u51FB\u8981\u80FD\u8FBE\u6210\u5F80\u5F80\u9700\u8981\u8F83\u957F\u7684\u5B57\u7B26\u4E32\uFF0C\u56E0\u6B64\u5BF9\u4E8E\u4E00\u4E9B\u53EF\u4EE5\u9884\u671F\u7684\u8F93\u5165\u53EF\u4EE5\u901A\u8FC7\u9650\u5236\u957F\u5EA6\u5F3A\u5236\u622A\u65AD\u6765\u8FDB\u884C\u9632\u5FA1\u3002
</code></pre><h2 id="\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020csrf" tabindex="-1">\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020CSRF <a class="header-anchor" href="#\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020csrf" aria-hidden="true">#</a></h2><p>CSRF(Cross-site request forgery), \u653B\u51FB\u8005\u76D7\u7528\u4E86\u4F60\u7684\u8EAB\u4EFD\uFF0C\u4EE5\u4F60\u7684\u540D\u4E49\u53D1\u9001\u6076\u610F\u8BF7\u6C42\u3002 <img src="`+p+`" alt="avatar"></p><p><strong>\u9632\u8303</strong></p><ol><li>\u5BA2\u6237\u7AEF\u9632\u8303\uFF1A\u5BF9\u4E8E\u6570\u636E\u5E93\u7684\u4FEE\u6539\u8BF7\u6C42\uFF0C\u5168\u90E8\u4F7F\u7528POST\u63D0\u4EA4\uFF0C\u7981\u6B62\u4F7F\u7528GET\u8BF7\u6C42\u3002 \u670D\u52A1\u5668\u7AEF\u9632\u8303\uFF1A\u4E00\u822C\u7684\u505A\u6CD5\u662F\u5728\u8868\u5355\u91CC\u9762\u6DFB\u52A0\u4E00\u6BB5\u9690\u85CF\u7684\u552F\u4E00\u7684token(\u8BF7\u6C42\u4EE4\u724C)</li></ol><div class="language-php"><pre><code>$hash = md5($_COOKIE[&#39;cookie&#39;]);
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>\u201Dhidden\u201D</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>\u201Dhash\u201D</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>\u201D<span class="token php language-php"><span class="token delimiter important">&lt;?=</span><span class="token variable">$hash</span><span class="token punctuation">;</span><span class="token delimiter important">?&gt;</span></span>\u201D</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><ol start="2"><li>anti-csrf-token</li></ol><p>CSRF-Token\u3001JWT\u3001 Bearer token</p><p>\u53C2\u8003\uFF1A</p><p><a href="https://segmentfault.com/a/1190000018017118" target="_blank" rel="noopener noreferrer">https://segmentfault.com/a/1190000018017118</a></p><p><a href="https://zhuanlan.zhihu.com/p/26177815" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/26177815</a></p><p><a href="https://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html</a></p><p><a href="https://www.jianshu.com/p/c69f08ca056d" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/c69f08ca056d</a></p><p><a href="http://javascript.ruanyifeng.com/bom/cors.html#toc1" target="_blank" rel="noopener noreferrer">http://javascript.ruanyifeng.com/bom/cors.html#toc1</a></p>`,66),l=[c];function i(r,u,k,d,h,g){return s(),a("div",null,l)}var b=n(o,[["render",i]]);export{f as __pageData,b as default};
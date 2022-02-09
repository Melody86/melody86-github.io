import{_ as n,c as s,o as a,a as t}from"./app.ef7d15e7.js";const h='{"title":"ES6","description":"","frontmatter":{"date":"2021-05-17T00:00:00.000Z","title":"ES6","tags":["ES6"],"describe":"ES6"},"headers":[{"level":2,"title":"1. let \u548C const","slug":"_1-let-\u548C-const"},{"level":3,"title":"","slug":""},{"level":2,"title":"2. Promise\u5BF9\u8C61","slug":"_2-promise\u5BF9\u8C61"},{"level":2,"title":"3. Proxy","slug":"_3-proxy"},{"level":2,"title":"4. Async","slug":"_4-async"},{"level":2,"title":"5. Class","slug":"_5-class"},{"level":2,"title":"6. Module","slug":"_6-module"},{"level":2,"title":"QA","slug":"qa"}],"relativePath":"basics/ES6.md","lastUpdated":1643980658285}',p={},o=t(`<h1 id="es6" tabindex="-1">ES6 <a class="header-anchor" href="#es6" aria-hidden="true">#</a></h1><h2 id="_1-let-\u548C-const" tabindex="-1">1. let \u548C const <a class="header-anchor" href="#_1-let-\u548C-const" aria-hidden="true">#</a></h2><p>ES5 \u53EA\u6709\u5168\u5C40\u4F5C\u7528\u57DF\u548C\u51FD\u6570\u4F5C\u7528\u57DF</p><p>\u4E0B\u9762\u53D8\u91CFi\u662Flet\u58F0\u660E\u7684\uFF0C\u5F53\u524D\u7684i\u53EA\u5728\u672C\u8F6E\u5FAA\u73AF\u6709\u6548\uFF0C\u6240\u4EE5\u6BCF\u4E00\u6B21\u5FAA\u73AF\u7684i\u5176\u5B9E\u90FD\u662F\u4E00\u4E2A\u65B0\u7684\u53D8\u91CF\uFF0C\u6240\u4EE5\u6700\u540E\u8F93\u51FA\u7684\u662F6\u3002\u4F60\u53EF\u80FD\u4F1A\u95EE\uFF0C\u5982\u679C\u6BCF\u4E00\u8F6E\u5FAA\u73AF\u7684\u53D8\u91CFi\u90FD\u662F\u91CD\u65B0\u58F0\u660E\u7684\uFF0C\u90A3\u5B83\u600E\u4E48\u77E5\u9053\u4E0A\u4E00\u8F6E\u5FAA\u73AF\u7684\u503C\uFF0C\u4ECE\u800C\u8BA1\u7B97\u51FA\u672C\u8F6E\u5FAA\u73AF\u7684\u503C\uFF1F\u8FD9\u662F\u56E0\u4E3A JavaScript \u5F15\u64CE\u5185\u90E8\u4F1A\u8BB0\u4F4F\u4E0A\u4E00\u8F6E\u5FAA\u73AF\u7684\u503C\uFF0C\u521D\u59CB\u5316\u672C\u8F6E\u7684\u53D8\u91CFi\u65F6\uFF0C\u5C31\u5728\u4E0A\u4E00\u8F6E\u5FAA\u73AF\u7684\u57FA\u7840\u4E0A\u8FDB\u884C\u8BA1\u7B97\u3002</p><div class="language-js"><pre><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
a<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 6</span>

<span class="token comment">//\u53E6\u5916\uFF0Cfor\u5FAA\u73AF\u8FD8\u6709\u4E00\u4E2A\u7279\u522B\u4E4B\u5904\uFF0C\u5C31\u662F\u8BBE\u7F6E\u5FAA\u73AF\u53D8\u91CF\u7684\u90A3\u90E8\u5206\u662F\u4E00\u4E2A\u7236\u4F5C\u7528\u57DF\uFF0C\u800C\u5FAA\u73AF\u4F53\u5185\u90E8\u662F\u4E00\u4E2A\u5355\u72EC\u7684\u5B50\u4F5C\u7528\u57DF\u3002</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token string">&#39;abc&#39;</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// abc</span>
<span class="token comment">// abc</span>
<span class="token comment">// abc</span>

</code></pre></div><p>ES6 \u89C4\u5B9A\u6682\u65F6\u6027\u6B7B\u533A\u548Clet\u3001const\u8BED\u53E5\u4E0D\u51FA\u73B0\u53D8\u91CF\u63D0\u5347\uFF0C\u4E3B\u8981\u662F\u4E3A\u4E86\u51CF\u5C11\u8FD0\u884C\u65F6\u9519\u8BEF\uFF0C\u9632\u6B62\u5728\u53D8\u91CF\u58F0\u660E\u524D\u5C31\u4F7F\u7528\u8FD9\u4E2A\u53D8\u91CF\uFF0C\u4ECE\u800C\u5BFC\u81F4\u610F\u6599\u4E4B\u5916\u7684\u884C\u4E3A\u3002</p><ul><li>ES6 \u5141\u8BB8\u5757\u7EA7\u4F5C\u7528\u57DF\u7684\u4EFB\u610F\u5D4C\u5957\u3002</li><li>ES5 \u89C4\u5B9A\uFF0C\u51FD\u6570\u53EA\u80FD\u5728\u9876\u5C42\u4F5C\u7528\u57DF\u548C\u51FD\u6570\u4F5C\u7528\u57DF\u4E4B\u4E2D\u58F0\u660E\uFF0C\u4E0D\u80FD\u5728\u5757\u7EA7\u4F5C\u7528\u57DF\u58F0\u660E\u3002ES6 \u5F15\u5165\u4E86\u5757\u7EA7\u4F5C\u7528\u57DF\uFF0C\u660E\u786E\u5141\u8BB8\u5728\u5757\u7EA7\u4F5C\u7528\u57DF\u4E4B\u4E2D\u58F0\u660E\u51FD\u6570\u3002ES6 \u89C4\u5B9A\uFF0C\u5757\u7EA7\u4F5C\u7528\u57DF\u4E4B\u4E2D\uFF0C\u51FD\u6570\u58F0\u660E\u8BED\u53E5\u7684\u884C\u4E3A\u7C7B\u4F3C\u4E8Elet\uFF0C\u5728\u5757\u7EA7\u4F5C\u7528\u57DF\u4E4B\u5916\u4E0D\u53EF\u5F15\u7528\u3002</li><li>\u5141\u8BB8\u5728\u5757\u7EA7\u4F5C\u7528\u57DF\u5185\u58F0\u660E\u51FD\u6570\u3002\u51FD\u6570\u58F0\u660E\u7C7B\u4F3C\u4E8Evar\uFF0C\u5373\u4F1A\u63D0\u5347\u5230\u5168\u5C40\u4F5C\u7528\u57DF\u6216\u51FD\u6570\u4F5C\u7528\u57DF\u7684\u5934\u90E8\u3002\u540C\u65F6\uFF0C\u51FD\u6570\u58F0\u660E\u8FD8\u4F1A\u63D0\u5347\u5230\u6240\u5728\u7684\u5757\u7EA7\u4F5C\u7528\u57DF\u7684\u5934\u90E8\u3002</li></ul><p>const\u5B9E\u9645\u4E0A\u4FDD\u8BC1\u7684\uFF0C\u5E76\u4E0D\u662F\u53D8\u91CF\u7684\u503C\u4E0D\u5F97\u6539\u52A8\uFF0C\u800C\u662F\u53D8\u91CF\u6307\u5411\u7684\u90A3\u4E2A\u5185\u5B58\u5730\u5740\u6240\u4FDD\u5B58\u7684\u6570\u636E\u4E0D\u5F97\u6539\u52A8\u3002</p><ul><li>ES5 \u53EA\u6709\u4E24\u79CD\u58F0\u660E\u53D8\u91CF\u7684\u65B9\u6CD5\uFF1Avar\u547D\u4EE4\u548Cfunction\u547D\u4EE4</li><li>ES6 var, function, let, const, import, class</li></ul><div class="language-js"><pre><code><span class="token comment">// let\u547D\u4EE4\u3001const\u547D\u4EE4\u3001class\u547D\u4EE4\u58F0\u660E\u7684\u5168\u5C40\u53D8\u91CF\uFF0C\u4E0D\u5C5E\u4E8E\u9876\u5C42\u5BF9\u8C61\u7684\u5C5E\u6027\u3002</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">// \u5982\u679C\u5728 Node \u7684 REPL \u73AF\u5883\uFF0C\u53EF\u4EE5\u5199\u6210 global.a</span>
<span class="token comment">// \u6216\u8005\u91C7\u7528\u901A\u7528\u65B9\u6CD5\uFF0C\u5199\u6210 this.a</span>
window<span class="token punctuation">.</span>a <span class="token comment">// 1</span>

</code></pre></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3><h2 id="_2-promise\u5BF9\u8C61" tabindex="-1">2. Promise\u5BF9\u8C61 <a class="header-anchor" href="#_2-promise\u5BF9\u8C61" aria-hidden="true">#</a></h2><h2 id="_3-proxy" tabindex="-1">3. Proxy <a class="header-anchor" href="#_3-proxy" aria-hidden="true">#</a></h2><h2 id="_4-async" tabindex="-1">4. Async <a class="header-anchor" href="#_4-async" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token comment">// QA:</span>
<span class="token comment">// \u5B9E\u73B0delay\u51FD\u6570\u903B\u8F91\uFF0C\u5E76\u6253\u5370\u51FAtest\u8FD4\u56DE\u503C 1000</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> time <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> time<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5B9E\u73B0\uFF1A</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_5-class" tabindex="-1">5. Class <a class="header-anchor" href="#_5-class" aria-hidden="true">#</a></h2><h2 id="_6-module" tabindex="-1">6. Module <a class="header-anchor" href="#_6-module" aria-hidden="true">#</a></h2><p><a href="https://zhuanlan.zhihu.com/p/75980415" target="_blank" rel="noopener noreferrer">\u524D\u7AEF\u6A21\u5757\u5316\uFF08AMD\u3001CommonJS\u3001UMD\uFF09\u603B\u7ED3</a></p><h2 id="qa" tabindex="-1">QA <a class="header-anchor" href="#qa" aria-hidden="true">#</a></h2><ol><li>\u5982\u4F55\u81EA\u5DF1\u5B9E\u73B0let? \u65B9\u5F0F1\uFF1A\u901A\u8FC7\u53D8\u91CF\u4FDD\u5B58\u72B6\u6001</li></ol><p>\u65B9\u5F0F2\uFF1Atry-catch</p><div class="language-js"><pre><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> i<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
<span class="token comment">// try-catch\u4F2A\u9020\u7684\u5757\u7EA7\u4F5C\u7528\u57DF\u5B58\u5728\u4E8Ecatch\u91CC\uFF0C\u5176\u4E2De\u662F\u4E00\u4E2A\u6709\u7740\u7C7B\u4F3C\u4E8E\u5757\u7EA7\u4F5C\u7528\u57DF\u53D8\u91CF\u7684\u7279\u6027\u7684\u72EC\u7ACB\u53D8\u91CF</span>
<span class="token comment">// \u4ED6\u4E0D\u662Fi\uFF0C\u6240\u4EE5\u80FD\u591F\u4FDD\u7559\u4E0Bi\u7684\u72B6\u6001\u7684\u53D8\u5316</span>
</code></pre></div><p>\u65B9\u5F0F3\uFF1A\u81EA\u6267\u884C\u51FD\u6570</p><p>\u65B9\u5F0F4\uFF1Amap,forEach (\u901A\u8FC7map\u3001 forEach\u4FDD\u5B58\u72B6\u6001)</p><div class="language-js"><pre><code>  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><strong>\u975E\u5FAA\u73AF\u4E2D\u5B9E\u73B0</strong></p><div class="language-js"><pre><code>  <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&#39;World!&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> name <span class="token operator">===</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&#39;Jack&#39;</span><span class="token punctuation">;</span>  <span class="token comment">//\u7ACB\u5373\u6267\u884C\u51FD\u6570\u5185\u53D8\u91CF\u63D0\u5347</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Goodbye &#39;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello &#39;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">/* \u7ACB\u5373\u6267\u884C\u51FD\u6570 var name = &#39;Jack&#39;; \u5185\u53D8\u91CF\u63D0\u5347\uFF0C\u8F93\u51FA Goodbye Jack\uFF0C\u5B9E\u9645\u6267\u884C\u987A\u5E8F\u5982\u4E0B: */</span>

  <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">use strict</span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&#39;World!&#39;</span><span class="token punctuation">;</span>

  <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> name <span class="token operator">===</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>     
        <span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">&#39;Jack&#39;</span><span class="token punctuation">;</span>     
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Goodbye &#39;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello &#39;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>

  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">/* let\u58F0\u660E\uFF0C\u6CA1\u6709\u53D8\u91CF\u63D0\u5347, \u8F93\u51FA Hello World */</span>
</code></pre></div><p><strong>\u7B80\u5355\u7684polyfill\u7248\u672C</strong></p><p><a href="https://zhuanlan.zhihu.com/p/71640183" target="_blank" rel="noopener noreferrer">\u77E5\u4E4E polyfill</a></p><div class="language-js"><pre><code>  <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">use strict</span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&#39;World!&#39;</span><span class="token punctuation">;</span>

  <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> name <span class="token operator">===</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&#39;Jack&#39;</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Goodbye &#39;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>

        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello &#39;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><ol><li>diff \u7B97\u6CD5\u4E3A\u4EC0\u4E48\u8981\u4ECE\u4E24\u8FB9\u5411\u4E2D\u95F4\u6BD4\u5BF9\uFF0C\u6DF1\u5EA6\u8FD8\u662F\u5E7F\u5EA6</li><li>nodejs \u9002\u5408\u4EC0\u4E48\u573A\u666F</li><li>compositionAPI\u548Cmixins\u7684\u533A\u522B</li><li>vue3\u505A\u4E86\u54EA\u4E9B\u4F18\u5316</li><li>http2 \u4E8C\u8FDB\u5236\u5E27</li></ol>`,31),e=[o];function c(l,u,i,k,r,d){return a(),s("div",null,e)}var g=n(p,[["render",c]]);export{h as __pageData,g as default};

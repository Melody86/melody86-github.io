import{_ as n,c as s,o as a,a as p}from"./app.ff3b22ed.js";const w='{"title":"\u7B80\u5355\u7B97\u6CD5","description":"","frontmatter":{"date":"2021-05-17T00:00:00.000Z","title":"\u7B80\u5355\u7B97\u6CD5","tags":["algorithme","js"],"describe":null},"headers":[{"level":2,"title":"1. \u6570\u7EC4\u53BB\u91CD","slug":"_1-\u6570\u7EC4\u53BB\u91CD"},{"level":2,"title":"2. \u5FEB\u6392","slug":"_2-\u5FEB\u6392"}],"relativePath":"basics/jsAlgorithms.md","lastUpdated":1643984457668}',t={},o=p(`<h2 id="_1-\u6570\u7EC4\u53BB\u91CD" tabindex="-1">1. \u6570\u7EC4\u53BB\u91CD <a class="header-anchor" href="#_1-\u6570\u7EC4\u53BB\u91CD" aria-hidden="true">#</a></h2><p>nums = [1,2,3,3,4,5,6,6,7] \u901A\u8FC7 without(nums, 1,3,5) \u53BB\u91CD1,3,5. \u8FD4\u56DE [2,4,6,6,7]</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">without</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> nums <span class="token operator">=</span> arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span> <span class="token operator">||</span> nums<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 
    <span class="token keyword">if</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> nums<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    nums<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span> <span class="token keyword">return</span> a <span class="token operator">-</span>b <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    args<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span> <span class="token keyword">return</span> a <span class="token operator">-</span>b <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    nums<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> isContain <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        args<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>arg <span class="token operator">===</span> num<span class="token punctuation">)</span><span class="token punctuation">{</span>
                isContain <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>isContain<span class="token punctuation">)</span><span class="token punctuation">{</span>
            res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;res&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
    <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u7B97\u6CD5\u590D\u6742\u5EA6 m\u7684n\u6B21</p><h2 id="_2-\u5FEB\u6392" tabindex="-1">2. \u5FEB\u6392 <a class="header-anchor" href="#_2-\u5FEB\u6392" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">qsort</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> left<span class="token punctuation">,</span> right</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> left <span class="token operator">&gt;=</span> right<span class="token punctuation">)</span> <span class="token keyword">return</span> arr<span class="token punctuation">;</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> left<span class="token punctuation">,</span>
    j <span class="token operator">=</span> right<span class="token punctuation">,</span>
    base <span class="token operator">=</span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token operator">&lt;</span>j<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// \u5148\u4ECE\u53F3\u8FB9\u5F80\u5DE6\u8FB9\u627E: \u7531\u4E8E\u6761\u4EF6i &lt; j, \u82E5\u5148\u4ECE\u5DE6\u5F80\u53F3\u8FB9\u67E5\u627E\uFF0C\u5219\u505C\u7559\u7684\u503Carr[i]\u53EF\u80FD\u6BD4\u57FA\u6570base\u5C0F\uFF0C\u4EA4\u6362\u540Ebase\u53CD\u800C\u6392\u5728\u524D\u9762\u3002</span>
        <span class="token comment">// \u82E5\u60F3\u5148\u4ECE\u5DE6\u5F80\u53F3\u67E5\u627E\uFF0C\u53EA\u9700\u628Abase\u8BBE\u7F6E\u5728\u53F3\u4FA7\u5373\u53EF</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token operator">&lt;</span>j <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;=</span> base<span class="token punctuation">)</span><span class="token punctuation">{</span>
            j<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token operator">&lt;</span>j <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> base<span class="token punctuation">)</span><span class="token punctuation">{</span>
            i<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token operator">&lt;</span>j<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">let</span> temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> base<span class="token punctuation">;</span>

    <span class="token function">qsort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> left<span class="token punctuation">,</span> i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">qsort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>\u4E8C\u5206\u67E5\u627E</strong></p><div class="language-js"><pre><code><span class="token comment">// \u5B58\u5728\uFF1A\u8FD4\u56DE\u76EE\u6807\u503C\u6240\u5728\u6570\u7EC4\u7D22\u5F15</span>
<span class="token keyword">function</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> right <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span><span class="token punctuation">{</span>
        mid <span class="token operator">=</span> left <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">===</span> target<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target<span class="token punctuation">)</span><span class="token punctuation">{</span>
            left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            right <span class="token operator">=</span> mid <span class="token operator">-</span><span class="token number">1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">//leetcode 35. \u641C\u7D22\u63D2\u5165\u4F4D\u7F6E</span>
<span class="token keyword">function</span> <span class="token function">searchInsert</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> r <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> ans <span class="token operator">=</span> r <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> r<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>r <span class="token operator">-</span> l <span class="token operator">&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> l<span class="token punctuation">;</span> <span class="token comment">//\u5411\u4E0B\u53D6\u6574</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>target <span class="token operator">&lt;=</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            ans <span class="token operator">=</span> mid
            r <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            l <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> ans
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">searchInsert</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> r <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> r<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//\u5411\u4E0B\u53D6\u6574\uFF0Cleft + (right - left) / 2 \u5C31\u548C(left + right) / 2 \u6548\u679C\u76F8\u540C\uFF0C\u4F46\u524D\u8005\u80FD\u907F\u514D\u503C\u6EA2\u51FA</span>
        <span class="token keyword">let</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>r <span class="token operator">-</span> l <span class="token operator">&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> l<span class="token punctuation">;</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span>target <span class="token operator">&lt;</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            r <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            l <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> l
<span class="token punctuation">}</span>
</code></pre></div><p>leetcode 401 [<a href="https://leetcode-cn.com/problems/binary-watch/" target="_blank" rel="noopener noreferrer">https://leetcode-cn.com/problems/binary-watch/</a>]</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">readBinaryWatch</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">dps</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> res<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
* time \u4E8C\u8FDB\u5236\u8868\u793A\u7684\u65F6\u95F4, res\u7ED3\u679C\u6570\u7EC4, index\u5224\u65AD\u5F53\u524D\u662F\u5426\u4EAE\u706F\u7D22\u5F15, n\u5269\u4F59\u53EF\u4EAE\u706F\u6570\u91CF 
*/</span>
<span class="token keyword">function</span> <span class="token function">dps</span><span class="token punctuation">(</span><span class="token parameter">time<span class="token punctuation">,</span> res<span class="token punctuation">,</span> index<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> hr <span class="token operator">=</span> time <span class="token operator">&gt;&gt;</span> <span class="token number">6</span><span class="token punctuation">,</span> min <span class="token operator">=</span> time <span class="token operator">&amp;</span> <span class="token number">0b111111</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>hr <span class="token operator">&gt;</span> <span class="token number">11</span> <span class="token operator">||</span> min <span class="token operator">&gt;</span> <span class="token number">59</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>hr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>min <span class="token operator">&gt;</span> <span class="token number">10</span> <span class="token operator">?</span> min<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token string">&#39;0&#39;</span><span class="token operator">+</span>min<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>index <span class="token operator">&lt;=</span> <span class="token number">10</span> <span class="token operator">-</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">dps</span><span class="token punctuation">(</span>time <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> index<span class="token punctuation">)</span><span class="token punctuation">,</span> res<span class="token punctuation">,</span> <span class="token operator">++</span>index<span class="token punctuation">,</span> n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>DFS (Depth First Search) \u6DF1\u5EA6\u4F18\u5148\u641C\u7D22 <br> BFS (Breadth-First Search) \u5E7F\u5EA6\u4F18\u5148\u641C\u7D22 DP(Dynamic Plan) \u52A8\u6001\u89C4\u5212 <br> backtrack \u56DE\u6EAF</p><p>Math.floor // floor\u5730\u677F Math.ceil // ceil\u5929\u82B1\u677F</p><p>\u53CD\u8F6C\u94FE\u8868</p><div class="language-js"><pre><code><span class="token keyword">var</span> <span class="token function-variable function">reverseList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 
        \u7C7B\u6BD4\u601D\u8003 \u53CD\u8F6C\u6570\u7EC4\u601D\u8DEF \u53CC\u7AEF\u6307\u9488\u5B9E\u73B0
        while (l &lt; r) swap(a, l++, r--)
        \u6570\u7EC4\u4F4D\u7F6E\u7684\u4EA4\u6362\u662F\u8FD9\u6837 [a[i], a[j]] = [a[j], a[i]]
        \u4F46\u662F \u5355\u94FE\u8868\u53EA\u80FD\u4F9D\u6B21\u901A\u8FC7 next \u8BBF\u95EE \u4E0D\u80FD\u901A\u8FC7\u7D22\u5F15\u8BBF\u95EE 
        \u94FE\u8868\u7684\u4EA4\u6362\u9700\u8981\u6269\u5C55\u4E00\u4E2A\u6307\u9488 \u5373next
        cur \u5F53\u524D\u9879
        prev \u4E0A\u4E00\u9879
        cur.next \u5F53\u524D\u6307\u9488\u6307\u5411
        [ cur.next, prev, cur ] = [prev, cur, cur.next]
        \u4E0A\u9762\u8FD9\u6BB5ES6\u8BED\u6CD5\u8868\u793A
        \u5F53\u524Dcur \u7684\u6307\u9488next \u6307\u5411prev\u4E0A\u4E00\u9879 \u5E76\u4E14 \u4EA4\u6362\u8FED\u4EE3prev \u548C next
    */</span>
    <span class="token keyword">let</span> <span class="token punctuation">[</span>p<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">null</span><span class="token punctuation">,</span> head<span class="token punctuation">]</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token punctuation">[</span>c<span class="token punctuation">.</span>next<span class="token punctuation">,</span> p<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>p<span class="token punctuation">,</span> c<span class="token punctuation">,</span> c<span class="token punctuation">.</span>next<span class="token punctuation">]</span>

    <span class="token keyword">return</span> p
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">reverseList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> pre <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> node <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> temp <span class="token operator">=</span> node<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>next <span class="token operator">=</span> pre<span class="token punctuation">;</span>
        pre <span class="token operator">=</span> node<span class="token punctuation">;</span>
        node <span class="token operator">=</span> temp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> pre<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/* \u9012\u5F52\u5B9E\u73B0 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">reverseList</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> head<span class="token punctuation">;</span>
    <span class="token keyword">var</span> last <span class="token operator">=</span> <span class="token function">reverseList</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
    head<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
    head<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span>

    <span class="token keyword">return</span> last
<span class="token punctuation">}</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">//\u6570\u7EC4\u7F13\u5B58</span>
<span class="token keyword">function</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> arr<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u53D8\u91CF\u7F13\u5B58</span>
<span class="token keyword">function</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> resn <span class="token operator">=</span> pre1 <span class="token operator">=</span> pre2 <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">[</span>resn<span class="token punctuation">,</span> pre1<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>pre1<span class="token operator">+</span>pre2<span class="token punctuation">,</span> pre2<span class="token punctuation">]</span>
        pre2 <span class="token operator">=</span> resn
    <span class="token punctuation">}</span> 
    <span class="token keyword">return</span> resn
<span class="token punctuation">}</span>
<span class="token comment">//\u6570\u7EC4\u9012\u5F52</span>
<span class="token keyword">function</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token keyword">void</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> arr<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">fb</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fb</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u6570\u5B57\u8F6C\u5343\u5206\u4F4D</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">parseNum</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\d{1,3}(?=(\\d{3})+$)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">s</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> s<span class="token operator">+</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

num<span class="token punctuation">.</span><span class="token function">toLocaleString</span><span class="token punctuation">(</span><span class="token string">&#39;en-US&#39;</span><span class="token punctuation">)</span> 
<span class="token comment">// \u5982(12345678.234566677).toLocaleString() \u8F93\u51FA  &quot;12,345,678.235&quot;</span>

<span class="token keyword">function</span> <span class="token function">parseNum</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//\u5F02\u5E38\u5904\u7406</span>
    <span class="token keyword">var</span> <span class="token punctuation">[</span>left<span class="token punctuation">,</span> right<span class="token punctuation">]</span> <span class="token operator">=</span> num<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    left <span class="token operator">=</span> left<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> left<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> left<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        left<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token string">&#39;,&#39;</span><span class="token punctuation">;</span>
        i <span class="token operator">+=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    right <span class="token operator">=</span> right <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token operator">+</span>right<span class="token punctuation">)</span><span class="token operator">:</span><span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> left<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token operator">+</span> right<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre></div><p><a href="https://www.cnblogs.com/onepixel/p/7674659.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/onepixel/p/7674659.html</a></p><p>labuladong\uFF1A <a href="https://mp.weixin.qq.com/mp/homepage?__biz=MzAxODQxMDM0Mw==&amp;hid=1&amp;sn=85a6bce3d32ba586bac86ccdbd4eb01e&amp;scene=18#wechat_redirect" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/mp/homepage?__biz=MzAxODQxMDM0Mw==&amp;hid=1&amp;sn=85a6bce3d32ba586bac86ccdbd4eb01e&amp;scene=18#wechat_redirect</a></p>`,19),e=[o];function c(u,l,k,r,i,d){return a(),s("div",null,e)}var f=n(t,[["render",c]]);export{w as __pageData,f as default};

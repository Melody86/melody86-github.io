
/*
* 计算中英文句子总长度，中文算2个
* @param: val: 包含中英文的句子
* @return 句子长度
*/ 
export const getSentenceLen = function getSentenceLen(val) {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
      let length = val.charCodeAt(i);
      if( length >= 0 && length <= 128 ) {
        len += 1;
      } else {
        len += 2;
      }
    }
    return len;
}

// 判断是ios还是安卓
export const isIOSorAndroid = function isIOSorAndroid() {
    const inBrowser = typeof window !== 'undefined';
    const UA = inBrowser && window.navigator.userAgent.toLowerCase();
    const isAndroid = /(android);?[\s/]+([\d.]+)?/.test(UA);
    const isIpad = /(ipad).*os\s([\d_]+)/.test(UA);
    const isIpod = /(ipod)(.*os\s([\d_]+))?/.test(UA);
    const isIphone = !isIpad && /(iphone\sos)\s([\d_]+)/.test(UA);
    if (isAndroid) return 'android';
    if (isIpad || isIpod || isIphone) return 'ios';
    return false;
  };


// 节流
export const throttle = function (fn, delay){
    let timer = null;
    let startTime = 0;
  
    return function(){
      let context = this;
      let args = arguments;
      let currTime = new Date();
      let remain = delay - ( currTime - startTime );
      clearTimeout(timer);
      if(remain <= 0){
          fn.apply(context, arguments)
          startTime = new Date()
      }else{
        timer =  setTimeout(fn, remain)
      }
    }
}
// 防抖, 单位时间内仅仅执行一次，再次触发时重置时间
export const debounce = function(fn, delay){
    let timer = null
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        setTimeout(()=>{
            fn.call(this, arguments)
        }, delay)
    }
}

/*
*   查找 document 样式表中 特定样式relus, 返回对应索引
*   @param name: 需要查找的样式名称
*   @param type: 需要查找的样式的类型，增强校验
*   @return 样式对应索引
*   site: https://docs.microsoft.com/zh-cn/archive/blogs/msdn_answers/part-i-using-javascript-to-set-keyframes-in-css-animations-windows-store-apps-ie
*/ 
export const getDocumentCSSRule = function getDocumentCSSRule(name, type) {
    let rule
    let ss = document.styleSheets
    let cssRule

    for (var i = 0; i < ss.length; i++) {
        try{
        for (var x = 0; x < ss[i].cssRules.length; x++) {
            rule = ss[i].cssRules[x]
            // rule.name 兼容scoped下选择器筛选，（如：typing-59b014f3）
            if (rule.type === type && rule.name && (rule.name === name || rule.name.indexOf(name+'-') >= 0)) {
                return rule
            }
        }
        }catch(e){
            continue
        }
    }
    return cssRule
}

export default {
    getSentenceLen,
    isIOSorAndroid,
    throttle,
    debounce,
    getDocumentCSSRule,
}
<script setup>
import { computed, ref, onMounted,  } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute, useData } from 'vitepress'
import axios from 'axios'
 
let randomWords = ref(null)

// 判断是ios还是安卓
const isIOSorAndroid = function isIOSorAndroid() {
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

const ismobile = isIOSorAndroid()

// onCreated(()=>{
//   import('vue3-aplayer').then(function (m) {
//   app.component('Aplayer', m.default)
//   })
// })
onMounted(()=>{
  
  throttle(getRandomWords, 12500, {leading: true, trailing: true})()

  window.addEventListener('load', ()=>{
    //轮播器
    window.swiper = new Swiper('.mySwiper', {
      // Optional parameters
      loop: true,
      autoplay: true,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })
     
    //音乐播放器  https://aplayer.js.org/#/zh-Hans/?id=cdn
    const aplayer = new APlayer({
      container: document.getElementById('aplayer'),
      theme: '#FF3030',
      audio: musicList.value
    });
    //绑定播放器旋转样式 .aplayer-ani
    const playerCover = document.getElementsByClassName('aplayer-pic')[0]
    aplayer.on('pause', ()=>{
      playerCover.setAttribute('class', 'aplayer-pic')
    })
    aplayer.on('play', ()=>{
      playerCover.setAttribute('class', 'aplayer-pic aplayer-ani')
    })
    if(ismobile){
      aplayer.setMode('mini')
    }else{
      aplayer.setMode('normal')
    }
    
    window.aplayer = aplayer
  })
})


function throttle(fn, wait, options = {}) {
    let timer;
    let previous = 0;
    let throttled = function () {
        let now = +new Date();
        // remaining 不触发下一次函数的剩余时间
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        if (remaining < 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            fn.apply(this, arguments)
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(() => {
                previous = options.leading === false ? 0 : new Date().getTime();
                timer = null;
                fn.apply(this, arguments);
            }, remaining);
        }
    }
    return throttled;
}

// Get string width
function getStringWidth(val) {
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

const getRandomWords = function(){
  const len = ismobile ? 16 : 45
  axios.get(`https://international.v1.hitokoto.cn/?c=b&max_length=${len}`).then((res)=>{
    if(res){
      randomWords.value = res.data.hitokoto
      const randElem = document.getElementById('header-random-words')
      const randomWordsLen = getStringWidth(res.data.hitokoto)
      console.log('randElem.style: ', randElem)
      if(randElem){
        randElem.style.width = randomWordsLen / 2 + 'em'
        const steps = `steps(${( randomWordsLen )*2 }, end)`
        randElem.style.animationTimingFunction = steps
        randElem.style.animationDuration = 200 * randomWordsLen+"ms"
        randElem.style.webkitAnimationTimingFunction = steps

        // document.styleSheets[0].cssdeleteRule(0)  //删除之前动画样式
        let relus = getCSSRule('typing', CSSRule.KEYFRAMES_RULE)  //获取样式索引
        if(relus){
          // console.log('relus: ', relus)
          // relus.deleteRule("0")
          relus.deleteRule("1")
          relus.appendRule(`0% { width: 0; }`)
          relus.appendRule(`100% { width: ${ randomWordsLen / 2 }em; }`)
        }
      }
    }
  }).catch((e)=>{
    new Error('getRandomWords error: ', e)
  })
}

  /*
  *   查找 document 样式表中 特定样式relus, 返回对应索引
  *   @param name: 需要查找的样式名称
  *   @param type: 需要查找的样式的类型，增强校验
  *   @return 样式对应索引
  *   site: https://docs.microsoft.com/zh-cn/archive/blogs/msdn_answers/part-i-using-javascript-to-set-keyframes-in-css-animations-windows-store-apps-ie
  */ 
   function getCSSRule(name, type) {
      let rule
      let ss = document.styleSheets
      let cssRule

      for (var i = 0; i < ss.length; i++) {
        try{
          for (var x = 0; x < ss[i].cssRules.length; x++) {
            rule = ss[i].cssRules[x]
            if (rule.name && rule.name === name && rule.type === type) {
                return rule
            }
          }
        }catch(e){
          console.log('1111111111111')
          continue
        }
      }
      return cssRule
  }



const getImageClickLink = (item)=>{
  if(item && item !== '#'){
    if(item.indexOf('http') < 0){
      item = 'http://' + item 
    }
    return window.location.href = item
  }
}

const clickedHeaderPullDown = function(){
  const navheight = document.querySelector(".nav-bar").offsetHeight
  const swiperheight = document.querySelector('.header-img-swiper').offsetHeight
  window.scrollTo(0, swiperheight + navheight)
}

const { site, page, theme, frontmatter } = useData()
const { Layout } = DefaultTheme

const headPicList = computed(()=>{
  return frontmatter.value.headPicList ? frontmatter.value.headPicList : []
})

const isHasHeadImg = computed(()=>{
  return frontmatter.value && frontmatter.value.headPicList && frontmatter.value.headPicList.length > 0
})

const musicList = computed(()=>{
  return theme.value.musicList || []
})

// automatic multilang check for AlgoliaSearchBox
// const isMultiLang = computed(() => Object.keys(site.value.langs).length > 1)

</script>

<template>
  <Layout>
    <template #home-hero>
      <div v-if="isHasHeadImg" class="header-img-swiper">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" 
              v-for="(item,index) in headPicList" :key="index ">
              <img :src="item.src" @click="getImageClickLink(item.link)">
            </div>
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
       
        <div class="header-random" v-show="randomWords">
          <span style="vertical-align: top">「 </span>
          <span class="header-random-words" id="header-random-words">{{ randomWords }}</span>
          <span style="vertical-align: bottom">」</span> 
          
        </div>
        <div v-if="!ismobile" class="header-pull-down" @click="clickedHeaderPullDown()"></div>
      </div>
    </template>
    
  </Layout>

  <!-- https://github.com/SevenOutman/vue-aplayer/blob/develop/docs/README.md -->
  <!-- https://vueuse-motion-demo.netlify.app/installation.html -->
  <div id="aplayer" class="header-aplayer"></div>
  <!-- <Aplayer 
    class="header-aplayer"
    listFolded
    float
    theme="#FF3030"
    repeat="repeat-all"
    :list="theme.musicList"
    :music="theme.musicList[0]"
  /> -->
  
</template>

<style>
.nav-bar{
  z-index: 1000 !important;
}
.header-img-swiper{
  position: relative;
}
.header-random{
  display: flex;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  font-size: 30px;
  color: #fff;
}
@media screen and (max-width: 420px) {
  .header-random{
    top: 40px;
    font-size: 18px;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    color: #fff;
  }
}

.header-random .header-random-words{
  display: inline-block;
  width: 18.5em;
  white-space: nowrap;
  word-break: break-all;
  border-right: 2px solid transparent;
  overflow: hidden;
  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
  animation: typing 7.5s linear infinite, blink-caret .75s step-end infinite;
  -webkit-animation: typing 7.5s linear infinite, blink-caret .75s step-end infinite;
}
/* 打印效果 */
@keyframes typing {
  from { width: 0; }
  to { width: 18.5em; }
}

/* 光标闪啊闪 */
@keyframes blink-caret {
  from, to { box-shadow: 1px 0 0 0 transparent; }
  50% { box-shadow: 1px 0 0 0; }
}

.header-pull-down{
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  background: url('../assets/images/pull-down.png') no-repeat center center / 100% 100%;
  width: 48px;
  height: 48px;
  z-index: 999;
  -webkit-animation: home-down 1.7s ease-in-out;
  animation: home-down 1.7s infinite
}
.header-pull-down:hover{
  cursor: pointer
}
@-webkit-keyframes home-down {
    0% {
        transform: translate(-50%, 0)
    }

    50% {
        transform: translate(-50%,-10px)
    }

    to {
        transform: translate(-50%, 0)
    }
}

@keyframes home-down {
    0% {
        transform: translate(-50%, 0)
    }

    50% {
        transform: translate(-50%, -10px)
    }

    to {
        transform: translate(-50%, 0)
    }
}
#aplayer{
  max-width: 375px;
  bottom: 100px;
  left: 20px;
  position: fixed;
  z-index: 999;
  -moz-box-shadow: 2px 2px 10px #909090;/*firefox*/
  -webkit-box-shadow: 2px 2px 10px #909090;/*safari或chrome*/
  box-shadow:2px 2px 10px #909090;/*opera或ie9*/
}
#aplayer .aplayer-pic.aplayer-ani{
  border-radius: 50%;
  animation: player-rotation 4s linear infinite;
  -moz-animation: player-rotation 4s linear infinite;
  -webkit-animation: player-rotation 4s linear infinite;
  -o-animation: player-rotation 4s linear infinite;
}

@keyframes player-rotation{
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(360deg);}
}
@-webkit-keyframes player-rotation{
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(360deg);}
}
</style>
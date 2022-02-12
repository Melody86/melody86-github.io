<script setup>
import { computed, ref, onMounted, onBeforeMount, createApp } from 'vue'
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


onBeforeMount(()=>{
  import('vue3-aplayer').then((module)=>{
    const player = createApp(module.default, {
      listFolded: true,
      float: true,
      theme:"#FF3030",
      repeat: "repeat-all",
      list: theme.value.musicList,
      music: theme.value.musicList[0],
    }).mixin({
      mounted(){
        const player = document.getElementsByTagName('audio')[0]
        if(player && !window.aplayerAnimation){
          const playerCover = document.getElementsByClassName('aplayer-pic')[0]
          player.addEventListener('pause', ()=>{
            playerCover.setAttribute('class', 'aplayer-pic')
          })
          player.addEventListener('play', ()=>{
            playerCover.setAttribute('class', 'aplayer-pic aplayer-ani')
          })
          window.aplayerAnimation = true
          //绑定播放器旋转样式 .aplayer-ani
          if(ismobile){
            aplayer.setMode('mini')
          }else{
            aplayer.setMode('normal')
          }
        }
      }
    }).mount('#aplayer-body')
  })
})

onMounted(()=>{
  console.log('window load event:  0000000')
  throttle(getRandomWords, 12500, {leading: true, trailing: true})()
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
          relus.appendRule(`90% { width: ${ randomWordsLen / 2 }em; }`) //停顿一段时间
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
        <ClientOnly>
          <my-swiper class="my-swiper" :headPicList="headPicList"></my-swiper>
        </ClientOnly>
      
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
  <div 
    v-show="frontmatter.home"
    id="aplayer-body" 
    class="header-aplayer">
  </div>

</template>

<style lang="less">
.my-swiper{
  --swiper-theme-color: #fff;/* 设置Swiper风格 */
  --swiper-navigation-color: #fff;/* 单独设置按钮颜色 */
  --swiper-navigation-size: 35px;/* 设置按钮大小 默认是44px */
}
.nav-bar{
  z-index: 1000 !important;
}
.header-img-swiper{
  position: relative;
}
.header-img-swiper .swiper-slide img{
  width: 100%;
  height: auto;
  margin-top: auto;
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
  animation: typing 7.5s ease-in-out infinite, blink-caret .75s step-end infinite;
  -webkit-animation: typing 7.5s ease-in-out infinite, blink-caret .75s step-end infinite;
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
.header-aplayer{
  max-width: 300px;
  bottom: 100px;
  left: 20px;
  position: fixed !important;
  z-index: 999;
  .aplayer-info{
    margin-left: 10px !important;
    .aplayer-music{
      .aplayer-title{
        display: inline-block;
        margin-right: 4px;
        font-weight: 500;
      }
    }
  }
  
}
.header-aplayer .aplayer-pic.aplayer-ani{
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
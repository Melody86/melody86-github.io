<script setup>
import { computed, ref, onMounted, onBeforeMount, createApp } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute, useData } from 'vitepress'
import { isIOSorAndroid, } from '../../utils/index.js'
import randomWords from './randomWords.vue'

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
        }
      }
    }).mount('#aplayer-body')
  })
})

onMounted(()=>{
 
})

const clickedHeaderPullDown = function(){
  const nav = document.querySelector(".nav-bar")
  if(nav){
    const navheight = nav.offsetHeight
    const swiperheight = document.querySelector('.header-img-swiper').offsetHeight
    window.scrollTo(0, swiperheight + navheight)
  }
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
  <Layout >
    <template #home-hero id="homeHero">
      <div v-if="isHasHeadImg" class="header-img-swiper">
        <ClientOnly>
          <my-swiper class="my-swiper" :headPicList="headPicList"></my-swiper>
        </ClientOnly>

        <randomWords class="header-random"/>

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
.page{
  .container{
    max-width: 80% !important;
  }
}
@media screen and (max-width: 420px) {
  .page{
    .container{
      max-width: 100% !important;
    }
    div[class*='language-']{
      margin: 0 !important;
    }
  }
}
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
  height: 56.25vw;  //100vw*9/16
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
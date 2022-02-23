<template>
  <swiper 
    :watchSlidesProgress="true" 
    :slidesPerView="2" 
    class="my-swiper">

    <template v-for="(item,index) in picList" :key="index">
      <swiper-slide class="slide-desc-qrcode">
        <div class="slide-desc" @click="getImageClickLink(item.link)">
          <a>{{ item.title }}</a>
          <a>{{ item.desc }}</a>
        </div>
        <img :src="item.qrcode" clss="slide-qrcode" />
      </swiper-slide>
      <swiper-slide 
        class="slide-example"
        v-for="(pic, key) in item.example" 
        :key="key" >
        <img :src="pic" />
      </swiper-slide>
      <swiper-slide class="slide-line">
        <div></div>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script>
  import { defineComponent, computed } from "vue";
  import 'swiper/css'
  import "swiper/css/pagination"
  import "swiper/css/navigation"
  import { Swiper, SwiperSlide } from 'swiper/vue'
  // import Swiper core and required modules
  import SwiperCore, { Pagination, EffectCoverflow, Autoplay } from 'swiper'
  // install Swiper modules
  SwiperCore.use([Pagination, EffectCoverflow, Autoplay])

  export default {
    name: 'EffectSwiper',
    components: { Swiper, SwiperSlide },
    props: {
      picList: Array,
      height: {
        default: 700,
        type: String,
      },
    },
    setup(){
      const getImageClickLink = (item)=>{
        if(item && item !== '#'){
          if(item.indexOf('http') < 0){
            item = 'http://' + item 
          }
          return window.location.href = item
        }
      }
      return {
        getImageClickLink,
        modules: [Pagination, EffectCoverflow, Autoplay],
      }
    }
  }
</script>

<style lang="less" scoped>
.my-swiper{
  width: 100%;
  height: 700px;
  .swiper-slide{
    text-align: center;
    max-width: 300px;
    margin-right: 10px;
    .slide-desc{
      text-align: left;
      margin: 10px 0 30px 10px;
      a{
        display: block;
      }
      a:first-child{
        font-weight: bold;
        font-size: 1.2em;
        margin-bottom: 6px;
      }
    }
  }
  .slide-line{
      width: 22px !important;
      position: relative;
      flex-shrink: 0;
      div{
        width: 1px;
        background: #e5e5e5;
        height: 100%;
        margin: 0 10px;
      }
    }
}
@media screen and (max-width: 420px){
  .my-swiper{
    width: 100%;
    height: 400px;
  }
}
</style>

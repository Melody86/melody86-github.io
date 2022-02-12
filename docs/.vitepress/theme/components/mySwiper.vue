<template>
   <swiper 
    class="swiper-content"
    :loop="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :pagination="{ clickable: true }"
    :slides-per-view="1">

    <swiper-slide 
      v-for="(item,index) in headPicList" :key="index ">
      <img :src="item.src" @click="getImageClickLink(item.link)">
    </swiper-slide>
  </swiper>
</template>

<script>
  import { defineComponent, computed } from "vue";
  import 'swiper/css'
  import "swiper/css/pagination"
  import "swiper/css/navigation"
  import { Swiper, SwiperSlide } from 'swiper/vue'
  // import Swiper core and required modules
  import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper'
  // install Swiper modules
  SwiperCore.use([Pagination, Navigation, Autoplay])

  export default {
    name: 'MySwiper',
    components: { Swiper, SwiperSlide },
    props: {
      headPicList: Array
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
      }
    }
  }
</script>

<style lang="less" scoped>
.swiper-content{
  width: 100%;
  height: auto;
}
</style>

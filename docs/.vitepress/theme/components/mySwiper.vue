<template>
   <swiper 
    class="swiper-content"
    @touchStart="navigationStatus=true"
    @touchEnd="swiperTouchLeave"
    @mouseover="navigationStatus=true"
    @mouseleave="swiperTouchLeave"
    :loop="true"
    :autoplay="{
      delay: 4500,
      disableOnInteraction: false,
    }"
    :speed="1500"
    :navigation="navigationStatus"
    :pagination="{ clickable: true }"
    :slides-per-view="1">

    <swiper-slide 
      v-for="(item,index) in headPicList" :key="index ">
      <img :src="item.src" @click="getImageClickLink(item.link)">
    </swiper-slide>
  </swiper>
</template>

<script>
  import { defineComponent, computed, onMounted, reactive, toRefs } from "vue";
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
      const data = reactive({
        navigationStatus: false,
      })
      const getImageClickLink = (item)=>{
        if(item && item !== '#'){
          if(item.indexOf('http') < 0){
            item = 'http://' + item 
          }
          return window.location.href = item
        }
      }
      const swiperTouchLeave = function(){
        setTimeout(() => {
          data.navigationStatus = false
        }, 2000);
      }
      onMounted(()=>{
        console.log('0000')
      })
      return {
        ...toRefs(data),
        getImageClickLink,
        swiperTouchLeave,
        modules: [Pagination, Navigation, Autoplay],
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

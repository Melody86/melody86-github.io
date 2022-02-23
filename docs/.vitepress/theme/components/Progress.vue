<script setup>
import { onMounted, } from 'vue'
import { debounce } from '../../utils/index'

const props = defineProps({
  color: {
    type: String,
    default: '#1abc9c',
  }
})
const setProgress = function(){
  const elem = document.querySelector('.header-progress')
  return function(){
    //内容可视区域的高度
    let clientheight = document.documentElement.clientHeight || document.body.clientHeight
    //滚动条在Y轴上的滚动距离
    let scrolltop = document.documentElement.scrollTop || document.body.scrollTop
    //内容可视区域的高度加上溢出（滚动）的距离
    let scrollheight = document.documentElement.scrollHeight || document.body.scrollHeight

    if (scrollheight > clientheight) {
      elem.style.width = (scrolltop / (scrollheight - clientheight)) * 100 + "%";
    }
  }
}

onMounted(()=>{
  const elem = document.querySelector('.header-progress')
  if(elem) {
    window.onscroll = debounce(setProgress(), 300)
  }
  
})

</script>


<template>
  <div class="header-progress" :style="`background-color=${color}`"></div>
</template>

<style lang="less" scoped>
.header-progress {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1abc9c;
  height: 5px;
  width: 0%;
  z-index: 1200;
}
</style>
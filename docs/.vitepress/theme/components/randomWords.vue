<template>
    <div class="random-words-wrap" v-show="randomWords">
        <span style="vertical-align: top">「 </span>
        <span class="header-random-words" id="header-random-words">{{ randomWords }}</span>
        <span style="vertical-align: bottom">」</span>
    </div> 
</template>
<script setup>
    import { onMounted, ref } from 'vue'
    import axios from 'axios'
    import { getSentenceLen, getDocumentCSSRule, isIOSorAndroid, } from '../../utils/index.js'
    
    const ismobile = isIOSorAndroid() 
    let randomWords = ref(null)
    onMounted(()=>{
        getRandomWords()
        setInterval(()=>{
            getRandomWords()
        }, 60000)
    })
    const getRandomWords = function(){
        const len = ismobile ? 16 : 45
        axios.get(`https://v1.hitokoto.cn/?max_length=${len}`).then((res)=>{
            if(res && res.data.hitokoto){
                randomWords.value = res.data.hitokoto
                // <Home> 为AsyncComponent, onMounted的时候 #header-random-words可能还没挂载
                const randElem = document.getElementById('header-random-words')
                const randomWordsLen = getSentenceLen(res.data.hitokoto)  //中文两个字符，英文一个
                if(randElem){
                    randElem.style.width = randomWordsLen / 2 + 'em'
                    const steps = `steps(${ res.data.hitokoto.length }, end)`
                    randElem.style.animationTimingFunction = steps
                    randElem.style.webkitAnimationTimingFunction = steps
                    randElem.style.animationDuration = 200 * randomWordsLen+"ms"

                    let relus = getDocumentCSSRule('typing', CSSRule.KEYFRAMES_RULE)  //获取样式索引
                    console.log('relus::::', relus)
                    if(relus){
                        relus.deleteRule("40%") //删除之前动画样式
                        relus.deleteRule("60%")
                        relus.deleteRule("100%")
                        
                        relus.appendRule(`40% { width: ${ randomWordsLen / 2 }em; }`) //停顿一段时间
                        relus.appendRule(`60% { width: ${ randomWordsLen / 2 }em; }`) //停顿一段时间
                        relus.appendRule(`100% { width: 0`) 
                    }
                }
            }
        }).catch((e)=>{
            new Error('getRandomWords error: ', e)
        })
    }

</script>


<style scoped>

.header-random .header-random-words{
  display: inline-block;
  width: 18.5em;
  white-space: nowrap;
  word-break: break-all;
  border-right: 2px solid transparent;
  overflow: hidden;
  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
  animation: typing 7.5s infinite, blink-caret .75s step-end infinite;
  -webkit-animation: typing 7.5s infinite, blink-caret .75s step-end infinite;
}
/* 打印效果 */
@keyframes typing {
  0% { width: 0; }
  90% { width: 0; }
  100% { width: 0; }
}

/* 光标闪啊闪 */
@keyframes blink-caret {
  from, to { box-shadow: 2px 0 0 0; }
  50% { box-shadow: 2px 0 0 0 transparent; }
}
</style>

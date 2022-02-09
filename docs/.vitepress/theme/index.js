// https://vitepress.vuejs.org/guide/theming.html#using-a-custom-theme
import axios from 'axios'

import DefaultTheme from 'vitepress/theme' // To extend default theme.
// import Docs from "./components/Docs.vue";
// import Tags from "./components/Tags.vue";
// import Comment from "./components/Comment.vue";
// import Layout from "./components/Custom-Layout.vue";
console.log('DefaultTheme1111111: ', Object.keys(DefaultTheme))

import MyLayout from './components/MyLayout.vue'

export default {
  ...(DefaultTheme),
  // NotFound?: Component

  Layout: MyLayout,
  enhanceApp({ app, router, siteData, }) {
    
    // 注册组件
    // app.component("Comment", Comment);
    // app.component("Tags", Tags);
    // app.component("Docs", Docs);
    // app.component('Layout', Layout)

    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
  },

};
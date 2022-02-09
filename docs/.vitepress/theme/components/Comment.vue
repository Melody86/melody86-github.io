// gittalk 评论部分
<template>
  <div id="gitalk-container"></div>

</template>

<script>
import Gitalk from 'Gitalk'
  export default {
    name: "comment",
    mounted() {
      const commentConfig = {
        clientID: "642374f6454cd3246e5a",
        clientSecret: "8ff7bbb544607699cd4b26047cdcf80828e29ec5",
        repo: "https://melody86.github.io/melody86-github.io",
        owner: "Melody86",
        admin: ["Melody86"],
        id: location.pathname,  
      };
      const gitalk = new Gitalk(commentConfig);
      gitalk.render("gitalk-container");
    },
  };
</script>

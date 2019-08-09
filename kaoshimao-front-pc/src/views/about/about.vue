<template>
  <div class="middle-container">
    <el-row>
      <el-button v-on:click="goHome">返回首页</el-button>
    </el-row>
    <div class="red">大幅度反对法</div>
  </div>
</template>
<script>
export default {
  name: 'About',
  metaInfo: {
    title: 'About',
    meta: [{
      name: '关于我们的页面',
      content: '关于我们的页面关于我们的页面关于我们的页面'
    }],
    link: [{
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  },
  created:function(){
    this.getD();
  },
  methods: {
    goHome: function() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
  $red: red;
  .red {
    color: $red;
  }
</style>
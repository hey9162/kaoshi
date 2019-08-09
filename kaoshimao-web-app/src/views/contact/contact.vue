<template>
  <div class="middle-container">
    <el-row>
      <el-button v-on:click="goHome">返回首页</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Contact',
  metaInfo: {
    title: 'Contact',
    meta: [{
      name: '联系我们的页面',
      content: '联系我们的页面联系我们的页面联系我们的页面联系我们的页面'
    }],
    link: [{
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/00000'
    }]
  },
  methods: {
    goHome: function() {
      this.$router.push('/')
    }
  }
}
</script>

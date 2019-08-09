<template>
  <router-view :key="key" />
</template>
<script>
export default {
  name: 'entry',
  metaInfo: {
    title: 'entry',
    meta: [
      {
        name: '试卷录入的页面',
        content: '试卷录入的页面试卷录入的页面试卷录入的页面'
      }
    ],
    link: [
      {
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/volume'
      }
    ]
  },
  data:function(){
    return {
      key: ''
    }
  },
  components: {},
  created: function() {},
  methods: {

  }
}
</script>
<style lang='scss'>
</style>

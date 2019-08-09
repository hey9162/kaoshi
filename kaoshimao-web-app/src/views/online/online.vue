<template>
  <router-view :key="key" @search="searchEmit" v-bind:search="search"/>
</template>
<script>
export default {
  name: 'Online',
  metaInfo: {
    title: '考试猫',
    meta: [
      {
        name: '在线练习的页面',
        content: '在线练习的页面在线练习的页面在线练习的页面'
      }
    ],
    link: [
      {
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/Online'
      }
    ]
  },
  props:{
    search:{
      pages:{
        total:0,
        current:1
      }
    }
  },
  data:function(){
    return {
      key: ''
    }
  },
  components: {},
  created: function() {},
  mounted: function(){
  },
  methods: {
    searchEmit(e){
      this.$emit('search',e)
    }
  }
}
</script>
<style lang='scss'>
</style>

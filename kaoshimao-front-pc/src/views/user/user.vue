<template>
  <router-view :key="key" />
</template>
<script>
export default {
  name: 'user',
  metaInfo: {
    title: '个人中心',
    meta: [
      {
        name: '个人中心',
        content: '个人中心个人中心个人中心个人中心个人中心个人中心'
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

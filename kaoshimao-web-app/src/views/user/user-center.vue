<template>
  <router-view :key="key" />
</template>
<script>
export default {
  name: 'userCenter',
  metaInfo: {
    title: 'userCenter',
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

<template>
  <router-view :key="key" />
</template>
<script>
export default {
  name: 'volume',
  metaInfo: {
    title: '智能组卷',
    meta: [
      {
        name: '在线练习的页面',
        content: '在线练习的页面在线练习的页面在线练习的页面'
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

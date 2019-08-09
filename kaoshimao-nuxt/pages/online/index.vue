<template>
  <nuxt />
</template>
<script>
export default {
  name: 'Online',
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
  methods: {
    
  }
}
</script>
<style lang='scss'>
</style>

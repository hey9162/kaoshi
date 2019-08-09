<template>
  <router-view :key="key" />
</template>
<script>
export default {
  name: 'entry',
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

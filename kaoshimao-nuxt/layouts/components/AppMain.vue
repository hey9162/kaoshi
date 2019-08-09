<template>
  <section class="app-main">
    <my-header v-bind:qtype="qtype" v-bind:page="page" />
    <nuxt :key="key" />
    <my-footer />
  </section>
</template>
<script>
import { MyHeader } from '@/components/header'
import { MyFooter } from '@/components/footer'
export default {
  name: 'AppMain',
  components: {
    MyHeader,
    MyFooter
  },
  data() {
    return {
      key: '',
      qtype:'',
      page: 0
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss">
.app-main {
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

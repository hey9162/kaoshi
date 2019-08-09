<template>
  <section class="app-main">
    <router-view/>
  </section>
</template>
<script>
export default {
  name: 'AppMain',
  components: {
  },
  data() {
    return {
      
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.app-main {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

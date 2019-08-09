<template>
  <div>
    <app-main />
  </div>
</template>

<script>
import AppMain from './components/AppMain'
export default {
  name: 'Layout',
  components: {
    AppMain
  },
  mixins: [],
  computed: {
  },
  methods: {
  }
}
</script>

<style>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>

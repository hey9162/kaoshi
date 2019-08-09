<template>
  <div>
    <no-ssr>
      <nuxt />
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {
  },
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

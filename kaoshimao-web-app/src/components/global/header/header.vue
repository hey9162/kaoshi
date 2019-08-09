<template>
  <div class="header">
    <div class="box-flex">
      <!-- <div class="app-header-left"><i class="el-icon-arrow-left"></i> 返回</div>
      <div class="logo">
        <img src="./../../../assets/images/logo2.png" alt="">
      </div>
      <div class="app-header-middle">变电安规</div>
      <div class="app-header-right">设置</div> -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyHeader',
  data() {
    return {
    }
  },
  computed: {},
  created: function () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import "../../../assets/styles/mixin";
@import "../../../assets/styles/element-variables";
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 2.7rem;
  background-color: $--color-primary;
  z-index: 9;
  .box-flex {
    @include flex(row);
    @include center(row);
    justify-content: space-between;
    font-size: .7rem;
    color: #ffffff;
    a {
      color: #ffffff;
    }
  }
  .logo{
    width: 4.5rem;
    img{
      width: 100%;
      vertical-align: middle;
    }
  }
  .el-icon-setting{
    font-size: .9rem;
  }
}
</style>

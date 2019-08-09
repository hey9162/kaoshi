<template>
  <footer class="footer">
    <div class="layout-container">
      <el-menu
        mode="horizontal"
      >
        <el-menu-item>
          <img class="logo" src="../../assets/images/logo.png" alt>
        </el-menu-item>
        <el-menu-item>联系我们  QQ群：135728985</el-menu-item>
        <div class="pull-right btn-ctrl">
          <a href="http://www.beian.gov.cn" target="_blank" class="gray">Copyright <span>{{new Date().getFullYear()}}</span>.kaoshimao</a>
        </div>
      </el-menu>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'MyFooter',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss">
$headerHeight: 65px;
.logo {
  width: 115px;
}
.footer{
  background-color: #ffffff;
  padding: 30px 0;
  .el-menu.el-menu--horizontal{
    border-bottom: none;
  }
  .btn-ctrl{
    margin-top: 10px;
  }    
}
</style>

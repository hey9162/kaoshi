<template>
  <div class="middle-container">
    <section class="layout-container">
      <div class="error-container middle-container">
        <div class="img">
          <img src="../../assets/images/404.png" alt="">
        </div>
        <div class="">
          <p class="err-text">
            <big>Error!</big><br>
            <span class="span">你是不是走丢了</span><br>
            <span class="span">这里什么都没有</span><br>
            <el-button class="go-home" @click="goHome" type="primary">返回首页</el-button>
          </p>          
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Error',
  metaInfo: {
    title: '404',
    meta: [{
      name: '错误的的页面',
      content: '错误的的页面'
    }]
  },
  methods: {
    goHome: function() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
.error-container{
  width: 880px;
  height: 460px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  .img{
    margin-right: 60px;
  }
}
.err-text{
  text-align: left;
  big{
    display: inline-block;
    font-size: 46px;
    margin-bottom: 20px;
  }
  .span{
    display: inline-block;
    margin-bottom: 8px;
    font-size: 18px;
    color: #909399;
  }
  .go-home{
    margin-top: 20px;
  }

}
</style>


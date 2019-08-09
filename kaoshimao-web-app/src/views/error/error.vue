<template>
  <div class="">
    <section class="">
      <div class="error-container">
        <div class="img">
          <img src="../../assets/images/404.png" alt="">
        </div>
        <div class="">
          <p class="err-text">
            <big>Error!</big><br>
            <span class="span">你是不是走丢了</span><br>
            <span class="span">这里什么都没有</span><br>
            
          </p>          
        </div>
        <el-button size="big" class="go-home" @click="goHome" type="primary">返回首页</el-button>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Error',
  metaInfo: {
    title: 'Error',
    meta: [{
      name: '错误的的页面',
      content: '错误的的页面错误的的页面错误的的页面错误的的页面错误的的页面'
    }],
    link: [{
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/00000'
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: .75rem;
  flex-direction: column;
  height: 100vh;
  .img{
    width: 100%;
    text-align: center;
    img{
      width: 60%;
    }
  }
}
button.go-home{
  margin-top: 1.75rem;
}
.err-text{
  text-align: left;
  big{
    display: inline-block;
    font-size: 2.3rem;
    margin-bottom: 1rem;
  }
  .span{
    display: inline-block;
    margin-bottom: .4rem;
    font-size: .9rem;
    color: #909399;
  }
}
</style>


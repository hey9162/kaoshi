<template>
  <div class="middle-container">
    <el-row>
      <section class="banner">
        <div class="down-content">
          <div class="layout-container text">
            <div class="pull-left left">
              <h1>考试猫-安规题库APP</h1>
              <h3>随时随地在线练习/考试通过神器</h3>
              <div class="">
                <div class="down-btn">
                  <el-button type="primary">
                    <svg class="icon svg-icon" aria-hidden="true">
                      <use xlink:href="#iconios"></use>
                    </svg>
                   下载IOS版</el-button>
                  <el-button type="primary">
                    <svg class="icon svg-icon" aria-hidden="true">
                      <use xlink:href="#iconandroid"></use>
                    </svg>
                   下载Android版</el-button>
                </div>
                <div class="code">
                  <img src="../../assets/images/code.png" alt="">
                </div>
                <p class="info">V1.2.1231 &emsp;|&emsp; 2019-03-21 &emsp;|&emsp; 23.56M</p>
              </div>
            </div>
            <!-- <div class="pull-left">
              <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div> -->
          </div>
        </div>
      </section>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'down',
  methods: {
    goHome: function() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang='scss'>
$--color-primary: #1a8cff;
.banner {
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/banner.png');
  background-size: cover;
  min-height: calc( 100vh - 500px);
  .down-content {
    padding-top: 12vh;
    min-height: calc( 100vh - 190px);
    background-color: rgba(56, 155, 233, 0.7);
  }
}
.text {
  text-align: left;
  color: #ffffff;
  h1 {
    margin-bottom: 15px;
    font-size: 46px;
    font-weight: normal;
  }
  h3 {
    margin-bottom: 40px;
    font-weight: normal;
    font-size: 22px;
  }
}
.left{
  float: left;
  width: 50%;
  .down-btn,.code{
    display: inline-block;
    vertical-align: middle;
  }
  .code{
    width: 88px;
    img{
      width: 100%;
    }
  }
  .down-btn{
    margin-right: 10px;
    .el-button {
      display: block;
      margin: 0;
      width: 162px;
      height: 40px;
      text-align: left;
      i{
        margin-right: 16px;
      }
      &:nth-child(1){
        margin-bottom: 10px;
      }
    }
  }
  .info{
    margin-top: 15px;
    font-size: 12px;
    letter-spacing: 1px;
  }
}

</style>

<template>
  <div class="middle-container">
    <el-row>
      <section class="banner">
        <div class="content">
          <div class="layout-container text">
            <h1>在线安规库 全真模拟练习</h1>
            <h3>让您轻松备考 一次通过</h3>
            <router-link class="theme" to="/online"><el-button class="trans-theme-btn" type="primary">立即练习</el-button></router-link>
          </div>
        </div>
      </section>
    </el-row>
    <el-row style="background-color:#fff;padding-bottom: 30px;">
      <section class="index-ctrl layout-container">
        <div class="ctrl-item">
          <div class="icon-top">
            <svg class="icon svg-icon icon1" aria-hidden="true">
              <use xlink:href="#iconicon-test1"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconicon-test"></use>
            </svg>  
          </div>
          <h3 class="tit">在线练习</h3>
          <p class="dis">涵盖多个安规分类，海量题库，帮您轻松练习</p>
          <router-link to="/online"><el-button>立即前往</el-button></router-link>
        </div>
        <div class="ctrl-item">
          <div class="icon-top">
            <svg class="icon svg-icon icon1" aria-hidden="true">
              <use xlink:href="#iconicon-test2"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconicon-test5"></use>
            </svg>
          </div>
          <h3 class="tit">智能组卷</h3>
          <p class="dis">支持科目/题型随机抽题组卷，练习完后，智能批卷</p>
          <router-link to="/set-volume/smart"><el-button>立即前往</el-button></router-link>
        </div>
        <div class="ctrl-item">
          <div class="icon-top">
            <svg class="icon svg-icon icon1" aria-hidden="true">
              <use xlink:href="#iconicon-test3"></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconicon-test4"></use>
            </svg>
          </div>
          <h3 class="tit">试卷录入</h3>
          <p class="dis">支持题库文档导入，自动解析题目，组建专属题库</p>
          <!-- entry/entrying -->
          <router-link to="/"><el-button>立即前往</el-button></router-link>
        </div>
      </section>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Index',
  metaInfo: {
    title: '考试猫-国家电网安规考试(综合练习)考试题库_国家电网公司安规(综合练习)模拟考试_考试猫',
    meta: [
      {
        name: 'keywords',
        content: '考试猫-国家电网安规考试(综合练习)考试题库_国家电网公司安规(综合练习)模拟考试_考试猫'
      },
      {
        name: 'description',
        content: '考试猫考试题库提供国家电网公司安规(综合练习)考试题库,国家电网公司安规(综合练习)考试试题,国家电网公司安规(综合练习)考试答案,国家电网公司安规考试(综合练习)试题等在线测试、科目练习，助你安规考试轻松过关。'
      }
    ]
  },
  components: {},
  created: function() {},
  methods: {
    goHome: function() {},
    getD: function() {
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
  height: 440px;
  .content {
    padding-top: 130px;
    height: 100%;
    background-color: rgba(56, 155, 233, 0.7);
  }
}
.text {
  text-align: left;
  color: #ffffff;
  .theme{
    background-color: transparent !important;
  }
  h1 {
    margin-bottom: 15px;
    font-size: 46px;
    font-weight: normal;
  }
  h3 {
    margin-bottom: 60px;
    font-weight: normal;
    font-size: 22px;
  }
}
.bottom{
  padding-top: 120px;
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/index-bottom.png');
  .text{
    text-align: center
    h1 {
      margin-bottom: 40px;
    }
  }
}
.ctrl-item{
  padding: 30px;
  float: left;
  width: 380px;
  height: 238px;
  margin-top: 30px;
  margin-right: 30px;
  border-radius: 5px;
  border: 1px solid #DCDFE6;
  &:hover{
    color: #ffffff;
    background-color: $--color-primary;
    & .icon1{
      display: none;
    }
  }
  &:nth-child(3){
    margin-right: 0;
  }
  .icon-top{
    font-size: 40px;
  }
  .tit{
    font-size: 22px;
    font-weight: normal;
  }
  .dis{
    font-size: 14px;
    margin: 10px 0 30px 0;
  }
  .el-button {
    color: $--color-primary;
    border: 1px solid;
  }
}
</style>

<template>
  <div class="topic" :class="content.isSimulation?'simulation':''">
    <el-card class="box-card">
      <div class="topic-top">
        <span class="topic-type">填空题</span>
        <h3 class="topic-tit">{{content.title}}</h3>
      </div>
      <div class="clearfix">
        <div class="select-left pull-left">
          <div class="blank">
            <span class="gray">①</span><el-input class="blank-inp" v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="blank">
            <span class="gray">②</span><el-input class="blank-inp" v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <el-button style="margin-bottom:20px">提交答案</el-button>
        </div>
        <div class="select-right pull-left">

        </div>
      </div>
      <div v-if="!content.isSimulation" class="practice-ctrl">
        <div class="results">
          <span class="results-text err">回答错误</span>
          <span class="results-text">正确答案</span>
          <span class="results-text err">A</span>
        </div>
        <hr>
        <h3 class="title">答案解析</h3>
        <p class="parsing">答案解析答案解析答案解析答案解析答案解析答案解析答案解
          析答案解析答案解析答案解析答案解析答案解析答案解析答案解
          析答案解析答案解析答案解析答案解析答案解析</p>
        <hr>
        <el-button type="primary" size="medium">上一题</el-button>
        <el-button type="primary" size="medium">下一题</el-button>
        <span class="auto-next">
          <el-checkbox v-model="checked">自动下一题</el-checkbox>
        </span>
        <span class="page-jump gray">跳转至&nbsp;
          <el-input class="page-inp gray" v-model="input" @change="handleChange"></el-input>
         &nbsp;/ 999&nbsp;题</span>
        <el-button class="pull-right"icon="el-icon-warning">纠错</el-button>
        <el-button class="pull-right" style="margin-right:10px"icon="el-icon-star-off">收藏</el-button>
      </div>
      <div v-if="content.isSimulation" class="simulation-ctrl">
        <hr>
        <el-button type="primary" size="medium">上一题</el-button>
        <el-button type="primary" size="medium">下一题</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'fill-blank',
  data() {
    return {
      checked: true,
      input: 2,
      radio: '1'
    }
  },
  props:['content'],
  computed: {},
  created: function(){
    console.log(this.content);
  },
  methods: {
    handleChange: function(){
    }
  }
}
</script>
<style lang="scss">
  .blank{
    span{
        vertical-align: super;
      }
    .blank-inp{
      width: 200px;
      vertical-align: middle;
      margin-bottom: 20px;
      margin-left: 10px;
      input{
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
      }
    }
  }
</style>

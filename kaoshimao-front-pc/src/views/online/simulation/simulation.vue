<template>
  <div class="middle-container">
    <div class="layout-container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>组卷练习</el-breadcrumb-item>
          <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="init">  
        <select-radio class="pull-left simulate" v-for="content in rows()" :key="content.id" 
          v-bind:content="content"
          v-bind:topicNum="topicNum"
          v-bind:pages="contents.pages"
          v-bind:isSimulation="true"
          @goTopicEvent="goTopic"
          @previewImg="showImg"
          @answer="answerFun"
          @simulationEve="simulationEves"/>
        <div class="pull-left sheet">
          <el-card>
            <div class="clearfix">
              <h3 class="title">答题卡</h3>
              <span class="gray pull-right">1/100</span>
            </div>
            <hr>
            <div class="clearfix no-box">
              <span class="item-no" @click="goTopic({type:3},index)" 
              :class="[palyedIds.indexOf(item.id)>-1?'dirty':'',index==topicNum?'current':'']" v-for="(item,index) in contents['rows']">{{index+1}}</span>
            </div>
            <hr>
            <div class="tip-no">
              <div><span class="item-no"></span>未答题</div>
              <div><span class="item-no dirty"></span>已答题</div>
              <div><span class="item-no current"></span>当前题</div>
            </div>
            <hr>
            <el-button type="primary" @click="submit" class="full-btn">交卷</el-button>
          </el-card>
          <el-card class="tip-time">
            <div class="clearfix">
              <span class="gray pull-left">已用时间： {{time.timeStr}}</span>
              <el-button class="pull-right" @click="timeCtrl(0)" v-if="!isStop">暂停</el-button>
              <el-button class="pull-right" @click="timeCtrl(1)" v-if="isStop">继续</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="imgVisible">
      <img style="width:100%;" :src="imgVisibleUrl" alt="">
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="submitVisible"
      width="30%">
      <span>您还剩余<span class="red">{{remainder}}</span>道题目未作答，确认交卷？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitConfirm">交 卷</el-button>
        <el-button @click="submitVisible = false">继续做题</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SelectRadio from '../../../components/global/select-radio/select-radio'
import { getbyIds } from '../../../api/online'
import { Timer } from '../../../utils/timer'
import { getSession, setSession } from '../../../utils/session';
export default {
  name: 'simulation',
  data:function(){
    return {
      data:{

      },
      imgVisible: false,
      submitVisible: false,
      imgVisibleUrl: '',
      topicNum: 0,
      init:false,
      palyedIds:[],//做过的
      victoryIds:[],//做对的
      errIds:[],//做错的
      time:{},
      name:'',
      isStop: false,
      contents:{
        rows:[{}],
        pages:{total:0}
      },
    }
  },
  components: {
    SelectRadio
  },
  created: function() {
    this.data = getSession('simulation')
    this.initData();
    this.time = new Timer();
    this.time.start();
  },
  mounted: function(){
    this.init = true
  },
  computed:{
    remainder: function () {
      return this.contents['rows'].length - this.palyedIds.length;
    },
  },
  beforeRouteLeave: function(to, from , next){
    const answer = window.confirm('当前正在模拟考试，系统将不会保留当前更改')
    if (answer) {
      next()
    } else {
      next(false)
    }
  },
  methods: {
    rows() {
      return [this.contents['rows'][this.topicNum]];
    },
    showImg:function(e){
      this.imgVisible = true;
      this.imgVisibleUrl = e;
    },
    getVolume(){
      this.collectIds = this.data.ids;
      return new Promise((resolve)=>{
        resolve()
      })
    },
    answerFun:function(e){
      this.contents['rows'][this.topicNum].selfAnswer = e;
    },
    getTopicByIdsCollec(){
      getbyIds({ids:JSON.stringify(this.collectIds)}).then((res)=>{
        res.data.forEach((item)=>{
          item.question = item.question.replace(/^(\d+.)|(\d+.\d+.)/,'');
        })
        this.contents.rows = res.data;
      })
    },
    goTopic(data,index){
      switch (data.type) {
        case 1:
          this.topicNum--;
          break;
        case 2:
          this.topicNum++;
          break;
        case 3:
          this.topicNum = index;
          break;
      }
    },
    simulationEves(e){
      this.palyedIds.push(e.id);
      if(e.result == 1){
        this.victoryIds.push(e.id);
      }else{
        this.errIds.push(e.id);
      }
    },
    timeCtrl(type){
      if(type === 0){
         this.isStop = true;
         this.time.stop();
      }
      if(type === 1){
         this.isStop = false;
         this.time.continue();
      }
    },
    submit(){
      this.submitVisible = true
    },
    submitConfirm(){
      this.submitVisible = false;
      let collectScore = {};
      this.collectIds.forEach(item => {
        let arr = item.split('-');
        collectScore[[arr[0]]]= arr[1]
      });
      let score = 0;
      this.victoryIds.forEach((item)=>{
        score = score + parseInt(collectScore[item]);
      });
      let data = {
        count: this.palyedIds.length,
        total: this.contents['rows'].length,
        victoryRatio: this.victoryIds.length/this.palyedIds.length,
        time: this.time.timeStr,
        errIds:this.errIds,
        score:score,
        submitTime: new Date(),
        name: this.name
      }
      setSession('isRecite',true);
      this.$router.push({ path: '/online/result', query: { data: JSON.stringify(data) }})
    },
    initData(){
      if(this.data.ids){
        this.name = this.data.name;
        this.topicNum = 0;
        this.getVolume().then(()=>{
          this.getTopicByIdsCollec()
        })
      };
    }
  }
}
</script>
<style lang='scss'>
.simulate{
  width: 800px;
  margin-right:10px;
}
.sheet{
  width: 390px;
  h3.title{
    display: inline-block;
    margin: 0;
    width: calc(100% - 60px);
  }
  span.gray{
    margin-top: 6px;
  }
  .no-box{
    .item-no:nth-child(10n){
      margin-right: 0;
    }
  }
  .item-no{
    float: left;
    display: inline-block;
    min-width: 26px;
    height: 26px;
    margin-right: 9.7px;
    margin-bottom: 9.7px;
    border: 1px solid #dcdfe6;
    color: #909399;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    &.dirty{
      background: #b3d8ff;
      border-color: #1A8CFF;
      color: #1A8CFF;
    }
    &.current{
      background: #1A8CFF;
      border-color: #1A8CFF;
      color: #fff;
    }
  }
  .tip-no{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .item-no{
      margin-top: -3px;
    }
  }
  .tip-time{
    margin-top: 15px;
    .el-card__body{
      padding: 10px 20px;
    }
  }
}
</style>

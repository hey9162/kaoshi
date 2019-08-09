<template>
  <div class="middle-container">
    <div class="clearfix online-nav" style="background-color:#fff;">
      <div class="layout-container clearfix">
        <div class="pull-left">
          <div
            class="nav-item"
            v-for="item in nav"
            :key="item.tit"
            :class="item.isCurrent?'active':''"
          >
            <router-link :to="item.url">{{ item.tit }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-container smart">
      <el-card class="box-card" v-if="pageData">
        <el-form :model="pageData" :rules="rules" ref="ruleForm">
        <h3 class="title">试卷名称</h3>
        <el-form-item prop="title">
          <el-input v-model="pageData.title" placeholder="请输入内容"></el-input>
        </el-form-item>
        <h3 class="title">选择科目</h3>
        <el-form-item label="" prop="paper_id">
          <el-radio-group v-model="pageData.paper_id" @change="paperChange">
            <el-radio v-for="item in pageData.paper" :label="item.id" :key="item.id">{{item.name}}</el-radio>
            <!-- <el-radio :label="0">
              <el-input v-model="radioInp" placeholder="其他"></el-input>
            </el-radio> -->
          </el-radio-group>
        </el-form-item>
        <h3 class="title">题目来源</h3>
        <el-radio-group v-model="source">
          <el-radio :label="1">考试猫</el-radio>
          <!-- <el-radio :label="2">我的题库</el-radio> -->
        </el-radio-group>
        <h3 class="title">题目配置</h3>
        <table class="custom-table">
          <thead>
            <tr class="gray">
              <th>题型</th>
              <th>数量</th>
              <th>分值</th>
              <th>合计</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in topicList" v-if="item.name !== '组合题'">
              <td>{{item.name}}
                <span class="gray">（共计{{item.total}}道）</span>
              </td>
              <td>
                <el-input-number v-model="item.count" controls-position="right" :min="0" :max="parseInt(item.total)"></el-input-number>
              </td>
              <td>
                <el-input-number v-model="item.score" :min="0" :max="100"></el-input-number>
              </td>
              <td>
                共计<span class="theme-color">{{item.count*item.score}}</span>分
              </td>
              <td>  
                <el-button @click="resetRow(index)">重置</el-button>
              </td>
            </tr>
            <tr v-if="topicList.length>0">
              <td></td>
              <td>共计<span class="theme-color">{{totalTopic}}</span>道题</td>
              <td></td>
              <td>共计<span class="theme-color">{{totalScore}}</span>分</td>
              <td></td>
            </tr>
            <tr>
              <td colspan="5">
                <el-button @click="resetAll(index)">清空重置</el-button>
                <el-button type="primary" @click="makePoper('ruleForm')">生成试卷</el-button>
              </td>
            </tr>
          </tbody>
        </table>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getQuestionsCount,setVolume } from '@/api/volume'
import { Message } from 'element-ui';
export default {
  name: "smart",
  data() {
    return {
      input: "",
      input1: 0,
      radio: 1,
      radioInp: "",
      source: 1,
      id:'',
      nav: [
        { tit: "智能组件", isCurrent: true, url: "/set-volume/smart" },
        { tit: "我的组卷", url: "/set-volume/mine" }
      ],
      topicList:[
        {type:String,count:Number,score:Number,total:Number}
      ],
      rules: {
        title: [
          { required: true, message: '试卷名称不能为空', trigger: 'blur'}
        ],
        paper_id: [
          { required: true, message: '科目不能为空', trigger: 'blur' }
        ]
      },
      pageData:{
        title:'',
        paper_id:''
      }
    };
  },
  created: function(){
    this.getQuestions()
  },
  computed: {
    totalTopic: function () {
      return this.topicList.reduce(function(prev, curr, idx, arr){
        return parseInt(prev) + parseInt(curr.count);
      },0);
    },
    totalScore: function(){
      return this.topicList.reduce(function(prev, curr, idx, arr){
        if(prev.count){
          return parseInt(prev.count*prev.score) + parseInt((curr.count*curr.score))
        }else{
          return parseInt(prev) + parseInt((curr.count*curr.score))
        }
      },0);
    }
  },
  methods: {
    resetRow(index) {
      this.topicList[index].count = 0,this.topicList[index].score = 0;
    },
    resetAll(){
      this.topicList.forEach(item=>{
        item.count = 0,item.score = 0;
      });
    },
    paperChange(e){
      this.pageData.paper.forEach((item)=>{
        if(item.id === e){
          this.topicList = item.config
        }
      });
    },
    makePoper(formName){
      /**限制单张试卷题目数量200道以内 */
      if(this.totalTopic>1000){
        this.$message({
          message: '题目总数不要超过1000',
          type: 'error'
        });
        return false
      }
      let data = {
        title:this.pageData.title,
        paper_id:this.pageData.paper_id,
        source:this.source,
        papers:this.topicList,
        id:this.id
      };
      this.$refs[formName].validate((valid) => {
        
        if(!valid) {
          return document.documentElement.scrollIntoView()
        }
        
        setVolume(data).then((res)=>{
          let message;
          data.id? message = '组卷编辑成功': message = '组卷新增成功';
          this.$message({
            message: message,
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/set-volume/mine')
          }, 1500)
        })
      })
    },
    getQuestions(){
      getQuestionsCount().then((res)=>{
        if(this.$router.apps[0]._route.query.data){
          let data = JSON.parse(this.$router.apps[0]._route.query.data);
          this.id = data.id;
          this.pageData = res;
          this.pageData.paper_id = data.paper_id;
          this.topicList = data.papers;
          this.pageData.title = data.name;
          this.pageData.paper.forEach((item)=>{
            if(item.id === data.paper_id){
              item.config = this.topicList
            }
          });
        }else{
          this.pageData = res;
          this.topicList = this.pageData.paper[0].config;
        }
      });
    }
  }
};
</script>
<style lang="scss">

.smart {
  margin: 15px auto;
  .el-card__body {
    padding: 0 40px 20px 40px;
  }
  h3.title {
    margin-top: 30px;
  }
  .el-radio{
    margin-bottom: 20px;
  }
}
</style>

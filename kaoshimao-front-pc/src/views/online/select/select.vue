<template>
  <div class="middle-container">
    <div class="online-nav">
      <div class="layout-container">
        <div class="pull-left tit">题库类型：</div>
        <div class="pull-left">
          <div class="nav-item"  v-for="item in nav" :key="item.tit" :class="item.isCurrent?'active':''">
            <router-link :to="{path:item.url}">{{ item.tit }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>在线练习</el-breadcrumb-item>
          <el-breadcrumb-item>试卷介绍</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>    
        <el-card class="box-card">
          <h3 class="title">选择科目</h3>
          <div class="subjects">
            <el-button class="subjects-item" :class="item.active?'active':''" @click="selectSubjects(index,item)" v-for="(item, index) in list" :key="item.id" size="medium">
              {{ item.name }}
            </el-button>
          </div>
          <hr style="margin-top: 10px;">
          <h3 class="title">变电安规题库</h3>
          <div class="subjects clearfix">
            <div class="subject el-button clearfix" v-if="ptype && key!='9'" v-for="(value, key, index) in ptype">
              <div class="pull-eft" @click="getTopics(key)">
                <span class="tit" v-if="key==1">单选题</span>
                <span class="tit" v-if="key==2">多选题</span>
                <span class="tit" v-if="key==3">判断题</span>
                <span class="tit" v-if="key==4">填空题</span>
                <span class="tit" v-if="key==5">简答题</span>
                <span class="tit" v-if="key==7">案例分析题</span>
                <span class="tit" v-if="key==8">工作票改错</span>
                {{ value }}道</div>
              <div class="pull-right"><el-button size="medium" @click="getTopics(key)" type="primary">开始做题</el-button></div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>

import { getQuestionsCount,getTopic } from '../../../api/online'
import { setSession,getSession } from '../../../utils/session'
export default {
  name: 'Online',
  metaInfo: {
    title: '在线练习',
    meta: [
      {
        name: '在线练习的页面',
        content: '在线练习的页面在线练习的页面在线练习的页面'
      }
    ]
  },
  data:function(){
    return {
      nav:[
        {tit:'全部',isCurrent:true,url:'/online/practice/0'},
        {tit:'错题库',url:'/online/practice/1'},
        {tit:'收藏',url:'/online/practice/2'},
        // {tit:'模拟考试',mode:4,url:'/online/simulation'},
      ],
      list:[],
      ptype:{},
      paperid:''
    }
  },
  components: {},
  created: function() {
    this.getQuestions();
  },
  mounted: function() {
    for(let i = 0; i<3;i++){
      localStorage.removeItem(`sequence`+i);
    }
  },
  methods: {
    getQuestions(){
      let questionBank = getSession('questionBank');
      let setThisList = data =>{
        this.list = data;
        this.list[0].active = true;
        this.paperid = this.list[0].id;
        this.ptype = this.list[0].questions;
      }
      if(questionBank){
        setThisList(questionBank);
      }else{
        getQuestionsCount().then((res)=>{
          setSession('questionBank',res.data);
          setThisList(res.data);
        });
      }
    },
    getTopics(key){
      const data = {paperid:this.paperid,qtype:key};
      this.$router.push({ path: '/online/practice/0', query: { data: JSON.stringify(data) }})
    },
    selectSubjects(index,item){
      this.list.forEach(element => {
        if(element['active']){
          element['active'] = false;
        }
      });
      this.paperid = item.id;
      item['active'] = true;
      this.ptype = this.list[index].questions;
    }
  }
}
</script>
<style lang='scss'>
.box-card{
  .el-card__body{
    padding: 20px 40px;
  }
}
.subjects{
  .subjects-item{
    width: 191px;
    margin-right: 40px;
    margin-bottom: 20px;
    margin-left: 0;
    &:nth-child(5n){
      margin-right: 0;
    }
    &.active{
      border: 1px solid #1A8CFF;
      span{
       color: #1A8CFF; 
      }
    }
  }
  .el-button + .el-button{
    margin-left: 0;
  }
  .subject{
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    width: 538px;
    color: #909399;
    float: left;
    border: 1px solid #DCDFE6;
    margin-right: 40px;
    margin-bottom: 20px;
    padding-left: 0;
    &.el-button:active{
      border-color: #177ee6 !important;
    }
    &.el-button:hover, .el-button:focus{
      border-color: #baddff;
    }
    cursor: pointer;
    .pull-eft{
      width: 425px;
      display: inline-block;
      text-align: left;
    }
    span.tit{
      color: #4A4A4A;
      padding: 0 10px;
      display: inline-block;
      margin-right: 10px;
    }
    &.active{
      border: 1px solid #1A8CFF;
      span.tit{
        color: #1A8CFF;
      }
    }
   &:nth-child(2n){
     margin-right: 0;
   } 
  }
}
</style>

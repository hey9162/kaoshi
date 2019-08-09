<template>
  <div class="middle-container">
    <div class="layout-container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>在线练习</el-breadcrumb-item>
          <el-breadcrumb-item>考试结果</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="result-box">
        <div class="result-head">
          <h1 class="name">{{data.name}}</h1>
          <p class="time gray">交卷时间<span>&emsp;{{ data.submitTime | formatDate }}</span></p>
          <h3 class="title">错题答案解析</h3>
          <table class="custom-table">
          <thead>
            <tr class="gray">
              <th>答题数量</th>
              <th>正确率</th>
              <th>练习时间</th>
              <th>说明</th>
              <th>评分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{data.count}}/{{data.total}}</td>
              <td>{{(data.victoryRatio*100).toFixed(2)}}%</td>
              <td>{{data.time}}</td>
              <td>主观题请自主评分</td>
              <td>{{data.score}}分</td>
            </tr>
          </tbody>
        </table>
        </div>
        <select-radio v-if="contents.rows" class="result-topic" v-for="content in rows()" :key="content.id" 
          v-bind:content="content"
          v-bind:mode="3"
          v-bind:result="true"
          v-bind:pages="contents.pages"/>
      </div>
    </div>
    <el-backtop :visibility-height="200" :bottom="100"></el-backtop>
  </div>
</template>
<script>
import SelectRadio from '@/components/global/select-radio/select-radio'
import { getbyIds } from '@/api/online'
import { Timer } from '@/utils/timer'
import { getSession } from '@/utils/session'
import dateFormat from '@/utils/date'
export default {
  name: 'simulation',
  data:function(){
    return {
      data:{
      },
      contents:{
        rows:[],
        pages:{total:0}
      },
    }
  },
  components: {
    SelectRadio
  },
  filters: {
    formatDate(time) {
        let date = new Date(time);
        return dateFormat.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  created: function() {
    this.initData();
    // console.log(getSession('simulationInfo'))
  },
  asyncData({ params, error }) {
    // console.log(params)
    // return getbyIds({ids:JSON.stringify(params.query.data.errIds)}).then((res)=>{
    //   this.contents.rows = res.data;
    //   return { contents:{rows:res.data},pages:{total:0} }
    // })
    // .then((res)=>{
    //   return {
    //     content: res.data[0],
    //     info:{title:res.data[0].question}
    //   }
    // })
    // .catch((e) => {
    //   error({ statusCode: 404, message: 'Post not found' })
    // })
  },
  computed:{
  },
  methods: {
    rows() {
      return this.contents['rows']
    },
    getContents(ids){
      getbyIds({ids:JSON.stringify(ids)}).then((res)=>{
        this.contents.rows = res.data;
      })
    },
    initData(){
      if(getSession('simulationInfo')){
        this.data = getSession('simulationInfo')
        if(this.data.errIds.length>0){
          let ids = this.data.errIds;
          this.getContents(ids);
        }
      };
    }
  }
}
</script>
<style lang='scss'>
.result-box{
  background-color: #fff;
  overflow: scroll;
  height: 100%;
}
.result-head{
  padding: 30px 40px 30px 40px;
  .name{
    margin-bottom: 20px;
  }
  .time{
    font-size: 12px;
    margin-bottom: 30px;
  }
  .custom-table th, .custom-table td{
    border-right: 1px solid #EBEEF5;
    &:last-child{
      border-right: none;
    }
  }
}
.result-topic{
  .el-card.is-always-shadow{
    border: none;
  }
}

</style>

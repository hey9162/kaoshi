<template>
  <div class>
    <my-header>
      <div class="app-header-left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i> 返回
      </div>
      <div class="app-header-middle">
        <div>考试成绩</div>
      </div>
      <div class="app-header-right" @click="setModal = true">设置</div>
    </my-header>
    <div class="app-body result">
      <div class="result-header">
        <h1 class="name">{{data.name}}</h1>
        <p class="time gray">
          交卷时间
          <span>&emsp;2019-03-05 00:00:00</span>
        </p>
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
      <ul class="card" style="margin-top:.75rem;">
        <li class="box-flex" v-if="errIds.length>0">
          <i class="el-icon-edit"></i>
          <p class="flex-center"><router-link :to="'/online/practice/1?check=1'">查看错题</router-link></p>
          <i class="el-icon-arrow-right"></i>
        </li>
        <li class="box-flex">
          <i class="el-icon-edit"></i>
          <p class="flex-center"><router-link :to="'/online/practice/3'">重新考试</router-link></p>
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import MyHeader from '../../../components/global/header/header'
import SelectRadio from '../../../components/global/select-radio/select-radio'
import { getbyIds } from '../../../api/online'
import { Timer } from '../../../utils/timer'
import { getSession } from '../../../utils/session';
export default {
  name: 'simulation',
  data: function () {
    return {
      data: {
      },
      errIds:[],
      contents: {
        rows: [],
        pages: { total: 0 }
      },
    }
  },
  components: {
    SelectRadio,
    MyHeader
  },
  created: function () {
    this.errIds = getSession('result').errIds;
    this.data = getSession('result');
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang='scss'>
.result{
  padding: 2.7rem 0rem;
  .result-header{
    background: #fff;
    padding: 0.75rem;
  }
  .card{
    margin:.75rem;
  }
}
.result-topic {
  .el-card.is-always-shadow {
    border: none;
  }
}
</style>

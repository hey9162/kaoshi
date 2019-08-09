<template>
  <div class="">
    <my-header>
      <div class="app-header-left" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i> 返回</div>
      <div>组卷成功</div>
      <div></div>
    </my-header>
    <div class="app-body">
      <el-card class="box-card">
        <table class="custom-table">
          <tbody>
            <tr>
              <td>科目</td>
              <td>变电安规</td>
            </tr>
            <tr>
              <td>题目</td>
              <td>{{totaltopic}}道</td>
            </tr>
            <tr>
              <td>总分</td>
              <td>{{totalscore}}分</td>
            </tr>
          </tbody>
        </table>
      </el-card>
      <ul class="card" style="margin-top:.75rem;">
        <!-- <li class="box-flex">
          <p class="flex-center" >
            随机模式
          </p>
          <el-switch
            v-model="isRandom">
          </el-switch>
        </li>
        <li class="box-flex">
          <p class="flex-center" >
            自动下一题
          </p>
          <el-switch
            v-model="autoNext">
          </el-switch>
        </li> -->
        <li class="box-flex">
          <div class="flex-center" style="width:100%;"><el-button type="primary" class="full-btn" @click="handleEdit">开始考试</el-button></div>
        </li>
        <li class="box-flex">
          <div class="flex-center" style="width:100%;"><router-link :to="'/set-volume/mine'"><el-button type="primary" class="full-btn"> 我的组卷</el-button></router-link></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import MyHeader from '../../../components/global/header/header'
import { setSession } from '../../../utils/session';
export default {
  name: 'mine',
  components: {
    MyHeader
  },
  data() {
    return {
      isRandom: false,
      autoNext:false,
      totaltopic:0,
      totalscore:0
    }
  },
  created: function(){
    this.totaltopic = this.$route.query.totaltopic;
    this.totalscore = this.$route.query.totalscore;
  },
  methods: {
    handleEdit(i,data){
      setSession('isRecite',false);
      setSession('isRandom',this.isRandom);
      setSession('autoNext',this.autoNext);
      this.$router.push('/online/practice/3')
    }
  }
}
</script>
<style lang="scss">
</style>

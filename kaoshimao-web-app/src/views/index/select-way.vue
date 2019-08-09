<template>
  <div>
    <my-header>
      <div class="app-header-left" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i> 返回</div>
      <div class="app-header-middle">
        <el-select v-model="paperid" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="app-header-right"><i>&emsp;&emsp;&emsp;&emsp;</i></div>
    </my-header>
    <div class="app-body select-way">
      <div>
        <h3 class="place-tit">
          请选择<br>
          您要练习的方式
        </h3>
        <ul class="card">
          <li class="box-flex">
            <i class="el-icon-sort theme-color"></i>
            <p class="flex-center" @click="goPractice(1)">顺序练习</p>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li class="box-flex">
            <i class="el-icon-refresh theme-color"></i>
            <p class="flex-center" @click="goPractice(2)">随机练习</p>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li class="box-flex">
            <i class="el-icon-menu theme-color"></i>
            <p class="flex-center"><router-link :to="`/select-ptype?pId=${paperid}`">题型练习</router-link></p>
            <i class="el-icon-arrow-right"></i>
          </li>
          <!-- <li class="box-flex">
            <i class="el-icon-edit"></i>
            <p class="flex-center"><router-link :to="'/online/practice/1'">模拟考试</router-link></p>
            <i class="el-icon-arrow-right"></i>
          </li> -->
        </ul>
        <ul class="card" style="margin-top:15px;">
          <li class="box-flex">
            <i class="el-icon-error theme-color"></i>
            <p class="flex-center"><router-link :to="'/online/practice/1'">我的错题</router-link></p>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li class="box-flex">
            <svg class="icon svg-icon theme-color" aria-hidden="true">
              <use xlink:href="#iconunie601"></use>
            </svg>
            <p class="flex-center"><router-link :to="'/online/practice/2'">我的收藏</router-link></p>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>

      </div>
    </div>
    <my-nav :index="0"/>
  </div>
</template>
<script>
import { MyNav } from '../../components/nav/index'
import MyHeader from '../../components/global/header/header'
import { getSession } from '../../utils/session';

export default {
  name: 'selsetWay',
  metaInfo: {
    title: '考试猫',
  },
  components: {
    MyNav,
    MyHeader
  },
  data:function(){
    return {
      options: [],
      paperid: ''
    }
  },
  created: function() {
   this.options = getSession('all');
   this.paperid = this.$route.params.pId;
  },
  methods: {
    goPractice: function(type){
      let data = JSON.stringify({paperid:this.paperid,type:type});
      let url = `/online/practice/0?data=${data}`;
      this.$router.push(url);
    }
  }
}
</script>
<style lang='scss'>
</style>

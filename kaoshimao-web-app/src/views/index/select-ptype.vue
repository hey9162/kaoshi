<template>
  <div>
    <my-header>
      <div class="app-header-left" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i> 返回</div>
      <div class="app-header-middle">
        <!-- <el-select v-model="value8" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
      </div>
      <!-- <div class="app-header-right">设置</div> -->
    </my-header>
    <div class="app-body select-way">
      <div>
        <h3 class="place-tit">
          请选择<br>
          您要练习的题型
        </h3>
        <ul class="card">
          <li class="box-flex" @click="goPractice(1,key)" v-if="options && key != 9" v-for="(value, key, index) in options" >
            <p class="flex-center ptype" >
              <span class="tit" v-if="key==1">
                <svg class="icon svg-icon theme-color" aria-hidden="true">
                  <use xlink:href="#icondanxuanxuanzhongcopy-"></use>
                </svg>
                单选题
              </span>
              <span class="tit" v-if="key==2">
                <svg class="icon svg-icon theme-color" aria-hidden="true">
                  <use xlink:href="#iconduoxuan"></use>
                </svg>
                多选题
              </span>
              <span class="tit" v-if="key==3">
                <svg class="icon svg-icon theme-color" aria-hidden="true">
                  <use xlink:href="#iconsuiji"></use>
                </svg>
                判断题
              </span>
              <span class="tit" v-if="key==4">
                <svg class="icon svg-icon theme-color" aria-hidden="true">
                  <use xlink:href="#icontiankongti"></use>
                </svg>
                填空题
              </span>
              <span class="tit" v-if="key==5">
                <svg class="icon svg-icon theme-color" aria-hidden="true">
                  <use xlink:href="#icontixing"></use>
                </svg>
                简答题
              </span>
              <span class="tit" v-if="key==7">
                <svg class="icon svg-icon theme-color" aria-hidden="true">
                  <use xlink:href="#iconanlifenxi"></use>
                </svg>
                案例分析题
              </span>
              <span class="tit" v-if="key==8">
                <svg class="icon svg-icon theme-color" aria-hidden="true">
                  <use xlink:href="#iconcuoti"></use>
                </svg>
                工作票改错
              </span>
            </p>
            <span>
              <span class="gray" style="margin-right:.5rem">{{value}}</span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
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
      options: {},
      pid:''
    }
  },
  created: function() {
    let pIdAll = getSession('all');
    let index = pIdAll.map((e) => { return e.id }).indexOf(this.$route.query.pId);
    this.options = pIdAll[index].questions;
    this.pid = pIdAll[index].id;
  },
  methods: {
    goPractice: function(type,qtype){
      let data = JSON.stringify({paperid:this.pid,type:type,qtype:qtype});
      let url = `/online/practice/0?data=${data}`;
      this.$router.push(url);
    }
  }
}
</script>
<style lang='scss'>
.ptype{
  .svg-icon{
    margin-right: .25rem;
  }
}
</style>

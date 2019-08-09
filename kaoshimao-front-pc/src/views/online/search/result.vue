<template>
<div class="middle-container">
  <div class="layout-container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="content"> 
        <select-radio :key="content.id" 
        v-bind:content="content"
        v-bind:pages="page"
        v-bind:search="true"/>
      </div>
    </div>
</div>
</template>
<script>
import SelectRadio from '../../../components/global/select-radio/select-radio'
import { setSession } from '../../../utils/session';
import { getbyIds } from '../../../api/online';
export default {
  name: 'search-result',
  data:function(){
    return {
      id:'',
      content:{
      },
      page:{
        total:0
      }
    }
  },
  components: {
    SelectRadio
  },
  created: function() {
    this.id = this.$route.params.id;
    this.getData()
  },
  mounted: function(){
    setSession('isRecite',true);
  },
  methods: {
    getData(){
      getbyIds({ids:JSON.stringify([this.id])}).then(res=>{
        this.content = res.data[0]
      })
    }
  }
}
</script>
<style lang='scss'>

</style>

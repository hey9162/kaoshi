<template>
<div class="">
  <my-header>
    <div class="app-header-left" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i> 返回</div>
  </my-header>
  <div class="app-body">
    <div v-if="content"> 
      <select-radio :key="content.id" 
      v-bind:content="content"
      v-bind:pages="page"
      v-bind:isRecite="true"/>
    </div>
  </div>
</div>
</template>
<script>
import MyHeader from '../../../components/global/header/header'
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
    SelectRadio,
    MyHeader
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

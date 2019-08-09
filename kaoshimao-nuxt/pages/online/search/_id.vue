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
import SelectRadio from '@/components/global/select-radio/select-radio'
import { setSession } from '@/utils/session';
import { getbyIds } from '@/api/online';
import request from '@/utils/request'
export default {
  name: 'search-result',
  head() {
    return {
      title: this.info.title + '_考试猫安规考试国家电网考试',
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.info.title + `考试猫安规考试国家电网考试` }
      ],
    }
  },
  data:function(){
    return {
      info:{
        title:''
      },
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
  asyncData({ params, error }) {
    return request({
      url: `/questions/ids`,
      method: 'post',
      data:{ids:JSON.stringify([params.id])}
    })
    .then((res)=>{
      return {
        content: res.data[0],
        info:{title:res.data[0].question}
      }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  },
  created: function() {
    setSession('isRecite',true);
    this.id = this.$route.params.id;
  },
  mounted: function(){
  },
  methods: {
  }
}
</script>
<style lang='scss'>

</style>

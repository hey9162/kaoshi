<template>
  <div class="middle-container" v-loading="parseInt(search.pages.total)==='0'">
    <el-card class="search box-card layout-container">
      <div class="online-nav clearfix">
        <div class="pull-left tit">题型：</div>
        <div class="pull-left">
          <div class="nav-item" @click="searchEmit(item.type,index)" v-for="(item,index) in nav" :key="item.tit" :class="item.type == type ?'active':''">
            {{ item.tit }}
          </div>
        </div>
      </div>
      <div v-if="parseInt(search.pages.total)!='0'" v-loading="loading">
        <div class="search-result">
          <div class="search-list" v-for="(item,index) in search.rows" :key="item.id">
            <span class="topic-type" v-if="item.qtype == 1">单选题</span>
            <span class="topic-type" v-if="item.qtype == 2">多选题</span>
            <span class="topic-type" v-if="item.qtype == 3">判断题</span>
            <span class="topic-type" v-if="item.qtype == 4">填空题</span>
            <span class="topic-type" v-if="item.qtype == 5">简答题</span>
            <span class="topic-type" v-if="item.qtype == 7">案例分析题</span>
            <span class="topic-type" v-if="item.qtype == 8">工作票</span>
            <p class="search-tip">
              <nuxt-link target="_blank" :to="`/online/search/${item.id}`">
                <span class="key-word">{{search.keyword}}</span><span v-html="item.question"></span>
              </nuxt-link>
            </p>
          </div>
        </div>
        <div class="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="parseInt(search.pages.current)"
            layout="total, prev, pager, next, jumper"
            :total="parseInt(search.pages.total)">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <empty-vue v-if="parseInt(search.pages.total)=='0' && !loading" v-bind:content="'没有任何结果'"/>
  </div>
</template>
<script>
import emptyVue from '@/components/global/empty/empty'
import { store, mutations } from "@/components/header/store"
export default {
  name: 'Search',
  metaInfo: {
    title: '搜索',
    meta: [
      {
        name: '在线练习的页面',
        content: '在线练习的页面在线练习的页面在线练习的页面'
      }
    ],
    link: [
      {
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/Online'
      }
    ]
  },
  props:{
  },
  data:function(){
    return {
      nav:[
        {tit:'全部',type:'all'},
        {tit:'单选题',type:1},
        {tit:'多选题',type:2},
        {tit:'判断题',type:3},
        {tit:'填空题',type:4},
        {tit:'简答题',type:5},
        {tit:'案例分析',type:7},
        {tit:'工作票',type:8}
      ]
    }
  },
  components: {
    emptyVue
  },
  created: function() {
    mutations.setSearch(true)
  },
  computed: {
    search() {
      return store.searchData
    },
    type() {
      return store.data.qtype
    },
    loading() {
      return store.loading
    }
  },
  updated: function() {
  },
  mounted: function(){
    mutations.getLists()
  },
  methods: {
    setData(data){
      return mutations.setData(data)
    },
    handleCurrentChange(val) {
     this.setData({page:val})
      mutations.getLists()
    },
    searchEmit(data,index){
      this.setData({qtype:data,page:1})
      mutations.getLists()
    }
  },
  destroyed: function() {
    mutations.setSearch(false)
  }
}
</script>
<style lang='scss'>
.search{
  margin-top: 15px;
  &.box-card{
    .el-card__body{
      padding: 0 40px 20px 40px;
    }
  }
  .online-nav{
    border-bottom: 1px solid #ddd;
  }
  .search-tip{
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    line-height: 1.5;
    width: 1040px;
    vertical-align: text-top;
  }
  .search-list{
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    .topic-type{
      margin-top: 0;
    }
  }
  .key-word{
    color: #F56C6C;
    margin-right: 10px;
  }
}
.page{
  text-align: center;
  margin-top: 20px;
}

</style>

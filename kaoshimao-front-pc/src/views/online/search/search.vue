<template>
  <div class="middle-container">
    <el-card class="search box-card layout-container">
      <div class="online-nav clearfix">
        <div class="pull-left tit">题型：</div>
        <div class="pull-left">
          <div class="nav-item" @click="searchEmit(item.type,index)" v-for="(item,index) in nav" :key="item.tit" :class="item.isCurrent?'active':''">
            {{ item.tit }}
          </div>
        </div>
      </div>
      <div v-if="parseInt(search.pages.total)!='0'">
        <div class="search-result">
          <div class="search-list" @click="goTiop(item)" v-for="(item,index) in search.rows" :key="item.id">
            <span class="topic-type" v-if="item.ptype == 1">单选题</span>
            <span class="topic-type" v-if="item.ptype == 2">多选题</span>
            <span class="topic-type" v-if="item.ptype == 3">判断题</span>
            <span class="topic-type" v-if="item.ptype == 4">填空题</span>
            <span class="topic-type" v-if="item.ptype == 5">简答题</span>
            <span class="topic-type" v-if="item.ptype == 7">案例分析题</span>
            <span class="topic-type" v-if="item.ptype == 8">工作票</span>
            <p class="search-tip"><span class="key-word">{{search.keyword}}</span><span v-html="item.question"></span></p>
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
    <empty-vue v-if="parseInt(search.pages.total)=='0'" v-bind:content="'没有任何结果'"/>
  </div>
</template>
<script>
import emptyVue from '../../../components/global/empty/empty'
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
    search:{
      pages:{
        total:0,
        current:1
      }
    }
  },
  data:function(){
    return {
      currentPage:1,
      nav:[
        {tit:'全部',isCurrent:true,type:''},
        {tit:'单选题',type:1,isCurrent:false},
        {tit:'多选题',type:2,isCurrent:false},
        {tit:'判断题',type:3,isCurrent:false},
        {tit:'填空题',type:4,isCurrent:false},
        {tit:'简答题',type:5,isCurrent:false},
        {tit:'案例分析',type:7,isCurrent:false},
        {tit:'工作票',type:8,isCurrent:false}
      ],
    }
  },
  components: {
    emptyVue
  },
  created: function() {
    
  },
  updated: function() {
  },
  mounted: function(){
    this.$emit('search',{page:1})
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('search',{page:val})
    },
    searchEmit(data,index){
      this.nav.forEach((item) => {
        item.isCurrent===true?item.isCurrent = false:null;
      });
      this.nav[index].isCurrent = true;
      this.$emit('search',{qtype:data})
    },
    goTiop(item){
      this.$router.push({path:`/online/search-result/${item.id}`});
    }
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

<template>
  <div>
    <my-header>
      <div class="search" style="width:100%;">
        <el-input
          style="width: 100%;"
          popper-class="my-autocomplete"
          v-model="keyword"
          :fetch-suggestions="querySearch"
          @keyup.enter.native="handleIconClick"
          placeholder="请输入您要搜索的关键字"
          @select="handleSelect2"
          @change="changeEvent"
        >
          <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick"></i>
        </el-input>
      </div>
    </my-header>
    <div class="app-body search-body">
      <div class="ptype-content">
        <h3 class="tit">选择题型</h3>
        <p class="item">
          <span
            v-for="(item,i) in nav"
            @click="selePtype(item.type,i)"
            :class="item.isCurrent?'active':''"
          >{{item.tit}}</span>
        </p>
      </div>
      <div v-if="parseInt(total)!='0'">
        <div class="search-result">
          <div
            class="search-list"
            @click="goTiop(item)"
            v-for="(item,index) in rows"
            :key="item.id"
          >
            <span class="topic-type" v-if="item.ptype == 1">单选题</span>
            <span class="topic-type" v-if="item.ptype == 2">多选题</span>
            <span class="topic-type" v-if="item.ptype == 3">判断题</span>
            <span class="topic-type" v-if="item.ptype == 4">填空题</span>
            <span class="topic-type" v-if="item.ptype == 5">简答题</span>
            <span class="topic-type" v-if="item.ptype == 7">案例分析题</span>
            <span class="topic-type" v-if="item.ptype == 8">工作票</span>
            <p class="search-tip">
              <!-- <span class="key-word">{{keyword}}</span> -->
              <span v-html="item.question"></span>
            </p>
          </div>
        </div>
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="parseInt(currentPage)"
            layout="prev, pager, next"
            :total="parseInt(total)"
          ></el-pagination>
        </div>
      </div>
      <empty-vue v-if="parseInt(total)=='0'" class="mar" v-bind:content="'没有任何结果'"/>
    </div>
    <my-nav :index="1"/>
  </div>
</template>
<script>
import MyHeader from '../../../components/global/header/header'
import emptyVue from '../../../components/global/empty/empty'
import { MyNav } from '../../../components/nav/index'
import { search } from '../../../api/online';
import { Loading } from 'element-ui';
export default {
  name: 'Search',
  metaInfo: {
    title: '考试猫'
  },
  props: {

  },
  data: function () {
    return {
      loading: '',
      currentPage: 1,
      state: '',
      keyword: '',
      qtype: '',
      total: '',
      rows: [],
      restaurants: [],
      nav: [
        { tit: '全部', type: '', isCurrent: true },
        { tit: '单选题', type: 1, isCurrent: false },
        { tit: '多选题', type: 2, isCurrent: false },
        { tit: '判断题', type: 3, isCurrent: false },
        { tit: '填空题', type: 4, isCurrent: false },
        { tit: '简答题', type: 5, isCurrent: false },
        { tit: '案例题', type: 7, isCurrent: false },
        { tit: '工作票', type: 8, isCurrent: false }
      ],
    }
  },
  components: {
    emptyVue,
    MyHeader,
    MyNav
  },
  created: function () {
    this.handleIconClick();
  },
  updated: function () {
  },
  mounted: function () {
    this.$emit('search', { page: 1 })
  },
  methods: {
    changeEvent(){
      this.handleIconClick()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handleIconClick();
    },
    searchEmit(data, index) {
      this.nav.forEach((item) => {
        item.isCurrent === true ? item.isCurrent = false : null;
      });
      this.nav[index].isCurrent = true;
      this.qtype = data;
      this.handleIconClick()
    },
    goTiop(item) {
      this.$router.push({ path: `/online/search-result/${item.id}` });
    },
    querySearch(queryString, cb) {
      this.keyword = queryString;
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect2(item) {
    },
    selePtype(type, index) {
      this.qtype = type;
      this.nav.forEach((item) => {
        item.isCurrent ? item.isCurrent = false : '';
      })
      this.nav[index].isCurrent = true;
      this.handleIconClick();
    },
    handleIconClick() {
      let data = {
        keyword: this.keyword,
        type: 'all',
        qtype: this.qtype,
        page: this.currentPage
      }
      this.loading = true;
      this.loading = Loading.service();
      search(data).then((res) => {
        this.loading.close();
        this.total = res.data.pages.total;
        this.rows = res.data.rows;
      })
    }
  }

}
</script>
<style lang='scss'>
@import "../../../assets/styles/element-variables";
.search-body {
  padding-left: 0;
  padding-right: 0;
  padding-top: 2.8rem;
  .ptype-content {
    padding: 0 0.75rem;
    background-color: #ffffff;
    h3.tit {
      color: $--color-primary;
      line-height: 2.25rem;
      border-bottom: 1px solid $border-color;
    }
    .item {
      padding: 0.5rem 0;
      span {
        display: inline-block;
        line-height: 1rem;
        border: 1px solid $border-color;
        background-color: $bg-gray-color;
        border-radius: 0.2rem;
        color: $gray;
        padding: 0.2rem 0.5rem;
        width: 21.7%;
        margin-right: 0.75rem;
        margin-bottom: 0.5rem;
        text-align: center;
        &:nth-child(4n) {
          margin-right: 0;
        }
        &.active {
          border-color: $--color-primary;
          color: $--color-primary;
          background-color: $bg-primary-color;
        }
      }
    }
  }
}
.mar{
  margin: .75rem;
}
.search {
  .online-nav {
    border-bottom: 1px solid #ddd;
  }

  .el-input--small .el-input__inner,
  .el-input__icon {
    height: 1.6rem;
    font-size: 0.7rem;
    line-height: 1.6rem;
  }
}
.search-result {
  background-color: #ffffff;
  margin: .75rem;
  border-radius: .2rem;
}
.search-list {
  position: relative;
  padding: 2.5rem .5rem .5rem .5rem;
  cursor: pointer;
  .topic-type {
    margin-top: 0;
  }
  &:before{
    content: '';
    display: block;
    position:absolute;
    width: calc(100% - 1rem);
    height: 1px;
    left: .5rem;
    bottom: 0;
    background-color: $border-color;
  }
  &:last-child{
    &:before{
      display: none;
    }
  }
}
.key-word {
  color: $red;
  margin-right: 10px;
}
.page {
  text-align: center;
  margin-top: .75rem;
}
</style>

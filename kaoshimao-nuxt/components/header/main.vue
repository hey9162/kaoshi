<template>
  <header class="header" :class="$route.path!=='/'?'theme':''">
    <div class="layout-container">
      <div>
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" :default-active="$route.path.split('/')[1]">
        <!-- <el-menu-item> -->
          <nuxt-link to="/" class="pull-left" style="margin:20px 40px auto auto;">
            <img class="logo" v-if="$route.path==='/'" src="@/assets/images/logo.png" alt>
            <img class="logo" v-if="$route.path!=='/'" src="@/assets/images/logo2.png" alt>
          </nuxt-link>
        <!-- </el-menu-item> -->
        <el-menu-item index="">
          <nuxt-link to="/">首页 </nuxt-link>
        </el-menu-item>
        <el-menu-item :index="'online'">
          <el-badge :value="'NOW'" class="item">
            <nuxt-link to="/online/select">在线练习 </nuxt-link>
          </el-badge>
        </el-menu-item>
        <el-menu-item index="set-volume">
          <nuxt-link to="/set-volume/smart">智能组卷 </nuxt-link>
        </el-menu-item>
        <el-menu-item index="down">
          <nuxt-link to="/down">APP下载 </nuxt-link>
        </el-menu-item>
        <no-ssr>
          <div class="pull-right btn-ctrl">
            <el-button size="small" :class="$route.path!=='/'?'trans-theme-btn':''" v-if="!isSearch" @click="goSearch" style="margin-right:10px" icon="el-icon-search"/></el-button>
            <el-autocomplete v-if="isSearch"
              style="margin-right:16px"
              popper-class="my-autocomplete"
              v-model="keyword"
              size="small"
              :fetch-suggestions="querySearch"
              @keyup.enter.native="handleIconClick"
              placeholder="关键字">
              <i
                class="el-icon-search el-input__icon"
                slot="suffix"
                @click="handleIconClick">
              </i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
              </template>
            </el-autocomplete>
            <nuxt-link to="/register">
              <el-button size="small" class="trans-theme-btn" v-if="!isLogin()" style="margin-right:10px">注册</el-button>
            </nuxt-link>
            <nuxt-link to="/login" v-if="!isLogin()">
              <el-button size="small" class="trans-theme-btn">登录</el-button>
            </nuxt-link>
            <nuxt-link to="/user/set">
              <el-button size="small" class="trans-theme-btn" style="margin-right:10px" v-if="isLogin()">个人中心</el-button>
            </nuxt-link>
            <nuxt-link to="/login">
              <el-button size="small" class="trans-theme-btn" @click="logOut" v-if="isLogin()">退出</el-button>
            </nuxt-link>
          </div>
        </no-ssr>
      </el-menu>
      </div>
    </div>
  </header>
</template>
<script>
import { logout } from "@/api/login";
import { search } from "@/api/online";
import { mapState } from 'vuex'
import { store, mutations } from "./store"
import { getSession } from '@/utils/session';

export default {
  name: "MyHeader",
  data() {
    return {
      restaurants: [],
      keyword:''
    };
  },
  computed: {
    storeData() {
      return store.data
    },
    isSearch() {
      return store.isSearch
    }
  },
  created: function() {
    console.log(this.$route.path.split('/')[1])
  },
  mounted() {
    
  },
  methods: {
    setData(){
      let data = {
        page: 1,
        type:'all',
        keyword: this.keyword
      }
      return mutations.setData(data)
    },
    isLogin(){
      return getSession("user")
    },
    handleSelect(key, keyPath) {
      if(keyPath == '/online/search'){
        this.setData()
        this.handleIconClick()
      }
    },
    logOut() {
      logout().then(res => {
        if (process.browser){
          localStorage.clear('token');
          localStorage.clear('user');
        }
        this.$router.push('/login');
      });
    },
    goSearch(){
      this.$router.push('/online/search');
    },
    querySearch(queryString, cb) {
      this.keyword = queryString;
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      cb(results);
      this.setData()
    },
    createFilter(queryString) {
      return (restaurant) => {
        if(!restaurant){
          restaurant = ''
        }
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleIconClick() {
      return mutations.getLists()
    }
  }
};
</script>
<style lang="scss">
$headerHeight: 65px;
$--color-primary: #1a8cff;
.trans-theme-btn{
  background-color: transparent;
  border: 1px solid $--color-primary;
  a,i,span{
    color: $--color-primary;
  }
  &:hover{
    border: 1px solid $--color-primary !important;
  }
}

.theme {
  background-color: $--color-primary !important;
  .trans-theme-btn{
    border: 1px solid #ffffff;
    a,i,span{
      color: #ffffff;
    }
    &:hover{
      border: 1px solid #ffffff !important;
      background-color: transparent;
    }
  }
  .el-menu {
    background-color: $--color-primary !important;
    li {
      color: #ffffff;
    }
  }
  .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus {
    background-color: $--color-primary !important;
    color: #ffffff;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid #ffffff;
    color: #ffffff;
  }
}
.logo {
  width: 115px;
}
.item {
  .el-badge__content.is-fixed {
    top: 21px;
    right: 24px;
  }
}
.header {
  background-color: #ffffff;
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu-item{
    padding: 0;
    a {
      display: block;
      padding: 0 20px;
    }
  }
  .el-menu--horizontal > .el-menu-item {
    height: 70px;
    line-height: 70px;
    margin-right: 30px;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom-width: 4px;
  }
  .btn-ctrl {
    margin-top: 20px;
  }
  .el-autocomplete{
    ::-webkit-input-placeholder{
      color: #ffffff;
    }
    i.el-input__icon{
      color: #ffffff;
    }
    .el-input--small .el-input__inner{
      border-color: #ffffff;
      background: transparent;
      color: #ffffff;
      &:focus{
        border-color: #ffffff;
      }
    }
  }
}
</style>

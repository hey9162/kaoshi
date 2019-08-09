<template>
  <header class="header" :class="$route.path!=='/'?'theme':''">
    <div class="layout-container">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item>
          <router-link to="/">
          <img class="logo" v-if="$route.path==='/'" src="../../assets/images/logo.png" alt>
          <img class="logo" v-if="$route.path!=='/'" src="../../assets/images/logo2.png" alt>
          </router-link>
        </el-menu-item>
        <el-menu-item index="/">
          <router-link to="/">首页</router-link>
        </el-menu-item>
        <el-menu-item index="/online/select">
          <el-badge :value="'NOW'" class="item">
            <router-link to="/online">在线练习</router-link>
          </el-badge>
        </el-menu-item>
        <el-menu-item index="/set-volume/smart">
          <router-link to="/set-volume">智能组卷</router-link>
        </el-menu-item>
        <!-- <el-menu-item index="/entry/entrying">
          <router-link to="/entry">试卷录入</router-link>
        </el-menu-item> -->
        <el-menu-item index="/down">
          <router-link to="/down">APP下载</router-link>
        </el-menu-item>
        <div class="pull-right btn-ctrl">
          <el-button :class="$route.path!=='/'?'trans-theme-btn':''" v-if="!isSearch" @click="goSearch" style="margin-right:10px" icon="el-icon-search"/>
          </el-button>
          <el-autocomplete v-if="isSearch"
            style="margin-right:16px"
            popper-class="my-autocomplete"
            v-model="state"
            :fetch-suggestions="querySearch"
            @keyup.enter.native="handleIconClick"
            placeholder="关键字"
            @select="handleSelect2">
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
          <router-link to="/register">
            <el-button class="trans-theme-btn" v-if="!isLogin()" style="margin-right:10px">注册</el-button>
          </router-link>
          <router-link to="/login">
            <el-button class="trans-theme-btn" v-if="!isLogin()">登录</el-button>
          </router-link>
          <router-link to="/user">
            <el-button class="trans-theme-btn" style="margin-right:10px" v-if="isLogin()">个人中心</el-button>
          </router-link>
          <el-button class="trans-theme-btn" @click="logOut" v-if="isLogin()">退出</el-button>
        </div>
      </el-menu>
    </div>
  </header>
</template>
<script>
import { logout } from "../../api/login";
import { search } from "../../api/online";
import { mapState } from 'vuex'
export default {
  name: "MyHeader",
  data() {
    return {
      restaurants: [],
      state: '',
      activeIndex: '',
      isSearch: false,
      keyword:''
    };
  },
  props: ['qtype','page'],
  computed: {
  },
  created: function() {
    
  },
  watch: {
    qtype: function (val, oldVal) {
      this.handleIconClick({qtype:val,page:1})
    },
    page: function (val, oldVal) {
      this.handleIconClick({page:val})
    }
  },
  mounted() {
  },
  methods: {
    isLogin(){
      return localStorage.getItem("user");
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key+'';
      this.isSearch = false;
    },
    logOut() {
      logout().then(res => {
        localStorage.clear('token');
        localStorage.clear('user');
        this.$router.push('/login');
      });
    },
    goSearch(){
      this.isSearch = true;
      this.activeIndex = '2';
      this.$router.push('/online/search');
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
      console.log(item);
    },
    handleIconClick(ev) {
      let data = {
        keyword:this.keyword,
        type:'all',
        qtype:this.qtype,
        page:this.page
      }
      Object.assign(data,ev);
      if(this.keyword){
        Object.assign(data,{page:1});
      }
      search(data).then((res)=>{
        this.$emit('search',res)
      })
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

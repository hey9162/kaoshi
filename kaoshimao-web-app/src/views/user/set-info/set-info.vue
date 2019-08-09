<template>
  <div>
    <my-header>
      <div class="app-header-left" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i> 返回</div>
      <div class="app-header-middle">
        账号设置
      </div>
      <div>&emsp;&emsp;</div>
    </my-header>
    <div class="app-body">
      <ul class="card">
        <!-- <li class="box-flex">
          <p class="" >
            <span>头像</span>
          </p>
          <i class="el-icon-arrow-right"></i>
        </li> -->
        <router-link class="box-flex" :to="'/user-center/edit-info'">
          <p class="" >
            <span>昵称</span>
          </p>
          <div>
            {{user.nickname}}
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <li class="box-flex">
          <p class="" >
            <span>账号</span>
          </p>
          <div>
            {{user.phone}}
            <i class="el-icon-arrow-right"></i>
          </div>
        </li>
      </ul>
      <div class="logout">
        <el-button class="full-btn" size="big" @click="logout" type="danger">退出登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from '../../../components/global/header/header'
import { setSession, getSession } from '../../../utils/session';
export default {
  name: 'set-info',
  data: function(){
    return {
      user:{

      }
    }
  },
  components: {
    MyHeader
  },
  created: function() {
    this.user = getSession('user');
  },
  methods: {
    logout(){
      localStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>
<style lang='scss'>
@import "../../../assets/styles/mixin";
@import "../../../assets/styles/element-variables";
.logout{
  position: fixed;
  width: 92%;
  left: .75rem;
  right: .75rem;
  bottom: 2rem;
}
</style>

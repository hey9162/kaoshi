<template>
  <div>
    <my-header>
      <div class="app-header-left" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i> 返回</div>
      <div class="app-header-middle">
        关于考试猫
      </div>
      <div>&emsp;&emsp;&emsp;</div>
    </my-header>
    <div class="about">
      <div class="logo">
        <img src="../../assets/images/about.png" alt="">
      </div>
      <ul class="card" style="margin-top:.75rem;">
        <li class="box-flex">
          <i class="el-icon-refresh theme-color"></i>
          <p class="flex-center" >
            <span>版本更新</span>
          </p>
          <i class="el-icon-arrow-right"></i>
        </li>
        <router-link class="box-flex" :to="'/about'">
          <i class="el-icon-service theme-color"></i>
          <p style="width:8.2rem;">
            <span>联系我们</span>
          </p>
          <span>QQ群:135728985</span>
        </router-link>
      </ul>
      <p class="copy">
        <a href="http://www.beian.gov.cn" target="_blank" class="gray">Copyright <span>{{new Date().getFullYear()}}</span>.kaoshimao.</a></p>
    </div>
  </div>
</template>
<script>
import MyHeader from '../../components/global/header/header'
import { setSession, getSession } from '../../utils/session';
import { validNickName } from '../../utils/validate.js'
import { editInfo, getUser } from '../../api/user';
import { Message } from 'element-ui';
export default {
  name: 'set-info',
  data: function(){
    return {
      user:{
        nickname:'',
      }
    }
  },
  components: {
    MyHeader
  },
  created: function() {
    this.user = getSession('user');
    this.textarea = this.user.nickname;
  },
  methods: {
    submitForm(){
      if(!validNickName(this.user.nickname)){
        Message({
          message: '昵称格式不正确',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      editInfo(this.user).then(res=>{
        Message({
          message: '修改成功',
          type: 'success',
          duration: 2 * 1000
        })
      })
      .then(()=>{
        getUser().then(res=>{
          setSession('user',res.data);
        });
      });
    }
  }
}
</script>
<style lang='scss'>
@import "../../assets/styles/mixin";
@import "../../assets/styles/element-variables";
.about{
  padding: 2.5rem 0 0 0;
  .logo{
    background-color: $--color-primary;
    text-align: center;
    padding:  .95rem 0;
    position: relative;
    &::before{
      content: '';
      display: block;
      position: absolute;
      height: 1px;
      background-color: #1584f3;
      top: 0;
      left: .75rem;
      width: calc(100% - 1.5rem);
    }
  }
  .card{
    margin: 0 .75rem;
  }
}
.copy{
  text-align: center;
  color: $gray;
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>

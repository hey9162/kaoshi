<template>
  <div class="middle-container">
    <div class="clearfix" style="background-color:#fff;">
      <div class="online-nav clearfix">
        <div class="layout-container">
          <div class="pull-left">
            <div class="nav-item"  v-for="item in nav" :key="item.tit" :class="item.isCurrent?'active':''">
              <router-link :to="item.url">{{ item.tit }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-container" style="margin-top:10px;">
      <el-card class="user-form-card">
        <el-form class="form-box" ref="form" :model="form" :rules="rules" label-width="80px">
          <h3 class="title">修改密码</h3>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="form.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="oldpass">
            <el-input v-model="form.oldpass" type="password" maxlength="20" placeholder="请输入您的旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-input v-model="form.newpass" type="password" maxlength="20" placeholder="请输入您的密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="conPassword">
            <el-input v-model="form.conPassword" type="password" maxlength="20" placeholder="请再次输入您的新密码"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUser,editPass } from '../../../api/user'
import { getSession } from '../../../utils/session'
import { validPassword } from '../../../utils/validate';
import { Message } from 'element-ui'
export default {
  name: 'edit-pass',
  data() {
    let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if(!validPassword(value)){
            callback(new Error('请输入正确的密码'));
          }
          if (this.form.conPassword !== '') {
            this.$refs.form.validateField('conPassword');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      nav:[
        {tit:'账号设置',url:'/user/set'},
        {tit:'修改密码',isCurrent:true,url:'/user/edit-pass'}
      ],
      form:{
        phone:'',
        oldpass:'',
        newpass:'',
        conPassword: ''
      },
      rules:{
        phone:[{}],
        oldpass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newpass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        conPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created: function(){
    this.getData()
  },
  methods: {
    getData(){
      let user = getSession('user');
      this.form.phone = user.phone;
    },
    submitForm(form){
      this.$refs[form].validate(valid=>{
        if(valid){
          let data = {};
          data.oldpassword = this.form.oldpass;
          data.password = this.form.newpass;
          editPass(data).then(res=>{
            Message({
              message: '修改密码成功',
              type: 'success',
              duration: 2 * 1000
            }),
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setTimeout(()=>{
              this.$router.push('/login');
            },2000)
          });
        }
      });
    }
  }
}
</script>
<style lang="scss">
.form-box{
  width: 500px;
  .el-form-item__label{
    padding: 0 24px 0 0;
  }
}
.user-form-card{
  padding: 20px 40px;
}
</style>

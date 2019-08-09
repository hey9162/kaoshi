<template>
  <div class="layout-container">
    <div class="account-container">
      <div class="form-main">
        <div class="form-logo">
          <nuxt-link :to="'/'">
            <img src="@/assets/images/logo-small.png" alt="">
          </nuxt-link>
        </div>
        <div class="form-content">
          <h2>欢迎您加入考试猫</h2>
          <p>让你轻松备考一次通过</p>
        </div>
        <el-form :model="ruleForm"
        status-icon @submit="submitForm('ruleForm')"
        :rules="rules" ref="ruleForm">
          <div class="form-pro">
            <div class="inp-group">
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone" maxlength="11" type="text" placeholder="请输入您的11位手机号码" size="large">
                  <template slot="prepend">+86</template>
                </el-input>
              </el-form-item>
            </div>
            <div class="inp-group suffix">
              <el-form-item prop="password">
                <el-input v-model="ruleForm.password" maxlength="20" @keyup.enter.native="submitForm('ruleForm')" type="password" placeholder="请输入您的密码" size="large"></el-input>
                <nuxt-link to="/find-pass"><el-button size="small" class="right-btn"  type="text">忘记密码</el-button></nuxt-link>
              </el-form-item>
            </div>
            <div class="inp-group mar-bottom-20">
              <el-button class="full-btn" type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
            </div>
            <div class="inp-group">
              <nuxt-link to="/register"><el-button class="full-btn">没有账号，立即注册</el-button></nuxt-link>
            </div>
            <!-- <div class="inp-group">
              <el-button class="qq pull-left" type="primary">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconqq"></use>
                </svg>
                 &emsp;QQ</el-button>
              <el-button class="wechat pull-right" type="success">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#iconwechat"></use>
                </svg>
                &emsp;微信</el-button>
            </div> -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/login.js'
import { applyResult } from '@/api/online'
import { validPhone,validPassword } from '@/utils/validate'
import { getSession } from '@/utils/session'
export default {
  name: 'Login',
  layout: 'null',
  data() {
    const validatePhone = (rule, value, callback) => {
      if(!validPhone(value)){
        callback(new Error('手机号码不正确'))
      }else {
        callback()
      }
    }
    const validPass = (rule, value, callback) => {
      if(!validPassword(value)){
        callback(new Error('密码输入不正确'))
      }else {
        callback()
      }
    }
    
    return {
      isShowCapt: false,
      view:{
        timeNum: '',
        disabled: false
      },
      ruleForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, trigger: 'blur', message: '手机号不能为空', },
          { required: true, trigger: 'blur',validator: validatePhone }
        ],
        password: [
          {  required: true, message: '密码不能为空', trigger: 'blur' },
          {  trigger: 'blur',validator: validPass }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
          }
          login(data).then(response => {
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            let ids = getSession('wrong');
            if(ids){
              applyResult({question_id:ids,result:-1})
            }
            this.$router.push('/');
          })
        } else {
          return false;
        }
      });
    },
  }
}
</script>
<style lang="scss">
</style>

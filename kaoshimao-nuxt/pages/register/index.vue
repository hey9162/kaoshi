<template>
  <div class="layout-container">
    <div id="c1" style="display:block;"></div>
    <div class="account-container">
      <div class="form-main">
        <div class="form-logo">
          <router-link :to="'/'">
            <img src="@/assets/images/logo-small.png" alt="">
          </router-link>
        </div>
        <div class="form-content">
          <h2>欢迎您加入考试猫</h2>
          <p>让你轻松备考一次通过</p>
        </div>
        <div class="form-pro">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
            <div class="inp-group">
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone" maxlength="11" type="text" placeholder="请输入您的11位手机号码" size="large">
                  <template slot="prepend">+86</template>
                </el-input>
              </el-form-item>
            </div>
            <div class="inp-group suffix">
              <el-form-item prop="code">
                <el-input v-model="ruleForm.code" maxlength="6" placeholder="请输入手机验证码" size="large"></el-input>
                <el-button size="small" class="right-btn" type="text" :disabled="view.disabled" @click="getCheck('ruleForm')">
                  <span v-if="!view.timeNum">
                    获取验证码
                  </span>
                  <span v-if="view.timeNum">{{ view.timeNum }}秒</span>
                </el-button>
              </el-form-item>
            </div>
            <div class="inp-group">
              <el-form-item prop="password">
                <el-input v-model="ruleForm.password" type="password" placeholder="请输您的入密码" size="large"></el-input>
              </el-form-item>
            </div>
            <div class="inp-group mar-bottom-20">
              <el-form-item prop="nickname">
                <el-input v-model="ruleForm.nickname" @keyup.enter.native="submitForm('ruleForm')" placeholder="请输入您的昵称" size="large"></el-input>
              </el-form-item>
            </div>
            <div class="inp-group mar-bottom-10">
              <el-checkbox v-model="agreement">我已阅读并同意<el-button type="text">《平台服务政策》</el-button></el-checkbox>
            </div>
            <div class="">
              <el-button class="full-btn" type="primary" :disabled="!agreement" @click="submitForm('ruleForm')">免费注册</el-button>
              <div class="bottom-ctrl clearfix">
                <div class="pull-left">已有账号，<router-link to="/login"><el-button type="text">立即登录</el-button></router-link></div>
                <div class="pull-right"><router-link to="/find"><el-button type="text">忘记密码</el-button></router-link></div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { register,getCode } from '@/api/login.js'
import { validPhone, validNickName } from '@/utils/validate.js'
import { setTimer } from '@/utils/timer.js'
export default {
  name: 'Register',
  layout: 'null',
  data(){
    const validatePhone = (rule, value, callback) => {
      if(!validPhone(value)){
        callback(new Error('手机号码不正确'))
      }else {
        callback()
      }
    }
    const validateNickName = (rule, value, callback) => {
      if(!validNickName(value)){
        callback(new Error('昵称不正确'))
      }else {
        callback()
      }
    }
    return {
      agreement: '',
      view:{
        timeNum: '',
        disabled: false
      },
      ruleForm: {
        phone: '',
        code:'',
        password: '',
        nickname:''
      },
      rules: {
        phone: [
          { required: true, trigger: 'blur',validator: validatePhone }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur',validator: validateNickName }
        ]
      }
    }
  },
  computed: {
    
  },
  mounted: function (){
  },
  methods: {
    getCheck(ruleForm){
      this.$refs.ruleForm.validateField('phone',(phoneError) => {
        if(!phoneError){
          let that = this
          let myCaptcha = _dx.Captcha(document.getElementById('c1'), {
            appId: 'b4f113b21c08e851abc79b753d5c4a0c',
            style: 'popup',
            width: 300,
            success: function (token) {
              myCaptcha.hide();
              getCode({phone:that.ruleForm.phone,token:token}).then(response => {
                that.view.timeNum = 60
                that.view.disabled = true
                setTimer(that,function(){
                  that.view.disabled = false
                });
              })
            }
          });
          myCaptcha.show();
        }
      })
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            phone: this.ruleForm.phone,
            code: this.ruleForm.code,
            password: this.ruleForm.password,
            nickname: this.ruleForm.nickname
          }
          register(data).then(response => {
            this.$router.push('/login');
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style lang="scss">
</style>

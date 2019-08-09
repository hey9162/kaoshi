<template>
  <div>
    <div id="c1"></div>
    <my-header>
      <div class="logo">
        <img src="./../../assets/images/logo2.png" alt="">
      </div>
      <div @click="$router.push('/')">
          先用用看
        <i class="el-icon-arrow-right"></i>
      </div>
    </my-header>
    <div class="app-body account-container">
      <div class="form-main">
        <div class="form-logo">
          <a href="javascript:;">
            <img src="../../assets/images/logo-small.png" alt="">
          </a>
        </div>
        <div class="form-content">
          <h2>找回密码</h2>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <div class="form-pro">
            <div class="inp-group" >
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone" maxlength="11" type="text" placeholder="请输入您的11位手机号码" size="large">
                  <template slot="prepend">+86</template>
                </el-input>
              </el-form-item>
            </div>
            <div class="inp-group suffix">
              <el-form-item prop="code">
                <el-input v-model="ruleForm.code" @keyup.enter.native="goReset('ruleForm')" placeholder="请输入手机验证码" size="large"></el-input>
              </el-form-item>
              <el-button class="right-btn" type="text" :disabled="view.disabled" @click="getCheck('ruleForm')">
                <span v-if="!view.timeNum">
                  获取验证码
                </span>
                <span v-if="view.timeNum">{{ view.timeNum }}秒</span>
              </el-button>
            </div>
            <!-- <div class="inp-group mar-bottom-10">
              <p>验证码已发送您的手机，请注意查收短信</p>
            </div> -->
            <div class="inp-group">
              <el-button class="full-btn" type="primary" @click="goReset">下一部</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from '../../components/global/header/header'
import { getCode, findPass } from '../../api/login.js'
import { validPhone,validPassword } from '../../utils/validate.js'
import { setTimer } from '../../utils/timer.js'
export default {
  name: 'Find',
  components:{
    MyHeader
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if(!validPhone(value)){
        callback(new Error('手机号码不正确'))
      }else {
        callback()
      }
    }
    
    return {
      view:{
        timeNum: '',
        disabled: false
      },
      ruleForm: {
        phone: '',
        code:''
      },
      rules: {
        phone: [
          { required: true, trigger: 'blur', message: '手机号不能为空', },
          { required: true, trigger: 'blur',validator: validatePhone }
        ],
        code: [
          { required: true, trigger: 'blur', message: '验证码不能为空' }
          
        ]
      }
    }
  },
  methods: {
    getCheck(ruleForm){
      this.$refs.ruleForm.validateField('phone',(phoneError) => {
        if(!phoneError){
          let that = this
          let myCaptcha = _dx.Captcha(document.getElementById('c1'), {
            appId: 'b4f113b21c08e851abc79b753d5c4a0c',
            style: 'popup',
            success: function (token) {
              myCaptcha.hide()
              getCode({phone:that.ruleForm.phone,token:token,from:'forgot'}).then(response => {
                that.view.timeNum = 60
                that.view.disabled = true
                setTimer(that,function(){
                  that.view.disabled = false
                });
              })
            }
          })
          myCaptcha.show();
        }
      })
    },
    goReset(){
      this.$refs.ruleForm.validate((valid) => {
        if(!valid) return false;
        const data = {
          phone: this.ruleForm.phone,
          code: this.ruleForm.code,
        }
        findPass(data).then((res)=>{
          this.$router.push({
            path: '/reset',
            query: {
              phone: this.ruleForm.phone,
              token: res.data.token
            }
          })
        })
      })
    }
  }
}
</script>
<style lang="scss">
</style>

<template>
  <div class="layout-container">
    <div class="el-dialog__wrapper" v-show="isShowCapt">
      <div style="margin-top:100px;" class="el-dialog" id="c1"></div>
    </div>
    <div class="account-container">
      <div class="form-main">
        <div class="form-logo">
          <router-link :to="'/'">
            <img src="../../assets/images/logo-small.png" alt="">
          </router-link>
        </div>
        <div class="form-content">
          <h2>重置密码</h2>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <div class="form-pro">
            <div class="inp-group">
              <el-form-item prop="phone">
                <el-input
                  v-model="ruleForm.phone"
                  disabled
                  maxlength="11"
                  type="text"
                  placeholder="请输入您的11位手机号码"
                  size="large"
                >
                  <template slot="prepend">+86</template>
                </el-input>
              </el-form-item>
            </div>
            <div class="inp-group">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  type="password"
                  placeholder="请输入您的新密码"
                  size="large"
                ></el-input>
              </el-form-item>
            </div>
            <div class="inp-group">
              <el-form-item prop="conPassword">
                <el-input
                  v-model="ruleForm.conPassword"
                  type="password"
                  @keyup.enter.native="submitForm('ruleForm')"
                  placeholder="请再次输入您的新密码"
                  size="large"
                ></el-input>
              </el-form-item>
            </div>
            <div class="inp-group">
              <el-button class="full-btn" type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { validPhone, validPassword } from '../../utils/validate.js'
import { resetPass } from '../../api/login.js'
export default {
  name: 'Reset',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('手机号码不正确'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!validPassword(value)) {
        callback(new Error('密码格式不正确'));
      } else {
        if (this.ruleForm.conPassword !== '') {
          this.$refs.ruleForm.validateField('conPassword');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isShowCapt: false,
      view: {
        timeNum: '',
        disabled: false
      },
      token: '',
      ruleForm: {
        phone: '',
        password: '',
        conPassword: ''
      },
      rules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur', validator: validatePhone }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        conPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created: function () {
    this.ruleForm.phone = this.$route.query.phone
    this.token = this.$route.query.token
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            token: this.token,
            password: this.ruleForm.password,
            repassword: this.ruleForm.conPassword
          }
          resetPass(data).then(response => {
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

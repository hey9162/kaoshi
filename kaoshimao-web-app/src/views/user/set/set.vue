<template>
  <div class="middle-container">
    <div class="clearfix" style="background-color:#fff;">
      <div class="online-nav clearfix">
        <div class="layout-container">
          <div class="pull-left">
            <div class="nav-item" v-for="item in nav" :key="item.tit" :class="item.isCurrent?'active':''">
              <router-link :to="item.url">{{ item.tit }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-container" style="margin-top:10px;">
      <el-card class="user-form-card">
        <el-form class="form-box" ref="form" :model="form" :rules="rules" label-width="80px">
          <h3 class="title">基本信息</h3>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入您的昵称"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地区" prop="area">
            <el-cascader
              style="width: 420px;"
              :options="options"
              v-model="form.area">
            </el-cascader>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="submitForm('form')" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { cityData } from './../../../utils/citydata.min'
import { validNickName } from '../../../utils/validate.js'
import { getUser,editInfo } from '../../../api/user'
import { getSession, setSession } from '../../../utils/session'
import { Message } from 'element-ui'
export default {
  name: 'set',
  data() {
    const validateNickName = (rule, value, callback) => {
      if(!validNickName(value)){
        callback(new Error('昵称不正确'))
      }else {
        callback()
      }
    }
    return {
      nav:[
        {tit:'账号设置',isCurrent:true,url:'/user/set'},
        {tit:'修改密码',isCurrent:false,url:'/user/edit-pass'},
      ],
      form:{
        sex: '',
        nickname:'',
        area:[]
      },
      rules: {
        nickname: [
          { message: '昵称不正确', trigger: 'blur',validator: validateNickName }
        ],
        sex:[],
        area: []
      },
      options:cityData
    }
  },
  created: function(){
    this.getData()
  },
  methods: {
    getData(){
      let user = getSession('user');
      this.form.sex = user.sex;
      this.form.nickname = user.nickname;
      this.form.area = JSON.parse(user.area);
    },
    submitForm(form){
      this.$refs[form].validate(valid=>{
        if(valid){
          let data = {};
          Object.assign(data,this.form); 
          data.area = JSON.stringify(data.area);
          editInfo(data).then(res=>{
            Message({
              message: '修改成功',
              type: 'success',
              duration: 2 * 1000
            })
          }).then(()=>{
            getUser().then(res=>{
              setSession('user',res.data);
            });
          });
        }
      });
    }
  },
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

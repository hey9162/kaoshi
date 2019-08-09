<template>
  <div>
    <my-header>
      <div class="app-header-left" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i> 返回</div>
      <div class="app-header-middle">
        修改昵称
      </div>
      <div>&emsp;&emsp;&emsp;</div>
    </my-header>
    <div class="app-body edit">
      <div class="edit-card">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          maxlength="20"
          v-model="user.nickname">
        </el-input>
        <el-button class="full-btn" @click="submitForm" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from '../../../components/global/header/header'
import { setSession, getSession } from '../../../utils/session';
import { validNickName } from '../../../utils/validate.js'
import { editInfo, getUser } from '../../../api/user';
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
@import "../../../assets/styles/mixin";
@import "../../../assets/styles/element-variables";
.edit{
  padding: 2.5rem 0;
  .edit-card{
    padding: .75rem;
    background-color: #ffffff;
    margin: .75rem;
    border-radius: .2rem;
    .full-btn{
      margin-top: 1rem;
      line-height: 2;
    }
  }
}
</style>

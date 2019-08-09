<template>
  <div class="middle-container">
    <div class="online-nav">
      <div class="layout-container">
        <div class="pull-left tit">练习模式：</div>
        <div class="pull-left">
          <div class="nav-item" @click="practiceMode(index)" v-for="(item,index) in nav" :key="item.tit" :class="item.mode == mode?'active':''">
            <router-link v-if="item.mode==4" :to="item.url">{{ item.tit }}</router-link>
            <span v-if="index!==3">{{ item.tit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <span v-if="type === '1'">错题练习</span>
            <span v-if="type === '2'">收藏练习</span>
            <span v-if="type === '3'">组卷练习</span>
            <span v-if="type === '0'">在线练习</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span v-if="mode == 1">顺序练习</span>
            <span v-if="mode == 2">随机练习</span>
            <span v-if="mode == 3">背题模式</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="contents.rows.length>0">
        <select-radio v-for="content in rows()" :key="content.id" 
        v-bind:content="content"
        v-bind:pages="contents.pages"
        v-bind:topicNum="topicNum"
        v-bind:mode="mode"
        v-bind:realcollectIds="realcollectIds"
        @showApplyModal="showApply"
        @previewImg="showImg"
        @isCollec="isCollecCtrl"
        @answer="answerFun"
        @goTopicEvent="goTopic"/>
      </div>
      <div v-if="empty">
        <empty-vue v-bind:content="'没有任何题目'"/>
      </div>
    </div>
    <el-dialog
      title="试题报错"
      :visible.sync="applyModal"
      width="30%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <h3 class="title">问题类型</h3>
        <el-form-item prop="category">
          <el-radio-group v-model="ruleForm.category" style="margin-bottom:10px;">
            <el-radio label="问题有误" :key="1001"></el-radio>
            <el-radio label="答案有误" :key="1002"></el-radio>
            <el-radio label="解析有误" :key="1003"></el-radio>
            <el-radio label="图片不清楚" :key="1004"></el-radio>
          </el-radio-group>
        </el-form-item>
        <h3 class="title">具体问题</h3>
        <el-form-item prop="desc">
          <el-input
            type="textarea"
            :rows="4"
            resize="false"
            placeholder="请输入内容"
            custom-class="'apply-err'"
            modal="true"
            v-model="ruleForm.desc">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="applyModal = false">取 消</el-button>
        <el-button type="primary" @click="applyError('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="imgVisible">
      <img style="width:100%;" :src="imgVisibleUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>

import emptyVue from '@/components/global/empty/empty'
import SelectRadio from '@/components/global/select-radio/select-radio'
import { getTopic,getbyIds,getcollectIds,getWrongIds,getDefIds, applyErr } from '@/api/online'
import { getSession,setSession } from '@/utils/session'
import { randomsort } from '@/utils/random'
import { Loading, Message } from 'element-ui';
export default {
  data:function(){
    return {
      empty:false,
      applyModal: false,
      imgVisible: false,
      imgVisibleUrl: '',
      mode:1,
      ruleForm: {
        category:'',
        desc: ''
      },
      rules: {
        category: [
          { required: true, message: '请选择问题类型', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入具体描述', trigger: 'blur' }
        ]
      },
      nav:[
      {tit:'顺序练习',isCurrent:true,mode:1},
      {tit:'随机练习',mode:2}
      ],
      type:0,
      topicNum: 0,
      contents:{
        rows:[],
        pages:{total:0}
      },
      realcollectIds:[],
      collectIds:[],
      searchData:{
        mode: ''
      },
      collectMode:{
        pageNum: 1,
        mode:1,
        jumNum:''
      },
      routerData:{

      }
    }
  },
  components: {
    SelectRadio,
    emptyVue
  },
  created: function() {
    if(this.$route.query.data){
      this.routerData = JSON.parse(this.$route.query.data);
    }
  },
  mounted: function(){
    this.setSequence('','',this.type);
    this.initData(false,1,true);
  },
  computed: {
  },
  methods: {
    rows() {
      return [this.contents['rows'][this.topicNum]];
    },
    practiceMode(index){
      this.mode = this.nav[index].mode;
      if(this.mode == 2){
        this.initData(true,this.mode);
      }
      if(this.mode == 1 || this.mode == 3){
        this.initData(false,this.mode);
      }
    },
    showApply:function(){
      this.applyModal = true;
    },
    showImg:function(e){
      this.imgVisible = true;
      this.imgVisibleUrl = e;
    },
    answerFun:function(e){
      this.contents['rows'][this.topicNum].selfAnswer = e;
    },
    goTopic(data){
      switch (data.type) {
        case 1:
          let testValueIndex4 = this.topicNum - 1;
          if(this.contents.rows[testValueIndex4]){
            this.topicNum--;
          }else{
            this.collectMode.pageNum--;
            this.getTopicByIdsCollec(data);
          }
          break;
        case 2:
          let testValueIndex5 = this.topicNum + 1;
          if(this.contents.rows[testValueIndex5]){
            this.topicNum++;
          }else{
            this.collectMode.pageNum++;
            this.getTopicByIdsCollec(data);
          }
          break;
        case 3:
          let jumNum2 = parseInt(data.jumNums);
          let testValueIndex6 = jumNum2-1;
          if(this.contents.rows[testValueIndex6]){
            this.topicNum = jumNum2-1;
          }else{
            this.collectMode.pageNum = Math.ceil(jumNum2/10);
            this.getTopicByIdsCollec(data);
          }
          break;
        default:
          break;
      }
      this.setSequence(this.mode,{sequence:this.topicNum},this.type);
    },
    getCollec(random){
      return getcollectIds(random).then((res)=>{
        if(res.data){
          setSession('realcollectIds',res.data);
            this.realcollectIds = res.data;
          if(random){
            this.collectIds = res.data;
            this.collectIds = this.collectIds.sort(randomsort)
          }else{
            this.collectIds = res.data
          }
        }else{
          if(random && getSession('realcollectIds')){
            this.collectIds = getSession('realcollectIds').sort(randomsort)
          }else{
            this.collectIds = getSession('realcollectIds')
          }
        }
      });
    },
    getVolume(random){
      if(random){
        this.collectIds = JSON.parse(this.$route.query.ids).sort(randomsort)
      }else{
        this.collectIds = JSON.parse(this.$route.query.ids);
      }
      return new Promise((resolve)=>{
        resolve()
      })
    },
    getWrong(random){
      return getWrongIds().then((res)=>{
        if(res.data){
          setSession('wrong',res.data);
          if(random){
            this.collectIds = res.data.sort(randomsort)
          }else{
            this.collectIds = res.data
          }
        }else{
          if(random){
            this.collectIds = getSession('wrong').sort(randomsort)
          }else{
            this.collectIds = getSession('wrong')
          }
        }
      });
    },
    getDef(random){
      return getDefIds(this.routerData).then((res)=>{
        setSession('def',res.data.rows);
        if(random){
            this.collectIds = res.data.rows.sort(randomsort)
        }else{
          this.collectIds = res.data.rows
        }
      });
    },
    isCollecCtrl(data){
      if(data.type===1){
        // this.collectIds.push(data.id);
        this.realcollectIds.push(data.id);
        // setSession('collect',this.collectIds);
      }
      if(data.type===2){
        this.realcollectIds.splice(this.realcollectIds.indexOf(data.id),1);
        // setSession('collect',this.collectIds);
      }
    },
    /**
     * data： 跳转信息
     */
    getTopicByIdsCollec(data){
      const loading = this.$loading({
        lock: true,
        spinner: 'el-icon-loading'
      });
      this.collectMode.collectIds = this.collectIds;
      if(!this.collectIds){
        /**没有错题或收藏 */
        this.empty = true;
        loading.close();
        return
      }
      let pageTotal = Math.ceil(this.collectMode.collectIds.length/10);
      this.contents.pages = { total:this.collectMode.collectIds.length };
      this.contents.rows.length = this.collectMode.collectIds.length
      if(pageTotal === 1){
        getbyIds({ids:JSON.stringify(this.collectIds)}).then((res)=>{
          this.contents.rows = res.data;
          loading.close();
        })
      }else {
        let that = this;
        let arrIds = this.collectMode.collectIds.slice((this.collectMode.pageNum-1)*10,this.collectMode.pageNum*10);
        getbyIds({ids:JSON.stringify(arrIds)}).then((res)=>{
          loading.close();
          res.data.forEach((item)=>{
            item.question = item.question.replace(/^(\d+.)|(\d+.\d+.)/,'');
          })
          that.contents.rows.splice((that.collectMode.pageNum-1)*10,res.data.length,...res.data);
          if(data){
            switch (data.type) {
              case 1:
                that.topicNum--;
                break;
              case 2:
                that.topicNum++;
                break;
              case 3:
                that.topicNum = parseInt(data.jumNums)-1;
                break;
              default:
                that.topicNum--;
                break;
            }
          }
        });
      }
    },
    initData(random,model){
      this.type = this.$route.params.type;
      if(getSession('sequence'+this.type)){
        this.mode = getSession('sequence'+this.type)[model-1].model;
        this.topicNum = getSession('sequence'+this.type)[model-1].sequence;
      }
      this.collectMode.pageNum = Math.ceil(this.topicNum/10);
      if(this.collectMode.pageNum == 0){
        this.collectMode.pageNum = 1;
      }
      this.setSequence(this.mode,{sequence:this.topicNum},this.type);

      /**
       * 1  错题   2 收藏  0 默认全部   3 组卷/模拟
       */
      if(this.$route.params.type === '1'){
        this.getWrong(random).then(()=>{
          this.getTopicByIdsCollec();
        })
      };
      if(this.$route.params.type === '2'){
        this.getCollec(random).then(()=>{
          this.getTopicByIdsCollec()
        })
      };
      if(this.$route.params.type === '0'){
        this.getDef(random).then(()=>{
          this.getTopicByIdsCollec()
        })
      };
      if(this.$route.params.type === '3'){
        this.getVolume(random).then(()=>{
          this.getTopicByIdsCollec()
        })
      };
    },
    setSequence(model,sequence,type){
      let data = [
          {
            model:1,
            sequence:sequence['1'] || 0,
          },
          {
            model:2,
            sequence:sequence['2'] || 0,
          },
          {
            model:3,
            sequence:sequence['3'] || 0,
          }];
      if(getSession('sequence'+type)){
        data = getSession('sequence'+type);
      }
      if(sequence){
        data.forEach(item=>{
          if(item.model == model){
            Object.assign(item,sequence)
          }
        });
      }
      setSession('sequence'+type,data);
    },
    applyError(formName){
      this.$refs[formName].validate((valid) => {
        if(!valid) return
        applyErr(Object.assign(this.ruleForm,{id:this.contents['rows'][this.topicNum].id})).then(res=>{
          Message({type:'success', message:'谢谢您的反馈',duration: 1500});
          this.applyModal = false;
        });
      })
    }
  }
}
</script>
<style lang='scss'>
  .apply-err{

  }
</style>

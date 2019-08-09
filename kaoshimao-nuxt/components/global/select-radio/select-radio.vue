<template>
  <no-ssr>
    <div class="topic" :class="content.isSimulation?'simulation':''">
      <el-card class="box-card" v-if="content.qtype">
        <div class="topic-top">
          <span class="topic-type">{{ qtype }}</span>
            <h3 class="topic-tit" v-if="content.question" :class="content.question.length>50?'small-tit':''">
              <span v-if="topicNum+1">{{topicNum+1}}.</span>
              <span v-html="content.question"></span>
            </h3>
        </div>
        <div class="clearfix">
          <div class="select-left pull-left" v-if="content">
            <el-radio-group v-if="content.qtype == 1 || content.qtype == 3" v-model="isRecite&&!isSimulation?answer:selfAnswer" @change="apply">
              <el-radio 
              v-for="item in JSON.parse(content.options)"
              :key="item.Value"
              :label="item.Key"
              :disabled="isRecite">
              <span v-html="item.Value"></span>
              </el-radio>
            </el-radio-group>
            <el-checkbox-group v-if="content.qtype == 2" v-model="isRecite&&!isSimulation?checkBoxAnswerList:checkBoxAnswer">
              <el-checkbox
              v-for="item in JSON.parse(content.options)"
              :key="item.Value"
              :disabled="isRecite"
              :label="item.Key">
              <span v-html="item.Value"></span>
              </el-checkbox>
              <el-button style="margin-bottom:20px" size="small" @click="apply" v-if="!isRecite">提交答案</el-button>
            </el-checkbox-group>
            <div v-if="showEditor">
              <el-radio v-model="selfRadio" @change="apply" :disabled="isRecite" label="1">已熟练掌握</el-radio>
              <el-radio v-model="selfRadio" @change="apply" :disabled="isRecite" label="2">有点忘记</el-radio>
              <el-radio v-model="selfRadio" @change="apply" :disabled="isRecite" label="3">完全不会</el-radio>
              <el-radio v-model="selfRadio" @change="apply"  :disabled="isRecite" label="4">我要输入答案</el-radio>
              <div style="margin-bottom: 20px;"
              v-model="editorContent"
              class="quill-editor"
              ref="myQuillEditor"
              v-quill:myQuillEditor="editorOption"></div>
            </div>
          </div>
        </div>
        <div v-if="!isSimulation" class="practice-ctrl">
          <div v-if="isRecite || showAns">
            <div class="results">
              <span class="results-text err">回答错误</span>
              <span class="results-text">正确答案</span>
              <span class="results-text err" v-html="content.answer"></span>
            </div>
            <hr>
            <h3 class="title">答案解析</h3>
            <p class="parsing"><span v-html="content.analysis"></span></p>
          </div>
          <div v-if="!isSimulation && !result && !search">
            <hr>
            <el-button type="primary" size="small" :disabled="topicNum==0" @click="goTopic(1)">上一题</el-button>
            <el-button type="primary" @click="goTopic(2)" v-if="pages" :disabled="topicNum==pages.total-1" size="small">下一题</el-button>
            <span class="auto-next">
              <el-checkbox @change="autoNext" v-model="checked">自动下一题</el-checkbox>
            </span>
            <span class="auto-next">
              <el-checkbox @change="changeRecite" v-model="isRecite">背题模式</el-checkbox>
            </span>
            <span class="page-jump gray" v-if="pages.total">跳转至&nbsp;
              <el-input class="page-inp gray" type="number" size="small" v-model="jumNum" @change="goTopic(3,jumNum)"></el-input>
            &nbsp;/ {{pages.total}}&nbsp;题</span>
            <el-button class="pull-right" @click="applayError" size="small" icon="el-icon-warning">纠错</el-button>
            <el-button class="pull-right" style="margin-right:10px" size="small" icon="el-icon-star-off">
              <span v-if="isCollec == -1" @click="collec(content.id,1)">收藏</span>
              <span v-if="isCollec>-1" @click="collec(content.id,2)">取消收藏</span>
            </el-button>
          </div>
        </div>
        <div v-if="isSimulation" class="simulation-ctrl">
          <hr>
          <el-button type="primary" size="medium" @click="goTopic(1)" :disabled="topicNum==0">上一题</el-button>
          <el-button type="primary" @click="goTopic(2)" size="medium">下一题</el-button>
        </div>
      </el-card>
    </div>
  </no-ssr>
</template>
<script>
import { applyResult,collectIds,delCollectIds } from '../../../api/online'
import { setQuestionIds,setSession,getSession,setStateIdsSession } from '../../../utils/session'
import { Message } from 'element-ui'
export default {
  name: 'select-radio',
  components: {
    // quillEditor
  },
  data() {
    return {
      checked: true,
      isRecite: getSession('isRecite'),
      jumNum: '',
      selfRadio: '',
      selfAnswer:'',
      showAns: false,
      editorContent: '',
      collectIds:[],
      isCollecAuto: true,
      checkBoxAnswer:[],
      editorOption: {
        modules:{
          toolbar:[
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ]
        },
        placeholder: '请输入正确答案',
        theme:'snow'
      }
    }
  },
  props:['content','pages','topicNum','mode','realcollectIds','isSimulation','result','search'],
  computed: {
    qtype(){
      switch (this.content.qtype) {
        case '1':
          return '单选题'
          break;
        case '2':
          return '多选题'
          break;
        case '3':
          return '判断题'
          break;
        case '4':
          return '填空题'
          break;
        case '5':
          return '简答题'
          break;
        case '7':
          return '案例分析题'
          break;
        case '8':
          return '工作票改错题'
          break;
        default:
          break;
      }
    },
    showEditor(){
      return (this.content.qtype != 1 && this.content.qtype != 2 && this.content.qtype != 3)
    },
    checkBoxAnswerList(){
      return this.content.answer.split('');
    },
    answer(){
      return this.content.answer;
    },
    hasAnswer(){
      return this.content.selfAnswer;
    },
    isCollec(){
      if(this.realcollectIds){
        return this.realcollectIds.indexOf(this.content.id);
      }else{
        return false
      }
    }
  },
  created: function(){
    // onsole.log(this.$style.red)
    this.selfAnswer = this.content.selfAnswer;
    if(this.content.selfAnswer){
      this.checkBoxAnswer = this.content.selfAnswer.split('');
    }
    if(this.checkBoxAnswer.length>0){
      this.showAns = (this.checkBoxAnswer != this.content.checkBoxAnswer)
    };
    if(this.selfAnswer){
      this.showAns = (this.selfAnswer !== this.content.answer)
    };
    this.checked = getSession('autoNext');
  },
  mounted: function(){
  },
  methods: {
    autoNext: function(){
      setSession('autoNext',this.checked)
    },
    changeRecite: function(){
      setSession('isRecite',this.isRecite);
    },
    applayError: function(){
      this.$emit('showApplyModal','1')
    },
    apply: function(){
      let result = -1;
      if(this.content.qtype == 1 || this.content.qtype == 3){
        this.selfAnswer===this.content.answer?result=1:'';
        this.$emit('answer',this.selfAnswer);
      }else if(this.content.qtype == 2){
        this.checkBoxAnswer.join('') === this.content.answer?result=1:'';
        this.$emit('answer',this.checkBoxAnswer.join(''));
      }else{
        this.selfRadio == 1 ? result=1:'';
      }
      setStateIdsSession('wrong',this.content.id);
      applyResult({question_id:this.content.id,result:result}).then((res)=>{
        if(this.content.qtype == 2){
          Message({
            message: '提交成功',
            type: 'success',
            duration: 1500
          })
        }
      });
      if(!this.isSimulation){
        if(result === 1 && this.topicNum<this.pages.total-1 && this.checked){
          let timer = setTimeout(() => {
            this.$emit('goTopicEvent',{type:2})
            clearTimeout(timer);
          }, 500);
        }else if(result !== 1){
          this.showAns = true
        }
      }else{
        setSession('simulationState')
        // let timer = setTimeout(() => {
        //   this.$emit('goTopicEvent',{type:2})
        //   clearTimeout(timer);
        // }, 500);
        this.$emit('simulationEve',{id:this.content.id,result:result});
      }
    },
    /**
     * type 1 收藏  2 取消收藏
     */
    collec: function(id,type){
      if(type === 1){
        collectIds({ids:JSON.stringify([id])}).then((res)=>{
          this.$emit('isCollec',{type:1,id:id});
        });
      }
      if(type === 2){
        delCollectIds({ids:JSON.stringify([id])}).then((res)=>{
          this.$emit('isCollec',{type:2,id:id})
        })
      }
    },
    previewImg: function(url){
      this.$emit('previewImg',url)
    },
    /**
     * type 1 上一题
     * type 2 下一题
     * type 3 跳转type题
     */
    goTopic(type,jumNum){
      if(jumNum>this.pages.total || jumNum==0){
        return
      }
      this.$emit('goTopicEvent',{type:type,jumNums:jumNum})
    },
    filterStyle: function(value){
      if (!value) return ''
      value = value.toString()
      let rel = /style\s*?=\s*?(['"])[\s\S]*?\1/;
      return value.replace(rel,'')
    }
  }
}
</script>
<style lang="scss" module>
  .test{
    color: red;
  }
</style>

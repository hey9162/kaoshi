<template>
  <div class="topic" :class="content.isSimulation?'simulation':''">
    <span class="topic-type">{{ qtype }}</span>
    <el-card class="box-card" v-if="content.qtype">
      <div class="topic-top">
        <h3
          class="topic-tit"
          v-if="content.question"
          :class="content.question.length>50?'small-tit':''"
        >
          <span v-if="topicNum+1">{{topicNum+1}}.</span>
          <span v-html="content.question"></span>
        </h3>
      </div>
      <div class="clearfix">
        <div class="select-left pull-left" v-if="content">
          <el-radio-group
            v-if="content.qtype == 1 || content.qtype == 3"
            v-model="isRecite?hasAnswer:selfAnswer"
            @change="apply"
          >
            <el-radio
              v-for="item in JSON.parse(content.options)"
              :key="item.Value"
              :label="item.Key"
              :disabled="isRecite"
            >{{item.Value}}</el-radio>
          </el-radio-group>
          <el-checkbox-group
            v-if="content.qtype == 2"
            v-model="isRecite?checkBoxAnswerList:checkBoxAnswer"
          >
            <el-checkbox
              v-for="item in JSON.parse(content.options)"
              :key="item.Value"
              :label="item.Key"
            >{{item.Value}}</el-checkbox>
            <el-button class="full-btn" type="primary" style="margin-bottom:20px" @click="apply">提交答案</el-button>
          </el-checkbox-group>
          <div v-if="showEditor">
            <el-radio v-model="selfRadio" @change="apply" :disabled="isRecite" label="1">已熟练掌握</el-radio>
            <el-radio v-model="selfRadio" @change="apply" :disabled="isRecite" label="2">有点忘记</el-radio>
            <el-radio v-model="selfRadio" @change="apply" :disabled="isRecite" label="3">完全不会</el-radio>
            <el-radio v-model="selfRadio" @change="apply" :disabled="isRecite" label="4">我要输入答案</el-radio>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :disabled="isRecite" 
              v-model="editorContent">
            </el-input>
          </div>
        </div>
      </div>
      <div v-if="isRecite || showAns " class="practice-ctrl">
        <div>
          <hr>
          <div class="flex-box">
            <p class="parsing">
              <span class="gray">答案&emsp;</span>
              <span v-html="content.answer"></span>
            </p>
            <p></p>
          </div>
          <div class="flex-box">
            <p class="parsing">
              <span class="gray">解析</span>
            </p>
            <p>
              <span v-html="content.analysis"></span>
            </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { applyResult, collectIds, delCollectIds } from '../../../api/online'
import { setQuestionIds, setSession, getSession, setStateIdsSession } from '../../../utils/session'
import { Message } from 'element-ui'
export default {
  name: 'select-radio',
  data() {
    return {
      jumNum: '',
      selfRadio: '',
      selfAnswer: '',
      showAns: false,
      editorContent: '',
      collectIds: [],
      isCollecAuto: true,
      checkBoxAnswer: []
    }
  },
  props: ['content', 'pages', 'topicNum', 'isSimulation', 'result', 'autoNex','isRecite'],
  computed: {
    qtype() {
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
    showEditor() {
      return (this.content.qtype != 1 && this.content.qtype != 2 && this.content.qtype != 3)
    },
    checkBoxAnswerList() {
      return this.content.answer.split('');
    },
    hasAnswer() {
      return this.content.selfAnswer;
    }
  },
  created: function () {
    this.selfAnswer = this.content.selfAnswer;
    if (this.content.selfAnswer) {
      this.checkBoxAnswer = this.content.selfAnswer.split('');
    }
    if (this.checkBoxAnswer.length > 0) {
      this.showAns = (this.checkBoxAnswer != this.content.checkBoxAnswer)
    };
    if (this.selfAnswer) {
      let agent = (this.selfAnswer !== this.content.answer);
      if(agent && !this.isSimulation){
        this.showAns = true;
      }else{
        this.showAns = false;
      }
    };
  },
  mounted: function () {
  },
  methods: {
    apply: function () {
      let result = -1;
      if (this.content.qtype == 1 || this.content.qtype == 3) {
        this.selfAnswer === this.content.answer ? result = 1 : '';
        this.$emit('answer', {value:this.selfAnswer,result:result,id:this.content.id});
      } else if (this.content.qtype == 2) {
        this.checkBoxAnswer.join('') === this.content.answer ? result = 1 : '';
        if(!this.checkBoxAnswer.join('')){
          Message({
            message: '请完善答案',
            type: 'error',
            duration: 1500
          })
          return
        }
        this.$emit('answer', {value:this.checkBoxAnswer.join(''),result:result,id:this.content.id});
      } else {
        this.selfRadio == 1 ? result = 1 : '';
      }
      setStateIdsSession('wrong', this.content.id);
      applyResult({ question_id: this.content.id, result: result }).then((res) => {
        if (this.content.qtype == 2) {
          Message({
            message: '提交成功',
            type: 'success',
            duration: 1500
          })
        }
      });
      if(!this.isSimulation){
        if(result === 1 && this.topicNum<this.pages.total-1 && this.autoNex){
          let timer = setTimeout(() => {
            this.$emit('goTopicEvent',{type:2})
            clearTimeout(timer);
          }, 500);
        }else if(result !== 1){
          this.showAns = true
        }
      }
      if(this.isSimulation){
        let timer = setTimeout(() => {
          this.$emit('goTopicEvent',{type:2})
          clearTimeout(timer);
        }, 800);
      }
    },
    filterStyle: function (value) {
      if (!value) return ''
      value = value.toString()
      let rel = /style\s*?=\s*?(['"])[\s\S]*?\1/;
      return value.replace(rel, '')
    }
  }
}
</script>
<style lang="scss">
@import "../../../assets/styles/quill";
@import '../../../assets/styles/element-variables';
.flex-box {
  display: flex;
  justify-content: space-between;
  .parsing {
    min-width: 1.7rem;
  }
}
.select-left{
  width: 100%;
}
.el-radio-group{
  width: 100%;
}
</style>

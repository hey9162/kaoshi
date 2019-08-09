<template>
  <div>
    <my-header>
      <div class="app-header-left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i> 返回
      </div>
      <div class="app-header-middle">
        <div class="clearfix switch" v-if="!isSimulation && $route.query.check != 1">
          <div class="item" @click="practiceMode(1)" :class="active==1?'active':''">答题模式</div>
          <div class="item" @click="practiceMode(2)" :class="active==2?'active':''">背题模式</div>
        </div>
        <div v-if="isSimulation">{{simulationName}}</div>
      </div>
      <div class="app-header-right" @click="setModal = true">
        <i class="el-icon-setting"></i>
      </div>
    </my-header>
    <transition name="slide-fade" :duration="200">
      <div
        v-if="anim"
        class="app-body"
        :class="{ bigSize: fontSize === 50, bigbigSize: fontSize === 100 }"
      >
        <v-touch class="touch" v-on:swipeleft="swiperleft" v-on:swiperight="swiperight">
          <div v-if="contents.rows.length>0" style="min-height: calc(100vh - 7.7rem);">
            <select-radio
              v-for="(content,key,index) in [contents['rows'][topicNum]]" :key="content['id']"
              v-bind:content="content"
              v-bind:pages="contents.pages"
              v-bind:topicNum="topicNum"
              v-bind:anim="anim"
              v-bind:realcollectIds="realcollectIds"
              v-bind:autoNex="autoNex"
              v-bind:isRecite="isRecite"
              v-bind:isSimulation="isSimulation"
              @answer="answerFun"
              @goTopicEvent="goTopic"
            />
          </div>
          <div v-if="empty">
            <empty-vue v-bind:content="'没有任何题目'"/>
          </div>
        </v-touch>
      </div>
    </transition>
    <el-dialog title="试题报错" :visible.sync="applyModal" width="90%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <h3 class="title">问题类型</h3>
        <el-form-item prop="category">
          <el-radio-group v-model="ruleForm.category">
            <el-radio label="问题有误" :key="1001" style="margin-bottom:10px;"></el-radio>
            <el-radio label="答案有误" :key="1002" style="margin-bottom:10px;"></el-radio>
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
            v-model="ruleForm.desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="applyModal = false">取 消</el-button>
        <el-button type="primary" @click="applyError('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="overlay" @click="show = !show" v-if="show"></div>
    <transition v-if="!empty" name="bottom">
      <div :class="!show?'bottom-enter-active':'bottom-leave-active'" class="bottom-modal">
        <div @click="show = !show" class="title">
          <div v-if="!isSimulation">
            <span
              class="custom-btn"
              v-if="isCollec <= -1"
              @click.stop="isCollecCtrl({type:1,id:contents.rows[topicNum].id})"
            > <svg class="icon svg-icon theme-color" aria-hidden="true">
                  <use xlink:href="#iconunie601"></use>
                </svg> 收藏</span>
            <span
              class="custom-btn"
              v-if="isCollec > -1"
              @click.stop="isCollecCtrl({type:2,id:contents.rows[topicNum].id})"
            > <svg class="icon svg-icon theme-color" aria-hidden="true">
                  <use xlink:href="#icontubiao14"></use>
                </svg> 取消收藏</span>
            &emsp;
            <span class="custom-btn" @click.stop="applyModal = true"> <i class="el-icon-upload2 theme-color"></i> 报错</span>
          </div>
          <div v-if="isSimulation">
            <span class="custom-btn" @click.stop="submitVisible=true"> <i class="el-icon-upload2 theme-color"></i> 交卷</span>
          </div>
          <div v-if="isSimulation">
            <span>{{time.timeStr}}</span>
          </div>
          <div class="contrl">
            <span v-if="victoryIds.length>0"><i class="el-icon-circle-check-outline theme-color"></i>&nbsp;{{victoryIds.length}}</span>
            <span v-if="errIds.length>0"><i class="el-icon-circle-close-outline red"></i>&nbsp;{{errIds.length}}</span>
            <span><i class="el-icon-menu theme-color"></i>&nbsp;{{topicNum+1}}/{{contents.pages.total}}</span>
          </div>
        </div>
        <ul>
          <li>
            <div class="flex">
              <span
                v-if="!isSimulation"
                @click="goTopic({type:3,jumNums:index+1})"
                v-for="(i,index) in collectIds"
                class="item-no"
                :class="[i.indexOf('/1')>-1?'actived':'',i.indexOf('/-1')>-1?'err':'',index==topicNum?'active':'']"
              >{{index+1}}</span>
              <span v-if="isSimulation"
                @click="goTopic({type:3,jumNums:index+1})"
                v-for="(i,index) in collectIds"
                class="item-no"
                :class="[i.indexOf('/1')>-1?'actived':'',i.indexOf('/-1')>-1?'actived':'',index==topicNum?'active':'']"
              >{{index+1}}</span>
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <el-dialog title="答题设置" :visible.sync="setModal" width="90%" center>
      <ul class="set">
        <li class="flex">
          <div>自动下一题</div>
          <div>
            <el-switch v-model="autoNex"></el-switch>
          </div>
        </li>
        <li class="flex">
          <div>字体大小</div>
          <div class="slider">
            <el-slider
              v-model="fontSize"
              :format-tooltip="formatTooltip"
              @change="changeSize"
              :step="50"
              show-stops
            ></el-slider>
          </div>
        </li>
      </ul>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="submitVisible"
      width="90%">
      <span>您还剩余<span class="red">{{remainder}}</span>道题目未作答，确认交卷？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitConfirm">交 卷</el-button>
        <el-button @click="submitVisible = false">继续做题</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Timer } from '../../../utils/timer'
import emptyVue from '../../../components/global/empty/empty'
import setVue from '../../../components/global/set/set'
import SelectRadio from '../../../components/global/select-radio/select-radio'
import MyHeader from '../../../components/global/header/header'
import { getTopic, getbyIds, getcollectIds, getWrongIds, getDefIds, applyErr, applyResult, collectIds, delCollectIds } from '../../../api/online'
import { getSession, setSession } from '../../../utils/session'
import { randomsort } from '../../../utils/random'
import { Loading, Message } from 'element-ui'
export default {
  data: function () {
    return {
      palyedIds:[],//做过的
      victoryIds:[],//做对的
      errIds:[],//做错的
      submitVisible: false,
      time:{},
      anim: true,
      show: false,
      errCount: 0,
      correct: 0,
      setModal: false,
      isSimulation: false,
      simulationName: '',
      fontSize: getSession('fontSize', this.fontSize) || 0,
      autoNex: true,
      active: getSession('isRecite') ? 2 : 1,
      isRecite: getSession('isRecite') || false,
      empty: false,
      applyModal: false,
      imgVisible: false,
      ruleForm: {
        category: '',
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
      topicNum: 0,
      contents: {
        rows: [{id:'12121'}],
        pages: { total: 0 }
      },
      realcollectIds: [],
      collectIds: [],
      collectMode: {
        pageNum: 1,
        mode: 1,
        jumNum: ''
      },
      routerData: {}
    }
  },
  components: {
    SelectRadio,
    MyHeader,
    emptyVue,
    setVue
  },
  created: function () {
    if (this.$route.query.data) {
      this.routerData = JSON.parse(this.$route.query.data);
    }
    this.time = new Timer();
    this.time.start();
  },
  mounted: function () {
    if (this.routerData.type == 2) {
      this.initData(true, 1, true);
    } else {
      this.initData(false, 1, true);
    }
  },
  computed: {
    isCollec() {
      if (this.contents['rows'][this.topicNum]) {
        return this.realcollectIds.indexOf(this.contents['rows'][this.topicNum].id)
      }
    },
    remainder()  {
      if(this.collectIds){
        return this.collectIds.length - this.errCount - this.correct;
      }else{
        return 0;
      }
    }
  },
  methods: {
    swiperleft() {
      if (this.topicNum == (this.contents.pages.total - 1)) {
        return Message({ type: 'error', message: '已经是最后一题了', duration: 1500 });
      }
      this.anim = false;
      setTimeout(() => {
        this.anim = true;
      }, 200);
      this.goTopic({ type: 2 })
    },
    swiperight() {
      if (this.topicNum == 0) {
        return Message({ type: 'error', message: '已经是第一题了', duration: 1500 });
      }
      this.anim = false;
      setTimeout(() => {
        this.anim = true;
      }, 200);
      this.goTopic({ type: 1 })
    },
    changeSize() {
      setSession('fontSize', this.fontSize);
    },
    practiceMode(type) {
      if (this.active !== type) {
        this.active = type;
        if (this.active == 2) {
          setSession('isRecite', true);
        } else {
          setSession('isRecite', false);
        }
        this.isRecite = getSession('isRecite');
      }
    },
    answerFun: function (e) {
      this.contents['rows'][this.topicNum].selfAnswer = e.value;
      let id = this.contents['rows'][this.topicNum].id;
      let index = this.collectIds.indexOf(id);
      if (index > -1) {
        this.collectIds[index] = this.collectIds[index] + '/' + e.result;
      }
      if (e.result == -1) {
        this.errCount++;
      } else {
        this.correct++;
      }
      this.palyedIds.push(e.id);
      if(e.result == 1){
        this.victoryIds.push(e.id);
      }else{
        this.errIds.push(e.id);
      }
    },
    goTopic(data) {
      switch (data.type) {
        case 1:
          let testValueIndex4 = this.topicNum - 1;
          if (this.contents.rows[testValueIndex4]) {
            this.topicNum--;
          } else {
            this.collectMode.pageNum--;
            this.getTopicByIdsCollec(data);
          }
          break;
        case 2:
          let testValueIndex5 = this.topicNum + 1;
          if (this.contents.rows[testValueIndex5]) {
            this.topicNum++;
          } else {
            this.collectMode.pageNum++;
            this.getTopicByIdsCollec(data);
          }
          break;
        case 3:
          this.show = false;
          let jumNum2 = parseInt(data.jumNums);
          let testValueIndex6 = jumNum2 - 1;
          if (this.contents.rows[testValueIndex6]) {
            this.topicNum = jumNum2 - 1;
          } else {
            this.collectMode.pageNum = Math.ceil(jumNum2 / 10);
            this.getTopicByIdsCollec(data);
          }
          break;
        default:
          break;
      }
    },
    getCollec(random) {
      return getcollectIds(random).then((res) => {
        if (res.data) {
          setSession('realcollectIds', res.data);
          this.realcollectIds = res.data;
          if (random) {
            this.collectIds = res.data;
            this.collectIds = this.collectIds.sort(randomsort)
          } else {
            this.collectIds = res.data
          }
        } else {
          if (random && getSession('realcollectIds')) {
            this.collectIds = getSession('realcollectIds').sort(randomsort)
          } else {
            this.collectIds = getSession('realcollectIds')
          }
        }
      });
    },
    getVolume(random) {
      if (random) {
        this.collectIds = getSession('simulationM').ids.sort(randomsort);
      } else {
        this.collectIds = getSession('simulationM').ids
      }
      return new Promise((resolve) => {
        resolve()
      })
    },
    getWrong(random) {
      if(this.$route.query.check == 1){
        this.isRecite = true;
        this.collectIds = getSession('result').errIds;
        return new Promise((resolve)=>{
          resolve();
        })
      }
      return getWrongIds().then((res) => {
        if (res.data) {
          setSession('wrong', res.data);
          if (random) {
            this.collectIds = res.data.sort(randomsort)
          } else {
            this.collectIds = res.data
          }
        } else {
          if (random) {
            this.collectIds = getSession('wrong').sort(randomsort)
          } else {
            this.collectIds = getSession('wrong')
          }
        }
      });
    },
    getDef(random) {
      return getDefIds(this.routerData).then((res) => {
        setSession('def', res.data.rows);
        if (random) {
          this.collectIds = res.data.rows.sort(randomsort)
        } else {
          this.collectIds = res.data.rows
        }
      });
    },
    isCollecCtrl(data) {
      let id = JSON.stringify([this.contents['rows'][this.topicNum].id])
      if (data.type === 1) {
        collectIds({ ids: id }).then((res) => {
          this.realcollectIds.push(data.id);
        });
      }
      if (data.type === 2) {
        delCollectIds({ ids: id }).then((res) => {
          this.realcollectIds.splice(this.realcollectIds.indexOf(data.id), 1);
        })
      }
    },
    /**
     * data： 跳转信息
     */
    getTopicByIdsCollec(data) {
      const loading = this.$loading({
        lock: true,
        spinner: 'el-icon-loading'
      });
      this.collectMode.collectIds = this.collectIds;
      if (!this.collectIds) {
        /**没有错题或收藏 */
        this.empty = true;
        loading.close();
        return
      }
      this.contents.pages = { total: this.collectMode.collectIds.length };
      this.contents.rows.length = this.collectMode.collectIds.length;
      let that = this;
      let arrIds = this.collectMode.collectIds.slice((this.collectMode.pageNum - 1) * 10, this.collectMode.pageNum * 10);
      getbyIds({ ids: JSON.stringify(arrIds) }).then((res) => {
        loading.close();
        res.data.forEach((item) => {
          item.question = item.question.replace(/^(\d+.)|(\d+.\d+.)/, '');
        })
        that.contents.rows.splice((that.collectMode.pageNum - 1) * 10, res.data.length, ...res.data);
        if (data) {
          switch (data.type) {
            case 1:
              that.topicNum--;
              break;
            case 2:
              that.topicNum++;
              break;
            case 3:
              that.topicNum = parseInt(data.jumNums) - 1;
              break;
            default:
              that.topicNum--;
              break;
          }
        }
      });
    },
    initData(random, model) {
      this.type = this.$route.params.type;
      this.collectMode.pageNum = Math.ceil(this.topicNum / 10);
      if (this.collectMode.pageNum == 0) {
        this.collectMode.pageNum = 1;
      }
      /**
       * 1  错题   2 收藏  0 默认全部   3 组卷/模拟
       */
      if (this.$route.params.type === '1') {
        this.getWrong(random).then(() => {
          this.getTopicByIdsCollec();
        })
      };
      if (this.$route.params.type === '2') {
        this.getCollec(random).then(() => {
          this.getTopicByIdsCollec()
        })
      };
      if (this.$route.params.type === '0') {
        this.getDef(random).then(() => {
          this.getTopicByIdsCollec()
        })
      };
      if (this.$route.params.type === '3') {
        this.isSimulation = true;
        this.isRecite = false;
        setSession('isRecite',false);
        this.simulationName = getSession('simulationM').name;
        this.getVolume(random).then(() => {
          this.getTopicByIdsCollec()
        })
      };
    },
    applyError(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        applyErr(Object.assign(this.ruleForm, { id: this.contents['rows'][this.topicNum].id })).then(res => {
          Message({ type: 'success', message: '谢谢您的反馈', duration: 1500 });
          this.applyModal = false;
        });
      })
    },
    formatTooltip(val) {
      if (val == 0) {
        return '标准'
      }
      if (val == 50) {
        return '大号'
      }
      if (val == 100) {
        return '超大号'
      }
    },
    submitConfirm(){
      this.submitVisible = false;
      let collectScore = {};
      let customIds = getSession('simulationM').customIds;
      customIds.forEach(item => {
        let arr = item.split('*');
        collectScore[[arr[0]]]= arr[1]
      });
      let score = 0;
      this.victoryIds.forEach((item)=>{
        score = score + parseInt(collectScore[item]);
      });
      let data = {
        count: this.palyedIds.length,
        total: this.contents['rows'].length,
        victoryRatio: this.victoryIds.length/this.palyedIds.length,
        time: this.time.timeStr,
        errIds:this.errIds,
        score:score,
        submitTime: new Date(),
        name: this.name
      }
      setSession('isRecite',true);
      setSession('result',data);
      this.$router.push({ path: '/online/result', query: { data: JSON.stringify(data) }})
    }
  }
}
</script>
<style lang='scss'>
@import "../../../assets/styles/mixin";
@import "../../../assets/styles/element-variables";
.switch {
  line-height: 1;
  width: 8rem;
  height: 1.5rem;
  background-color: #147ae0;
  border-radius: 0.25rem;
  padding: 0.1rem;
  .item {
    float: left;
    width: 50%;
    line-height: 1.9;
    text-align: center;
    border-radius: 0.25rem;
    color: #054e95;
    &.active {
      background-color: $--color-primary;
      color: #ffffff;
    }
  }
}
.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}
.bottom-modal {
  position: fixed;
  width: 100%;
  height: 77vh;
  left: 0;
  background-color: #fff;
  z-index: 99;
  border-top: 1px solid #f7f7f7;
  box-shadow: 0px 0 10px #dee1e6;
  .svg-icon{
    font-size: .6rem;
  }
  .title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    border-bottom: 1px solid #e2e0e0;
    .contrl {
      line-height: 2;
      span {
        display: inline-block;
        margin-left: 0.75rem;
      }
    }
  }
  span.title {
    border: none;
  }
  .flex {
    display: flex;
    padding: 0.5rem 0.75rem;
    flex-wrap: wrap;
    max-height: 70vh;
    overflow: auto;
    span.item-no {
      display: block;
      text-align: center;
      border: 1px solid #e2e0e0;
      width: 18%;
      line-height: 2;
      border-radius: 0.2rem;
      margin-bottom: 0.5rem;
      height: 1.5rem;
      margin-right: .42rem;
      cursor: pointer;
      &.active {
        background-color: $--color-primary;
        color: #fff;
        border-color: $--color-primary;
      }
      &.actived {
        background-color: #e3f1ff;
        color: $--color-primary;
        border-color: $--color-primary;
      }
      &.err {
        background-color: #f5dcdc;
        color: #f56c6c;
        border-color: #f56c6c;
      }
      &:nth-child(5n){
        margin-right: 0;
      }
    }
  }
}
.bottom-enter-active {
  bottom: calc(-76.4vh + 2.7rem);
  transition: bottom 0.2s;
}
.bottom-leave-active {
  bottom: 0;
  transition: bottom 0.2s;
}
.custom-btn {
  background-color: #f7f7f7;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  display: inline-block;
  color: $gray;
  line-height: 2;
  cursor: pointer;
}
.set {
  .flex {
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .slider {
      width: 9rem;
    }
  }
}
.el-radio {
}
.bigSize {
  .topic-tit {
    font-size: 0.8rem;
  }
  .el-checkbox__label,
  .el-radio__label {
    font-size: 0.75rem;
  }
}
.bigbigSize {
  .topic-tit {
    font-size: 0.9rem;
  }
  .el-checkbox__label,
  .el-radio__label {
    font-size: 0.85rem;
  }
}

.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-to {
  // transform: translateX(10rem);
  opacity: 1;
}
.slide-fade-enter {
  // transform: translateX(-10rem);
  opacity: 0;
}
.touch{
  touch-action: pan-y!important; 
}
</style>

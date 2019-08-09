<template>
  <div class="topic" :class="content.isSimulation?'simulation':''">
    <el-card class="box-card">
      <div class="topic-top">
        <span class="topic-type">简答题</span>
        <h3 class="topic-tit">{{content.title}}</h3>
      </div>
      <div class="clearfix">
        <quill-editor
        v-model="content.answer"
        ref="myQuillEditor"
        :options="editorOption"></quill-editor>
      </div>
      <!-- <div class="results">
        <span class="results-text err">回答错误</span>
        <span class="results-text">正确答案</span>
        <span class="results-text err">A</span>
      </div> -->
      <div v-if="!content.isSimulation" class="practice-ctrl">
        <hr>
        <h3 class="title">答案解析</h3>
        <p class="parsing">答案解析答案解析答案解析答案解析答案解析答案解析答案解
          析答案解析答案解析答案解析答案解析答案解析答案解析答案解
          析答案解析答案解析答案解析答案解析答案解析</p>
        <hr>
        <el-button type="primary" size="medium">上一题</el-button>
        <el-button type="primary" size="medium">下一题</el-button>
        <span class="auto-next">
          <el-checkbox v-model="checked">自动下一题</el-checkbox>
        </span>
        <span class="page-jump gray">跳转至&nbsp;
          <el-input class="page-inp gray" v-model="input" @change="handleChange"></el-input>
         &nbsp;/ 999&nbsp;题</span>
        <el-button class="pull-right"icon="el-icon-warning">纠错</el-button>
        <el-button class="pull-right" style="margin-right:10px"icon="el-icon-star-off">收藏</el-button>
      </div>
      <div v-if="content.isSimulation" class="simulation-ctrl">
        <hr>
        <el-button type="primary" size="medium">上一题</el-button>
        <el-button type="primary" size="medium">下一题</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'describe-topic',
  components: {
    quillEditor
  },
  data() {
    return {
      checked: true,
      input: 1,
      radio: '1',
      editorOption: {
        modules:{
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['image','video']
          ]
        },
        placeholder: '',
        theme:'snow'
      }
    }
  },
  props:['content'],
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  created: function(){
    console.log(this.content);
  },
  mounted() {
    console.log('this is current quill instance object', this)
  },
  methods: {
    handleChange: function(){
    }
  }
}
</script>
<style lang="scss">

</style>

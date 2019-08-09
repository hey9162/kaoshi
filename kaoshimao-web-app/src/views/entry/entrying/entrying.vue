<template>
  <div class="middle-container">
    <div class="clearfix" style="background-color:#fff;">
      <div class="online-nav clearfix">
        <div class="layout-container">
          <div class="pull-left">
            <div
              class="nav-item"
              v-for="item in nav"
              :key="item.tit"
              :class="item.isCurrent?'active':''"
            >
              <router-link :to="item.url">{{ item.tit }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-container">
      <el-card class="box-card" style="margin-top:15px;">
        <h3 class="title">选择科目</h3>
        <el-radio-group v-model="radio" style="margin-bottom: 15px;">
          <el-radio :label="1">变电安规</el-radio>
          <el-radio :label="2">线路安规</el-radio>
          <el-radio :label="3">配电安规</el-radio>
          <el-radio :label="4">动力安规</el-radio>
          <el-radio :label="5">基建安规</el-radio>
          <el-radio :label="6">基建变电</el-radio>
          <el-radio :label="7">
            <el-input v-model="radioInp" placeholder="其他"></el-input>
          </el-radio>
        </el-radio-group>
        <h3 class="title">文档上传</h3>
        <el-upload
          class="upload"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div>点击或拖拽文件至此处上传</div>
          <div class="el-upload__text">仅限word/excel文件格式<br></div>
        </el-upload>
        <div class="save-btn">
          <el-button size="medium" type="primary">保存</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "entrying",
  data() {
    return {
      radio: 1,
      radioInp: "",
      nav: [
        { tit: "试题录入", isCurrent: true, url: "/entry/entrying" },
        { tit: "已上传", url: "/entry/entryed" }
      ],
    };
  },
  computed: {
  },
  methods: {
  }
};
</script>
<style lang="scss">
.el-upload{
   width: 100%;
}
.el-upload-dragger{
  width: 100%;
  height: 200px;
  background-color: #f7f7f7;
}
.el-upload__text{
  margin-top: 5px;
}
.save-btn{
  margin-top: 20px;
  text-align: center;
}
</style>

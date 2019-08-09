<template>
  <div class="middle-container">
    <section class="layout-container">
      <div class="error-container middle-container">
        <div class="img">
          <img src="@/assets/images/404.png" alt="">
        </div>
        <div class="">
          <p class="err-text">
            <big>Error!</big><br>
            <span class="span">你是不是走丢了</span><br>
            <span class="span">这里什么都没有</span><br>
            <el-button class="go-home" @click="goHome" type="primary">返回首页</el-button>
          </p>          
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Error',
  methods: {
    goHome: function() {
      this.$router.push('/')
    }
  }
}
</script>



<template>
  <div class="layout-container">
    <el-card style="margin-top:15px;">
      <section class="empty">
        <img src="../../../assets/images/no.png" alt="">
        <br>
        <div>{{ content }}</div>
      </section>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'empty',
  data() {
    return {
    }
  },
  computed: {},
  created: function(){
  },
  props: ['content'],
  methods: {
  }
}
</script>
<style lang="scss">
  .empty{
    text-align: center;
    background-color: #fff;
    padding-bottom: 20px;
  }
</style>

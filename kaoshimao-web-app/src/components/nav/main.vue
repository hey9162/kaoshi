<template>
  <footer class="footer">
    <div class="box-flex footer-flex">
      <router-link :to="'/'" class="flex-item" :class="index==0?'active':''">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#iconbook"></use>
        </svg>
        <span class="nav">题库</span>
      </router-link>
      <router-link class="flex-item" :to="'/online/search'" :class="index==1?'active':''">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#iconchaxun"></use>
        </svg>
        <span class="nav">搜索</span>
      </router-link>
      <router-link class="flex-item" :to="'/set-volume/smart'" :class="index==2?'active':''">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#iconzujuantiku"></use>
        </svg>
        <span class="nav">组卷</span>
      </router-link>
      <router-link class="flex-item" :to="'/user-center'" :class="index==3?'active':''">
        <svg class="icon svg-icon" aria-hidden="true">
          <use xlink:href="#iconwode"></use>
        </svg>
        <span class="nav">我的</span>
      </router-link>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'MyNav',
  data() {
    return {
    }
  },
  computed: {},
  methods: {
  },
  props: ['index']
}
</script>
<style lang="scss">
@import "./../../assets/styles/mixin";
@import "./../../assets/styles/element-variables";
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.7rem;
  line-height: 2.7rem;
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0,0,0,.1);
  z-index: 9;
  .box-flex {
    @include flex(row);
    @include center(row);
    justify-content: space-around;
    font-size: .7rem;
    a{
      color: $gray;
      &.active{
        color: $--color-primary;
      }
    }
    .nav{
      display: block;
    }
    &.footer-flex{
      line-height: 1.3;
      text-align: center;
      padding-top: 0.5rem;
    }
  }
}
</style>

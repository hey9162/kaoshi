<template>
  <div>
    <my-header>
      <router-link :to="'/user-center/set-info'">
        <div class="head-img">
          <div class="img">
            <img src="../../../assets/images/head.png" alt="head">
          </div>
          <div class="info">
            <p>{{user.nickname}}</p>
            <p>{{user.phone}}</p>
          </div>
          <div>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </router-link>
    </my-header>
    <div class="user-body">
      <!-- <div class="top-ctrl">
        <div class="flex-item">
          <span class>累计做题</span>
          <span>9999</span>
        </div>
        <div class="flex-item">
          <span class>正确率</span>
          <span>9999</span>
        </div>
        <div class="flex-item">
          <span class>排名</span>
          <span>9999</span>
        </div>
      </div> -->
      <div class="center-box">
        <ul class="card">
          <li class="box-flex">
            <i class="el-icon-error theme-color"></i>
            <p class="flex-center">
              <span>
                <router-link :to="'/online/practice/1'">我的错题</router-link>
              </span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li class="box-flex">
            <svg class="icon svg-icon theme-color" aria-hidden="true">
              <use xlink:href="#iconunie601"></use>
            </svg>
            <p class="flex-center">
              <span>
                <router-link :to="'/online/practice/2'">我的收藏</router-link>
              </span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </li>
          <li class="box-flex">
            <svg class="icon svg-icon theme-color" aria-hidden="true">
              <use xlink:href="#iconzujuantiku"></use>
            </svg>
            <p class="flex-center">
              <span>
                <router-link :to="'/set-volume/mine'">我的组卷</router-link>
              </span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>
        <ul class="card" style="margin-top:.75rem;">
          <!-- <li class="box-flex">
            <i class="el-icon-share theme-color"></i>
            <p class="flex-center">
              <span>推荐给好友</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </li> -->
          <router-link class="box-flex" :to="'/about'">
            <i class="el-icon-warning theme-color"></i>
            <p class="flex-center">
              <span>关于考试猫</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </ul>
      </div>
    </div>
    <my-nav v-bind:index="3"/>
  </div>
</template>
<script>
/**default 不需要{} */
import { MyNav } from '../../../components/nav/index'
import MyHeader from '../../../components/global/header/header'
import { getQuestionsCount, getTopic } from '../../../api/online'
import { setSession, getSession } from '../../../utils/session';
export default {
  name: 'Center',
  data: function () {
    return {
      user: {
        nickname:'',
      }
    }
  },
  components: {
    MyNav,
    MyHeader
  },
  created: function () {
    if(getSession('user')){
      this.user = getSession('user')
    }
  },
  methods: {
    getQuestion() {
      getQuestionsCount().then(res => {
        this.list = res.data;
        setSession('all', this.list);
      });
    }
  }
}
</script>
<style lang='scss'>
@import "../../../assets/styles/mixin";
@import "../../../assets/styles/element-variables";
.head-img {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  padding: 0.75rem 0;
  width: 100%;
  .img {
    width: 2rem;
    margin-right: 0.75rem;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .info {
    width: 14rem;
    line-height: 1.8;
  }
}
.user-body {
  padding: 4rem 0 2.7rem 0rem;
  height: calc(100vh - 6.7rem);
  .top-ctrl {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $--color-primary;
    padding: 0.75rem;
    color: #fff;
    &::before {
      content: "";
      position: absolute;
      width: calc(100% - 1.5rem);
      left: 0.75rem;
      height: 1px;
      background-color: #2a9ff3;
      top: 0;
    }
    .flex-item {
      width: 33.33%;
      text-align: center;
      span {
        display: block;
        &:nth-child(1) {
          color: #8cc5ff;
          margin-bottom: 0.25rem;
        }
      }
    }
  }
  .center-box {
    padding: 0.75rem;
  }
}
</style>

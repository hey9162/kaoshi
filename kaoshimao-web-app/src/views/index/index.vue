<template>
  <div>
    <my-header>
      <div class="logo">
        <img src="./../../assets/images/logo2.png" alt>
      </div>
    </my-header>
    <div class="app-body">
      <div>
        <h3 class="place-tit">
          请选择
          <br>要练习的安规类目
        </h3>
        <ul class="clearfix subjects">
          <li class="subject" v-for="(item, index) in list" :key="item.id">
            <router-link :to="`/select-way/${item.id}`">
              <svg v-if="index === 0" class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icongongjiaoxianlu"></use>
              </svg>
              <svg v-if="index === 1" class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconbiandian"></use>
              </svg>
              <svg v-if="index === 2" class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconbiandianzhan"></use>
              </svg>
              <svg v-if="index === 3" class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconshudianxianlu"></use>
              </svg>
              <svg v-if="index === 4" class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconpeidianxianlu"></use>
              </svg>
              <svg v-if="index === 5" class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconpeidianxianlu"></use>
              </svg>
              <svg v-if="index === 6" class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconsanheyi"></use>
              </svg>
              <svg v-if="index === 7" class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icondongli"></use>
              </svg>
              <svg v-if="index === 8" class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#iconnanwanglogo"></use>
              </svg>
              <br>
              {{item.name}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <my-nav v-bind:index="0"/>
  </div>
</template>
<script>
/**default 不需要{} */
import { MyNav } from '../../components/nav/index'
import MyHeader from '../../components/global/header/header'
import { getQuestionsCount, getTopic } from '../../api/online'
import { setSession } from '../../utils/session';
export default {
  name: 'Index',
  metaInfo: {
    title: '考试猫',
    meta: [
      {
        content: '考试猫首页'
      }
    ]
  },
  data: function () {
    return {
      list: []
    }
  },
  components: {
    MyNav,
    MyHeader
  },
  created: function () {
    this.getQuestion();
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
.subjects {
  .svg-icon{
    color: #1A8CFF;
  }
  .subject {
    float: left;
    width: 8.25rem;
    padding: 0.25rem 0.5rem;
    line-height: 2em;
    background-color: #fff;
    border-radius: 0.3125rem;
    margin-bottom: 0.75rem;
    &:nth-child(2n-1) {
      margin-right: 0.75rem;
    }
    a {
      display: block;
    }
  }
}
.place-tit {
  font-size: 0.9rem;
  margin-bottom: 0.95rem;
}
</style>

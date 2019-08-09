<template>
  <div class="middle-container">
    <div class="clearfix" style="background-color:#fff;">
      <div class="online-nav clearfix">
        <div class="layout-container">
          <div class="pull-left">
            <div class="nav-item"  v-for="item in nav" :key="item.tit" :class="item.isCurrent?'active':''">
              <router-link :to="item.url">{{ item.tit }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'collection',
  data() {
    return {
      nav:[
        {tit:'我的错题',url:'/user/wrong'},
        {tit:'我的收藏',isCurrent:true,url:'/user/collection'},
        {tit:'账号设置',url:'/user/set'}
      ],
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>

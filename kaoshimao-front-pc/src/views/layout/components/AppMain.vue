<template>
  <section class="app-main">
    <my-header v-bind:qtype="qtype" v-bind:page="page" @search="searchFun" />
    <router-view @search="searchFun" :key="key" v-bind:search="search"/>
    <my-footer />
  </section>
</template>
<script>
import { MyHeader } from '../../../components/header'
import { MyFooter } from '../../../components/footer'
export default {
  name: 'AppMain',
  components: {
    MyHeader,
    MyFooter
  },
  data() {
    return {
      key: '',
      qtype:'',
      page: 0,
      search:{
        pages:{
          total:0,
          current:1
        }
      }
    }
  },
  methods: {
    searchFun(data){
      if(data.qtype){
        this.qtype = data.qtype;
        return
      }
      if(data.page){
        this.page = data.page;
        return
      }
      if(data.data){
        this.search = data.data;
      }else{
        this.search = [];
      }
    }
  }
}
</script>
<style lang="scss">
.app-main {
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

import Vue from "vue";
import { search } from "../../api/online";

export const store = Vue.observable({ data: {type: 'all',qtype:'all'},searchData:{pages:{total:0}},isSearch: false,loading:true });
export const mutations = {
  setData( data ) {
    Object.assign(store.data,data)
  },
  setSearch( data ) {
    store.isSearch = data
  },
  getLists() {
    store.loading = true
    search(store.data).then(res=>{
      store.searchData = res.data
      store.loading = false
    })
  }
}
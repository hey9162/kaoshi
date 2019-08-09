<template>
  <div class="middle-container">
    <div class="clearfix online-nav" style="background-color:#fff;">
      <div class="layout-container clearfix">
        <div class="pull-left">
          <div class="nav-item"  v-for="item in nav" :key="item.tit" :class="item.isCurrent?'active':''">
            <router-link :to="item.url">{{ item.tit }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-container">
      <el-card style="margin-top: 15px;" class="box-card">
        <div class="clearfix">
          <div class="pull-left">
            <el-form ref="form" :model="form" label-width="46px">
              <el-form-item label="科目" size="small">
                <el-select v-model="form.value" placeholder="请选择" clearable @change="search">
                  <el-option
                    v-for="(value, key, index) in options"
                    :key="value"
                    :label="value"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="pull-right">
            <el-button type="danger" size="small" plain :disabled="disBtn" @click="handleGroupDelete">删除</el-button>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="编号"
            width="120"
            prop="name">
          </el-table-column>
          <el-table-column
            prop="paper_id"
            label="科目"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="试卷名称"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.source == 1">考试猫</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="updated_at"
            label="组卷时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '0'">练习</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                size="mini" type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                <el-button
                size="mini" type="text"
                @click="handleEdit(scope.$index, scope.row)">
                <svg class="icon svg-icon icon1" aria-hidden="true">
                  <use xlink:href="#iconbi"></use>
                </svg>&nbsp;练习</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)" class="red">
                <svg class="icon svg-icon icon1" aria-hidden="true">
                  <use xlink:href="#iconshanchu"></use>
                </svg>&nbsp;删除
                </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog
        title="删除"
        :visible.sync="dialogVisible"
        width="30%">
        <span>{{tip}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dele" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getMy,deleVolume } from '@/api/volume'
import { setSession } from '@/utils/session';
import { Message } from 'element-ui'
export default {
  name: 'mine',
  data() {
    return {
      paper:'',
      disBtn: true,
      dialogVisible: false,
      index:'',
      tip:'',
      form: {
        value: '',
      },
      options: {},
      nav:[
        {tit:'智能组件',url:'/set-volume/smart'},
        {tit:'我的组卷',isCurrent:true,url:'/set-volume/mine'}
      ],
      tableData: []
    }
  },
  created: function(){
    this.getList({})
  },
  methods: {
    handleSelectionChange(val){
      if(val.length>0){
        this.disBtn = false
      }else{
        this.disBtn = true
      }
      this.index = val;
    },
    handleDelete(index, row){
      this.dialogVisible = true;
      this.tip = '确定要删除该组卷吗？'
      this.index = index;
    },
    handleGroupDelete(){
      this.dialogVisible = true;
      this.tip = '确定要删除选中的组卷吗？'
    },
    dele(){
      this.dialogVisible = false;
      if(Array.isArray(this.index)){
        deleVolume(this.index.map(x => x.id)).then((res)=>{
          Message({
            message: '删除成功',
            type: 'success',
            duration: 2 * 1000
          })
          this.index.forEach(item=>{
            this.tableData.forEach((tr,i)=>{
              if(tr.id === item.id){
                this.tableData.splice(i,1);
              }
            })
          });
        })
      }else{
        deleVolume(this.tableData[this.index].id).then((res)=>{
          Message({
            message: '删除成功',
            type: 'success',
            duration: 2 * 1000
          })
          this.tableData.splice(this.index,1);
        });
      }
    },
    getList(data){
      getMy(data).then(res=>{
        this.tableData = res.data.rows;
        this.options = res.data.course;
      })
    },
    handleEdit(i,data){
      let ids = [];
      data.papers.forEach(item => {
        item.ids.forEach((id)=>{
          id = id + '-' +item.score;
          ids.push(id);
        })
      });
      /**跳练习 */
      // this.$router.push({ path: '/online/practice/3', query: { ids: JSON.stringify(ids) }})
      /**跳考试 */
      // params: { ids: JSON.stringify(ids),name:data.name }}
      setSession('simulation',{ids:ids,name:data.name});
      setSession('isRecite',false);
      this.$router.push('/online/simulation')
    },
    search(e){
      let data = {
        paper_id: e
      }
      this.getList(data);
    }
  }
}
</script>
<style lang="scss">
</style>

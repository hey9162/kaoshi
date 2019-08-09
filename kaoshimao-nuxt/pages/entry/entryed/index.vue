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
    <div class="layout-container">
      <el-card style="margin-top: 15px;" class="box-card">
        <div class="clearfix">
          <div class="pull-left">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="科目">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="pull-right">
            <el-button type="danger" plain>删除</el-button>
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
            prop="name"
            sortable>
          </el-table-column>
          <el-table-column
            prop="type"
            label="科目"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="试卷名称"
            show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="date"
            label="组卷时间">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini" type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'entryed',
  data() {
    return {
      options: [
        {
          value: '0',
          label: '科目一'
        }, {
          value: '1',
          label: '科目二'
        }
      ],
      nav:[
        {tit:'试题录入',url:'/entry/entrying'},
        {tit:'已上传',isCurrent:true,url:'/entry/entryed'}
      ],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        state: '未练习',
        type: '科目一',
        source: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    handleSelectionChange(){

    }
  }
}
</script>
<style lang="scss">
</style>

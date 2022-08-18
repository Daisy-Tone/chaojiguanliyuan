<template>
  <div class="manage">
    <div class="manage-header">
      <!-- 新增/更新 -->
      <el-button type="primary" @click="addUser">+新增</el-button>

        <!-- 搜索 -->
      <common-form
        :formLabel='searchFormLabel'
        :form='searchFrom'
        :inline='true'
        ref='form'
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>

    <!-- 弹框 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync='isShow'
    >
      <!-- 弹框 -->
      <!-- <common-dialog-form
        :formLabel='operateFormLabel'
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-dialog-form> -->
      <CommonDialogForm
        :formLabel='operateFormLabel'
        :form="operateForm"
        :inline="true"
        ref="form"
      />

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonDialogForm from '../../components/CommonDialogForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import {getUser} from '../../api/data'
export default {
  name:'User',
  components:{ CommonForm, CommonDialogForm, CommonTable },
  data() {
      return {
        isShow:false,
        // 新增/更新按钮
        operateType:'add',
        // 外部表单
        searchFormLabel:[
          {
            model:'keyword',
            label:'姓名',
            type:'input'
          }
        ],
        searchFrom:{
          keyword:''
        },
        // 弹框表单
        operateFormLabel:[
          {
            model:'name',
            label:'姓名',
            type:'input'
          },
          {
            model:'age',
            label:'年龄',
            type:'input'
          },
          {
            model:'sex',
            label:'性别',
            type:'select',
            opts:[
              {
                label:'男',
                value:1
              },
              {
                label:'女',
                value:0
              },
            ]
          },
          {
            model:'birth',
            label:'出生日期',
            type:'date'
          },
          {
            model:'addr',
            label:'地址',
            type:'input'
          }
        ],
        operateForm:{
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:''
        },
        // 表格内容
        tableData:[],
        tableLabel:[
          {
            prop:'name',
            label:'姓名'
          },
          {
            prop:'age',
            label:'年龄'
          },
          {
            prop:'sexLabel',
            label:'性别'
          },
          {
            prop:'birth',
            label:'出生日期',
            width:200
          },
          {
            prop:'addr',
            label:'地址',
            width:320
          },
        ],
        config:{
          page:1,
          total:30,
          loading:false
        }
      }
  },
  created(){
    this.getList()
  },
  methods:{
    confirm(){
      if(this.operateType === 'edit'){
        this.$axios.post('/user/edit',this.operateForm).then(
          response => {
            // 请求成功后
            console.log(response);
            this.isShow = false
            // 更新数据
            this.getList()
          },
          error => {
            // 请求失败后更新List数据
            console.log(error);
          }
        )
      }else{
        this.$axios.post('/user/add',this.operateForm).then(
          response => {
            // 请求成功后
            console.log(response);
            this.isShow = false
          },
          error => {
            // 请求失败后更新List数据
            console.log(error);
          }
        )
      }
    },
    addUser(){
      this.isShow = true,
      this.operateType = 'add'
      this.operateForm = {
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:''
      }
    },
    editUser(row){
      this.isShow = true,
      this.operateType = 'edit'
      this.operateForm = row
    },
    delUser(row){
      this.$confirm('此操作将永久删除该组件,是否继续?','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        const id = row.id
        this.$axios.get('/user/del',{
          params:{id}
        }).then(
          () => {
            // 请求成功后
            this.$message({
              type:'success',
              message:'删除成功'
            })
            this.getList()
          },
        )
      })

    },
    getList(name = ''){
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page:this.config.page,
        name
      }).then(
        ({data:response}) => {
          // 请求成功后
          this.tableData = response.list.map(item => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          console.log('输出tableData',this.tableData);
          this.config.total = response.count
          this.config.loading = false
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
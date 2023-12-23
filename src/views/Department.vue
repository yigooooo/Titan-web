<template>
  <div>
    <el-form ref="form" :model="departmentSearch" label-width="80px">
    <div id="search">
      <el-form-item label="科室编码">
        <el-input v-model="departmentSearch.departmentCode" clearable></el-input>
      </el-form-item>

      <el-form-item label="科室名称" style="margin-left: 40px">
        <el-input v-model="departmentSearch.departmentName" clearable></el-input>
      </el-form-item>

      <el-form-item label="主管医生" style="margin-left: 40px">
        <el-input v-model="departmentSearch.manager" clearable></el-input>
      </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    </el-form>

    <div style="float: right;margin-right: 20px;">
      <el-button @click="searchPage">
        <el-icon style="vertical-align: middle">
          <Search />
        </el-icon>
        <span style="vertical-align: middle"> 查询 </span>
      </el-button>

      <el-button type="primary" @click="insertDialogVisible = true">
        <el-icon style="vertical-align: middle">
          <Plus />
        </el-icon>
        <span style="vertical-align: middle"> 新增 </span>
      </el-button>

    </div><br><br>

    <el-divider border-style="double" />
    <br>
    <br>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="科室ID" prop="id" />
      <el-table-column label="科室编码" prop="departmentCode" />
      <el-table-column label="科室名称" prop="departmentName" />
      <el-table-column label="主管医生" prop="manager" />
      <el-table-column label="创建时间" prop="insertTime" />
      <el-table-column align="right" label="操作" width="300px">
        <template #default="scope">

          <el-button  @click="handleEdit(scope.$index, scope.row)">
            <el-icon style="vertical-align: middle">
              <Edit />
            </el-icon>
            <span style="vertical-align: middle"> 编辑 </span>
          </el-button>

          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
            <el-icon style="vertical-align: middle">
              <Delete />
            </el-icon>
            <span style="vertical-align: middle"> 删除 </span>
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <br><br>
    <el-divider border-style="double"/>
    <div class="pagination">
      <el-pagination
          v-model:current-page="page"
          v-model:page-size="size"
          :page-sizes="[10, 20, 50, 100]"
          :small="false"
          :disabled="false"
          :background="false"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>

    <!--    新增科室對話框-->
    <el-dialog
        title="新增科室"
        v-model="insertDialogVisible"
        width="30%">
      <h2>科室编码</h2>
      <el-input v-model="departmentInsert.departmentCode" placeHolder="请输入科室编码" clearable></el-input><br><br>
      <h2>科室</h2>
      <el-input v-model="departmentInsert.departmentName" placeHolder="请输入科室名" clearable></el-input><br><br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>

    <!--    编辑科室對話框-->
    <el-dialog
        title="编辑科室"
        v-model="updateDialogVisible"
        width="30%">
      <h2>科室编码</h2>
      <el-input v-model="departmentUpdate.departmentCode" placeHolder="请输入科室编码" clearable></el-input><br><br>
      <h2>科室名</h2>
      <el-input v-model="departmentUpdate.departmentName" placeHolder="请输入科室名" clearable disabled></el-input><br><br>

      <h2>负责医生</h2>
      <el-select v-model="departmentUpdate.manager" placeholder="请选择医生" clearable>
        <el-option
            v-for="item in doctors"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>

    <el-divider border-style="double" />
  </div>
</template>

<script lang="ts" name="Department" setup>
import {ElNotification} from 'element-plus'
import { reactive, ref, onMounted} from "vue"
import { ElLoading } from 'element-plus'
import type {searchDepartment, pageDoctor, department, removeDepartment, insertDepartment, editDepartment, optionDepartment} from '@/types'
import useDepartment from "@/hooks/useDepartment";

const {getDepartment, counts, deleteDepartment, addDepartment, getDoctorList, updateDepartment} = useDepartment();

//初始化可是状态信息
let updateDialogVisible = ref(false);
let insertDialogVisible = ref(false);
//初始化信息
let count = ref();
//表格信息
let tableData: department[] = reactive([])
//医生下拉框资源初始化
let doctors: string[] = reactive([]);

//初始化表格数据begin
let page:pageDoctor = reactive({
  page:1,
  size:10
})
onMounted(()=>{
  getDepartment(page).then(res=>{
    const loading = ElLoading.service();
    let list:department = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    });
    counts().then(res=>{
      count.value = res.body;
    })
    loading.close();
  })
})
//初始化表格数据end

//基本查询信息对象
let departmentSearch: searchDepartment = reactive({
  page:1,
  size:10,
  departmentCode: "",
  departmentName: "",
  manager: ""
})
//分页查询begin
const searchPage = () =>{
  getDepartment(departmentSearch).then(res=>{
    const loading = ElLoading.service();
    let list:department = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    });
    loading.close();
  })
}
const handleSizeChange = (val: number)=>{
  departmentSearch.size = val;
  const loading = ElLoading.service();
  getDepartment(departmentSearch).then(res=>{
    const list: department = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    })
  })
  loading.close();
}

const handleCurrentChange = (val: number)=>{
  departmentSearch.page = val;
  const loading = ElLoading.service();
  getDepartment(departmentSearch).then(res=>{
    const list: department = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    })
  })
  loading.close();
}
//分页查询end

//新增科室信息begin
let departmentInsert: insertDepartment = reactive({
  departmentCode: '',
  departmentName: '',
})
const add = ()=>{
  addDepartment(departmentInsert).then(res=>{
    if (res.body == true) {
      ElNotification({
        title:'成功',
        message:'新增成功',
        type:'success'
      })
      insertDialogVisible.value = false;
      Object.keys(departmentInsert).forEach(key => (departmentInsert[key] = ''));
      searchPage();
        counts().then(res=>{
        count.value = res.body;
      })
      return;
    }
    ElNotification({
      title:'失败',
      message:'新增失败',
      type:'error '
    })
  })
}
//新增科室信息end

//编辑科室信息begin
let departmentUpdate :editDepartment = reactive({
  id:'',
  departmentCode: '',
  departmentName: '',
  manager: ''
})
const handleEdit = (index, row)=>{
  updateDialogVisible.value = true;
  departmentUpdate.id = row.id;
  departmentUpdate.departmentCode = row.departmentCode;
  departmentUpdate.departmentName = row.departmentName;
  departmentUpdate.manager = row.manager;
  //根据部员们获取医生下拉框资源
  let option: optionDepartment = reactive({
    departmentName:'',
  })
  option.departmentName = row.departmentName;
  getDoctorList(option).then(res=>{
    doctors = res.body
  })
}
const update = ()=>{
  updateDepartment(departmentUpdate).then(res=>{
    if (res.body == true) {
      ElNotification({
        title:'成功',
        message:'编辑成功',
        type:'success'
      })
      updateDialogVisible.value = false;
      Object.keys(departmentUpdate).forEach(key => (departmentUpdate[key] = ''));
      searchPage();
      return;
    }
    ElNotification({
      title:'失败',
      message:'编辑失败',
      type:'error'
    })
  })
}
//编辑可视end

//删除科室信息begin
const handleDelete = (index, row)=>{
  let departmentRemove:removeDepartment = {
    id: row.id
  }
  deleteDepartment(departmentRemove).then(res=>{
    if (res.body == true) {
      ElNotification({
        title:'成功',
        message:'删除成功',
        type:'success'
      })
      searchPage();
      counts().then(res=>{
        count.value = res.body;
      })
      return;
    }
    ElNotification({
      title:'失败',
      message:'删除失败',
      type:'success'
    })
  })
}
//删除科室信息end


</script>

<style scoped>
#search{
  height: 50px;
  display: flex;
  flex-direction: row;
}
#table{
  height: 700px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
#page{
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.pagination{
   margin-left: 32%;
 }
</style>

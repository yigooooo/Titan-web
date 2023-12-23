<template>
  <div>
    <el-form ref="form" :model="searchWard" label-width="80px">
      <div id="search">
        <el-form-item label="科室">
          <el-input v-model="searchWard.departmentName" clearable></el-input>
        </el-form-item>

        <el-form-item label="主管医生" style="margin-left: 40px">
          <el-input v-model="searchWard.manager" clearable></el-input>
        </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;
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
      <el-table-column label="病房编码" prop="wardCode" />
      <el-table-column label="所属科室" prop="department" />
      <el-table-column label="主管医生" prop="manager" />
      <el-table-column label="主管医生联系电话" prop="phoneNumber" />
      <el-table-column label="病房地址" prop="address" />
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
        title="新增病房"
        v-model="insertDialogVisible"
        width="30%">
      <h2>病房编码</h2>
      <el-input v-model="insertWard.wardCode" placeHolder="请输入病房编码" clearable></el-input><br><br>

      <h2>科室</h2>
      <el-select v-model="insertWard.department" placeholder="请选择科室" @change="getDoctors" clearable>
        <el-option
            v-for="item in departments"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>

      <h2>负责医生</h2>
      <el-select v-model="insertWard.manager" placeholder="请选择医生" clearable>
        <el-option
            v-for="item in doctors"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>

      <h2>病房地址</h2>
      <el-input v-model="insertWard.address" placeHolder="请输入病房地址" clearable></el-input><br><br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>

    <!--    编辑科室對話框-->
    <el-dialog
        title="编辑病房"
        v-model="updateDialogVisible"
        width="30%">
      <h2>病房ID</h2>
      <el-input v-model="updateWard.id" placeHolder="请输入病房编码" clearable disabled></el-input><br><br>

      <h2>病房编码</h2>
      <el-input v-model="updateWard.wardCode" placeHolder="请输入病房编码" clearable disabled></el-input><br><br>

      <h2>科室</h2>
      <el-select v-model="updateWard.department" placeholder="请选择科室" @change="getDoctor" clearable>
        <el-option
            v-for="item in departments"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>

      <h2>负责医生</h2>
      <el-select v-model="updateWard.manager" placeholder="请选择医生" clearable>
        <el-option
            v-for="item in doctors"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>

      <h2>病房地址</h2>
      <el-input v-model="updateWard.address" placeHolder="请输入病房地址" clearable></el-input><br><br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>

    <el-divider border-style="double" />

  </div>
</template>

<script name="Ward" lang="ts" setup>
import {ElNotification} from 'element-plus'
import { reactive, ref, onMounted} from "vue"
import { ElLoading } from 'element-plus'
import type {wardSearch, pageDoctor, ward, wardInsert, option} from '@/types'
import useWard from "@/hooks/useWard";
import useDoctor from "@/hooks/useDoctor";

const {pages, insert, getDoctorList, wardCount, deleteWard, updateById} = useWard();
const {getDepartments} = useDoctor();
//可视数据
let insertDialogVisible = ref(false);
let updateDialogVisible = ref(false);

let count = ref();
//初始化表格数据begin
let page:pageDoctor = reactive({
  page:1,
  size:10
})
let tableData: ward[] = reactive([]);
let departments: string[] = reactive([]);
let doctors: string[] = reactive([]);
//初始化数据
onMounted(()=>{
  pages(page).then(res=>{
    const loading = ElLoading.service();
    let list:ward = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    });
    getDepartments().then(res=>{
      let list = res.body;
      list.forEach(item=>{
        departments.push(item);
      })
    })
    wardCount().then(res=>{
      count.value = res.body;
    })
    loading.close();
  })
})
//分页条件查询begin
//查询信息封装
let searchWard: wardSearch = reactive({
  page:1,
  size:10,
  department: "",
  manager: ""
})
const searchPage = ()=>{
  pages(searchWard).then(res=>{
    const loading = ElLoading.service();
    tableData.length = 0;
    let list = res.body.records;
    list.forEach(item=>{
      tableData.push(item);
    })
    loading.close();
  })
}
const handleSizeChange = (val: number)=>{
  searchWard.size = val;
  const loading = ElLoading.service();
  tableData.length = 0;
  pages(searchWard).then(res=>{
    const list: ward = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    })
  })
  loading.close();
}
const handleCurrentChange = (val: number)=>{
  searchWard.page = val;
  const loading = ElLoading.service();
  pages(searchWard).then(res=>{
    const list: ward = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    })
  })
  loading.close();
}
//分页条件查询end

//新增病房begin
//新增病房信息
let insertWard: wardInsert = reactive({
  wardCode: '',
  department: '',
  manager: '',
  address: '',
})
//获取医生信息列表
const getDoctors = ()=>{
  let data: option = reactive({
    departmentName: insertWard.department,
  })
  getDoctorList(data).then(res=>{
    let list = res.body;
    doctors.length = 0;
    list.forEach(item=>{
      doctors.push(item);
    })
  })
}
const add = ()=>{
  insertDialogVisible.value = true;
  insert(insertWard).then(res=>{
    if (res.body == true) {
      ElNotification({
        title:'成功',
        message:'新增成功',
        type:'success'
      })
      insertDialogVisible.value = false;
      Object.keys(insertWard).forEach(key => (insertWard[key] = ''));
      searchPage();
      wardCount().then(res=>{
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
//新增病房end

//编辑病房信息begin
//获取医生信息列表
let updateWard: ward = reactive({
  id:'',
  wardCode:'',
  department:'',
  manager:'',
  address:'',
})
const getDoctor = ()=>{
  updateWard.manager = '';
  let data: option = reactive({
    departmentName: updateWard.department,
  })
  getDoctorList(data).then(res=>{
    let list = res.body;
    doctors.length = 0;
    list.forEach(item=>{
      doctors.push(item);
    })
  })
}
const handleEdit = (index, row)=>{
  updateDialogVisible.value = true;
  updateWard.id = row.id;
  updateWard.department = row.department;
  updateWard.wardCode = row.wardCode;
  updateWard.manager = row.manager;
  updateWard.address = row.address;
}
const edit = ()=>{
  updateById(updateWard).then(res=>{
    if (res.body == true) {
      ElNotification({
        title:'成功',
        message:'编辑成功',
        type:'success'
      })
      updateDialogVisible.value = false;
      Object.keys(updateWard).forEach(key => (updateWard[key] = ''));
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
//编辑病房信息end

//逻辑删除病房begin
const handleDelete = (index, row)=>{
  let Ward:ward = {
    id: row.id
  }
  deleteWard(Ward).then(res=>{
    if (res.body == true) {
      ElNotification({
        title:'成功',
        message:'删除成功',
        type:'success'
      })
      searchPage();
      wardCount().then(res=>{
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
//逻辑删除病房end
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

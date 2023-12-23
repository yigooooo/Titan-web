<template>
  <div>
    <el-form ref="search" :model="form" label-width="80px">
      <div id="search">
        <el-form-item label="姓名">
          <el-input v-model="form.doctorName" clearable></el-input>
        </el-form-item>

        <el-form-item label="科室">
          <el-input v-model="form.department" clearable></el-input>
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
      <el-table-column label="编号" prop="id" />
      <el-table-column label="医生姓名" prop="doctorName" />
      <el-table-column label="医生性別" prop="doctorGender" />
      <el-table-column label="科室" prop="department" />
      <el-table-column label="入职时间" prop="insertTime" />
      <el-table-column align="right" label="操作" width="300px">
        <template #default="scope">

          <el-button  @click="handleEdit(scope.$index, scope.row)">
            <el-icon style="vertical-align: middle">
            <Edit />
            </el-icon>
            <span style="vertical-align: middle"> 编辑 </span>
          </el-button>

          <el-button type="info" @click="handleInfo(scope.$index, scope.row)">
            <el-icon style="vertical-align: middle">
            <UserFilled />
            </el-icon>
            <span style="vertical-align: middle"> 详情 </span>
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

    <!--    新增角色对话框-->
    <el-dialog
        title="新增醫生"
        v-model="insertDialogVisible"
        width="30%">
        <h2>姓名</h2>
        <el-input v-model="doctorInseret.doctorName" placeHolder="请输入姓名" clearable></el-input><br><br>
        <h2>性別</h2>
      <el-radio v-model="doctorInseret.doctorGender" label="男" border>男</el-radio>
      <el-radio v-model="doctorInseret.doctorGender" label="女" border>女</el-radio><br><br>
      <h2>身份证号</h2>
      <el-input v-model="doctorInseret.idCard" placeHolder="请输入身份证号" clearable></el-input><br><br>
      <h2>联系电话</h2>
      <el-input v-model="doctorInseret.phoneNumber" placeHolder="请输入联系电话" clearable></el-input><br><br>
        <h2>科室</h2>
      <el-select v-model="doctorInseret.department" placeholder="请选择科室" clearable>
        <el-option
            v-for="item in departments"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>

      <span class="dialog-footer">
        <el-button @click="insertDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insert()">确 定</el-button>
      </span>
    </el-dialog>


    <!--    編輯角色對話框-->
    <el-dialog
        title="编辑医生"
        v-model="editDialogVisible"
        width="30%">
      <h2>医生ID</h2>
      <el-input v-model="doctorEdit.id" disabled></el-input><br><br>
      <h2>用户名</h2>
      <el-input v-model="doctorEdit.doctorId" disabled clearable></el-input><br><br>
      <h2>姓名</h2>
      <el-input v-model="doctorEdit.doctorName" placeHolder="请输入姓名" clearable></el-input><br><br>
      <h2>科室</h2>
      <el-select v-model="doctorEdit.department" placeholder="请选择科室" clearable>
        <el-option
            v-for="item in departments"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>

      <span class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateDoctorInfo">确 定</el-button>
  </span>
    </el-dialog>

    <!--    醫生詳情-->
    <el-dialog
        title="医生详情"
        v-model="infoVisible"
        width="70%">

      <el-descriptions  direction="vertical" :column="3" border
                        style="width: 1000px;font-size: 18px"
      >
        <el-descriptions-item label="编号">{{doctorInfo.id}}</el-descriptions-item>
        <el-descriptions-item label="ID">{{doctorInfo.doctorId}}</el-descriptions-item>
        <el-descriptions-item label="性別" :span="20">{{doctorInfo.doctorGender}}</el-descriptions-item>

        <el-descriptions-item label="姓名">{{doctorInfo.doctorName}}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{doctorInfo.idCard}}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{doctorInfo.phoneNumber}}</el-descriptions-item>

        <el-descriptions-item label="科室">{{doctorInfo.department}}</el-descriptions-item>
        <el-descriptions-item label="入职时间">{{doctorInfo.insertTime}}</el-descriptions-item>
        <el-descriptions-item label="最近更新时间">{{doctorInfo.updateTime}}</el-descriptions-item>
      </el-descriptions>
      <br>
      <span class="dialog-footer">
        <el-button @click="infoVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Doctor">
import {ElNotification} from 'element-plus'
import { reactive, ref, onMounted} from "vue"
import { ElLoading } from 'element-plus'
import useDoctor from '@/hooks/useDoctor'
import type { 
  searchDoctor, 
  pageDoctor, 
  doctor, 
  deleteDoctor, 
  insertDoctor,
  editDoctor,
  infoDoctor
} from '@/types';
const {getPage, init, removeDoctor, addDoctor, getDepartments, updateDoctor, getCount} = useDoctor();
//可视状态数据
let infoVisible = ref(false)
let insertDialogVisible = ref(false);
let editDialogVisible = ref(false);
//table表数据
let tableData: doctor[] = reactive([]);
//部门集合数据
let departments: string[] = reactive([]);
//分页数据
let page = ref();
let size = ref();
let count = ref();

// 钩子函数
onMounted(()=>{
  //初始化表格数据
  let page: pageDoctor = {
    page:1,
    size:10
  }
  //初始化tableData信息
  init(page).then(res=>{
    const loading = ElLoading.service();
    tableData.length = 0;
    const list:doctor = res.body.records;
    list.forEach(item => {
      tableData.push(item);
    });
    getCount().then(res=>{
      count.value = res.body;
    })
    loading.close();
  });

  //获取部门资源下拉框begin
  getDepartments().then(res=>{
    let list: string[] = res.body;
    list.forEach(item=>{
      departments.push(item);
    })
  })
})
//end

//分页条件查询begin
let form:searchDoctor = reactive({
  page:1,
  size:10,
  doctorName:'',
  department:''
})
function searchPage() {
  const loading = ElLoading.service();
  getPage(form).then(res=>{
    const list: doctor = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    })
  })
  loading.close();
}
const handleSizeChange = (val: number) => {
    form.size = val;
    const loading = ElLoading.service();
    getPage(form).then(res=>{
    const list: doctor = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
    tableData.push(item);
  })
  })
  loading.close();
  }
const handleCurrentChange = (val: number) => {
  form.page = val;
  const loading = ElLoading.service();
  getPage(form).then(res=>{
    const list: doctor = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
    tableData.push(item);
  })
  })
  loading.close();
}
//分页条件查询end

//逻辑删除医生信息begin
let doctorDelete: deleteDoctor = {
    id:'',
}
const handleDelete = (index: number, row: doctor) => {
  doctorDelete.id = row.id;
    removeDoctor(doctorDelete).then(res=>{
      if(res.body == true) {
        ElNotification({
          title:'成功',
          message:'删除成功',
          type:'success'
        })
        searchPage();
        getCount().then(res=>{
        count.value = res.body;
      })
        return;
      }
      ElNotification({
          title:'失败',
          message:'删除失败',
          type:'error'
        })
        return;
    })
}
//逻辑删除医生信息end

//新增医生begin
let doctorInseret:insertDoctor = reactive({
    doctorName: "",
    doctorGender: "",
    idCard: "",
    phoneNumber: "",
    department: ""
})
function insert() {
  addDoctor(doctorInseret).then(res=>{
    if(res.body == true) {
      ElNotification({
          title:'成功',
          message:'新增成功',
          type:'success'
        })
        insertDialogVisible.value = false;
        searchPage();
        getCount().then(res=>{
        count.value = res.body;
      })
        Object.keys(doctorInseret).forEach(key => (doctorInseret[key] = ''));
        return;
    }
    ElNotification({
          title:'失败',
          message:'新增失败',
          type:'error'
        })
  })
}
//新增医生end

//编辑医生信息begin
let doctorEdit: editDoctor = reactive({
    id: "",
    doctorId: "",
    department: "",
    doctorName:''
  })
const handleEdit = (index: number, row: doctor) => {
    editDialogVisible.value = true;
    doctorEdit = row;
}
function updateDoctorInfo () {
  updateDoctor(doctorEdit).then(res=>{
    if(res.body == true) {
      editDialogVisible.value = false;
      ElNotification({
          title:'成功',
          message:'修改成功',
          type:'success'
        })
        searchPage();
        Object.keys(doctorEdit).forEach(key => (doctorEdit[key] = ''));
        return;
    }
    ElNotification({
          title:'失败',
          message:'修改失败',
          type:'error'
        })
        return;
  })
}
//编辑医生信息end

//获取医生详情begin
let doctorInfo :infoDoctor = reactive({

})
const handleInfo = (index: number, row: doctor) => {
  infoVisible.value = true;
  doctorInfo.id = row.id;
  doctorInfo.doctorId = row.doctorId;
  doctorInfo.doctorName = row.doctorName;
  doctorInfo.doctorGender = row.doctorGender;
  doctorInfo.department = row.department;
  doctorInfo.idCard = row.idCard;
  doctorInfo.phoneNumber = row.phoneNumber;
  doctorInfo.insertTime = row.insertTime;
  doctorInfo.updateTime = row.updateTime;
}
//获取医生详情end
</script>

<style scoped>
#search {
  height: 50px;
  display: flex;
  flex-direction: row;
}
.pagination{
  margin-left: 32%;
}
</style>

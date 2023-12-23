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
      <el-table-column label="护士姓名" prop="nurseName" />
      <el-table-column label="护士性別" prop="nurseGender" />
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

    <!--    新增角色對話框-->
    <el-dialog
        title="新增护士"
        v-model="insertDialogVisible"
        width="30%">
        <h2>姓名</h2>
        <el-input v-model="insertNurse.nurseName" placeHolder="请输入姓名" clearable></el-input><br><br>
        <h2>性別</h2>
      <el-radio v-model="insertNurse.nurseGender" label="男" border>男</el-radio>
      <el-radio v-model="insertNurse.nurseGender" label="女" border>女</el-radio><br><br>
      <h2>身份证号</h2>
      <el-input v-model="insertNurse.idCard" placeHolder="请输入身份证号" clearable></el-input><br><br>
      <h2>联系电话</h2>
      <el-input v-model="insertNurse.phoneNumber" placeHolder="请输入联系电话" clearable></el-input><br><br>
        <h2>科室</h2>
      <el-select v-model="insertNurse.department" placeholder="请选择科室" clearable>
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
        title="編輯护士"
        v-model="editDialogVisible"
        width="30%">
      <h2>护士ID</h2>
      <el-input v-model="nurseEdit.id" disabled></el-input><br><br>
      <h2>用户名</h2>
      <el-input v-model="nurseEdit.nurseId" disabled clearable></el-input><br><br>
      <h2>姓名</h2>
      <el-input v-model="nurseEdit.nurseName" placeHolder="请输入姓名" clearable></el-input><br><br>
      <h2>科室</h2>
      <el-select v-model="nurseEdit.department" placeholder="请选择科室" clearable>
        <el-option
            v-for="item in departments"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>

      <span class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateNurseInfo">确 定</el-button>
  </span>
    </el-dialog>

     <!--    护士詳情-->
     <el-dialog
        title="护士详情"
        v-model="infoVisible"
        width="70%">

      <el-descriptions  direction="vertical" :column="3" border
                        style="width: 1000px;font-size: 18px"
      >
        <el-descriptions-item label="编号">{{nurseInfo.id}}</el-descriptions-item>
        <el-descriptions-item label="ID">{{nurseInfo.nurseId}}</el-descriptions-item>
        <el-descriptions-item label="性別" :span="20">{{nurseInfo.nurseGender}}</el-descriptions-item>

        <el-descriptions-item label="姓名">{{nurseInfo.nurseName}}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{nurseInfo.idCard}}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{nurseInfo.phoneNumber}}</el-descriptions-item>

        <el-descriptions-item label="科室">{{nurseInfo.department}}</el-descriptions-item>
        <el-descriptions-item label="入职时间">{{nurseInfo.insertTime}}</el-descriptions-item>
        <el-descriptions-item label="最近更新时间">{{nurseInfo.updateTime}}</el-descriptions-item>
      </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button @click="infoVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script setup lang="ts" name="Nurse">
import {ElNotification} from 'element-plus'
import { reactive, ref, onMounted} from "vue"
import { ElLoading } from 'element-plus'
import useNurse from '@/hooks/useNurse'
import useDoctor from '@/hooks/useDoctor'
import type {
    pageDoctor, 
    searchNurse,
    Nurse,
    nurseInseret,
    editNurse,
    infoNurse,
    deleteNurse
} from '@/types';
const {getPage, init, getNurseCount, addNurse, updateNurse, removeNurse} = useNurse();
const {getDepartments} = useDoctor()
//可视状态数据
let infoVisible = ref(false);
let insertDialogVisible = ref(false);
let editDialogVisible = ref(false);
//table数据
let tableData: Nurse[] = reactive([]);
//部门下拉列表资源
let departments: string[] = reactive([]);
//分页数据
let page = ref();
let size = ref();
let count = ref(10);


onMounted(()=>{
  //初始化表格数据
  let page: pageDoctor = {
      page:1,
      size:10
    }
    init(page).then(res=>{
    const loading = ElLoading.service();
    tableData.length = 0;
    const list:Nurse = res.body.records;
    list.forEach(item => {
      tableData.push(item);
    });
    getNurseCount().then(res=>{
      count.value = res.body;
    })
    //获取部门资源下拉框begin
  getDepartments().then(res=>{
    let list: string[] = res.body;
    list.forEach(item=>{
      departments.push(item);
    })
  })
    loading.close();
})
})
  
//分页条件查询begin
let form:searchNurse = reactive({
  page:1,
  size:10,
  NurseName:'',
  department:''
})
const searchPage = ()=>{
  const loading = ElLoading.service();
  getPage(form).then(res=>{
    const list: Nurse = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    })
  })
  loading.close();
}
const handleCurrentChange = (val: number)=>{
  form.page = val;
  const loading = ElLoading.service();
  getPage(form).then(res=>{
    const list: Nurse = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
    tableData.push(item);
  })
  })
  loading.close();
}
const handleSizeChange = (val: number)=>{
  form.size = val;
  const loading = ElLoading.service();
    getPage(form).then(res=>{
    const list: Nurse = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
    tableData.push(item);
  })
  })
  loading.close();
}
//分页条件查询end

//新增护士begin
let insertNurse: nurseInseret = reactive({
  nurseName:'',
  nurseGender: "",
  idCard: "",
  phoneNumber: "",
  department: ""
})
const insert = ()=>{
  addNurse(insertNurse).then(res=>{
    if(res.body == true) {
      ElNotification({
          title:'成功',
          message:'新增成功',
          type:'success'
        })
        insertDialogVisible.value = false;
        searchPage();
        Object.keys(insertNurse).forEach(key => (insertNurse[key] = ''));
        getNurseCount().then(res=>{
        count.value = res.body;
      })
        return;
    }
    ElNotification({
          title:'失败',
          message:'新增失败',
          type:'error'
        })
  })
}
//新增护士end

//编辑护士信息begin
let nurseEdit: editNurse = {
  id: "",
  nurseId: '',
  nurseName: '',
  department: ''
}
const handleEdit = (index, row)=>{
  editDialogVisible.value = true;
  nurseEdit = row;
}
const updateNurseInfo = ()=>{
  updateNurse(nurseEdit).then(res=>{
    if(res.body == true) {
      editDialogVisible.value = false;
      ElNotification({
          title:'成功',
          message:'修改成功',
          type:'success'
        })
        searchPage();
        Object.keys(nurseEdit).forEach(key => (nurseEdit[key] = ''));
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
//编辑护士信息end

//护士详情begin
let nurseInfo: infoNurse = reactive({
    id: "",
    nurseId: "",
    nurseName: "",
    nurseGender: "",
    department: "",
    idCard: "",
    phoneNumber: "",
    insertTime: Date,
    updateTime: Date,
})
const handleInfo = (index, row)=>{
  infoVisible.value = true;
  nurseInfo.id = row.id;
  nurseInfo.nurseId = row.nurseId;
  nurseInfo.nurseName = row.nurseName;
  nurseInfo.nurseGender = row.nurseGender;
  nurseInfo.department = row.department;
  nurseInfo.idCard = row.idCard;
  nurseInfo.phoneNumber = row.phoneNumber;
  nurseInfo.insertTime = row.insertTime;
  nurseInfo.updateTime = row.updateTime;
}
//护士详情end

//逻辑删除护士begin
let nurseDelete:deleteNurse = reactive({
  id:''
})
const handleDelete = (index, row)=>{
  nurseDelete.id = row.id;
  removeNurse(nurseDelete).then(res=>{
    if(res.body == true) {
        ElNotification({
          title:'成功',
          message:'删除成功',
          type:'success'
        })
        searchPage();
        getNurseCount().then(res=>{
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
//逻辑删除护士end
</script>

<style>
#search {
  height: 50px;
  display: flex;
  flex-direction: row;
}
.pagination{
  margin-left: 32%;
}
</style>
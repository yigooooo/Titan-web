<template>
  <div>
    <el-form ref="form" :model="search" label-width="80px">
      <div id="search">
        <el-form-item label="科室">
          <el-input v-model="search.department" clearable></el-input>
        </el-form-item>

        <el-form-item label="主管护士" style="margin-left: 40px">
          <el-input v-model="search.managerNurse" clearable></el-input>
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
    </div>

    <br><br>

  <el-divider border-style="double" />
  <br>
  <br>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="床位编码" prop="bedCode" />
      <el-table-column label="所属科室" prop="department" />
      <el-table-column label="主管护士" prop="managerNurse" />
      <el-table-column label="主管护士联系电话" prop="phoneNumber" />
      <el-table-column label="床位地址" prop="address" />
      <el-table-column label="创建时间" prop="insertTime" />
      <el-table-column align="right" label="操作" width="300px">
        <template #default="scope">

<!--          <el-button  @click="handleEdit(scope.$index, scope.row)">-->
<!--            <el-icon style="vertical-align: middle">-->
<!--              <Edit />-->
<!--            </el-icon>-->
<!--            <span style="vertical-align: middle"> 编辑 </span>-->
<!--          </el-button>-->

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
    <el-divider border-style="double" />




    <!--    新增病床對話框-->
    <el-dialog
        title="新增病床"
        v-model="insertDialogVisible"
        width="30%">
      <h2>病房编码</h2>
      <el-input v-model="insertForm.bedCode" placeHolder="请输入病床编码" clearable></el-input><br><br>

      <h2>科室</h2>
      <el-select v-model="insertForm.department" placeholder="请选择科室" @change="getMap" clearable>
        <el-option
            v-for="item in departments"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>

      <h2>主管护士</h2>
      <el-select v-model="insertForm.managerNurse" placeholder="请选主管护士" clearable>
        <el-option
            v-for="item in nurses"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>


      <h2>床位地址</h2>
      <el-select v-model="insertForm.address" placeholder="请选择科室" clearable>
        <el-option
            v-for="item in bedAddress"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select><br><br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertBed">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script name="Bed" lang="ts" setup>
import {ElNotification} from 'element-plus'
import { ElLoading } from 'element-plus'
import {onMounted, ref, reactive} from "vue";
import type {bed, pageDoctor} from "@/types"
import useBed from "@/hooks/useBed";
import useDoctor from "@/hooks/useDoctor";
const {getDepartments} = useDoctor();
const {page, getCount, getNurseAndAddress, add, deleted} = useBed();

//tableDate数据
let tableData: bed[] = reactive([]);
let count = ref(0);
//可视状态
let insertDialogVisible = ref(false);

let departments: string[] = reactive([]);
let nurses: string[] = reactive([]);
let bedAddress: string[] = reactive([])

let pages: pageDoctor = {
  page:1,
  size:10
}
onMounted(()=>{
  const loading = ElLoading.service();
  page(pages).then(res=>{
    let list = res.body.records;
    list.forEach(item=>{
      tableData.push(item);
    })
  });
  getCount().then(res=>{
    count.value = res.body;
  });
  getDepartments().then(res=>{
    let list = res.body;
    list.forEach(item=>{
      departments.push(item);
    })
  })
  loading.close();
})


let search: bed = reactive({
  page:1,
  size:10,
  department:'',
  managerNurse:''
})

const searchPage = ()=>{
  const loading = ElLoading.service();
  page(search).then(res=>{
    tableData.length = 0;
    let list = res.body.records;
    list.forEach(item=>{
      tableData.push(item);
    })
  })
  loading.close();
}
const handleSizeChange = (val: number)=>{
  search.size = val;
  const loading = ElLoading.service();
  tableData.length = 0;
  page(search).then(res=>{
    const list: bed = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    })
  })
  loading.close();
}
const handleCurrentChange = (val: number)=>{
  search.page = val;
  const loading = ElLoading.service();
  page(search).then(res=>{
    const list: bed = res.body.records;
    tableData.length = 0;
    list.forEach(item => {
      tableData.push(item);
    })
  })
  loading.close();
}
//新增病床begin
let insertForm: bed = reactive({
  bedCode: '',
  department: '',
  managerNurse: '',
  address: '',
})
let data: bed = reactive({
  department: insertForm.department
})
const getMap = ()=>{
  nurses.length = 0;
  bedAddress.length = 0;
  getNurseAndAddress({
    department: insertForm.department
  }).then(res=>{
    const nurseList: string[] = res.body['nurse'];
    nurseList.forEach(item=>{
      nurses.push(item)
    })
    const addressList: string[] = res.body['address'];
    addressList.forEach(item=>{
      bedAddress.push(item)
    })
  })
}
const insertBed = ()=>{
  add(insertForm).then(res=>{
    if (res.body == true) {
      ElNotification({
        title:'成功',
        message:'新增成功',
        type:'success'
      })
      insertDialogVisible.value = false;
      Object.keys(insertForm).forEach(key => (insertForm[key] = ''));
      searchPage();
      getCount().then(res=>{
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
//新增病床end

//逻辑删除病床begin
const handleDelete = (index, row)=>{
  deleted({
    id:row.id
  }).then(res=>{
    if (res.body == true) {
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
      type:'success'
    })
  })
}
//逻辑删除病床end
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

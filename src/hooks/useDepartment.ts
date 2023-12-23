import request from '@/utils/request'
import type {searchDepartment,optionDepartment,editDepartment,insertDepartment,removeDepartment,department} from '../types'

export default function() {

    //查詢科室信息
    async function getDepartment(data: searchDepartment) {
        return request({
            url: 'http://localhost:9000/api/department/page',
            method: 'POST',
            data: data
        })
    }

    //查詢科室信息總數
    async function counts(){
        return request({
            url:'http://localhost:9000/api/department/count',
            method:'GET'
        })
    }

    //邏輯刪除部門信息
    async function deleteDepartment(data: removeDepartment){
        return request({
            url:'http://localhost:9000/api/department/delete',
            methodL:'GET',
            params:data
        })
    }

    //新增科室信息
    async function addDepartment(data: insertDepartment){
        return request({
            url:'http://localhost:9000/api/department/insert',
            method:'POST',
            data:data
        })
    }

    //根据部门获取医生列表
    async function getDoctorList(data: optionDepartment) {
        return request({
            url:'http://localhost:9000/api/doctorInfo/list',
            method:'GET',
            params:data
        })
    }

    //修改科室信息
    async function updateDepartment(data){
        return request({
            url:'http://localhost:9000/api/department/update',
            method:'POST',
            data:data
        })
    }



    return {getDepartment, counts, deleteDepartment, addDepartment, getDoctorList, updateDepartment};
}

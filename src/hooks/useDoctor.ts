import request from '@/utils/request'
import type {searchDoctor, pageDoctor, deleteDoctor, insertDoctor, editDoctor} from '../types'
export default function() {
    
    //初始化doctor表数据
    async function init(data: pageDoctor) {
        return request({
            url:'http://localhost:9000/api/doctorInfo/page',
            method:'POST',
            data:data,
        })
    }


    //分頁查詢醫生
    async function getPage(data: searchDoctor){
        return request({
            url:'http://localhost:9000/api/doctorInfo/page',
            method:'POST',
            data:data,
        })
    }

    //逻辑删除医生
    async function removeDoctor(data: deleteDoctor) {
        return request({
            url:'http://localhost:9000/api/doctorInfo/remove',
            method:'Get',
            params:data
        })
    }

    //新增医生
    async function addDoctor(data: insertDoctor) {
        return request({
            url:'http://localhost:9000/api/doctorInfo/add',
            method:'POST',
            data:data
        })
    }

    //获取部门下拉框资源
    async function getDepartments() {
        return request({
            url:'http://localhost:9000/api/department/names',
            method:'GET',
        })
    }

    //编辑医生信息
    async function updateDoctor(data: editDoctor){
        return request({
            url:'http://localhost:9000/api/doctorInfo/update',
            method:'POST',
            data:data
        })
    }

    //医生信息总数
    async function getCount(){
        return request({
            url:'http://localhost:9000/api/doctorInfo/count',
            method:'GET',
        })
    }

    return{getPage, init, removeDoctor, addDoctor, getDepartments, updateDoctor, getCount}
}
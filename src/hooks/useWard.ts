import request from '@/utils/request'
import type {wardInsert,wardSearch, ward} from '../types'
export default function () {

    //根据部门获取医生列表
    async function getDoctorList(data) {
        return request({
            url:'http://localhost:9000/api/doctorInfo/list',
            method:'GET',
            params:data
        })
    }

    //插入病房信息
    async function insert(data: wardInsert) {
        return request({
            url:'http://localhost:9000/api/wardInfo/insert',
            method:'POST',
            data:data
        })
    }
    //条件分页查询病房信息
    async function pages(data: wardSearch) {
        return request({
            url:'http://localhost:9000/api/wardInfo/page',
            method:'POST',
            data:data
        })
    }

    //查询病房信息总数
    async function wardCount() {
        return request({
            url:'http://localhost:9000/api/wardInfo/count',
            method:'GET'
        })
    }

    //逻辑删除病房信息
    async function deleteWard(data){
        return request({
            url:'http://localhost:9000/api/wardInfo/delete',
            method:'GET',
            params:data
        })
    }

    //修改病房信息
    async function updateById(data: ward){
        return request({
            url:'http://localhost:9000/api/wardInfo/update',
            method:'POST',
            data:data
        })
    }


    return {pages, insert, getDoctorList, wardCount, deleteWard, updateById};
}

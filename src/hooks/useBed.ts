import request from '@/utils/request'
import type {bed} from '../types'

export default function() {
    //根据部门获取护士信息和地址列表map
    async function getNurseAndAddress(data: bed) {
        return request({
            url:'http://localhost:9000/api/bedInfo/map',
            method:'GET',
            params:data
        })
    }
    //新增病床信息
    async function add(data) {
        return request({
            url:'http://localhost:9000/api/bedInfo/insert',
            method:'POST',
            data:data
        })
    }
    //分页条件查询病床信息
    async function page(data: bed) {
        return request({
            url:'http://localhost:9000/api/bedInfo/page',
            method:'POST',
            data:data
        })
    }

    //获取病床信息总数
    async function getCount() {
        return request({
            url:'http://localhost:9000/api/bedInfo/count',
            method:'GET'
        })
    }

    //逻辑删除病房信息
    async function deleted(data: bed) {
        return request({
            url:'http://localhost:9000/api/bedInfo/deleted',
            method:'GET',
            params:data
        })
    }

    return {page, getCount, getNurseAndAddress, add, deleted};
}

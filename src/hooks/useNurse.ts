import request from '@/utils/request'
import type { searchNurse, pageDoctor, nurseInseret, editNurse, deleteNurse} from '@/types';

export default function() {

    //分頁查詢护士
    async function getPage(data: searchNurse){
        return request({
            url:'http://localhost:9000/api/nurse/page',
            method:'POST',
            data:data,
        })
    }

    //表格数据初始化
    async function init(data: pageDoctor){
        return request({
            url:'http://localhost:9000/api/nurse/page',
            method:'POST',
            data:data,
        })
    }

    //获取护士总数
    async function getNurseCount(){
        return request({
            url:'http://localhost:9000/api/nurse/count',
            method:'GET',
        })
    }

    //新增护士
    async function addNurse(data: nurseInseret){
        return request({
            url:'http://localhost:9000/api/nurse/insert',
            method:'POST',
            data:data
        })
    }

    //修改护士信息
    async function updateNurse(data: editNurse){
        return request({
            url:'http://localhost:9000/api/nurse/update',
            method:'POST',
            data:data
        })
    }

    //邏輯刪除护士
    async function removeNurse(data: deleteNurse){
    return request({
        url:'http://localhost:9000/api/nurse/delete',
        method:'Get',
        params:data
    })
}


    return {getPage, init, getNurseCount, addNurse, updateNurse, removeNurse};
}
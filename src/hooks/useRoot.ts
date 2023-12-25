import request from '@/utils/request'
import type {} from '@/types'

export default function() {
    //獲取管理員admin信息
    async function info(){
        return request({
            url:'http://localhost:9000/api/rootInfo/info',
            method:'GET'
        })
    }

    //修改或新增admin信息
    async function update(data){
        return request({
            url:'http://localhost:9000/api/rootInfo/update',
            method:"POST",
            data:data
        })
    }

    //修改admin密码
    async function updatePwd(data){
        return request({
            url:'http://localhost:9000/api/rootInfo/password',
            method:'POST',
            data:data
        })
    }
    return {info, update, updatePwd}
}

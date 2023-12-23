import request from '@/utils/request'
import type {User, Register, verifyPwd} from '../types'

export default function() {

    //登录接口
    async function login (data: User){
        return request({
            url:'http://localhost:9000/api/root/login',
            method:'POST',
            data:data
        })
    }

    //注册接口
    async function regist(data: Register) {
        return request({
            url:'http://localhost:9000/api/person/register',
            method:'POST',
            data:data
        })
    }

    //验证密码是否一致接口
    async function verifyCount(data: verifyPwd) {
        return request({
            url:'http://localhost:9000/api/person/verify',
            method:'POST',
            data:data
        })
    }

    return {login,regist,verifyCount}
}
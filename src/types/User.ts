//登錄用戶
export default interface User {
    id:string,
    password:string,
}
//注册用户
export default interface Register {
    id: string,
    password: string,
    oldPassword: string
}

//验证密码一致性角色
export default interface verifyPwd {
    password: string,
    oldPassword: string
}

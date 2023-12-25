//基本管理员
export default interface root{
    id: string,
    rootId: string,
    rootName: string,
    rootGender:string,
    idCard: string,
    phoneNumber: string,
    insertTime: Date,
    updateTime: Date,
}

//修改密码对象
export default interface pwd {
    id: string,
    oldPassword: string,
    password: string,
}

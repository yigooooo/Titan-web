//Doctor实体类封装
export default interface doctor {
    id: string,
    doctorId: string,
    doctorName: string,
    doctorGender: string,
    department: string,
    idCard: string,
    phoneNumber: string,
    sort: number,
    insertTime: Date,
    updateTime: Date,
    isDeleted: number
}

//doctor详情对象封装
export default interface infoDoctor {
    id: string,
    doctorId: string,
    doctorName: string,
    doctorGender: string,
    department: string,
    idCard: string,
    phoneNumber: string,
    insertTime: Date,
    updateTime: Date,
}


//page信息封装
export default interface pageDoctor {
    page:number,
    size:number,
}

//查询角色封装
export default interface searchDoctor {
    page:number,
    size:number,
    doctorName:string,
    department:string,
}

//删除医生封装
export default interface deleteDoctor {
    id: string
}

//新增医生角色信息封装
export default interface insertDoctor {
    doctorName: string,
    doctorGender: string,
    idCard: string,
    phoneNumber: string,
    department: string
}

//编辑对象角色信息封装
export default interface editDoctor {
    id: string,
    doctorName: string,
    doctorId: string,
    department: string
}
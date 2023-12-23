import { deflate } from "zlib";

//护士实体类
export default interface Nurse {
    id: string,
    nurseId: string,
    nurseName: string,
    nurseGender: string,
    department: string,
    idCard: string,
    phoneNumber: string,
    sort:number,
    insertTime:Date,
    updateTime:Date,
    isDeleted:number,
}

//分页查询实体类
export default interface searchNurse {
    page:number,
    size:number,
    NurseName:string,
    department:string,
}

//新增护士实体类
export default interface nurseInseret {
    nurseName: string,
    nurseGender: string,
    idCardL: string,
    phoneNumber: string,
    department: string
}

//修改护士实体类
export default interface editNurse {
    id: string,
    nurseId: string,
    nurseName: string,
    department: string
}

//nurse详情对象封装
export default interface infoNurse {
    id: string,
    nurseId: string,
    nurseName: string,
    nurseGender: string,
    department: string,
    idCard: string,
    phoneNumber: string,
    insertTime: Date,
    updateTime: Date,
}

//删除护士封装
export default interface deleteNurse {
    id: string
}



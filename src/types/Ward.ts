//查询信息封装
export default interface wardSearch{
    page:number,
    size:number,
    department: string,
    manager: string
}

//基本病房信息
export default interface ward{
    id:string,
    wardCode: string,
    phoneNumber: string,
    address: string,
    department: string,
    bedCount: number,
    sort: number,
    insertTime: Date,
    updateTime: Date,
    manager: string,
    isDeleted:number
}

//新增病房信息
export default interface wardInsert{
    wardCode: string,
    department: string,
    manager: string,
    address: string,
}

//医生下拉框资源
export default interface option{
    department: string,
}

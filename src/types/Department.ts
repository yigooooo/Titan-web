
//基本部门对象封装
export default interface department {
    id: string,
    departmentName: string,
    departmentCode: string,
    manager: string,
    sort: string,
    insertTime: Date,
    updateTime: Date,
    isDeleted: number,
}

//查询部门对象信息封装
export default interface searchDepartment {
    page:number,
    size:number,
    departmentCode: string,
    departmentName: string,
    manager: string
}

//删除科室信息对象
export default interface removeDepartment {
   id: string
}

//新增部门信息封装
export default interface insertDepartment {
    departmentCode: string,
    departmentName: string,
}

//编辑科室信息封装
export default interface editDepartment {
    id:string,
    departmentCode: string,
    departmentName: string,
    manager: string
}

//编辑科室信息医生下拉框资源信息封装
export default interface optionDepartment {
    departmentName: string,
}



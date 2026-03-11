export interface ResultData<T>{
    list: T[];
    page:{
        total:number |0 ;
        pageNum:number;
        pageSize:number;
    };
}

// 登录模块
export interface ILoginParams {
    userName: string;
    userPwd: string;
}

// 部门模块
export interface IDeptSearchParams {
    deptName?: string;
}

export interface IDept {
    _id: string;
    createTime: string;
    updateTime: string;
    deptName?: string;
    parentId: string;
    userName: string;
    children?: IDept[];
}

export interface IUserListParams {
    state: string;
}




//菜单模块

//创建菜单参数
export interface ICreateMenuParams {
    menuName: string;
    menuIcon?: string;
    menuPath: string;
    menuType: number;//1:菜单 2:按钮 3:页面
    menuCode: string;//菜单权限标识
    menuState: number;
    component: string;
    parentId: string;
}
export interface IUpdateMenuParams extends ICreateMenuParams {
    _id: string;
}

export interface IMenu extends ICreateMenuParams {
    _id: string;
    createTime: string;
    updateTime: string;
    buttons?: IMenu[];//如果是菜单类型，则包含按钮列表
    children?: IMenu[];//如果是菜单类型，则包含子菜单列表
}

//搜索条件
export interface ISearchParams {
    menuName?: string;
    menuState?: number;
}


export interface IPageParams {
    pageNum: number;
    pageSize: number;
}

//角色模块
export interface IRole {
    _id: string;
    roleName: string;
    remark: string;
    permissionList:{
        checkedKeys: string[];
        halfCheckedKeys: string[];
    };
    roleCode: string;
    roleDesc: string;
    createTime: string;
    updateTime: string;
}
export interface IRoleSearchParams extends IPageParams {
    roleName?: string;
}

export interface ICreateRoleParams {
    roleName: string;
    remark: string;
}
export interface IEditRoleParams extends ICreateRoleParams{
    _id:string
}
export interface IPermission{
    _id: string;
    permissionList:{
        checkedKeys: string[];
        halfCheckedKeys: string[];
    };
}


//用户模块

export interface IUserSearchParams extends IPageParams {
    userId?: number;
    userName?: string;
    state?:number;
}

export interface IUser {
    _id: string;
    userId: number;
    userName: string;
    userEmail: string;
    deptId: string;
    state: number;
    mobile: string;
    job: string;
    role: number;
    roleList: string;
    createId: number;
    deptName: string;
    userImg: string;
    userPwd?: string;
}
export interface ICreateUserParams {
    userName:string;
    userEmail: string;
    deptId: string;
    state?: number;
    mobile?: string;
    job?: string;
    roleList: string[];
    userImg: string;
}
export interface IUpdateUserParams extends ICreateUserParams {
    userId:string;
}
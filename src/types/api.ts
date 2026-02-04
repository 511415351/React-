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
    userPwd: string;
}
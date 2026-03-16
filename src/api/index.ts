import request from "../utils/reuquest";
import type { 
    ILoginParams, 
    IDeptSearchParams,
    IDept,  
    IUser, 
    ICreateMenuParams, 
    IMenu, 
    ISearchParams, 
    IUpdateMenuParams,
    IUpdateUserParams,
    ICreateUserParams,
    IUserSearchParams,
    ResultData,
    IReportData,
    ILineData,
    IRadarData,
    IPieData,
} from "../types/api";
export default {
    login(params: ILoginParams){
        return request.post('/users/login', params);
    },

    getDepList(params?: IDeptSearchParams){
        return request.get<IDept[]>('/dept/list', { params });
    },
    //添加部门
    createDept(data: IDept){
        return request.post('/dept/create', data);
    },
    //编辑部门
    updateDept(data: IDept){
        return request.post('/dept/edit', data);
    },
    //删除部门
    deleteDept(id: string){
        return request.post('/dept/delete', { id });
    },

    //用户模块
    //获取用户信息
    getUserList(params?: IUserSearchParams){
        return request.get<ResultData<IUser>>('/users/list', { params });
    },
    getAllUser(params?: IUser){
        return request.get<IUser[]>('/users/all/list', { params });
    },
    createUser(params:ICreateUserParams){
        return request.post<ICreateUserParams>('/users/create',{params});
    },
    editUser(params:IUpdateUserParams){
        return request.post<IUpdateUserParams>('/users/edit',{params});
    },
    delUser(params:unknown){
        return request.post('/users/delete',{params});
    },
    getUserInfo() {
        return request.get<IUser>('/users/getUserInfo');
    },
    //获取权限列表
    getPermissionList() {
        return request.get<{ menuList:IMenu[]; buttonList:string[] }>('/users/getPermissionList');
    },

    //菜单模块
    //菜单list
    getMenuList(params?: ISearchParams){
        return request.get<IMenu[]>('/menu/list',  params );
    },
    //添加菜单
    createMenu(data: ICreateMenuParams){
        return request.post('/menu/create', data);
    },
    //编辑菜单
    updateMenu(data: IUpdateMenuParams){
        return request.post('/menu/edit', data);
    },
    //删除菜单
    deleteMenu(id: string){
        return request.post('/menu/delete', { id });
    },

    getReportData() {
        return request.get<IReportData>('/order/dashboard/getReportData');
    },
    // 折线图
    getLineData() {
        return request.get<ILineData>('/order/dashboard/getLineData');
    },

    // 城市分布饼图
    getPieCityData() {
        return request.get<IPieData[]>('/order/dashboard/getPieCityData');
    },

    // 年龄分布饼图
    getPieAgeData() {
        return request.get<IPieData[]>('/order/dashboard/getPieAgeData');
    },

    // 雷达图
    getRadarData() {
        return request.get<IRadarData>('/order/dashboard/getRadarData');
    }
};
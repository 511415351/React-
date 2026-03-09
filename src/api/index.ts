import request from "../utils/reuquest";
import type { ILoginParams, IDeptSearchParams,IDept, IUserListParams, IUser, ICreateMenuParams, IMenu, ISearchParams, IUpdateMenuParams } from "../types/api";
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
    //获取用户信息
    getUserList(params?: IUserListParams){
        return request.get('/users/list', { params });
    },
    getAllUser(params?: IUser){
        return request.get<IUser[]>('/users/all/list', { params });
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
};
import reuquest from "../utils/reuquest";
import type { ILoginParams, IDeptSearchParams,IDept, IUserListParams, IUser } from "../types/api";
export default {
    login(params: ILoginParams){
        return reuquest.post('/users/login', params);
    },

    getDepList(params?: IDeptSearchParams){
        return reuquest.get<IDept[]>('/dept/list', { params });
    },
    //添加部门
    createDept(data: IDept){
        return reuquest.post('/dept/create', data);
    },
    //编辑部门
    updateDept(data: IDept){
        return reuquest.post('/dept/edit', data);
    },
    //删除部门
    deleteDept(id: string){
        return reuquest.post('/dept/delete', { id });
    },
    //获取用户信息
    getUserList(params?: IUserListParams){
        return reuquest.get('/users/list', { params });
    },
    getAllUser(params?: IUser){
        return reuquest.get<IUser[]>('/users/all/list', { params });
    }
};
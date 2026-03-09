import request from "../utils/reuquest";
import type { IRole,ICreateRoleParams,IPermission,IEditRoleParams,IRoleSearchParams,ResultData } from "../types/api";
export default {
    getRoleList(params:IRoleSearchParams){
        return request.get<ResultData<IRole>>('/roles/list',params)
    },
    deleteRole(params:{_id:string}){
        return request.post('/roles/delete',params)
    },
    updataPermission(params:IPermission){
        return request.post('/roles/update/permission',params)
    },
    createRole(params:ICreateRoleParams){
        return request.post('/roles/create',params)
    },
    editRole(params:IEditRoleParams){
        return request.post('/roles/edit',params)
    },
}
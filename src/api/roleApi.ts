import reuquest from "../utils/reuquest";
import type { IRole,ICreateRoleParams,IPermission,IEditRoleParams,IRoleSearchParams,ResultData } from "../types/api";
export default {
    getRoleList(params:IRoleSearchParams){
        return reuquest.get<ResultData<IRole>>('/roles/list',params)
    },
    deleteRole(params:{_id:string}){
        return reuquest.post('/roles/delete',params)
    },
    updataPermission(params:IPermission){
        return reuquest.post('/roles/update/permission',params)
    },
    createRole(params:ICreateRoleParams){
        return reuquest.post('/roles/create',params)
    },
    editRole(params:IEditRoleParams){
        return reuquest.post('/roles/edit',params)
    },
}
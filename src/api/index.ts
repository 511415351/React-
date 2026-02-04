import reuquest from "../utils/reuquest";
import type { ILoginParams, IDeptSearchParams,IDept } from "../types/api";
export default {
    login(params: ILoginParams){
        return reuquest.post('/users/login', params);
    },

    getDepList(params?: IDeptSearchParams){
        return reuquest.get<IDept[]>('/dept/list', { params });
    }
};
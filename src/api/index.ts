import reuquest from "../utils/reuquest";
import type { ILoginParams } from "../types/api";
export default {
    login(params: ILoginParams){
        return reuquest.post('/users/login', params);
    }
};
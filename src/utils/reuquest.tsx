import axios from "axios";
import { message } from "antd";
const BASE_URL=import.meta.env.VITE_BASE_URL || "https://api.example.com";
const TIMEOUT=Number(import.meta.env.VITE_TIMEOUT) || 3000;
console.log('BASE_URL:',BASE_URL);
console.log('TIMEOUT:',TIMEOUT);

const api = import.meta.env.VITE_BASE_URL;
console.log('API:', api);
const instance = axios.create({
    baseURL: api,
    timeout: 3000,
    timeoutErrorMessage: "Request timed out",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: 'Bearer ' +localStorage.getItem("token") || "",
        'X-Requested-With': 'XMLHttpRequest',
    },
});


instance.interceptors.request.use(
    (config) => {
    // You can add headers or tokens here
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        const data=response.data;
        if (data.code === 40001){
            window.location.href='/login';
        }
        else if (data.code !== 200) {
            message.error(data.message || "Error occurred");
        }
        return data.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default {
    get<T>(url: string, params?: object): Promise<T> {
        return instance.get(url, { params });
    },
    post<T>(url: string, data?: object): Promise<T> {
        return instance.post(url, data);
    },
    put<T>(url: string, data?: object): Promise<T> {
        return instance.put(url, data);
    },
    delete<T>(url: string, data?: object): Promise<T> {
        return instance.delete(url, { data });
    },

};
// request.js
import axios from "axios";
import {
    ElNotification
} from 'element-plus'
import router from "../router/index";


// Create an axios instance
const request = axios.create({
    // baseURL:"system",
    // baseURL: "http://localhost:8081/",
    // baseURL: "http://198.44.179.118:8081/",
    timeout: 1000 * 30, // Set timeout for all requests
    withCredentials: true,
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
});

// Request interceptor for API token
request.interceptors.request.use(
    config => {
        // Assuming you store your token in localStorage (or use Vuex state management)
        const token = localStorage.getItem("token");
        config.headers.Authorization = `${token}`;
        return config;
    },
    error => {
        console.error('Request error: ', error);
        return Promise.reject(error);
    }
);

// Response interceptor for handling responses globally
request.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response.data; // Return only data
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        console.log(error)
        if (error.response.status === 401) {
            // 如果状态码为401，则重定向到登录页面
            ElNotification({
                title: "錯誤",
                message: '用戶未登录，请重新登录',
                type:error
            })
            router.replace({
                path:'/'
            }).then(res=>{})
        }
        if (error.response.status === 404) {
            // 如果状态码为404，则重定向到登录页面
            ElNotification({
                title: "錯誤",
                message: '请求资源不存在，請稍後重試',
                type:error
            })
            router.replace({
                path:'/'
            }).then(res=>{})
        }
        if (error.response.status === 500){
            ElNotification({
                title: "錯誤",
                message: '服務器出現未知錯誤，請聯繫管理員，並請稍後登錄',
                type:error
            })
        }
        console.error('Response error: ', error);
        localStorage.removeItem("token");
        return Promise.reject(error);
    }
);

export default request;

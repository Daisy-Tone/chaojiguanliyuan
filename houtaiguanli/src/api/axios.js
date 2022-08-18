import axios from "axios";
import config from "../config";

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// 工具类
class HttpRequest{
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }
    // 方法，定义axios相关配置
    getInsideCongig(){
        // 初始值
        const config = {
            baseUrl : this.baseUrl,
            header: {}
        }
        return config
    }
    // 拦截器
    interceptors(instance){ //instance即是axios实例
        // 添加请求拦截器
        instance.interceptors.request.use(function(config){
            // 在发送请求之前做些什么
            return config;
        },function(error){
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function(response){
            console.log(response,'response');
            // 对响应数据做些什么
            return response;
        },function(error){
            console.log(error,'error');
            // 对响应错误做些什么
            return Promise.reject(error);
        });
    }
    request(options){
        const instance = axios.create()
        options = {...this.getInsideCongig(),...options}
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)
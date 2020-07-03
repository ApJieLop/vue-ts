import Vue from "vue";
import axios from 'axios'
import router from "../../router";
import Qs from 'qs' // qs

// ElementUI框架
import ElementUI from 'element-ui';

// 全局Loading - 打开
const showLoading = () => {
    ElementUI.Loading.service({
        fullscreen: true,
        background: "rgba(0,0,0,.4)"
    });
}

// 全局Loading - 关闭
const closeLoading = () => {
    ElementUI.Loading.service({}).close();
}

// 1为跨域开发环境 - 2为正式环境
let urlType = 1;
let urla:string,urlb:string
if (urlType == 1) {
    urla = 'urla';
    urlb = 'urlb';
} else {
    urla = 'http://a.yumaoyou.cn:8008/index.php/';
    urlb = 'http://b.yumaoyou.cn:8008/index.php/';
}

//定义headers格式
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token');
    if (token) {
    	config.headers.token = localStorage.getItem('token');
    } else {
    	localStorage.clear();
    	router.push("/");
    	ElementUI.Message.error("登录已失效，请重新登录");
    }
    if (config.method === 'post') {
        config.data = Qs.stringify(config.data);
    }
    showLoading();
    return config;
}, function (error:any) {
    closeLoading();
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use((response:any)=> {
    setTimeout(function () {
        closeLoading();
    }, 500);
    // 请求成功
    if (response.status == 200) {
        return response;
        // token失效  
    } else if (response.status == 401) {
        localStorage.clear();
        router.push("/");
        ElementUI.Message.error(response.data.message + ',请联系管理员!');
        closeLoading();
        return false;
        // 服务器失败
    } else {
        ElementUI.Message.error(response.data.message + ',请联系管理员!');
        closeLoading();
        return false;
    }
}, (error:any)=> {
    ElementUI.Message.error(error + ',请联系管理员!');
    closeLoading();
    return Promise.reject(error);
});

// axios - 请求
export default {
    urla,
    urlb,
    // 登录
    myLogin(type:any, url:string, data = {}, F:any) {
        axios({
            method: type,
            url: url,
            data: data
        }).then(res => {
            return F(res);
        },
            err => {
                return err
            })
    },
    // 通用
    myAjax(type:any, url:string, data = {}, F:any) {
        if (type == 'get') {
            axios({
                method: type,
                url: url,
                params: data,
            }).then(res => {
                return F(res);
            },
                err => {
                    return err
                })
        } else {
            axios({
                method: type,
                url: url,
                data: data
            }).then(res => {
                return F(res);
            },
                err => {
                    return err
                })
        }
    }
}


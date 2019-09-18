import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://47.96.21.88:8086/',
    baseURL: 'http://localhost.charlesproxy.com:3000',
    // timeout: 8086,
    // headers: null
    //'X-Custom-Header': 'foobar'
});
// axios.defaults.baseURL =  'http://localhost:9999/'




//请求拦截处理
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
    // return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export const Net = async (api, params) => {

    console.warn('net')
    return new Promise((resolve, reject) => {
        instance.post(api, params)
            .then(res => {
                console.warn(res)
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const NetGet = async (api, params) => {

    // console.warn('netget')

    return new Promise((resolve, reject) => {
        instance.get(api, params)
            .then(res => {
                // console.warn(res)
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}
import axios from 'axios';

// 创建一个axios实例并设置baseURL
const instance = axios.create({
  baseURL: 'http://127.0.0.1:7001'  // 将这里的URL替换为你的baseURL
});

instance.interceptors.request.use(
    (config)=> {
        var token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization=token
        }
        return config
	}, 
    function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
    }
);


export default instance;
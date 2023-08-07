import axios from "axios";
import {useUserStore} from  '../store/user';
// import { message } from 'ant-design-vue';
import { useRouter } from "vue-router";
const router=useRouter()
//接口请求基地址 接口超时时间
const HttpInstance= axios.create({
	baseURL:'http://47.115.207.245:7001',
	timeout:5000
})

//拦截器
// 添加请求拦截器
HttpInstance.interceptors.request.use(config=> {
	// console.log('message:'+config.data.message)
	// console.log(config.data.code)
	const userStore = useUserStore()
	var token = ''
	try{
		token=userStore.userInfo.data.token
	}catch{
		
	}
	if(!token){
		token=''
	}
	console.log('token:'+token)
	if(token){
		config.headers.Authorization=token
	}
	return config
	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
});


HttpInstance.interceptors.response.use(function (response) {
	// 2xx 范围内的状态码都会触发该函数。
	// 对响应数据做点什么
	console.log('message:'+response.data.message)
	console.log(response.data.code)
	// console.log('message:'+response.data.message)
	// console.log(response.data.code)
	// if(response.data.code===401){
	// 			message.error(response.data.message);
	// 			const userStore=useUserStore()
	// 			userStore.clearUserInfo()
	// 			router.push('/login')
	// 		}
	return response;
}, function (error) {
	// 超出 2xx 范围的状态码都会触发该函数。
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default HttpInstance
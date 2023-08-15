import HttpInstance from '../utils/axios.js';

export const  loginAPI=(username,password)=>{
	return HttpInstance({
		url:'/auth/login',
		method:'POST',
		data:{
			username,
			password
		}
	})
}

export const  homeAPI=()=>{
	return HttpInstance({
		url:'/teams/2',
		method:'get',
	})
}
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '../api/user.js'
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router";




export const useUserStore= defineStore('user',()=>{
	const router = useRouter()
	//state
	const userInfo=ref({})
	//action
	// 1.获得登录信息
	 const getUserInfo1 =async(username,password)=>{
		const userStore = useUserStore()
		// console.log('getUserInfo1:username:' + username + ',password:' + password);
		const res= await loginAPI(username,password)
		// console.log('loginAPI out')
		// console.log(res)
		// console.log('存token')
		userInfo.value = res.data
		if(res.data.code === 401){
			message.error(res.data.message);
			// const userStore=useUserStore()
			userStore.clearUserInfo()
			router.push('/login')
		}else if (res.data.code === 200){
			message.success("登录成功")
			router.push('/home')
		}
			
	}
	// 退出时清除用户数据
	const clearUserInfo = ()=>{
		userInfo.value = {}
	}
	return {
		userInfo,
		getUserInfo1,
		clearUserInfo
	}
},
{
	persist: true,
})



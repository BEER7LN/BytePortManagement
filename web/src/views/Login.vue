<template>
  <div class="contain">
    <div class="form">
      <a-form
        ref="formRef"
        :model="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 17 }"
        class="loginForm"
        :rules="rules"
      >

        <a-form-item :wrapper-col="{ span: 12, offset:7}">
          <h2>登录 | Login</h2>
        </a-form-item>

        <a-form-item
          ref="userename"
          label="用户名"
          name="username"
        >
          <a-input
            placeholder="Username"
            v-model:value="form.username"
          >
          </a-input>
        </a-form-item>

        <a-form-item
          ref="password"
          label="密码"
          name="password"
        >
          <a-input
            type="password"
            placeholder="Password"
            v-model:value="form.password"
          >
          </a-input>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 12, offset:9}">
          <a-button
            html-type="submit"
            class="login-form-button"
            @click="doLogin"
          >
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '../store/user.js'

import { useRouter } from "vue-router";
import { message } from 'ant-design-vue';
const router = useRouter()

const formRef = ref(null);
const form = reactive({
  username: '',
  password: ''
})
const rules = {
  username: [
    { required: true, message: '请输入用户名!', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码!', trigger: 'blur' },
  { min: 6, max: 14, message: '密码在6-14位', trigger: 'blur' }]
}


const doLogin = () => {
  const { username, password } = form
  formRef.value.validate().then(() => {
    const useStore = useUserStore()
    console.log('username:' + username + ',password:' + password);
    useStore.getUserInfo1(username, password)
    // console.log('doLogin out')
    // console.log('doLogin code:' + useStore.userInfo.data.code)
    // if (useStore.userInfo.data.code === 200) {
    //   message.success("登录成功")
    //   router.push('/home')
    // }
  }).catch(error => {
  });

};

</script>
<style lang="less" scoped>
.contain {
  background-color: #f9f4e7;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  // border: 2px solid #fff;
  background-color: #f8f0de;
  // width: 300px;
  width: 400px;
  height: 280px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.loginForm {
  // position: relative;
  // width: 520px;
  max-width: 100%;
  padding: 20px 35px 0;
  // margin: 0 auto;
}
.login-form-button {
  color: rgb(50, 124, 213);
  border: 2px solid rgb(141, 171, 208);
}
</style>
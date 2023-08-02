<template>
  <div class="contain">
    <div class="form">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="loginForm"
        @submit="handleSubmit"
      >
        <a-form-item label="用户名">
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
            placeholder="Username"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <!-- <a-checkbox v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]">
            Remember me
          </a-checkbox> -->
          <!-- <a
            class="login-form-forgot"
            href=""
          >
            Forgot password
          </a> -->
          <a-button
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
          <!-- Or
          <a href="">
            register now!
          </a> -->
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {

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
  width: 350px;
  height: 260px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.loginForm {
  // position: relative;
  // width: 520px;
  max-width: 100%;
  padding: 50px 35px 0;
  // margin: 0 auto;
}
.login-form-button {
  // margin-left: 80px;
  margin-left: 30%;
  color: rgb(50, 124, 213);
  border: 2px solid rgb(141, 171, 208);
}
</style>
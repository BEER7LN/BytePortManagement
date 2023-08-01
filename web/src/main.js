import { createApp } from 'vue'
// import './style.css'
// import './assets/style/custom.less'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import '@/assets/icons/iconfont.js'

const pinia =createPinia()

const app = createApp(App)
app.use(Antd) 
app.use(pinia)
app.use(router)
app.mount('#app')
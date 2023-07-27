import { createApp } from 'vue'
import './style.css'
import './assets/style/custom.less'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
const pinia =createPinia()
createApp(App)
    .use(Antd) 
		.use(pinia)
		.use(router)
    .mount('#app')
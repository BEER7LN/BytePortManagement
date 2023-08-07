import { createApp } from "vue";
import "./style.css";
// import './assets/style/custom.less'
import "@/assets/icons/iconfont.js";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
VMdEditor.use(githubTheme);
const app = createApp(App);
app.use(Antd);
app.use(pinia);
app.use(router);
app.use(VMdEditor);
app.mount("#app");

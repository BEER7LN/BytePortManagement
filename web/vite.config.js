import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/custom.less";',
      },
    },
  },
  // 设置可用@符替代根目录src
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});

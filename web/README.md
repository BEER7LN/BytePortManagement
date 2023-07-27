pnpm install

pnpm run dev

# Yuan分支改动
1. vite.config.js中加了@符代替根目录路径src，便于路由和引入时查找路径
2. 修改了assets/style/custom.less 添加了icon的默认背景色和鼠标聚焦时呈现的主题色
3. 补全了项目最外层的Readme.md中web端目录结构相关描述
4. 删除了全局样式文件style.css中的原有样式 放入了reset.css 用于清除浏览器默认CSS样式
5. 修改了.gitignore文件 git push 时不再 push node_modules依赖
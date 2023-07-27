# BytePortManagement
字节跳动第六届青训营-项目二 接口管理工具


## serve 端
### 目录结构

```
.
├── app   项目开发目录
│   ├── controller 处理业务
│   ├── public     静态资源
│   ├── service    查询数据库 请求数据
│   └── router.js  路由配置
├── config         项目配置文件
│   ├── config.default.js
│   └── plugin.js
├── logs  日志文件
├── run   运行时配置文件目录
├── test  测试用例目录
├── typings
├── jsconfig.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```
### 运行&&部署
1. 安装包管理工具
```
npm install -g pnpm
```
2. 安装依赖
```
pnpm install
```
3. 启动项目
```
pnpm run dev
```


## Web 端
### 目录结构
```
.
├── public  静态资源
│   └── vite.svg  vite构建项目时自带的logo
├── src
│   ├── App.vue 项目根文件，包含项目整体布局和逻辑
│   ├── assets  资源文件（样式、图片等）
|       └── style
|           └── custom.less 存放less变量
│   ├── components  组件抽离
│   ├── router   路由配置
│   ├── store   仓库管理
│   ├── views   页面
│   ├── main.js   入口文件，包含了Vue实例的创建和挂载
│   └── style.css   全局样式文件(存放了reset.css清除浏览器默认CSS样式)
├── index.html  
├── package.json  项目配置文件
├── pnpm-lock.yaml
├── README.md   项目文档
└── vite.config.js  Vite的配置文件

```
### 运行&&部署
1. 安装包管理工具
```
npm install -g pnpm
```
2. 安装依赖
```
pnpm install
```
3. 启动项目
```
pnpm run dev
```

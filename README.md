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
├── public
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
└── vite.config.js

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

pnpm install 依赖安装命令

pnpm run dev  启动命令

# 主页这边未实现部分：
1. 成员部分数据替换，接口得通过project_id拿到成员数据，没走通，project页逻辑还没捋清楚，直接跳转过去会被重定向那块儿整出无限递归爆栈。
2. 另外团队管理移交那块儿network请求里是正常返回200，但好像数据上团队的owner值没有改动，因此不会自动替换成退出团队的代码展示。

# ln 分支

## version 1

- finished
  - sidebar of project manager
  - sidebar of interface manager
  - markdown editor
- left to be done
  - sidebar of project manager: control input label
  - sidebar of interface manager: add functions
  - cards: add interface, test interface, save file

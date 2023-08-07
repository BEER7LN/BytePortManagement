#!/bin/bash

# 服务运行的端口
PORT=7001

source ~/.profile

# 检查Node.js版本
nvm use 18

cd serve

# 服务启动命令
START_COMMAND="pnpm run dev"

while true; do
  # 使用netcat检查端口连接状态
  nc -z 127.0.0.1 $PORT

  # 获取netcat的退出码
  # 0表示端口可连接，否则表示连接失败
  result=$?

  if [ $result -eq 0 ]; then
    echo "服务在端口 $PORT 上运行正常。"
  else
    echo "服务在端口 $PORT 上未运行，尝试重新启动..."

    # 启动服务
    nohup $START_COMMAND > ../keep-run.log 2>&1 &

    echo "等待服务启动..."
    sleep 5 # 可以根据实际情况调整等待时间
  fi

  # 等待一段时间后再次检查端口连接状态
  sleep 10 # 可以根据实际情况调整检查间隔时间
done

// token 验证
module.exports = () => {
    return async function tokenVerify(ctx, next) {
        // 获取请求路径
        const path = ctx.request.path;
        
        // 判断请求路径是否以 '/auth'、'/log' 或 '/test' 开头
        if (path.startsWith('/auth') || path.startsWith('/log') || path.startsWith('/test')) {
            // 请求路径是以 '/auth'、'/log' 或 '/test' 开头，直接通过
            await next();
        } else {
            // 请求路径不是以上三者开头，判断 Token 是否为空
            const token = ctx.header.authorization;
            if (!token) {
                ctx.status = 401; // 设置响应状态码为 401 Unauthorized
                ctx.body = 'Token is required'; // 返回错误信息
                return;
            }

            // Token 校验通过，继续执行下一个中间件或路由处理函数
            await next();
        }
    };
  };
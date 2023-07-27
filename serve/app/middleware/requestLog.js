// 数据库请求日志

module.exports = (options, app) => {
    return async function requestLog(ctx, next) {
        // 记录请求开始时间
        const startTime = Date.now();

        // 执行下一个中间件或路由处理函数
        await next();

        // 请求结束时间
        const endTime = Date.now();

        // 记录请求日志
        const { method, url, query, ip, body } = ctx.request;
        const status = ctx.response.status;
        const token = ctx.header.token || '';

        // 计算请求耗时
        const duration = endTime - startTime;

        // 存储请求日志到 MySQL
        const requestLog = {
            ip,
            method,
            url,
            query: JSON.stringify(query),
            body: JSON.stringify(body),
            token,
            status,
            start_time: new Date(startTime),
            end_time: new Date(endTime),
            duration,
        };

        // 使用 Egg.js 内置的 MySQL 插件保存日志到数据库
        await ctx.app.mysql.insert('request_logs', requestLog);
    };
}
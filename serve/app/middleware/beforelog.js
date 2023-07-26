module.exports = (options, app) => {
    return async function printLog(ctx, next){
        const {request} = ctx;
        console.log(`${request.ip} >>> ${request.method} ${request.url}`);
        if(request.ip == "192.168.10.116"){
            ctx.status = 403;
            ctx.body ="sb cbn"
            return;
        }
        await next();
    }
}
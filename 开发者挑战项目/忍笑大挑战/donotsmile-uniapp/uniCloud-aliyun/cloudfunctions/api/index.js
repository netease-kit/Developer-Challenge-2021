"use strict"

const Koa = require("./uni-koa")
const KoaRouter = require("./uni-router")
const routerLoader = require('./router-loader')
const SECRET_PWD = "gugu-secrect-pwd"
const SECRET_JWT = "gugu-secrect-jwt"



const db = uniCloud.database()

const app = new Koa()

app.use(async (ctx,next)=>{
	ctx.db = db
	return next()
})
app.use(routerLoader(new KoaRouter()))
exports.main = async (event, context) => {
	//执行 app 返回数据给客户端
	// console.log(JSON.stringify(event) + JSON.stringify(context))
	return app.listen(event, context)
} 

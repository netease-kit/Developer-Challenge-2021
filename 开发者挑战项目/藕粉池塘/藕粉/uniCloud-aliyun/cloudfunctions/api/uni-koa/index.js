/**
 * @description uniCloud 云函数API框架 
 * @author 461377880@qq.com
 */

// 创建云函数框架类
function Koa() {
	this.fns = [] //用来装 fn
}

// 中间件处理方法
Koa.handle = async function(ctx, fns) {
	await next()

	function next() {
		let fn = fns.shift()
		if (!fn) return Promise.resolve()
		return Promise.resolve(fn(ctx, next))
	}
}

// 创建上下文对象
Koa.createContext = function(event, context) {
	let req = Object.create(event)
	let ctx = {
		event: Object.create(event),
		context: Object.create(context),
		url: req.url,
		method: req.method &&
			req.method.toLowerCase() || "get",
		status: 404, //默认状态
		state: {},
		request: {
			body: req.data,
			params: {}
		},
		header: {
			authorization: req.header ? req.header.authorization : ""
		},
		set body(data) {
			this.status = 200
			this.result = data
		},
		throw: function(code, msg) {
			this.status = code
			let err = new Error(msg)
			err.expose = true
			throw err
		}
	}
	return ctx
}


// 中间件收集方法
Koa.prototype.use = function(fn) {
	this.fns.push(fn)
	return this //级联调用
}

// 框架执行获取返回值
Koa.prototype.listen = async function(event, context) {
	//获取上下文
	let ctx = Koa.createContext(event, context)

	//执行中间件，获取异常返回数据
	try {
		await Koa.handle(ctx, this.fns)
		r = {
			data:ctx.result,
			status:ctx.status
		}
		return r
	}catch(e){
		
		if(e.expose){
			return {
				'status':ctx.status,
				'msg':e.message||e.msg
			}
		}else{
			throw e
			console.log("koa catch: "+JSON.stringify(e))
			return {
				'status': 000,
				'msg': '未知错误 000'
			}
		}
	}
}

module.exports = Koa

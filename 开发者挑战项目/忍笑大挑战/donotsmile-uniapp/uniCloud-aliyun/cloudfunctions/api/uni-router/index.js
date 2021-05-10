/**
 * @description 云函数API框架路由中间件
 * @author 461377880@qq.com
 */

//这里只考虑RESTful api风格 [增,删,改,查] 四种
const methods = ["post", "delete", "put", "get"]

// 定义路由类
function Router(opts) {
	this.prefix = (opts && opts.prefix) || "" //路径前缀
	this.stacks = []
}

// 把动态路由的参数挂到 ctx.request.params
Router.params = function(ctx, layer) {
	let params = layer.params
	if (params) {
		let args = Array.prototype.slice.call(ctx.url.match(layer.reg), 1)
		ctx.request.params = params.reduce(function(per, cur, idx) {
			per[cur] = args[idx]
			return per
		}, {})
	}
}

// 获取满足条件路由的函数
Router.compare = function(ctx, stacks) {
	//找出满条件的layers		
	let fnsArr = stacks.filter(function(layer) {	
		return layer.method === ctx.method &&
			(layer.path === ctx.url || layer.reg &&
				layer.reg.test(ctx.url))
	}).map(function(layer) {
		Router.params(ctx, layer) //处理参数
		return layer.fns
	})
	
	if (fnsArr.length === 0) return []
	return fnsArr.reduce(function(a, b) {
		return a.concat(b)
	})
}

// 处理路由的方法
Router.handle = async function(ctx, stacks) {
	let fns = Router.compare(ctx, stacks)
	
	await next()

	function next() {
		let fn = fns.shift()
		if(fn) return fn(ctx, next)
	}
}

// 生成 增删改查 路由收集方法
methods.forEach(function(method) {
	Router.prototype[method] = function(path, fns) {
		fns = Array.prototype.slice.call(arguments, 1)
		let layer = {
			method: method,
			path: this.prefix + path,
			fns: fns
		}

		//如果动态路由，把规则 正则和参数挂到layer上
		if (path.indexOf(":") >= 0) {
			let params = []
			let reg = path.replace(/:([^\/]*)/g, function() {
				params.push(arguments[1])
				return "([^\/]*)"
			})

			layer.reg = new RegExp(reg)
			layer.params = params
		}

		this.stacks.push(layer)
		return this //级联调用
	}
})

// 把路由挂到 app.use 对象上的方法
//    实质就是返回一个中间件函数
Router.prototype.routes = function() {
	let me = this
	return async function(ctx, next) {
		if (!ctx.url) ctx.throw(412, "没有定义路由.")
		await Router.handle(ctx, me.stacks)
	}
}

module.exports = Router

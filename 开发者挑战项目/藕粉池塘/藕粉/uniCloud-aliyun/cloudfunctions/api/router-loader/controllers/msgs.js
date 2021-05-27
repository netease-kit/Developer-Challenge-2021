var IMService = require("../../services/IMService")

module.exports = {
	'POST ': async (ctx, next) => {
		let requestData = ctx.request.body
		let r = await IMService.sendMsg(requestData)
		if(r.code != 200){
			ctx.throw(500,JSON.stringify(r))
		}else{
			ctx.body = r
		}
		return next()
	}
}

var IMService = require("../../services/IMService")

module.exports = {
	// join pool
	'POST /join': async (ctx, next) => {
		let requestData = ctx.request.body
		let r = await ctx.db.collection('pools').where({
			tid:requestData.tid
		}).get()
		r = r.data
		if(r.length == 0){
			ctx.throw(404,"没有找到该群组")
		}else{
			requestData.owner = r.owner
			let r = await IMService.joinPool(requestData)
			if(r.code != 200){
				ctx.throw(500,JSON.stringify(r))
			}else{
				ctx.body = r
			}
		}
		return next()
	},
	// create pool
	'POST ': async (ctx, next) => {
		let requestData = ctx.request.body
	
		let r = await ctx.db.collection('pools').add({
			tid:requestData.tid,
			owner:requestData.owner
		})
		requestData.members = JSON.stringify(requestData.members)
		r = await IMService.createPool(requestData)
		
		if(r.code != 200){
			ctx.throw(500,JSON.stringify(r))
		}else{
			ctx.body = r
		}
		return next()
	}
}

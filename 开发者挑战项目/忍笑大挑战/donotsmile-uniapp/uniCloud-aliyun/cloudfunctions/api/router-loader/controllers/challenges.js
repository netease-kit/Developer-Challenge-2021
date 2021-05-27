module.exports = {
	'GET /:id': async (ctx, next) => {
		let {id} = ctx.request.params
		let r = await ctx.db.collection('challenges').doc(id).get()
		let challenge = r.data
		if(challenge.length == 0){
			ctx.throw(404,"没有该挑战")
		}else{
			ctx.body = challenge[0]
		}
		return next()
	},
	
}

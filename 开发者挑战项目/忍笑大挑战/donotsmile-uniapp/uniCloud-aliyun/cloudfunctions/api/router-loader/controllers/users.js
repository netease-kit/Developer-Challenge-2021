const ResponseMessage = require('../../response-message')
var crypto = require('crypto')
var jwt = require('../../uni-jwt')

module.exports = {
	'POST /sign-in': async (ctx, next) => {
		let {
			username,
			password
		} = ctx.request.body
		let r = await ctx.db.collection('users').where({
			username
		}).get()
		r = r.data
		if(r.length == 0){
			ctx.throw(400,ResponseMessage.USER_SIGN_IN_FAILED)
		}else{
			let hashedPwd = jwt.encryptPwd({username,password})
			if(hashedPwd == r[0].password){
				delete r[0].password
				ctx.body = r[0]
			}else{
				ctx.throw(400,ResponseMessage.USER_SIGN_IN_FAILED)
			}
		}
		return next()
	},
	
	'POST /sign-up': async (ctx, next) => {
		let {
			username,
			password
		} = ctx.request.body

		let r = await ctx.db.collection('users').where({
			username
		}).get()
		r = r.data
		if(r.length!=0){
			ctx.throw(400,ResponseMessage.USER_SIGN_UP_EXISTED)
		}else{
			let hashedPwd = jwt.encryptPwd({username,password})
			
			let r = await ctx.db.collection('users').add({
				username,
				password:hashedPwd
			})
			let user = {username}
			ctx.body = user
		}
		return next()
	},
}

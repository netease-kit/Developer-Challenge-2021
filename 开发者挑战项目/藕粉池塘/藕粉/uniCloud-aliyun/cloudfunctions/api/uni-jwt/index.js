/**
 * @description uni-jwt 云函数API框架签证验证中间件
 * @author 461377880@qq.com
 * 
 * 1. 加密字符串 （encrypt）
 * 2. 签证的生成（sign）与验证（verify）
 * 3. 路由守卫（koaJwt/unless）
 */

const crypto = require("crypto")

class Jwt {

	// 路由权限验证 token
	koaJwt(opts = {}) {
		let middle = async (ctx, next) => {
			let {
				secret
			} = opts

			const token = ctx.header.authorization
			try {
				const payload = this.verify(token, secret)
				ctx.state.subject = payload

				//需要验证的url 权限
				ctx.state.subject.verifyURL = ctx.url

			} catch (err) {
				ctx.throw(401, err.message) //中断
			}
			return await next()
		}
		middle.unless = this.unless
		return middle
	}
	// 过滤不需要验证的url
	unless(opts = {}) {
		let pathRegs = opts.path
		let parent = this

		return async function(ctx, next) {
			if (pathRegs && pathRegs.some(reg => reg.test(ctx.url))) {
				await next() // 不验证
			} else {
				return parent(ctx, next) // 需验证token
			}
		}
	}

	// 加密密码 用户名+用户密码+私钥
	encryptPwd(content, secret = "imsecrect") {
		let contentStr
		try {
			contentStr = JSON.stringify(content)
		} catch (e) {
			contentStr = content.toString()
		}
		return crypto
			.createHash("md5")
			.update(contentStr).update(secret)
			.digest("hex")
	}

	// 生成token
	sign(data, secret, opts) {
		const header = {
			'typ': 'JWT',
			'alg': 'SHA256' //crypto 自带
		}

		let payload = JSON.parse(JSON.stringify(data))

		secret = secret || "imsecrect"

		// 签发时间和过期时间，存放在 payload 中
		// 默认的时间单位为分钟
		const time = Math.floor(+new Date() / 1000)

		payload["exp"] = time + (60 * 60)
		if (opts) {
			for (let key in opts) {
				if (opts.expiresIn) {
					payload.exp = time + opts.expiresIn * 60
				} else {
					payload[key] = opts[key]
				}
			}
		}
		payload.exp = payload.exp || time + 10 * 60 //默认 10 分钟
		payload.iat = time

		// base64加密
		const header64 = Buffer.from(JSON.stringify(header)).toString("base64")
		const payload64 = Buffer.from(JSON.stringify(payload)).toString("base64")

		// sha256加密
		let signature = crypto.createHmac("sha256", secret)
			.update(header64 + "." + payload64, "utf8")
			.digest("hex")

		//返回签证token
		return header64 + "." + payload64 + "." + signature
	}

	// 解码token, 成功得到payload, 否则抛出异常
	verify(token, secret) {
		secret = secret || "imsecrect"

		if (!token) throw new Error("没有携带签证")

		let arr = token.split(".")
		if (arr.length !== 3) throw new Error("签证格式错误")

		const signature = crypto.createHmac("sha256", secret)
			.update(arr[0] + "." + arr[1], "utf8")
			.digest("hex")

		if (arr[2] !== signature) throw new Error("篡改签证被逮住了")

		let payload = JSON.parse(Buffer.from(arr[1], "base64").toString())
		if (payload.exp < Math.floor(+new Date() / 1000)) throw new Error("签证已过期")

		// 删除 签发时间和超期时间字段
		delete payload.exp
		delete payload.iat

		return payload
	}

}
module.exports = new Jwt()

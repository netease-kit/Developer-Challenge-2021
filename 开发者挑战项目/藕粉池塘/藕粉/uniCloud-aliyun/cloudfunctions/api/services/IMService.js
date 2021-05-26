const crypto = require('crypto')
const request = require('request')
const AppKey = '338f742de66a8283293644c990b7bbf6'
const AppSecret = '6c6a27d6e85e'

const _post = function(url, formData) {
	return new Promise((resolve, reject) => {
		let Nonce = Math.random().toString()
		let CurTime = (parseInt(new Date().getTime()/1000)).toString()
		
		let CheckSum = crypto.createHash('sha1').update(AppSecret + Nonce + CurTime).digest('hex')
		let headers = {
			AppKey,
			Nonce,
			form: formData,
			CurTime,
			CheckSum
		}
		request.post({
			url,
			form: formData,
			headers,
		}, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(JSON.parse(body))
			} else {
				reject(JSON.parse(error))
			}
		})
	})
}

module.exports = {
	createAccount: function(username) {
		return _post('https://api.netease.im/nimserver/user/create.action', {
			accid: username,
			name: username
		})
	},
	joinPool(requestData){
		return _post('https://api.netease.im/nimserver/user/create.action', requestData)
	},
	
	createPool(requestData){
		return _post('https://api.netease.im/nimserver/team/create.action',requestData)
	},
	sendMsg(requestData){
		return _post('https://api.netease.im/nimserver/msg/sendMsg.action',requestData)
	}
}

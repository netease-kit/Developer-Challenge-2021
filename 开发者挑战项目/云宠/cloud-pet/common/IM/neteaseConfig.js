const onConnect = function(res) {
	console.log('NIM连接成功');
}
const onWillReconnect = function(obj) {
	// 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
	console.log('即将重连');
}
const onDisconnect = function(error) {
	// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
	console.log('丢失连接');
	if (error) {
		switch (error.code) {
			// 账号或者密码错误, 请跳转到登录页面并提示错误
			case 302:
				console.warn('账号或者密码错误')
				break;
				// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
			case 417:
				console.warn('重复登录, 已经在其它端登录了')
				break;
				// 被踢, 请提示错误后跳转到登录页面
			case 'kicked':
				console.warn('被踢')
				break;
			default:
				console.warn('未知错误')
				break;
		}
	}
}
const onError = function(error) {
	console.log(error);
}
const postChatRecord = async function(data) {
	console.log('参数');
}
/* 收到消息处理 */
const messageReceive = function(res) {
	console.log(res, '收到了消息需要操作')
	console.log('收到的是文本消息ne')
}
export default {
	debug: true,   // 是否开启日志，将其打印到console。集成开发阶段建议打开。
	appKey: '1c6d6db091c83e4f2ad1ca85ba4ce0c7',
	db:true, //若不要开启数据库请设置false。SDK默认为true。
	// privateConf: {}, // 私有化部署方案所需的配置
	onconnect: onConnect,
	onwillreconnect: onWillReconnect,
	ondisconnect: onDisconnect,
	onerror: onError
}
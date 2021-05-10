module.exports = {
	/**
	 * 通用消息，标准HTTP状态格式
	 */
	OK: "200-成功",
	NOT_FOUND: "404-未找到资源",
	BAD_REQUEST: "400-请求参数错误",
	INVALID_CHECK_CODE: "400-1-验证码错误",
	FORBIDDEN: "403-禁止/无权访问",
	INTERNAL_SERVER_ERROR: "500-服务器内部错误",
	METHOD_NOT_ALLOWED: "405-请求方法不支持",
	SEE_OTHER: '303-请参考其他API',

	/**
	 * 0 参数类错误回执, 格式：0***
	 */
	INVALID_ORIGIN:'非法的客户端来源',
	/**
	 * User 相关操作的回执，格式：1***
	 */
	USER_FORBIDDEN: '1000-无权访问该用户',
	USER_SIGN_IN_FAILED: '1001-用户名或密码错误',
	USER_SIGN_UP_FAILED: '1002-账号创建失败',
	USER_SIGN_UP_EXISTED: '1003-账号创建失败: 账号已经注册'
}

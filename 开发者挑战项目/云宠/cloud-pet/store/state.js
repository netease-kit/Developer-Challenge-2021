const ACCESSTOKEN = uni.getStorageSync('accessToken') || '';
const REFERRER = uni.getStorageSync('referrer') || '';
const USER = uni.getStorageSync('user') || {};
const REFRESHTOKEN = uni.getStorageSync('refreshToken') || '';
const GLOBALCONFIG = uni.getStorageSync('globalConfig') || {};
const CARTNUM = uni.getStorageSync('cartNum') || 0;
const NOTIFYNUM = uni.getStorageSync('notifyNum') || 0;
const IMHISTORY = uni.getStorageSync('imHistory') || [];
const IMNOREAD = uni.getStorageSync('imNoRead') || 0;
const THEMECOLOR = uni.getStorageSync('themeColor');
export default {
	isLogin: true,
	messageList: [],
	// 用户token
	accessToken: ACCESSTOKEN,
	// 用户信息
	userInfo: USER.member,
	// 推荐人
	referrer: REFERRER,
	// 小程序openid
	openId: '',
	// 网络状态，用于下载提醒
	networkState: 'unknown',
	globalConfig: GLOBALCONFIG,
	refreshToken: REFRESHTOKEN,
	// 购物车数字角标
	cartNum: CARTNUM,
	// 消息中心数字角标
	notifyNum: NOTIFYNUM,
	// 历史聊天消息，仅保存最后100条
	imHistory: IMHISTORY,
	// 当前未读聊天消息数量
	imNoRead: IMNOREAD,
	// 当前是否处于聊天面板
	isImPanel: false,
	// 当前是否人工客服服务
	isStuffService: false,
	themeColor: THEMECOLOR
}
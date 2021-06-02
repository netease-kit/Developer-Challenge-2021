import SDK from '../common/IM/sdk/NIM_Web_SDK_weixin_v7.2.0.js'
import config from '../common/IM/neteaseConfig.js'
import $mConstDataConfig from '@/config/constData.config';
import $mSettingConfig from '@/config/setting.config';
import Vue from 'vue'
const mutations = {
	
	updateConversationList(state,msg) {
		state.messageList.push(msg)
	},
	updateMessageList(state,arr) {
		state.messageList = arr
	},
	login(state, provider) {
		state.isLogin = true
		const imState = SDK.NIM.getInstance({
			...config,
			account: '4903533184816128',
			token: '4903533184816128',
		})
		Vue.prototype.$IM = imState
		console.log('登录成功')
		state.accessToken = provider.access_token;
		state.refreshToken = provider.refresh_token;
		state.userInfo = provider.member;
		state.user = provider;
		uni.setStorageSync('user', provider);
		uni.setStorageSync('accessToken', provider.access_token);
		uni.setStorageSync('refreshToken', provider.refresh_token);
		uni.setStorageSync('userInfo', provider.member);
	},
	logout(state) {
		state.accessToken = '';
		state.refreshToken = '';
		state.userInfo = {};
		uni.removeStorageSync('accessToken');
		uni.removeTabBarBadge({ index: $mConstDataConfig.notifyIndex });
		uni.removeTabBarBadge({ index: $mConstDataConfig.cartIndex });
		uni.removeStorageSync('refreshToken');
		uni.removeStorageSync('userInfo');
	},
	setReferrer(state, referrer) {
		state.referrer = referrer;
		uni.setStorageSync('referrer', referrer);
	},
	setOpenId(state, openId) {
		state.openId = openId;
		uni.setStorageSync('openId', openId);
	},
	setNetworkState(state, provider) {
		state.networkState = provider;
	},
	setCartNum(state, provider) {
		state.cartNum = provider;
		uni.setStorageSync('cartNum', provider);
		if (!provider || parseInt(provider, 10) === 0) {
			uni.removeTabBarBadge({
				index: $mConstDataConfig.cartIndex
			});
		} else {
			uni.setTabBarBadge({
				index: $mConstDataConfig.cartIndex,
				text: provider.toString()
			});
		}
	},
	setNotifyNum(state, provider) {
		state.notifyNum = provider;
		uni.setStorageSync('notifyNum', provider);
		if (parseInt(provider, 10) === 0) {
			uni.removeTabBarBadge({
				index: $mConstDataConfig.notifyIndex
			});
		} else {
			uni.setTabBarBadge({
				index: $mConstDataConfig.notifyIndex,
				text: provider.toString()
			});
		}
	},
	setGlobalConfig(state, provider) {
		state.globalConfig = provider;
		uni.setStorageSync('globalConfig', provider);
	},
	addImHistory(state, provider) {
		if (provider) {
			let data = state.imHistory;
			data.push(provider);
			uni.setStorageSync('imHistory', data);
			state.imHistory = data;
			if (!state.isImPanel) {
				this.commit('addImNoRead', 1);
			}
		}
	},
	clearImHistory(state) {
		state.imHistory = [];
		uni.setStorageSync('imHistory', []);
		state.imNoRead = 0;
		uni.setStorageSync('imNoRead', 0);
	},
	addImNoRead(state, provider) {
		state.imNoRead = state.imNoRead + provider;
		// if (state.imNoRead > $mAppConfig.imHisotryNum) {
		// 	state.imNoRead = $mAppConfig.imHisotryNum;
		// }
		uni.setStorageSync('imNoRead', state.imNoRead);
	},
	setIsImPanel(state, provider) {
		state.isImPanel = provider;
		if (provider) {
			state.imNoRead = 0;
			uni.setStorageSync('imNoRead', 0);
		}
	},
	setIsStuffService(state, provider) {
		state.isStuffService = provider;
	},
	setThemeColor(state, val) {
		state.themeColor = val;
		uni.setStorageSync('themeColor', val);
	}
}
export default mutations
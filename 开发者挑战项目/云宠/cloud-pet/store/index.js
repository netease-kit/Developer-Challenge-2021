import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import $mConstDataConfig from '@/config/constData.config';
import $mSettingConfig from '@/config/setting.config';
Vue.use(Vuex)

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

const store = new Vuex.Store({
	state: {
			...state,
			
		},
		getters: {
			// 全局配置
			themeColor: state => {
				let theme = state.themeColor;
				if (!theme) {
					theme = $mConstDataConfig.themeList.filter((item) => item.name === ($mSettingConfig.styleType || 'rf'))[0];
				}
				return theme;
			},
			// 全局配置
			globalConfig: state => {
				return state.globalConfig;
			},
			// 获取网络状态
			networkStatus: state => {
				return state.networkState;
			},
			// 判断用户是否登录
			hasLogin: state => {
				return !!state.accessToken;
			}
		},
		mutations: {
			...mutations
			
		},
		actions: {
			...actions,
			globalConfigChange({ commit }, info) {
				commit('setGlobalConfig', info);
			},
			networkStateChange({ commit }, info) {
				commit('setNetworkState', info);
			},
			logout({ commit }) {
				commit('logout');
			}
		}
		
})

export default store
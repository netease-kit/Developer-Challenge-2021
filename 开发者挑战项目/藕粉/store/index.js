import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: uni.getStorageSync("hasLogin"),
		sessionKey: uni.getStorageSync("sessionKey"),
		messegeNum:0,
		user_fd:""  //用户websocket设备id
	},
	mutations: {
		login(state, userInfo) {			
			state.hasLogin = uni.getStorageSync("hasLogin");
			state.sessionKey = uni.getStorageSync("sessionKey");
		},
		logout(state) {
			state.hasLogin = false;
			state.sessionKey = null;
		}
	}
})

export default store

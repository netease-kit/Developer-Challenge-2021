<template>
	<view>
		<!-- 顶部 -->
		<u-navbar back-text="返回">
			<view class="navbar-center">
				<text>{{user.username}}</text>
				<!-- <text class="status">在线</text> -->
			</view>
		</u-navbar>
		<!-- 页面主体 -->
		<view class="page-body">
			<block v-for="(item,index) in msgList" :key="index">
				<!-- 左边消息 -->
				<view v-if="item.from_uid == user.uid" class="chat-item chat-item-left">
					<u-avatar :src="user.avatar" class="avatar"></u-avatar>
					<view class="conent">{{item.content}}</view>
				</view>
				<!-- 右边消息 -->
				<view v-else class="chat-item chat-item-right">
					<u-avatar class="avatar" :src="userInfo.avatar"></u-avatar>
					<view class="conent">{{item.content}}</view>
				</view>
			</block>
			<!-- 发送消息栏 -->
			<view style="height: 130rpx;"></view>
			<view class="msg-fad">
				<input type="text" v-model="mTxt" placeholder="请输入消息" />
				<u-button @click="sendMessage" type="success">发送</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import SDK from '../../static/js/NIM_Web_SDK_v8.4.0.js'
	
	export default {
		data() {
			return {
				mTxt: "",
				msgList: [{avatar:'',content:'欢迎入群'}],
				userInfo: uni.getStorageSync("userInfo"),
				user: {},
				page: 1
			};
		},
		onLoad(options) {

			let self = this
			var data = {};
			// 注意这里, 当引入的SDK文件是NIM_Web_NIM_v.js时，请通过 NIM.getInstance 来初始化；当引入的SDK文件为NIM_Web_SDK_v时，请使用 SDK.NIM.getInstance 来初始化。SDK文件的选择请参见集成方式。
			var nim = SDK.NIM.getInstance({
				debug: true, // 是否开启日志，将其打印到console。集成开发阶段建议打开。
				appKey: '',
				account: '123',
				token: '',
				db: true, //若不要开启数据库请设置false。SDK默认为true。
				// privateConf: {}, // 私有化部署方案所需的配置
				onroamingmsgs: function(obj) {
					console.log('漫游消息', obj);
					pushMsg(obj.msgs);
				}
			});
		},
		methods: {
			getMessage() {
				this.$H.get("user/chatList", {
					page: this.page,
					uid: this.user.uid
				}).then(res => {
					this.msgList = res.result;
					this.updateChatStatus();
				})
			},
			sendMessage() {
				this.$H.post("user/sendMessage", {
					uid: this.user.uid,
					content: this.mTxt
				}).then(res => {
					if (res.code == 200) {
						this.getMessage();
						this.mTxt = "";
					}
				})
			},
			// 更新阅读状态
			updateChatStatus() {
				this.$H.post("message/updateChatStatus", {
					uid: this.user.uid
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'chat.scss';
</style>

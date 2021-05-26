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
				<view v-if="item.from_uid != user.uid" class="chat-item chat-item-left">
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

	export default {
		data() {
			return {
				mTxt: "",
				msgList: [],
				userInfo:getApp().globalData.userInfo,
				IMData:getApp().globalData.IMData,
				user: {},
				page: 1,
				teamId:''
			}; 
		},
		onLoad(options) {
			this.teamId = options.teamId
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
			async sendMessage() {
				await uniCloud.post('/msgs',{
					from:this.userInfo.accid,
					ope:1,
					to:this.teamId,
					type:0,
					body:JSON.stringify({
					  "msg":this.mTxt
					}),
				}),
				this.msgList.push({avatar:'',content:this.mTxt})
				this.mTxt = ""
				
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

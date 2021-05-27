<template>
	<view>
		<cu-custom bgColor="bg-yellow" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{to}}</block>
		</cu-custom>
		<view class="cu-chat" v-for="msg in msgs">
			<view class="cu-item self">
				<view class="main">
					<view class="content bg-green shadow">
						<view v-if="msg.text.indexOf('Chanllenge_ID:')== -1">
							<text>{{msg.text}}</text>
						</view>
						<view v-else>
							<text>{{msg.text.split('Chanllenge_ID:')[0]}}</text>
							<button class="cu-btn bg-yellow" @click="acceptChallenge()">接受</button>
						</view>
					</view>
				</view>
				<view class="cu-avatar radius"
					style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);">
				</view>
				<view class="date">{{formatDate(msg.time)}}</view>
			</view>
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
				@focus="InputFocus" @blur="InputBlur" v-model="sendContent"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @click="sendMsg">发送</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				sendContent: "",
				to: '',
				msgs:[],
				userInfo:getApp().globalData.userInfo
			};
		},
		onLoad(options) {
			this.to = options.account
			this.getHistoryMsgs()
		},
		methods: {
			acceptChallenge(id){
				uni.navigateTo({
					url:"../challenge/challenge",
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			formatDate(second){
				let date = new Date(second)
				return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
			},
			getHistoryMsgs() {
				let nim = getApp().globalData.nim
				let self = this
				nim.getHistoryMsgs({
					scene: 'p2p',
					to: this.to,
					reverse:true,
					done: function(error, obj) {
						if (!error) {
							uni.showToast({
								title:'云端记录同步成功'
							})
							console.log("msgs: "+obj.msgs);
							self.msgs = obj.msgs
						}else{
							uni.showToast({
								title:error.message,
								icon:'none'
							})
						}
					}
				});
			},
			sendMsg() {
				if (this.sendContent != "") {
					console.log("发送消息："+this.sendContent);
					let nim = getApp().globalData.nim
					nim.sendText({
						scene: 'p2p',
						to: this.to, //收信息人的id
						text: this.sendContent,
						done: (error, msg) => {
							console.log('发送成功！')
							console.log("消息回执："+JSON.stringify(msg))
							this.msgs.push(msg)
							this.sendContent = ''
						}
					})
				}
			},
		}
	}
</script>

<style>
	page {
		padding-bottom: 100upx;
	}
</style>

<template>
	<view class="login">
		<!-- <image class="logo" :src="shareCover"></image> -->
		<text class="txt1">申请获取以下权限</text>
		<text class="txt2">获取你的公开信息（昵称、头像等）</text>
		<u-button type="success"  lang="zh_CN" @click="userLogin" shape="circle">授权登录</u-button>
	</view>
</template>

<script>
	import initNIM from '../../common/init-im.js'
	export default {
		data() {
			return {
				domain: this.$H.domain,
				shareCover:""
			};
		},
		onLoad() {
			this.getSysInfo();
		},
		methods: {
			getSysInfo() {
				this.$H.get("system/miniConfig").then(res => {
					this.shareCover = res.result.intro;
				})
			},
			async userLogin(e) {
				// let userInfo =  await uni.getUserProfile({
				// 	desc:"获取用户信息"
				// })
				let userInfo = {
					nickName:'phz',
					avatarUrl:''
				}
				// userInfo = userInfo[1].userInfo
				getApp().globalData.userInfo = {
					nickName:userInfo.nickName,
					avatarUrl:userInfo.avatarUrl,
					accid : 'phz',
					token:'ecfb3279a5c100106aff93fd083643e4'
				}
				if(JSON.stringify(getApp().globalData.nim) == '{}'){
					let nim = initNIM()
					Object.assign(getApp().globalData.nim,nim)
					// getApp().globalData.nim = 
				}
				uni.showToast({
					title:'登录成功'
				})
				uni.navigateBack({
					
				})
			}, 
			getUserInfo() {
				this.$H.get("user/userInfo").then(res => {
					uni.setStorageSync("userInfo", res.result)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import 'login.css';
</style>

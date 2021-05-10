<template>
	<view>
		<view class="head">
			<block v-if="hasLogin">
				<view class="userinfo" @click="toUcenter">
					<u-avatar :src="userInfo.avatar"></u-avatar>
					<view class="username">
						<text>{{userInfo.username}}</text>
						<text>{{userInfo.intro}}</text>
					</view>
					<text class="iconfont icon-right"></text>
				</view>
			</block>
			<block v-else>
				<view class="btn-login">
					<u-button type="error" shape="circle" @click="toLogin" plain>授权登录</u-button>
				</view>
			</block>
		</view>
		<!--  -->
		<view class="grid">
			<u-grid :col="4" :border="false" style="margin: 20rpx 0;" @click="toNav">
				<u-grid-item index="/pages/my-fans/my-fans">
					<text>{{userInfo.fans}}</text>
					<view class="grid-text">粉丝</view>
				</u-grid-item>
				<u-grid-item index="/pages/my-follow/my-follow">
					<text>{{userInfo.follow}}</text>
					<view class="grid-text">关注</view>
				</u-grid-item>
				<u-grid-item index="/pages/my-dynamic/my-dynamic">
					<text>{{userInfo.post_num}}</text>
					<view class="grid-text">帖子</view>
				</u-grid-item>
				<u-grid-item>
					<text>{{userInfo.integral}}</text>
					<view class="grid-text">积分</view>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- 个人中心 -->
		<view class="grid">
			<view>个人中心</view>
			<u-grid :col="4" :border="false" style="margin: 20rpx 0;" @click="toNav">
				<u-grid-item index="/pages/my-discuss/my-discuss">
					<image class="gn-icon" src="/static/m_1.png"></image>
					<view class="grid-text">我的话题</view>
				</u-grid-item>

				<u-grid-item index="/pages/my-topic/my-topic">
					<image class="gn-icon" src="/static/m_2.png"></image>
					<view class="grid-text">我的池塘</view>
				</u-grid-item>

				<u-grid-item index="/pages/my-dynamic/my-dynamic">
					<image class="gn-icon" src="/static/m_3.png"></image>
					<view class="grid-text">我的动态</view>
				</u-grid-item>

				<u-grid-item index="/pages/my-collection/my-collection">
					<image class="gn-icon" src="/static/m_4.png"></image>
					<view class="grid-text">我的喜欢</view>
				</u-grid-item>

				<u-grid-item index="/pages/shop/index/index">
					<image class="gn-icon" src="/static/m_5.png"></image>
					<view class="grid-text">商城</view>
				</u-grid-item>

				<u-grid-item index="/pages/shop/order-list/order-list">
					<image class="gn-icon" src="/static/m_6.png"></image>
					<view class="grid-text">我的订单</view>
				</u-grid-item>
				<u-grid-item index="/pages/shop/address-list/address-list">
					<image class="gn-icon" src="/static/m_7.png"></image>
					<view class="grid-text">收货地址</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mAd:this.$c.mAd,
				userInfo: "",
				hasLogin: false
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
		},
		onShow() {
			if (uni.getStorageSync("hasLogin")) {
				this.getUserInfo();
				this.hasLogin = true;
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			let imgURL = "https://oss.ymeoo.cn/logo.png";
			return {
				title: this.$c.miniappName,
				path: '/pages/index/index',
				imageUrl: imgURL
			}
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			getUserInfo() {
				this.$H.get("user/userInfo").then(res => {
					this.userInfo = res.result
				})
			},
			toUcenter() {
				uni.navigateTo({
					url: "/pages/user-edit/user-edit"
				})
			},
			toNav(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "my.css";
</style>

<template>
	<view class="nav-bar" :class="[style]" :style="{'navbar-fixed': fixed}">
		<view class="blank" :style="{height: statusBarHeight + 'rpx'}"></view>
		<view class="content" :class="['nav']" :style="{height: navbarHeight +'rpx'}">
			<view class="left" @click="back" v-if="isBack">
				<image style="width: 30rpx;height: 30rpx;" src="../../static/leftArrow.png"></image>
			</view>
			<text class="title">{{title}}</text>
			<view class="right">
				<slot name="image"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	let systemInfo = uni.getSystemInfoSync();
	export default {
		name: 'NavBar',
		props: {
			background: {
				type: String,
				default: () => {
					return '#333333'
				}
			},
			isBack: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			color: {
				type: String,
				default: () => {
					return '#ffffff'
				}
			},
			title: {
				type: String,
				default: () => {
					return '默认标题'
				}
			},
			fixed: {
				type: Boolean,
				default: () => {return true}
			}
		},
		data() {
			return {
				statusBarHeight: systemInfo.statusBarHeight,
				style: "background: #333;width: 100%"
			};
		},
		mounted() {
			console.log('mounted index');
		},
		methods: {
			back() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			}
		},
		computed: {
			navbarHeight() {
				// #ifdef APP-PLUS || H5
				return 100;
				// #endif
				// #ifdef MP
				// return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
				let height = systemInfo.platform == 'ios' ? 120 : 120;
				return height;
				// #endif
			},
			navStyle() {
				let style = `color: ${this.color};background:${this.background}`
				console.log(style,'yamghsj');
				return style
			}
		}
	}
</script>

<style lang="less" scoped>
	.nav-bar {
		width: 100%;
		background-color: #3954a;
		.blank {}
	}

	.navbar-fixed {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 991;
	}
	.nav {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-bottom: 1rpx solid #C0C0C0;
		background-color: rgb(248, 248, 248);
		.title {
			font-size: 32rpx;
			color: #000;
			font-weight: bolder;
		}
		.left {
			position: absolute;
			left: 40rpx;
			image {
				width: 30rpx;
				height: 30rpx;
				color: #007AFF;
			}
		}
		.right {
			position: absolute;
			right: 40rpx;
		}
	}
</style>

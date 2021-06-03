<template>
	<view class="recording">
		<view class="recording-box">
			<image src="../../../static/radio_loading.gif" mode=""></image>
			<text>正在录音</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Recording'
	}
</script>

<style lang="less" scoped>
	.recording {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}
	.recording-box {
		margin: 0 auto;
		margin-top: 100%;
		background: rgba(0,0,0,0.1);
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		image {
			width: 50rpx;
			height: 50rpx;
		}
		text {
			color: #FFFFFF;
			font-size: 26rpx;
			margin-top: 20rpx;
		}
	}
</style>

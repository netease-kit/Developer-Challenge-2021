<template>
	<view>
		<cu-custom bgColor="bg-yellow">
			<block slot="content">我的</block>
		</cu-custom>
		<div class="info">
			<img src="https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/09/75/97_avatar_max.jpg" alt="">
			<p class="info_name"><span>{{userInfo.username}}</span> <i class="iconfont icon-nan"></i></p>
			<p class="info_text">简介</p>
			<view class="flex">
				<div class="info_item">
					<p>0</p>
					<p>关注</p>
				</div>
				<div class="info_item">
					<p>0</p>
					<p>粉丝</p>
				</div>
				<div class="info_item">
					<p>0</p>
					<p>动态</p>
				</div>
			</view>
		</div>

		<view class="cu-list menu card-menu margin-top">
			<view class="cu-item"  v-for="item in funcList">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-grey">{{item}}</text>
				</button>
			</view>
			<view class="cu-item margin-top">
				<navigator class="content" hover-class="none" url="../sign-in/sign-in" open-type="navigate">
					<text class="cuIcon-discoverfill text-orange"></text>
					<text class="text-red">退出登录</text>
				</navigator>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				funcList: ['收藏', '互动', '设置', '反馈', '关于'],
				userInfo:{username:''}
			}
		},
		methods: {

		},
		onLoad() {
			let userInfo = getApp().globalData.userInfo
			this.userInfo = userInfo?userInfo:{username:''}
		}
	}
</script>

<style>
	header {
		/* 头部包含背景图 */
		background-color: #ffda19;
		width: 100%;
		/* overflow: hidden; */

		height: 160px;
	}

	header>p {
		/* 放我的和关机图标 */
		height: 50px;
		line-height: 50px;
	}

	header>p>span:nth-of-type(1) {
		display: inline-block;
		padding-left: 16px;
		font-size: 18px;
		font-weight: bold;
	}

	header>p>span:nth-of-type(2) {
		display: inline-block;

		padding-right: 16px;
	}

	header>p>span:nth-of-type(2)>i {
		font-size: 18px;
		font-weight: bold;
	}


	.info {
		/* 存放个人信息的 */
		width: calc(100% - 32px);
		background-color: #FFFFFF;
		margin-left: 16px;
		/* margin-top: -48px; */

		border-radius: 8px;
		box-shadow: 0 0 6px rgba(255, 218, 25, 0.6);
	}

	.info>img {
		width: 66px;
		height: 66px;
		border-radius: 66px;
		margin: 0 auto;
		display: block;
		margin-top: 10px;
		border: 1px solid #ffda19;
	}

	.info_name {
		text-align: center;
		font-size: 16px;
		color: #444444;
		height: 30px;
		line-height: 30px;
	}

	.info_text {
		text-align: center;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #6F6F6F;
	}

	.info_item {
		width: calc(100% / 3);

		text-align: center;
		padding: 4px 0;
	}

	.info_item>p:nth-of-type(1) {
		font-size: 12px;
	}

	.info_item>p:nth-of-type(2) {
		font-size: 14px;
		color: #6F6F6F;
	}

	.info_item:nth-of-type(1) {
		border-radius: 0 0 0 8px;
	}

	.info_item:nth-last-of-type(1) {
		border-radius: 0 0 8px 0;
	}
</style>

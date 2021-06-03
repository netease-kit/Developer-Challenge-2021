<template>
	<view class="consulation">
		<nav-bar :title="`聊天${msgNm !== 0 ? `(${msgNm})` : ''}`" :isBack="true"></nav-bar>
		<view class="consulation-list">
			<view class="per" @click="chat(per)" v-for="(per,index) in friendList" :key="index">
				<image class="avatar" :src="per.imgUrl" mode=""></image>
				<view class="msg">
					<view class="msg-top">
						<view class="name">{{per.name}}</view>
						<text class="date">2021/2/16</text>
					</view>
					<view class="msg-cont">
						{{per.msg}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '../../components/nav-bar/nav-bar.vue'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				msgNm: 10,
				friendList: [{
						name: '奔跑的蜗牛',
						imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3815912799,3611734702&fm=26&gp=0.jpg',
						id: '',
						msg: '今天怎么样'
					},
					{
						name: '夏天的风',
						imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1690879817,3770930490&fm=26&gp=0.jpg',
						id: '',
						msg: '背景换一个'
					},
					{
						name: '消失的爱人',
						imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=116984941,698239247&fm=26&gp=0.jpg',
						id: '',
						msg: '新年快乐'
					}
				]
			}
		},
		mounted() {
			this.getNum()
		},
		methods: {
			chat(id) {
				uni.navigateTo({
					url: `./consulation?id=${id}`,
					animationDuration: 300,
					animationType: 'pop-in'
				})
			},
			getNum() {
				this.msgNm = parseInt(Math.random() * 10)
			}
		}
	}
</script>

<style lang="less" scoped>
	.consulation {
		width: 100%;
		min-height: 100%;
		background-color: #F3F3F3;
	}

	.consulation-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
		box-sizing: border-box;

		.per {
			width: 100%;
			height: 120rpx;
			border-bottom: 1rpx solid #ccc;
			display: flex;
			flex-direction: row;
			align-items: center;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				display: inline-block;
			}

			.msg {
				flex: 1;
				display: flex;
				flex-direction: column;

				.msg-top {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					.name {
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
					}

					.date {
						font-size: 24rpx;
						color: #666;
					}
				}

				.msg-cont {
					font-size: 25rpx;
					color: #666;
				}
			}
		}
	}
</style>

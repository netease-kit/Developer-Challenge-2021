<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="搜索主播" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			duration="500">
			<swiper-item v-for="(item,index) in swiperItems" :key="index">
				<image :src="item.imgURL" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="cu-list grid col-4 no-border">
			<view class="cu-item" v-for="(item,index) in petKindList" :key="index">
				<view class="iconfont text-lg" :class="[item.icon,item.color]">
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<view class="cu-list grid col-2 no-border">
			<view class="cu-item" v-for="(item,index) in liveList" :key="index">
				<navigator url="../live/live">
					<view class="cu-card case">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item.imgURL" mode="scaleToFill" style="height: 250rpx;"></image>
								<view class="cu-tag bg-green" v-if="item.isHot">热门</view>
							</view>
							<view class=" flex">
								<text>{{item.title}}</text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				liveList: [{
					title: '快来看看小玫',
					imgURL: '../../static/live1.png',
					isHot: true
				}, {
					title: '小可爱我要翻身了',
					imgURL: '../../static/live2.png',
					isHot: false
				}, {
					title: '让我瞅瞅你再看啥',
					imgURL: '../../static/live3.png',
					isHot: false,
				}, {
					title: '24小时直播憨憨',
					imgURL: '../../static/live4.png',
					isHot: true
				}],
				swiperItems: [{
						text: '',
						imgURL: '../../static/pet1.png'
					},
					{
						text: '',
						imgURL: '../../static/pet2.png'
					},
					{
						text: '',
						imgURL: '../../static/pet3.png'
					}
				],
				petKindList: [{
						name: '鸟',
						icon: 'icon-bird',
						color: 'text-green'
					}, {
						name: '鼠',
						icon: 'icon-zhu',
						color: 'text-yellow'
					}, {
						name: '猫',
						icon: 'icon-mao',
						color: 'text-blue'
					},
					{
						name: '羊驼',
						icon: 'icon-yangtuo',
						color: 'text-brown'
					}, {
						name: '兔子',
						icon: 'icon-tuzi',
						color: 'text-purple'
					}, {
						name: '鼠',
						icon: 'icon-shu',
						color: 'text-cyan'
					},
					{
						name: '狗',
						icon: 'icon-gougouchushou',
						color: 'text-yellow'
					}, {
						name: '龙猫',
						icon: 'icon-longmao-',
						color: 'text-pink'
					}
				]
			}
		},
		onLoad() {},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

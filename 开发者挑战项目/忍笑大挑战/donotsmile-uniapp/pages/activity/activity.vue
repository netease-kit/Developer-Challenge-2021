<template>
	<view>
		<cu-custom bgColor="bg-yellow">
			<block slot="content">动态</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-yellow nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in ['热门','关注']"
				:key="index" @tap="bindTabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view class="cu-card bg-white padding-tb" v-for="(item,index) in activityList" :key="index">
			<view class="flex ">
				<view class="cu-avatar round margin-left"
					style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);">
				</view>
				<view class="margin-left">
					<view>{{item.name}}</view>
					<view>{{item.timestamp}}</view>
				</view>
			</view>
			<view class="margin-lr">
				<text>{{item.content}}</text>
				<view class="bg-white padding">
					<view class="grid col-4 grid-square">
						<view class="bg-img" v-for="(cover,index) in item.coverList" :key="index" :style="[{ backgroundImage:'url(' + cover + ')' }]"></view>
					</view>
				</view>
				<view class="flex justify-around">
					<text >挑战平均分数 {{item.score}}</text>
					<view>
						<text class="cuIcon cuIcon-message" style="font-size: 1.6em;"></text>
						<text>99</text>
					</view>
					<navigator url="../challenge/challenge">
						<button class="cu-btn bg-orange round" >挑战</button>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activityList: [{
					name: '胡Sir',
					avatar_url: '',
					content: '哈哈哈哈哈哈哈哈～～～～这也太好笑了吧！',
					timestamp:'2021-05-01',
					coverList:['./static/screenshot.png','./static/screenshot.png'],
					score:8.5
				}],
				TabCur: '',
				scrollLeft: ''
			}
		},
		methods: {
			bindTabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>

</style>

<template>
	<view>
		<view class="search-wrap">
			<u-search placeholder="搜索池塘" v-model="keyword" @search="search" :show-action="false"></u-search>
		</view>
		<view class="container">
			<!-- 池塘分类 -->
			<view class="class-wrap">
				<navigator :url="'/pages/topic-cate-list/topic-cate-list?class_id='+topicClassTop[0].cate_id" class="first-calss">
					<image class="img-wh100" mode="aspectFill" :src="topicClassTop[0].cover_image"></image>
					<text>{{topicClassTop[0].name}}</text>
				</navigator>
				<view class="class-right">
					<navigator :url="'/pages/topic-cate-list/topic-cate-list?class_id='+item.cate_id" class="class-item" v-if="index > 0"
					 v-for="(item,index) in topicClassTop" :key="index">
						<image class="img-wh100" mode="aspectFill" :src="item.cover_image"></image>
						<text>{{item.name}}</text>
					</navigator>
					<navigator url="/pages/topic-cate-list/topic-cate-list" class="class-item">
						<image class="img-wh100" mode="aspectFill" src="https://oss.ymeoo.cn/20201128160653507763323.jpg"></image>
						<text>所有分类</text>
					</navigator>
				</view>
			</view>
			<!-- 池塘列表 -->
			<view style="margin-bottom: 20rpx;">
				<u-tabs :list="tabList" bg-color="#f5f5f5" active-color="#616161" inactive-color="#999" :current="current" @change="tabChange"></u-tabs>
			</view>

			<!-- 推荐 -->
			<view v-show="current == 0" style="border-radius: 10rpx;overflow: hidden;">
				<list :list="IMData.teams" :loadStatus="loadStatus"></list>
			</view>

			<!-- 热议话题 -->
			<view class="f-wrap" v-show="current == 1">
				<discuss-list :list="disList" :loadStatus="loadStatus"></discuss-list>
			</view>
		</view>
	</view>
</template>

<script>
	import list from '../../components/topic-list/topic-list.vue';
	import disList from '../../components/discuss-list/discuss-list.vue';
	export default {
		components: {
			list
		},
		data() {
			return {
				keyword: "",
				myTopic: [],
				current: 0,
				tabList: [{
						name: "推荐"
					},
					{
						name: "热议话题"
					}
				],
				IMData:{teams:[]},
				page: 1,
				loadStatus: "loadmore",
				topicClassTop: [],
				disList: []
			};
		},
		onShow() {
			this.IMData = getApp().globalData.IMData
			this.getTopClassList()
			this.getTopicList()
			this.getDisList()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.topicList = [];
			this.topicClassTop = [];
			this.disList = [];
			this.getTopicList();
			this.getTopClassList();
			this.getDisList();
		},
		onReachBottom() {
			this.page++;
			this.getTopicList();
		},
		methods: {
			search() {
				uni.navigateTo({
					url: "/pages/topic-list/topic-list?keyword=" + this.keyword
				})
			},
			// 热议话题列表
			getDisList() {
				this.loadStatus = "loading";
				this.$H.get("discuss/list", {
					"order": "hot"
				}).then(res => {
					this.disList = res.result.data;
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			},
			//获取推荐池塘分类
			getTopClassList() {
				this.$H.get("topic/topicClassTop").then(res => {
					this.topicClassTop = res.result;
				})
			},
			tabChange(index) {
				this.current = index;
			},
			getTopicList() {
				this.loadStatus = "loading";
				this.$H.post('topic/list', {
					class_id: this.topicClassId,
					page: this.page
				}).then(res => {
					this.topicList = this.topicList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}

					uni.stopPullDownRefresh();
				})
			},
		}
	}
</script>

<style lang="scss">
	@import 'more.css';
</style>

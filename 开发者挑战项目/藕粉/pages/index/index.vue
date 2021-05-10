<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="false" :border-bottom="false">
			<view class="tab-box">
				<u-tabs-swiper name="tab_name" ref="uTabs" bg-color="#fff" :list="tabs" active-color="#616161"
					:current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
		</u-navbar>
		<!-- swiper tabs content -->
		<swiper class="swiper-body" :current="swiperCurrent" @transition="transition"
			@animationfinish="animationfinish">
			<!-- 关注 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y class="body-scroll-view" @scrolltolower="onreachBottom">
					<post-list :list="tabs[current].postList" :loadStatus="loadStatus"></post-list>
				</scroll-view>
			</swiper-item>
			<!-- 推荐 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y class="body-scroll-view" @scrolltolower="onreachBottom">
					<!-- 轮播图 -->
					<view v-if="swiperList.length > 0" class="container">
						<u-swiper name="img" :list="swiperList" @click="onSwiper" border-radius="20" mode="none"
							:effect3d="true">
						</u-swiper>
					</view>
					<!-- 热门话题 -->
					<view class="block-title">
						<text class="left">热门话题</text>
						<navigator url="/pages/discuss-list/discuss-list" hover-class="none" class="right">
							<text>查看更多</text>
							<u-icon name="arrow-right"></u-icon>
						</navigator>
					</view>
					<scroll-view :scroll-x="true">
						<view class="dis-hot">
							<navigator :url="'/pages/discuss/discuss?id='+item.id" class="dis-item"
								v-for="(item,index) in topDisList" :key="index">
								<text class="td">#</text>
								<text>{{item.title}}</text>
							</navigator>
						</view>
					</scroll-view>
					<!-- 热门池塘 -->
					<view class="block-title">
						<text class="left">热门池塘</text>
						<navigator url="/pages/topic-cate-list/topic-cate-list" hover-class="none" class="right">
							<text>查看更多</text>
							<u-icon name="arrow-right"></u-icon>
						</navigator>
					</view>
					<scroll-view :scroll-x="true">
						<view class="topic-hot">
							<navigator :url="'/pages/topic-detail/topic-detail?id='+item.id" class="topic-item"
								v-for="(item,index) in topTopicList" :key="index">
								<image mode="aspectFill" class="cover-img" :src="item.cover_image"></image>
								<text>{{item.topic_name}}</text>
							</navigator>
						</view>
					</scroll-view>
					<!-- 热门精选 -->
					<view class="block-title">
						<text class="left">热门精选</text>
						<view class="right">
							<!-- <text>为你推荐更好的内容</text> -->
						</view>
					</view>
					<post-list :list="tabs[current].postList" :loadStatus="loadStatus"></post-list>
				</scroll-view>
			</swiper-item>
			<!-- 同城 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y class="body-scroll-view" @scrolltolower="onreachBottom">
					<view class="post-waterfall">
						<post-waterfall ref="waterfall" :list="tabs[2].postList" :loadStatus="loadStatus">
						</post-waterfall>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 发布按钮 -->
		<navigator url="/pages/plus-post/plus-post" class="plus-box">
			<u-icon color="#fff" name="plus"></u-icon>
		</navigator>
	</view>
</template>

<script>
	var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
	import postList from '../../components/post-list/post-list.vue';
	import postWaterfall from '../../components/post-waterfall/post-waterfall.vue';
	export default {
		components: {
			postList,
			postWaterfall
		},
		data() {
			return {
				swiperList: [],
				tabs: [{
						tab_name: '关注',
						postList: []
					}, {
						tab_name: '推荐',
						postList: []
					},
					{
						tab_name: uni.getStorageSync("district") || '',
						postList: []
					}
				],
				current: 1,
				swiperCurrent: 1,
				videoCurrent: 0,
				loadStatus: "loadmore",
				storageTopicList: [],
				page: 1,
				pageNear: 1,
				pageFllow: 1,
				shareCover: "",
				topTopicList: [],
				topDisList: []
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.$c.miniappName,
				path: '/pages/index/index',
				imageUrl: this.shareCover
			}
		},
		onLoad() {
			this.getLocation();
			this.getPostList();
			this.storageTopicList = uni.getStorageSync("topicList");

			this.getSysInfo();
			this.getLinkList();
			this.getTopTopic();
			this.getDisTopic();
		},
		onPullDownRefresh() {
			this.page1 = 1;
			this.page2 = 1;
			this.page3 = 1;

			this.tabs.postList = [];
			this.getPostList();
			uni.stopPullDownRefresh();

			this.$refs.waterfall.clear();
			this.nearbyPostList = [];
			this.getNearbyPost();
		},
		methods: {
			// 处理点击轮播图跳转
			onSwiper(index) {
				uni.navigateTo({
					url: "/pages/webview/webview?src=" + this.swiperList[index].url
				})
			},
			// 获取推荐话题
			getDisTopic() {
				this.$H.get("discuss/list", {
					top_type: 1
				}).then(res => {
					this.topDisList = res.result.data;
				})
			},
			// 获取推荐池塘
			getTopTopic() {
				this.$H.get("topic/list", {
					top_type: 1
				}).then(res => {
					this.topTopicList = res.result.data;
				})
			},
			// 获取轮播图
			getLinkList() {
				this.$H.post("link/list", {
					type: 3,
					page: 1
				}).then(res => {
					this.swiperList = res.result.data;
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;

				this.changeGetData(current)
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if (this.current === 0) {
					this.pageFllow++
					// this.getFollowPost();
					this.getPostList();
				}
				if (this.current === 1) {
					this.page++
					this.getPostList();
				}
				if (this.current === 2) {
					this.pageNear++
					this.getNearbyPost();
				}
			},
			getNearbyPost() {
				this.loadStatus = "loading";
				let location = uni.getStorageSync("location_info");
				this.$H.get("post/nearbyPost", {
					lat: location.latitude,
					lng: location.longitude,
					page: this.pageNear
				}).then(res => {
					this.tabs[2].postList = this.tabs[2].postList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			},
			getLocation() {
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						var qqmapsdk = new QQMapWX({
							key: 'BMYBZ-GV464-JESUX-DZL53-Z6LNH-U6BIA' // 必填
						});

						qqmapsdk.reverseGeocoder({
							location: res,
							success: function(res2) {
								that.tabs[2].tab_name = res2.result.ad_info.district;
								uni.setStorageSync("district", res2.result.ad_info.district);
							},
							fail: function(error) {
								// console.error(error);
							},
							complete: function(res) {
								// console.log(res);
							}
						})

						uni.setStorageSync("location_info", res);
						that.showOpenLocation = false;
					}
				});
			},
			getSysInfo() {
				this.$H.get("system/miniConfig").then(res => {
					this.shareCover = res.result.intro;
				})
			},
			changeGetData(index) {
				if (this.tabs[index].postList.length == 0) {
					if (index == 0) {
						// this.getFollowPost();
						this.getPostList();
					} else if (index === 2) {
						this.getNearbyPost();
					} else {
						this.getPostList();
					}
				}
			},

			// 获取帖子列表
			getPostList() {
				this.loadStatus = "loading";

				let type = 1;
				let page = this.page;

				this.$H.get('post/list', {
					type: type,
					page: page
				}).then(res => {
					this.tabs[this.current].postList = this.tabs[this.current].postList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				});
			},
			// 获取用户关注帖子
			getFollowPost() {
				this.loadStatus = "loading";
				this.$H.post('post/followUserPost', {
					page: this.pageFllow
				}).then(res => {
					this.tabs[this.current].postList = this.tabs[this.current].postList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "index.scss";
</style>

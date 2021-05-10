<template>
	<view class="wrap">
		<view style="position: absolute;">
			<u-navbar :custom-back="onBack" back-icon-color="#fff" :background="background" :border-bottom="false"></u-navbar>
		</view>
		<view class="head">
			<image mode="aspectFill" class="bg" :src="topicInfo.bg_image"></image>
			<view class="head-c">
				<text class="name">{{topicInfo.topic_name}}</text>
				<view class="count">
					<text>{{topicInfo.user_count}}人已加入</text>
					<text>{{topicInfo.post_count}}篇内容</text>
					<u-button class="btn margin-left" :custom-style="btnStyle" @click="jumpAddDis" type="default">创建话题</u-button>
					<block v-if="topicInfo.is_join">
						<u-button class="btn" :custom-style="btnStyle" @click="outTopic">退出池塘</u-button>
					</block>
					<block v-else>
						<u-button class="btn" :custom-style="btnStyle" type="error" @click="joinTopic">加入池塘</u-button>
					</block>
				</view>
			</view>
		</view>
		<!-- 公告 -->
		<view class="member-wrap" @click="noticeShow =true">
			<view class="member-wrap-head">
				<view class="notice-box">公告<text class="notice-txt">{{topicInfo.description || "暂无公告"}}</text></view>
				<u-icon class="icon" name="arrow-right"></u-icon>
			</view>
		</view>
		<!-- 公告弹窗 -->
		<u-popup v-model="noticeShow" mode="bottom" :closeable="true" height="60%">
			<view class="popup-notice-wrap">
				<view class="popup-notice-head">公告</view>
				<text>{{topicInfo.description}}</text>
			</view>
		</u-popup>
		<!-- 管理员 -->
		<!-- 	<view class="member-wrap" v-if="topicInfo.member_list.length > 0">
			<view class="member-wrap-head">
				<text>管理员</text>
				<u-icon class="icon" name="arrow-right"></u-icon>
			</view>
			<u-grid :col="5" :border="false" @click="jump">
				<u-grid-item v-for="(item,index) in topicInfo.member_list" :key="index" :index="item.uid">
					<u-avatar class="avatar" :src="item.avatar"></u-avatar>
					<view class="grid-text">{{item.username | substr}}</view>
				</u-grid-item>
			</u-grid>
		</view> -->
		<view class="tabs-box">
			<view class="tab-left">
				<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
			</view>
		</view>
		<view v-show="current == 0">
			<post-list :showTopic="false" :handle="true" :uid="topicInfo.uid" :list="postNews" :loadStatus="loadStatus"></post-list>
		</view>
		<view v-show="current == 1">
			<post-list :showTopic="false" :handle="true" :uid="topicInfo.uid" :list="postHot" :loadStatus="loadStatus"></post-list>
		</view>
		<view v-show="current == 2">
			<dis-list :list="topicInfo.discuss_list"></dis-list>
		</view>
		<view v-show="current == 3">
			<user-list :list="topicInfo.member_list"></user-list>
		</view>
		<!-- 发布按钮 -->
		<view @click="onTrigger" class="plus-box">
			<u-icon color="#fff" name="plus"></u-icon>
		</view>
	</view>
</template>

<script>
	import postList from '../../components/post-list/post-list.vue';
	import disList from '../../components/discuss-list/discuss-list.vue';
	import userList from '../../components/user-list/user-list.vue';
	export default {
		components: {
			postList,
			disList,
			userList
		},
		data() {
			return {
				current: 0,
				tabList: [{
						name: '最新'
					}, {
						name: '最热'
					}, {
						name: '话题'
					},
					{
						name: '圈友'
					}
				],
				noticeShow: false,
				btnStyle: {
					marginRight: 0,
					width: '150rpx',
					fontSize: '12px',
					height: '60rpx',
					lineHeight: '60rpx'
				},
				topicId: 0,
				topicInfo: {
					member_list: [],
					discuss_list: []
				},
				postHot: [],
				postNews: [],
				loadStatus: "loading",
				page1: 1,
				page2: 1,
				background: {
					backgroundColor: 'unset'
				}
			};
		},
		onLoad(options) {
			this.topicId = options.id;
		},
		onShow() {
			this.page1 = 1;
			this.page2 = 1;
			this.postHot = [];
			this.postNews = [];
			this.getTopicInfo();
			this.getPostList();
		},
		onReachBottom() {
			if (this.current == 0) {
				this.page1++;
			}

			if (this.current == 1) {
				this.page2++;
			}

			this.getPostList();
		},
		onPullDownRefresh() {
			if (this.current == 0) {
				this.page1 = 1;
				this.postNews = [];
			}

			if (this.current == 1) {
				this.page2 = 1;
				this.postHot = [];
			}

			this.getPostList();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.topicInfo.topic_name + '-' + this.topicInfo.description,
				path: '/pages/topic-detail/topic-detail?id=' + this.topicId,
				imageUrl: this.topicInfo.bg_image
			}
		},
		onShareTimeline() {
			return {
				title: this.topicInfo.topic_name + '-' + this.topicInfo.description,
				imageUrl: this.topicInfo.bg_image,
				query: "id=" + this.topicId
			}
		},
		filters: {
			substr: function(e) {
				return e.substr(0, 5);
			}
		},
		methods: {
			onBack() {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			tabsChange(index) {
				this.current = index;
			},
			onTrigger() {
				if (!this.topicInfo.is_join) {
					this.$u.toast('请先加入池塘');
					return;
				}

				uni.navigateTo({
					url: "/pages/plus-post/plus-post?topic_id=" + this.topicId + "&topic_name=" + this.topicInfo.topic_name
				})
			},
			jump(uid) {
				uni.navigateTo({
					url: "/pages/ucenter/ucenter?uid=" + uid
				})
			},
			joinTopic() {
				this.$H.post('topic/joinTopic', {
					id: this.topicId
				}).then(res => {
					if (res.code === 200) {
						this.topicInfo.is_join = true
					}
				});
			},
			outTopic() {
				this.$H.post('topic/userTopicDel', {
					id: this.topicId
				}).then(res => {
					if (res.code === 200) {
						this.topicInfo.is_join = false
					}
				});
			},
			getTopicInfo() {
				this.$H.get('topic/detail', {
					id: this.topicId
				}).then(res => {
					this.topicInfo = res.result;
				});
			},
			jumpAddDis() {
				uni.navigateTo({
					url: "/pages/discuss-add/discuss-add?topicId=" + this.topicId
				})
			},
			getPostList() {
				this.loadStatus = "loading";
				let page = this.page1;
				let order = "id desc";

				if (this.current == 1) {
					page = this.page2;
					order = "read_count desc";
				}

				this.$H.get('post/list', {
					topic_id: this.topicId,
					page: page,
					order: order
				}).then(res => {
					if (this.current == 0) {
						this.postNews = this.postNews.concat(res.result.data);
					}

					if (this.current == 1) {
						this.postHot = this.postHot.concat(res.result.data);
					}

					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore";
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
	@import 'topic-detail.scss';
</style>

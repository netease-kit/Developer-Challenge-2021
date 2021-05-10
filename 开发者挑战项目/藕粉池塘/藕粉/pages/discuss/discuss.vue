<template>
	<view>
		<view class="discussInfo">
			<view class="user">
				<u-avatar class="avatar" :src="discussInfo.userInfo.avatar"></u-avatar>
				<view class="user-c">
					<text>{{discussInfo.userInfo.username}}</text>
					<text>发起</text>
				</view>
			</view>
			<view class="count">
				<text>{{discussInfo.post_count}} 篇内容</text>
				<text>{{discussInfo.read_count}} 次浏览</text>
			</view>
			<view class="discuss-desc">{{discussInfo.introduce}}</view>
		</view>
		<post-list :list="postList" :loadStatus="loadStatus"></post-list>
		<!-- 发布按钮 -->
		<view @click="onTrigger" url="/pages/plus-post/plus-post" class="plus-box">
			<u-icon color="#fff" name="plus"></u-icon>
		</view>
	</view>
</template>

<script>
	import postList from '../../components/post-list/post-list.vue';
	export default {
		components: {
			postList
		},
		data() {
			return {
				disId: 0,
				loadStatus: "loading",
				postList: [],
				discussInfo: {
					userInfo: {}
				},
				page: 1
			};
		},
		onLoad(options) {
			this.disId = options.id;
			this.getDiscussInfo();
			this.getPostList();

			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.discussInfo.introduce,
				path: '/pages/discuss/discuss?id=' + this.disId,
			}
		},
		onShareTimeline() {
			let imgURL = "";
			return {
				title: this.discussInfo.introduce,
				imageUrl: imgURL,
				query: 'id=' + this.disId
			}
		},
		methods: {
			onTrigger() {
				uni.navigateTo({
					url: "/pages/plus-post/plus-post?topic_id=" + this.discussInfo.topic_id + "&discuss_id=" + this
						.discussInfo
						.id
				})
			},
			getDiscussInfo() {
				this.$H.get('discuss/detail', {
					id: this.disId
				}).then(res => {
					this.discussInfo = res.result;
				})
			},
			getPostList() {
				this.loadStatus = "loading";
				this.$H.get('post/list', {
					dis_id: this.disId,
					page: this.page
				}).then(res => {
					this.postList = this.postList.concat(res.result.data);

					if (res.current_page === res.last_page || res.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import 'discuss.css';
</style>

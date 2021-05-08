<template>
	<view class="container">
		<view class="title">{{articleDetail.title}}</view>
		<view class="author">
			<text class="name">{{articleDetail.userInfo.username}}</text>
			<text class="time">{{time | timeFrom}}</text>
		</view>
		<u-parse :html="articleDetail.content" :selectable="true"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleDetail: {},
				articleId: "",
				time: ""
			};
		},
		onLoad(options) {
			this.articleId = options.id;
			this.time = options.time;
			this.getArticleDetail();
		},
		methods: {
			getArticleDetail() {
				this.$H.get('post/detail', {
					id: this.articleId
				}).then(res => {

					res.result.comment_list.data.forEach(item => {
						item.content = this.entitiesToUtf16(item.content);
					})

					this.articleDetail = res.result;
					this.articleMsgState();
				});
			}, 
			// 更新阅读状态
			articleMsgState() {
				this.$H.post("message/articleMsgState", {
					post_id: this.articleId
				})
			},
			onShareAppMessage(res) {
				if (res.from === 'button') { // 来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: this.articleDetail.title,
					path: '/pages/topic-detail/topic-detail?id=' + this.articleId,
					// imageUrl: this.topicInfo.bg_image
				}
			},
			onShareTimeline() {
				return {
					title: this.articleDetail.title,
					// imageUrl: this.topicInfo.bg_image,
					query: "id=" + this.articleId
				}
			}
		}
	}
</script>
<style>
	page {
		background-color: #FFFFFF;
	}
</style>
<style lang="scss" scoped>
	.container {
		padding: 30rpx;
		line-height: 2;
	}

	.title {
		font-size: 40rpx;
		color: #000;
		margin-bottom: 20rpx;
	}

	.author {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		.name {
			color: #2979FF;
		}

		.time {
			margin-left: 20rpx;
			color: #999;
			font-size: 20rpx;
		}
	}
</style>

<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<navigator :url="'/pages/topic-detail/topic-detail?id='+item.id">
				<view class="topic-item">
					<u-image width="120rpx" height="120rpx" border-radius="10rpx" :src="item.cover_image"></u-image>
					<view style="margin-left: 10rpx;margin-right: 20rpx;">
						<view>{{item.topic_name}}</view>
						<text class="user-count">{{item.description.substring(0,20)}}</text>
					</view>
					<view class="num">
						<text class="user-count">{{item.user_count}}个成员</text>
						<text class="post-count">{{item.post_count}}个作品</text>
					</view>
				</view>
			</navigator>
		</block>
		<!-- 加载状态 -->
		<block v-if="loadStatus != 'none'">
			<block v-if="list.length > 0">
				<view style="margin: 30rpx;">
					<u-loadmore :status="loadStatus" bgColor="#f5f5f5" />
				</view>
			</block>
			<block v-else>
				<u-empty margin-top="100" text="暂无相关池塘" mode="favor"></u-empty>
			</block>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			loadStatus: String
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.topic-item {
		display: flex;
		background-color: #fff;
		padding: 20rpx;
		border-bottom: 1px solid #f5f5f5;

		.num {
			margin-left: auto;
			display: flex;

			text {
				white-space: nowrap;
			}
		}

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 10rpx;
			margin-right: 10rpx;
		}

		.btn-gz {
			margin-left: auto;
			margin-right: 20rpx;
		}

		text {
			font-size: 10px;
			color: #999;
			margin: 0 10rpx;
		}
	}
</style>

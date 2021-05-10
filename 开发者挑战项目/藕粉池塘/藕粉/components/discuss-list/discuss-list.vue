<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<navigator :url="'/pages/discuss/discuss?id=' + item.id">
				<view class="discuss-item">
					<text class="title">{{item.title}}</text>
					<text class="desc">{{item.introduce}}</text>
					<view class="count">
						<text>浏览 {{item.read_count}}</text>
					</view>
				</view>
			</navigator>
		</block>
		<!-- 加载状态 -->
		<block v-if="list.length === 0 && loadStatus == 'nomore'">
			<u-empty margin-top="100" text="暂无内容" mode="favor"></u-empty>
		</block>
		<block v-else>
			<u-loadmore v-if="list.length > 10" bg-color="#f5f5f5" :status="loadStatus" />
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			loadStatus: {
				type: String,
				default: 'loading'
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.discuss-item {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		border-bottom: 1px solid #f5f5f5;
		background-color: #FFFFFF;
	}

	.title {
		margin-bottom: 20rpx;
	}

	.desc {
		font-size: 12px;
		color: #616161;
	}

	.count {
		font-size: 12px;
		color: #999;
		margin-top: 20rpx;
	}
	.count text:nth-child(1){
		margin-right: 20rpx;
	}
</style>

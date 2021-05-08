<template>
	<view>
		<view class="u-search-box">
			<u-search placeholder="输入名称搜索池塘" v-model="keyword" @change="getTopicList" :show-action="false"></u-search>
		</view>
		<u-grid :col="3" :border="false" @click="toTopic">
			<u-grid-item :index="item2.id" v-for="(item2, index2) in topicList" :key="index2">
				<u-image border-radius="10" width="200rpx" height="260rpx" :src="item2.cover_image"></u-image>
				<view class="grid-text">{{item2.topic_name}}</view>
			</u-grid-item>
		</u-grid>
		<!-- 加载状态 -->
		<block v-if="topicList.length === 0 && loadStatus == 'nomore'">
			<u-empty text="暂无相关池塘" mode="favor"></u-empty>
		</block>
	</view>
</template>

<script>
	let page;
	export default {
		data() {
			return {
				current: 0,
				topicClssList: [],
				topicList: [],
				loadStatus: "nomore",
				keyword: ""
			};
		},
		onLoad(options) {
			this.keyword = options.keyword;
		},
		methods: {
			getTopicList() {
				this.loadStatus = "loading";
				this.topicList = [];
				this.$H.get('topic/list', {
					keyword: this.keyword
				}).then(res => {
					this.topicList = this.topicList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			},
			toTopic(id) {
				uni.navigateTo({
					url: "/pages/topic-detail/topic-detail?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	@import 'topic-list.css';
</style>

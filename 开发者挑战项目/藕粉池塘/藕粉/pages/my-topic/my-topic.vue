<template>
	<view class="container">
		<topic-list :list="IMData.teams" :loadStatus="loadStatus"></topic-list>

		<!-- 创建池塘按钮 -->
		<view style="height: 120rpx;"></view>
		<view class="f-fixed">
			<u-button @click="jump" class="fixed-bottom" type="error" shape="circle">
				<u-icon name="plus"></u-icon>
				<text>创建池塘</text>
			</u-button>
		</view>
	</view>
</template>

<script>
	import topicList from '../../components/topic-list/topic-list.vue';
	export default {
		components: {
			topicList
		},
		data() {
			return {
				topicList: [],
				loadStatus: "loading",
				page: 1,
				creatingPoolName: '',
				intro: '',
				userInfo: '',
				IMData: {
					teams:[]
				}
			}
		},
		onShow() {
			this.userInfo = getApp().globalData.userInfo
			this.IMData = getApp().globalData.IMData
			console.log(this.IMData.teams);
		},
		onReachBottom() {
			this.page++;
			this.getMyTopic();
		},
		methods: {
			getMyTopic() {
				this.loadStatus = "loading";
				this.$H.get("topic/myCreateTopic", {
					page: this.page
				}).then(res => {
					this.topicList = this.topicList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			},
			jump() {
				uni.navigateTo({
					url: '/pages/topic-add/topic-add'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
</style>

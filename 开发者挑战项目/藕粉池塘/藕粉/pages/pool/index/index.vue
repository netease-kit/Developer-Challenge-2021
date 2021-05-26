<template>
	<view>
		<view class="container head">
			<u-search class="search" placeholder="搜索" :show-action="false" 
				v-model="searchedPoolId"></u-search>
				<button class="cu-btn round bg-purple" @click="joinPool"
					><text class="cu-icon cuIcon-search"></text></button>
			
		</view>
		<uni-list :border="true">
			<!-- 右侧带角标 -->
			<uni-list-chat :title="team.name" v-for="team in IMData.teams" :to="'../../chat/chat?teamId='+team.teamId"
				avatar="https://yunxin.163.com/res/image/base/weixin-qrcode.jpg?v=3"
				note="" time="2021-05-02 20:20" badge-text=""></uni-list-chat>
		</uni-list>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchedPoolId: '',
				avatarList: [],
				keyword: '',
				data: {
					teams: []
				},
				modalName: null,
				userInfo:'',
				IMData:""
			}
		},
		onLoad() {
			this.userInfo = getApp().globalData.userInfo
			this.IMData = getApp().globalData.IMData
		},
		onShow() {
			this.userInfo = getApp().globalData.userInfo
			this.IMData = getApp().globalData.IMData
		},
		onReachBottom() {},
		methods: {
			toDetail(teamId){
				console.log(teamId);
				uni.navigateTo({
					url:`../../chat/chat?teamId=${teamId}`,
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			async joinPool(){
				let r = await uniCloud.post('/pools/join',{
					tid:this.userInfo.accid,
					members:[this.userInfo.accid],
					faccid:this.searchedAccount,
					magree:0,
					msg:''
				})
				console.log("join pool "+r);
			},
			search() {
				uni.navigateTo({
					url: "/pages/shop/goods-list/goods-list?keyword=" + this.keyword
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import 'index.scss';
</style>

<template>
	<view>
		<block v-for="(item,index) in userLst" :key="index">
			<navigator :url="'/pages/ucenter/ucenter?uid='+item.uid" class="member-item">
				<u-avatar class="avatar" :src="item.avatar"></u-avatar>
				<view class="user">
					<text class="name">{{item.username}}</text>
					<text v-if="item.gender == '男'" class="iconfont icon-nan"></text>
					<text v-if="item.gender == '女'" class="iconfont icon-nv"></text>
				</view>
				<u-button @click="follow(index,item.uid)" v-if="item.has_follow === 0" class="btn-gz" type="error" size="mini"
				 shape="circle">关注</u-button>
				<u-button @click="cancelFollow(index,item.uid)" v-if="item.has_follow === 1" class="btn-gz" type="error" size="mini"
				 shape="circle" plain>互相关注</u-button>
				 <u-button @click="cancelFollow(index,item.uid)" v-if="item.has_follow === 2" class="btn-gz" type="error" size="mini"
				  shape="circle" plain>已关注</u-button>
			</navigator>
		</block>
		<!-- 加载状态 -->
		<block v-if="list.length === 0 && loadStatus == 'nomore'">
			<u-empty margin-top="100" text="暂无用户" mode="favor"></u-empty>
		</block>
		<block v-else>
			<u-loadmore v-if="list.length > 10" :status="loadStatus" />
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			loadStatus:String
		},
		data() { 
			return {
				userLst:[]
			};
		},
		watch:{
			list(){
				this.userLst = this.list
			}
		},
		methods: {
			follow(index, uid) {
				this.$H.post('user/addFollow', {
					id: uid
				}).then(res => {
					if (res.code == 200) {
						this.userLst[index].has_follow = 1;
					}
				})
			},
			cancelFollow(index, uid) {
				this.$H.post('user/cancelFollow', {
					id: uid
				}).then(res => {
					if (res.code === 200) {
						this.userLst[index].has_follow = 0;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.member-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1px solid #F5F5F5;
		background-color: #FFFFFF;
	}

	.member-item .icon-nv {
		color: #ff4d94;
	}

	.member-item .icon-nan {
		color: #0091ff;
	}

	.member-item .avatar {
		margin-right: 20rpx;
	}

	.member-item .user .name {
		margin-right: 20rpx;
	}

	.member-item .user .iconfont {
		font-size: 12px;
	}

	.member-item .btn-gz {
		margin-left: auto;
	}
</style>

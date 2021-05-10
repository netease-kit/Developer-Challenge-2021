<template>
	<view>
		<image class="head-bg" src="https://oss.ymeoo.cn/20201128160653247734811.jpg"></image>
		<view class="con-c">
			<view class="user-info">
				<image class="avatar" :src="userInfo.avatar"></image>
				<view class="user-c">
					<view class="username">{{userInfo.username}}</view>
					<view class="num-box">
						<text>{{userInfo.fans}} <text class="txt">关注</text></text>
						<text>{{userInfo.follow}} <text class="txt">粉丝</text></text>
						<text>Lv.1</text>
					</view>
					<text class="desc">{{userInfo.intro}}</text>
					<view class="btn-box">
						<u-button v-show="!userInfo.is_follow" @click="follow" class="btn" shape="circle" type="error" size="mini">
							<u-icon name="plus"></u-icon>
							<text>关注</text>
						</u-button>
						<u-button v-show="userInfo.is_follow" @click="cancelFollow" class="btn" shape="circle" size="mini">
							<text>已关注</text>
						</u-button>
						<u-button @click="$f.jump('/pages/chat/chat?user='+userJson)" shape="circle" size="mini">
							<text style="margin: 0 15rpx;">私信</text>
						</u-button>
					</view>
				</view>
			</view>
			<!-- tab -->
			<view class="tab-box">
				<u-tabs bg-color="#f5f5f5" inactive-color="#999" name="tab_name" :list="tabs" active-color="#616161" :is-scroll="false"
				 c :current="current" @change="tabChange"></u-tabs>
			</view>
			<!-- 主页 -->
			<view v-show="current === 0">
				<!-- 基本信息 -->
				<view class="f-wrap">
					<view class="title">基本信息</view>
					<view class="info-c">
						<text>性别：{{userInfo.gender}}</text>
						<text>地区：{{userInfo.province}} {{userInfo.city}}</text>
						<text>个人简介：{{userInfo.intro}}</text>
					</view>
				</view>
				<!-- 创建的池塘 -->
				<view v-if="userInfo.create_topic_list.length > 0" class="f-wrap">
					<view class="title">创建的池塘</view>
					<topic-list :list="userInfo.create_topic_list" loadStatus="none"></topic-list>
				</view>
				<!-- 个人标签 -->
				<view class="f-wrap">
					<view class="title">标签</view>
					<view class="tag-box">
						<view v-for="(item,index) in userInfo.tag_str" :key="index" class="tag">{{item}}</view>
					</view>
				</view>
			</view>
			<!-- 帖子 -->
			<view v-show="current === 1">
				<post-list :list="postList" :loadStatus="loadStatus"></post-list>
			</view>
			<!-- 加入的池塘 -->
			<view v-show="current === 2">
				<topic-list :list="topicList"></topic-list>
			</view>
		</view>
	</view>
</template>

<script>
	import postList from '../../components/post-list/post-list.vue';
	import topicList from '../../components/topic-list/topic-list.vue';
	export default {
		components: {
			postList,
			topicList
		},
		data() {
			return {
				tabs: [{
						tab_name: '主页'
					}, {
						tab_name: '帖子'
					},
					{
						tab_name: '加入池塘'
					}
				],
				current: 0,
				uid: 0,
				postList: [],
				topicList: [],
				userInfo: {},
				userJson:"",
				loadStatus: "loading",
				page: 1
			};
		},
		onLoad(options) {
			this.uid = options.uid;
			this.getUserInfo();
			this.getPostList();
		},
		onReachBottom() {
			this.page++;
			this.getPostList();
		},
		methods: {
			follow() {
				this.$H.post('user/addFollow', {
					id: this.userInfo.uid
				}).then(res => {
					if (res.code === 200) {
						this.userInfo.is_follow = true;
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
					}
				})
			},
			cancelFollow() {
				this.$H.post('user/cancelFollow', {
					id: this.userInfo.uid
				}).then(res => {
					if (res.code === 200) {
						this.userInfo.is_follow = false;
					}
				})
			},
			tabChange(index) {
				this.current = index;
				if (index === 1) {
					this.getTopicList();
				}
			},
			getPostList() {
				this.loadStatus = "loading";
				this.$H.get('post/list', {
					page: this.page,
					uid: this.uid
				}).then(res => {
					this.postList = this.postList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			},
			getTopicList() {
				this.$H.get('topic/list', {
					uid: this.uid
				}).then(res => {
					this.topicList = res.result.data;
				})
			},
			getUserInfo() {
				this.$H.get('user/userInfoById', {
					uid: this.uid
				}).then(res => {
					this.userInfo = res.result;
					
					let user = {
						uid:res.result.uid,
						username:res.result.username,
						avatar:res.result.avatar,
					}
					this.userJson = JSON.stringify(user)
					uni.setNavigationBarTitle({
						title: this.userInfo.username
					});
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style scoped>
	@import 'ucenter.css';
</style>

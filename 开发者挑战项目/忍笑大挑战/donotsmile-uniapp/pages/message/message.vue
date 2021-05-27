<template>
	<view>
		<view class="cu-bar search bg-yellow">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索好友"
					confirm-type="search" v-model="searchFriendName"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-white  round" @click="doSearch">搜索</button>
			</view>
			<!-- <view class="search-content" ref="search" v-show="searchFriendName">
				<view>
					<view class="search-item border-bottom" v-for="(item, index) in resultList" :key="index"
						@click="intoChatSession(item)">{{ item }}</view>
					<view class="search-item border-bottom" v-show="hasNoData">没有该好友，是否添加
						<button class="cu-btn bg-white  round" @click="myAddFriend(searchFriendName)">添加</button>
					</view>
				</view>
			</view> -->
		</view>
		<!-- <view v-if="listSession.length == 0 || listSession == undefined">没有消息</view> -->
		<view class="cu-list menu-avatar">
			<view @click="toDetail(item.account)" class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''"
				v-for="(item,index) in listFriend" :key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove"
				@touchend="ListTouchEnd" :data-target="'move-box-' + index">
				<view class="cu-avatar round lg"
					:style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]">
				</view>
				<view class="content">
					<view class="text-grey">{{item.account}}</view>
					<!-- <view class="text-gray text-sm">
						<text class="cuIcon-infofill text-red  margin-right-xs">1243</text>
					</view> -->
				</view>
				<!-- <view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-grey sm">阿萨德</view>
				</view> -->
				<view class="move">
					<view class="bg-grey">置顶</view>
					<view class="bg-red">删除</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				listSession: getApp().globalData.sessions,
				listFriend: getApp().globalData.friends,
				searchFriendName: "",
				resultList: [],
			}
		},
		computed: {
			hasNoData() {
				return !this.resultList.length
			}
		},
		watch: {
			searchFriendName(val) {
				console.log(val);
				if (val.trim().length == 0) {
					this.listFriend = getApp().globalData.friends
				} else {
					this.listFriend = getApp().globalData.friends.filter(f => f.account.indexOf(val) != -1)
				}
			}
		},

		onShow: function() {
			// this.myAddFriend();
			// this.sendMsg();
			console.log("初始化")
			// console.log(this.listSession)
			console.log("this.listFriend "+this.listFriend)
		},
		methods: {
			toDetail(account) {
				uni.navigateTo({
					url: `../message-detail/message-detail?account=${account}`
				})
			},
			doSearch() {
				if (this.listFriend.length == 0) {
					let self = this
					uni.showModal({
					    title: '提示',
					    content: '没有找到该好友，是否添加',
					    success: function (res) {
					        if (res.confirm) {
								
					            let nim = getApp().globalData.nim
					            nim.addFriend({
					            	account: self.searchFriendName,
					            	done: function(error, obj) {
					            		if (!error) {
					            			uni.showToast({
					            				title:'添加成功',
					            			}) 
					            			nim.options.onAddFriend(obj.friend);
											self.listFriend = getApp().globalData.friends
					            		}else{
					            			uni.showToast({
					            				title:error.message,
					            				icon:'none'
					            			})
					            		}
					            	}
					            })
					        } else if (res.cancel) {
					            
					        }
					    }
					});
					
				}
			},
			
			myAddFriend(name) {
				console.log("加好友");
				getApp().globalData.nim.addFriend({
					account: name,
					ps: 'ps',
					done: this.addFriendDone
				});
			},

			addFriendDone(error, obj) {
				console.log(error);
				console.log(obj);
				console.log('直接加为好友' + (!error ? '成功' : '失败'));
				if (!error) {
					getApp().globalData.nim.onAddFriend(obj.friend);
				}
			},
			intoChatSession(item) {

			},


			InputBlur() {

			},
			InputFocus() {},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},

		}
	}
</script>

<style>
	.search-content {
		z-index: 1;
		/* overflow: hidden; */
		position: absolute;
		top: 110rpx;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.search-item {
		height: 30px;
		line-height: 30px;
		padding-left: .2rem;
		background: #fff;
		color: #666;
	}
</style>

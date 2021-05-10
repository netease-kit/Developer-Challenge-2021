<template>
	<view>
		<view class="read-tips">
			<text @click="readStatus">标记已读</text>
		</view>
		<block v-for="(item,index) in msgList" :key="index">
			<view class="comment-msg-item">
				<navigator :url="'/pages/ucenter/ucenter?uid='+ item.from_uid" hover-class="none">
					<u-avatar class="avatar" :src="item.userInfo.avatar"></u-avatar>
				</navigator>
				<view class="msg-c">
					<view class="msg-c-t">
						<text class="username">{{item.userInfo.username}}</text>
						<text class="time">{{item.create_time | timeFrom}}</text>
					</view>
					<view class="msg-c-txt">
						<text>{{item.content}}</text>
						<text v-if="item.status === 0" class="dot"></text>
					</view>
					<navigator v-if="msgType != 2" :url="'/pages/post-detail/post-detail?id='+item.post_id" hover-class="none">
						<view class="post-c">
							<view class="post-c-txt">{{item.postInfo.content}}</view>
						</view>
					</navigator>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgType: 0,
				msgList: []
			};
		},
		onLoad(options) {
			this.msgType = options.type;
			this.getMsgList();
		},
		methods: {
			getMsgList() {
				this.$H.get("message/list", {
					type: this.msgType
				}).then(res => {
					this.msgList = res.result;
				})
			},
			readStatus() {
				let that = this;
				this.$H.get("message/status", {
					type: this.msgType
				}).then(res => {
					this.msgList.forEach(function(item, index) {
						that.msgList[index].status = 1;
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	@import 'message-list.css';
</style>

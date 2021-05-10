<template>
	<view>
		<view class="info-box">
			<view class="user-item">
				<image :src="postDetail.userInfo.avatar"></image>
				<view class="user-item-user">
					<text class="user-name">{{postDetail.userInfo.username}}</text>
					<view class="cxplain">{{postDetail.userInfo.intro}}</view>
				</view>
				<block v-if="postDetail.is_follow">
					<u-button size="mini" style="float:right;font-size: 14px;" @click="cancelFollow">已关注</u-button>
				</block>
				<block v-else>
					<u-button type="error" size="mini" style="float:right;font-size: 14px;" @click="follow">关注</u-button>
				</block>
			</view>
			<view class="icon">
				<text>{{postDetail.create_time | timeFrom}}</text>
			</view>
			<view class="hr"></view>
			<rich-text class="post-text" :nodes="postDetail.content"></rich-text>
			<!-- 图片 -->
			<block v-if="postDetail.type == 1">
				<!--一张图片-->
				<block v-if="postDetail.media.length == 1">
					<image class="img-style-1" @tap.stop="previewImage" mode="aspectFill" :data-current="postDetail.media[0]"
					 :data-image="postDetail.media" :src="postDetail.media[0]"></image>
				</block>
				<!--二张图片-->
				<block v-if="postDetail.media.length == 2">
					<view class="img-style-2">
						<image v-for="(mediaItem, index2) in postDetail.media" :key="index2" @tap.stop="previewImage" mode="aspectFill"
						 :data-current="mediaItem" :data-image="postDetail.media" :src="mediaItem"></image>
					</view>
				</block>
				<!--三张以上图片-->
				<block v-if="postDetail.media.length > 2">
					<view class="img-style-3">
						<image v-for="(mediaItem, index2) in postDetail.media" :key="index2" @tap.stop="previewImage" mode="aspectFill"
						 :data-current="mediaItem" :data-image="postDetail.media" :src="mediaItem"></image>
					</view>
				</block>
			</block>
			<block v-if="postDetail.type == 2 && postDetail.media.length > 0">
				<video :controls="false" :autoplay="true" :src="postDetail.media[0]"></video>
			</block>
			<!--按钮-->
			<view class="p-footer">
				<view @click.stop="jumpTopic(postDetail.topic_info.id)" class="topic-name">{{postDetail.topic_info.topic_name}}</view>
				<block v-if="postDetail.is_collection">
					<view class="btn m-left-auto m-right-20" @click="cancelCollection">
						<text class="iconfont icon-lujing" style="color: #d81e06;"></text>
						<text>喜欢</text>
					</view>
				</block>
				<block v-else>
					<view class="btn m-left-auto m-right-20" @click="addCollection">
						<text class="iconfont icon-shoucang"></text>
						<text>喜欢</text>
					</view>
				</block>
				<block v-if="postDetail.is_thumb">
					<view class="btn" @click="cancelThumb" type="default">
						<text class="iconfont icon-dianzan" style="color: #d81e06;"></text>
						<text>点赞</text>
					</view>
				</block>
				<block v-else>
					<view class="btn" @click="addThumb" type="default">
						<text class="iconfont icon-dianzan1"></text>
						<text>点赞</text>
					</view>
				</block>
			</view>
		</view>
		<view class="comment-box">
			<view class="title">评论（{{postDetail.comment_list.data.length}}）</view>
			<block v-if="postDetail.comment_list.data.length> 0">
				<view class="comment-item" v-for="(item, index) in postDetail.comment_list.data" :key="index">
					<image class="avatar" :src="item.userInfo.avatar"></image>
					<view class="c-content">
						<text>{{item.userInfo.username}}</text>
						<text class="c-txt">{{item.content}}</text>
					</view>
					<text class="time">{{item.create_time|timeFrom}}</text>
				</view>
			</block>
			<block v-else>
				<u-empty text="暂无评论" mode="message"></u-empty>
			</block>
		</view>
		<view style="height: 100rpx;"></view>
		<!-- 评论输入框 -->
		<view class="comment-tool">
			<textarea placeholder="吐个槽..." fixed="true" cursor-spacing="10" v-model="cTxt" auto-height="true" placeholder-class="txt-placeholder"></textarea>
			<u-button type="error" @click="addComment" :disabled="isSubmitD" style="border-radius: 0;">发布</u-button>
		</view>
		<!-- 提示弹窗 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unitId:this.$c.postDetailAd,
				postId: 0,
				postDetail: {
					comment: [],
					media: [],
					comment_list: {
						data: []
					}
				},
				cTxt: "",
				isSubmitD: false
			};
		},
		onLoad(options) {
			this.postId = options.id;
			this.getPostDetail();

			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			let imgURL;
			if (this.postDetail.media.length > 0) {
				imgURL = this.postDetail.media[0];
			}
			return {
				title: this.postDetail.content,
				path: '/pages/post-detail/post-detail?id=' + this.postId,
				imageUrl: imgURL
			}
		},
		onShareTimeline() {
			let imgURL = imgURL = this.postDetail.media[0];;
			return {
				title: this.postDetail.content,
				imageUrl: imgURL,
				query: 'id=' + this.postId
			}
		},
		methods: {
			addComment() {
				this.isSubmitD = true;
				if (this.cTxt == "") {
					this.$u.toast('评论不能为空');
					this.isSubmitD = false;
					return;
				}
				let cTxt = this.utf16toEntities(this.cTxt)
				this.$H.post('post/addComment', {
					content: cTxt,
					uid: this.postDetail.uid,
					post_id: this.postId
				}).then(res => {
					if (res.code == 200) {
						this.cTxt = "";
						this.$u.toast('评论成功');
						this.getPostDetail();
					}
					this.isSubmitD = false;
				});
			},
			//把utf16的emoji表情字符进行转码成八进制的字符
			utf16toEntities(str) {
				var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则  
				return str.replace(patt, function(char) {
					var H, L, code;
					if (char.length === 2) {
						H = char.charCodeAt(0); // 取出高位  
						L = char.charCodeAt(1); // 取出低位  
						code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法  
						return "&#" + code + ";";
					} else {
						return char;
					}
				});
			},
			//将编码后的八进制的emoji表情重新解码成十六进制的表情字符
			entitiesToUtf16(str) {
				return str.replace(/&#(\d+);/g, function(match, dec) {
					let H = Math.floor((dec - 0x10000) / 0x400) + 0xD800;
					let L = Math.floor(dec - 0x10000) % 0x400 + 0xDC00;
					return String.fromCharCode(H, L);
				});
			},
			getPostDetail() {
				this.$H.get('post/detail', {
					id: this.postId
				}).then(res => {

					res.result.comment_list.data.forEach(item => {
						item.content = this.entitiesToUtf16(item.content);
					})

					this.postDetail = res.result;
				});
			},
			cancelCollection() {
				this.$H.post('post/cancelCollection', {
					id: this.postId
				}).then(res => {
					if (res.code === 200) {
						this.postDetail.is_collection = false;
					}
				})
			},
			addCollection() {
				this.$H.post('post/addCollection', {
					id: this.postId,
					uid: this.postDetail.uid
				}).then(res => {
					if (res.code === 200) {
						this.postDetail.is_collection = true;
					}
				})
			},
			addThumb() {
				this.$H.post('post/addThumb', {
					id: this.postId
				}).then(res => {
					if (res.code === 200) {
						this.postDetail.is_thumb = true;
					}
				})
			},
			cancelThumb() {
				this.$H.post('post/cancelThumb', {
					id: this.postId,
					uid: this.postDetail.uid
				}).then(res => {
					if (res.code === 200) {
						this.postDetail.is_thumb = false;
					}
				})
			},
			follow() {
				this.$H.post('user/addFollow', {
					id: this.postDetail.uid
				}).then(res => {
					if (res.code === 200) {
						this.postDetail.is_follow = true;
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
					id: this.postDetail.uid
				}).then(res => {
					if (res.code === 200) {
						this.postDetail.is_follow = false;
					}
				})
			},
			previewImage(e) {
				uni.previewImage({
					current: e.currentTarget.dataset.current, // 当前显示图片的http链接
					urls: e.currentTarget.dataset.image // 需要预览的图片http链接列表
				})
			},
			jumpTopic(id) {
				uni.navigateTo({
					url: "/pages/topic-detail/topic-detail?id=" + id
				})
			}
		}
	}
</script>

<style>
	@import './post-detail.css';

	video {
		width: 100%;
	}

	.post-text {
		white-space: pre-wrap;
	}
</style>

<template>
	<view class="container">
		<view class="head">
			<u-button :custom-style="customStyle" size="mini" type="info" class="plus-btn" :disabled="btnDisabled" :loading="btnLoading"
			 @click="uploadImg">发布</u-button>
		</view>
		<textarea placeholder="这一刻的想法..." :auto-height="true" maxlength="-1" v-model="form.content" class="post-txt"></textarea>
		<u-upload ref="uUpload" name="Image" :max-count="9" :header="header" :action="uploadImgUrl" @on-uploaded="submit"
		 :auto-upload="false"></u-upload>
		<!-- 选择池塘 -->
		<navigator url="/pages/choose-topic/choose-topic" class="choose-item">
			<image class="icon" src="/static/p_1.png"></image>
			<text class="txt">{{topicName}}</text>
			<u-icon class="u-icon" name="arrow-right"></u-icon>
		</navigator>
		<!-- 所在位置 -->
		<view @click="chooseLocation" class="choose-item">
			<u-icon class="icon" name="map" color="#999" size="40"></u-icon>
			<text class="txt">{{form.address || "所在位置"}}</text>
			<u-icon class="u-icon" name="arrow-right"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					backgroundColor: "#8687fd",
					color: "#fff",
					border: 0
				},
				btnDisabled: false,
				btnLoading: false,
				uploadImgUrl: this.$c.domain + 'common/upload',
				topicName: "选择池塘",
				form: {
					type: 1,
					topic_id: "",
					discuss_id: "",
					content: "",
					media: [],
					longitude: 0,
					latitude: 0,
					address: ""
				},
				header: {
					token: uni.getStorageSync("token")
				},
			};
		},
		onLoad(options) {
			uni.hideTabBar();
			if (options.topic_id) {
				this.form.topic_id = options.topic_id;
				this.topicName = options.topic_name;
			}
			if (options.discuss_id) {
				this.form.discuss_id = options.discuss_id;
			}

			let location = uni.getStorageSync("location_info");
			this.form.longitude = location.longitude;
			this.form.latitude = location.latitude;
		},
		onHide() {
			uni.showTabBar()
		},
		onUnload() {
			uni.showTabBar()
		},
		methods: {
			uploadImg() {
				this.btnDisabled = true;
				this.btnLoading = true;

				if (!this.form.topic_id) {
					this.$u.toast('请选择池塘');
					this.btnDisabled = false;
					this.btnLoading = false;
					return;
				}

				if (!this.form.content) {
					this.$u.toast('内容不能为空');
					this.btnDisabled = false;
					this.btnLoading = false;
					return;
				}

				this.$refs.uUpload.upload();
			},
			chooseLocation() {
				let that = this;
				uni.chooseLocation({
					success: function(res) {
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
						that.form.address = res.name;
						that.form.latitude = res.latitude;
						that.form.longitude = res.longitude;
					}
				});
			},
			submit(e) {
				let mediaList = [];
				e.forEach(function(item, index) {
					mediaList.push(item.response.result.url)
				})

				this.form.media = mediaList;

				this.$H.post("post/addPost", this.form).then(res => {
					if (res.code == 200) {
						uni.redirectTo({
							url: "/pages/post-detail/post-detail?id=" + res.result.id
						})
					}
					this.btnDisabled = false;
					this.btnLoading = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'plus-post.scss';
</style>

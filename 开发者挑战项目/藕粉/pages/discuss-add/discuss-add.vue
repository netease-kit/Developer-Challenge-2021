<template>
	<view class="container">
		<u-form>
			<u-form-item>
				<input class="dis-title" placeholder="话题名称" v-model="form.title" />
			</u-form-item>
			<u-form-item :border-bottom="false">
				<textarea placeholder="一句话介绍要讨论的话题" v-model="form.introduce" class="post-txt"></textarea>
			</u-form-item>
		</u-form>
		<view class="f-fixed">
			<u-button class="plus-btn" type="error" shape="circle" :disabled="btnDisabled" :loading="btnLoading" @click="disAdd">创建话题</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnDisabled: false,
				btnLoading: false,
				form: {
					topic_id: "",
					introduce: "",
					title: "",
				},
				header: {
					token: uni.getStorageSync("token")
				}
			};
		},
		onLoad(options) {
			this.form.topic_id = options.topicId;
		},
		methods: {
			disAdd() {
				this.btnDisabled = true;
				this.btnLoading = true;

				if (!this.form.title) {
					this.$refs.uToast.show({
						title: "标题不能为空",
						type: 'error'
					})
					this.btnDisabled = false;
					this.btnLoading = false;
					return;
				} else if (!this.form.introduce) {
					this.$refs.uToast.show({
						title: "内容不能为空",
						type: 'error'
					})
					this.btnDisabled = false;
					this.btnLoading = false;
					return;
				} else {
					this.$H.post("discuss/addDis", this.form).then(res => {
						if (res.code == 200) {
							this.$refs.uToast.show({
								title: res.msg,
								type: 'success'
							})
							setTimeout(() => {
								uni.navigateBack();
							}, 1000);
						} else {
							this.$refs.uToast.show({
								title: res.msg,
								type: 'error'
							})
						}
						this.btnDisabled = false;
						this.btnLoading = false;
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	@import 'discuss-add.css';
</style>

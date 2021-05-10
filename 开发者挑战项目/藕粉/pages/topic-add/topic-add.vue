<template>
	<view class="container">
		<view class="f-wrap">
			<u-form ref="uForm">
				<u-form-item label="类别">
					<u-input input-align="right" v-model="cateName" @click="show = true" placeholder="请选择" type="select" />
				</u-form-item>
				<u-form-item label="池塘名称" label-width="auto">
					<u-input input-align="right" v-model="form.topic_name" placeholder="请填写池塘名称" />
				</u-form-item>
				<u-form-item label="池塘描述" label-position="top">
					<u-input type="textarea" v-model="form.description" placeholder="请填写池塘描述" />
				</u-form-item>
				<u-form-item label="池塘封面" label-position="top">
					<u-upload ref="uUpload" name="Image" :header="header" :action="uploadImgUrl" max-count="1" @on-uploaded="onUploaded1"></u-upload>
				</u-form-item>
				<u-form-item label="池塘背景" label-position="top">
					<u-upload ref="uUpload" name="Image" :header="header" :action="uploadImgUrl" max-count="1" @on-uploaded="onUploaded2"></u-upload>
				</u-form-item>
			</u-form>
		</view>
		<!-- 分类选择器 -->
		<u-select v-model="show" value-name='cate_id' label-name='cate_name' mode="single-column" :list="cateList" @confirm="confirm"></u-select>
		<!-- 提交按钮 -->
		<view style="height: 120rpx;"></view>
		<view class="f-fixed">
			<u-button @click="submit" type="error" shape="circle">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				cateList: [],
				cateName: '',
				uploadImgUrl: this.$c.domain + 'common/upload',
				header: {
					token: uni.getStorageSync("token")
				},
				form: {
					cate_id: "",
					topic_name: "",
					description: "",
					cover_image: "",
					bg_image: ""
				}
			};
		},
		onLoad() {
			this.getCate();
		},
		methods: {
			onUploaded1(e) {
				this.form.cover_image = e[0].response.result.url;
			},
			onUploaded2(e) {
				this.form.bg_image = e[0].response.result.url;
			},
			submit() {

				this.$H.post('topic/topicAdd', this.form).then(res => {
					if (res.code == 200) {
						this.$u.toast('成功创建池塘');
						uni.redirectTo({
							url: '/pages/topic-detail/topic-detail?id=' + res.result.id
						})
					}
				})
			},
			getCate() {
				this.$H.post('topic/classList').then(res => {
					this.cateList = res.result;
				})
			},
			confirm(e) {
				this.form.cate_id = e[0].value;
				this.cateName = e[0].label;
			}
		}
	}
</script>

<style lang="scss">
	@import 'topic-add.css';
</style>

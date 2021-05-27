<template>
	<view class="container">
		<view class="f-wrap">
			<u-form ref="uForm">
				<u-form-item label="类别">
					<u-input input-align="right" v-model="cateName" @click="show = true" placeholder="请选择"
						type="select" />
				</u-form-item>
				<u-form-item label="池塘名称" label-width="auto">
					<u-input input-align="right" v-model="form.creatingPoolName" placeholder="请填写池塘名称" />
				</u-form-item>
				<u-form-item label="池塘描述" label-position="top">
					<u-input type="textarea" v-model="form.description" placeholder="请填写池塘描述" />
				</u-form-item>
				<u-form-item label="池塘封面" label-position="top">
					<u-upload ref="uUpload" name="Image" :header="header" :action="uploadImgUrl" max-count="1"
						@on-uploaded="onUploaded1"></u-upload>
				</u-form-item>
				<u-form-item label="池塘背景" label-position="top">
					<u-upload ref="uUpload" name="Image" :header="header" :action="uploadImgUrl" max-count="1"
						@on-uploaded="onUploaded2"></u-upload>
				</u-form-item>
			</u-form>
		</view>
		<!-- 分类选择器 -->
		<u-select v-model="show" value-name='cate_id' label-name='cate_name' mode="single-column" :list="cateList"
			@confirm="confirm"></u-select>
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
					creatingPoolName: "",
					description: "",
					cover_image: "",
					bg_image: ""
				},
				IMData:'',
				userInfo:''
			};
		},
		onLoad() {
			this.IMData = getApp().globalData.IMData
			this.userInfo = getApp().globalData.userInfo
		},
		methods: {
			onUploaded1(e) {
				this.form.cover_image = e[0].response.result.url;
			},
			onUploaded2(e) {
				this.form.bg_image = e[0].response.result.url;
			},
			async submit() {
				// wyl token 0f3442796539495d0dbad9750b83e30e
				let r = await uniCloud.post('/pools', {
					tname: this.form.creatingPoolName,
					owner: this.userInfo.accid,
					msg: '欢迎',
					intro: this.intro,
					magree: 0,
					members: ['wyl'],
					joinmode: 0
				})
				
			},
			getCate() {
				
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

<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-yellow">
			<block slot="content">挑战</block>
		</cu-custom>
		<!-- 播放器  swiper -->
		<view>
			<swiper class="flex justify-center" style="height: 30vh;">
				<swiper-item v-for="(video,index) in videoList">
					<video :src="video" @play="bindPlay(index)" @ended="bindEnded(index)" :controls="false"
						style="width: 100%;height: 100%;"></video>
				</swiper-item>
			</swiper>
		</view>

		<!-- 挑战进度 -->
		<view class="cu-bar justify-between">
			<view class="action sub-title">
				<text class="text-xl text-bold text-yellow">进度</text>
				<text class="bg-yellow" style="width:2rem"></text>
				<!-- last-child选择器-->
			</view>
			<view class="margin-right-xs">
				<button class="cu-btn bg-yellow shadow-blur" @click="showModal" data-target="ShareModal">分享</button>
			</view>
		</view>
		<view class="flex">
			<button class="cu-btn  shadow margin-xs" v-for="(video,index) in videoList"
				:class="[index<currentIndex?'bg-grey':'bg-white']">
				{{index}}
			</button>
		</view>

		<canvas canvas-id="myCanvas" class="myCanvas"></canvas>
		<camera class="myCamera"></camera>

		<view class="cu-modal" :class="modalName=='ShareModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">邀请好友挑战</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="(item,index) in shareTarget" :key="index">
							<view class="cu-avatar round lg"
								:style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]">
							</view>
							<view class="content">
								<view class="text-grey">{{item.account}}</view>
							</view>
							<view>
								<button class="cu-btn bg-yellow" @click="sendChallenge(item.account)">发送</button>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoList: [
					'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
					'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
					'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
				],
				challenge_id: '',
				currentIndex: -1,
				ctx: null,
				listener: {},
				successC: 1,
				shareTarget: [],
				modalName: '',
				radio: ''
			}
		},
		async onLoad(option) {
			if(option.id==undefined){
					option.id='60acfb039dad85000132e0fb'
			}
			let challenge = await uniCloud.get('/challenges/' + option.id)
			console.log("challenge " + JSON.stringify(challenge))
			this.challenge_id = challenge._id
			this.videoList = challenge.video_url

			this.shareTarget = getApp().globalData.friends
		},
		methods: {
			sendChallenge(account){
				let nim = getApp().globalData.nim
				nim.sendText({
					scene: 'p2p',
					to: account, //收信息人的id
					text: "哈哈哈，笑死我了。你能忍住不笑嘛？Chanllenge_ID:"+this.challenge_id,
					done: (error, msg) => {
						console.log('发送成功！')
						console.log("消息回执："+JSON.stringify(msg))
						uni.showToast({
							title:'分享成功'
						})
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			bindPlay(index) {
				console.log(index)
				this.currentIndex = index

				this.openCamera();
			},
			bindEnded(index) {
				this.stopRecord()
			},
			share() {

			},
			openCamera: function(res) {
				var nCounter = 0;
				var that = this
				var camera_ctx = uni.createCameraContext()
				this.listener = camera_ctx.onCameraFrame((frame) => {
					if (nCounter < 180) {
						nCounter++;
						return;
					}
					nCounter = 0;
					console.log(frame);
					// nCounter等于30 是因为一开始相机会有一个对焦的过程，如果一开始获取数据，就是模糊的图片
					console.log(frame.data instanceof ArrayBuffer, frame.width, frame.height)
					var data = new Uint8Array(frame.data);
					var clamped = new Uint8ClampedArray(data);
					// 实时帧数据添加到Canvas上
					uni.canvasPutImageData({
						canvasId: 'myCanvas',
						x: -150,
						y: -150,
						width: frame.width,
						height: frame.height,
						data: clamped,
						success(res) {
							// 转换临时文件
							uni.canvasToTempFilePath({
								x: 0,
								y: 0,
								width: frame.width,
								height: frame.height,
								canvasId: 'myCanvas',
								fileType: 'jpg',
								destWidth: frame.width,
								destHeight: frame.height,
								// 精度修改
								quality: 1,
								success(res) {
									// 临时文件转base64
									uni.getFileSystemManager().readFile({
										filePath: res.tempFilePath, //选择图片返回的相对路径
										encoding: 'base64', //编码格式
										success: res => {
											// 保存base64
											that.mybase64 = res.data;
											that.uploadPic();
										}
									})
								},
								fail(res) {
									console.log(res);
								}
							}, that)
						}
					})
				})
				this.listener.start()
			},

			stopRecord() {
				console.log("停止记录");
				this.listener.stop();
			},

			uploadPic: function() {
				const picData = {
					a: this.mybase64
				}

				uni.request({
					url: 'http://9y2.xyz:5000/getImg',
					method: "POST",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: picData,
					success: (res) => {
						console.log(res);
						if (res.data == "isSmile") {
							this.successC = 0
							this.stopRecord()
							uni.showToast({
								title: '挑战失败',
								icon: 'none',
								duration: 2000,
							})
						}
					}
				});
			},
		}
	}
</script>

<style>
	.myCanvas {
		width: 480px;
		height: 900px;
		opacity: 1;
	}
</style>

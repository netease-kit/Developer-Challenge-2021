<template>
	<view class="consulation">
		<nav-bar :isBack="true" title="消失的爱人">
			<template v-slot:image>
				<image src="../../static/more.png" style="width: 40rpx;height: 40rpx;"></image>
			</template>
		</nav-bar>
		<scroll-view class="msg-list" :scroll-top="scrollTop" :style="{height: style.contentViewHeight + 'rpx'}" scroll-y="true">
			<view class="msgs" v-for="(item,index) in msgList" :key="index">
				<view class="msg msg-me" v-if="item.roleType == 0">
					<view class="msg-cont">
						<text class="txt" v-if="item.type == 'text'">{{item.msg}}</text>
						<view v-else-if="item.type === 'image'" class="img">
							<image :src="item.msg" mode="aspectFit"></image>
						</view>
						<view v-else-if="item.type === 'radio'" :style="{width: getRadioWidth(item.msg)}" @click="playRadioMsg(item.msg)" class="radio">
							<image src="../../static/speaker_icon.png" mode=""></image>
							<text>{{item.msg | lenRadio}}</text>
						</view>
					</view>
					<image class="avatar" :src="avatar" mode=""></image>
				</view>
				<view class="msg msg-oth" v-else>
					<image class="avatar" :src="avatar" mode=""></image>
					<view class="msg-cont">
						<text class="txt" v-if="item.type == 'text'">{{item.msg}}</text>
						<view v-else-if="item.type === 'image'" class="img">
							<image :src="item.msg" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="operation-box">
			<view class="operation">
				<image class="send-icon" @click="sendType = 'radio'" v-if="sendType == 'txt'" src="../../static/radio.png" mode=""></image>
				<image class="send-icon"  @click="sendType = 'txt'" v-else src="../../static/keyboard.png" mode=""></image>
				<input class="input-box" v-if="sendType == 'txt'" type="text" confirm-type="send" :adjust-position="true" v-model="msg" @confirm="sendText" />
				<view class="input-radio" @longpress="press" @touchstart="recordingStart" @touchend="recordingEnd" v-else>{{pressTxt}}</view>
				<image class="plus-icon" @click="isShowFun = !isShowFun" src="../../static/plus_func.png" mode=""></image>
			</view>
			<transition name="slide-fade">
				<view class="func-list" v-show="isShowFun">
					<view class="func" @click="func(index)" v-for="(item,index) in funcList" :key="index">
						<image :src="item.image" mode=""></image>
					</view>
				</view>
			</transition>
		</view>
		<recording v-if="recordingIsLong"></recording>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext(); // 语音播放控件
	import NavBar from '../../components/nav-bar/nav-bar.vue'
	import Recording from './components/Recording.vue'
	import {
		querySql,
		newAddData,
		clearChatRecord,
		openComDB,
		executeSQL
	} from '@/common/sqlite/sqlite.js'
	const avatar = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=116984941,698239247&fm=26&gp=0.jpg'
	export default {
		components: {
			NavBar,
			Recording
		},
		data() {
			return {
				sqliteReady: false,
				recordingIsLong: false,
				scrollTop: 0,// 滚动
				recordTime: 0, // 语音时长
				timeOutEvent: null, // 录音定时器
				pressTxt: '按住说话',
				id: '4903533184816128',
				toUserId: '4903533184816128',
				avatar,
				msg: '',
				sendType: 'txt', // 默认发送消息类型为文本消息
				fixed: true,
				page: 1,
				pageSize: 5,
				messageList: [], // 消息列表
				isShowFun: false,
				funcList: [{
						image: require('../../static/photo.png'),
					},
					{
						image: require('../../static/take_photo.png'),
					}
				],
				style: {
					pageHeight: null,
					contentViewHeight: null
				}

			}
		},
		computed: {
			msgList: function() {
				const storeList = this.$store.state.messageList.filter(item => {
					return (item.fromId === this.id || item.fromId === this.toUserId)
				})
				return storeList.concat(this.messageList)
			}
		},
		filters: {
			lenRadio: function(val) {
				let duration =  val.split('%/dur')[1]
				duration = Number(duration)
				if (duration <= 1000) {
					return 1 + "''"
				} else {
					return parseInt(duration / 1000) + "''"
				}
			}
		},
		onLoad(option) {
			if (option) {
				this.id = option.id
			}
			//this.initChatRecord()
		},
		created() {
			this.openDb()
			const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口+ uni.getSystemInfoSync().screenWidth / 750 * (100) - 100
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - this.navbarHeight + this.statusBarHeight - 120
			console.log(this.style, '样式');
		},
		mounted() {
			this.getLocalChatRecord()
			//this.openDb()
		},
		methods: {
			// 长按触发
			press() {
				console.log('长按');
				this.recordingIsLong = true
				this.pressTxt = '松开结束'
				const _this = this
				this.recordTime = 0 // 清空录音时间
				recorderManager.onStart(() => {
					_this.timeOutEvent = setInterval(() => {
						_this.recordTime++
					}, 1000)
				});
				recorderManager.start({
					format: "mp3"
				});
			},
			// 开始录音
			recordingStart () {
				console.log('开始录音');
			},
			// 录音结束
			recordingEnd () {
				if(!this.recordingIsLong) {
					uni.showToast({
						title: '时间太短',
						icon: 'none'
					})
					return;
				}
				this.recordingIsLong = false
				this.pressTxt = '按住说话'
				recorderManager.stop();
				const _this = this
				recorderManager.onStop(res => {
					clearInterval(_this.timeOutEvent); //清除定时器  
					const radioUrl = res.tempFilePath
					const duration = this.recordTime * 1000;
					console.log('录音文件地址', res)
					_this.sendRadio(res.tempFilePath,duration)
					//_this.uploadRecord(res.tempFilePath, duration)
				})
			},
			// 获取语音条的宽度
			getRadioWidth (url) {
				let duration =  url.split('%/dur')[1]
				duration = Number(duration)
				if (duration == null) {
					return '50rpx'
				}
				if ((0 < duration) && (duration < 3000)) {
					return '120rpx'
				} else if ((3000 < duration) && (duration < 6000)) {
					return '170rpx'
				} else {
					return '220rpx'
				}
			},
			// 播放语音条
			playRadioMsg(url) {
				console.log('开始播放',url);
				let realUrl = url.split('%/dur')[0]
				realUrl = realUrl.split('?createTime')[0]
				let dur =  url.split('%/dur')[1]
				dur = Number(dur)
				innerAudioContext.src = realUrl;
				innerAudioContext.onPlay(() => {
					console.log('开始播放',realUrl);
				});
				innerAudioContext.play()
				innerAudioContext.onError((res) => {
					console.log(res.errMsg,realUrl, '语音消息播放出错');
					console.log(res.errCode, '语音消息播放出错');
				});
			},
			scrollToBottom() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.msg').boundingClientRect();
				query.exec((res) => {
					console.log(res)
					that.style.mitemHeight = 0;
					res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 50) //获取所有内部子元素的高度
					if (that.style.mitemHeight * 2 > that.style.contentViewHeight) { //判断子元素高度是否大于显示高度
						that.scrollTop = 0
						that.scrollTop = (that.style.mitemHeight * 2) - that.style.contentViewHeight + 140
						console.log(this.scrollTop, '需要滑动的高度')
					} else {
						console.log('噶度不够')
					}
				})
			},
			// 数据库打开
			async openDb() {
				console.log('打开数据库')
				let res = await openComDB()
				if (res.code == 0) {
					console.log(res, '打开数据库成功')
				} else {
					console.log(res, '打开数据库失败')
				}
				this.initChatRecord()
			},
			// 初始化聊天记录表
			async initChatRecord() {
				let sql =
					'create table if not exists chatRecord("id" INTEGER PRIMARY KEY AUTOINCREMENT,"type" TEXT,"msg" TEXT,"toId" INTEGER,"fromId" INTEGER,"date" TEXT,"roleType" INTEGER)'
				let res = await executeSQL('localStorage', sql)
				if (res.code == 0) {
					console.log(res, '成功初始化聊天记录表')
					this.sqliteReady = true
					this.$nextTick(function() {
						this.getLocalChatRecord()
					})
				} else {
					console.log(res)
				}
			},
			getNowDate() {
				function formDate(str) {
					if (str < 10) {
						return '0' + str
					} else {
						return String(str)
					}
				}
				let time = new Date()
				let year = time.getFullYear()
				let month = formDate(time.getMonth() + 1)
				let date = formDate(time.getDay())
				let hours = formDate(time.getHours())
				let minutes = formDate(time.getMinutes())
				let seconds = formDate(time.getSeconds())
				let nowTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
				return nowTime
			},
			// 获取本地数据库聊天记录
			async getLocalChatRecord(type) {
				const start = (this.page - 1) * this.pageSize
				let sql =
					`select * from chatRecord order by id desc limit ${start},${this.pageSize}`
				console.log('获取本地聊天记录', sql)
				let res = await querySql('localStorage', sql)
				if (res.code == 0) {
					console.log(res.data, '本地sql聊天记录')
					const arr = res.data.reverse()
					if (type == 'query') {
						if (arr.length !== 0) {
							this.$store.commit('insertConversationList', arr)
						}
						//this.scrollTop = 0
						//this.pullRefresh = true
						//this.refresh = false
					} else {
						console.log('熊爱', arr);
						this.$store.commit('updateMessageList', arr)
						this.$nextTick(function() {
							//this.scrollToBottom()
						})
					}
				}
			},
			// 新增数据到数据库
			async postChatRecord(data) {
				let sql =
					`insert into chatRecord (msg,toId,fromId,date,type,roleType)	values('${data.msg}','${data.toId}','${data.fromId}','${data.date}','${data.type}',${data.roleType})`
				console.log('新增聊天记录本地', sql)
				let res = await newAddData('localStorage', sql)
				console.log(res, '是否错误')
				if (res.code == 0) {
					console.log(res, '新增成功')
				} else {
					console.log(res, '新增错误')
				}
			},
			sendText() {
				console.log('NIM文本发送')
				this.$IM.sendText({
					scene: 'p2p',
					to: this.toUserId, //LIYING
					text: this.msg,
					done: () => {
						console.log('发送成功！')
						this.updConversation(this.msg, 'text')
						this.$nextTick(() => {
							this.msg = ''; //清空输入框
							this.scrollToBottom();
							uni.hideKeyboard();
						})
					}
				})
			},
			updConversation(msg, type) {
				const msgData = {
					type: type, // 消息类型
					msg: msg, // 消息的内容 可能是文字 图片链接 音频链接
					fromId: this.id, // 发送人的id
					toId: this.toUserId, // 接收人的id
					date: this.getNowDate(),
					roleType: 0, // 0 发送者为我 1 发送者为其他人
				}
				console.log('添加消息', msgData);
				this.postChatRecord(msgData)
				this.$store.commit('updateConversationList', msgData)
			},
			func(index) {
				switch (index) {
					case 0:
						this.chooseImage()
						break;
					case 1:
						this.camera()
						break;
				}
			},
			chooseImage() {
				this.getImage('album');
			},
			//拍照发送
			camera() {
				this.getImage('camera');
			},
			getImage(type) {
				uni.chooseImage({
					sourceType: [type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						const urls = res.tempFilePaths
						for (let i = 0; i < urls.length; i++) {
							this.sendImage(urls[i])
						}
					}
				});
			},
			sendImage(url) {
				const _this = this
				this.$IM.sendFile({
					scene: 'p2p',
					to: this.toUserId,
					type: 'image',
					filePath: url,
					fastPass: '{"w":200,"h":110,"md5":"898D9SADHSAUDHAS8989"}',
					beginupload: function(upload) {
						// - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
						// - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
					},
					uploadprogress: function(obj) {
						console.log('文件总大小: ' + obj.total + 'bytes');
						console.log('已经上传的大小: ' + obj.loaded + 'bytes');
						console.log('上传进度: ' + obj.percentage);
						console.log('上传进度文本: ' + obj.percentageText);
					},
					uploaddone: function(error, file) {
						console.log(error);
						console.log(file);
						if (!error) {
							console.log('上传成功', file.url)
							_this.updConversation(file.url, 'image')
							if (_this.isShowFun) {
								_this.isShowFun = false
							}
						} else {
							console.warn(error)
						}
					},
					beforesend: function(msg) {
						console.log('正在发送p2p image消息, id=' + msg.idClient);
					},
					done: function(res) {
						console.log(res, '上传图片结果')
					}
				});
			},
			sendRadio (url,dur) {
				// audio
				const urls = this.$IM.audioToMp3({
					url: url
				});
				console.log(urls,'转换之后的urlmp3');
				const _this = this
				this.$IM.sendFile({
					scene: 'p2p',
					to: this.toUserId,
					type: 'audio',
					filePath: url,
					// file: {
					// 	size: 1024,
					// 	md5: '898D9SADHSAUDHAS8989',
					// 	url: urls,
					// 	ext: 'mp3',
					// 	name: 'radio',
					// 	dur: dur
					// },
					beginupload: function(upload) {
						// - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
						// - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
					},
					uploadprogress: function(obj) {
						console.log('文件总大小: ' + obj.total + 'bytes');
						console.log('已经上传的大小: ' + obj.loaded + 'bytes');
						console.log('上传进度: ' + obj.percentage);
						console.log('上传进度文本: ' + obj.percentageText);
					},
					uploaddone: function(error, file) {
						console.log(error);
						console.log(file);
						if (!error) {
							console.log('上传语音消息成功', file.url)
							_this.updConversation(file.url + `%/dur${dur}`, 'radio')
						} else {
							console.warn(error)
						}
					},
					beforesend: function(msg) {
						console.log('正在发送p2p image消息, id=' + msg.idClient);
					},
					done: function(res) {
						console.log(res, '上传语音消息结果')
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.consulation {
		width: 100%;
		min-height: 100%;
		background-color: #F3F3F3;
	}

	.msg-list {
		width: 100%;
		min-height: 100%;
		background-color: #F3F3F3;
		display: flex;
		flex-direction: column;

		.msgs {
			width: 100%;
			padding: 20rpx 30rpx;
			box-sizing: border-box;

			.msg {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;

				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 10rpx;
				}
			}

			.msg-me {
				justify-content: flex-end;

				.avatar {
					margin-left: 20rpx;
				}

				.msg-cont {
					.txt {
						position: relative;
						max-width: 500rpx;
						padding: 18rpx 24rpx;
						background-color: #6E9CF8;
						border-radius: 10rpx;
						display: inline-block;
						font-size: 30rpx;
						line-height: 34rpx;
						color: #FFFFFF;
					}

					.txt::after {
						content: '';
						display: block;
						width: 0;
						height: 0;
						border: solid 16rpx;
						border-top: 20rpx;
						//border-bottom: 20rpx;
						border-color: transparent transparent transparent #6E9CF8;
						position: absolute;
						top: 8rpx;
						right: -30rpx;
					}

					.img {
						min-width: 200rpx;
						max-width: 300rpx;
						border-radius: 10rpx;
						float: right;

						image {
							width: 100%;
							margin: auto;
							z-index: 1;
						}
					}
					.radio {
						background-color: #6E9CF8;
						border-radius: 20rpx;
						padding: 10rpx 20rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;
						
						image {
							display: inline-block;
							width: 50rpx;
							height: 54rpx;
						}
						
						text {
							color: #FFFFFF;
						}
					}
				}
			}

			.msg-oth {
				justify-content: flex-start;

				.avatar {
					margin-right: 20rpx;
				}

				.msg-cont {
					.txt {
						padding: 18rpx 24rpx;
						background-color: #FFFFFF;
						border-radius: 10rpx;
						display: inline-block;
						font-size: 30rpx;
						line-height: 34rpx;
						color: #333333;
					}
					.txt::after {
						content: '';
						display: block;
						width: 0;
						height: 0;
						border: solid 16rpx;
						border-top: 20rpx;
						border-bottom: 20rpx;
						border-color: transparent transparent transparent #6E9CF8;
						position: absolute;
						top: 8rpx;
						right: -30rpx;
					}
					.img {
						min-width: 200rpx;
						max-width: 300rpx;
						border-radius: 10rpx;
						float: right;

						image {
							width: 100%;
							margin: auto;
							z-index: 1;
						}
					}
				}
			}
		}
	}

	.operation-box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}

	.operation {
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: row;
		align-items: center;

		.input-box {
			flex: 1;
			height: 70rpx;
			border-radius: 35rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
		}
		.input-radio {
			flex: 1;
			height: 70rpx;
			border-radius: 35rpx;
			padding: 0 20rpx;
			line-height: 70rpx;
			text-align: center;
			color: #333333;
			background-color: #FFFFFF;
		}
		.send-icon {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}

		.plus-icon {
			width: 50rpx;
			height: 50rpx;
			margin-left: 20rpx;
		}
	}

	.func-list {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #F8F8F8;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-top: 1rpx solid #C0C0C0;

		.func {
			width: 10vw;
			height: 10vw;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			background-color: #FFFFFF;
			box-sizing: border-box;

			image {
				width: 40rpx;
				height: 40rpx;
				// margin-bottom: 10rpx;
			}

			text {
				font-size: 24rpx;
				color: #333333;
			}
		}

		.func:nth-child(1) {
			margin-right: 4%;
		}
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .8s ease;
	}

	.slide-fade-enter,
	.slide-fade-leave-to

	/* .slide-fade-leave-active 用于 2.1.8 以下版本 */
		{
		opacity: 0;
	}
</style>

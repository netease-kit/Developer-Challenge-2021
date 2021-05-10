<template>
	<view>
		<view class="container head">
			<u-search class="search" placeholder="搜索" :show-action="false" @search="search" @custom="search"
				v-model="keyword"></u-search>
		</view>
		<uni-list>
			<uni-list :border="true">
				<!-- 右侧带角标 -->
				<uni-list-chat :title="team.name" v-for="team in data.teams"
					link
					to="../../chat/chat"
					avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					note="" time="2021-05-02 20:20" badge-text="12"></uni-list-chat>
			</uni-list>
		</uni-list>
	</view>
</template>

<script>
	import SDK from '../../../static/js/NIM_Web_SDK_v8.4.0.js'
	export default {
		data() {
			return {
				avatarList: [],
				keyword: '',
				data: {
					teams: []
				}
			}
		},
		onLoad() {
			let self = this
			var data = {};
			// 注意这里, 当引入的SDK文件是NIM_Web_NIM_v.js时，请通过 NIM.getInstance 来初始化；当引入的SDK文件为NIM_Web_SDK_v时，请使用 SDK.NIM.getInstance 来初始化。SDK文件的选择请参见集成方式。
			var nim = SDK.NIM.getInstance({
				debug: true, // 是否开启日志，将其打印到console。集成开发阶段建议打开。
				appKey: '338f742de66a8283293644c990b7bbf6',
				account: '123',
				token: '2238cd58aba089e91c96d5852e4f301f',
				db: true, //若不要开启数据库请设置false。SDK默认为true。
				// privateConf: {}, // 私有化部署方案所需的配置
				onconnect: onConnect,
				onwillreconnect: onWillReconnect,
				ondisconnect: onDisconnect,
				onerror: onError,
				onfriends: function(friends) {
					console.log('收到好友列表', friends);
					data.friends = nim.mergeFriends(data.friends, friends);
					data.friends = nim.cutFriends(data.friends, friends.invalid);
				},
				onteams: function(teams) {
					console.log('群列表', teams);
					let data = self.data
					data.teams = nim.mergeTeams(data.teams, teams);
				}
			});

			function onConnect() {
				console.log('连接成功');
			}

			function onWillReconnect(obj) {
				// 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
				console.log('即将重连');
				console.log(obj.retryCount);
				console.log(obj.duration);
			}

			function onDisconnect(error) {
				// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
				console.log('丢失连接');
				console.log(error);
				if (error) {
					switch (error.code) {
						// 账号或者密码错误, 请跳转到登录页面并提示错误
						case 302:
							break;
							// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
						case 417:
							break;
							// 被踢, 请提示错误后跳转到登录页面
						case 'kicked':
							break;
						default:
							break;
					}
				}
			}

			function onError(error) {
				console.log(error);
			}
		},
		onReachBottom() {


		},
		methods: {
			search() {
				uni.navigateTo({
					url: "/pages/shop/goods-list/goods-list?keyword=" + this.keyword
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import 'index.scss';
</style>

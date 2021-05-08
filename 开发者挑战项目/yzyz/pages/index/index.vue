<template>
	<view>
<!-- 		<cu-custom bgColor="bg-blue">
			<block slot="content">短视频</block>
		</cu-custom> -->
		<cu-video :video_list="videoList" ></cu-video>
	</view>
</template>

<script>
	import cuVideo from '@/components/cu-video.vue';
	
	export default {
		components: {
			'cu-video': cuVideo
		},
		data() {
			return {
				videoList: []
			}
		},
		methods: {
			// 获取视频列表
			getVideoList() {
				// uni.request({
				// 	url: 'https://api.52170.xin/video',
				// 	dataType: 'json',
				// 	success: res => {
				// 		console.log(res.data.data.list);
				// 		for (let item of res.data.data.list) {
				// 			this.videoList.push({
				// 				video_id: item.video_id,
				// 				nickname: item.nickname,
				// 				video_describe: item.video_describe,
				// 				cover_url: item.cover_url,
				// 				video_url: item.video_url,
				// 				dianzan: item.dianzan,
				// 				pinglun: item.pinglun,
				// 				zhuanfa: item.zhuanfa,
				// 				is_dianzan: item.is_dianzan,
				// 				flag: false
				// 			});
				// 		}
			
				// 	}
				// });
				
				this.videoList.push({
					video_id: 12,
					nickname: '远行不易',
					video_describe: '我知道金字塔很大，但没想到这么震撼',
					cover_url: 'https://app.yunxin.163.com/res/images/logo-white@2x01.png',
					video_url: 'http://jdvodj5z3bo53.vod.126.net/jdvodj5z3bo53/4f840d6d-72c9-4658-bbb6-86955e819482.mp4',
					dianzan: 12,
					pinglun: 12,
					zhuanfa: 123,
					is_dianzan: false,
					flag: false
				});
			}
		},
		onLoad() {
			this.getVideoList();
		},
	}
</script>

<style>

</style>

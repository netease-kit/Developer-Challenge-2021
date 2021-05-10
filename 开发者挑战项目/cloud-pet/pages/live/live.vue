<template>
	<view class="">
		<view class="flex justify-center">
			<video src="https://mp4.vjshi.com/2020-05-22/6e9ceae95999ac130617fa0bc0052a25.mp4" controls
				style="width: 750rpx;"></video>
		</view>

		<lff-barrage ref="lffBarrage"></lff-barrage>
		<view class="cu-form-group">
			<input placeholder="弹幕内容" name="input" v-model='danmu'></input>
			<button class='cu-btn bg-green shadow padding' @click="colrdo()">发送</button>
		</view>
		<view class="cu-chat">

			<view class="cu-item">
				<view class="cu-avatar radius"
					style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);">
				</view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view>

			<view class="cu-item self" v-for="dm in myDanmu">
				<view class="main">
					<view class="content shadow">
						{{dm}}
					</view>
				</view>
				<view class="cu-avatar radius"
					style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);">
				</view>
				<view class="date">13:23</view>
			</view>
		</view>
	</view>
</template>

<script>
	import live from '../../static/ne-sdk/neplayer.min.js';

	export default {
		data() {
			return {
				danmu:'',
				myDanmu:[],
			};
		},
		methods: {
			colrdo() { //插入一条弹幕
				this.$refs.lffBarrage.add({
					item: this.danmu
				});
				this.myDanmu.push(this.danmu)
			},
		}
	}
</script>

<style>
	@import url("../../static/ne-sdk/neplayer.min.css");
</style>

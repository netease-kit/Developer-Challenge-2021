<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="YmContent">
			<scroll-view scroll-y class="channel_management_1">
				<view class="channel_management_3">
					<text decode="true" class="channel_management_4">全部频道</text>
				</view>
				<view class="Titles">
					<text decode="true" v-for="(item_Titles, index) in list_Titles" :key="index" class="item">{{item_Titles.item}}</text>
				</view>
				<view class="consulation-list">
					<view class="per"  v-for="(per,index) in friendList" :key="index">
						<view style="width: 100%; height: 100%;margin-bottom: 10rpx;">
							<image class="avatar" :src="per.imgUrl" mode=""></image>
							<view class="msg" style="display: inline-block;width: 240px;">
								<view class="msg-top">
									<view class="name">{{per.name}}</view>
									<view style="">
										+订阅
									</view>
								</view>
								<view class="msg-cont">
									{{per.msg}}
								</view>
							</view>
						</view>	
						<view class="pre" v-for="(item,index) in per.zhiboList">
							<view  class="video-card">
								<view  class="video-card__content">
									<a href="" target="_blank" class="cover-picture"> <!----> 
										<img  :src="item.src"  class="cover-picture__image">
										<view  class="" style="position: relative;z-index: 999;padding-top: 72px; color: #FFFFFF;padding-left: 10rpx;">
											<span class="play-text" style="color: #FFFFFF;">
												<i alt="play" class="iconfont iconzhibo41"></i> 
												<span class="count" style="color: #FFFFFF;">10万</span>
											</span> 
											<span class="like-text" style="color: #FFFFFF;">
												<i alt="like" class="iconfont icondianzan-ash"></i> 
												<span class="count" style="color: #FFFFFF;">1.3万</span>
											</span> 
											<span class="play-duraiton">0:31</span>
										</view>
										
										<view class="" style="opacity: 0;"></view>
									</a> 
									<view class="watch-later-video van-watchlater black">
										<span class="wl-tips" style="display: none;"></span>
									</view>
								</view> 
								<a  target="_blank" class="video-name">{{item.title}}</a> 
								<a >
									<span class="up-name__text" >up:{{item.up}}</span>
								</a>
							</view>																				
						</view>
					</view>					
				</view>
			</scroll-view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
		
		
		
	</view>
</template>

<script>
import channel_management from "./channel_management.js";
export default channel_management;


</script>

<style lang="scss" scoped>
   @import './channel_management.scss'
</style>
<style lang="less" scoped>
	.consulation {
		width: 100%;
		min-height: 100%;
		background-color: #F3F3F3;
	}

	.consulation-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
		box-sizing: border-box;

		.per {
			width: 100%;
			border-bottom: 1rpx solid #ccc;
			display: block;
			flex-direction: row;
			align-items: center;
			margin-bottom: 10px;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				display: inline-block;
			}

			.msg {
				flex: 1;
				display: flex;
				flex-direction: column;

				.msg-top {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					.name {
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
					}

					.date {
						font-size: 24rpx;
						color: #666;
					}
				}

				.msg-cont {
					font-size: 25rpx;
					color: #666;
				}
			}
		}
	}
	
	.video-card{
		width: 150px;
		float: left;
		margin-right: 5px;
	}
	.video-card__content{
		display: block;
		    width: 150px;
		    height: 96px;
	}
	.cover-picture{
		display: block;
		    width: 100%;
		    height: 100%;
	}
	.cover-picture__image{
		display: block;
		    opacity: 1;
		    transition: .2s;
		    width: 150px;
		    height: 96px;
		    z-index: 0;
		    position: absolute;
		    border-radius: 2px;
	}
	.video-card__info{
		    z-index: 1;
		    position: absolute;
		    width: 100%;
		    align-items: center;
		    bottom: -55px;
		    color: #fff;
		    font-size: 12px;
		    padding: 0 8px;
		    display: flex;
	}
	.play-text{
		    margin-right: 12px;
		    height: 16px;
		    line-height: 16px;
	}
	.channel-webicon_shipin_bofangshu{
		    background-position: -1020px 10px;
		    opacity: 0;
		    background-image: url(//i0.hdslb.com/bfs/videoshot/330890332.jpg@85q.webp);
		    background-size: 1700px;
	}
	.count{
		    color: #999;
	}
	.play-duraiton{
		    display: none;
	}
	.van-framepreview{
		    position: absolute;
		    left: 0;
		    top: 0;
		    width: 100%;
		    height: 100%;
		    pointer-events: none;
		    overflow: hidden;
		    transition: opacity .3s;
		    z-index: 1;
	}
	.van-fpbar-box{
		    position: absolute;
		    left: 0;
		    top: 0;
		    width: 100%;
		    height: 10px;
		    border-color: #000;
		    border-style: solid;
		    border-width: 4px 8px;
		    background: #444;
		    box-sizing: border-box;
	}
	.van-danmu{
		    position: absolute;
		    left: 0;
		    top: 0;
		    width: 100%;
		    height: 100%;
		    pointer-events: none;
		    overflow: hidden;
		    transition: opacity .3s;
		    z-index: 2;
	}
	.watch-later-video{
		    position: absolute;
		    z-index: 20;
		    width: 22px;
		    height: 22px;
		    right: 8px;
		    cursor: pointer;
		    transition-delay: .2s;
		    opacity: 0;
	}
	.van-watchlater{
		
	}
	.video-name{
		    
		    font-size: 14px;
		    color: #212121;
		    padding: 10px 0 0;
		    margin-bottom: 4px;
		    line-height: 20px;
		    display: -webkit-box;
		    overflow: hidden;
		    -webkit-box-orient: vertical;
		    text-overflow: -o-ellipsis-lastline;
		    text-overflow: ellipsis;
		    word-break: break-all;
		    -webkit-line-clamp: 2;
		    transition: color .3s;
		    font-weight: 500;
	}
	.up-name{
		    height: 16px;
		    line-height: 16px;
		    font-size: 12px;
		    color: #999;
		    display: flex;
		    align-items: center;
		    display: -webkit-box;
		    overflow: hidden;
		    -webkit-box-orient: vertical;
		    text-overflow: -o-ellipsis-lastline;
		    text-overflow: ellipsis;
		    word-break: break-all;
		    -webkit-line-clamp: 1;
	}
	.wl-tips{
		    position: absolute;
		    font-size: 12px;
		    color: #fff;
		    border-radius: 4px;
		    line-height: 18px;
		    padding: 4px 8px;
		    background-color: #000;
		    background: rgba(0,0,0,.8);
		    white-space: nowrap;
		    top: -30px;
	}
	a{
		text-decoration: none;
	}
	
	
	.up-name__text{
		height: 65px;
		font-size: 14px;
		color: #999;
		padding: 10px 0 0;
		margin-bottom: 4px;
		line-height: 20px;
	}
</style>

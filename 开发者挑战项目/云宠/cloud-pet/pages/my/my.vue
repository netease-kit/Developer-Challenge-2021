
<template>
    <view class="container">
		<view>
			<nav-bar title="我的">
				<template v-slot:image>
					<navigator url="../consulation/consulation-list">
						<image src="../../static/msg.png" style="width: 40rpx;height: 40rpx;"></image>
					</navigator>
				</template>
			</nav-bar>
		</view>
        <view class="user-section">
            <image class="bg" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg"></image>
            <view class="user-info-box">
                <view class="portrait-box">
                    <image :src='userInfo.headPhoto' mode='aspectFill' class="portrait" v-if="userInfo.headPhoto"></image>
                    <view v-else>
                        <image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg" mode='aspectFill' class="portrait"></image>
                    </view>
                </view>
                <view class="info-box">
                    <text class="username">{{userInfo.username || '游客'}}</text>
                </view>
            </view>
            <view class="vip-card-box">
                <image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
                <view class="b-btn">
                    立即开通
                </view>
                <view class="tit">
                    <text class="yticon icon-iLinkapp-"></text>
                    云宠会员
                </view>
                <!-- <text class="e-m">DCloud Union</text> -->
                <!-- <text class="e-b">开通会员开发无bug 一测就上线</text> -->
            </view>
        </view>

        <view class="cover-container" :style="[{
                transform: coverTransform,
                transition: coverTransition
            }]"
         @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
            <image class="arc" src="/static/arc.png"></image>

            <view class="tj-sction">
                <view class="tj-item">
                    <text class="num">0.00</text>
                    <text>余额</text>
                </view>
                <view class="tj-item">
                    <text class="num">0</text>
                    <text>优惠券</text>
                </view>
                <view class="tj-item">
                    <text class="num">0</text>
                    <text>积分</text>
                </view>
            </view>
            <!-- 订单 -->
            <view class="order-section">
                <view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover" :hover-stay-time="50">
                    <text class="yticon icon-shouye"></text>
                    <text>全部订单</text>
                </view>
                <view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
                    <text class="yticon icon-daifukuan"></text>
                    <text>待付款</text>
                </view>
                <view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover" :hover-stay-time="50">
                    <text class="yticon icon-yishouhuo"></text>
                    <text>待收货</text>
                </view>
                <view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover" :hover-stay-time="50">
                    <text class="yticon icon-shouhoutuikuan"></text>
                    <text>退款/售后</text>
                </view>
            </view>
            <!-- 浏览历史 -->
            <view class="history-section icon">
                <view class="sec-header">
                    <text class="yticon icon-lishijilu"></text>
                    <text>浏览历史</text>
                </view>
                <scroll-view scroll-x class="h-list">
                    <image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
                     mode="aspectFill"></image>
                    <image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105231218&di=09534b9833b5243296630e6d5b728eff&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM05%2FD1%2FAC%2FwKhQcFQ3iN2EQTo8AAAAAHQU6_8355.jpg"
                     mode="aspectFill"></image>
                    <image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105320890&di=c743386be51f2c4c0fd4b75754d14f3c&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ1OTg4ODY0MDA3Ny05OTQ4ODY1NDQ%3D.jpg"
                     mode="aspectFill"></image>
                    <image @click="navTo('/pages/product/product')" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691146630,2165926318&fm=26&gp=0.jpg"
                     mode="aspectFill"></image>
                    <image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105443324&di=8141bf13f3f208c61524d67f9bb83942&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ac9a5548d29b0000019ae98e6d98.jpg"
                     mode="aspectFill"></image>
                    <image @click="navTo('/pages/product/product')" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg"
                     mode="aspectFill"></image>
                </scroll-view>
                <list-cell icon="icon-iconfontweixin" iconColor="#39b54a" title="我的钱包" tips="您的会员还有3天过期"></list-cell>
                <list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
                <list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips="邀请好友赢10万大礼"></list-cell>
                <list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="晒单" tips="晒单抢红包"></list-cell>
                <list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></list-cell>
                <list-cell icon="icon-shezhi1" iconColor="#39b54a" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
            </view>
        </view>


    </view>
</template>
<script>
    import listCell from '@/components/mix-list-cell';

  
    export default {
        components: {
            listCell
        },
        data() {
            return {
                // token: '',
                coverTransform: 'translateY(0px)',
                coverTransition: '0s',
                moving: false,
                photo: '',
				userInfo:''
            }
        },

        methods: {

            /**
             * 统一跳转接口,拦截未登录路由
             * navigator标签现在默认没有转场动画，所以用view
             */
            navTo(url) {
                // 必需用！
                if (!this.token) {
                    url = '/pages/public/login';
                } 
                uni.navigateTo({
                    url
                })
            }
        }
    }
</script>
<style lang='scss'>
    %flex-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    %section {
        display: flex;
        justify-content: space-around;
        align-content: center;
        background: #fff;
        border-radius: 10upx;
    }

    .user-section {
        height: 520upx;
        padding: 100upx 30upx 0;
        position: relative;

        .bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            filter: blur(1px);
            opacity: .7;
        }
    }

    .user-info-box {
        height: 180upx;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;

        .portrait {
            width: 130upx;
            height: 130upx;
            border: 5upx solid #fff;
            border-radius: 50%;
        }

        .username {
            font-size:  12x;
            font-weight: 60;
            margin-left: 20upx;
        }
    }

    .vip-card-box {
        display: flex;
        flex-direction: column;
        color: #f7d680;
        height: 240upx;
        background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
        border-radius: 16upx 16upx 0 0;
        overflow: hidden;
        position: relative;
        padding: 20upx 24upx;

        .card-bg {
            position: absolute;
            top: 20upx;
            right: 0;
            width: 380upx;
            height: 260upx;
        }

        .b-btn {
            position: absolute;
            right: 20upx;
            top: 16upx;
            width: 132upx;
            height: 40upx;
            text-align: center;
            line-height: 40upx;
            font-size: 22upx;
            color: #36343c;
            border-radius: 20px;
            background: linear-gradient(left, #f9e6af, #ffd465);
            z-index: 1;
        }

        .tit {
            font-size: 2upx;
            color: #f7d680;
            margin-bottom: 28upx;

            .yticon {
                color: #f6e5a3;
                margin-right: 16upx;
            }
        }

        .e-b {
            font-size: 18px;
            color: #d8cba9;
            margin-top: 10upx;
        }
    }

    .cover-container {
       
        margin-top: -150upx;
        padding: 0 30upx;
        position: relative;
        background: #f5f5f5;
        padding-bottom: 20upx;

        .arc {
            position: absolute;
            left: 0;
            top: -34upx;
            width: 100%;
            height: 36upx;
        }
    }

    .tj-sction {
        @extend %section;

        .tj-item {
            @extend %flex-center;
            flex-direction: column;
            height: 140upx;
            
            color: #75787d;
        }

        .num {
            
            margin-bottom: 8upx;
        }
    }

    .order-section {
        @extend %section;
        padding: 28upx 0;
        margin-top: 20upx;

        .order-item {
            @extend %flex-center;
            width: 120upx;
            height: 120upx;
            border-radius: 10upx;
            
        }

        .yticon {
            font-size: 48upx;
            margin-bottom: 18upx;
            color: #39b54a;
        }

        .icon-shouhoutuikuan {
            font-size: 44upx;
        }
    }

    .history-section {
        padding: 30upx 0 0;
        margin-top: 20upx;
        background: #fff;
        border-radius: 10upx;

        .sec-header {
            display: flex;
            align-items: center;
            
            line-height: 40upx;
            margin-left: 30upx;

            .yticon {
                font-size: 44upx;
                color: #5eba8f;
                margin-right: 16upx;
                line-height: 40upx;
            }
        }

        .h-list {
            white-space: nowrap;
            padding: 30upx 30upx 0;

            image {
                display: inline-block;
                width: 160upx;
                height: 160upx;
                margin-right: 20upx;
                border-radius: 10upx;
            }
        }
    }
</style>


<template>
	<view>
        <topTabBar class="topbar">
            <view slot="left"> 
			</view>
            <view slot="center" class="top_bar"> 
					<text>购物车</text>
			</view>
             <view slot="right" class="right" @tap="deleteList">  
                 <text>删除</text>
			</view>
        </topTabBar>
		<!-- 占位 -->
		<!-- <view v-if="showHeader" class="place"></view> -->
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="tis" v-if="goodsList.length==0">购物车是空的哦~</view>
            <view v-for="(item,indexs) in goodsList" :key="indexs" class="goods_box">
                <view class="shopname">
                    <!-- 商城名点击 -->
                        <view class="checkbox-box" @tap="selectedShop(indexs)"> 
                            <view  :class="[item.selected?'checkbox_on':'checkbox']">
                                <view :class="[item.selected?'iconfont icongouxuan on':'']"></view>
                            </view>
                        </view>
                        <text>{{item.shopname}}</text>
                        
                </view>
                <view class="row" v-for="(row,index) in item.shopList" :key="index">
				<!-- 删除按钮 -->
                    <!-- <view class="menu" @tap.stop="deleteGoods(row.id)">
                        <view class="iconfont iconshanchu"></view>
                    </view> -->
                    <!-- 商品 -->
                    <view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']">
                        <!-- checkbox -->
                        <view class="checkbox-box" @tap="selected(indexs,index)">
                            <view  :class="[row.selected?'checkbox_on':'checkbox']">
                                <view :class="[row.selected?'iconfont icongouxuan on':'']"></view>
                            </view>
                        </view>
                        <!-- 商品信息 -->
                        <view class="goods-info" @tap="toGoods(row)">
                            <view class="img">
                                <image :src="row.img"></image>
                            </view>
                            <view class="info">
                                <view class="title">{{row.name}}</view> 
                                <view class="price-number">
                                    <view class="price">￥{{row.price}}</view>
                                    <view class="number">
                                        <view class="sub" @tap.stop="sub(indexs,index)">
                                            <view class="iconfont iconjian"></view>
                                        </view>
                                        <view class="input" @tap.stop="discard">
                                            <input type="number" v-model="row.number" @input="sum($event,index)" />
                                        </view>
                                        <view class="add"  @tap.stop="add(indexs,index)">
                                            <view class="iconfont iconjia"></view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
			    </view>
            </view>
        </view>
		<!-- 脚部菜单 -->
		<view class="footer" :style="{bottom:footerbottom}">
			<view class="checkbox-box" @tap="allSelect">
				<!-- <view class="checkbox"> -->
					<view :class="[isAllselected?'checkbox_on':'checkbox']">
						<view :class="[isAllselected?'iconfont icongouxuan on':'']"></view>
                    </view>
				</view>
				<view class="text">全选</view>
			<!-- </view> -->
			<!-- <view class="delBtn" @tap="deleteList" v-if="selectedList.length>0">删除</view> -->
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice}}</view></view>
				<view class="btn" @tap="toConfirmation">去结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	import topTabBar from '@/components/nav-bar/nav-bar.vue'
	export default {
		data() {
			return {
				sumPrice:0,
				headerPosition:"fixed",
				headerTop:null,
				statusTop:null,
				showHeader:true,
				selectedList:[],
				isAllselected:false,
				currPage:1,
				pageSize:10,
				goodsList: [//后台需要给你的数据结构如下
				    {
				        shopname: '响当当美妆旗舰店2',
				        selected: false,
				        id: 1,
				        shopList: [{
				                id: 1,
				                img: 'https://gd4.alicdn.com/imgextra/i4/1055528134/O1CN01rlSkoa29xQBVXEHGa_!!1055528134.jpg_400x400.jpg',
				                name: '商品标题',
				                price: 200.5,
				                number: 1,
				                selected: false
				            },
				            {
				                id: 2,
				                img: 'https://gd4.alicdn.com/imgextra/i4/1055528134/O1CN01rlSkoa29xQBVXEHGa_!!1055528134.jpg_400x400.jpg',
				                name: '商品标题',
				                price: 300.5,
				                number: 1,
				                selected: false
				            }
				        ]
				    }, {
				        shopname: '嘻嘻嘻联想旗舰店',
				        selected: false,
				        id: 2,
				        shopList: [{
				                id: 3,
				                img: 'https://gd4.alicdn.com/imgextra/i4/1055528134/O1CN01rlSkoa29xQBVXEHGa_!!1055528134.jpg_400x400.jpg',
				                name: '商品标题',
				                price: 127.5,
				                number: 1,
				                selected: false
				            },
				            {
				                id: 4,
				                img: 'https://gd4.alicdn.com/imgextra/i4/1055528134/O1CN01rlSkoa29xQBVXEHGa_!!1055528134.jpg_400x400.jpg',
				                name: '商品标题',
				                price: 57.5,
				                number: 1,
				                selected: false
				            }
				        ]
				    }
				],
				//控制滑动效果
				theIndex:null,
				oldIndex:null,
				isStop:false
			}
        },
        components:{
            topTabBar
        },
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {
			//兼容H5下结算条位置
			// #ifdef H5
				this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight+'px';
			// #endif
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif


			this.getInitCratList();//购物车加载
		},
		methods: {
			//加入商品 参数 goods:商品数据
			joinGoods(goods){
				/*
				* 这里只是展示一种添加逻辑，模板并没有做从其他页面加入商品到购物车的具体动作，
				* 在实际应用上，前端并不会直接插入记录到goodsList这一个动作，一般是更新列表和本地列表缓存。
				* 一般商城购物车的增删改动作是由后端来完成的,
				* 后端记录后返回前端更新前端缓存
				*/
				let len = this.goodsList.length;
				let isFind = false;//是否找到ID一样的商品
				for(let i=0;i<len;i++){
					let row = this.goodsList[i];
					if(row.id==goods.id )
					{	//找到商品一样的商品
						this.goodsList[i].number++;//数量自增
						isFind = true;//找到一样的商品
						break;//跳出循环
					}
				}
				if(!isFind){
					//没有找到一样的商品，新增一行到购物车商品列表头部
					this.goodsList[i].unshift(goods);
				}
			},

			//购物车加载 
			async getInitCratList(){
				let user_id = uni.getStorageSync('user_id');
				let data = {
					currPage:this.currPage,
					pageSize:this.pageSize,
					user_id
				}
				const res = await this.$myRequest.get('home/initCratList.do', data);
				if(res.result == 200){ 
            		this.$store.commit('getCarList',res.rows); //vuex 地址的操作  把点击的专区名字存放vuex
				}
			},
		 
			
			//商品跳转
			toGoods(e){
				uni.showToast({title: '商品'+e.id,icon:"none"});
				uni.navigateTo({
					url: '../../goods/goods' 
				});
			},
			//跳转确认订单页面
			toConfirmation(){
				let tmpList=[];
				let len = this.goodsList.length;
				for(let i=0;i<len;i++){
					if(this.goodsList[i].selected) {
						tmpList.push(this.goodsList[i]);
					}
				}
				if(tmpList.length<1){
					uni.showToast({
						title:'请选择商品结算',
						icon:'none'
					});
					return ;
				}
				uni.setStorage({
					key:'buylist',
					data:tmpList,
					success: () => {
						uni.navigateTo({
							url:'../../order/confirmation'
						})
					}
				})
			},
			//删除商品
			deleteGoods(id){ 
				let len = this.goodsList.length;
				for(let i=0;i<len;i++){
					if(id==this.goodsList[i].id){
						this.goodsList.splice(i, 1);
						break;
					}
				}
				this.selectedList.splice(this.selectedList.indexOf(id), 1);
				this.sum();
				this.oldIndex = null;
				this.theIndex = null;
			},
			// 删除选中商品
			deleteList(){ 
				let that = this
				if(this.isAllselected){
					console.log(123);			
					this.goodsList = [];
					this.sumPrice = 0;
					return;
				}  
                 let len = that.goodsList.length;  
                 var a =[];
				for(let i = 0 ; i < that.goodsList.length;i++){						 
						if(that.goodsList[i].selected){	
						 a.push(i)
						} 
						for(let j = 0 ; j < that.goodsList[i].shopList.length; j++){
								if (that.goodsList[i].shopList[j].selected){
										console.log(789,'----------',j);
									that.goodsList[i].shopList.splice(j,1)							
							}
						} 
				}
				for(let k = 0 ; k < a.length; k++){
					that.goodsList.splice(a[k],1); 		 
			    }
			 
				
				 
				this.sum();
			},
			// 选中商品
			selected(indexs,index){
				this.selectedList =[];
				this.goodsList[indexs].shopList[index].selected = this.goodsList[indexs].shopList[index].selected?false:true;
				// let j = this.selectedList.indexOf(this.goodsList[indexs].shopList[index].id);
				// console.log(j);
				
				// i>-1?this.selectedList.splice(i, 1):this.selectedList.push(this.goodsList[indexs].shopList[index].id);
				// console.log(this.selectedList.length);
				// console.log(this.goodsList[indexs].shopList.length);
				// this.goodsList[indexs].selected = this.selectedList.length == this.goodsList[indexs].shopList.length;
				var a = 0;
				for (var i = 0; i < this.goodsList[indexs].shopList.length; i++) {					
					if(this.goodsList[indexs].shopList[i].selected){
                    	 a++;
					}
				};
				if (a==this.goodsList[indexs].shopList.length){
                     this.goodsList[indexs].selected = true;
				} else {
					this.goodsList[indexs].selected = false;
				}

				var b = 0;
				for(var j = 0 ; j < this.goodsList.length ; j++){
					if(this.goodsList[j].selected){
						b++;
					}
				}
				if (b==this.goodsList.length){
                    this.isAllselected = true
				} else {
					this.isAllselected  = false;
				}
				this.sum();
			},
			//选中门店
			selectedShop(indexs){
				this.goodsList[indexs].selected = this.goodsList[indexs].selected?false:true;
				for (let i = 0; i < this.goodsList[indexs].shopList.length; i++) {
					this.goodsList[indexs].shopList[i].selected = this.goodsList[indexs].selected;
				}
				if(this.goodsList[indexs].selected){
					for (var j = 0; j < this.goodsList[indexs].shopList.length; j++) {
						this.sumPrice += this.goodsList[indexs].shopList[j].price;
					}
				}else{
					for (var j = 0; j < this.goodsList[indexs].shopList.length; j++) {
						this.sumPrice -= this.goodsList[indexs].shopList[j].price;
					}
				}
				let a = 0;
				for (var i = 0; i < this.goodsList.length; i++) {
					if(this.goodsList[i].selected){
						a++; 
					}else{
						this.isAllselected  = false
					}
				}
				if(a == this.goodsList.length){
					this.isAllselected  = true
				}

			},
			//全选
			allSelect(){
				console.log(665);
				// this.goodsList[indexs].selected
                let len = this.goodsList.length;
				let arr = [];
				for(let i=0;i<len;i++){  
					this.goodsList[i].selected = !this.isAllselected 
                    for(let j = 0 ; j < this.goodsList[i].shopList.length;j++){ 
                        this.goodsList[i].shopList[j].selected = this.isAllselected? false : true;
					    arr.push(this.goodsList[i].shopList[j].id); 
                    } 
				}
				this.selectedList = this.isAllselected?[]:arr;
				this.isAllselected = this.isAllselected||this.goodsList.length==0?false : true;
				this.sum();
			},
			// 减少数量
			sub(indexs,index){
				if(this.goodsList[indexs].shopList[index].number<=1){
					return;
				}
				this.goodsList[indexs].shopList[index].number--;
				this.sum();
				
			},
			// 增加数量
			add(indexs,index){ 
				this.goodsList[indexs].shopList[index].number++ 
				this.sum();

			},
			// 合计
			sum(e,index){
				this.sumPrice=0;
                let len = this.goodsList.length;
				for(let i=0;i<len;i++){
					for (let j = 0; j < this.goodsList[i].shopList.length; j++) {
						if(this.goodsList[i].shopList[j].selected) { 
								if(e && i==index){
						            this.sumPrice = this.sumPrice * 1  + (e.detail.value*this.goodsList[i].shopList[j].price);
								}else{  
						            this.sumPrice = this.sumPrice * 1 + (this.goodsList[i].shopList[j].number*this.goodsList[i].shopList[j].price);
								}
							}
					}
				}  
				
                
				this.sumPrice = this.sumPrice * 1 .toFixed(2);
				console.log(this.sumPrice);
				
			},
			discard() {
				//丢弃
			}
			
			
		}
	}
</script>
<style lang="scss" scoped>
    page{position: relative;background-color: #fff;}
    .top_bar{
        font-family: PingFang-SC-Bold;
        font-size: 30rpx;
        font-weight: normal;
        font-stretch: normal; 
        letter-spacing: 0rpx;
        color: #333333;
    }
    .right{
        font-family: PingFang-SC-Regular;
        font-size: 26rpx;
        font-weight: normal;
        font-stretch: normal; 
        letter-spacing: 0rpx;
        color: #bcbcbc;
    }
	.checkbox-box{
		display: flex;
        align-items: center;
        .checkbox_on{
            width: 35rpx;
			height: 35rpx;
			border-radius: 100%;
			border: solid 2rpx #FFB141;
			display: flex;
			justify-content: center;
            align-items: center;
            color: #FFB141;
        }
		.checkbox{
			width: 35rpx;
			height: 35rpx;
			border-radius: 100%;
			border: solid 2rpx #C9C9C9;
			display: flex;
			justify-content: center;
			align-items: center;
			.on{
                // width: 35rpx;
                // height: 35rpx;
                // border-radius: 100%;
                // border: solid 2rpx #C9C9C9;
                // display: flex;
                // justify-content: center;
                // align-items: center;
                // font-size: 25rpx;
                color: #FFB141;
                // border: 2rpx solid #FFB141;
                // border-radius: 100%; 
                // width: 35rpx;
			    // height: 35rpx;
				// width: 25rpx;
				// height: 25rpx;
				// border-radius: 100%;
			    //  background-color: #f06c7a;
			}
		}
		.text{
			font-size: 28rpx;
			margin-left: 10rpx;
		}
	}
.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
	}

	.header{
		width: 92%;
		padding: 0 4%;
		height: 100rpx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.title{
			font-size: 36rpx;
		}
		
	}
	.place{
		
		background-color: #ffffff;
		height: 100rpx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.goods-list{
		width: 100%;
		padding: 20rpx 0 120rpx 0;
		.tis{
			width: 100%;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
        }
        .goods_box{
            background: white;
            box-shadow: 0rpx 5rpx 20rpx rgba(0,0,0,0.1);
            margin-top: 20rpx;
            .shopname{
                margin-left: 50rpx;
                display: flex;
                .checkbox-box{
                    margin-right: 25rpx;
                }
            }
            .row{
                width: calc(92%);
                height: calc(22vw + 40rpx); 
                margin: 0rpx auto; 
                // border-radius: 15rpx;
                display: flex;
                align-items: center;
                position: relative;
                overflow: hidden;
                z-index: 4;
                border: 0;
                .menu{
                    .icon{
                        color: #fff;
                        // font-size: 25rpx;
                    }
                    position: absolute;
                    width: 30%;
                    height: 100%;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: red;
                    color: #fff;
                    z-index: 2;
                }
                .carrier{
                    @keyframes showMenu {
                        0% {transform: translateX(0);}100% {transform: translateX(-30%);}
                    }
                    @keyframes closeMenu {
                        0% {transform: translateX(-30%);}100% {transform: translateX(0);}
                    }
                    &.open{
                        animation: showMenu 0.25s linear both;
                    }
                    &.close{
                        animation: closeMenu 0.15s linear both;
                    }
                    background-color: #fff;
                    .checkbox-box{
                        padding-left: 20rpx;
                        flex-shrink: 0;
                        height: 22vw;
                        margin-right: 20rpx;
                    }
                    position: absolute;
                    width: 100%;
                    padding: 0 0;
                    height: 100%;
                    z-index: 3;
                    display: flex;
                    align-items: center;

                    .goods-info{
                        width: 100%;
                        display: flex;
                        padding-right: 20rpx;
                        .img{
                            width: 22vw;
                            height: 22vw;
                            border-radius: 10rpx;
                            overflow: hidden;
                            flex-shrink: 0;
                            margin-right: 10rpx;
                            image{
                                width: 22vw;
                                height: 22vw;
                            }
                        }
                        .info{
                            width: 100%;
                            height: 22vw;
                            overflow: hidden;
                            display: flex;
                            flex-wrap: wrap;
                            position: relative;
                            .title{
                                width: 100%;
                                font-size: 28rpx;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                // text-align: justify;
                                overflow: hidden;
                            } 
                            .price-number{
                                position: absolute;
                                width: 100%;
                                bottom: 0rpx;
                                display: flex;
                                justify-content: space-between;
                                align-items: flex-end;
                                font-size: 28rpx;
                                height: 60rpx;
                                .price{
                                    font-family: PingFang-SC-Bold;
                                    font-size: 28rpx;
                                    font-weight: normal;
                                    font-stretch: normal; 
                                    letter-spacing: 0rpx;
                                    color: #ff0000;
                                }
                                .number{
                                    display: flex;
                                    justify-content: center;
                                    align-items: flex-end;
                                    .input{
                                        width: 70rpx;
                                        height: 50rpx;
                                        margin: 0 10rpx;
                                        background-color: #f3f3f3;
                                        input{
                                            width: 70rpx;
                                            height: 50rpx;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            text-align: center;
                                            font-size: 26rpx;
                                        }
                                    }
                                    .sub ,.add{
                                        width: 45rpx;
                                        height: 45rpx;
                                        background-color: #f3f3f3;
                                        border-radius: 5rpx;
                                        line-height: 45rpx;
                                        text-align: center;
                                        .icon{
                                            font-size: 22rpx;
                                            width: 45rpx;
                                            height: 45rpx;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center; 
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
	}
	.footer{
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		position: fixed;
		bottom: 0rpx;
		z-index: 5;
		.delBtn{
			border: solid 1rpx #f06c7a;
			color: #f06c7a;
			padding: 0 30rpx;
			height: 50rpx;
			border-radius: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.settlement{
			width: 80%;
			display: flex;
            // justify-content: flex-end;
            justify-content: space-between;
			align-items: center;
			.sum{
				width: 45%;
				font-size: 28rpx;
                margin-right: 10rpx;
                margin-left: 20rpx;
                display: flex; 
                text-align: center;
				.money{
					font-weight: 600;
				}
			}
			.btn{
                width: 120rpx;
                height: 50rpx;
                background-color: #ffb141;
                border-radius: 25rpx; 
				padding: 0 30rpx; 
				color: #fff;
				display: flex;
				justify-content: center;
                align-items: center; 
                font-family: PingFang-SC-Medium;
                font-size: 26rpx;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.5rpx;
                color: #fffdff;
                line-height: 50rpx;
			}
		}
	}
</style>


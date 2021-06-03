/**
 *@des 产品营销
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/18 13:57:54
 */
// 首页列表
/* const indexList = '/tiny-shop/v1/index/index'; */
const indexList = {
    "code":200,
    "message":"OK",
    "data":{
        "search":{
            "hot_search_default":"牛油果AVODerm",
            "hot_search_list":[
                "主粮检测结果",
                "麦德氏",
                "拜耳",
                "冠能",
                "伯纳天纯"
            ]
        },
        "adv":{
            "index_top":[
                {
                    "id":"47",
                    "merchant_id":"0",
                    "title":"新鲜好材料",
                    "is_title_show":"1",
                    "cover":"https://img2.epetbar.com/2021-04/13/10/fd27903b4243bc8b619b6dcf35ca53b9.jpg?x-oss-process=style/water",
                    "location":"index_top",
                    "silder_text":"",
                    "start_time":"1603931891",
                    "end_time":"1623908100",
                    "jump_link":"",
                    "jump_type":"",
                    "sort":"0",
                    "status":"1",
                    "created_at":"1603931941",
                    "updated_at":"1607414149",
                    "view":"1391"
                }
            ],
            "index_hot":[

            ],
            "index_new":[

            ],
            "index_recommend":[

            ]
        },
        "cate":[
            {
                "id":"1114",
                "merchant_id":"0",
                "title":"主粮",
                "cover":"https://img2.epetbar.com/common/upload/commonfile/2020/04/010/0104701_111170.jpg@!50w-c",
                "sort":"0",
                "level":"2",
                "pid":"1112",
                "tree":"tr_0 tr_1112 ",
                "index_block_status":"1",
                "status":"1",
                "created_at":"1618497753",
                "updated_at":"1618883323"
            },
            {
                "id":"1113",
                "merchant_id":"0",
                "title":"保健",
                "cover":"https://img2.epetbar.com/nowater/2017-08/08/14/9059356ce1ad69f7800e7c038ac8c66e.jpg@!50w-c",
                "sort":"0",
                "level":"2",
                "pid":"1112",
                "tree":"tr_0 tr_1112 ",
                "index_block_status":"1",
                "status":"1",
                "created_at":"1618497750",
                "updated_at":"1620640439"
            },
            {
                "id":"1112",
                "merchant_id":"0",
                "title":"玩具",
                "cover":"https://img2.epetbar.com/nowater/2017-08/08/14/2745a5839c628be3db90159a57ccfa41.jpg@!50w-c",
                "sort":"0",
                "level":"1",
                "pid":"0",
                "tree":"tr_0 ",
                "index_block_status":"1",
                "status":"1",
                "created_at":"1618488634",
                "updated_at":"1620700674"
            },
            {
                "id":"1111",
                "merchant_id":"0",
                "title":"生活",
                "cover":"https://img2.epetbar.com/nowater/2017-08/08/14/e8e90fcf991a2932a782db5b8cfa18fc.jpg@!50w-c",
                "sort":"0",
                "level":"1",
                "pid":"0",
                "tree":"tr_0 ",
                "index_block_status":"1",
                "status":"1",
                "created_at":"1618488592",
                "updated_at":"1618795267"
            },
            {
                "id":"1104",
                "merchant_id":"0",
                "title":"装扮",
                "cover":"https://img2.epetbar.com/nowater/cates/2014-03/24/b6bfa4ad0717d26d2ad40093a21b3806.jpg@!50w-c",
                "sort":"0",
                "level":"4",
                "pid":"1093",
                "tree":"tr_0 tr_1107 tr_1091 tr_1093 ",
                "index_block_status":"1",
                "status":"1",
                "created_at":"1618467305",
                "updated_at":"1619829658"
            },
            {
                "id":"1103",
                "merchant_id":"0",
                "title":"出行",
                "cover":"https://img2.epetbar.com/nowater/cates/2015-09/18/10/f194f981cb081fb0e2e4a506071fa0e4.jpg@!50w-c",
                "sort":"0",
                "level":"3",
                "pid":"1091",
                "tree":"tr_0 tr_1107 tr_1091 ",
                "index_block_status":"1",
                "status":"1",
                "created_at":"1618467295",
                "updated_at":"1618467987"
            },
            {
                "id":"1102",
                "merchant_id":"0",
                "title":"洗浴",
                "cover":"https://img2.epetbar.com/nowater/2016-07/21/14/75eec5c8310b4a07feb303c9d189b5fc.jpg@!50w-c",
                "sort":"0",
                "level":"4",
                "pid":"1093",
                "tree":"tr_0 tr_1107 tr_1091 tr_1093 ",
                "index_block_status":"1",
                "status":"1",
                "created_at":"1618047560",
                "updated_at":"1618487147"
            },
            {
                "id":"1091",
                "merchant_id":"0",
                "title":"护理",
                "cover":"https://img2.epetbar.com/nowater/cates/2014-03/24/d588b96c7ba10f0d25f9aaaccf62fc51.jpg@!50w-c",
                "sort":"0",
                "level":"2",
                "pid":"1107",
                "tree":"tr_0 tr_1107 ",
                "index_block_status":"1",
                "status":"1",
                "created_at":"1613636119",
                "updated_at":"1618795297"
            },
            {
                "id":"1098",
                "merchant_id":"0",
                "title":"清洁",
                "cover":"https://img2.epetbar.com/nowater/2018-03/29/17/d84be88bc4b3b829df669c4eb4e7acd1.jpg@!50w-c",
                "sort":"3",
                "level":"2",
                "pid":"1107",
                "tree":"tr_0 tr_1107 ",
                "index_block_status":"1",
                "status":"1",
                "created_at":"1615979328",
                "updated_at":"1619829702"
            }
        ],
        "announce":[
            {
                "id":"2140",
                "title":"新款狗粮上市",
                "cover":"http://demo.rageframe.com/attachment/images/2021/05/17/image_1621236409_p31fzFv2.jpeg",
                "synopsis":"新款狗粮上市",
                "view":"12334",
                "created_at":"1621236420"
            },
            {
                "id":"1875",
                "title":"云宠商城全场八折起",
                "cover":"http://demo2.rageframe.com/attachment/images/2021/04/09/image_1617938406_Ws299YMv.png",
                "synopsis":"云宠商城全场八折起",
                "view":"21232",
                "created_at":"1618216164"
            }
        ],
        "product_hot":[
            {
                "id":"428",
                "name":"两只福狸FOFOS",
                "sketch":"萌萌兔礼盒",
                "keywords":"毛绒兔",
                "picture":"https://img2.epetbar.com/common/upload/commonfile/2020/09/18/1801047_178754.jpg",
                "view":"483",
                "match_point":"5.00",
                "price":50,
                "market_price":60,
                "cost_price":40,
                "stock":"191",
                "total_sales":"9",
                "merchant_id":"0",
                "shipping_type":"1",
                "is_open_presell":"0",
                "is_open_commission":"0",
                "is_virtual":"0",
                "point_exchange_type":"1",
                "point_exchange":"0",
                "max_use_point":"0",
                "integral_give_type":"0",
                "give_point":"0",
                "unit":"件101",
                "merchant":null,
                "commissionRate":0
            },
            {
                "id":"423",
                "name":" 优莱仕 M号活力橙T8防爆冲反光胸背带",
                "sketch":"脖围42-64cm ",
                "keywords":"防爆冲",
                "picture":"https://img2.epetbar.com/common/upload/commonfile/2020/05/21/090938_438187.jpg",
                "view":"2287",
                "match_point":"5.00",
                "price":1999,
                "market_price":2199,
                "cost_price":0,
                "stock":"126",
                "total_sales":"418",
                "merchant_id":"0",
                "shipping_type":"2",
                "is_open_presell":"0",
                "is_open_commission":"0",
                "is_virtual":"0",
                "point_exchange_type":"4",
                "point_exchange":"10",
                "max_use_point":"0",
                "integral_give_type":"0",
                "give_point":"300",
                "unit":"条",
                "merchant":null,
                "commissionRate":0
            }
        ],
        "product_recommend":[
            {
                "id":"455",
                "name":"麦德氏",
                "sketch":"日常基础调理系列 ",
                "keywords":"犬用羊乳钙片 150片",
                "picture":"https://img2.epetbar.com/common/upload/commonfile/2021/04/27/163347_635570.jpg",
                "view":"589",
                "match_point":"5.00",
                "price":1999,
                "market_price":0,
                "cost_price":0,
                "stock":"46007",
                "total_sales":"26",
                "merchant_id":"0",
                "shipping_type":"2",
                "is_open_presell":"0",
                "is_open_commission":"0",
                "is_virtual":"0",
                "point_exchange_type":"1",
                "point_exchange":"0",
                "max_use_point":"30",
                "integral_give_type":"0",
                "give_point":"50",
                "unit":"罐",
                "merchant":null,
                "commissionRate":0
            },
            {
                "id":"428",
                "name":"日本爱蓓诗 ",
                "sketch":"牛仔色推车",
                "keywords":"手动刹车",
                "picture":"https://img2.epetbar.com/2018-12/27/11/d3a83cb8e878e501ec4f591cc121f963.jpg",
                "view":"483",
                "match_point":"5.00",
                "price":50,
                "market_price":60,
                "cost_price":40,
                "stock":"191",
                "total_sales":"9",
                "merchant_id":"0",
                "shipping_type":"1",
                "is_open_presell":"0",
                "is_open_commission":"0",
                "is_virtual":"0",
                "point_exchange_type":"1",
                "point_exchange":"0",
                "max_use_point":"0",
                "integral_give_type":"0",
                "give_point":"0",
                "unit":"辆",
                "merchant":null,
                "commissionRate":0
            },
            {
                "id":"420",
                "name":"Jirpet",
                "sketch":"V款实木猫别墅",
                "keywords":"进口松木 实木打造",
                "picture":"https://img2.epetbar.com/common/upload/commonfile/2019/010/25/132328_859384.jpg",
                "view":"2365",
                "match_point":"5.00",
                "price":56,
                "market_price":66,
                "cost_price":0,
                "stock":"565",
                "total_sales":"554",
                "merchant_id":"0",
                "shipping_type":"2",
                "is_open_presell":"0",
                "is_open_commission":"0",
                "is_virtual":"0",
                "point_exchange_type":"1",
                "point_exchange":"0",
                "max_use_point":"0",
                "integral_give_type":"0",
                "give_point":"0",
                "unit":"",
                "merchant":null,
                "commissionRate":0
            }
        ],
        "product_new":[
			{
			    "id":"455",
			    "name":"麦德氏",
			    "sketch":"日常基础调理系列 ",
			    "keywords":"犬用羊乳钙片 150片",
			    "picture":"https://img2.epetbar.com/common/upload/commonfile/2021/04/27/163347_635570.jpg",
			    "view":"589",
			    "match_point":"5.00",
			    "price":1999,
			    "market_price":0,
			    "cost_price":0,
			    "stock":"46007",
			    "total_sales":"26",
			    "merchant_id":"0",
			    "shipping_type":"2",
			    "is_open_presell":"0",
			    "is_open_commission":"0",
			    "is_virtual":"0",
			    "point_exchange_type":"1",
			    "point_exchange":"0",
			    "max_use_point":"30",
			    "integral_give_type":"0",
			    "give_point":"50",
			    "unit":"罐",
			    "merchant":null,
			    "commissionRate":0
			},
			{
			    "id":"428",
			    "name":"日本爱蓓诗 ",
			    "sketch":"牛仔色推车",
			    "keywords":"手动刹车",
			    "picture":"https://img2.epetbar.com/2018-12/27/11/d3a83cb8e878e501ec4f591cc121f963.jpg",
			    "view":"483",
			    "match_point":"5.00",
			    "price":50,
			    "market_price":60,
			    "cost_price":40,
			    "stock":"191",
			    "total_sales":"9",
			    "merchant_id":"0",
			    "shipping_type":"1",
			    "is_open_presell":"0",
			    "is_open_commission":"0",
			    "is_virtual":"0",
			    "point_exchange_type":"1",
			    "point_exchange":"0",
			    "max_use_point":"0",
			    "integral_give_type":"0",
			    "give_point":"0",
			    "unit":"辆",
			    "merchant":null,
			    "commissionRate":0
			},
			{
			    "id":"420",
			    "name":"Jirpet",
			    "sketch":"V款实木猫别墅",
			    "keywords":"进口松木 实木打造",
			    "picture":"https://img2.epetbar.com/common/upload/commonfile/2019/010/25/132328_859384.jpg",
			    "view":"2365",
			    "match_point":"5.00",
			    "price":56,
			    "market_price":66,
			    "cost_price":0,
			    "stock":"565",
			    "total_sales":"554",
			    "merchant_id":"0",
			    "shipping_type":"2",
			    "is_open_presell":"0",
			    "is_open_commission":"0",
			    "is_virtual":"0",
			    "point_exchange_type":"1",
			    "point_exchange":"0",
			    "max_use_point":"0",
			    "integral_give_type":"0",
			    "give_point":"0",
			    "unit":"",
			    "merchant":null,
			    "commissionRate":0
			}
              ],
        "product_wholesale":[
            {
                "id":"40",
                "merchant_id":"0",
                "merchant_name":"",
                "product_id":"60",
                "num":"2",
                "valid_time":"1",
                "type":"1",
                "remark":"",
                "is_recommend":"1",
                "status":"1",
                "created_at":"1591149312",
                "updated_at":"1591149312",
                "merchant":null,
                "product":{
                    "price":0,
                    "market_price":0,
                    "cost_price":0,
                    "wholesale_price":0
                }
            }
        ],
        "guess_you_like":[
            {
                "id":"423",
                "name":" 韩国POTE",
                "sketch":"鱼骨木屋房子 ",
                "keywords":"纯木骨架 ",
                "picture":"https://img2.epetbar.com/goods/sales/upload_file_20194183187.jpg",
                "view":"2287",
                "star":"15",
                "price":1999,
                "market_price":2199,
                "cost_price":0,
                "stock":"126",
                "total_sales":"418",
                "merchant_id":"0",
                "shipping_type":"2",
                "is_open_presell":"0",
                "is_open_commission":"0",
                "is_virtual":"0",
                "point_exchange_type":"4",
                "point_exchange":"10",
                "max_use_point":"0",
                "integral_give_type":"0",
                "give_point":"300",
                "unit":"只"
            }
        ],
        "config":{
            "web_site_icp":"",
            "copyright_companyname":"",
            "copyright_url":"",
            "copyright_desc":"各分部"
        },
        "share":{
            "share_title":"234",
            "share_cover":"http://demo.rageframe.com/attachment/images/2021/05/19/image_1621409115_I1zDvp11.png",
            "share_desc":"234",
            "share_link":"https://www.baidu.com"
        }
    },
    "timestamp":1621704120
}


// 产品分类列表
const productCate = '/tiny-shop/v1/product/cate/index';
// 首页推荐分类
const productCateList = '/tiny-shop/v1/product/cate/list';
// 产品列表
const productList = '/tiny-shop/v1/product/product/index';
// 产品详情
const productDetail = '/tiny-shop/v1/product/product/view';
// 组合套餐详情
const combinationView = '/tiny-shop/v1/marketing/combination/view';
// 猜您喜欢
const guessYouLikeList = '/tiny-shop/v1/product/product/guess-you-like';
// 添加购物车
const cartItemCreate = '/tiny-shop/v1/member/cart-item/create';
// 购物车列表
const cartItemList = '/tiny-shop/v1/member/cart-item/index';
// 购物车列表
const cartItemCount = '/tiny-shop/v1/member/cart-item/count';
// 删除购物车商品
const cartItemDel = '/tiny-shop/v1/member/cart-item/delete-ids';
// 清空购物车
const cartItemClear = '/tiny-shop/v1/member/cart-item/clear';
// 修改购物车商品数量
const cartItemUpdateNum = '/tiny-shop/v1/member/cart-item/update-num';
// 修改购物车商品sku
const cartItemUpdateSku = '/tiny-shop/v1/member/cart-item/update-sku';

// 品牌列表
const brandIndex = '/tiny-shop/v1/product/brand/index';

// 订单创建
const orderCreate = '/tiny-shop/v1/order/order/create';
// 订单预览
const orderPreview = '/tiny-shop/v1/order/order/preview';

// 取消未支付订单
const orderClose = '/tiny-shop/v1/member/order/close';
// 订单支付
const orderPay = '/tiny-shop/v1/common/pay/create';
// 选择快递运费计算
const orderFreightFee = '/tiny-shop/v1/order/order/freight-fee';

// 商品评价列表
const evaluateList = '/tiny-shop/v1/product/evaluate/index';

// 商品评价列表
const orderProductExpressDetails =
	'/tiny-shop/v1/member/order-product-express/details';

// 拼团
// 拼团产品
const wholesaleProductIndex = '/tiny-shop/v1/marketing/wholesale-product/index';
// 开团列表
const wholesaleIndex = '/tiny-shop/v1/marketing/wholesale/index';
// 开团详情
const wholesaleView = '/tiny-shop/v1/marketing/wholesale/view';
// 开团详情
const wholesaleGroupState = '/tiny-shop/v1/marketing/wholesale/group-state';
// 我的开团列表
const myWholesaleIndex = '/tiny-shop/v1/member/wholesale/index';

// 限时折扣
// 限时折扣列表
const discountProductIndex = '/tiny-shop/v1/marketing/discount-product/index';

// 团购
// 团购商品列表
const groupBuyIndex = '/tiny-shop/v1/marketing/group-buy/index';

// 砍价
// 砍价商品列表
const bargainProductIndex = '/tiny-shop/v1/marketing/bargain-product/index';
// 创建砍价
const bargainLaunchCreate = '/tiny-shop/v1/marketing/bargain-launch/create';
// 砍价详情
const bargainLaunchView = '/tiny-shop/v1/marketing/bargain-launch/view';
// 帮好友砍价
const bargainPartakeCreate = '/tiny-shop/v1/marketing/bargain-partake/create';
// 我的砍价列表
const bargainLaunchIndex = '/tiny-shop/v1/marketing/bargain-launch/index';

// 我的砍价列表
const miniProgramLiveIndex = '/tiny-shop/v1/marketing/mini-program-live/index';

// 我的砍价列表
const thirdPartyQrCode = '/tiny-shop/v1/third-party/qr-code';

export {
	indexList,
	productCate,
	productCateList,
	productList,
	guessYouLikeList,
	productDetail,
	combinationView,
	cartItemCreate,
	cartItemList,
	cartItemDel,
	cartItemClear,
	cartItemUpdateNum,
	brandIndex,
	orderCreate,
	orderClose,
	orderPay,
	orderFreightFee,
	evaluateList,
	orderPreview,
	orderProductExpressDetails,
	cartItemUpdateSku,
	cartItemCount,
	wholesaleProductIndex,
	wholesaleIndex,
	wholesaleView,
	wholesaleGroupState,
	myWholesaleIndex,
	discountProductIndex,
	groupBuyIndex,
	bargainProductIndex,
	bargainLaunchCreate,
	bargainLaunchView,
	bargainPartakeCreate,
	bargainLaunchIndex,
	miniProgramLiveIndex,
	thirdPartyQrCode
};

/**
 *@des 个人中心相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/16 11:04:16
 */
// 个人信息
const memberInfo = '/tiny-shop/v1/member/member/index';
/* const memberInfo = {
    "code":200,
    "message":"OK",
    "data":[
        {
            "id":"13986",
            "merchant_id":"0",
            "product_id":"455",
            "member_id":"3918",
            "cate_id":"1111",
            "num":"2",
            "status":"1",
            "created_at":"1621763866",
            "updated_at":"1621763878",
            "product":{
                "id":"455",
                "name":"小米",
                "picture":"http://demo.rageframe.com/attachment/images/2021/04/19/image_1618813733_SVyl9IVI.png",
                "star":"30",
                "transmit_num":"0",
                "comment_num":"5",
                "collect_num":"4",
                "view":"601",
                "product_status":"1",
                "status":"1",
                "minPriceSku":{
                    "id":"6229",
                    "product_id":"455",
                    "price":"1999.00",
                    "market_price":"0.00",
                    "cost_price":"0.00",
                    "wholesale_price":"10.00",
                    "stock":"6105",
                    "code":"0"
                }
            },
            "marketing_type":"wholesale"
        },
        {
            "id":"13985",
            "merchant_id":"0",
            "product_id":"428",
            "member_id":"3918",
            "cate_id":"1092",
            "num":"1",
            "status":"1",
            "created_at":"1621763857",
            "updated_at":"1621763857",
            "product":{
                "id":"428",
                "name":"商品标题商品标题商品标题",
                "picture":"http://demo.rageframe.com/attachment/images/2021/03/15/image_1615794592_m1MijTGv.png",
                "star":"10",
                "transmit_num":"0",
                "comment_num":"1",
                "collect_num":"6",
                "view":"493",
                "product_status":"1",
                "status":"1",
                "minPriceSku":{
                    "id":"6090",
                    "product_id":"428",
                    "price":"50.00",
                    "market_price":"60.00",
                    "cost_price":"40.00",
                    "wholesale_price":"0.00",
                    "stock":"96",
                    "code":"0"
                }
            },
            "marketing_type":""
        },
        {
            "id":"13984",
            "merchant_id":"0",
            "product_id":"420",
            "member_id":"3918",
            "cate_id":"511",
            "num":"1",
            "status":"1",
            "created_at":"1621708254",
            "updated_at":"1621708254",
            "product":{
                "id":"420",
                "name":"费列罗巧克力礼盒装糖果520情人节生日礼物女生送女友 - 复制",
                "picture":"https://www.yllook.com/attachment/images/2020/05/18/image_1589789133_BGGHarAh.png",
                "star":"41",
                "transmit_num":"0",
                "comment_num":"8",
                "collect_num":"7",
                "view":"2366",
                "product_status":"1",
                "status":"1",
                "minPriceSku":{
                    "id":"6059",
                    "product_id":"420",
                    "price":"56.00",
                    "market_price":"66.00",
                    "cost_price":"0.00",
                    "wholesale_price":"0.00",
                    "stock":"565",
                    "code":""
                }
            },
            "marketing_type":"discount"
        },
        {
            "id":"13983",
            "merchant_id":"0",
            "product_id":"423",
            "member_id":"3918",
            "cate_id":"376",
            "num":"5",
            "status":"1",
            "created_at":"1621700443",
            "updated_at":"1621708181",
            "product":{
                "id":"423",
                "name":" Apple AirPods Pro 主动降噪无线蓝牙耳机 适用iPhone/iPad/Apple WatchApple - 复制",
                "picture":"https://www.yllook.com/attachment/images/2020/05/18/image_1589790354_aGr6ERL8.jpg",
                "star":"15",
                "transmit_num":"0",
                "comment_num":"2",
                "collect_num":"2",
                "view":"2292",
                "product_status":"1",
                "status":"1",
                "minPriceSku":{
                    "id":"6085",
                    "product_id":"423",
                    "price":"1999.00",
                    "market_price":"2199.00",
                    "cost_price":"0.00",
                    "wholesale_price":"0.00",
                    "stock":"126",
                    "code":""
                }
            },
            "marketing_type":""
        }
    ],
    "timestamp":1621764022
}
 */// 个人信息修改
const memberUpdate = '/tiny-shop/v1/member/member/update';

// 收货地址列表
const addressList = '/tiny-shop/v1/member/address/index';
// 默认收货地址
const addressDefault = '/tiny-shop/v1/member/address/default';
// 默认收货地址
const addressDetail = '/tiny-shop/v1/member/address/view';
// 创建收货地址
const addressCreate = '/tiny-shop/v1/member/address/create';
// 修改收货地址
const addressUpdate = '/tiny-shop/v1/member/address/update';
// 修改收货地址
const addressDelete = '/tiny-shop/v1/member/address/delete';

// 获取优惠券列表
const couponList = '/tiny-shop/v1/marketing/coupon-type/index';
// 获取我的优惠券列表
const myCouponList = '/tiny-shop/v1/member/coupon/index';
// 优惠券详情
const couponDetail = '/tiny-shop/v1/marketing/coupon-type/view';
// 领取优惠券
const couponReceive = '/tiny-shop/v1/marketing/coupon-type/create';
const couponClear = '/tiny-shop/v1/member/coupon/clear';

// 获取我的订单
const orderList = '/tiny-shop/v1/member/order/index';
// 订单确认收货
const orderTakeDelivery = '/tiny-shop/v1/member/order/take-delivery';
// 退货/退款申请
const orderRefundApply = '/tiny-shop/v1/member/order-product/refund-apply';
// 产品退货提交物流
const orderProductSalesReturn =
	'/tiny-shop/v1/member/order-product/refund-sales-return';
// 关闭退货/退款申请
const closeOrderRefundApply = '/tiny-shop/v1/member/order-product/refund-close';
// 获取订单详情
const orderDetail = '/tiny-shop/v1/member/order/view';
// 删除已关闭订单
const orderDelete = '/tiny-shop/v1/member/order/delete';

// 获取我的足迹
// const footPrintList = '/tiny-shop/v1/member/footprint/index';
const footPrintList = {
    "code":200,
    "message":"OK",
    "data":[
        {
            "id":"13985",
            "merchant_id":"0",
            "product_id":"428",
            "member_id":"3918",
            "cate_id":"1092",
            "num":"2",
            "status":"1",
            "created_at":"1621763857",
            "updated_at":"1621764137",
            "product":{
                "id":"428",
                "name":"麦德氏",
                "picture":"https://img2.epetbar.com/common/upload/commonfile/2021/04/27/163347_635570.jpg",
                "star":"10",
                "transmit_num":"0",
                "comment_num":"1",
                "collect_num":"6",
                "view":"502",
                "product_status":"1",
                "status":"1",
                "minPriceSku":{
                    "id":"6090",
                    "product_id":"428",
                    "price":"50.00",
                    "market_price":"60.00",
                    "cost_price":"40.00",
                    "wholesale_price":"0.00",
                    "stock":"96",
                    "code":"0"
                }
            },
            "marketing_type":""
        },
        {
            "id":"13986",
            "merchant_id":"0",
            "product_id":"455",
            "member_id":"3918",
            "cate_id":"1111",
            "num":"2",
            "status":"1",
            "created_at":"1621763866",
            "updated_at":"1621763878",
            "product":{
                "id":"455",
                "name":"日本爱蓓诗",
                "picture":"https://img2.epetbar.com/2018-12/27/11/d3a83cb8e878e501ec4f591cc121f963.jpg",
                "star":"30",
                "transmit_num":"0",
                "comment_num":"5",
                "collect_num":"4",
                "view":"607",
                "product_status":"1",
                "status":"1",
                "minPriceSku":{
                    "id":"6229",
                    "product_id":"455",
                    "price":"1999.00",
                    "market_price":"0.00",
                    "cost_price":"0.00",
                    "wholesale_price":"10.00",
                    "stock":"6105",
                    "code":"0"
                }
            },
            "marketing_type":"wholesale"
        },
        {
            "id":"13984",
            "merchant_id":"0",
            "product_id":"420",
            "member_id":"3918",
            "cate_id":"511",
            "num":"1",
            "status":"1",
            "created_at":"1621708254",
            "updated_at":"1621708254",
            "product":{
                "id":"420",
                "name":"V款实木猫别墅",
                "picture":"https://img2.epetbar.com/common/upload/commonfile/2019/010/25/132328_859384.jpg",
                "star":"41",
                "transmit_num":"0",
                "comment_num":"8",
                "collect_num":"7",
                "view":"2368",
                "product_status":"1",
                "status":"1",
                "minPriceSku":{
                    "id":"6059",
                    "product_id":"420",
                    "price":"56.00",
                    "market_price":"66.00",
                    "cost_price":"0.00",
                    "wholesale_price":"0.00",
                    "stock":"565",
                    "code":""
                }
            },
            "marketing_type":"discount"
        },
        {
            "id":"13983",
            "merchant_id":"0",
            "product_id":"423",
            "member_id":"3918",
            "cate_id":"376",
            "num":"5",
            "status":"1",
            "created_at":"1621700443",
            "updated_at":"1621708181",
            "product":{
                "id":"423",
                "name":" 鱼骨木屋房子",
                "picture":"https://img2.epetbar.com/goods/sales/upload_file_20194183187.jpg",
                "star":"15",
                "transmit_num":"0",
                "comment_num":"2",
                "collect_num":"2",
                "view":"2294",
                "product_status":"1",
                "status":"1",
                "minPriceSku":{
                    "id":"6085",
                    "product_id":"423",
                    "price":"1999.00",
                    "market_price":"2199.00",
                    "cost_price":"0.00",
                    "wholesale_price":"0.00",
                    "stock":"126",
                    "code":""
                }
            },
            "marketing_type":""
        }
    ],
    "timestamp":1621778230
}
// 删除我的足迹
const footPrintDel = '/tiny-shop/v1/member/footprint/delete';

// 收藏列表
const collectList = '/tiny-shop/v1/member/collect/index';

// 积分余额日志
const creditsLogList = '/tiny-shop/v1/member/credits-log/index';

// 创建订单评价
const evaluateCreate = '/tiny-shop/v1/member/evaluate/create';
// 追加评价
const evaluateAgain = '/tiny-shop/v1/member/evaluate/again';
// 订单商品
const orderProductIndex = '/tiny-shop/v1/member/order-product/index';

// 发票列表
const invoiceList = '/tiny-shop/v1/member/invoice/index';
// 发票列表
const invoiceCreate = '/tiny-shop/v1/member/invoice/create';
// 发票编辑
const invoiceUpdate = '/tiny-shop/v1/member/invoice/update';
// 发票详情
const invoiceDetail = '/tiny-shop/v1/member/invoice/view';
// 默认发票
const invoiceDefault = '/tiny-shop/v1/member/invoice/default';
// 删除发票
const invoiceDel = '/tiny-shop/v1/member/invoice/delete';
// 开票列表
const orderInvoiceList = '/tiny-shop/v1/member/order-invoice/index';
// 发票补领
const orderInvoiceCreate = '/tiny-shop/v1/member/order-invoice/create';

// 意见反馈列表
const opinionList = '/tiny-shop/v1/member/opinion/index';
// 意见反馈创建
const opinionCreate = '/tiny-shop/v1/member/opinion/create';
// 意见反馈详情
const opinionDetail = '/tiny-shop/v1/member/opinion/view';

// 第三方授权列表
const thirdPartyAuthList = '/tiny-shop/v1/member/auth/index';
// 解除第三方授权列表
const thirdPartyAuthDelete = '/tiny-shop/v1/member/auth/delete';

// 充值金额
const rechargeConfigIndex = '/tiny-shop/v1/member/recharge-config/index';

// 订单售后
// 申请退款/退货
const orderCustomerRefundApply = '/tiny-shop/v1/member/order-customer/apply';
// 退货提交物流
const orderCustomerSalesReturn =
	'/tiny-shop/v1/member/order-customer/sales-return';
// 退款/退货关闭申请
const orderCustomerRefundClose = '/tiny-shop/v1/member/order-customer/close';

// 上传图片
const uploadImage = '/tiny-shop/v1/common/file/images';

// 消息通知
// 消息列表
const notifyIndex = '/tiny-shop/v1/member/notify/index';
// 消息详情
const notifyView = '/tiny-shop/v1/member/notify/view';
// 单个消息阅读
const notifyRead = '/tiny-shop/v1/member/notify/read';
// 全部已读
const notifyReadAll = '/tiny-shop/v1/member/notify/read-all';
// 删除一条或者多条
const notifyClear = '/tiny-shop/v1/member/notify/clear';
// 清空消息记录
const notifyClearAll = '/tiny-shop/v1/member/notify/clear-all';
// 未读消息个数
const notifyUnRreadCount = '/tiny-shop/v1/member/notify/un-read-count';
// 消息提醒配置
const notifySubscriptionConfigIndex =
	'/tiny-shop/v1/member/notify-subscription-config/index';
// 修改消息提醒配置
const notifySubscriptionConfigUpConfig =
	'/tiny-shop/v1/member/notify-subscription-config/up-config';

// 虚拟码列表
const orderProductVirtualIndex =
	'/tiny-shop/v1/member/order-product-virtual/index';
// 虚拟码详情
const orderProductVirtualView =
	'/tiny-shop/v1/member/order-product-virtual/view';
// 虚拟码详情
const productVirtualVerificationVerify =
	'/tiny-shop/v1/order/product-virtual-verification/verify';

// 会员等级
const memberLevelIndex = '/tiny-shop/v1/member/member-level/index';

export {
	memberInfo,
	memberUpdate,
	addressList,
	addressCreate,
	addressDefault,
	addressDetail,
	addressUpdate,
	addressDelete,
	couponList,
	myCouponList,
	couponClear,
	couponDetail,
	orderList,
	orderRefundApply,
	closeOrderRefundApply,
	orderProductSalesReturn,
	orderDetail,
	orderDelete,
	orderTakeDelivery,
	couponReceive,
	footPrintList,
	footPrintDel,
	collectList,
	creditsLogList,
	evaluateCreate,
	evaluateAgain,
	invoiceList,
	invoiceCreate,
	invoiceUpdate,
	invoiceDetail,
	invoiceDefault,
	invoiceDel,
	orderInvoiceCreate,
	orderInvoiceList,
	uploadImage,
	opinionList,
	opinionCreate,
	opinionDetail,
	thirdPartyAuthList,
	thirdPartyAuthDelete,
	rechargeConfigIndex,
	orderCustomerSalesReturn,
	orderCustomerRefundApply,
	orderCustomerRefundClose,
	orderProductIndex,
	notifyIndex,
	notifyView,
	notifyRead,
	notifyReadAll,
	notifyClear,
	notifyClearAll,
	notifyUnRreadCount,
	notifySubscriptionConfigUpConfig,
	notifySubscriptionConfigIndex,
	orderProductVirtualIndex,
	orderProductVirtualView,
	productVirtualVerificationVerify,
	memberLevelIndex
};

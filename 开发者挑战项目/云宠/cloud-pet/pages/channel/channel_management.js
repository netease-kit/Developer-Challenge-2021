//本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm
import app from "../../App.vue"


	// 定义全局参数,控制数据加载
	var _self, page = 1,timer = null;

	export default {
		data() {
			return {
				loadingText: '',
				list_Titles: [
					{
						item:'萌宠',
				
					},
					{
						item:'鬼畜',
				
					},
					{
						item:'科普',
				
					},
					{
						item:'日常',
				
					},
					{
						item:'搞笑',
				
					},
					{
						item:'知识',
				
					},
					{
						item:'更多',
				
					},
					
					],
				friendList: [{
							name: '萌宠',
							imgUrl: 'https://i0.hdslb.com/bfs/tag/ad979742df2c88fa101ac8838dffa3592ae6da44.jpg@144w_145h_1c_100q.webp',
							id: '',
							msg: '988.4万个视频 ',
							zhiboList:[
								{
									src:'https://i0.hdslb.com/bfs/tag/14cc6722e84296849381b1cfc31f02ed1190a174.png@144w_145h_1c_100q.webp',
									up:'等什么君',
									title:'【演员干不过一只猫】'
								},
								{
									src:'https://i0.hdslb.com/bfs/tag/d9dfa5bc6a955f8574ae5088e333dbd10f4adf1f.jpg@144w_145h_1c_100q.webp',
									up:'等什么君',
									title:'【演员干不过一只猫】'
								},
								{
									src:'https://i0.hdslb.com/bfs/tag/d9dfa5bc6a955f8574ae5088e333dbd10f4adf1f.jpg@144w_145h_1c_100q.webp',
									up:'等什么君',
									title:'【演员干不过一只猫】'
								}
							]
						},
						{
							name: '鬼畜',
							imgUrl: 'https://i0.hdslb.com/bfs/archive/4afb90b88597f226d22fdaed28a5c4769b372fdc.png@144w_145h_1c_100q.webp',
							id: '',
							msg: '988.4万个视频 ',
							zhiboList:[
								{
									src:'https://i0.hdslb.com/bfs/tag/14cc6722e84296849381b1cfc31f02ed1190a174.png@144w_145h_1c_100q.webp',
									up:'等什么君',
									title:'【演员干不过一只猫】'
								},
								{
									src:'https://i0.hdslb.com/bfs/tag/d9dfa5bc6a955f8574ae5088e333dbd10f4adf1f.jpg@144w_145h_1c_100q.webp',
									up:'等什么君',
									title:'【演员干不过一只猫】'
								},
								{
									src:'https://i0.hdslb.com/bfs/tag/d9dfa5bc6a955f8574ae5088e333dbd10f4adf1f.jpg@144w_145h_1c_100q.webp',
									up:'等什么君',
									title:'【演员干不过一只猫】'
								}
							]
						},
						{
							name: '搞笑',
							imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=116984941,698239247&fm=26&gp=0.jpg',
							id: '',
							msg: '988.4万个视频 ',
							zhiboList:[
								{
									src:'https://i0.hdslb.com/bfs/tag/14cc6722e84296849381b1cfc31f02ed1190a174.png@144w_145h_1c_100q.webp',
									up:'等什么君',
									title:'【演员干不过一只猫】'
								},
								{
									src:'https://i0.hdslb.com/bfs/tag/d9dfa5bc6a955f8574ae5088e333dbd10f4adf1f.jpg@144w_145h_1c_100q.webp',
									up:'等什么君',
									title:'【演员干不过一只猫】'
								},
								{
									src:'https://i0.hdslb.com/bfs/tag/d9dfa5bc6a955f8574ae5088e333dbd10f4adf1f.jpg@144w_145h_1c_100q.webp',
									up:'等什么君',
									title:'【演员干不过一只猫】'
								}
							]
						}
					],
							
 
				page:0,//当前分页页码
				// apiUrl:'https://www.ymznkf.com/wx_server',//后端接口地址
				id:'',//传值使用,方便存在本地的locakStorage  
				del_id:''//方便存在本地的locakStorage  
			}
		},
		components:{

		},
		onLoad(options) {
			_self = this;
			
			//检查是否登录参考代码,需要用的时候，可以把注释取掉
			//if(this.checkLogin()==false){
			//	return;
			//}
			
			//this.getLaction();//得到gps

			this.page=0;

			//检测有没有传入id参数
			if (options.id != null && options.id !=""){
				this.id=options.id;
			}   
			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");

		},
		onShow() {
			console.log("on show");
			//if(this.checkLogin()==false){
			//	return;
			//}

			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.Refresh();
		},
		methods: {

			//刷新数据
			Refresh:function(_action) {
			
				uni.showLoading();
				
				//提交到服务器
				var that = this
				var url=that.apiUrl+'{server_code_file_path}';
				console.log(url);
				uni.request({
				url: url,//后端接口地址，需要改成自己的接口地址
				data: {
					action: _action,//上传动作，如按钮点击会产生click动作，分页也会产生，在后端根据具体的动作来判断事件
					uid: that.getUid(),//上传用户id,在登录中获得
					//上传页面中的变量
					//定义变量---start
					
					//定义变量---end
					id: that.id,//上传id值，后端可以根据此值来操作当前id
					del_id: that.del_id,//在列表中删除按钮选中时，上传到有后端，进行删除操作
					page:that.page
				},
				method: 'GET',
				success: function (res) {//后端返回数据

					// 隐藏导航栏加载框  
					uni.hideNavigationBarLoading();
					// 停止下拉动作  
					uni.stopPullDownRefresh();  

					// 隐藏加载框  
					uni.hideLoading();  

					var tmp = res.data;

					//初始化，对页面上的控件进行赋值操作
					if(_action=="init"){

					}

{deal_listpages}



					//如果后端有返回消息，则弹出消息提示
					if (tmp.message != null && tmp.message != "") {
						uni.showToast({
						title: tmp.message,
						icon: 'none',
						duration: 2000
						})
					}



					//如果后端有返回页码，则更改当前页码
					if(tmp.page!=null && tmp.page!=""){
						page=tmp.page;
					}					

				},
				fail: function (res) {
					uni.showToast({
						title: "服务器访问失败",
						icon: 'none',
						duration: 2000
					})
					console.log(res.data);
					console.log('is failed')
				}
				})
			},
		}
	}

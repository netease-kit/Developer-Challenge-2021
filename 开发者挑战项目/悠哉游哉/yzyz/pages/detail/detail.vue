<template>
	<!-- 
	 本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2717
	 uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	 uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	 uni-clientDB 组件文档：https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component
	 DB Schema 规范：https://uniapp.dcloud.net.cn/uniCloud/schema
	 -->
	<view class="article">
		<uni-clientdb v-slot:default="{data, loading, error, options}" :options="formData" :collection="collection" :field="field"
		 :getone="true" :where="where" :manual="true" ref="detail" @load="loadData">
			<template v-if="!loading && data">
				<view class="article-title">{{title}}</view>
				<uni-list :border="false">
					<uni-list-item thumbSize="lg" :thumb="data.author_avatar">
						<!-- 通过body插槽定义作者信息内容 -->
						<view slot="body" class="header-content">
							<view class="uni-title">{{data.author_name}}</view>
							<view class="uni-note">更新于 {{data.last_modify_date}} </view>
						</view>
						<view slot="footer" class="footer">
							<button class="footer-button">关注</button>
						</view>
					</uni-list-item>
				</uni-list>
				<view class="banner">
					<!-- 文章开头，缩略图 -->
					<image class="banner-img" :src="data.cover" mode="widthFix"></image>
					<!-- 文章摘要 -->
					<view class="banner-title">
						<text class="uni-ellipsis">{{data.excerpt}}</text>
					</view>
				</view>
				<!-- 新闻详情：使用 uParse 解析富文本 -->
				<view class="article-content">
					<u-parse :content="data.content" :noData="options.noData"></u-parse>
				</view>
			</template>
		</uni-clientdb>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				// 当前显示 _id == "5fa659b721284e000101a37e" ,只做演示使用，可通过详情页传递id过来
				id:"608ffce30f23980001db8725",
				title:'',
				// 数据表名
				collection: 'opendb-news-articles-detail',
				// 查询字段，多个字段用 , 分割
				field: 'title,author_avatar,author_name,author_name,last_modify_date,cover,excerpt,content',
				formData: {
					noData: '<p style="text-align:center;color:#666">详情加载中...</p>'
				}, 
			}
		},
		computed:{
			//拼接where条件
			//查询条件 ,更多详见 ：https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB?id=jsquery
			where(){
				return `_id =="${this.id}"`
			}
		},
		onLoad(event) {
			//获取真实新闻id，通常 id 来自上一个页面
			if(event.id){
				this.id = event.id
				this.id = '608ffce30f23980001db8725'
			}
			//若上一页传递了标题过来，则设置导航栏标题
			if(event.title){
				this.title = event.title
				uni.setNavigationBarTitle({
					title:event.title
				})
			}
		},
		onReady() {
			// 开始加载数据，修改 where 条件后才开始去加载 clinetDB 的数据 ，需要等组件渲染完毕后才开始执行 loadData，所以不能再 onLoad 中执行
			if(this.id){// ID 不为空，则发起查询
				this.$refs.detail.loadData()
			}else{
				uni.showToast({
					icon:'none',
					title:'出错了，新闻ID为空'
				})
			}
		},
		methods: {
			loadData(data){
				//如果上一页未传递标题过来（如搜索直达详情），则从新闻详情中读取标题
				if(this.title == '' && data[0].title){
					this.title = data[0].title
					uni.setNavigationBarTitle({
						title:data[0].title
					})
				}
			}
		}
	}
</script>

<style>
	.header-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 14px;
	}

	/* 标题 */
	.uni-title {
		display: flex;
		margin-bottom: 5px;
		font-size: 14px;
		font-weight: bold;
		color: #3b4144;
	}

	/* 描述 额外文本 */
	.uni-note {
		color: #999;
		font-size: 12px;
	}

	.footer {
		display: flex;
		align-items: center;
	}

	.footer-button {
		display: flex;
		align-items: center;
		font-size: 12px;
		height: 30px;
		color: #fff;
		background-color: #ff5a5f;
	}

	.banner {
		position: relative;
		margin: 0 15px;
		height: 180px;
		overflow: hidden;
	}

	.banner-img {
		position: absolute;
		width: 100%;
	}

	.banner-title {
		display: flex;
		align-items: center;
		position: absolute;
		padding: 0 15px;
		width: 100%;
		bottom: 0;
		height: 30px;
		font-size: 14px;
		color: #fff;
		background: rgba(0, 0, 0, 0.4);
		overflow: hidden;
		box-sizing: border-box;
	}

	.uni-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.article-title {
		padding: 20px 15px;
		padding-bottom: 0;
	}

	.article-content {
		padding: 15px;
		font-size: 15px;
		overflow: hidden;
	}
</style>

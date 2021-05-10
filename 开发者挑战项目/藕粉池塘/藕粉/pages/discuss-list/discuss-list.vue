<template>
	<view>
		<discuss-list :list="disList" :loadStatus="loadStatus"></discuss-list>
	</view>
</template>

<script>
	import disList from '../../components/discuss-list/discuss-list';
	export default {
		components: {
			disList
		},
		data() {
			return {
				disList: [],
				loadStatus: "loadmore",
				page:1
			};
		},
		onLoad() {
			this.getDisList();
		},
		onReachBottom() {
			this.page++;
			this.getDisList();
		},
		methods: {
			getDisList() {
				this.loadStatus = "loading";
				this.$H.get("discuss/list",{
					page:this.page
				}).then(res => {
					this.disList = res.result.data;
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			},
		}
	}
</script>

<style lang="scss">

</style>

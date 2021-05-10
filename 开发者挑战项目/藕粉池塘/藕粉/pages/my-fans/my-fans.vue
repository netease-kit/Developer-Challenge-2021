<template>
	<view>
		<user-list :list="userList"></user-list>
	</view>
</template>

<script>
	import userList from '../../components/user-list/user-list.vue';
	export default {
		components: {
			userList,
		},
		data() {
			return {
				userList: [],
				page:1,
				loadStatus: "loadmore"
			};
		},
		onLoad() {
			this.getUserList();
		},
		methods: {
			getUserList() {
				this.loadStatus = "loading";
				this.$H.post('user/fans', {
					page: this.page
				}).then(res => {
					this.userList = this.userList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			}			
		}
	}
</script>

<style lang="scss">
	
</style>

<template>
	<view class="main">
		<uni-section :title="'赏金订单'+(index+1).toString()" type="line" v-for="(item,index) of ListData" :key="index">
			<uni-card :title="item.name" :extra="item.time">
				<view class="uni-body">收货地址:{{item.address}}</view>
				<view class="uni-body">快递:{{item.category}}</view>
				<view class="uni-body">联系电话:{{item.phone}}</view>
				<view class="uni-body">赏金:{{item.price}}</view>
			</uni-card>
		</uni-section>
		<view class="btn">
			<button type="primary" size="mini" @click="subfab">发布需求</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ListData: []
			}
		},
		mounted() {
			this.getList()
		},

		methods: {
			async getList() {
				const { data: data } = await uni.$http.post('/jz/selorder')
				console.log(data);
				if (data.code !== 20000)
					uni.showToast({
						icon: "error",
						title: '获取订单失败'
					})
				this.ListData = data.data
			},
			subfab() {
				uni.navigateTo({
					url: '../kd_details/kd_details'
				})
			}
		},
	}
</script>

<style lang="scss">
	.main {
		width: 100vw;
		height: 95vh;
		background-color: rgba(240, 240, 240, 1);
		overflow: auto;
	}

	.btn {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%);
	}
</style>

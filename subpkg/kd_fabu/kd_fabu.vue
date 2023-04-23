<template>
	<view class="main">
		<view class="wudingdan" v-if="dingdan.length==0">
			<text>无订单</text>
		</view>
		<view class="dingdan" v-else>
			<view class="dingdan-top" v-for="(item,index) in dingdan" :key="index">
				<view class="cont-title">
					<text>用户名:{{item.name}}</text>
					<br>
					<text>地址:{{item.address}}</text>
					<br>
					<text>取件码:{{item.order}}</text>
					<br>
					<text>发布人:{{item.openid}}</text>
				</view>
				<text>￥{{item.price}}</text>
			</view>
		</view>
	</view>
</template>
<style lang="scss">
	[v-cloak] {
		display: none;
	}

	.main {
		height: 100vh;
		background-color: rgba(240, 240, 240, 1);
		display: flex;
		flex-direction: column;
		align-items: center;

		.dingdan {
			width: 90vw;


			.dingdan-top {

				// display: flex;
				// justify-content: center;
				width: 100%;
				// height: 200rpx;
				margin-top: 20rpx;
				background-color: #fff;
				border-radius: 5px;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 1);

				.cont-title {
					padding-left: 20rpx;

					text {
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
<script>
	export default {
		data() {
			return {
				dingdan: []
			}
		},
		mounted() {
			this.getKdDingd()
		},
		methods: {
			/**
			 * 获取接单数据
			 */
			async getKdDingd() {
				const { data: data } = await uni.$http.post('/jz/getfabu', { openid: uni.getStorageSync('openid') })
				if (data.code == 20000) {
					this.dingdan = data.data
				} else {
					uni.showToast({
						icon: "error",
						duration: 2000,
						title: "数据获取失败"
					})
				}
			}
		}
	}
</script>

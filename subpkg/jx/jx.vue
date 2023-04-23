<template>
	<view class="jx">
		<view class="jx-cont" @click="navgetToDetails(item.tabName)" v-for="(item,index) in jxmessage" :key="index">
			<view class="jx-title">
				<text>热门<text>驾校:{{item.tabName}}</text></text>
				<text>累计已招收学员<text>{{item.xueyuan}}</text>人</text>
			</view>
			<img :src="item.img" alt="">
			<view class="jx-titlebt">
				<text>专业班手动波</text>
				<text>￥{{item.price}}.00</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jxmessage: [

				]
			}
		},
		onShow() {
			this.getCartCont()
		},
		methods: {
			async getCartCont() {
				const { data: res } = await uni.$http.post('/jx/jiaxiao')
				this.jxmessage = res.status
				if (res.message == '身份认证失败')
					uni.reLaunch({
						url: '../../pages/my/my'
					})
			},
			navgetToDetails(tabName) {
				uni.redirectTo({
					url: '../jx_details/jx_details?carname=' + tabName
				})
			}
		}
	}
</script>

<style lang='scss'>
	.jx {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgba(240, 240, 240, 1);

		.jx-cont {
			border-radius: 10rpx;
			margin-top: 20rpx;
			height: 30vh;
			width: 90vw;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			box-shadow: 0 0 10px rgba(0, 0, 0, .5);

			.jx-title {
				padding: 0 15rpx;
				margin-top: 10rpx;
				display: flex;
				justify-content: space-between;

				text {
					&:nth-child(1) {
						font-weight: bold;

						text {
							font-style: italic;
							color: #CA5340;
						}
					}

					&:nth-child(2) {
						font-size: 14px;
						color: #999999;

						text {
							background-color: #DC322A;
							padding: 1px;
							color: #fff;
							border-radius: 5px;
						}
					}
				}
			}

			img {
				box-sizing: border-box;
				width: 100%;
				height: 70%;
				padding: 0 15rpx;
			}

			.jx-titlebt {
				margin-top: 10rpx;
				padding: 0 15rpx;
				display: flex;
				justify-content: space-between;

				text {
					&:nth-child(1) {
						font-weight: bold;
					}

					&:nth-child(2) {
						font-weight: bold;
						color: #DC322A;
					}
				}
			}
		}
	}
</style>

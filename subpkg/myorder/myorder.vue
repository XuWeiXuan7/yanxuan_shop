<template>
	<view class="main">
		<uni-nav-bar background-color="#fff" left-text="返回" left-icon="left" fixed="true" :border="false"
			statusBar="false" @clickLeft="back" backgroundColor="#FEE34C" title="已完成订单">
		</uni-nav-bar>
		<view class="dingdan">
			<view class="dingdetail">
				<view class="dingdan-top">
					<view class="cont">
						<img src="https://i.postimg.cc/jj5kLWQH/1.jpg" alt="">
						<view class="cont-title">
							<text>肉蛋肠</text>
							<br>
							<text>x1</text>
						</view>
						<text>￥5.00</text>
					</view>
				</view>
				<view class="dingdan-bot">
					<text>合计:￥12.00</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dingdan: []
			}
		},

		async mounted() {
			await this.mydingdan()
		},
		methods: {
			back() {
				uni.redirectTo({
					url: '../../pages/my/my'
				})
			},
			//获取订单
			async mydingdan() {
				const idt = uni.getStorageSync('user').signature
				console.log(idt);
				const { data: res } = await uni.$http.post('/my/mydingdan', {
					signature: idt
				})
				this.dingdan = res.status
			}
		}
	}
</script>

<style lang="scss">
	.main {
		height: 100vh;
		background-color: rgba(240, 240, 240, 1);

		.dingdan {
			background-color: #fff;
			margin: 20rpx auto;
			width: 90vw;

			.dingdan-top {
				display: flex;
				flex-direction: column;
				padding: 50rpx;

				.cont {
					display: flex;

					img {
						width: 100rpx;
						height: 100rpx;
					}

					.cont-title {
						margin-left: 50rpx;

						text {
							&:nth-child(1) {
								font-weight: bold;
							}

							&:nth-child(2) {
								color: gainsboro;
							}
						}
					}

					>text {
						font-weight: bold;
						width: 40vw;
						text-align: right;
					}
				}
			}

			.dingdan-bot {
				padding: 50rpx;
				text-align: right;
			}
		}
	}
</style>

<template>
	<view class="main">
		<uni-nav-bar background-color="#fff" left-text="返回" left-icon="left" fixed="true" :border="false"
			statusBar="false" @clickLeft="back" backgroundColor="#FEE34C" title="已完成订单">
		</uni-nav-bar>
		<view class="wudingdan" v-if="tag==1&&dingdan.length==0">
			<text>无订单</text>
		</view>
		<view class="dingdan" v-else>
			<view class="dingdetail">
				<view class="dingdan-top" v-for="(item,index) in dingdan" :key="index">
					<view class="cont" v-for="(item1,index) in item" :key="index">
						<img :src="item1.img">
						<view class="cont-title">
							<text>{{item1.title}}</text>
							<br>
							<text>x{{item1.num}}</text>
						</view>
						<text>￥{{item1.price}}</text>
					</view>
					<view class="dingdan-bot">
						<text>合计:￥{{item | totalprice}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dingdan: [],
				tag: 0
			}
		},
		filters: {
			totalprice(data) {
				let price = 0
				data.forEach((item) => {
					price += item.price * item.num
				})
				return price
			}
		},

		async onShow() {
			await this.mydingdan()
			console.log(this.dingdan.length);
		},
		methods: {
			back() {
				uni.reLaunch({
					url: '../../pages/my/my'
				})
			},
			//获取订单
			async mydingdan() {
				try {
					const id = uni.getStorageSync('openid')
					const { data: res } = await uni.$http.post('/my/mydingdan', {
						signature: id
					})
					// this.dingdan = res.status
					this.tag = 1
					res.status.forEach((item) => {
						this.dingdan.push(JSON.parse(item.commodity))
					})
				} catch (e) {
					console.log(e);
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
	[v-cloak] {
		display: none;
	}

	.main {
		height: 100vh;
		background-color: rgba(240, 240, 240, 1);

		.wudingdan {
			margin-top: 20rpx;

			display: flex;
			align-items: center;
			justify-content: center;

			text {
				border-radius: 20rpx;
				text-align: center;
				line-height: 10vh;
				background-color: #FFE658;
				width: 90vw;
				height: 10vh;
			}
		}

		.dingdan {
			// background-color: #fff;
			margin: 20rpx auto;
			width: 90vw;

			.dingdan-top {
				display: flex;
				flex-direction: column;
				margin-bottom: 30rpx;
				background-color: #fff;

				.cont {
					display: flex;
					padding: 50rpx;

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

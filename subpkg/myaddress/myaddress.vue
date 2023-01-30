<template>
	<view class="main">
		<uni-nav-bar background-color="#fff" left-text="返回" left-icon="left" fixed="true" :border="false"
			statusBar="false" @clickLeft="back" backgroundColor="#FEE34C">
		</uni-nav-bar>
		<view class="address_zt">
			<view class="kong" @click="add" v-if="Object.keys(address).length==0">
				<text>+添加收货地址</text>
			</view>
			<view class="address_cl" v-else>
				<view class="cl">
					<view class="cl-top">
						<uni-icons type="location-filled" size="40" color="orange"></uni-icons>
						<view class="cl-topright">
							<text>{{address.name}}&nbsp;&nbsp;{{address.phone}}</text>
							<br>
							<text>{{address.detaddress}}</text>
						</view>
					</view>
					<view class="cl-bottom">
						<button type="warn" size="mini" @click="removeAdd">删除</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				address: {}
			}
		},
		onLoad() {
			console.log(111);
			try {
				this.address = JSON.parse(uni.getStorageSync('dizhi'))
			} catch (e) {
				//TODO handle the exception
			}
		},
		methods: {
			back() {
				uni.redirectTo({
					url: '../../pages/my/my'
				})
			},
			// 详细地址
			add() {
				uni.redirectTo({
					url: '../address/address'
				})
			},
			removeAdd() {
				uni.removeStorageSync('dizhi')
				this.address = {}
			}
		}
	}
</script>
<style lang="scss">
	.main {
		height: 100vh;
		background-color: rgba(240, 240, 240, 1);

		.address_zt {
			display: flex;
			justify-content: center;

			.kong {
				margin-top: 50rpx;
				width: 90vw;
				height: 10vh;
				background-color: #FFE658;
				border-radius: 15rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				text {
					font-weight: bold;
				}
			}

			.address_cl {
				.cl {
					display: flex;
					height: 15vh;
					width: 100vw;
					background-color: #fff;
					margin-top: 20rpx;
					flex-direction: column;

					.cl-top {
						padding: 30rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;

						.cl-topright {
							margin-left: 70rpx;

							text {
								&:nth-child(1) {
									font-size: 18px;
									font-weight: bold;
								}

								&:nth-child(2) {
									font-size: 12px;
								}
							}
						}
					}

					.cl-bottom {
						text-align: right;
						margin-right: 30rpx;
					}
				}

			}
		}
	}
</style>

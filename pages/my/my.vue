<template>
	<view class="main">
		<uni-nav-bar background-color="#c00000" left-text="返回" left-icon="left" fixed="true" :border="false"
			statusBar="false" @clickLeft="back" backgroundColor="#FEE34C">
		</uni-nav-bar>

		<view class="denglu" v-if="tag==1&&openID==''">
			<view class="dl_img">
				<img src="./image/logo.png" alt="">
			</view>
			<button type="warn" size="20" @click="login" class="deng_qian">微信登录</button>
		</view>
		<view class="denglu-zt" v-else>
			<view class="touxiang">
				<view class="tou_img">
					<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<img class="avatar" :src="userinfo.userInfo.avatarUrl"></img>
					</button>
				</view>
				<view class="tou_title">
					<input type="nickname" class="weui-input" placeholder="请输入昵称" :value="userinfo.userInfo.nickName">
					<br>
					<text class="tou_id">{{userinfo.cloudID | UserID}}</text>
				</view>
			</view>
			<view class="dingdan">
				<view class="dingdan-title">
					<text>我的功能</text>
				</view>
				<view class="dingdan_xuan">
					<view class="xuanxiang" v-for="(item,index) in xuanx" :key="index" @click="orderclass(index)">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
			<view class="swiper_lun">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular
					indicator-active-color="red" :current="0">
					<swiper-item v-for="(item,index) in myswiper" :key="index">
						<view class="swiper-item">
							<img :src="item.img" alt="">
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="gengdou">
				<view class="gengdou_title">
					<text>更多功能</text>
				</view>
				<view class="gongneng">
					<view class="vip">
						<view class="icon_title">
							<uni-icons type="person-filled" size="30" color="#9B7A53"></uni-icons>
							<text>管理员申请</text>
						</view>
						<view class="vip_sq" @click="vip">
							<text>轻松管理店铺</text>
							<uni-icons type="right"></uni-icons>
						</view>
					</view>
					<view class="yuanma">
						<view class="icon_title">
							<uni-icons type="shop-filled" size="30" color="#9B7A53">
							</uni-icons>
							<text>源码需求</text>
						</view>
						<view class="scund" @click="gaincode">
							<text>源码需求申请</text>
							<uni-icons type="right"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				userinfo: '',
				xuanx: ['全部订单', '我的地址', '退出登录'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				openID: '',
				tag: 0,
				myswiper: []
			}
		},
		filters: {
			UserID(data) {
				try {
					return data.substr(0, 11)
				} catch (e) {
					//TODO handle the exception
					console.log('加载问题');
				}
			}
		},
		computed: {
			...mapState('m_my', ['token'])
		},
		created() {
			this.openID = uni.getStorageSync('openid')
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('user')
			this.tag = 1
			this.avatarUrl = uni.getStorageSync('login').avatarUrl
			this.getSwiper()
		},
		methods: {
			...mapMutations('m_my', ['getToken']),
			/**
			 * @param {Object} 获取轮播图
			 */
			async getSwiper() {
				const data = await uni.$http.post('/my/swiper')
				console.log(data);
				if (data.statusCode == 200) {
					this.myswiper = data.data.data
				}
			},
			onChooseAvatar(e) {
				console.log(1111);
				this.avatarUrl = e.detail.avatarUrl

			},
			//导航栏返回首页
			back() {
				console.log(111);
				uni.switchTab({
					url: '../home/home'
				})
			},
			async login() {
				/**
				 * 前台登录获取token
				 */
				let that = this
				wx.getUserProfile({
					desc: '用于用户登录',
					success: res => {
						uni.setStorageSync('user', res)
						that.userinfo = res
						uni.login({
							provider: "weixin",
							success: async function(res) {
								const data = await uni.$http.post('/my/loginid', {
									code: res.code
								})
								if (data.data.code === 20000) {
									uni.setStorageSync('openid', JSON.parse(data.data.data)
										.openid)
									let { data: resd } = await uni.$http.post(
										'/my/login', {
											openid: JSON.parse(data.data.data)
												.openid
										})
									that.openID = JSON.parse(data.data.data).openid
									uni.setStorageSync('token', resd.data)
								}
							},
						});
					},
					fail() {
						return uni.$showMsg('您取消了登录授权')
					}
				})
			},
			orderclass(index) {
				if (index == 1) {
					uni.redirectTo({
						url: '../../subpkg/myaddress/myaddress'
					})
				} else if (index == 0) {
					uni.redirectTo({
						url: '../../subpkg/myorder/myorder'
					})
				} else if (index == 2) {
					uni.removeStorageSync('openid')
					uni.removeStorageSync('user')
					uni.removeStorageSync('dizhi')
					uni.removeStorageSync('shop')
					uni.removeStorageSync('token')
					this.openID = ''
					this.userinfo = ''
				} else if (index == 3) {
					console.log('接单了');
					uni.redirectTo({
						url: '../../subpkg/kd_jiedan/kd_jiedan'
					})
				} else if (index == 4) {
					uni.redirectTo({
						url: '../../subpkg/kd_fabu/kd_fabu'
					})
				}
			},
			gaincode() {
				uni.redirectTo({
					url: '../../subpkg/soundcode/soundcode'
				})
			},
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100vw;
		height: 100vh;
		background: #FEE34C;

		//未登录
		.denglu {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 90%;

			.deng_qian {
				width: 80vw;
			}
		}

		//已登录
		.touxiang {
			height: 20vh;
			display: flex;
			justify-content: center;
			align-items: center;

			.tou_img {
				width: 20vw;
				margin-right: 50rpx;

				img {
					width: 150rpx;
					height: 150rpx;
					border-radius: 150rpx;
					box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
				}

				button {
					background-color: #FEE34C;
					overflow: unset;
					border: 0px solid pink;

					&::after {
						border: initial;
					}
				}
			}

			.tou_title {
				margin-left: 20rpx;
				font-weight: bold;

				.tou_name {
					font-size: 20px
				}
			}
		}

		//我的订单
		.dingdan {
			.dingdan-title {
				display: flex;
				align-items: center;
				margin-left: 3vw;
				border-radius: 20rpx 20rpx 0 0;
				width: 94vw;
				height: 8vh;
				background-color: #fff;

				text {
					font-weight: bold;
					margin-left: 50rpx;
					font-size: 20px
				}
			}

			.dingdan_xuan {
				height: 30vh;
				background-color: #fff;
				display: flex;
				flex-direction: column;

				.xuanxiang {
					flex: 1;
					display: flex;
					align-items: center;
					margin: 0vw 10vw;
					border-bottom: 1px dashed gray;

					text {
						font-size: 14px;
						font-weight: bold;
					}
				}
			}

		}

		//轮播图
		.swiper_lun {
			height: 20vh;
			width: 100vw;

			img {
				width: 100vw;
				height: 22vh;
			}
		}

		//更多功能
		.gengdou {
			.gengdou_title {
				font-weight: bold;
				font-size: 20px;
				margin-left: 70rpx;
			}

			background-color: #fff;
			display: flex;
			flex-direction: column;

			.gongneng {
				display: flex;
				text-align: center;
				color: #9B7A53;

				.vip {
					font-size: 14px;
					width: 50vw;

					.icon_title {
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.vip_sq {
						font-size: 13px
					}
				}

				.yuanma {
					flex: 1;

					.icon_title {
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.scund {
						font-size: 13px
					}
				}
			}
		}
	}
</style>

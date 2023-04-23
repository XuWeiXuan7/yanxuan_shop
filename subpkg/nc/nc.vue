<template>
	<view class="container">
		<view class="nc-tab">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" class="gs" @click="onClick" />
		</view>
		<view class="nc-cont">
			<view class="nc_swiper">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular
					indicator-active-color="red" :current="0">
					<swiper-item v-for="(item,index) in ncswiper" :key="index">
						<view class="swiper-item">
							<img :src="item.img" alt="">
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="maodian">
				<view class="maodian-left">
					<scroll-view scroll-y="true" style="height: 100%;">
						<view v-for="(item,index) in naicha.homeTab" :key="index" @click="toAnchor(index)"
							id="tabColor">
							{{item.tabName}}
						</view>
					</scroll-view>
				</view>
				<view class="maodian-right">
					<scroll-view scroll-y="true" style="height: 100%;" :scroll-into-view="toView"
						scroll-with-animation="true" scroll-top="100px">
						<view class="maodian-zt" v-for="(item,index) of naicha.homeInfo" :key="index">
							<view class="maodian-title" :id="'anchor'+index.toString()">{{item[0].tab}}</view>
							<view class="maodian-content" v-for="(item1,index1) of item" :key="index1">
								<view class="maodian-list">
									<view class="maodian-img">
										<img :src="item1.img" alt="">
									</view>
								</view>
								<view class="maodian-content-title">
									<view class="title1">{{item1.title}}</view>
									<text class="title2">销量 : {{item1.sell}}</text>
									<view class="addcut">
										<view class="money">
											￥{{item1.price}}
										</view>
										<view class="addcut1">
											<view class="cut" @click="jian(item1)">
												-
											</view>
											<text class="addcut-num">{{item1.num}}</text>
											<view class="add" @click="jia(item1)">+
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="jiesuan">
				<view class="jiesuan-zt">
					<view class="jiesuan-icon">
						<view class="icon-zt">
							<uni-icons type="cart" size="24" color="#fff" class="icon1" @click="trigger"></uni-icons>
							<text class="icon-text1" @click="trigger">{{cart_num}}</text>
						</view>
						<text class="icon-text2">￥{{total_price}}</text>
					</view>
					<view class="jiesuan-button">
						<button type="default" :class="{'jiesuan-btn':true,'jiesuan-err':btnerr}" @click="jiesuan"
							:disabled="btnerr">去结算</button>
					</view>
					<view class="share">
						<view :class="{'box':share}" @click="display"></view>
						<view class="share-item" :class="{'show':share}">
							<scroll-view scroll-y="true" style="max-height: 70vh;">
								<view class="spOne">
									<view class="spOne-text">
										商品数量：
										<text>{{cart_num}}</text>
									</view>
									<text @click="removeStorage">清空</text>
								</view>
								<view class="sp-cont" v-if="cart_num">
									<view class="goshop_tchu" v-for="(item,index) of home_shop" :key="index">
										<view class="sp-imgt">
											<img :src="item.img" alt="">
											<view class="sp-img-text">
												<text class="title1">{{item.title}}</text>
												<text class="title2">￥{{item.price}}</text>
											</view>
										</view>
										<view class="addcut">
											<view class="addcut1">
												<view class="cut" @click="jian(item)">-</view>
												<text class="addcut-num">{{item.num}}</text>
												<view class="add" @click="jia(item)">+</view>
											</view>
										</view>
									</view>
								</view>
								<view class="sp-cont" v-else>
									<text>无商品</text>
								</view>
							</scroll-view>
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
				ncswiper: [],
				options: [{
					icon: 'shop',
					text: '首页',
				}, {
					icon: 'person',
					text: '我的',
					infoBackgroundColor: '#007aff',
				}],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				naicha: {
					homeInfo: [],
					homeTab: []
				},
				//锚点观看
				toView: '',
				//弹出层样式
				share: false,
				//商品个数 
				cart_num: 0,
				//弹出层取余
				btn_num: 0,
				//样式
				bools: {},
				//商品数据
				total_price: 0,
				//结算
				btnerr: true,
				home_shop: []
			}
		},
		onShow() {
			console.log('进入页面');
			var res = []
			var num = 0
			var price = 0

			try {
				res = JSON.parse(uni.getStorageSync('shop_list'))
				this.home_shop = res
				console.log(this.home_shop);
				res.forEach(item => {
					num += item.num
					price += item.price * item.num
				})
				this.total_price = price
				this.cart_num = num
			} catch (e) {
				this.home_shop = []
				this.total_price = 0
				this.cart_num = 0
				this.naicha.homeInfo.forEach((item, index) => {
					for (let i = 0; i < item.length; i++) {
						this.$set(item[i], 'num', 0)
					}
				})
			}
		},
		async mounted() {
			await this.getNcInfo()
			await this.getNcTab()
			this.getswiper()
			let tabnum = this.naicha.homeTab.length
			this.naicha.homeInfo.forEach((item, index) => {
				for (let i = 0; i < item.length; i++) {
					this.$set(item[i], 'num', 0)
				}
			})
			if (uni.getStorageSync('shop_list')) {
				var res
				this.naicha.homeInfo.map((item, index) => {
					let len = JSON.parse(uni.getStorageSync('shop_list'))
					item.forEach((item1, index1) => {
						res = len.filter(it => {
							return it.title === item1.title
						})
						if (res.length > 0) {
							item[index1].num = res[0].num
						}
						this.cart_num += item[index1].num
						this.total_price += item[index1].num * item[index1].price
					})

				})
			}
		},
		watch: {
			total_price: function() {
				if (this.total_price > 5) {
					this.btnerr = false
				} else {
					this.btnerr = true
				}
			},
			cart_num: function() {
				if (this.cart_num > 0) {
					var res = []
					var num = 0
					var price = 0
					res = JSON.parse(uni.getStorageSync('shop_list'))
					console.log(JSON.parse(uni.getStorageSync('shop_list')));
					this.home_shop = res
					res.forEach(item => {
						num += item.num
						price += item.price * item.num
					})
					this.total_price = price
					this.cart_num = num
				}
			}
		},

		methods: {
			/**
			 * @param {Object} 获取轮播图图片
			 */
			async getswiper() {
				const { data: res } = await uni.$http.post('/api/ncswiper')
				console.log(res);
				if (res.code === 20000)
					this.ncswiper = res.data
			},
			onClick(e) {
				console.log(e);

				if (e.index == 0) {
					console.log(111);
					uni.switchTab({
						url: '/pages/home/home'
					});
				} else {
					console.log(222);
					uni.switchTab({
						url: '/pages/my/my'
					});
				}
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			},
			...mapMutations('m_home', ['addToCart', 'jianToCart']),
			async jia(item) {
				this.total_price += item.price
				this.cart_num++
				item.num++
				this.addToCart(item)
			},
			removeStorage() {
				uni.removeStorageSync('shop_list')
				this.naicha.homeInfo.forEach((item, index) => {
					for (let i = 0; i < item.length; i++) {
						this.$set(item[i], 'num', 0)
					}
				})
				this.home_shop = []
				this.total_price = 0
				this.cart_num = 0
				this.$store.state.m_home.goods = []
			},
			jian(item) {
				item.num--
				if (item.num < 0) {
					item.num = 0
				} else {
					this.cart_num--
					this.total_price -= item.price
					this.jianToCart(item)
				}
			},
			toAnchor(id) {
				let anchorId = 'anchor' + id
				this.toView = ''
				this.$nextTick(() => {
					this.toView = anchorId;
				})
			},
			trigger() {
				this.btn_num++
				if (this.btn_num % 2 == 1)
					this.share = true;
				else {
					this.share = false;
				}
			},
			display() {
				this.btn_num++
				this.share = false
			},
			async jiesuan() {
				let fk = await uni.showModal({
					title: '是否付款'
				})
				console.log(fk);
				if (fk[1].confirm) {
					uni.showLoading({
						title: '数据加载中'
					})
					setTimeout(function() {
						uni.hideLoading();
						uni.$showMsg('付款成功', 1500)
					}, 2000);
				} else {
					uni.$showMsg('付款失败', 1500)
				}
			},
			async getNcInfo() {
				const { data: res } = await uni.$http.post('/api/home', { query: 'naicha' })
				console.log(res);
				this.naicha.homeInfo = res.status
			},
			//获取导航栏信息
			async getNcTab() {
				const { data: res } = await uni.$http.post('/api/homeTab', { query: 'naichatab' })
				console.log(res);
				this.naicha.homeTab = res.status
			}

		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		justify-content: space-between;

		.nc-tab {
			width: 100%;
			position: fixed;
			bottom: 0;

			.uni-tab__cart-sub-left {
				width: 100%;
				display: flex;
				justify-content: space-around;
			}


		}

		.nc-cont {
			height: 100vh;

			.nc_swiper {
				height: 25vh;
				width: 100vw;

				.swiper-item {
					height: 100%;
				}

				img {
					width: 100vw;
					height: 100%;
				}
			}
		}

		//�ֲ�ͼ
		.swiper-box {
			height: 25vh;
		}

		.swiper-item {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 200px;
			color: #fff;
		}

		.swiper-item0 {
			background-color: #cee1fd;
		}

		.swiper-item1 {
			background-color: #b2cef7;
		}

		.swiper-item2 {
			background-color: #cee1fd;
		}

		.image {
			width: 750rpx;
		}
	}

	//商品
	.maodian {
		height: 55vh;
		display: flex;

		.maodian-left {
			box-sizing: border-box;
			width: 30vw;
			height: 100%;
			text-align: center;

			view {
				height: 50px;
				line-height: 50px;
				box-sizing: border-box;
				font-size: 14px;
				font-weight: bold;

				&:hover {
					background-color: #ccc;
				}
			}

		}

		.maodian-right {
			width: 70vw;

			.maodian-title {
				height: 25px;
				padding-left: 10px;
				border-left: 5px solid red;
				font-size: 14px;
				line-height: 25px;
				font-weight: bold;
			}

			.maodian-content {
				display: flex;
				flex-direction: row;
				margin: 0 10px;
				border-bottom: 1px solid gray;

				.maodian-list {
					display: flex;
					flex-direction: row;

					.maodian-img {
						width: 40%;
						height: 100px;

						img {
							width: 80px;
							height: 80px;
							margin-left: 20px;
						}
					}
				}

				.maodian-content-title {
					width: 100%;
					position: relative;
					padding-top: 10px;
					padding-left: 10px;

					.title1 {
						font-weight: bold;
					}

					.title2 {
						font-size: 12px;
						color: gray;
					}

					.addcut {
						width: 100%;
						position: absolute;
						display: flex;
						bottom: 0;
						color: red;
						font-weight: bold;
						align-items: center;
						justify-content: space-between;

						.addcut1 {
							display: flex;
							flex-direction: row;
							align-items: center;
							width: 60px;
							margin-right: 20px;
							justify-content: space-between;

							.cut {
								width: 15px;
								height: 15px;
								border-radius: 50%;
								color: #9CCEE9;
								border: 1px solid #9CCEE9;
								text-align: center;
								line-height: 13px;
							}

							.add {
								text-align: center;
								line-height: 13px;
								width: 15px;
								height: 15px;
								border-radius: 50%;
								color: #fff;
								background-color: #28A0F5;
							}
						}
					}
				}
			}
		}

	}

	//购物车
	.jiesuan {
		display: flex;
		justify-content: center;
		position: fixed;
		width: 100%;
		bottom: 8vh;
		border-radius: 50px;

		.jiesuan-zt {
			position: relative;
			width: 80%;
			height: 70rpx;
			border-radius: 50px;
			display: flex;
			align-items: center;
			background-color: #494949;
			justify-content: space-between;

			.jiesuan-icon {
				position: relative;
				height: 70rpx;
				border-radius: 50px 0 0 50px;
				width: 70%;
				display: flex;
				z-index: 999;
				align-items: center;
				background-color: #494949;

				.icon-zt {
					position: absolute;
					top: -30rpx;
					left: 30rpx;

					.icon1 {
						width: 60rpx;
						z-index: 999;
						height: 60rpx;
						position: absolute;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 50%;
						border: 5rpx solid #717171;
						background-color: #494949;
					}

					.icon-text1 {
						position: absolute;
						font-size: 8px;
						width: 15px;
						z-index: 999;
						text-align: center;
						line-height: 15px;
						height: 15px;
						border-radius: 50%;
						top: -5rpx;
						left: 45rpx;
						color: #fff;
						background-color: #C00000;
					}
				}

				.icon-text2 {
					margin-left: 100rpx;
					color: #fff;
				}

			}

			.jiesuan-button {
				width: 30%;
				height: 100%;
				z-index: 999;

				.jiesuan-btn {
					display: flex;
					border-radius: 0 50px 50px 0;
					align-items: center;
					justify-content: center;
					height: 100%;
					background-color: #6056F3;
					color: #fff;
					font-size: 20rpx
				}

				.jiesuan-err {
					display: flex;
					border-radius: 0 50px 50px 0;
					align-items: center;
					justify-content: center;
					height: 100%;
					background-color: #7C7C7C !important;
					color: #fff;
					font-size: 20rpx
				}
			}

			.share {
				width: 100%;
				height: 100%;
				position: absolute;
			}

			//背景色（黑色透明40%）
			.box {
				width: 100%;
				height: 100%;
				position: fixed;
				top: 0rpx;
				left: 0rpx;
				bottom: 0rpx;
				right: 0rpx;
				background-color: rgba(0, 0, 0, 0.4);
				transition: .3s;
				z-index: -1;
			}

			// 进入分享动画
			.show {
				position: relative;
				bottom: 0vh;
				max-height: 70%;
				margin-bottom: 200rpx;
				transition: all 0.3s ease;
				transform: translateY(0%) !important;
			}

			// 离开分享动画
			.share-item {
				box-sizing: border-box;
				position: fixed;
				left: 0;
				width: 100%;
				background-color: #FFFFFF;
				transition: all 0.3s ease;
				transform: translateY(100%);

				.spOne {
					display: flex;
					justify-content: space-between;
					margin-bottom: 68rpx;

					text {
						box-sizing: border-box;
						padding: 20rpx;
					}

					.spOne-text {
						padding: 20rpx;

						text {
							color: #D4CCAF;
						}
					}
				}

				.sp-cont {
					display: flex;
					flex-direction: column;
					position: relative;

					.goshop_tchu {
						position: relative;



						.sp-imgt {
							display: flex;
							width: 80%;
							margin-bottom: 40rpx;

							img {
								width: 150rpx;
								height: 150rpx;
							}

							.sp-img-text {
								display: flex;
								flex-direction: column;
								justify-content: space-between;

								text {
									font-weight: bold;
								}

								.title2 {
									color: red;
								}
							}

						}
					}


					.addcut {
						width: 20%;
						margin-bottom: 40rpx;
						position: absolute;
						display: flex;
						right: 0;
						bottom: 0;
						color: red;
						font-weight: bold;
						align-items: center;
						justify-content: space-between;

						.addcut1 {
							display: flex;
							flex-direction: row;
							align-items: center;
							width: 60px;
							margin-right: 20px;
							justify-content: space-between;

							.cut {
								width: 15px;
								height: 15px;
								border-radius: 50%;
								color: #9CCEE9;
								border: 1px solid #9CCEE9;
								text-align: center;
								line-height: 13px;
							}

							.add {
								text-align: center;
								line-height: 13px;
								width: 15px;
								height: 15px;
								border-radius: 50%;
								color: #fff;
								background-color: #28A0F5;
							}
						}
					}
				}
			}
		}
	}
</style>

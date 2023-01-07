<style lang="scss">
	* {}

	.home {
		box-sizing: border-box;
		background-color: #C00000;
		height: 100vh;
		z-index: 999;

		.tabColor {
			background-color: #ccc !important;
		}

		.home-content {
			position: fixed;
			height: 90vh;
			width: 100vw;
			bottom: var(--window-bottom);
			z-index: 999;
			border-radius: 20px 20px 0 0;
			margin-top: 5px;
			background-color: #fff;
		}

		//顶部
		.home-header {
			display: flex;
			justify-content: center;
			position: relative;
			height: 10vh;

			.home-headimg {
				img {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					position: absolute;
					top: -30px;
					left: 30px;
					background-color: #fff;
					box-shadow: 0 0 10px rgba(255, 255, 255, 1);
					z-index: 99;
				}
			}

			.home-headtitle {
				margin-left: 100px;
				margin-top: 10px;
				font-weight: bold;

			}

		}

		//广告和其他分类
		.home-group {
			display: flex;
			flex-direction: column;

			.home-group-item {
				display: flex;
				flex-direction: row;

				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					flex: 1;

					img {
						width: 65px;
						height: 65px;
					}

					text {
						font-size: 12px;
						font-weight: bold;
					}
				}
			}
		}

		//物品分类锚点
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

		//增加减少按钮


		//结算
		.jiesuan {
			display: flex;
			justify-content: center;
			position: fixed;
			width: 100%;
			bottom: 8rpx;
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
					margin-bottom: 85rpx;
					transition: all 0.3s ease;
					transform: translateY(0%) !important;
				}

				// 离开分享动画
				.share-item {
					box-sizing: border-box;
					position: fixed;
					left: 0;
					bottom: 0;
					width: 100%;
					background-color: #FFFFFF;
					transition: all 0.3s ease;
					transform: translateY(100%);

					.spOne {
						display: flex;
						justify-content: space-between;
						margin-bottom: 20rpx;

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
	}
</style>

<template>
	<view class="home">
		<!-- title加文本 -->
		<uni-nav-bar background-color="#c00000" left-icon="left" :border="false" statusBar="false">
		</uni-nav-bar>
		<!-- 头部内容 -->
		<view class="home-content">
			<view class="home-header">
				<view class="home-headimg">
					<img src="../home/image/logo.png" alt="">
				</view>
				<view class="home-headtitle">
					<h4>严选便利店</h4>
					<h6>客服电话:18086195020</h6>
				</view>
			</view>
			<view class="home-group">
				<view class="home-henfu">
					<Marquee></Marquee>
				</view>
				<view class="home-group-item">
					<navigator url="../../subpkg/kd/kd" class="item" hover-class="none">
						<img src="../home/image/kd.jpg" alt="">
						<text>快递代取</text>
					</navigator>
					<navigator url="../../subpkg/nc/nc" class="item" hover-class="none">
						<img src="../home/image/nc.jpg" alt="">
						<text>奶茶</text>
					</navigator>
					<navigator url="../../subpkg/jx/jx" class="item" hover-class="none">
						<img src="../home/image/jx.jpg" alt="">
						<text>驾校</text>
					</navigator>
					<navigator url="../../subpkg/jz/jz" class="item" hover-class="none">
						<img src="../home/image/jz.jpg" alt="">
						<text>兼职</text>
					</navigator>
				</view>
			</view>
			<view class="maodian">
				<view class="maodian-left">
					<scroll-view scroll-y="true" style="height: 100%;">
						<view v-for="(item,index) in home.homeTab" :key="index" @click="toAnchor(index)"
							:class='{tabColor:bools["bool"+(index+1)]}' id="tabColor">
							{{item.tabName}}
						</view>
					</scroll-view>
				</view>
				<view class="maodian-right">
					<scroll-view scroll-y="true" style="height: 100%;" :scroll-into-view="toView"
						scroll-with-animation="true">
						<view class="maodian-zt" v-for="(item,index) of home.homeInfo" :key="index">
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
											<view class="cut" @click="jian(index,index1,item1)">
												-
											</view>
											<text
												class="addcut-num">{{shop_num['num'+index.toString()+index1.toString()]}}</text>
											<view class="add" @click="jia(index,index1,item1)">+
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class=" jiesuan">
				<view class="jiesuan-zt">
					<view class="jiesuan-icon">
						<view class="icon-zt">
							<uni-icons type="cart" size="24" color="#fff" class="icon1" @click="trigger"></uni-icons>
							<text class="icon-text1" @click="trigger">{{cart_num}}</text>
						</view>
						<text class="icon-text2">￥{{total_price}}</text>
					</view>
					<view class="jiesuan-button">
						<button type="default" class="jiesuan-btn" @click="jiesuan">去结算</button>
					</view>
					<view class="share">
						<view :class="{'box':share}" @click="display"></view>
						<view class="share-item" :class="{'show':share}">
							<view class="spOne">
								<view class="spOne-text">
									商品数量：
									<text>{{cart_num}}</text>
								</view>
								<text>清空</text>
							</view>
							<view class="sp-cont" v-if="cart_num">
								<view class="sp-imgt">
									<img src="./image/酒水1.jpg" alt="">
									<view class="sp-img-text">
										<text class="title1">500ml听装雪花</text>
										<text class="title2">￥5.00</text>
									</view>
								</view>
								<view class="addcut">
									<view class="addcut1">
										<view class="cut" @click="jian(index,index1,item1.price)">-</view>
										<text class="addcut-num">0</text>
										<view class="add" @click="jia(index,index1,item1.price)">+</view>
									</view>
								</view>
							</view>
							<view class="sp-cont" v-else>
								<text>无商品</text>
							</view>
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
				home: {
					homeInfo: [],
					homeTab: []
				},
				shop_num: {},
				total_price: 0
			}
		},

		async onLoad() {
			//获取tab的数量
			// this.huadong()
			await this.getHomeInfo()
			await this.getHomeTab()
			let tabnum = this.home.homeTab.length
			console.log(tabnum);
			//改变tab样式
			// for (let i = 0; i < tabnum; i++) {
			// 	this.$set(this.bools, `bool${i+1}`, false)
			// }

			this.home.homeInfo.forEach((item, index) => {
				for (let i = 0; i < item.length; i++) {
					this.$set(this.shop_num, `num${index+i.toString()}`, 0)
				}
			})
		},
		computed: {},
		methods: {
			...mapMutations('m_home', ['addToCart']),
			//加商品
			jia(index, index1, item) {
				this.shop_num['num' + index.toString() + index1.toString()]++
				this.total_price += item.price
				this.cart_num++
				if (!item.num) {
					item.num = 1
				}
				this.addToCart(item)
			},
			jian(index, index1, price) {
				if (this.shop_num['num' + index.toString() + index1.toString()] <= 0) {
					this.shop_num['num' + index.toString() + index1.toString()] = 0
				} else {
					this.shop_num['num' + index.toString() + index1.toString()]--
					this.cart_num <= 0 ? 0 : this.cart_num--
					this.total_price -= item.price
				}
			},

			toAnchor(id) {
				let anchorId = 'anchor' + id
				this.toView = ''
				this.$nextTick(() => {
					this.toView = anchorId;
				})
				// Object.keys(this.bools).forEach((key) => {
				// 	this.bools[key] = false
				// 	this.bools[id] = true
				// })
			},
			//滑动改变左侧导航栏样式
			// huadong(e) {
			// 	let maodian1 = uni.createSelectorQuery().in(this).selectAll('.maodian-zt');
			// 	let top;
			// 	let that = this
			// 	maodian1.boundingClientRect(function(data) {
			// 		let hg = {}
			// 		let bt1 = data[0].bottom + 26
			// 		console.log(bt1);
			// 		data.forEach((key, index) => {
			// 			hg['number' + index] = key.height
			// 		})
			// 		console.log(hg);
			// 		let hgtotal = hg.number1 + hg.number2
			// 		// console.log(hgtotal);
			// 		switch (true) {
			// 			case bt1 >= hg.number1:
			// 				that.bools.bool1 = true
			// 				that.bools.bool2 = false
			// 				that.bools.bool3 = false
			// 				break;
			// 			case 2 <= bt1 && (hgtotal - hg.number1 > bt1):
			// 				that.bools.bool1 = false
			// 				that.bools.bool2 = true
			// 				that.bools.bool3 = false
			// 				break;
			// 			default: {
			// 				that.bools.bool1 = false
			// 				that.bools.bool2 = false
			// 				that.bools.bool3 = true
			// 			}

			// 		}
			// 	}).exec(function(res) {})
			// },
			//获取模块高度
			mk_gd() {

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
			//获取商品数据
			async getHomeInfo() {
				const { data: res } = await uni.$http.post('/api/home')
				console.log(res);
				this.home.homeInfo = res.status
			},
			//获取导航栏信息
			async getHomeTab() {
				const { data: res } = await uni.$http.post('/api/homeTab')
				console.log(res);
				this.home.homeTab = res.status
			}
		}
	}
</script>

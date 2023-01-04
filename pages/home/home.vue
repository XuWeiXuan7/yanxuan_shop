<style lang="scss">
	* {}

	.home {
		box-sizing: border-box;
		background-color: #C00000;
		height: 100vh;
		z-index: 999;


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

		.maodian {
			height: 59vh;
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
						background-color: gray;
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
						<view @click="toAnchor(1)">推荐</view>
						<view>小零食</view>
						<view @click="toAnchor(2)">泡面</view>
						<view>酒水</view>
						<view>辣条</view>
						<view>饮料</view>
						<view>自热锅</view>
					</scroll-view>
				</view>
				<view class="maodian-right">
					<scroll-view scroll-y="true" style="height: 100%;" :scroll-into-view="toView"
						scroll-with-animation="true">
						<view class="maodian-title" id="anchor1">推荐</view>
						<scroll-view scroll-y="true" style="height: 100%;">
							<view class="maodian-content">
								<view class="maodian-list">
									<view class="maodian-img">
										<img src="./image/泡面1.jpg" alt="">
									</view>
								</view>
								<view class="maodian-content-title">
									<view class="title1">康师傅爆椒牛肉面</view>
									<text class="title2">销量 : 30</text>
									<view class="addcut">
										<view class="money">
											￥5.50
										</view>
										<view class="addcut1">
											<view class="cut">-</view>
											<text class="addcut-num">1</text>
											<view class="add">+</view>
										</view>
									</view>
								</view>
							</view>
							<view class="maodian-content">
								<view class="maodian-list">
									<view class="maodian-img">
										<img src="./image/泡面1.jpg" alt="">
									</view>
								</view>
								<view class="maodian-content-title">
									<view class="title1">康师傅爆椒牛肉面</view>
									<text class="title2">销量 : 30</text>
								</view>
							</view>
							<view class="maodian-content">
								<view class="maodian-list">
									<view class="maodian-img">
										<img src="./image/泡面1.jpg" alt="">
									</view>
								</view>
								<view class="maodian-content-title">
									<view class="title1">康师傅爆椒牛肉面</view>
									<text class="title2">销量 : 30</text>

								</view>
							</view>
							<view class="maodian-content">
								<view class="maodian-list">
									<view class="maodian-img">
										<img src="./image/泡面1.jpg" alt="">
									</view>
								</view>
								<view class="maodian-content-title">
									<view class="title1">康师傅爆椒牛肉面</view>
									<text class="title2">销量 : 30</text>
								</view>
							</view>
						</scroll-view>
						<view class="maodian-title" id="anchor2">泡面</view>
						<scroll-view scroll-y="true" style="height: 100%;">
							<view class="maodian-content">
								<view class="maodian-list">
									<view class="maodian-img">
										<img src="./image/泡面1.jpg" alt="">
									</view>
								</view>
								<view class="maodian-content-title">
									<view class="title1">康师傅爆椒牛肉面</view>
									<text class="title2">销量 : 30</text>
									<view class="addcut">
										<view class="money">
											￥5.50
										</view>
										<view class="addcut1">
											<view class="cut">-</view>
											<text class="addcut-num">1</text>
											<view class="add">+</view>
										</view>
									</view>
								</view>
							</view>
							<view class="maodian-content">
								<view class="maodian-list">
									<view class="maodian-img">
										<img src="./image/泡面1.jpg" alt="">
									</view>
								</view>
								<view class="maodian-content-title">
									<view class="title1">康师傅爆椒牛肉面</view>
									<text class="title2">销量 : 30</text>
								</view>
							</view>
							<view class="maodian-content">
								<view class="maodian-list">
									<view class="maodian-img">
										<img src="./image/泡面1.jpg" alt="">
									</view>
								</view>
								<view class="maodian-content-title">
									<view class="title1">康师傅爆椒牛肉面</view>
									<text class="title2">销量 : 30</text>

								</view>
							</view>
							<view class="maodian-content">
								<view class="maodian-list">
									<view class="maodian-img">
										<img src="./image/泡面1.jpg" alt="">
									</view>
								</view>
								<view class="maodian-content-title">
									<view class="title1">康师傅爆椒牛肉面</view>
									<text class="title2">销量 : 30</text>
								</view>
							</view>
						</scroll-view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				toView: '',
			}
		},
		methods: {
			toAnchor(id) {
				let anchorId = 'anchor' + id
				this.toView = ''
				this.$nextTick(() => {
					this.toView = anchorId;
				})
			}
		}
	}
</script>

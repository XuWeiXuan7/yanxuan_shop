<template>
	<view class="jx_main" v-if="!!category.content.address">
		<uni-nav-bar background-color="#fff" left-text="返回" left-icon="left" fixed="true" :border="false"
			statusBar="false" @clickLeft="back" backgroundColor="#c00000" title="驾校详情页" color="#fff">
		</uni-nav-bar>
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" mode="nav"
			:dots-styles="dotsStyles" field="title">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex" circular>
				<swiper-item v-for="(item, index) in info" :key="index">
					<image :src="item.url" mode=""></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="jx_hr">
			<uni-notice-bar show-icon scrollable text="驾校火热招生中,收费透明,车接车送,教练技术好认真负责.我们做的是服务,一次服务终身朋友" />
		</view>
		<jx-cont :categroy="category" />
	</view> 
</template>
<script>
	export default { 
	     	components: {},
		data() {
			return {
				info: [],
				current: 0,
				category: []
			}
		},
		async onLoad(options) {
			const { data: res } = await uni.$http.post('/jx/jiaxiao/details', { carname: options.carname })
			if (res.code === 20000) {
				this.info = JSON.parse(res.data[0].content).swiperImg
				res.data[0].content = JSON.parse(res.data[0].content)
				this.category = res.data[0]
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			selectStyle(index) {
				this.dotsStyles = this.dotStyle[index]
				this.styleIndex = index
			},
			selectMode(mode, index) {
				this.mode = mode
				this.modeIndex = index
				this.styleIndex = -1
				this.dotsStyles = this.dotStyle[0]
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			//导航栏返回
			back() {
				uni.redirectTo({
					url: '../jx/jx'
				})
			}
		},
	}
</script>
<style lang="scss">
	.jx_hr {
		color: red;

		.data-v-a1596656 {
			margin-bottom: 0 !important;
		}
	}


	.swiper-box {
		height: 40vh;

		swiper {
			height: 50vh;
		}
	}


	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
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

	image {
		width: 750rpx;
		height: 100%;
	}

	/* #ifndef APP-NVUE */
	::v-deep .image img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}

	/* #endif */

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			margin: 0 auto;
			margin-top: 8px;
		}

		image {
			width: 100%;
		}
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx;
	}

	.example-body-item {

		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}

	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}

	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}

	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}

	//tab
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;

		// flex: 1;
		swiper {
			height: 200px;
		}

		.nav {
			border-top: 1rpx solid #f2f2f2;
			background-color: gray;
			position: fixed;
			z-index: 99;
			width: 100%;
			align-items: center;
			height: 100rpx;

			.tab-scroll {
				flex: 1;
				overflow: hidden;
				box-sizing: border-box;
				padding-left: 30rpx;
				padding-right: 30rpx;

				.tab-scroll_box {
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					box-sizing: border-box;

					.tab-scroll_item {
						line-height: 60rpx;
						margin-right: 35rpx;
						flex-shrink: 0;
						padding-bottom: 10px;
						display: flex;
						justify-content: center;
						font-size: 16px;
						padding-top: 10px;
					}
				}
			}
		}

		.swiper-content {
			padding-top: 100rpx;
			// flex: 1;

			.swiperitem-content {
				background-color: #ffffff;

				.nav_item {
					background-color: #FFFFFF;
					padding: 20rpx 40rpx 0rpx 40rpx;

					.jx_contentPrice {
						font-size: 20px;
						font-style: italic;

						text {
							color: red;
						}
					}

					.jx_contentPhone {
						font-size: 20px;
						font-style: italic;
					}
				}
			}
		}
	}

	.jx_local {
		margin-top: 30rpx;
		background-color: #fff;
	}

	.active1 {
		position: relative;
		color: #ff0000;
		font-weight: 600;
	}

	.active1::after {
		content: "";
		position: absolute;
		width: 130rpx;
		height: 4rpx;
		background-color: #ff0000;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
	}

	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
</style>

<template>
	<view>
		<view class="content">
			<view class="nav">
				<!-- 选项卡水平方向滑动，scroll-with-animation是滑动到下一个选项时，有一个延时效果 -->
				<scroll-view class="tab-scroll" scroll-x="true" scroll-with-animation :scroll-left="scrollLeft">
					<view class="tab-scroll_box">
						<!-- 选项卡类别列表 -->
						<view class="tab-scroll_item" v-for=" (item,index) in category.content.content" :key="index"
							:class="{'active1':isActive==index}" @click="chenked(index)">
							{{item.taochang}}
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 选项卡内容轮播滑动显示，current为当前第几个swiper子项 -->
			<view class="content">
				<swiper @change="changebar" :current="isActive" class="swiper-content">
					<swiper-item class="swiperitem-content" v-for="(item,index) in category.content.content"
						:key="index">
						<scroll-view scroll-y style="height: 100%;">
							<view class="nav_item">
								<view class="jx_contentPrice">
									<text>￥</text>{{item.price}}
								</view>
								<view class="jx_contentTitle">
									{{item.title}}
								</view>
								<view class="jx_contentPhone">
									<uni-icons type="phone-filled" color="red" size="30"></uni-icons>
									<text>{{item.phone}}</text>
								</view>
								<view class="jx_contentHd">
									<text>[活动]</text>
									{{item.hdtxt}}
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="jx_local">
			<text @click="toMap">驾校地址:{{category.content.address||''}}</text>
			<!-- 	<ul v-show="isShowSearch">
				<li @click="getCityHandle(item.address)" v-for="item in suggestionData" :key="item.id">{{item.address}}
				</li>
			</ul> -->
		</view>
	</view>
</template>

<script>
	import {
		Debounce
	} from '../../utils/debounce.js'
	export default {
		name: 'jx-cont',
		props: ['categroy'],
		data() {
			return {
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'default',
				dotsStyles: {},
				swiperDotIndex: 0,
				isActive: 0,
				index: 0,
				currentindex: 0,
				contentScrollW: 0, // 导航区宽度
				scrollLeft: 0, // 横向滚动条位置
				fullHeight: "",
				category: [],
				// 地图经纬度
				// title: 'map',
				// latitude: 30.506682,
				// longitude: 114.325802,
				// covers: [{
				// 	latitude: 30.506682,
				// 	longitude: 114.325802,
				// 	iconPath: './map.png',
				// 	width: 32,
				// 	height: 32,
				// }]
				//地图
				title: '出发',
				key: 'LCQBZ-CHRKU-2FBVL-2QNNK-TVT6H-ESFSA',
				locationConfig: null,
				noClick: true,
				suggestionData: null,
				isShowSearch: false
			}
		},
		mounted() {
			var that = this;
			//获取手机屏幕的高度，让其等于swiper的高度，从而使屏幕充满
			uni.getSystemInfo({
				success: function(res) {
					that.fullHeight = "height:" + res.windowHeight + "px";
				}
			});
			// 获取标题区域宽度，和每个子元素节点的宽度
			this.getScrollW()
			this.category = this.$parent.category
		},
		watch: {
			// swiper与上面选项卡联动
			currentindex(newval) {
				this.isActive = newval;
				this.scrollLeft = 0;
				// 滑动swiper后，每个选项距离其父元素最左侧的距离
				for (let i = 0; i < newval - 1; i++) {
					this.scrollLeft += 32
				};
				console.log(this.scrollLeft, '左边');
			},
		},
		methods: {
			//地图
			toMap() {
				console.log('出发了');
				this.getPosition((location) => {
					console.log(location, '获取经纬度');
					uni.navigateTo({
						url: `/subpkg/map/map?lat=${ location.lat}&lng=${location.lng}&city=${this.category.content.address}`
						// url: `/subpkg/map/map?lat`
					})
				})
			},
			getPosition(callback) {
				uni.request({
					url: `https://apis.map.qq.com/ws/geocoder/v1/?address=${this.category.content.address}&key=${this.key}`,
					success: ({ data }) => {
						console.log(data);
						callback(data.result.location)

					},
				})
			},
			getCityHandle(val) {
				this.city = val
				this.isShowSearch = false
			},
			changeCity: Debounce(function(e) {
				this.isShowSearch = true
				console.log(432);
				this.city = e.target.value
				uni.request({
					url: `https://apis.map.qq.com/ws/place/v1/suggestion?key=${this.category.content.address}&keyword=${this.city}`,
					success: ({
						data
					}) => {
						console.log(423, data.data);
						this.suggestionData = data.data
					},
				})

			}, 1000),
			// jx_localAddress() {
			// 	console.log('点击了');
			// 	uni.getLocation({
			// 		type: 'gcj02 ', //返回可以用于uni.openLocation的经纬度
			// 		success: function(res) {
			// 			const latitude = res.latitude;
			// 			const longitude = res.longitude;
			// 			uni.openLocation({
			// 				latitude: latitude,
			// 				longitude: longitude,
			// 				success: function() {
			// 					console.log('success');
			// 				}
			// 			});
			// 		}
			// 	});
			// },
			//tab滑动
			// 获取标题区域宽度，和每个子元素节点的宽度以及元素距离左边栏的距离
			getScrollW() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.tab-scroll').boundingClientRect(data => {
					// 拿到 scroll-view 组件宽度
					this.contentScrollW = data.width
				}).exec();
				query.selectAll('.tab-scroll_item').boundingClientRect(data => {
					let dataLen = data.length;
					for (let i = 0; i < dataLen; i++) {
						//  scroll-view 子元素组件距离左边栏的距离
						this.category.content.content[i].left = 30
						//  scroll-view 子元素组件宽度
						this.category.content.content[i].width = 30
					}
				}).exec()
			},
			// 当前点击子元素靠左留一个选项展示，子元素宽度不相同也可实现
			chenked(index) {
				this.isActive = index;
				this.scrollLeft = 0;
				for (let i = 0; i < index - 1; i++) {
					this.scrollLeft += this.category.content.content[i].width
				};
			},
			// swiper滑动时，获取其索引，也就是第几个
			changebar(e) {
				const { current } = e.detail;
				this.currentindex = current;
			},
		}
	}
</script>

<style lang="less">
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
			/* // flex: 1; */

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

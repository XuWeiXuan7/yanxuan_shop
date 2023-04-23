<template>
	<view class="container">
		<view class="header">
			<view class="header-top">
				<view class="top-left">
					<text>{{jxdata.title}}</text>
				</view>
				<view class="top-right">
					<text>{{jxdata.price}}</text>
				</view>
			</view>
			<view class="header-bot">
				<view class="bot-left" v-if="jxdata.address">
					<uni-icons type="location" />
					{{jxdata.address}}
				</view>
				<view class="bot-right" v-if="jxdata.education">
					<uni-icons type="vip-filled" />
					{{jxdata.education}}
				</view>
			</view>
			<view class="header-time">
				该职位发布于昨天
			</view>
		</view>
		<view class="section">
			<view class="section-photo">
				<img src="../../pages/home/images/logo.png" alt="">
			</view>
			<view class="section-grxx">
				<view class="grxx-top">
					{{jxdata.person}}&nbsp;·&nbsp;{{jxdata.position}}
				</view>
				<view class="grxx-bot">
					{{jxdata.company}}
				</view>
			</view>
		</view>
		<view class="main">
			<view class="zw-details">
				<text>职位描述</text>
			</view>
			<view class="zw-tag">
				<view class="example-body">
					<view class="tag-view">
						<uni-tag :inverted="true" text="javascript" type="primary" />
					</view>
					<view class="tag-view">
						<uni-tag :inverted="true" text="HTML5" type="success" />
					</view>
					<view class="tag-view">
						<uni-tag :inverted="true" text="CSS" type="warning" />
					</view>
					<view class="tag-view">
						<uni-tag :inverted="true" text="Vue" type="error" />
					</view>
					<view class="tag-view">
						<uni-tag :inverted="true" text="HTTP" />
					</view>
				</view>
			</view>
			<view class="zw-introduce">
				<u-parse :content="jxdata.context"></u-parse>
			</view>
		</view>
		<view class="footer">
			<view class="footer-address">
				<map :latitude="latitude" :longitude="longitude" :markers="covers" @click="clickMap">
				</map>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				id: null,
				jxdata: {
					id: 1,
					title: "实习生6-8k底薪",
					price: '6-8k',
					company: '元宾科技',
					finance: '不需要融资',
					person: '王女士',
					position: '人事18086195020',
					address: "洪山区-街道口",
					education: '本科',
					context: '<div style="text-align:center;"><img src="https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png"/></div>'
				},
				// id:0, // 使用 marker点击事件 需要填写id
				// title: 'map', //地图标题
				latitude: 0, //经度39.909
				longitude: 0, //纬度116.39742
				// scale:5,//最小数，缩放范围最大，可见程度最大
				scale: 18,
				// 最大数， 缩放范围最小， 可见程度最小
				// marker:[]
				marker: [{
					id: 0,
					latitude: 0, //经度
					longitude: 0, //纬度
					iconPath: '../../static/map/map.png', //显示的图标
					rotate: 0, // 旋转度数
					width: 30, //宽
					height: 30, //高
					title: '你在哪了', //标注点名
					alpha: 0.5, //透明
				}, ],
				key: 'LCQBZ-CHRKU-2FBVL-2QNNK-TVT6H-ESFSA',
				covers: [{
					id: 1,
					width: 50,
					height: 50,
					latitude: 0,
					longitude: 0,
				}, ],
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		async onShow() {
			const { statusCode, data } = await uni.$http.post('/jz/details', { id: this.id })
			console.log(statusCode, data, '接口拿到的详情');
			if (statusCode === 200) {
				this.jxdata = data.status[0]
			}
			this.getPosition((location) => {
				this.longitude = location.lng
				this.latitude = location.lat
			})
		},
		methods: {
			getPosition(callback) {
				uni.request({
					url: `https://apis.map.qq.com/ws/geocoder/v1/?address=武汉工程科技学院&key=${this.key}`,
					success: ({ data }) => {
						this.longitude = data.result.longitude
						this.latitude = data.result.latitude
						callback(data.result.location)
					},
				})
			},
			clickMap() {
				this.getPosition(location => {
					uni.navigateTo({
						url: `/subpkg/map/map?lat=${ location.lat}&lng=${location.lng}&city=长江工程职业技术学院`
					})
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("@/components/u-parse/u-parse.css");

	.container {
		display: flex;
		flex-direction: column;

		.header {
			height: 15vh;
			display: flex;
			flex-direction: column;

			.header-top {
				box-sizing: border-box;
				padding-top: 30rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-around;

				.top-left {
					width: 40vw;

					text {
						font-size: 40rpx;
						font-weight: bold;
					}
				}

				.top-right {
					width: 20vw;


					text {
						color: #16959E;
						font: 30rpx bold;
					}
				}
			}

			.header-bot {
				display: flex;
				color: rgba(80, 80, 50, 1);
				font-size: 30rpx;
				padding: 0 50rpx;
				justify-content: space-between;

			}

			.header-time {
				margin-left: 60rpx;
				font-size: 25rpx;
				color: gray;
			}
		}

		.section {
			display: flex;
			flex-direction: row;
			justify-content: center;

			.section-photo {
				width: 25vw;
				height: 10vh;
				margin-right: 20rpx;

				img {
					width: 100%;
					height: 100%;
					border-radius: 100rpx;
				}
			}


			.section-grxx {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				word-break: break-all;
				text-align: center;
				width: 60vw;
			}
		}

		.main {
			display: flex;
			flex-direction: column;
			padding: 70rpx;

			.zw-details {
				font-weight: bold;
				font-size: 40rpx;
			}

			.zw-tag {
				.example-body {
					display: flex;

					.tag-view {
						margin: 10rpx;
					}
				}
			}

			.zw-introduce {
				margin-top: 50rpx;
			}
		}

		.footer {
			width: 100vw;
			display: flex;
			flex-direction: column;
			align-items: center;

			.footer-address {
				width: 90%;
				display: flex;
				justify-content: center;
				margin-bottom: 50rpx;
			}
		}
	}
</style>

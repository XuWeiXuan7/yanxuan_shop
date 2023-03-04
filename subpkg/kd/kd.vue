<template>
	<view class="main">
		<view class="container">
			<view class="kd_zt">
				<view class="cainiao" v-for="(item,index) in kd" :key="index">
					<text>{{item.name}}</text>
					<br>
					<text>{{item.title}}</text>
					<img :src="item.img">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kd: [{
						name: '菜鸟驿站',
						title: '拿快递请联系电话18086195020一件2元',
						img: 'https://i.postimg.cc/Bt9XYmHK/cainiao.webp'
					},
					{
						'name': '顺丰',
						title: '拿快递请联系电话15623608238一件3元',
						img: 'https://i.postimg.cc/02yVCZZ4/shunf.webp'
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100vw;
		height: 100vh;
		background-color: rgba(240, 240, 240, 1);

		.container {
			.kd_zt {
				display: flex;
				flex-direction: column;
				background-color: rgba(240, 240, 240, 1);
				align-items: center;

				.cainiao {
					padding: 50rpx;
					box-shadow: 0 0 10rpx rgba(0, 0, 0, 1);
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-top: 20rpx;
					background-color: #fff;
					width: 80vw;

					img {
						width: 80vw;
						height: 30vh;
					}

					text {
						margin-left: 150rpx;
						width: 100vw;

						&:nth-child(1) {
							font-size: 20px;
							font-weight: bold;
						}
					}
				}

			}
		}
	}
</style>

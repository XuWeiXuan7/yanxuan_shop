<template>
	<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
		<view class="jz">
			<view class="jz-cont" v-for="(item,index) in jzmessage" :key="index">
				<view class="title">
					<text>{{item.title}}</text>
					<text>{{item.price}}</text>
				</view>
				<view class="zj-cont">
					<text>{{item.company}} <text>{{item.finance}}</text> </text>
				</view>
				<view class="ry_ad">
					<text>{{item.person}}-{{item.position}}</text>
					<text>{{item.address}}</text>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				jzmessage: []
			}
		},
		onShow() {
			this.getWorkCont()
		},
		methods: {
			async getWorkCont() {
				const { data: res } = await uni.$http.post('/jz/jianzhi')
				this.jzmessage = res.status
			}
		}
	}
</script>

<style lang="scss">
	.jz {
		display: flex;
		flex-direction: column;
		background-color: rgba(240, 240, 240, 1);
		align-items: center;

		.jz-cont {
			margin-top: 20rpx;
			border-radius: 15rpx;
			padding: 15rpx;
			background-color: #fff;
			width: 90vw;
			height: 15vh;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				display: flex;
				justify-content: space-between;
			}

			.zj-cont {
				font-size: 14px;
				color: #000100;
			}
		}

		.ry_ad {
			font-size: 12px;
			display: flex;
			justify-content: space-between;

			text {
				&:nth-child(1) {}
			}
		}
	}
</style>

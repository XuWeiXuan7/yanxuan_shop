<template>
	<view class='notice-wrap' :hidden="hideNotice">
		<view class='tongzhitext'>
			<text class="tongzhi-text">公告:&nbsp;&nbsp;&nbsp;{{notice}}</text>
		</view>
		<view @click="switchNotice" class="closeView">x</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice: '空前折扣力度，专享福利大家快来抢利大家快快来抢购下',
				hideNotice: false,
			}
		},
		methods: {
			switchNotice() {
				this.hideNotice = true;
			}
		},
	}
</script>

<style lang="scss">
	@keyframes remindMessage {
		0% {
			-webkit-transform: translateX(100%);
		}

		100% {
			-webkit-transform: translateX(-100%);
		}
	}

	.tongzhitext {
		margin-left: 10rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.tongzhi-text {
		font-size: 28rpx;
		animation: remindMessage 14s linear infinite;
		width: 100%;
		color: #d09868;
		display: block;
	}

	.notice-wrap {
		background: #ffebda;
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		color: #d09868;
		font-size: 28rpx;
	}

	.closeView {
		width: 45rpx;
		height: 45rpx;
		line-height: 45rpx;
		position: absolute;
		right: 20rpx;
		top: 5rpx;
		text-align: center;
		font-size: 35rpx;
	}
</style>

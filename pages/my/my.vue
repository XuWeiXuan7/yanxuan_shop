<template>
	<view class="main">
		<view class="one-right" @click="trigger">
			<text>评论</text>
		</view>
		<view class="share">
			<!-- 弹出背景灰色 -->
			<view :class="{'box': share}" @click="display"></view>
			<!-- 弹出部分 -->
			<view class="share-item" :class="{'show': share}">
				<scroll-view scroll-y="true">
					<view class="spOne">

					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				share: false
			}
		},
		methods: {
			trigger() {
				this.share = true;
			},
			// 隐藏分享
			display() {
				this.share = false;
			}
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		height: 2000rpx;
		background: #007AFF;
	}

	.share {
		width: 100%;
		height: 100%;
		position: relative;
		// z-index: 1;
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
		z-index: 999;
	}

	// 进入分享动画
	.show {
		transition: all 0.3s ease;
		transform: translateY(0%) !important;
	}

	// 离开分享动画
	.share-item {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1000rpx;
		background-color: #FFFFFF;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 999;
	}
</style>

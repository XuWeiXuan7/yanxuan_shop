<template>
	<view>
		<uni-nav-bar background-color="#c00000" left-text="返回" left-icon="left" fixed="true" :border="false"
			statusBar="false" @clickLeft="back" backgroundColor="#FEE34C" title="源码需求">
		</uni-nav-bar>
		<view class="main">
			<web-view src="https://github.com/2505302357" :webview-styles="webviewStyles" :fullscreen="false">
			</web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kiss: '',
				webviewStyles: {
					height: '50vh'
				}
			}
		},
		methods: {

			back() {
				uni.redirectTo({
					url: '../../pages/my/my'
				})
			},
			bianhua(event) {
				this.$nextTick(function() {
					this.kiss = event.detail.value
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.main {
		height: 80vh;
	}
</style>

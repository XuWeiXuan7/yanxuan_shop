<template>
	<view class="container">
		<view class="nc-tab">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" class="gs" @click="onClick" />
		</view>
		<view class="nc-cont">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					icon: 'shop',
					text: '首页',
				}, {
					icon: 'person',
					text: '我的',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}],
			}
		},
		methods: {
			onClick(e) {
				console.log(e);

				if (e.index == 0) {
					console.log(111);
					uni.switchTab({
						url: '/pages/home/home'
					});
				} else {
					console.log(222);
					uni.switchTab({
						url: '/pages/my/my'
					});
				}
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		justify-content: space-between;

		.nc-tab {
			width: 100%;
			position: fixed;
			bottom: 0;

			.uni-tab__cart-sub-left {
				width: 100%;
				display: flex;
				justify-content: space-around;
			}


		}

		.nc-cont {
			height: 100vh;
			background-color: pink;
		}
	}
</style>

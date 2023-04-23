<template>
	<view class="main">
		<uni-nav-bar background-color="#fff" left-text="返回" left-icon="left" fixed="true" :border="false"
			statusBar="false" @clickLeft="back" backgroundColor="#FEE34C" title="快递接单">
		</uni-nav-bar>
		<view v-if="ListData.length>0">
			<uni-section :title="'赏金订单'+(index+1).toString()" type="line" v-for="(item,index) of ListData" :key="index">
				<uni-card :title="item.name" :extra="item.time" @click="toggle('bottom',item.id)">
					<view class="uni-body">收货地址:{{item.address}}</view>
					<view class="uni-body">快递:{{item.category}}</view>
					<view class="uni-body">联系电话:{{item.phone}}</view>
					<view class="uni-body">赏金:{{item.price}}</view>
				</uni-card>
			</uni-section>
		</view>
		<view v-else class="Ndingdan">
			<text>无订单</text>
		</view>
		<view class="btn">
			<button type="primary" size="mini" @click="subfab">发布需求</button>
		</view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<button type="primary" size="mini" @click="addMyorder" :disabled="jiedanbtn">接单</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { formatDate } from '@/uni_modules/uni-dateformat/components/uni-dateformat/date-format.js'
	export default {
		data() {
			return {
				ListData: [],
				id: null,
				jiedanbtn: false
			}
		},
		created() {
			this.getList()
		},

		methods: {
			async getList() {
				const { data: data } = await uni.$http.post('/jz/selorder')
				console.log(data);
				if (data.code !== 20000)
					uni.showToast({
						icon: "error",
						title: '获取订单失败'
					})
				if (data.message == '身份认证失败') {
					uni.reLaunch({
						url: '/pages/my/my'
					})
					console.log('进入了kd');
				} else {
					data.data.forEach(item => {
						item.time = formatDate(item.time)
					})
					this.ListData = data.data.reverse()
				}
			},
			subfab() {
				uni.navigateTo({
					url: '../kd_details/kd_details'
				})
			},
			//弹出层
			toggle(type, id) {
				console.log(type, '点击率');
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
				this.id = id
			},
			//完成接单
			async addMyorder() {
				this.jiedanbtn = true
				const { data: data } = await uni.$http.post('/jz/kddingdan', {
					openid: uni.getStorageSync('openid'),
					orderid: this.id
				})
				const { data: data1 } = await uni.$http.post('/jz/kdupdatestatus', { id: this.id })
				if (data.code === 20000 && data1.code === 20000) {
					uni.showToast({
						icon: "success",
						title: '接单成功',
						duration: 2000
					})
					this.getList()
					new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve()
						}, 1000)
					}).then(() => {
						this.jiedanbtn = false
					})
				} else {
					uni.showToast({
						icon: "error",
						title: '接单失败',
						duration: 1000
					})
				}
				// this.jiedanflag = false
				this.$refs.popup.close()

			},
			back() {
				uni.reLaunch({
					url: '../../pages/home/home'
				})
			}
		},
	}
</script>

<style lang="scss">
	.main {
		width: 100vw;
		height: 95vh;
		background-color: rgba(240, 240, 240, 1);
		overflow: auto;
	}

	.btn {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%);
	}

	.Ndingdan {
		text-align: center;
	}

	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.box {
		@include flex;
	}

	.button {
		@include flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.example-body {
		background-color: #fff;
		padding: 10px 0;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.popup-warn {
		color: #fff;
		background-color: #faecd8;
	}

	.popup-error {
		color: #fff;
		background-color: #fde2e2;
	}

	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}

	.success-text {
		color: #09bb07;
	}

	.warn-text {
		color: #e6a23c;
	}

	.error-text {
		color: #f56c6c;
	}

	.info-text {
		color: #909399;
	}

	.dialog,
	.share {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.dialog-box {
		padding: 10px;
	}

	.dialog .button,
	.share .button {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		margin: 0;
		margin-top: 10px;
		padding: 3px 0;
		flex: 1;
	}

	.dialog-text {
		font-size: 14px;
		color: #333;
	}
</style>

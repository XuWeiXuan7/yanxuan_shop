<template>
	<view class="kd_details">
		<view class="example">
			<!-- 基础用法，不包含校验规则 -->
			<uni-forms ref="valiForm" :modelValue="kd_from" :rules="rules">
				<uni-forms-item label="姓名" required name="name">
					<uni-easyinput v-model="kd_from.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="地址" required name="address">
					<uni-easyinput v-model="kd_from.address" placeholder="请输入地址" />
				</uni-forms-item>
				<uni-forms-item label="取件码" required name="order">
					<uni-easyinput v-model="kd_from.order" placeholder="请输入取件码" />
				</uni-forms-item>
				<uni-forms-item label="联系方式" required name="phone">
					<uni-easyinput v-model="kd_from.phone" placeholder="请输入联系方式" />
				</uni-forms-item>
				<uni-forms-item label="赏金" required name="price">
					<uni-easyinput v-model="kd_from.price" placeholder="请输入赏金" />
				</uni-forms-item>
				<uni-forms-item label="快递" required name="category">
					<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
				</uni-forms-item>
			</uni-forms>
			<view style="text-align: center;">
				<button size="mini" type="primary" @click="submit('valiForm')" :disabled="fabubtn">发布</button>
			</view>
		</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kd_from: {
					name: 'xus',
					address: '湖北省',
					order: '1111',
					price: "50",
					phone: '15555555555',
					category: '中通'
				},
				fabubtn: false,
				value: 2,
				range: [
					{ value: 0, text: "顺丰" },
					{ value: 1, text: "圆通" },
					{ value: 2, text: "中通" },
					{ value: 3, text: "极兔" },
					{ value: 4, text: "申通" },
					{ value: 5, text: "邮政" },
				],
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					phone: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}, {
							format: 'number',
							errorMessage: '年龄只能输入数字'
						}]
					},
					order: {
						rules: [{
							required: true,
							errorMessage: '取件码不能为空'
						}]
					},
					price: {
						rules: [{
							required: true,
							errorMessage: '赏金不能为空'
						}, {
							format: 'number',
							errorMessage: '赏金只能输入数字'
						}]
					}
				}
			}
		},
		onLoad(option) {},
		methods: {
			change(e) {
				switch (e) {
					case 0:
						this.kd_from.category = '顺丰'
						break;
					case 1:
						this.kd_from.category = '圆通'
						break;
					case 2:
						this.kd_from.category = '中通'
						break;
					case 3:
						this.kd_from.category = '极兔'
						break;
					case 4:
						this.kd_from.category = '申通'
						break;
					case 5:
						this.kd_from.category = '邮政'
						break;
				}
				console.log(e);
			},
			submit(ref) {
				this.fabubtn = true
				this.$refs[ref].validate().then(async (res) => {
					let openid = uni.getStorageSync('openid')
					const { data: data } = await uni.$http.post('/jz/order', {
						data: { ...this.kd_from, openid }
					})
					if (data.code === 20000) {
						uni.showToast({
							icon: 'success',
							title: `发布成功`,
							duration: 2000
						})
						let timer = setTimeout(function() {
							uni.navigateTo({
								url: '../kd/kd',
								success: res => {
									clearTimeout(timer)
								},
								fail: () => {},
								complete: () => {}
							});
						}, 1000);
					} else {
						uni.showToast({
							icon: 'error',
							title: `发布失败`
						})
					}
					new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve()
						}, 2000)
					}).then(() => {
						this.fabubtn = false
					})

				}).catch(err => {
					uni.showToast({
						icon: 'error',
						title: `校验失败`
					})
				})
				// async getList() {
				// 	const { data: data } = await uni.$http.post('/jz/selorder')
				// 	console.log(data);
				// 	if (data.code !== 20000)
				// 		uni.showToast({
				// 			icon: "error",
				// 			title: '获取订单失败'
				// 		})
				// 	this.ListData = data.data
				// }
			},
		},
	}
</script>

<style lang="less" scoped>
	.kd_details {
		height: 70vh;
		width: 80vw;
		margin: 20px auto;
		background-color: #fff;
		font-size: 15px;
		box-sizing: border-box;
		border-radius: 5px;
		padding: 20px;

		text {
			white-space: nowrap;
			width: 130rpx;
			text-align: right;
		}

		input {
			padding: 5px;
			display: inline-block;
		}

		.kd_name,
		.kd_address,
		.kd_danhao,
		.kd_price {
			display: flex;
			align-items: center;
			border-bottom: 1px dashed gray;
			margin-top: 20px;

		}

		.kd_btn {
			text-align: center;

			button {
				margin-top: 20rpx;
			}
		}
	}
</style>

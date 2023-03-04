<template>
	<view class="main">
		<uni-nav-bar background-color="#fff" left-text="返回" left-icon="left" fixed="true" :border="false"
			statusBar="false" @clickLeft="back" backgroundColor="#FEE34C">
		</uni-nav-bar>
		<view class="add-cont">
			<view class="xxaddress">
				<view class="uni-form-item item">
					<text>详细地址</text>
					<input class="uni-input" focus placeholder="请输入详细地址" v-model="address.detaddress" />
				</view>
				<view class="uni-form-item item">
					<text>默认地址</text>
					<checkbox-group>
						<label>
							<checkbox value="cb" :checked="address.mor" @click="change" />是
						</label>
						<label>
							<checkbox value="cb" :checked="!address.mor" @click="change" />否
						</label>
					</checkbox-group>
				</view>
			</view>
			<view class="namephone">
				<view class="uni-form-item item">
					<text>姓&nbsp;&nbsp;&nbsp;&nbsp;名</text>
					<input class="uni-input" placeholder="请输入姓名" v-model="address.name" />
				</view>
				<view class="uni-form-item item">
					<text>手机号</text>
					<input class="uni-input" placeholder="请输入手机号" v-model="address.phone" />
				</view>
			</view>
			<button type="primary" size="30" class="btn" @click="addsubmit">提交</button>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {

		data() {
			return {
				address: {
					mor: true,
					detaddress: '长江工程职业技术学院',
					name: '许',
					phone: '18086195020'
				}
			}
		},
		methods: {
			...mapMutations('m_my', ['ad_address']),
			back() {
				uni.redirectTo({
					url: '../myaddress/myaddress'
				})
			},
			change() {
				console.log(222);
				console.log(this.address.mor);
				this.address.mor = !this.address.mor
			},
			shur(e) {

			},
			addsubmit() {
				const phone = this.address.phone
				console.log(this.address);
				if (this.address.name !== '' && this.address.detaddress !== '') {
					console.log(222);
					if (phone) {
						const reg = RegExp(/^[1][0-9]{10}$/).test(phone)
						if (reg) {
							this.ad_address(this.address)
							uni.redirectTo({
								url: '../myaddress/myaddress'
							})
							return true
						} else {
							uni.showModal({
								title: '请输入正确的联系方式',
								showCancel: false,
								success: (res) => {
									if (res.confirm) {
										this.createInfo.phone = ''
									}
								}
							})
						}
					}
				} else {
					console.log(111);
					uni.$showMsg('输入不能为空', 2000)
				}

			}
		}
	}
</script>

<style lang="scss">
	.main {
		height: 100vh;
		background-color: rgba(230, 230, 230, 1);

		.add-cont {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.xxaddress,
			.namephone {
				box-sizing: border-box;
				padding: 30rpx;
				width: 90vw;
				height: 20vh;
				background-color: #fff;
				margin-top: 30rpx;
				border-radius: 15rpx;


				.item {
					display: flex;
					align-items: center;
					height: 7vh;
					border-bottom: 1px dashed gray;

					text {
						font-weight: bold;
					}

					input {
						display: inline-block;
						padding-left: 20rpx;
					}

					label {
						padding-left: 20rpx;
					}
				}
			}

			.btn {
				margin-top: 20rpx;
				color: black;
				font-weight: bold;
				width: 90vw;
				background-color: #FFE658;
				border-radius: 50rpx;
			}

		}
	}
</style>

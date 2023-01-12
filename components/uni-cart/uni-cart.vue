<template>
	<view>

	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				//锚点观看
				toView: '',
				//弹出层样式
				share: false,
				//商品个数
				cart_num: 0,
				//弹出层取余
				btn_num: 0,
				//样式
				bools: {},
				//商品数据
				total_price: 0,
				//结算
				btnerr: true,

			}
		},
		mounted() {
			if (uni.getStorageSync('naicha_list')) {
				var res
				this.naicha.homeInfo.map((item, index) => {
					let len = JSON.parse(uni.getStorageSync('naicha_list'))
					item.forEach((item1, index1) => {
						res = len.filter(it => {
							return it.id === item1.id
						})
						if (res.length > 0) {
							item[index1].num = res[0].num
						}
						this.cart_num += item[index1].num
						this.total_price += item[index1].num * item[index1].price
					})

				})
			}
		},
		props: ['naicha'],
		watch: {
			total_price: function() {
				if (this.total_price > 5) {
					this.btnerr = false
				} else {
					this.btnerr = true
				}
			}
		},
		computed: {
			home_shop: function() {
				var home_s = []
				var res = []
				this.naicha.homeInfo.forEach(item => {
					res = item.filter(item1 => {
						return item1.num > 0
					})
					if (res)
						res.forEach(item2 => {
							home_s.push(item2)
						})
				})
				return home_s

			}
		},
		methods: {
			...mapMutations('m_home', ['addToCart', 'jianToCart']),
			async jia(item) {
				this.total_price += item.price
				this.cart_num++
				item.num++
				item.name = 'shop_list'
				this.addToCart(item)
			},
			removeStorage() {
				uni.removeStorageSync('shop_list')
				uni.removeStorageSync('naicha_list')
				this.naicha.homeInfo.forEach((item, index) => {
					for (let i = 0; i < item.length; i++) {
						this.$set(item[i], 'num', 0)
					}
				})
				this.naicha.homeInfo.naicha((item, index) => {
					for (let i = 0; i < item.length; i++) {
						this.$set(item[i], 'num', 0)
					}
				})
				this.total_price = 0
				this.cart_num = 0
			},
			jian(item) {
				item.num--
				if (item.num < 0) {
					item.num = 0
				} else {
					this.total_price -= item.price
					this.jianToCart(item, 'shop_list')
					this.cart_num--
				}
			},
			toAnchor(id) {
				let anchorId = 'anchor' + id
				this.toView = ''
				this.$nextTick(() => {
					this.toView = anchorId;
				})
			},
			trigger() {
				this.btn_num++
				if (this.btn_num % 2 == 1)
					this.share = true;
				else {
					this.share = false;
				}
			},
			display() {
				this.btn_num++
				this.share = false
			},
			async jiesuan() {
				let fk = await uni.showModal({
					title: '是否付款'
				})
				console.log(fk);
				if (fk[1].confirm) {
					uni.showLoading({
						title: '数据加载中'
					})
					setTimeout(function() {
						uni.hideLoading();
						uni.$showMsg('付款成功', 1500)
					}, 2000);
				} else {
					uni.$showMsg('付款失败', 1500)
				}
			},
		}
	}
</script>

<style lang="scss">

</style>

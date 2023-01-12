export default {
	namespaced: true,

	state: () => ({
		goods: JSON.parse(uni.getStorageSync('shop_list') || '[]'),
	}),

	mutations: {
		savelocal(state, item) {
			uni.setStorageSync('shop_list', JSON.stringify(state.goods))
		},
		//加商品
		addToCart(state, goods_list) {
			const findIndex = state.goods.findIndex(x => x.title === goods_list.title)
			console.log(findIndex);
			if (findIndex == -1) {
				state.goods.push(goods_list)
			} else {
				state.goods[findIndex].num = goods_list.num
			}
			this.commit('m_home/savelocal')
		},
		//减商品
		jianToCart(state, goods_list) {
			console.log(goods_list);
			if (goods_list.name === 'naicha_list') {
				const findIndex = state.naicha.findIndex(x => x.title === goods_list.title)
				state.naicha[findIndex].num = goods_list.num
				if (state.naicha[findIndex].num == 0) {
					let arr = state.naicha.filter(item => {
						return item.id != goods_list.id
					})
					state.naicha = arr
				}
			} else {
				const findIndex = state.goods.findIndex(x => x.title === goods_list.title)
				state.goods[findIndex].num = goods_list.num
				if (state.goods[findIndex].num == 0) {
					let arr = state.goods.filter(item => {
						return item.id != goods_list.id
					})
					state.goods = arr
				}
			}
			this.commit('m_home/savelocal', goods_list.name)
		}
	},

	getters: {

	}
}

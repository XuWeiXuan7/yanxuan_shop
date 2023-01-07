export default {
	namespaced: true,

	state: () => ({
		goods: JSON.parse(uni.getStorageSync('home') || '[]')
	}),

	mutations: {
		savelocal(state, item) {
			console.log(item);
			uni.setStorageSync('shop_list', JSON.stringify(state.goods))
		},
		addToCart(state, goods_list) {
			const findResult = state.goods.find(x => x.id === goods_list.id)
			if (!findResult) {
				state.goods.push(goods_list)
			} else {
				findResult.num++
			}
			this.commit('m_home/savelocal')
		}
	},

	getters: {

	}
}

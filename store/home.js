export default {
	namespaced: true,

	state: () => ({
		goods: JSON.parse(uni.getStorageSync('shop_list') || '[]')
	}),

	mutations: {
		savelocal(state, item) {
			uni.setStorageSync('shop_list', JSON.stringify(state.goods))
		},
		//加商品
		addToCart(state, goods_list) {
			console.log(goods_list.num, 'num');
			const findIndex = state.goods.findIndex(x => x.id === goods_list.id)
			console.log(findIndex, 'index');
			if (findIndex == -1) {
				state.goods.push(goods_list)
			} else {
				state.goods[findIndex].num = goods_list.num
			}
			this.commit('m_home/savelocal')
		},
		//减商品
		jianToCart(state, goods_list) {
			const findIndex = state.goods.findIndex(x => x.id === goods_list.id)
			state.goods[findIndex].num = goods_list.num
			if (state.goods[findIndex].num == 0) {
				let arr = state.goods.filter(item => {
					return item.id != goods_list.id
				})
				state.goods = arr
			}
			this.commit('m_home/savelocal')
		}
	},

	getters: {

	}
}

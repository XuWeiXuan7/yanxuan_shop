export default {
	namespaced: true,

	state: () => ({
		my_address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),

	mutations: {
		ad_address(state, address) {
			state.my_address = address
			this.commit('m_my/savelocal')
		},
		savelocal(state) {
			uni.setStorageSync('dizhi', JSON.stringify(state.my_address))
		}
	},

	getters: {

	}
}

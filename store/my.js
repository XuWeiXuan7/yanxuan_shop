export default {
	namespaced: true,

	state: () => ({
		my_address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: ''
	}),

	mutations: {
		ad_address (state, address) {
			state.my_address = address
			this.commit('m_my/savelocal')
		},
		savelocal (state) {
			uni.setStorageSync('dizhi', JSON.stringify(state.my_address))
		},
		getToken (state, token) {
			state.token = token
		}
		console.log(1234561231231);
	},

	getters: {

	}
}

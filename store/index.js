import Vue from 'vue'
import Vuex from 'vuex'
import modulehome from '@/store/home.js'
import modulemy from '@/store/my.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		// 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_home，例如：
		// 购物车模块中 cart 数组的访问路径是 m_home/home
		'm_home': modulehome,
		'm_my': modulemy
	}
})

export default store

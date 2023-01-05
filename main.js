// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import { $http } from '@escook/request-miniprogram'
App.mpType = 'app'
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})

	// console.log(store)

	// 判断当前请求的是否为有权限的接口
	if (options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

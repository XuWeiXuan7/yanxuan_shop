// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/index.js'
Vue.config.productionTip = false
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'http://192.168.9.12:7775'
App.mpType = 'app'
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})

	// console.log(store) 
	console.log(options.url, '获取接口信息');
	// 判断当前请求的是否为有权限的接口
	if (options.url.indexOf('/my') === -1) {
		console.log(store, '需要权限');
		options.header = {
			Authorization: uni.getStorageSync('token')
		}
		console.log('权限', store.state.m_my.token, '6666666');
	}
}
$http.afterRequest = function() {
	uni.hideLoading()
}
import io from '@hyoga/uni-socket.io'
const socket = io('http://127.0.0.1:7776', {
	query: {},
	transports: ['websocket', 'polling'],
	timeout: 5000
})
Vue.prototype.$socket = socket
uni.$showMsg = function(title = '数据请求失败111！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
const app = new Vue({
	...App,
	store
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

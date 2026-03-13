export default {
    namespaced: true,

    state: () => ({
        goods: JSON.parse(uni.getStorageSync('shop_list') || '[]'),
    }),

    mutations: {
        savelocal(state) {
            uni.setStorageSync('shop_list', JSON.stringify(state.goods))
        },
        //加商品
        addToCart(state, goods_list) {
            const findIndex = state.goods.findIndex(x => x.title === goods_list.title)
            if (findIndex == -1) {
                state.goods.push(goods_list)
            } else {
                state.goods[findIndex].num = goods_list.num
            }
            console.log(state.goods, '清空测试数据123123121111222222');
            this.commit('m_home/savelocal')
            console.log('199999999999999912312123129991231231')

        },
        //减商品
        jianToCart(state, goods_list) {
            const findIndex = state.goods.findIndex(x => x.title === goods_list.title)
            state.goods[findIndex].num = goods_list.num
            if (state.goods[findIndex].num == 0) {
                let arr = state.goods.filter(item => {
                    return item.title != goods_list.title
                })
                state.goods = arr
            }
            this.commit('m_home/savelocal')
        }
    },

    getters: {}
}

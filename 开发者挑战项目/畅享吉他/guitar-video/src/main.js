import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Swipe, SwipeItem, ActionSheet, Icon,List } from 'vant';

Vue.use(Swipe).use(SwipeItem).use(ActionSheet).use(Icon).use(List);
Vue.config.productionTip = false
import Axios from 'axios'

// ===== 配置 axios =====
Axios.defaults.baseURL = 'http://192.168.31.218:8001/api'
//Axios.defaults.baseURL = 'http://192.168.31.14:8001/api'
//fixme 由于热更新会导致 登录设置 Axios 的默认请求头数据丢失，所以在这里设置一下
Axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
// axios默认是发送请求的时候不会带上cookie的，需要通过设置withCredentials: true来解决
Axios.defaults.withCredentials = true
// todo 这里对请求异常做全局处理，在用 axios 时就不必要对 reject 的情况做 catch处理了
Axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    ElementUI.Message ({
        showClose: true,
        message: error.response.data,
        type: 'error'
        });
    return Promise.reject(error)
});

Vue.prototype.$axios = Axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import Axios from 'axios'

Vue.use(ElementUI)
Vue.use(VideoPlayer)
Vue.config.productionTip = false




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

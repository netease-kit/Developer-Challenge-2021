import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import Axios from 'axios'
import ChatView from "./components/chat/chat.vue";
import io from './sockets/socketio'
    
Vue.use(ElementUI)
Vue.use(VideoPlayer)
Vue.component("ChatView", ChatView);
Vue.config.productionTip = false

var socket = io('http://localhost:5000/',{
    cors:{
        origin: "http://localhost:5000",
        methods:["GET","POST"]
    }
})
Vue.prototype.$socketio = socket


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

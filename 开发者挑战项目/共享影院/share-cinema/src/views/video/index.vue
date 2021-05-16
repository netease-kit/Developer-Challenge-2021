<template>
  <div>
        <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
          <div style="font-size: 25px">{{name}}</div>
          <div class="hor">
            <div style="margin-right: 10px;">{{description}}   </div>
            <el-tag v-for="t in type" :key="t" type="info">{{t}}</el-tag>
          </div>
          <div class="hor">
             <el-image
                :src="'http://127.0.0.1:5000/'+image"
                style="width:240px;height:135px"
                fit="fit"
                ></el-image>
             <div style="width:60% ;margin-left: 10px">
               {{content}}
             </div>
          </div>
  </div>
</template>

<script>


export default {
  name: 'VideoPage',
  props: {
    src: {
      type: String,
      required: true
    },
    type:{
      type: Array,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    image:{
      type: String,
      required: true
    },
    content:{
      type: String,
      required: true
    }
  },
  data(){
      return{
          playerOptions:{
            autoplay: false,
            muted: false,
            loop: false,
            preload: 'auto',
            language: 'zh-CN',
            aspectRatio: '16:9',
            fluid: true,
            sources:[{
            type: "video/mp4",
            src: "http://jdvodyrzl0a5b.vod.126.net/jdvodyrzl0a5b/aee868a4-e082-40e1-ba47-78d43a99bb9d.mp4"
            }],
            techOrder: ['html5', 'flash'],
            width: document.documentElement.clientWidth
        },
        lock: false,
        localUid: Math.ceil(Math.random() * 1e5),
      }
  },
  mounted(){
    let socket = this.$socketio
    let channel = this.$route.query.channelName
    let player = this.$refs.videoPlayer.player
    let _this = this

    // 进度条跳转
    socket.on('seeking_response', function(msg, cb){
      if(msg.uid == _this.localUid) return;
      _this.lock = true
      player.currentTime(msg.time)
      setTimeout(function(){
        _this.lock = false
      }, 500)
    })
    player.on('seeking', function(){
      if(_this.lock) return;
      let time = this.currentTime()
      console.log('video_seeking', time)
      socket.emit('video_seeking',
      {room: channel, time: time, uid: _this.localUid})
    })

    // 播放
    socket.on('play_response', function(msg, cb){
      if(msg.uid == _this.localUid) return;
      _this.lock = true
      player.play()
      setTimeout(function(){
        _this.lock = false
      }, 500)
    })
    player.on('play', function(){
      if(_this.lock) return;
      socket.emit('video_play',
      {room: channel, uid: _this.localUid})
    })
    // 暂停
    socket.on('pause_response', function(msg, cb){
      if(msg.uid == _this.localUid) return;
      _this.lock = true
      player.pause()
      setTimeout(function(){
        _this.lock = false
      }, 500)
    })
    player.on('pause', function(){
      if(_this.lock) return;
      console.log('video_pause')
      socket.emit('video_pause',
      {room: channel, uid: _this.localUid})
    })
  },
  watch:{
      src:{
          handler:function(newval, oldval){
              this.playerOptions.sources[0].src = newval
          },
          immediate: true
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hor{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>

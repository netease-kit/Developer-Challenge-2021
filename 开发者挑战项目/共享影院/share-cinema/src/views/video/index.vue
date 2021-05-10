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
            src: ""
            }],
            techOrder: ['html5', 'flash'],
            width: document.documentElement.clientWidth
        }
      }
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

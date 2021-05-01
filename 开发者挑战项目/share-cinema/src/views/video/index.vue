<template>
  <div>
        <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
          <div style="font-size: 25px">【独播】功守道</div>
          <div class="hor">
            <div style="margin-right: 10px;">2017-11-12 | 22分钟 | 内容简介   </div>
            <el-tag type="info">喜剧</el-tag>
            <el-tag type="info">短篇</el-tag>
            <el-tag type="info">剧情</el-tag>
          </div>
          <div class="hor">
             <el-image
                src='static/fengmian.png'
                style="width:180px;height:250px"
                ></el-image>
             <div style="margin-left: 10px">
               <div>导演: 文章</div>
               <div>主演: 马云 甄子丹 吴京 邹市明 托尼·贾 李连杰</div>
               <div>概要: 该片讲述了一个貌不惊人的中年男子路过“华山派”大门时，脑补出自己过五关斩六将夺得武林秘笈的故事。</div>
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

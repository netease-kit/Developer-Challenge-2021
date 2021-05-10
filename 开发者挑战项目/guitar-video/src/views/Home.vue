<template>
  <div class="home">
    <van-swipe
      style="height: 100vh"
      vertical
      @change="onChange"
      :show-indicators="false"
    >
      <van-swipe-item>
        <div class="main" v-if="isshow">
          <video-player
            v-if="playerOptions.sources[0].src"
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
          <div class="footbox">
            <div class="foot">
              <p class="user">@ {{ artistName }}</p>
              <p class="name">{{ name }}</p>
            </div>
            <div class="pl" @click="openPl">
              <van-icon name="chat" size="30" />
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="main" v-if="!isshow">
          <video-player
            v-if="playerOptions.sources[0].src"
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
          <div class="footbox">
            <div class="foot">
              <p class="user">@ {{ artistName }}</p>
              <p class="name">{{ name }}</p>
            </div>
            <div class="pl" @click="openPl">
              <van-icon name="chat" size="30" />
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-action-sheet v-model="show" class="sheet">
      <van-list
        v-model="loading"
        @load="onLoad"
        :offset="1"
        :immediate-check="false"
      >
        <div style="marginTop:10px; marginLeft:10px; marginRight:10px;
          font-weight: bold; font-size: 20px">{{name}}</div>
          <div style="marginTop:10px; marginLeft:10px; marginRight:10px;
          font-weight: bold; font-size: 15px">@ {{artistName}}</div>
        <div style="marginTop:10px; marginLeft:10px; marginRight:10px">{{comment}}</div>
      </van-list>
    </van-action-sheet>
  </div>
</template>

<script>
import { list, mv, pl } from "@request/api";
import "../video/index";
import { videoPlayer } from "vue-video-player";
export default {
  name: "home",
  data() {
    return {
      list: [
        {url: '/videos?name=guitar1', artistName: '吉他课堂', name: '吉他零基础入门',
          context:'本节课主要介绍吉他的各个部件的名称（琴弦、指板、音孔等），以及需要与吉他配套的一些道具（指力器、变调夹、背带等）。在本节课中，我们还会演奏天空之城和小情歌哦！'
        },
        {url: '/videos?name=guitar2', artistName: '吉他课堂', name: '调音与认音',
          context:'本节课将带你了解抱琴的姿势、左右手弹奏时的手型，带你认识六根琴弦以及手动式调音器的使用方法！'},
        {url: '/videos?name=guitar3', artistName: '吉他课堂', name: '拨弦与节奏',
          context:'本节课主要介绍右手拨弦时的手型和技巧，拨弦时分为靠弦法和不靠弦法，初学者建议使用不靠弦法哦~在本节课中同学们可以跟着老师练习拨弦，并学会弹唱《兰花草》！'},
      ],
      id: "",
      show: false,
      dataLength: 1,
      inx: 0,
      artistName: "",
      name: "",
      isshow: true,
      plist: "",
      loading: false,
      page: 10,
      comment: "",
      playerOptions: {
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        poster:"",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{ type: "video/mp4", src: "" }],
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 分时
          durationDisplay: true, // 持续时间显示
          remainingTimeDisplay: false, // 剩余时间显示
          fullscreenToggle: false, //全屏按钮
        },
      },
    };
  },
  components: {
    videoPlayer,
  },
  mounted() {
    this.wait();
  },
  methods: {
    // 首次获取url
    async wait() {
      let res = await this.$axios.get(this.list[this.inx].url,)
      this.$set(this.playerOptions.sources[0], "src", res.data.PlayInfoList.PlayInfo[0].PlayURL);
      this.artistName = this.list[this.inx].artistName
      this.name = this.list[this.inx].name
      this.comment = this.list[this.inx].context
    },
    // 加载评论
    onLoad() {
      setTimeout(() => {
        this.page += 10;
        this.getpl();
        this.loading = false;
      }, 500);
    },
    // 获取评论
    getpl() {
      pl(this.id, this.page).then((res) => {
        if (document.querySelector(".van-action-sheet__content")) {
          document.querySelector(".van-action-sheet__content").scrollTop = 0;
        }
        this.plist = res.comments;
      });
    },
    // 滑动触发
    async onChange() {
      console.log(this.inx);
      this.isshow = !this.isshow;
      this.getpl();
      if (this.inx < this.list.length - 1) {
        this.inx += 1;
        let res = await this.$axios.get(this.list[this.inx].url,)
        this.$set(this.playerOptions.sources[0], "src", res.data.PlayInfoList.PlayInfo[0].PlayURL);
        this.artistName = this.list[this.inx].artistName
        this.name = this.list[this.inx].name
        this.comment = this.list[this.inx].context
      } else {
        this.inx = 0;
        this.wait();
      }
    },
    // 打开评论列表
    openPl() {
      this.show = true;
      this.getpl();
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  height: 100%;
}
.footbox {
  position: relative;
  bottom: 0;
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user {
  font-size: 14px;
}
.user,
.name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.foot {
  width: 80%;
  color: #fff;
  font-size: 16px;
  z-index: 10001;
}
.pl {
  width: 10%;
  color: #fff;
  font-size: 16px;
  z-index: 10001;
}
.sheet {
  .pll {
    overflow: hidden;
    padding: 10px;
    border-bottom: 1px solid #f4f4f4;
    .pl-l {
      width: 20%;
      float: left;
    }
    .pl-l img {
      width: 55%;
      border-radius: 50%;
      animation: all ds 0.5s;
    }
    @keyframes ds {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .pl-r {
      width: 78%;
      float: left;
    }
    .name1 {
      font-size: 14px;
      color: #666;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .con {
      width: 100%;
      line-height: 24px;
      color: #333333;
      font-size: 14px;
    }
  }
}
</style>

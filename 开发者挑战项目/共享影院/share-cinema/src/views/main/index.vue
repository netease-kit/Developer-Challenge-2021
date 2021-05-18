<template>
  <el-container>
    <el-header>
      <div>
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <div>
        <el-input v-model="channelName" placeholder="请输入房间号">
          <el-button slot="append" icon="el-icon-search">确定</el-button>
        </el-input>
      </div>
    </el-header>
    <el-main>
      <div class="carousel">
        <el-carousel indicator-position="outside" type="card">
          <el-carousel-item v-for="item in carouselData" :key="item.id + 18">
            <div>
              <el-image fit="fit" :src="'http://127.0.0.1:5000/' + item.image">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div></el-image
              >
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="title">电影</div>
      <div class="container">
        <div
          v-for="item in containerData.movie_list"
          :key="item.id"
          class="content"
        >
          <div @click="createVideoPage(item.id)">
            <el-image fit="fit" :src="'http://127.0.0.1:5000/' + item.image">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div></el-image
            >
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="title">游戏</div>
      <div class="container">
        <div
          v-for="item in containerData.game_list"
          :key="item.id"
          class="content"
        >
          <div @click="createVideoPage(item.id)">
            <el-image fit="fit" :src="'http://127.0.0.1:5000/' + item.image">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div></el-image
            >
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "main",
  data() {
    return {
      carouselData: [],
      containerData: [],
      channelName: "",
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:5000/video_list", {})
      .then((res) => {
        this.containerData = res.data;
        this.carouselData = res.data.ad_list;
        console.log(this.videoData);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    createVideoPage(id) {
      let channelName = Math.random().toFixed(5).slice(-5);
      const { path = "single" } = this.$route.query;
      this.$router.push({
        path: `/${path}`,
        query: { channelName, id },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #1d2b40;

  div {
    margin: 0 10px 0 10px;
  }
}

.el-main {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.carousel {
  display: block;
  width: 80%;
  min-width: 1200px;

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    border-radius: 8px;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
    border-radius: 8px;
  }
}

.title {
  font-size: 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 50px 0 10px 0;
  align-self: auto;
  width: 80%;
  min-width: 1200px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  min-width: 1200px;
  justify-content: space-between;

  .content {
    width: 28%;
    height: auto;
    margin: 0 0 20px 0;
    text-align: center;
    cursor: pointer;

    .el-image {
      border-radius: 8px;
    }
  }
}
</style>
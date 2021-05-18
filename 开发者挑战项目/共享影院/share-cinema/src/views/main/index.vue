<template>
  <el-container>
    <el-header></el-header>
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
      <div class="container">
        <div v-for="item in containerData" :key="item.id" class="content">
          <div>
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
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:5000/video_list", {})
      .then((res) => {
        this.containerData = res.data.video_list;
        this.carouselData = res.data.video_list;
        console.log(this.videoData);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="less" scoped>
.el-main {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.carousel {
  display: block;
  width: 80%;

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

.container {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  justify-content: space-around;

  .content {
    width: 25%;
    height: auto;
    margin: 20px;
    text-align: center;

    .el-image {
      border-radius: 8px;
    }
  }
}
</style>
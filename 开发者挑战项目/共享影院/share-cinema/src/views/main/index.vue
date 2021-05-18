<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <div class="carousel">
        <el-carousel indicator-position="outside" type="card">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="container">
        <div v-for="item in 12" :key="item + 18" class="content">
          {{ item }}
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "main",
  data() {
    return {
      carouselData: [],
      containerData: [],
    };
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
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  justify-content: space-around;

  .content {
    background-color: #99a9bf;
    width: 25%;
    height: auto;
    margin: 20px;
  }
}
</style>
<template>
  <div class="chat">
    <!--画面div-->
    <div class="chat-window" ref="large">
      <div class="left">
        <div class="avatar">
          <el-avatar :size="mini" :src="circleUrl"></el-avatar>
        </div>
        <div class="aside">
          <div class="label">乱武 2021年5月14日14:52:25</div>
          <div class="text"><p>嘿嘿哈哈或或或</p></div>
        </div>
      </div>

      <div class="right">
        <div class="avatar">
          <el-avatar :size="mini" :src="circleUrl"></el-avatar>
        </div>
        <div class="aside">
          <div class="label">乱武 2021年5月14日14:52:25</div>
          <div class="text"><p>嘿嘿哈哈或或或</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatView",
  data() {
    return {
      textarea: "",
    };
  },
};
</script>

<style scoped lang="less">
.chat {
  width: 100%;
  position: relative;
  background: #181824;

  .chat-window {
    width: 100%;
    height: auto;
    padding: 0;
    //width: 37vw;
    //width: 427px;
    margin: 0 auto;
    //background: #25252d;

    .left {
      display: flex;
      padding: 10px;

      .avatar {
        height: 100%;
        width: 20%;
      }

      .aside {
        width: 80%;
        display: inline-flex;
        flex-direction: column;

        .label {
          width: 100%;
          height: 20px;
          font-size: 8px;
          color: #00ff00;
        }

        .text {
          width: 100%;
          min-height: 50px;
          p {
            position: relative;
            background: #25a23b;
            border-radius: 5px;
            line-height: 50px;
            margin-left: 10px;
            word-break: break-word;
            color: white;
            padding: 5px;
            line-height: 18px;
          }
          p::after {
            content: "";
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-right-color: #25a23b;
            top: 6px;
            left: -14px;
          }
        }
      }
    }

    .right {
      display: flex;
      flex-direction: row-reverse;
      padding: 10px;

      .avatar {
        height: 100%;
        width: 20%;
        text-align: right;
      }

      .aside {
        width: 80%;
        display: inline-flex;
        flex-direction: column;

        .label {
          width: 100%;
          height: 20px;
          font-size: 8px;
          color: #00ff00;
          text-align: right;
        }

        .text {
          width: 100%;
          min-height: 50px;
          text-align: right;
          p {
            position: relative;
            background: #25a23b;
            border-radius: 5px;
            line-height: 50px;
            margin-left: 10px;
            word-break: break-word;
            color: white;
            padding: 5px;
            line-height: 18px;
          }
          p::after {
            content: "";
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-left-color: #25a23b;
            top: 6px;
            right: -14px;
          }
        }
      }
    }
  }
}
</style>

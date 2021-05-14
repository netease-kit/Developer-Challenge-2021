<template>
  <div class="chat" v-bind:style="iHeight">
    <div class="chat-window" v-bind:style="chatHeight">
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
    <div class="input-area">
      <div class="grid-content">
        <el-input
          type="textarea"
          :rows="1"
          placeholder="这电影真好看"
          v-model="textarea"
          size="mini"
        >
        </el-input>
      </div>
      <div class="grid-content">
        <el-button size="mini" style="height: 30px">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatView",
  props: {
    height: {
      type: Number,
      required: true,
      default: 300,
    },
  },
  data() {
    return {
      textarea: "",
      iHeight: {
        height: this.height + "px",
      },
      chatHeight: {
        height: this.height - 54 + "px",
      },
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
    overflow: hidden scroll;

    .left {
      display: flex;
      padding: 10px;
      align-items:flex-end;

      .avatar {
        height: 100%;
        width: 20%;
        text-align: justify;
        //padding-right: 10px;
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
            border-radius: 8px;
            width: fit-content;
            margin-left: 10px;
            word-break: break-word;
            color: white;
            padding: 5px;
            line-height: 18px;
            z-index: 0;
          }
          p::before {
            content: "";
            position: absolute;
            bottom: -2px;
            left: -10px;
            width: 0px;
            height: 20px;
            z-index: -1;
            border-left: 20px solid #25a23b;
            border-bottom-right-radius: 18px;
          }
          p::after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: -20px;
            width: 0px;
            height: 20px;
            z-index: 1;
            border-left: 20px solid #181824;
            border-bottom-right-radius: 18px;
          }
        }
      }
    }

    .right {
      display: flex;
      flex-direction: row-reverse;
      padding: 10px;
      align-items:flex-end;

      .avatar {
        height: 100%;
        width: 20%;
        text-align: justify;
        padding-left: 20px;
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
            border-radius: 8px;
            width: auto;
            margin-left: 10px;
            word-break: break-word;
            color: white;
            padding: 5px;
            line-height: 18px;
            display: inline-block;
            text-align: left;
            z-index: 0;
          }
          // p::after {
          //   content: "";
          //   display: block;
          //   position: absolute;
          //   width: 0;
          //   height: 0;
          //   border: 8px solid transparent;
          //   border-left-color: #25a23b;
          //   top: 6px;
          //   right: -14px;
          // }
          p::before {
            content: "";
            position: absolute;
            bottom: -2px;
            right: -10px;
            width: 0px;
            height: 20px;
            z-index: -1;
            border-right: 20px solid #25a23b;
            border-bottom-left-radius: 18px;
          }
          p::after {
            content: "";
            position: absolute;
            bottom: -2px;
            right: -20px;
            width: 0px;
            height: 20px;
            z-index: 1;
            border-right: 20px solid #181824;
            border-bottom-left-radius: 18px;
          }
        }
      }
    }
  }

  .input-area {
    position: absolute;
    bottom: 0;
    flex: 0;
    height: 54px;
    //background-image: linear-gradient(180deg, #292933 7%, #212129 100%);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      padding: 10px;

      button {
      }
    }
  }
}
</style>

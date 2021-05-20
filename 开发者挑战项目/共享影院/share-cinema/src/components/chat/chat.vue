<template>
  <div class="chat">
    <div class="chat-window" v-bind:style="height">
      <div class="chat-text left">
        <div class="avatar">
          <el-avatar :size="mini" :src="circleUrl"></el-avatar>
        </div>
        <div class="aside">
          <div class="label">乱武 2021年5月14日14:52:25</div>
          <div class="text"><p>嘿嘿哈哈或或或</p></div>
        </div>
      </div>

      <div class="chat-text right">
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
        <el-input v-model="textarea" placeholder="这电影真好看">
          <el-button slot="append" icon="el-icon-check">发送</el-button>
        </el-input>
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
      required: false,
      default: NaN,
    },
  },
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
  display: flex;
  flex-direction: column;
  flex: 1;

  .chat-window {
    flex: 1;
    width: 100%;
    padding: 0;
    //width: 37vw;
    //width: 427px;
    margin: 0 auto;
    //background: #25252d;
    overflow: hidden auto;

    .chat-text {
      display: flex;
      padding: 10px;
      align-items: flex-end;

      .avatar {
        height: 100%;
        text-align: justify;
        //padding-right: 10px;
      }

      .aside {
        display: inline-flex;
        flex-direction: column;

        .label {
          width: 100%;
          height: 20px;
          font-size: 8px;
          color: gray;
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
            padding: 5px 10px 5px 10px;
            line-height: 18px;
            z-index: 0;
          }
          p::before {
            content: "";
            position: absolute;
            bottom: -2px;
            width: 0px;
            height: 20px;
            z-index: -1;
          }
          p::after {
            content: "";
            position: absolute;
            bottom: -2px;
            width: 0px;
            height: 20px;
            z-index: 1;
          }
        }
      }
    }

    .chat-text.left {
      .avatar {
        padding-right: 10px;
      }
      .aside {
        .text {
          p::before {
            left: -10px;
            border-left: 20px solid #25a23b;
            border-bottom-right-radius: 18px;
          }
          p::after {
            left: -20px;
            border-left: 20px solid #f2f5f6;
            border-bottom-right-radius: 18px;
          }
        }
      }
    }

    .chat-text.right {
      flex-direction: row-reverse;

      .avatar {
        padding-left: 2px;
      }

      .aside {
        .label {
          text-align: right;
        }

        .text {
          text-align: right;

          p {
            text-align: left;
          }
          p::before {
            right: -10px;
            border-right: 20px solid #25a23b;
            border-bottom-left-radius: 18px;
          }
          p::after {
            right: -20px;
            border-right: 20px solid #f2f5f6;
            border-bottom-left-radius: 18px;
          }
        }
      }
    }
  }

  .input-area {
    flex: 0;
    height: 54px;
    //background-image: linear-gradient(180deg, #292933 7%, #212129 100%);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="wrapper">
    <el-container style="height:100%" direction="vertical">
      <el-container>
        <el-main>
          <div class="gameDiv">
            <div style="margin:0 auto;width:640px;height:640px;">
              <canvas
                width="640"
                id="canvas"
                @mousedown="play($event)"
                height="640"
                >你的浏览器不支持HTML5 canvas，请使用 google chrome 浏览器 打开.
              </canvas>
            </div>
          </div>
        </el-main>
        <el-aside class="content">
          <div>
            <div class="myVideoDiv">
              <div class="tab-bar">
                <el-button
                  type="info"
                  v-if="isSilence"
                  icon="el-icon-turn-off-microphone"
                  @click="setOrRelieveSilence"
                ></el-button>
                <el-button
                  type="info"
                  v-else
                  icon="el-icon-microphone"
                  @click="setOrRelieveSilence"
                ></el-button>
                <el-button
                  type="info"
                  v-if="isStop"
                  icon="el-icon-video-camera"
                  @click="stopOrOpenVideo"
                ></el-button>
                <el-button
                  type="info"
                  v-else
                  icon="el-icon-video-camera-solid"
                  @click="stopOrOpenVideo"
                ></el-button>
              </div>
              <div class="main-window" ref="large"></div>
            </div>
            <p
              style="width:100%;text-align:center;font-size:25px;font-weight:700;"
            >
              VS
            </p>
            <div class="main-window" ref="small"></div>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import { message } from '../../components/message';
    import * as WebRTC2 from '../../sdk/NIM_Web_WebRTC2_v4.0.1.js';
    import config from '../../../config';
    import { getToken } from '../../common';

    export default {
        name: 'single',
        data() {
            return {
                isSilence: false,
                isDesc: true,
                isStop: false,
                desc: '等待对方进入...',
                client: null,
                localUid: Math.ceil(Math.random() * 1e5),
                localStream: null,
                remoteStream: null,
                canvas: null,
                context: null,
                isWell: false, //设置该局棋盘是否赢了，如果赢了就不能再走了
                imgB: new Image(),
                imgW: new Image(),
                chessData: null,
                isTurn: null,
                deskId: null,
                role: null
            };
        },
        mounted() {
            this.deskId = this.$route.query.channelName;
            this.role = this.$route.query.role;
            if (this.$route.query.role === 1) {
                this.isTurn = true;
            } else {
                this.isTurn = false;
            }

            this.sockets.subscribe('serverClickPiece', data => {
                if (this.role === 1) this.drawChess(2, data.x, data.y);
                else this.drawChess(1, data.x, data.y);
                this.isTurn = true;
            });

            // 初始化音视频实例
            console.warn('初始化音视频sdk');
            window.self = this;
            this.client = WebRTC2.createClient({
                appkey: config.appkey,
                debug: true
            });
            //监听事件
            this.client.on('peer-online', evt => {
                console.warn(`${evt.uid} 加入房间`);
            });

            this.client.on('peer-leave', evt => {
                console.warn(`${evt.uid} 离开房间`);
                if (this.remoteStream.getId() === evt.uid) {
                    this.remoteStream = null;
                    this.isDesc = true;
                    this.desc = '对方离开房间了';
                    message(this.desc);
                }
            });

            this.client.on('stream-added', evt => {
                var remoteStream = evt.stream;
                console.warn('收到对方发布的订阅消息: ', remoteStream.getId());

                if (
                    this.remoteStream &&
                    this.remoteStream.getId() !== remoteStream.getId()
                ) {
                    console.warn('房间里第三个人加入，忽略');
                    return;
                } else {
                    this.remoteStream = remoteStream;
                }
                this.subscribe(remoteStream);
            });

            this.client.on('stream-removed', evt => {
                var remoteStream = evt.stream;
                console.warn('对方停止订阅: ', remoteStream.getId());
                remoteStream.stop();
            });

            this.client.on('stream-subscribed', evt => {
                console.warn('收到了对端的流，准备播放');
                const remoteStream = evt.stream;
                //用于播放对方视频画面的div节点
                this.isDesc = false;
                const div = this.$refs.small;
                remoteStream
                    .play(div)
                    .then(() => {
                        console.warn('播放视频');
                        remoteStream.setRemoteRenderMode({
                            // 设置视频窗口大小
                            width: div.clientWidth,
                            height: div.clientHeight,
                            cut: false // 是否裁剪
                        });
                    })
                    .catch(err => {
                        console.warn('播放对方视频失败了: ', err);
                    });
            });

            this.getToken()
                .then(token => {
                    this.joinChannel(token);
                })
                .catch(e => {
                    message(e);
                    console.error(e);
                });

            this.imgB.src = require('../../assets/images/b.png'); //白棋图片
            this.imgW.src = require('../../assets/images/w.png'); //黑棋图片
            this.chessData = new Array(15); //这个为棋盘的二维数组用来保存棋盘信息，初始化0为没有走过的，1为白棋走的，2为黑棋走的
            for (let x = 0; x < 15; x++) {
                this.chessData[x] = new Array(15);
                for (let y = 0; y < 15; y++) {
                    this.chessData[x][y] = 0;
                }
            }
            this.drawRect();
        },
        destroyed() {
            try {
                this.localStream.destroy();
                WebRTC2.destroy();
            } catch (e) {
                // 为了兼容低版本，用try catch包裹一下
            }
        },
        methods: {
            drawRect() {
                //页面加载完毕调用函数，初始化棋盘
                this.canvas = document.getElementById('canvas');
                this.context = this.canvas.getContext('2d');

                const bacImg = new Image();
                bacImg.src = require('../../assets/images/back.jpg');
                bacImg.onload = imgfn; //图片加载完在执行
                const that = this;
                function imgfn() {
                    const bg = that.context.createPattern(bacImg, 'no-repeat'); //createPattern() 方法在指定的方向内重复指定的元素。
                    that.context.fillStyle = bg; //fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。
                    that.context.fillRect(0, 0, that.canvas.width, that.canvas.height); //绘制已填充矩形fillRect(左上角x坐标, 左上角y坐标, 宽, 高)

                    for (var i = 0; i <= 640; i += 40) {
                        //绘制棋盘的线
                        that.context.beginPath();
                        that.context.moveTo(0, i);
                        that.context.lineTo(640, i);
                        that.context.closePath();
                        that.context.stroke();
                        that.context.beginPath();
                        that.context.moveTo(i, 0);
                        that.context.lineTo(i, 640);
                        that.context.closePath();
                        that.context.stroke();
                    }
                }
            },

            play(e) {
                if (this.isWell === true) {
                    this.$alert('游戏结束，请返回主页重新开始', '错误', {
                        confirmButtonText: '确定',
                        center: true,
                        type: 'error'
                    }).then(() => {
                        this.$router.push({
                            path: '/'
                        });
                        location.reload();
                    });
                    return;
                }
                if (!this.isTurn) {
                    this.$alert('请等待对手下棋', '错误', {
                        confirmButtonText: '确定',
                        center: true,
                        type: 'error'
                    });
                    return;
                }
                console.log(e);
                //鼠标点击时发生
                const x = parseInt((e.offsetX - 20) / 40); //计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置
                const y = parseInt((e.offsetY - 20) / 40);
                if (this.chessData[x][y] !== 0) {
                    //判断该位置是否被下过了
                    this.$alert('这个位置已经有棋子了', '错误', {
                        confirmButtonText: '确定',
                        center: true,
                        type: 'error'
                    });
                    return;
                }
                this.drawChess(this.role, x, y);
                this.$socket.emit('clickPiece', {
                    role: this.role,
                    deskId: this.deskId,
                    x: x,
                    y: y
                });
                this.isTurn = false;
            },

            drawChess(chess, x, y) {
                //参数为，棋（1为白棋，2为黑棋），数组位置
                if (x >= 0 && x < 15 && y >= 0 && y < 15) {
                    if (chess === 1) {
                        this.context.drawImage(this.imgW, x * 40 + 20, y * 40 + 20); //绘制白棋
                        this.chessData[x][y] = 1;
                    } else {
                        this.context.drawImage(this.imgB, x * 40 + 20, y * 40 + 20);
                        this.chessData[x][y] = 2;
                    }
                    this.judge(x, y, chess);
                }
            },

            judge(x, y, chess) {
                //判断该局棋盘是否赢了
                let count1 = 0;
                let count2 = 0;
                let count3 = 0;
                let count4 = 0;
                //左右判断
                let i;
                let j;
                for (i = x; i >= 0; i--) {
                    if (this.chessData[i][y] !== chess) {
                        break;
                    }
                    count1++;
                }
                for (i = x + 1; i < 15; i++) {
                    if (this.chessData[i][y] !== chess) {
                        break;
                    }
                    count1++;
                }
                //上下判断
                for (i = y; i >= 0; i--) {
                    if (this.chessData[x][i] !== chess) {
                        break;
                    }
                    count2++;
                }
                for (i = y + 1; i < 15; i++) {
                    if (this.chessData[x][i] !== chess) {
                        break;
                    }
                    count2++;
                }
                //左上右下判断
                j = y;
                for (i = x; i >= 0; i--) {
                    if (this.chessData[i][j] !== chess) {
                        break;
                    }
                    count3++;
                    j--;
                    if (j < 0) break;
                }
                j = y + 1;
                for (i = x + 1; i < 15; i++) {
                    if (this.chessData[i][j] !== chess) {
                        break;
                    }
                    count3++;
                    j++;
                    if (j >= 15) break;
                }
                //右上左下判断
                j = y;
                for (i = x; i >= 0; i--) {
                    if (this.chessData[i][j] !== chess) {
                        break;
                    }
                    count4++;
                    j++;
                    if (j >= 15) break;
                }
                j = y - 1;
                for (i = x + 1; i < 15; i++) {
                    if (this.chessData[i][j] !== chess) {
                        break;
                    }
                    count4++;
                    j--;
                    if (j < 0) break;
                }

                if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
                    let messageNow = '';
                    if (chess === 1) {
                        messageNow = '白棋获胜';
                    } else {
                        messageNow = '黑棋获胜';
                    }
                    this.isWell = true; //设置该局棋盘已经赢了，不可以再走了
                    this.$alert(messageNow, '游戏结束', {
                        confirmButtonText: '确定',
                        center: true
                    });
                }
            },
            getToken() {
                return getToken({
                    uid: this.localUid,
                    appkey: config.appkey,
                    appSecret: config.appSecret,
                    channelName: this.$route.query.channelName
                }).then(
                    token => {
                        return token;
                    },
                    e => {
                        throw e;
                    }
                );
            },
            returnJoin(time = 2000) {
                setTimeout(() => {
                    this.$router.push({
                        path: '/'
                    });
                }, time);
            },
            joinChannel(token) {
                if (!this.client) {
                    message('内部错误，请重新加入房间');
                    return;
                }
                console.info('开始加入房间: ', this.$route.query.channelName);
                this.client
                    .join({
                        channelName: this.$route.query.channelName,
                        uid: this.localUid,
                        token
                    })
                    .then(data => {
                        console.info('加入房间成功，开始初始化本地音视频流');
                        this.initLocalStream();
                    })
                    .catch(error => {
                        console.error('加入房间失败：', error);
                        message(`${error}: 请检查appkey或者token是否正确`);
                        this.returnJoin();
                    });
            },
            initLocalStream() {
                //初始化本地的Stream实例，用于管理本端的音视频流
                this.localStream = WebRTC2.createStream({
                    uid: this.localUid,
                    audio: true, //是否启动mic
                    video: true, //是否启动camera
                    screen: false //是否启动屏幕共享
                });

                //设置本地视频质量
                this.localStream.setVideoProfile({
                    resolution: WebRTC2.VIDEO_QUALITY_720p, //设置视频分辨率
                    frameRate: WebRTC2.CHAT_VIDEO_FRAME_RATE_15 //设置视频帧率
                });
                //设置本地音频质量
                this.localStream.setAudioProfile('speech_low_quality');
                //启动媒体，打开实例对象中设置的媒体设备
                this.localStream
                    .init()
                    .then(() => {
                        console.warn('音视频开启完成，可以播放了');
                        const div = self.$refs.large;
                        this.localStream.play(div);
                        this.localStream.setLocalRenderMode({
                            // 设置视频窗口大小
                            width: div.clientWidth,
                            height: div.clientHeight,
                            cut: true // 是否裁剪
                        });
                        // 发布
                        this.publish();
                    })
                    .catch(err => {
                        console.warn('音视频初始化失败: ', err);
                        message('音视频初始化失败');
                        this.localStream = null;
                    });
            },
            publish() {
                console.warn('开始发布视频流');
                //发布本地媒体给房间对端
                this.client
                    .publish(this.localStream)
                    .then(() => {
                        console.warn('本地 publish 成功');
                    })
                    .catch(err => {
                        console.error('本地 publish 失败: ', err);
                        message('本地 publish 失败');
                    });
            },
            subscribe() {
                this.remoteStream.setSubscribeConfig({
                    audio: true,
                    video: true
                });
                this.client
                    .subscribe(this.remoteStream)
                    .then(() => {
                        console.warn('本地 subscribe 成功');
                    })
                    .catch(err => {
                        console.warn('本地 subscribe 失败: ', err);
                        message('订阅对方的流失败');
                    });
            },
            setOrRelieveSilence() {
                const { isSilence } = this;
                this.isSilence = !isSilence;
                if (this.isSilence) {
                    console.warn('关闭mic');
                    this.localStream
                        .close({
                            type: 'audio'
                        })
                        .then(() => {
                            console.warn('关闭 mic sucess');
                        })
                        .catch(err => {
                            console.warn('关闭 mic 失败: ', err);
                            message('关闭 mic 失败');
                        });
                } else {
                    console.warn('打开mic');
                    if (!this.localStream) {
                        message('当前不能打开mic');
                        return;
                    }
                    this.localStream
                        .open({
                            type: 'audio'
                        })
                        .then(() => {
                            console.warn('打开mic sucess');
                        })
                        .catch(err => {
                            console.warn('打开mic失败: ', err);
                            message('打开mic失败');
                        });
                }
            },
            stopOrOpenVideo() {
                const { isStop } = this;
                this.isStop = !isStop;
                if (this.isStop) {
                    console.warn('关闭摄像头');
                    this.localStream
                        .close({
                            type: 'video'
                        })
                        .then(() => {
                            console.warn('关闭摄像头 sucess');
                        })
                        .catch(err => {
                            console.warn('关闭摄像头失败: ', err);
                            message('关闭摄像头失败');
                        });
                } else {
                    console.warn('打开摄像头');
                    if (!this.localStream) {
                        message('当前不能打开camera');
                        return;
                    }
                    this.localStream
                        .open({
                            type: 'video'
                        })
                        .then(() => {
                            console.warn('打开摄像头 sucess');
                            const div = self.$refs.large;
                            this.localStream.play(div);
                            this.localStream.setLocalRenderMode({
                                // 设置视频窗口大小
                                width: div.clientWidth,
                                height: div.clientHeight,
                                cut: true // 是否裁剪
                            });
                        })
                        .catch(err => {
                            console.warn('打开摄像头失败: ', err);
                            message('打开摄像头失败');
                        });
                }
            },
            handleOver() {
                console.warn('离开房间');
                this.client.leave();
                this.returnJoin(1);
            }
        }
    };
</script>

<style scoped lang="less">
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .el-aside {
    width: 15%;
    background-color: #e1e1e1;
  }
  .main-window {
    width: 100%;
    height: 200px;
  }
  .tab-bar {
    height: 54px;
    background-image: linear-gradient(180deg, #292933 7%, #212129 100%);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

    li {
      height: 54px;
      width: 125px;
      cursor: pointer;
      //静音
      &.silence {
        background: url('../../assets/img/icon/silence.png') no-repeat center;
        background-size: 60px 54px;

        &:hover {
          background: url('../../assets/img/icon/silence-hover.png') no-repeat
            center;
          background-size: 60px 54px;
        }

        &:active {
          background: url('../../assets/img/icon/silence-click.png') no-repeat
            center;
          background-size: 60px 54px;
        }

        &.isSilence {
          //已经开启静音
          background: url('../../assets/img/icon/relieve-silence.png') no-repeat
            center;
          background-size: 60px 54px;

          &:hover {
            background: url('../../assets/img/icon/relieve-silence-hover.png')
              no-repeat center;
            background-size: 60px 54px;
          }

          &:active {
            background: url('../../assets/img/icon/relieve-silence-click.png')
              no-repeat center;
            background-size: 60px 54px;
          }
        }
      }

      //结束按钮
      &.over {
        background: url('../../assets/img/icon/over.png') no-repeat center;
        background-size: 68px 36px;

        &:hover {
          background: url('../../assets/img/icon/over-hover.png') no-repeat
            center;
          background-size: 68px 36px;
        }

        &:active {
          background: url('../../assets/img/icon/over-click.png') no-repeat
            center;
          background-size: 68px 36px;
        }
      }

      // 停止按钮
      &.stop {
        background: url('../../assets/img/icon/stop.png') no-repeat center;
        background-size: 60px 54px;

        &:hover {
          background: url('../../assets/img/icon/stop-hover.png') no-repeat
            center;
          background-size: 60px 54px;
        }

        &:active {
          background: url('../../assets/img/icon/stop-click.png') no-repeat
            center;
          background-size: 60px 54px;
        }

        //已经是停止状态
        &.isStop {
          background: url('../../assets/img/icon/open.png') no-repeat center;
          background-size: 60px 54px;

          &:hover {
            background: url('../../assets/img/icon/open-hover.png') no-repeat
              center;
            background-size: 60px 54px;
          }

          &:active {
            background: url('../../assets/img/icon/open-click.png') no-repeat
              center;
            background-size: 60px 54px;
          }
        }
      }
    }
  }
}
</style>

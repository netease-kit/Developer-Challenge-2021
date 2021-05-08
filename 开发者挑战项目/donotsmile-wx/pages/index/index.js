// index.js
// 获取应用实例
const app = getApp();
let listener;
Page({
  data: {
    ctx: null
  },
  openCamera: function (res) {
    var nCounter = 0;
    var that = this
    var camera_ctx = wx.createCameraContext()
    listener = camera_ctx.onCameraFrame((frame) => {
      if(nCounter < 60) {
        nCounter++;
        return;
      }
      nCounter = 0;
      console.log(frame);
      // nCounter等于30 是因为一开始相机会有一个对焦的过程，如果一开始获取数据，就是模糊的图片
      console.log(frame.data instanceof ArrayBuffer, frame.width, frame.height)
      var data = new Uint8Array(frame.data);
      var clamped = new Uint8ClampedArray(data);
      // 实时帧数据添加到Canvas上
      wx.canvasPutImageData({
        canvasId: 'myCanvas',
        x: 0,
        y: 0,
        width: frame.width,
        height: frame.height,
        data: clamped,
        success(res) {
          // 转换临时文件
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: frame.width,
            height: frame.height,
            canvasId: 'myCanvas',
            fileType: 'jpg',
            destWidth: frame.width,
            destHeight: frame.height,
            // 精度修改
            quality: 1,
            success(res) {
              // 临时文件转base64
              wx.getFileSystemManager().readFile({
                filePath: res.tempFilePath, //选择图片返回的相对路径
                encoding: 'base64', //编码格式
                success: res => {
                  // 保存base64
                  that.data.mybase64 = res.data;
                  that.uploadPic();
                }
              })
            },
            fail(res) {
              console.log(res);
            }
          }, that)
        }
      })
    })
    listener.start()
  },

  stopRecord() {
    listener.stop();
  },

  uploadPic: function () {
    const picData = {
      a: this.data.mybase64
    }

    wx.request({
      url: 'http://localhost:5000/getImg',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: picData,
      success: (res) => {
        console.log(res);
        if(res.data == "isSmile") {
          wx.showToast({
            title: '挑战失败',
            duration: 2000
          })
          this.stopRecord()
        }
      }
    });
  },
  videoPage() {
    wx.navigateTo({
      url: '/pages/video/video',
    })
  }
})
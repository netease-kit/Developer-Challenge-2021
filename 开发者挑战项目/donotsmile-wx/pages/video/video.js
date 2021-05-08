let listener
const urls = [
  'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
  'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
  'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'

]

const videoList = urls.map((url, index) => ({ id: index + 1, url }))
Page({
  data: {
    videoList,
    successC: 1,
    curId: 2
  },

  onLoad() {
    // this.openCamera()
  },

  onPlay(e) {
    //开始检测
    console.log("开始检测" + e.detail.activeId);
    this.openCamera();
  },

  onPause(e) {
     //用来区分人工触发的暂停和系统的暂停
     if (e.detail.activeId == this.data.curId) {
        console.log("用户手动的暂停");
        this.stopRecord();
     }
  },

  onEnded(e) {

    console.log("看完了");
    if (this.data.successC == 1) {
      wx.showToast({
        title: '挑战成功',
        duration: 2000
      })
    }
  },

  onError(e) {},

  onWaiting(e) {},

  onTimeUpdate(e) {},

  onProgress(e) {},

  onLoadedMetaData(e) {
    console.log('LoadedMetaData', e)
  },
  bindChange(e) {
    console.log("当前切换到：" + e.detail.activeId);
    this.setData({
      curId: e.detail.activeId
    })
  },




  openCamera: function (res) {
    var nCounter = 0;
    var that = this
    var camera_ctx = wx.createCameraContext()
    listener = camera_ctx.onCameraFrame((frame) => {
      if(nCounter < 180) {
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
    console.log("停止记录");
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
        if(res.data == "isSmile" || true) {
          this.setData({
            successC: 0
          })
          this.stopRecord()
          wx.showToast({
            title: '挑战失败',
            icon: 'none',
            duration: 2000,
            success: function() {
              setTimeout(function() {
                wx.navigateBack({
                  delta: 0,
                })
              }, 2000)
            }
          })
        }
      }
    });
  },


})

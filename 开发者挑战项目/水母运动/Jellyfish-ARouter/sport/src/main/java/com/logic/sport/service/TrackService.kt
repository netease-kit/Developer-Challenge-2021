package com.logic.sport.service

import android.app.*
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Build
import android.os.IBinder
import com.amap.api.track.AMapTrackClient
import com.amap.api.track.ErrorCode
import com.amap.api.track.TrackParam
import com.amap.api.track.query.model.*
import com.logic.sport.R
import com.logic.sport.timer.TimerActivity
import com.logic.sport.utils.MessageEvent
import com.logic.sport.utils.SimpleOnTrackLifecycleListener
import com.logic.sport.utils.SimpleOnTrackListener
import com.logic.utils.Cache
import com.logic.utils.Constants
import com.logic.utils.ext.log
import com.logic.utils.ext.toast
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode

/**
 * 基于猎鹰SDK的后台服务,在后台一直上报
 */
class TrackService : Service() {

  private lateinit var aMapTrackClient: AMapTrackClient

  // 地图相关的判断和参数
  private var terminalId: Long = 0
  private var trackId: Long = 0
  private var uploadToTrack = false
  private var isServiceRunning: Boolean = false
  private var isGatherRunning: Boolean = false

  override fun onCreate() {
    super.onCreate()
    startForeground(100, buildNotification())
    EventBus.getDefault().register(this)
    aMapTrackClient = AMapTrackClient(applicationContext)
    startTrack()
  }

  override fun onDestroy() {
    super.onDestroy()
    EventBus.getDefault().unregister(this)
    if (isServiceRunning) {
      aMapTrackClient.stopTrack(
        TrackParam(Constants.SERVICE_ID, terminalId),
        onTrackLifecycleListener
      )
    }
  }

  override fun onBind(intent: Intent?): IBinder? {
    return null
  }

  @Subscribe(threadMode = ThreadMode.MAIN)
  fun onMessageEvent(event: MessageEvent) {
    when (event.type) {
      MessageEvent.TYPE_PAUSE_TRACK_SERVICE -> stopGather()
      MessageEvent.TYPE_RESUME_TRACK_SERVICE -> startGather()
    }
  }

  private fun startTrack() {
    // 查询终端信息
    aMapTrackClient.queryTerminal(
      QueryTerminalRequest(Constants.SERVICE_ID, Cache.terminalName),
      object : SimpleOnTrackListener() {
        // 查询终端信息回调
        override fun onQueryTerminalCallback(queryTerminalResponse: QueryTerminalResponse) {
          if (queryTerminalResponse.isSuccess) {
            // 如果终端存在
            if (queryTerminalResponse.isTerminalExist) {
              terminalId = queryTerminalResponse.tid
              // 是否要创建新的轨迹,还是在之前的轨迹的基础上继续上传
              if (uploadToTrack) {
                // 每次都添加新的轨迹
                aMapTrackClient.addTrack(
                  AddTrackRequest(Constants.SERVICE_ID, terminalId),
                  object : SimpleOnTrackListener() {
                    // 添加新的轨迹回调
                    override fun onAddTrackCallback(addTrackResponse: AddTrackResponse) {
                      if (addTrackResponse.isSuccess) {
                        trackId = addTrackResponse.trid
                        Cache.trackId = addTrackResponse.trid
                        beginTrack()
                      } else {
                        toast("网络请求失败,${addTrackResponse.errorMsg}")
                      }
                    }
                  })
              }
              // 不创建新的轨迹,直接在旧的轨迹的基础上继续添加
              else {
                beginTrack()
              }
            }
            // 如果终端不存在,就创建新的终端
            else {
              aMapTrackClient.addTerminal(
                AddTerminalRequest(Cache.terminalName, Constants.SERVICE_ID),
                object : SimpleOnTrackListener() {
                  override fun onCreateTerminalCallback(addTerminalResponse: AddTerminalResponse) {
                    if (addTerminalResponse.isSuccess) {
                      terminalId = addTerminalResponse.tid
                      beginTrack()
                    } else {
                      toast("网络请求失败,${addTerminalResponse.errorMsg}")
                    }
                  }
                })
            }
          } else {
            toast("网络请求失败${queryTerminalResponse.errorMsg}")
          }
        }
      }
    )
  }

  private fun startGather() {
    aMapTrackClient.trackId = trackId
    aMapTrackClient.startGather(onTrackLifecycleListener)
  }

  private fun stopGather() {
    aMapTrackClient.stopGather(onTrackLifecycleListener)
  }

  private fun beginTrack() {
    val trackParam = TrackParam(Constants.SERVICE_ID, terminalId)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      trackParam.notification = buildNotification()
    }
    aMapTrackClient.startTrack(trackParam, onTrackLifecycleListener)
  }

  private val onTrackLifecycleListener = object : SimpleOnTrackLifecycleListener() {
    override fun onBindServiceCallback(status: Int, msg: String) {
      log("onBindServiceCallback, status: $status, msg: $msg")
    }

    override fun onStartTrackCallback(status: Int, msg: String) {
      if (status == ErrorCode.TrackListen.START_TRACK_SUCEE || status == ErrorCode.TrackListen.START_TRACK_SUCEE_NO_NETWORK) {
        // 成功启动
        toast("启动服务成功")
        isServiceRunning = true
        // 成功启动服务后, 开始采集
        startGather()
      } else if (status == ErrorCode.TrackListen.START_TRACK_ALREADY_STARTED) {
        // 已经启动
        toast("服务已经启动")
        isServiceRunning = true
        // 成功启动服务后, 开始采集
        startGather()
      } else {
        toast("error onStartTrackCallback, status: $status, msg: $msg")
      }
    }

    override fun onStopTrackCallback(status: Int, msg: String) {
      if (status == ErrorCode.TrackListen.STOP_TRACK_SUCCE) {
        // 成功停止
        toast("停止服务成功")
        isServiceRunning = false
        isGatherRunning = false
      } else {
        toast("error onStopTrackCallback, status: $status, msg: $msg")
      }
    }

    override fun onStartGatherCallback(status: Int, msg: String) {
      when (status) {
        ErrorCode.TrackListen.START_GATHER_SUCEE -> {
          toast("定位采集开启成功")
          isGatherRunning = true
        }
        ErrorCode.TrackListen.START_GATHER_ALREADY_STARTED -> {
          toast("定位采集已经开启")
          isGatherRunning = true
        }
        else -> {
          toast("error onStartGatherCallback, status: $status, msg: $msg")
        }
      }
    }

    override fun onStopGatherCallback(status: Int, msg: String) {
      if (status == ErrorCode.TrackListen.STOP_GATHER_SUCCE) {
        toast("定位采集停止成功")
        isGatherRunning = false
      } else {
        toast("error onStopGatherCallback, status: $status, msg: $msg")
      }
    }
  }

  /**
   * 将服务推到前台,已保证进程的存活以及服务的持续
   */
  private fun buildNotification(): Notification {
    val builder: Notification.Builder
    val notification: Notification
    if (Build.VERSION.SDK_INT >= 26) {
      //Android O上对Notification进行了修改，如果设置的targetSDKVersion>=26建议使用此种方式创建通知栏
      val notificationManager =
        getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      val channelId = packageName
      val notificationChannel = NotificationChannel(
        channelId,
        "BackgroundLocation",
        NotificationManager.IMPORTANCE_DEFAULT
      ).apply {
        enableLights(true)//是否在桌面icon右上角展示小圆点
        lightColor = Color.BLUE //小圆点颜色
        setShowBadge(true) //是否在久按桌面图标时显示此渠道的通知
      }
      notificationManager.createNotificationChannel(notificationChannel)
      builder = Notification.Builder(applicationContext, channelId)
    } else {
      builder = Notification.Builder(applicationContext)
    }
    val intent = Intent(this, TimerActivity::class.java)
    val pendingIntent = PendingIntent.getActivity(this, 0, intent, 0)
    builder.setContentIntent(pendingIntent)
      .setSmallIcon(R.mipmap.logo)
      .setContentTitle("水母运动")
      .setContentText("正在后台运行")
      .setWhen(System.currentTimeMillis())

    notification = builder.build()
    return notification
  }

}
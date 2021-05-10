package com.logic.sport.service

import android.annotation.SuppressLint
import android.app.*
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Handler
import android.os.IBinder
import android.os.Message
import android.os.SystemClock
import com.amap.api.location.AMapLocationClient
import com.amap.api.location.AMapLocationClientOption
import com.amap.api.location.AMapLocationListener
import com.logic.sport.R
import com.logic.sport.timer.TimerActivity
import com.logic.sport.utils.MessageEvent
import com.logic.sport.utils.TimerEvent
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode

/**
 * 基于定位SDK的后台服务,把定位的数据存储到数据库
 * 然后在地图Activity中获取数据,进行纠偏,然后画出轨迹
 */
class LocationService : Service() {

  private lateinit var locationClient: AMapLocationClient
  private lateinit var locationOption: AMapLocationClientOption

  private var eventBus: EventBus? = null

  private val notification: Notification by lazy { buildNotification() }

  override fun onCreate() {
    super.onCreate()
    startForeground(2001, notification)
    initLocation()

    eventBus = EventBus.getDefault()
    eventBus?.register(this)

    startCount()
  }

  override fun onDestroy() {
    super.onDestroy()
    locationClient.stopLocation()
    locationClient.disableBackgroundLocation(true)
    eventBus?.unregister(this)
    eventBus = null
  }

  @Subscribe(threadMode = ThreadMode.MAIN)
  fun onMessageEvent(event: MessageEvent) {
    when (event.type) {
      MessageEvent.TYPE_PAUSE_TRACK_SERVICE -> stopCount()
      MessageEvent.TYPE_RESUME_TRACK_SERVICE -> startCount()
    }
  }

  /**
   * 初始化定位
   *
   * @since 2.8.0
   * @author hongming.wang
   */
  private fun initLocation() {
    //初始化client
    locationClient = AMapLocationClient(applicationContext)
    locationOption = getDefaultOption()
    //设置定位参数
    locationClient.setLocationOption(locationOption)
    // 设置定位监听
    locationClient.setLocationListener(locationListener)

    // 启动定位
    locationClient.startLocation()

    locationClient.enableBackgroundLocation(2002, notification)
  }


  private var currSpeed: Float = 0F

  /**
   * 定位监听
   */
  private var locationListener: AMapLocationListener = AMapLocationListener { location ->
    if (location != null && location.errorCode == 0) {
//      currSpeed = location.speed
//      CoroutineScope(Dispatchers.Main).launch {
//        RoomFactory.repository.insertPathRecord(
//          location.latitude,
//          location.longitude,
//          location.speed,
//          location.bearing,
////          location.time // 此处如果位置没有改变会一直返回相同的时间
//          System.currentTimeMillis()
//        )
//      }
    }
  }

  private fun getDefaultOption(): AMapLocationClientOption {
    val option = AMapLocationClientOption()
    /**
     * 设置签到场景，相当于设置为：
     * option.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
     * option.setOnceLocation(false);
     * option.setOnceLocationLatest(false);
     * option.setMockEnable(false);
     * option.setWifiScan(true);
     *
     * 其他属性均为模式属性。
     * 如果要改变其中的属性，请在在设置定位场景之后进行
     */
    option.locationPurpose = AMapLocationClientOption.AMapLocationPurpose.Sport
    return option
  }

  /**
   * 将服务推到前台,已保证进程的存活以及服务的持续
   */
  private fun buildNotification(): Notification {
    val builder: Notification.Builder
    val notification: Notification
    if (android.os.Build.VERSION.SDK_INT >= 26) {
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

  private var minute = 0
  private var second = 0
  private var targetTime = 0L
  private var timerHandler: Handler? = null

  private fun startCount() {
    if (second != 0) {
      second--
    }
    timerHandler = @SuppressLint("HandlerLeak") object : Handler() {
      override fun handleMessage(msg: Message?) {
        // 通过EventBus发送给TimerActivity当前的计时,速度,里程
        eventBus?.post(TimerEvent(minute, second, currSpeed))
        if (second >= 59) {
          second = 0
          minute++
        } else {
          second++
        }
        targetTime += 1000L
        sendEmptyMessageAtTime(0, targetTime)
      }
    }
    targetTime = SystemClock.uptimeMillis()
    timerHandler?.sendEmptyMessage(0)
  }

  private fun stopCount() {
    timerHandler?.removeMessages(0)
    timerHandler = null
  }

  override fun onBind(intent: Intent?): IBinder? {
    return null
  }

}
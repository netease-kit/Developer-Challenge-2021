package com.logic.sport.timer

import android.content.Intent
import android.view.KeyEvent
import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.sport.R
import com.logic.sport.databinding.ActivityTimerBinding
import com.logic.sport.service.LocationService
import com.logic.sport.service.TrackService
import com.logic.sport.utils.TimerEvent
import com.logic.utils.BaseActivity
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode

@Route(path = "/sport/timer")
class TimerActivity : BaseActivity<TimerViewModel, ActivityTimerBinding>(R.layout.activity_timer) {

  private var locationIntent: Intent? = null
  private var trackIntent: Intent? = null

  override fun init() {
    binding.viewmodel = viewModel
    EventBus.getDefault().register(this)
//    if (Cache.isLocationSDK) {
//      startLocationService()
//    } else {
//      startTrackService()
//    }
  }

  override fun onDestroy() {
    super.onDestroy()
    EventBus.getDefault().unregister(this)
    stopLocationService()
    stopTrackService()
  }

  override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    if (keyCode == KeyEvent.KEYCODE_BACK) {
      return true
    }
    return super.onKeyDown(keyCode, event)
  }

  @Subscribe(threadMode = ThreadMode.MAIN)
  fun onTimerEvent(event: TimerEvent) {
    viewModel.timeCostNumber.value = "${event.minute}分${event.second}秒"
    viewModel.speedNumber.value = "${event.speed}米/秒"
  }

  private fun startLocationService() {
    locationIntent = Intent(this, LocationService::class.java)
    startService(locationIntent)
  }

  private fun startTrackService() {
    trackIntent = Intent(this, TrackService::class.java)
    startService(trackIntent)
  }

  private fun stopLocationService() {
    locationIntent?.let {
      stopService(it)
    }
  }

  private fun stopTrackService() {
    trackIntent?.let {
      stopService(it)
    }
  }
}
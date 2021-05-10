package com.logic.sport.timer

import android.view.View
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.alibaba.android.arouter.launcher.ARouter
import com.logic.sport.utils.MessageEvent
import org.greenrobot.eventbus.EventBus

class TimerViewModel : ViewModel() {

  val speedNumber = MutableLiveData<String>()

  val timeCostNumber = MutableLiveData<String>()

  private val _caloriesConsumeNumberNumber = MutableLiveData<String>()
  val caloriesConsumeNumberNumber: LiveData<String> = _caloriesConsumeNumberNumber

  private val _kiloMeterNumber = MutableLiveData<String>()
  val kiloMeterNumber: LiveData<String> = _kiloMeterNumber

  private val _weather = MutableLiveData<String>()
  val weather: LiveData<String> = _weather

  private val _isPaused = MutableLiveData<Boolean>()
  val isPaused: LiveData<Boolean> = _isPaused

  /**
   * 继续按钮
   */
  fun resume() {
    _isPaused.value = false
    EventBus.getDefault().post(MessageEvent(MessageEvent.TYPE_RESUME_TRACK_SERVICE))
  }

  /**
   * 暂停按钮
   */
  fun pause() {
    _isPaused.value = true
    EventBus.getDefault().post(MessageEvent(MessageEvent.TYPE_PAUSE_TRACK_SERVICE))
  }

  /**
   * 停止按钮
   */
  fun stop(v: View) {
    (v.context as TimerActivity).finish()
  }

  fun openMap() {
    ARouter.getInstance().build("/sport/map").navigation()
  }

  fun lock() {
  }

}
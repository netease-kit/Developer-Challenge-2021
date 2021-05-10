package com.logic.sport.debug

import android.app.Application
import com.alibaba.android.arouter.launcher.ARouter
import com.logic.sport.BuildConfig

class DebugApp : Application() {

  override fun onCreate() {
    super.onCreate()
    if (BuildConfig.DEBUG) {
      ARouter.openLog()
      ARouter.openDebug()
    }
    ARouter.init(this)
  }

}
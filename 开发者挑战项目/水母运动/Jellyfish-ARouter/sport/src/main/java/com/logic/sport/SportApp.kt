package com.logic.sport

import android.app.Application
import com.alibaba.android.arouter.launcher.ARouter

object SportApp {

  fun onCreate(application: Application) {
    if (BuildConfig.DEBUG) {
      ARouter.openLog()
      ARouter.openDebug()
    }
    ARouter.init(application)
  }
}
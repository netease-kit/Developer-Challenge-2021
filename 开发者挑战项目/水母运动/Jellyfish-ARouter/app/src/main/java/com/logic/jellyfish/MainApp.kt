package com.logic.jellyfish

import android.app.Application
import com.alibaba.android.arouter.launcher.ARouter
import com.logic.chat.ChatApp
import com.logic.utils.Cache
import com.logic.web.WebApp
import me.jessyan.autosize.AutoSizeConfig

class MainApp : Application() {

  override fun onCreate() {
    super.onCreate()
    init()
  }

  private fun init() {
    app = this
    AutoSizeConfig.getInstance().isCustomFragment = true
    Cache.init(this)
    initARouter()
    initChildApp()
  }

  private fun initARouter() {
    if (BuildConfig.DEBUG) {
      ARouter.openDebug()
      ARouter.openLog()
    }
    ARouter.init(this)
  }

  private fun initChildApp() {
    WebApp.onCreate(this)
    ChatApp.onCreate(this)
  }

  companion object {
    lateinit var app: MainApp private set
  }

}

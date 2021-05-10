package com.logic.chat

import android.app.Application
import android.content.Context
import com.alibaba.android.arouter.launcher.ARouter
import com.logic.utils.Cache
import com.netease.nimlib.sdk.NIMClient
import com.netease.nimlib.sdk.util.NIMUtil

object ChatApp {

  fun onCreate(context: Context) {
    NIMClient.init(context, null, null)

    if (NIMUtil.isMainProcess(context)) {
      // 主缓存
      Cache.init(context as Application)
      if (BuildConfig.DEBUG) {
        ARouter.openDebug()
        ARouter.openLog()
      }
      ARouter.init(context)
    }
  }
}
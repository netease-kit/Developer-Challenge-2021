package com.logic.web

import android.content.Context
import com.tencent.smtt.sdk.QbSdk

object WebApp {

  fun onCreate(context: Context) {
    initX5Environment(context)
  }

  private fun initX5Environment(context: Context) {
    QbSdk.setDownloadWithoutWifi(true)
    QbSdk.initX5Environment(context, null)
  }
}
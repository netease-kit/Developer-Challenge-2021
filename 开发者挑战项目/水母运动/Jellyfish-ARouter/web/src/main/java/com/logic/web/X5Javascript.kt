package com.logic.web

import android.content.Context
import android.webkit.JavascriptInterface
import com.alibaba.android.arouter.launcher.ARouter

class X5Javascript(private val context: Context) {

  @JavascriptInterface
  fun navToSport() {
    ARouter.getInstance().build("/mine/my_sport").navigation()
  }

}
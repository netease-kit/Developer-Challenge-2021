package com.logic.mine

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.alibaba.android.arouter.launcher.ARouter
import kotlinx.android.synthetic.main.toolbar.*

/**
 * 只有单独测试的时候会以这个Activity为入口打开Fragment
 * 所有要在这里重新初始化ARouter
 * 正常整个App打包是不用初始化ARouter的
 */
class DebugActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    if (BuildConfig.DEBUG) {
      ARouter.openLog()
      ARouter.openDebug()
    }
    ARouter.init(application)
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_debug)

    setSupportActionBar(toolbar)
    toolbar.title = "我的"
  }
}

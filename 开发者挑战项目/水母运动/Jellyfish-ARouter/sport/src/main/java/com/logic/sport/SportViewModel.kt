package com.logic.sport

import androidx.lifecycle.ViewModel
import com.alibaba.android.arouter.launcher.ARouter

class SportViewModel : ViewModel() {

  fun navToReady() {
    ARouter.getInstance().build("/sport/ready").navigation()
  }
}

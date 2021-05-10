package com.logic.mine.settings

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.alibaba.android.arouter.launcher.ARouter

class SettingsViewModel : ViewModel() {

  val pushNotification = MutableLiveData<Boolean>()

  fun navToAboutUs() {
    ARouter.getInstance().build("/mine/settings/about_us").navigation()
  }

  fun navToFeedback() {
    ARouter.getInstance().build("/mine/settings/feedback").navigation()
  }

  fun navToChangePhoneNumber() {
    ARouter.getInstance().build("/mine/settings/change_phone").navigation()
  }
}
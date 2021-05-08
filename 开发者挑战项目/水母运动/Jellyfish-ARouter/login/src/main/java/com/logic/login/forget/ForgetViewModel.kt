package com.logic.login.forget

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.alibaba.android.arouter.launcher.ARouter

class ForgetViewModel : ViewModel() {

  val phoneNumber = MutableLiveData<String>()
  val password = MutableLiveData<String>()
  val verificationCode = MutableLiveData<String>()

  fun confirm() {
    ARouter.getInstance().build("/login/login").navigation()
  }
}

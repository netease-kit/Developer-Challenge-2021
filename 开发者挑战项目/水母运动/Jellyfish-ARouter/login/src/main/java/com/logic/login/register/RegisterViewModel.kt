package com.logic.login.register

import android.text.TextUtils
import android.view.View
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.alibaba.android.arouter.launcher.ARouter

class RegisterViewModel : ViewModel() {

  val phoneNumber = MutableLiveData<String>()
  val verificationCode = MutableLiveData<String>()
  val password = MutableLiveData<String>()
  val confirmPassword = MutableLiveData<String>()
  val agreement = MutableLiveData<Boolean>()

  fun register(v: View) {
    if (TextUtils.isEmpty(confirmPassword.value)) {
      return
    }
    if (TextUtils.isEmpty(verificationCode.value)) {
      return
    }
    if (TextUtils.isEmpty(password.value)) {
      return
    }
    if (TextUtils.isEmpty(confirmPassword.value)) {
      return
    }
    if (agreement.value == false) {
      return
    }
    ARouter.getInstance().build("/login/login").navigation()
  }

  fun navigateToAgreement() {

  }

  fun navigateToLogin() {
    ARouter.getInstance().build("/login/login").navigation()
  }
}
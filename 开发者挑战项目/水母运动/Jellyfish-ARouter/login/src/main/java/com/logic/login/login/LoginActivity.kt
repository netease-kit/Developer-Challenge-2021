package com.logic.login.login

import com.alibaba.android.arouter.facade.annotation.Route
import com.alibaba.android.arouter.launcher.ARouter
import com.logic.login.BuildConfig
import com.logic.login.R
import com.logic.login.databinding.ActivityLoginBinding
import com.logic.utils.BaseActivity
import com.logic.utils.Cache

@Route(path = "/login/login")
class LoginActivity : BaseActivity<LoginViewModel, ActivityLoginBinding>(
  R.layout.activity_login
) {

  override fun init() {
    if (BuildConfig.DEBUG) {
      ARouter.openLog()
      ARouter.openDebug()
      Cache.init(application)
    }
    ARouter.init(application)
    binding.viewmodel = viewModel
  }

  override fun onStart() {
    super.onStart()
//    viewModel.progress.value = false
  }

}

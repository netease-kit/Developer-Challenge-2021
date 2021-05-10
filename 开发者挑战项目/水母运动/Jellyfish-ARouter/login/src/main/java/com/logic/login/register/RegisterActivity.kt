package com.logic.login.register

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.login.R
import com.logic.login.databinding.ActivityRegisterBinding
import com.logic.utils.BaseActivity

@Route(path = "/login/register")
class RegisterActivity : BaseActivity<RegisterViewModel, ActivityRegisterBinding>(
  R.layout.activity_register
) {

  override fun init() {
    binding.viewmodel = viewModel
  }


}
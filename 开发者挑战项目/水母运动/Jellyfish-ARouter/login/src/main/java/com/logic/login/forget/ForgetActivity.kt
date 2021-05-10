package com.logic.login.forget

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.login.R
import com.logic.login.databinding.ActivityForgetBinding
import com.logic.utils.BaseActivity

@Route(path = "/login/forget")
class ForgetActivity : BaseActivity<ForgetViewModel, ActivityForgetBinding>(
  R.layout.activity_forget
) {

  override fun init() {
    binding.viewmodel = viewModel
  }

}

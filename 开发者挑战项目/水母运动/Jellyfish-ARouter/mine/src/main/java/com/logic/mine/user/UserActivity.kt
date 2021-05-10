package com.logic.mine.user

import com.logic.mine.R
import com.logic.mine.databinding.ActivityUserBinding
import com.logic.utils.BaseActivity

class UserActivity : BaseActivity<UserViewModel, ActivityUserBinding>(
  R.layout.activity_user
) {

  override fun init() {
    binding.viewmodel = viewModel
  }
}
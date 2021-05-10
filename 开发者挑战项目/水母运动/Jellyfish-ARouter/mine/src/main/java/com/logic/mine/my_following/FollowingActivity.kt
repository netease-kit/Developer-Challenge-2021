package com.logic.mine.my_following

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.mine.R
import com.logic.mine.databinding.ActivityFollowingBinding
import com.logic.utils.BaseActivity
import kotlinx.android.synthetic.main.toolbar.*

@Route(path = "/mine/my_following")
class FollowingActivity : BaseActivity<FollowingViewModel, ActivityFollowingBinding>(
  R.layout.activity_following
) {

  override fun init() {
    binding.viewmodel = viewModel
    setToolbar(toolbar, R.string.my_following)
  }

}
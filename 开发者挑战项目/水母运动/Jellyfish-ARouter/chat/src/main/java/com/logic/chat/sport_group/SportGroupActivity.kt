package com.logic.chat.sport_group

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.chat.R
import com.logic.chat.databinding.ActivitySportGroupBinding
import com.logic.utils.BaseActivity

@Route(path = "/chat/sport_group")
class SportGroupActivity : BaseActivity<SportGroupViewModel, ActivitySportGroupBinding>(
  R.layout.activity_sport_group
) {

  override fun init() {
    binding.viewmodel = viewModel
  }


}
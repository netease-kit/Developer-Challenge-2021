package com.logic.mine.my_event

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.mine.R
import com.logic.mine.databinding.ActivityEventBinding
import com.logic.utils.BaseActivity
import kotlinx.android.synthetic.main.toolbar.*

@Route(path = "/mine/my_event")
class EventActivity : BaseActivity<EventViewModel, ActivityEventBinding>(
  R.layout.activity_event
) {

  override fun init() {
    binding.viewmodel = viewModel
    setToolbar(toolbar, R.string.my_event)
  }

}
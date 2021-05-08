package com.logic.mine.settings.feedback

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.mine.R
import com.logic.mine.databinding.ActivityFeedbackBinding
import com.logic.utils.BaseActivity
import kotlinx.android.synthetic.main.toolbar.*

@Route(path = "/mine/settings/feedback")
class FeedbackActivity : BaseActivity<FeedbackViewModel, ActivityFeedbackBinding>(
  R.layout.activity_feedback
) {

  override fun init() {
    binding.viewmodel = viewModel
    setToolbar(toolbar, R.string.feedback)
  }
}
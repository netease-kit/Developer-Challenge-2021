package com.logic.mine.my_message.notification_message

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.mine.R
import com.logic.mine.databinding.ActivityNotificationMessageBinding
import com.logic.utils.BaseActivity
import kotlinx.android.synthetic.main.toolbar.*

@Route(path = "/mine/my_message/notification_message")
class NotificationMessageActivity : BaseActivity<NotificationMessageViewModel, ActivityNotificationMessageBinding>(
  R.layout.activity_notification_message
) {

  override fun init() {
    binding.viewmodel = viewModel
    setToolbar(toolbar, R.string.notification_msg)
  }
}
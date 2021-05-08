package com.logic.chat.contact

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.chat.R
import com.logic.chat.databinding.ActivityContactBinding
import com.logic.utils.BaseActivity

@Route(path = "/chat/contact")
class ContactActivity: BaseActivity<ContactViewModel, ActivityContactBinding>(
  R.layout.activity_contact
) {

  override fun init() {
    binding.viewmodel = viewModel
  }
}
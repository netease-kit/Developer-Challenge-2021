package com.logic.mine.settings

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.mine.R
import com.logic.mine.databinding.ActivitySettingsBinding
import com.logic.utils.BaseActivity
import kotlinx.android.synthetic.main.toolbar.*

@Route(path = "/mine/settings")
class SettingsActivity : BaseActivity<SettingsViewModel, ActivitySettingsBinding>(
  R.layout.activity_settings
) {

  override fun init() {
    binding.viewmodel = viewModel
    setToolbar(toolbar, R.string.setting)
  }
}
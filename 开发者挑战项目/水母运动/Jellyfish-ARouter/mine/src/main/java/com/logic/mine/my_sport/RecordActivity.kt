package com.logic.mine.my_sport

import com.alibaba.android.arouter.facade.annotation.Route
import com.logic.mine.R
import com.logic.mine.databinding.ActivityRecordBinding
import com.logic.utils.BaseActivity
import kotlinx.android.synthetic.main.toolbar.*

@Route(path = "/mine/my_sport")
class RecordActivity : BaseActivity<RecordViewModel, ActivityRecordBinding>(
  R.layout.activity_record
) {

  override fun init() {
    binding.viewmodel = viewModel
    setToolbar(toolbar, R.string.my_sport)
  }
}
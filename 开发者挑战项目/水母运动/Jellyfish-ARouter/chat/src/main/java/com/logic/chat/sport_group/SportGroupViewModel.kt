package com.logic.chat.sport_group

import android.view.View
import androidx.lifecycle.ViewModel
import com.logic.utils.ext.toast

class SportGroupViewModel: ViewModel() {

  fun clickButton(v: View) {
    v.toast("你好呀")
  }
}
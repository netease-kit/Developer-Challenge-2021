package com.logic.sport.utils

import android.view.View
import androidx.databinding.BindingAdapter

@BindingAdapter("visible")
fun View.show(show: Boolean) {
  if (show && this.visibility != View.VISIBLE) {
    AnimationUtils.showAndHiddenAnimation(
      this,
      AnimationUtils.AnimationState.STATE_SHOW,
      1000
    )
  }
  if (!show && this.visibility == View.VISIBLE) {
    AnimationUtils.showAndHiddenAnimation(
      this,
      AnimationUtils.AnimationState.STATE_HIDDEN,
      300
    )
  }
}
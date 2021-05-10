package com.logic.sport.utils

import android.view.View
import android.view.animation.AlphaAnimation
import android.view.animation.Animation
import android.view.animation.Animation.AnimationListener

/**
 * 动画工具
 */
object AnimationUtils {

  enum class AnimationState {
    STATE_SHOW,
    STATE_HIDDEN
  }

  /**
   * 渐隐渐现动画
   *
   * @param view     需要实现动画的对象
   * @param state    需要实现的状态
   * @param duration 动画实现的时长（ms）
   */
  fun showAndHiddenAnimation(view: View, state: AnimationState, duration: Long) {
    var start = 0f
    var end = 0f
    if (state == AnimationUtils.AnimationState.STATE_SHOW) {
      end = 1f
      view.visibility = View.VISIBLE
    } else if (state == AnimationUtils.AnimationState.STATE_HIDDEN) {
      start = 1f
      view.visibility = View.GONE
    }
    val animation = AlphaAnimation(start, end)
    animation.duration = duration
    animation.fillAfter = true
    animation.setAnimationListener(object : AnimationListener {
      override fun onAnimationStart(animation: Animation) {}

      override fun onAnimationRepeat(animation: Animation) {}

      override fun onAnimationEnd(animation: Animation) {
        view.clearAnimation()
      }
    })
    view.animation = animation
    animation.start()
  }

}
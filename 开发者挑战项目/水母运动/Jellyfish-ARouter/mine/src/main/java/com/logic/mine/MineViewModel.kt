package com.logic.mine

import androidx.lifecycle.ViewModel
import com.alibaba.android.arouter.launcher.ARouter

class MineViewModel : ViewModel() {

  fun navigateToRecord() {
    ARouter.getInstance().build("/mine/my_sport").navigation()
  }

  fun navigateToEvent() {
    ARouter.getInstance().build("/mine/my_event").navigation()
  }

  fun navigateToFollowing() {
    ARouter.getInstance().build("/mine/my_following").navigation()
  }

  fun navigateToMyMessage() {
    ARouter.getInstance().build("/mine/my_message").navigation()
  }

  fun navigateToSettings() {
    ARouter.getInstance().build("/mine/settings").navigation()
  }

}

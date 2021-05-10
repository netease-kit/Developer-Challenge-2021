package com.logic.chat

import com.logic.chat.databinding.FragmentChatBinding
import com.logic.utils.BaseFragment
import com.logic.utils.Cache
import com.logic.utils.ext.toast
import com.netease.nimlib.sdk.NIMClient
import com.netease.nimlib.sdk.RequestCallback
import com.netease.nimlib.sdk.auth.AuthService
import com.netease.nimlib.sdk.auth.LoginInfo

class ChatFragment : BaseFragment<ChatViewModel, FragmentChatBinding>(
  R.layout.fragment_chat
) {

  override fun init() {
    binding.viewmodel = viewModel
    login()
  }

  private fun login() {
    val loginInfo = LoginInfo("12345678911", "123456")
    NIMClient.getService(AuthService::class.java).login(loginInfo)
      .setCallback(object : RequestCallback<LoginInfo> {
        override fun onSuccess(param: LoginInfo?) {
          toast("账号${Cache.imAccount},密码${Cache.imPassword}, IM登陆成功")
        }

        override fun onFailed(code: Int) {
          toast("账号${Cache.imAccount},密码${Cache.imPassword}IM登陆失败")
        }

        override fun onException(exception: Throwable?) {
          toast("账号${Cache.imAccount},密码${Cache.imPassword}IM登陆异常")
        }

      })
  }
}
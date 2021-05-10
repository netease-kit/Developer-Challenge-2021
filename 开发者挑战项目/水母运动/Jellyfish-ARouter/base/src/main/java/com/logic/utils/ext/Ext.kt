package com.logic.utils.ext

import android.annotation.SuppressLint
import android.content.Context
import android.provider.Settings
import android.util.Log
import android.widget.Toast
import com.logic.utils.Cache

fun Context.toast(content: String) {
  Toast.makeText(this, content, Toast.LENGTH_LONG).show()
  log(content)
}

fun log(content: String) {
  Log.v("测试", "\n$content\n")
}

@SuppressLint("HardwareIds")
fun getAndroidId(): String {
  return Settings.Secure.getString(Cache.app.contentResolver, Settings.Secure.ANDROID_ID)
}
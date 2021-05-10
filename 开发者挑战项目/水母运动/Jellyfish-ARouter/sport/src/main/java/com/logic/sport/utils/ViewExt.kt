package com.logic.sport.utils

import android.content.Context
import android.content.Intent
import android.view.View
import android.widget.Toast
import com.logic.utils.Constants

fun View.toast(content: String) {
  Toast.makeText(this.context, content, Toast.LENGTH_LONG).show()
}

inline fun <reified T> View.startActivity() {
  this.context.startActivity(Intent(this.context, T::class.java))
}

inline fun <reified T> View.startService() {
  this.context.startService(Intent(this.context, T::class.java))
}

fun View.saveString(key: String, value: String) {
  val sharedPref = this.context.getSharedPreferences(Constants.PREF_NAME, Context.MODE_PRIVATE)
  val editor = sharedPref.edit()
  editor.putString(key, value)
  editor.apply()
}


fun View.saveLong(key: String, value: Long) {
  val sharedPref = this.context.getSharedPreferences(Constants.PREF_NAME, Context.MODE_PRIVATE)
  val editor = sharedPref.edit()
  editor.putLong(key, value)
  editor.apply()
}

fun View.getString(key: String): String? {
  val sharedPref = this.context.getSharedPreferences(Constants.PREF_NAME, Context.MODE_PRIVATE)
  return sharedPref.getString(key, null)
}

fun View.getLong(key: String): Long {
  val sharedPref = this.context.getSharedPreferences(Constants.PREF_NAME, Context.MODE_PRIVATE)
  return sharedPref.getLong(key, -1L)
}
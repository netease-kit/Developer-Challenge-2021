package com.logic.utils.ext

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProviders
import com.logic.utils.Constants.PREF_NAME

fun <T : ViewModel> AppCompatActivity.createViewModel(clazz: Class<T>): T {
  return ViewModelProviders.of(this).get(clazz)
}

inline fun <reified T : ViewModel> AppCompatActivity.createViewModel(): T {
  return ViewModelProviders.of(this).get(T::class.java)
}

fun Context.saveString(key: String, value: String) {
  val sharedPref = this.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
  val editor = sharedPref.edit()
  editor.putString(key, value)
  editor.apply()
}

fun Context.getString(key: String): String? {
  val sharedPref = this.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
  return sharedPref.getString(key, null)
}
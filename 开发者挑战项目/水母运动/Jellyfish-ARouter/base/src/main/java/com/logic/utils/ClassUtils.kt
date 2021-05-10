package com.logic.utils

import androidx.lifecycle.ViewModel
import java.lang.reflect.ParameterizedType

object ClassUtils {

  fun <T> getViewModel(obj: Any): Class<T> {
    val clazz = obj.javaClass
    val viewModelClass = getGenericClass<T>(clazz, ViewModel::class.java)
    return viewModelClass!!
  }

  private fun <T> getGenericClass(clazz: Class<*>, filterClass: Class<*>): Class<T>? {
    val type = clazz.genericSuperclass
    if (type == null || type !is ParameterizedType) return null
    val types = type.actualTypeArguments
    for (t in types) {
      val tClass = t as Class<T>
      if (filterClass.isAssignableFrom(tClass)) {
        return tClass
      }
    }
    return null
  }
}
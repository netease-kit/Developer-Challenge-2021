//package com.logic.sport.interceptor
//
//import android.Manifest
//import android.annotation.TargetApi
//import android.content.Context
//import android.content.pm.PackageManager
//import android.os.Build
//import com.alibaba.android.arouter.facade.Postcard
//import com.alibaba.android.arouter.facade.annotation.Interceptor
//import com.alibaba.android.arouter.facade.callback.InterceptorCallback
//import com.alibaba.android.arouter.facade.template.IInterceptor
//
//@Interceptor(priority = 1, name = "permission_interceptor")
//class PermissionInterceptor : IInterceptor {
//
//  private var context: Context? = null
//  private var needCheckBackLocation = false
//  private var isNeedCheck = true
//
//  override fun process(postcard: Postcard?, callback: InterceptorCallback?) {
//    try {
//      if (Build.VERSION.SDK_INT >= 23) {
//        if (isNeedCheck && context != null) {
//          checkPermissions(needPermissions)
//        }
//      }
//    } catch (e: Throwable) {
//      e.printStackTrace()
//    }
//  }
//
//  override fun init(context: Context?) {
//    this.context = context
//  }
//
//  @TargetApi(23)
//  private fun checkPermissions(permissions: Array<String>) {
//    try {
//      if (Build.VERSION.SDK_INT >= 23 && context!!.applicationInfo.targetSdkVersion >= 23) {
//        val needRequestPermissionList = findDeniedPermissions(permissions)
//        if (needRequestPermissionList != null && needRequestPermissionList.isNotEmpty()) {
//          try {
//            val array = needRequestPermissionList.toTypedArray()
//            val method = javaClass.getMethod(
//              "requestPermissions",
//              Array<String>::class.java, Int::class.javaPrimitiveType
//            )
//            method.invoke(this, array, 0)
//          } catch (e: Throwable) {
//            e.printStackTrace()
//          }
//        }
//      }
//
//    } catch (e: Throwable) {
//      e.printStackTrace()
//    }
//  }
//
//  @TargetApi(23)
//  private fun findDeniedPermissions(permissions: Array<String>): List<String>? {
//    try {
//      val needRequestPermissionList = ArrayList<String>()
//      if (Build.VERSION.SDK_INT >= 23 && context!!.applicationInfo.targetSdkVersion >= 23) {
//        for (perm in permissions) {
//          if (checkMySelfPermission(perm) != PackageManager.PERMISSION_GRANTED ||
//            shouldShowMyRequestPermissionRationale(perm)
//          ) {
//            if (!needCheckBackLocation && BACK_LOCATION_PERMISSION == perm) {
//              continue
//            }
//            needRequestPermissionList.add(perm)
//          }
//        }
//      }
//      return needRequestPermissionList
//    } catch (e: Throwable) {
//      e.printStackTrace()
//    }
//    return null
//  }
//
//  private fun shouldShowMyRequestPermissionRationale(perm: String): Boolean {
//    try {
//      val method =
//        javaClass.getMethod("shouldShowRequestPermissionRationale", String::class.java)
//      return method.invoke(this, perm) as Boolean
//    } catch (e: Throwable) {
//      e.printStackTrace()
//    }
//    return false
//  }
//
//  private fun checkMySelfPermission(perm: String): Int {
//    try {
//      val method = javaClass.getMethod("checkSelfPermission", String::class.java)
//      return method.invoke(this, perm) as Int
//    } catch (e: Throwable) {
//      e.printStackTrace()
//    }
//    return -1
//  }
//
//  private val needPermissions = arrayOf(
//    Manifest.permission.ACCESS_COARSE_LOCATION,
//    Manifest.permission.ACCESS_FINE_LOCATION,
//    Manifest.permission.WRITE_EXTERNAL_STORAGE,
//    Manifest.permission.READ_EXTERNAL_STORAGE,
//    Manifest.permission.READ_PHONE_STATE,
//    Manifest.permission.ACCESS_LOCATION_EXTRA_COMMANDS,
//    BACK_LOCATION_PERMISSION
//  )
//
//  companion object {
//    private const val BACK_LOCATION_PERMISSION = "android.permission.ACCESS_BACKGROUND_LOCATION"
//  }
//
//}
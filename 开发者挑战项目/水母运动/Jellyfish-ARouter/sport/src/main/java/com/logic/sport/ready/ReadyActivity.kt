package com.logic.sport.ready

import android.Manifest
import android.annotation.TargetApi
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.LocationManager
import android.os.Build
import android.provider.Settings
import androidx.appcompat.app.AlertDialog
import com.alibaba.android.arouter.facade.annotation.Route
import com.alibaba.android.arouter.launcher.ARouter
import com.logic.sport.R
import com.logic.sport.databinding.ActivityReadyBinding
import com.logic.sport.utils.EventObserver
import com.logic.utils.BaseActivity

@Route(path = "/sport/ready")
class ReadyActivity : BaseActivity<ReadyViewModel, ActivityReadyBinding>(
  R.layout.activity_ready
) {

  private var needCheckBackLocation = false
  private var isNeedCheck = true

  override fun init() {
    binding.viewmodel = viewModel

    viewModel.startEvent.observe(this, EventObserver {
      ARouter.getInstance().build("/sport/timer").navigation()
//      val needRequestPermissionList = findDeniedPermissions(needPermissions)
//      if (needRequestPermissionList != null && needRequestPermissionList.isNotEmpty()) {
//        try {
//          val array = needRequestPermissionList.toTypedArray()
//          val method = javaClass.getMethod(
//            "requestPermissions",
//            Array<String>::class.java, Int::class.javaPrimitiveType
//          )
//          method.invoke(this, array, 0)
//        } catch (e: Throwable) {
//          e.printStackTrace()
//        }
//      } else {
//        openGPSSetting()
//      }
    })
  }

  override fun onResume() {
    super.onResume()
    try {
      if (Build.VERSION.SDK_INT >= 23) {
        if (isNeedCheck) {
          checkPermissions(needPermissions)
        }
      }
    } catch (e: Throwable) {
      e.printStackTrace()
    }
  }

  @TargetApi(23)
  private fun checkPermissions(permissions: Array<String>) {
    try {
      if (Build.VERSION.SDK_INT >= 23 && applicationInfo.targetSdkVersion >= 23) {
        val needRequestPermissionList = findDeniedPermissions(permissions)
        if (needRequestPermissionList != null && needRequestPermissionList.isNotEmpty()) {
          try {
            val array = needRequestPermissionList.toTypedArray()
            val method = javaClass.getMethod(
              "requestPermissions",
              Array<String>::class.java, Int::class.javaPrimitiveType
            )
            method.invoke(this, array, 0)
          } catch (e: Throwable) {
            e.printStackTrace()
          }
        }
      }

    } catch (e: Throwable) {
      e.printStackTrace()
    }

  }

  @TargetApi(23)
  private fun findDeniedPermissions(permissions: Array<String>): List<String>? {
    try {
      val needRequestPermissionList = ArrayList<String>()
      if (Build.VERSION.SDK_INT >= 23 && applicationInfo.targetSdkVersion >= 23) {
        for (perm in permissions) {
          if (checkMySelfPermission(perm) != PackageManager.PERMISSION_GRANTED ||
            shouldShowMyRequestPermissionRationale(perm)
          ) {
            if (!needCheckBackLocation && BACK_LOCATION_PERMISSION == perm) {
              continue
            }
            needRequestPermissionList.add(perm)
          }
        }
      }
      return needRequestPermissionList
    } catch (e: Throwable) {
      e.printStackTrace()
    }
    return null
  }

  private fun shouldShowMyRequestPermissionRationale(perm: String): Boolean {
    try {
      val method =
        javaClass.getMethod("shouldShowRequestPermissionRationale", String::class.java)
      return method.invoke(this, perm) as Boolean
    } catch (e: Throwable) {
      e.printStackTrace()
    }
    return false
  }

  private fun checkMySelfPermission(perm: String): Int {
    try {
      val method = javaClass.getMethod("checkSelfPermission", String::class.java)
      return method.invoke(this, perm) as Int
    } catch (e: Throwable) {
      e.printStackTrace()
    }
    return -1
  }

  private fun openGPSSetting() {
    if (checkGpsIsOpen()) {
      ARouter.getInstance().build("/sport/timer").navigation()
    } else {
      AlertDialog.Builder(this).setTitle("open GPS")
        .setMessage("go to open")
        // 取消选项
        .setNegativeButton(
          "cancel"
        ) { dialogInterface, _ ->
          // 关闭dialog
          dialogInterface.dismiss()
        }
        // 确认选项
        .setPositiveButton(
          "setting"
        ) { _, _ ->
          //跳转到手机原生设置页面
          val intent = Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
          startActivityForResult(intent, 1)
        }
        .setCancelable(false)
        .show()
    }
  }

  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    if (requestCode == 1) {
      openGPSSetting()
    }
  }

  private fun checkGpsIsOpen(): Boolean {
    val locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
    return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)
  }

  private val needPermissions = arrayOf(
    Manifest.permission.ACCESS_COARSE_LOCATION,
    Manifest.permission.ACCESS_FINE_LOCATION,
    Manifest.permission.WRITE_EXTERNAL_STORAGE,
    Manifest.permission.READ_EXTERNAL_STORAGE,
    Manifest.permission.READ_PHONE_STATE,
    Manifest.permission.ACCESS_LOCATION_EXTRA_COMMANDS,
    BACK_LOCATION_PERMISSION
  )

  companion object {
    private const val BACK_LOCATION_PERMISSION = "android.permission.ACCESS_BACKGROUND_LOCATION"
  }
}
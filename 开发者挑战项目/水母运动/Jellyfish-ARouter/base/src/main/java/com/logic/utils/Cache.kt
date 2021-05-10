package com.logic.utils

import android.annotation.SuppressLint
import android.app.Application

/**
 * 全局的缓存,是一个单例类,用来存放一些不占控件,但是很重要的一些变量
 * 传入Application的Context保证Cache的生命周期与Application一致
 * 注意: 不要在这里存入过多数据,会影响性能
 */
@SuppressLint("StaticFieldLeak")
object Cache {

  lateinit var app: Application

  fun init(app: Application) {
    this.app = app
  }

  var serviceId: Long = 0

  var terminalId: Long = 0

  /**
   * 终端名称，该名称可以根据使用方业务而定，比如可以是用户名、用户手机号等唯一标识
   *
   * 通常应该使用该名称查询对应终端id，确定该终端是否存在，如果不存在则创建，然后就可以开启轨迹上报，将上报的轨迹关联
   * 到该终端
   */
  var terminalName: String = ""

  var trackId: Long = -1

  var isLocationSDK = false

  var imAccount: String? = ""
  var imPassword: String? = ""

}
package com.logic.jellyfish.data.entity.amap

data class AMapResponse<T>(
  val data: T?,
  val errcode: Int = 0,
  val errdetail: String = "",
  val errmsg: String = ""
)
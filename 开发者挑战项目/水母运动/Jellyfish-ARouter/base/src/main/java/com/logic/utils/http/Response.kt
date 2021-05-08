package com.logic.utils.http

data class Response<T>(
  val data: T?,
  val code: Int = 0,
  val msg: String = "",
  val success: Boolean = false
)
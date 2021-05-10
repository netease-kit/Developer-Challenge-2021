package com.logic.utils.http

import com.logic.utils.http.data.Login
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface JellyfishService {

  @FormUrlEncoded
  @POST("/app/login/auth")
  suspend fun auth(
    @Field("phone") phone: String?,
    @Field("password") password: String?
  ): Response<Login>


}
package com.logic.utils.http

import com.logic.jellyfish.data.entity.amap.AMapResponse
import com.logic.jellyfish.data.entity.amap.Service
import com.logic.jellyfish.data.entity.amap.Terminal
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST


interface AMapService {

  @FormUrlEncoded
  @POST("v1/track/service/add")
  suspend fun addService(
    @Field("key") key: String?,
    @Field("name") name: String?,
    @Field("desc") desc: String? = null
  ): AMapResponse<Service>

  @FormUrlEncoded
  @POST("v1/track/terminal/add")
  suspend fun addTerminal(
    @Field("key") key: String?,
    @Field("sid") sid: Long,
    @Field("name") name: String?,
    @Field("desc") desc: String? = null,
    @Field("props ") props: String? = null
  ): AMapResponse<Terminal>


}
package com.logic.utils.http

import android.content.Context
import android.net.ConnectivityManager
import com.logic.utils.BuildConfig
import okhttp3.Cache
import okhttp3.CacheControl
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.File
import java.util.concurrent.TimeUnit

/**
 * 这个RetrofitFactory是个单例
 * 然后通过这个单例工厂的静态方法创造出aMapService
 */
object RetrofitFactory {

  private const val A_MAP_URL = "https://tsapi.amap.com"
  private const val JELLYFISH_URL = "http://120.78.169.68:1479/jellyfish"

  val aMapService: AMapService by lazy { createAMapService() }

  val jellyfishService: JellyfishService by lazy { createJellyfishService() }

  private fun createAMapService(): AMapService {
    return createRetrofit(A_MAP_URL).create(AMapService::class.java)
  }

  private fun createJellyfishService(): JellyfishService {
    return createRetrofit(JELLYFISH_URL).create(JellyfishService::class.java)
  }

  private fun createRetrofit(url: String): Retrofit {
    return Retrofit.Builder()
      .client(initOkHttpClient())
      .baseUrl(url)
      .addConverterFactory(GsonConverterFactory.create())
      .build()
  }

  private fun initOkHttpClient(): OkHttpClient {
    // 缓存地址
    val cacheDir = File(com.logic.utils.Cache.app.cacheDir, "responses")
    // 500m 缓存
    val cache = Cache(cacheDir, 500 * 1024 * 1024)
    // Create an ssl socket factory radius8 our all-trusting manager
    val httpLoggingInterceptor = HttpLoggingInterceptor()
    return OkHttpClient.Builder()
      .addInterceptor(AddCacheInterceptor())
      .cache(cache)
      .addInterceptor(
        httpLoggingInterceptor.apply {
          httpLoggingInterceptor.level = if (BuildConfig.DEBUG)
            HttpLoggingInterceptor.Level.BODY
          else
            HttpLoggingInterceptor.Level.NONE
        }
      ).build()
  }

  private class AddCacheInterceptor : Interceptor {

    override fun intercept(chain: Interceptor.Chain): okhttp3.Response {

      val cacheControl = CacheControl.Builder()
        .maxAge(0, TimeUnit.SECONDS)
        .maxStale(365, TimeUnit.DAYS)
        .maxAge(0, TimeUnit.SECONDS)
        .maxStale(365, TimeUnit.DAYS)
        .build()

      var request = chain.request()
      if (!isNetworkConnected()) {
        request = request.newBuilder()
          .cacheControl(cacheControl)
          .build()
      }
      val originalResponse = chain.proceed(request)

      return if (isNetworkConnected()) {
        // read from cache
        val maxAge = 0
        originalResponse.newBuilder()
          .removeHeader("Pragma")
          .header("Cache-Control", "public ,max-age=$maxAge")
          .build()
      } else {
        // tolerate 4-weeks stale
        val maxStale = 60 * 60 * 24 * 28
        originalResponse.newBuilder()
          .removeHeader("Pragma")
          .header("Cache-Control", "public, only-if-cached, max-stale=$maxStale")
          .build()
      }
    }
  }

  private fun isNetworkConnected(): Boolean {
    return try {
      val cm =
        com.logic.utils.Cache.app.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
      val info = cm.activeNetworkInfo
      info != null && info.isConnected
    } catch (e: Exception) {
      e.printStackTrace()
      false
    }
  }
}
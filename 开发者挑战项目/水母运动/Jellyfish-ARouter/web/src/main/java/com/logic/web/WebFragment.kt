package com.logic.web

import android.annotation.SuppressLint
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.text.TextUtils
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.tencent.smtt.sdk.WebSettings
import com.tencent.smtt.sdk.WebView
import com.tencent.smtt.sdk.WebViewClient

abstract class WebFragment(
  private val layout: Int
) : Fragment() {

  protected lateinit var webView: WebView
  private var isFirstLoadFinished = false

  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
    return inflater.inflate(layout, container, false)
  }

  override fun onActivityCreated(savedInstanceState: Bundle?) {
    super.onActivityCreated(savedInstanceState)
    webView = setWebView()
    initWebView()
    init()
  }

  abstract fun setWebView(): WebView

  abstract fun init()

  @SuppressLint("SetJavaScriptEnabled")
  private fun initWebView() {
//        web_view.setBackgroundColor(Color.DKGRAY)
    val settings = webView.settings

    settings.apply {
      // 默认false
      loadWithOverviewMode = false

      // 保存表单数据, Deprecated in API level 26
      saveFormData = true

      // 是否应该支持使用其屏幕缩放控件和手势缩放, 默认true
      setSupportZoom(true)

      // 内置缩放机制, 默认false
      builtInZoomControls = true
      // 内置缩放机制时是否显示控件, 默认是true
      displayZoomControls = false

      // 启动应用缓存, 这个方法只有在设置了缓存路径后才有用, 默认false
      setAppCacheEnabled(true)
      // 设置缓存路径
      setAppCachePath(requireContext().cacheDir.absolutePath)

      // 设置缓存模式, 默认LOAD_DEFAULT
      cacheMode = WebSettings.LOAD_DEFAULT

      // 宽视口属性, 是否允许<meta>标签的viewport属性, 可任意比例缩放。
      useWideViewPort = true

      // 不缩放, 100%原始比例
      webView.setInitialScale(100)

      // 告诉WebView启用JavaScript执行。默认false。
      javaScriptEnabled = true

      //  页面加载好以后，再放开图片, 默认false
      blockNetworkImage = false

      // 使用localStorage则必须打开, 默认false
      domStorageEnabled = true

      // 排版适应屏幕, 默认NARROW_COLUMNS
      layoutAlgorithm = WebSettings.LayoutAlgorithm.NARROW_COLUMNS

      // WebView是否新窗口打开(加了后可能打不开网页)
      setSupportMultipleWindows(true)

      // webview从5.0开始默认不允许混合模式,https中不能加载http资源,需要设置开启。MIXED_CONTENT_ALWAYS_ALLOW
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        mixedContentMode = WebSettings.LOAD_NORMAL
      }
      /** 设置字体默认缩放大小(改变网页字体大小,setTextSize  api14被弃用)*/
      textZoom = 100
    }

    webView.webViewClient = X5WebViewClient()
    webView.addJavascriptInterface(X5Javascript(requireContext()), "Android")
  }

  inner class X5WebViewClient : WebViewClient() {

    override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
      if (TextUtils.isEmpty(url)) return false
      if (url.startsWith("http:") || url.startsWith("https:")) {
//                // 可能有提示下载Apk文件
//                if (url.contains(".apk")) {
//                    handleOtherwise(mActivity, url)
//                    return true
//                }
        return false
      }
      return true
    }

    override fun onPageFinished(webView: WebView, s: String) {
      super.onPageFinished(webView, s)
      if (!isFirstLoadFinished) {
        Handler().postDelayed({
          //                    splash.visibility = View.GONE
//                    web_view.visibility = View.VISIBLE
        }, 1000)
        isFirstLoadFinished = true
      }
    }
  }

  fun onKeyBack(): Boolean {
    if (webView.canGoBack()) {
      webView.goBack()
      return true
    }
    return false
  }

  override fun onDestroy() {
    super.onDestroy()
    webView.destroy()
  }

}
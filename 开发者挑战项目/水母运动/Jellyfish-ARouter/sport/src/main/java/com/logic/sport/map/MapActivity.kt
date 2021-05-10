package com.logic.sport.map

import android.graphics.BitmapFactory
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.alibaba.android.arouter.facade.annotation.Route
import com.amap.api.maps.AMap
import com.amap.api.maps.CameraUpdateFactory
import com.amap.api.maps.model.*
import com.amap.api.track.AMapTrackClient
import com.logic.sport.R
import kotlinx.android.synthetic.main.activity_map.*
import java.util.*

/**
 * 功能:
 *
 * 1. 实时显示自己的位置
 * 2. 画出跑步的轨迹
 * 3. 截屏分享
 */
@Route(path = "/sport/map")
class MapActivity : AppCompatActivity() {

  // 地图相关的配置和服务
  private lateinit var aMap: AMap
  private lateinit var aMapTrackClient: AMapTrackClient

  // 画轨迹相关的参数,这个貌似只是记录,用来存储到服务器或者上报
  private val polyLines = LinkedList<Polyline>()
  private val endMarkers = LinkedList<Marker>()

  private var graspStartMarker: Marker? = null
  private var graspEndMarker: Marker? = null
  private var graspRoleMarker: Marker? = null
  private var graspPolyline: Polyline? = null
  private var mGraspLatLngList: List<LatLng>? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_map)
    map_view.onCreate(savedInstanceState)

    initMap()
    //      paintTrack()
  }

  private fun initMap() {
    aMapTrackClient = AMapTrackClient(applicationContext)
    aMap = map_view.map

    // CustomMapStyleOptions,设置自定义地图
    CustomMapStyleOptions().apply {
      isEnable = true
      styleDataPath = "style.data"
      styleExtraPath = "style_extra.data"
      styleId = "10886f9729a3dd6f8dca19f010d5376c"
      aMap.setCustomMapStyle(this)
    }

    // MyLocationStyle,设置定位小蓝点相关的设置
    MyLocationStyle().apply {
      strokeColor(android.R.color.transparent)
      radiusFillColor(android.R.color.transparent)
      myLocationType(MyLocationStyle.LOCATION_TYPE_FOLLOW)
      interval(2000)
      aMap.myLocationStyle = this
      aMap.isMyLocationEnabled = true
    }

    // UiSettings,设置地图交互
    aMap.uiSettings.apply {
      // 默认定位按钮是否显示，非必需设置
      isMyLocationButtonEnabled = true
      // 是否可以倾斜
      isTiltGesturesEnabled = false
    }

    // 设置为true表示启动显示定位蓝点，false表示隐藏定位蓝点并不进行定位，默认是false。
    aMap.moveCamera(CameraUpdateFactory.zoomTo(18f))
  }

//  private fun paintTrack() {
//    val traceClient = LBSTraceClient(applicationContext)
//    lifecycleScope.launch {
//      val pathRecords = RoomFactory.repository.getPathRecords()
//      val traceLocations = Utils.parseTraceLocationList(pathRecords)
//      traceClient.queryProcessedTrace(1, traceLocations, LBSTraceClient.TYPE_AMAP, this@MapActivity)
//    }
//  }

//  override fun onRequestFailed(p0: Int, p1: String?) {
//    toast("轨迹纠偏失败")
//  }
//
//  override fun onTraceProcessing(p0: Int, p1: Int, list: MutableList<LatLng>) {
//  }
//
//  override fun onFinished(p0: Int, list: MutableList<LatLng>, p2: Int, p3: Int) {
//    toast("轨迹纠偏完成")
//    addGraspTrace(list)
//    mGraspLatLngList = list
//  }

  /**
   * 地图上添加纠偏后轨迹线路及起终点、轨迹动画小人
   *
   */
  private fun addGraspTrace(graspList: List<LatLng>?) {
    if (graspList == null || graspList.size < 2) {
      return
    }
    val startPoint = graspList[0]
    val endPoint = graspList[graspList.size - 1]

    graspPolyline = aMap.addPolyline(
      PolylineOptions()
        .setCustomTexture(BitmapDescriptorFactory.fromResource(R.drawable.grasp_trace_line))
        .width(40f).addAll(graspList)
    )

    graspStartMarker = aMap.addMarker(
      MarkerOptions().position(startPoint).icon(
        BitmapDescriptorFactory.fromResource(R.drawable.start)
      )
    )

    graspEndMarker = aMap.addMarker(
      MarkerOptions().position(endPoint).icon(
        BitmapDescriptorFactory.fromResource(R.drawable.end)
      )
    )

    graspRoleMarker = aMap.addMarker(
      MarkerOptions().position(startPoint).icon(
        BitmapDescriptorFactory.fromBitmap(
          BitmapFactory.decodeResource(
            resources, R.drawable.walk
          )
        )
      )
    )
  }


  //  private fun paintTrack() {
//    lifecycleScope.launch {
//      val latLngs = RoomFactory.repository.getOptimizedLatLngs()
//      if (latLngs.isNotEmpty()) {
//        val polyLine =
//          aMap.addPolyline(PolylineOptions().addAll(latLngs).color(Color.parseColor("#FFC125")))
//        polyLine?.isVisible = true
//        aMap.animateCamera(CameraUpdateFactory.newLatLngBounds(getBounds(latLngs), 30))
//      }
//    }
//  }
//
//  private fun getBounds(pointList: List<LatLng>): LatLngBounds {
//    val builder = LatLngBounds.builder()
//    for (i in pointList.indices) {
//      builder.include(pointList[i])
//    }
//    return builder.build()
//  }


  private fun clearTracksOnMap() {
    for (polyline in polyLines) {
      polyline.remove()
    }
    for (marker in endMarkers) {
      marker.remove()
    }
    endMarkers.clear()
    polyLines.clear()
  }

  override fun onResume() {
    super.onResume()
    map_view.onResume()
  }

  override fun onPause() {
    super.onPause()
    map_view.onPause()
  }

  override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    map_view.onSaveInstanceState(outState)
  }

  override fun onDestroy() {
    super.onDestroy()
    map_view.onDestroy()
  }
}

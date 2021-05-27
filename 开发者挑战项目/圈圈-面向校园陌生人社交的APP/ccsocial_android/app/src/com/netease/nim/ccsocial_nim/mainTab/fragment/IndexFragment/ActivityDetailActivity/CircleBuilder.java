package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.ActivityDetailActivity;

import android.graphics.Color;

import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.Circle;
import com.baidu.mapapi.map.CircleOptions;
import com.baidu.mapapi.map.Stroke;
import com.baidu.mapapi.model.LatLng;

public class CircleBuilder {

    public static final int STROKE_COLOR = Color.argb(180, 3, 145, 200);
    public static final int FILL_COLOR = Color.argb(10, 0, 0, 180);
    /**
     * 绘制圆
     * @return
     */
    public static Circle drawCircle(LatLng latLng, int radius, BaiduMap mBaiduMap) {
        CircleOptions options=new CircleOptions().center(latLng).radius(radius)
                .fillColor(0x666495ED) // 填充颜色
                .stroke(new Stroke(1, 0xE66495ED));
        return (Circle) mBaiduMap.addOverlay(options);
    }
    public static int getStrokeColor(int alpha) {

        return Color.argb(alpha, 3, 145, 200);

    }


    public static int getFillColor(int alpha) {

        return Color.argb(alpha, 0, 0, 180);

    }
}

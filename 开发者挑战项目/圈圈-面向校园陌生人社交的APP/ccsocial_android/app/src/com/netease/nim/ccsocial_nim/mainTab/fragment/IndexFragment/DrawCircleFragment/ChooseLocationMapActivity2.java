package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.DrawCircleFragment;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.model.LatLng;
import com.baidu.mapapi.search.geocode.GeoCodeResult;
import com.baidu.mapapi.search.geocode.GeoCoder;
import com.baidu.mapapi.search.geocode.OnGetGeoCoderResultListener;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeOption;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeResult;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.location.activity.LocationExtras;
import com.netease.nim.uikit.api.model.location.LocationProvider;
import com.netease.nim.uikit.api.wrapper.NimToolBarOptions;
import com.netease.nim.uikit.common.activity.ToolBarOptions;
import com.netease.nim.uikit.common.activity.UI;

public class ChooseLocationMapActivity2 extends UI implements OnClickListener {
    private static final String TAG = ChooseLocationMapActivity2.class.getSimpleName();

    public static final int DEFAULT_ZOOM = 17;
    //	private static final String TAG = "LocationAmapActivity";

    private TextView sendButton;

    private ImageView pinView;

    private View pinInfoPanel;

    private TextView pinInfoTextView;

    private double mLatitude; // 经度

    private double mLongitude; // 维度

    private String mAddressInfo; // 对应的地址信息

    private static LocationProvider.Callback callback;

    private boolean locating = true; // 正在定位的时候不用去查位置

    private MapView mapView;

    private BaiduMap mBaiduMap;

    private GeoCoder mCoder;

    private Button btnMyLocation;

    public static void start(Context context, LocationProvider.Callback callback) {
        ChooseLocationMapActivity2.callback = callback;
        context.startActivity(new Intent(context, ChooseLocationMapActivity2.class));
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.choose_location_map_view_layout2);
        mapView = findViewById(R.id.autonavi_mapView);
        ToolBarOptions options = new NimToolBarOptions();
        setToolBar(R.id.toolbar, options);
        initView();
        initAmap();
        initLocation();
        updateSendStatus();
    }

    private void initView() {
        sendButton = findView(R.id.action_bar_right_clickable_textview);
        sendButton.setText(R.string.choose);
        sendButton.setOnClickListener(this);
        sendButton.setVisibility(View.INVISIBLE);
        pinView = findViewById(R.id.location_pin);
        pinInfoPanel = findViewById(R.id.location_info);
        pinInfoTextView = pinInfoPanel.findViewById(R.id.marker_address);
        pinView.setOnClickListener(this);
        pinInfoPanel.setOnClickListener(this);
        btnMyLocation = findViewById(R.id.my_location);
        btnMyLocation.setOnClickListener(this);
        btnMyLocation.setVisibility(View.GONE);
    }

    private void initAmap() {
        mBaiduMap = mapView.getMap();
        mBaiduMap.setMyLocationEnabled(true);

        mBaiduMap.setOnMapStatusChangeListener(new BaiduMap.OnMapStatusChangeListener() {

            @Override
            public void onMapStatusChangeStart(MapStatus mapStatus) {

            }

            @Override
            public void onMapStatusChangeStart(MapStatus mapStatus, int i) {

            }

            //地图状态改变结束
            public void onMapStatusChangeFinish(MapStatus status) {
                //改变结束之后，获取地图可视范围的中心点坐标
                Log.e("neoduan", status.toString());
//                LatLng latLng = status.target;
                //拿到经纬度之后，就可以反地理编码获取地址信息了
                if (mLongitude > 0) {
                    initGeoCoder(status.target);
                }
            }

            //地图状态变化中
            public void onMapStatusChange(MapStatus status) {
            }
        });
    }

    private void initLocation() {
        updateSendStatus();
        LocationHelper.getInstance().starLocation(new LocationHelper.LocationListener() {
            @Override
            public void onLocation(String address, double latitude, double longitude) {
                if (!TextUtils.isEmpty(address)) {
                    mAddressInfo = address;
                    mLatitude = latitude;
                    mLongitude = longitude;

                    LatLng latLng = new LatLng(latitude, longitude);

                    //定位到指定点
                    MapStatus.Builder builder = new MapStatus.Builder();
                    MapStatus mapStatus = builder.target(latLng).zoom(18.0f).build();
                    mBaiduMap.setMapStatus(MapStatusUpdateFactory.newMapStatus(mapStatus));

                    pinInfoPanel.setVisibility(View.VISIBLE);

                    initGeoCoder(latLng);
                    LocationHelper.getInstance().stopLocation();
                }
            }
        });
    }

    private void initGeoCoder(LatLng latLng) {
        if (mCoder == null) {
            mCoder = GeoCoder.newInstance();
        }
        mCoder.setOnGetGeoCodeResultListener(geoCoderResultListener);
        mCoder.reverseGeoCode(new ReverseGeoCodeOption()
                .location(latLng)
                // 设置是否返回新数据 默认值0不返回，1返回
                .newVersion(1)
                // POI召回半径，允许设置区间为0-1000米，超过1000米按1000米召回。默认值为1000
                .radius(1000));
    }

    final OnGetGeoCoderResultListener geoCoderResultListener = new OnGetGeoCoderResultListener() {

        @Override
        public void onGetGeoCodeResult(GeoCodeResult geoCodeResult) {

        }

        @Override
        public void onGetReverseGeoCodeResult(ReverseGeoCodeResult result) {
            Log.d(TAG, "address = " + result.getAddressDetail().toString());
            mAddressInfo = result.getAddress() + result.getSematicDescription();
            mLatitude=result.getLocation().latitude;
            mLongitude=result.getLocation().longitude;
            pinInfoTextView.setText(mAddressInfo);
            updateSendStatus();
        }
    };

    private void updateSendStatus() {
        if (isFinishing()) {
            return;
        }
        int titleResID = R.string.location_map;
        if (TextUtils.isEmpty(mAddressInfo)) {
            titleResID = R.string.location_loading;
            sendButton.setVisibility(View.GONE);
        } else {
            sendButton.setVisibility(View.VISIBLE);
        }
        if (TextUtils.isEmpty(mAddressInfo)) {
            setTitle(titleResID);
        } else {
            setTitle(R.string.my_location);
            setTitle(mAddressInfo);
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        mapView.onSaveInstanceState(outState);
    }

    @Override
    protected void onPause() {
        super.onPause();
        mapView.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mapView.onResume();
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();
        callback = null;
    }

    private String getStaticMapUrl() {
        StringBuilder urlBuilder = new StringBuilder(LocationExtras.STATIC_MAP_URL_1);
        urlBuilder.append(mLatitude);
        urlBuilder.append(",");
        urlBuilder.append(mLongitude);
        urlBuilder.append(LocationExtras.STATIC_MAP_URL_2);
        return urlBuilder.toString();
    }

    private void chooseLocation() {
        Intent intent = new Intent(this, DrawActivityActivity.class);
        intent.putExtra(LocationExtras.LATITUDE, mLatitude);
        intent.putExtra(LocationExtras.LONGITUDE, mLongitude);
        mAddressInfo = TextUtils.isEmpty(mAddressInfo) ? getString(R.string.location_address_unkown) : mAddressInfo;
        intent.putExtra(LocationExtras.ADDRESS, mAddressInfo);
//        intent.putExtra(LocationExtras.ZOOM_LEVEL, amap.getCameraPosition().zoom);
        intent.putExtra(LocationExtras.IMG_URL, getStaticMapUrl());
//        startActivity(intent);
//        finish();
        if (callback != null) {
            callback.onSuccess(mLongitude, mLatitude, mAddressInfo);
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.action_bar_right_clickable_textview:
                chooseLocation();
                finish();
                break;
            case R.id.location_pin:
                setPinInfoPanel(!isPinInfoPanelShow());
                break;
            case R.id.location_info:
                pinInfoPanel.setVisibility(View.GONE);
                break;
            case R.id.my_location:
                break;
        }
    }

    private boolean isPinInfoPanelShow() {
        return pinInfoPanel.getVisibility() == View.VISIBLE;
    }

    private void setPinInfoPanel(boolean show) {
        if (show && !TextUtils.isEmpty(mAddressInfo)) {
            pinInfoPanel.setVisibility(View.VISIBLE);
            pinInfoTextView.setText(mAddressInfo);
        } else {
            pinInfoPanel.setVisibility(View.GONE);
        }
        updateSendStatus();
    }
}

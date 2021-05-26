package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.ActivityDetailActivity;

import android.animation.ValueAnimator;
import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Paint;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.RequiresApi;

import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.BitmapDescriptor;
import com.baidu.mapapi.map.BitmapDescriptorFactory;
import com.baidu.mapapi.map.Circle;
import com.baidu.mapapi.map.CircleOptions;
import com.baidu.mapapi.map.InfoWindow;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdate;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.MarkerOptions;
import com.baidu.mapapi.map.MyLocationConfiguration;
import com.baidu.mapapi.map.OverlayOptions;
import com.baidu.mapapi.map.Stroke;
import com.baidu.mapapi.model.LatLng;
import com.baidu.mapapi.model.LatLngBounds;
import com.baidu.mapapi.search.geocode.GeoCodeResult;
import com.baidu.mapapi.search.geocode.GeoCoder;
import com.baidu.mapapi.search.geocode.OnGetGeoCoderResultListener;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeOption;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeResult;
import com.baidu.mapapi.utils.CoordinateConverter;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.location.activity.LocationExtras;
import com.netease.nim.ccsocial_nim.location.helper.NimGeocoder;
import com.netease.nim.ccsocial_nim.location.helper.NimLocationManager;
import com.netease.nim.ccsocial_nim.location.helper.NimLocationManager.NimLocationListener;
import com.netease.nim.ccsocial_nim.location.model.NimLocation;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.DrawCircleFragment.ChooseLocationMapActivity2;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.DrawCircleFragment.DrawActivityActivity;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.DrawCircleFragment.LocationHelper;
import com.netease.nim.uikit.api.model.location.LocationProvider;
import com.netease.nim.uikit.api.wrapper.NimToolBarOptions;
import com.netease.nim.uikit.common.activity.ToolBarOptions;
import com.netease.nim.uikit.common.activity.UI;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.ImageAsyncTask;

import java.util.ArrayList;
import java.util.List;

import static com.baidu.mapapi.utils.CoordinateConverter.CoordType.BD09LL;
import static com.baidu.mapapi.utils.CoordinateConverter.CoordType.COMMON;

public class ShowLocationMapActivity extends UI implements OnClickListener {

    private static final String TAG = ChooseLocationMapActivity2.class.getSimpleName();

    public static final int DEFAULT_ZOOM = 17;
    //	private static final String TAG = "LocationAmapActivity";

    private TextView sendButton;

    private ImageView pinView;

    private View pinInfoPanel;

    private TextView pinInfoTextView;

    private NimLocationManager locationManager = null;

    private double mlatitude; // 经度

    private double mlongitude; // 维度

    private String maddressInfo; // 对应的地址信息

    private static LocationProvider.Callback callback;

    private double cacheLatitude = -1;

    private double cacheLongitude = -1;

    private String cacheAddressInfo;

    private boolean isFirstLocate=true;

    private LatLng firstLatLng;

    private boolean locating = true; // 正在定位的时候不用去查位置

    private NimGeocoder geocoder;

    private BaiduMap mBaiduMap;

    private MapView mapView;

    private GeoCoder mCoder;

    private Button btnMyLocation;

    private int radius=10;

    private ValueAnimator valueAnimator;//动画工具

    private List<Circle> circleList;

    public static void start(Context context, LocationProvider.Callback callback) {
        ShowLocationMapActivity.callback = callback;
        context.startActivity(new Intent(context, ShowLocationMapActivity.class));
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.choose_location_map_view_layout);
        mapView = findViewById(R.id.autonavi_mapView);
        ToolBarOptions options = new NimToolBarOptions();
        setToolBar(R.id.toolbar, options);
        initView();
        initBmap();
        initLocation();
        updateSendStatus();
    }

    private void initView() {
        sendButton = findView(R.id.action_bar_right_clickable_textview);
        sendButton.setVisibility(View.GONE);
        pinView = findViewById(R.id.location_pin);
        pinInfoPanel = findViewById(R.id.location_info);
        pinInfoTextView = pinInfoPanel.findViewById(R.id.marker_address);
        pinView.setOnClickListener(this);
        pinInfoPanel.setOnClickListener(this);
        btnMyLocation = findViewById(R.id.my_location);
        btnMyLocation.setOnClickListener(this);
        btnMyLocation.setVisibility(View.GONE);
    }

    private void initBmap() {
        if(Constants.SP_USER_DATA.has("userAvatar")){
            //设置传递进去的参数，是doInBackground获取的
            ImageAsyncTask myAsyncTask=new ImageAsyncTask(pinView);
            myAsyncTask.execute(Constants.SP_USER_DATA.get("userAvatar").getAsString());
        }else{
            pinView.setImageDrawable(getResources().getDrawable(R.drawable.icon_default_boy));
        }
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
                if (mlongitude > 0) {
//                    initGeoCoder(status.target);
                }
            }

            //地图状态变化中
            public void onMapStatusChange(MapStatus status) {

            }
        });
    }

    private void initLocation() {
        updateSendStatus();
        Intent intent = getIntent();
        double Latitude=intent.getDoubleExtra(LocationExtras.LATITUDE,39.90923);
        double Longitude=intent.getDoubleExtra(LocationExtras.LONGITUDE,116.397428);
        TextView textView=new TextView(getApplicationContext());
        ViewGroup.LayoutParams layoutParams=new ViewGroup.LayoutParams(50,80);
        textView.setLayoutParams(layoutParams);
        textView.setBackgroundResource(R.drawable.marker_info_bg);
        textView.setText("活动地点");
        textView.setTextColor(Color.WHITE);
        textView.setTextSize(12);
        textView.setPadding(32,8,32,8);
        BitmapDescriptor bitmap = BitmapDescriptorFactory
                .fromResource(R.drawable.icon_activity);
//        CoordinateConverter converter  = new CoordinateConverter()
//                .from(BD09LL)
//                .coord(new LatLng(Latitude,Longitude));
        addWaveAnimation(new LatLng(Latitude,Longitude),mBaiduMap);
        InfoWindow infoWindow=new InfoWindow(textView,new LatLng(Latitude,Longitude),-160);
        OverlayOptions option = new MarkerOptions().position(new LatLng(Latitude,Longitude)).icon(bitmap);
        mBaiduMap.addOverlay(option);
        mBaiduMap.showInfoWindow(infoWindow);
        MyLocationConfiguration.LocationMode mode= MyLocationConfiguration.LocationMode.FOLLOWING;
        MyLocationConfiguration myLocationConfiguration=new MyLocationConfiguration(mode,true,null,0,0);
        mBaiduMap.setMyLocationConfiguration(myLocationConfiguration);
        mBaiduMap.setMyLocationEnabled(true);
        LocationHelper.getInstance().starLocation(new LocationHelper.LocationListener() {
            @Override
            public void onLocation(String address, double latitude, double longitude) {
                if (!TextUtils.isEmpty(address)) {
                    maddressInfo = address;
                    mlatitude = latitude;
                    mlongitude = longitude;

                    LatLng latLng = new LatLng(mlatitude, mlongitude);

                    cacheLatitude=latitude;
                    cacheLongitude=longitude;
                    cacheAddressInfo=address;
                    //定位到指定点
                    MapStatus.Builder builder = new MapStatus.Builder();
                    MapStatus mapStatus = builder.target(latLng).zoom(18.0f).build();
                    mBaiduMap.setMapStatus(MapStatusUpdateFactory.newMapStatus(mapStatus));

                    pinInfoPanel.setVisibility(View.VISIBLE);

                    pinInfoTextView.setText("我的位置");
                    setTitle(R.string.my_location);
//                    initGeoCoder(latLng);
                }
            }
        });
    }

    private void initGeoCoder(com.baidu.mapapi.model.LatLng latLng) {
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
            maddressInfo = result.getAddress() + result.getSematicDescription();
            if (!maddressInfo.equals(cacheAddressInfo)){
                isFirstLocate=true;
            }
//            if (result.getLocation().latitude!=cacheLatitude){
//                pinInfoTextView.setText(maddressInfo);
//            }
            updateSendStatus();
        }
    };

    private void updateSendStatus() {
        if (isFinishing()) {
            return;
        }
        int titleResID = R.string.location_map;
        if (TextUtils.isEmpty(maddressInfo)) {
            titleResID = R.string.location_loading;
        }
        if (btnMyLocation.getVisibility() == View.VISIBLE || Math.abs(-1 - cacheLatitude) < 0.1f) {
            btnMyLocation.setVisibility(View.VISIBLE);
            setTitle(titleResID);
        } else {
            setTitle(R.string.my_location);
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
        removeCircleWave();
        mapView.onDestroy();
        callback = null;
    }

    private String getStaticMapUrl() {
        StringBuilder urlBuilder = new StringBuilder(LocationExtras.STATIC_MAP_URL_1);
        urlBuilder.append(mlatitude);
        urlBuilder.append(",");
        urlBuilder.append(mlongitude);
        urlBuilder.append(LocationExtras.STATIC_MAP_URL_2);
        return urlBuilder.toString();
    }
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.location_pin:
                setPinInfoPanel(!isPinInfoPanelShow());
                break;
            case R.id.location_info:
                pinInfoPanel.setVisibility(View.GONE);
                break;
            case R.id.my_location:
                locationAddressInfo(cacheLatitude, cacheLongitude, cacheAddressInfo);
                break;
        }
    }

    private void locationAddressInfo(double lat, double lng, String address) {
        if(isFirstLocate){
            firstLatLng  = new LatLng(lat, lng);
            MapStatusUpdate update = MapStatusUpdateFactory.newLatLng(firstLatLng);
            mBaiduMap.animateMapStatus(update);
            update = MapStatusUpdateFactory.zoomTo(24.0f);
            mBaiduMap.animateMapStatus(update);
            isFirstLocate = false;
        }
    }

    private boolean isPinInfoPanelShow() {
        return pinInfoPanel.getVisibility() == View.VISIBLE;
    }

    private void setPinInfoPanel(boolean show) {
        if (show && !TextUtils.isEmpty(maddressInfo)) {
            pinInfoPanel.setVisibility(View.VISIBLE);
//            pinInfoTextView.setText(maddressInfo);
        } else {
            pinInfoPanel.setVisibility(View.GONE);
        }
        updateSendStatus();
    }

    public void addWaveAnimation(LatLng latLng,BaiduMap mBaiduMap) {
        circleList=new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            radius = radius + 10 * i;
            circleList.add(CircleBuilder.drawCircle(latLng, radius,mBaiduMap));
        }
        valueAnimator = AnimatorUtil.getValueAnimator(0, 20, new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                int value = (int) animation.getAnimatedValue();
                for (int i = 0; i < circleList.size(); i++) {
                    int nowRadius = 10 + 10 * i;
                    Circle circle = circleList.get(i);
                    int radius1 = value + nowRadius;
                    circle.setRadius(radius1);
                }
            }
        });
    }

    /**
     * 移除水波纹动画
     */
    public void removeCircleWave() {
        if (null != valueAnimator) {
            valueAnimator.cancel();
        }
        circleList.clear();
    }
}

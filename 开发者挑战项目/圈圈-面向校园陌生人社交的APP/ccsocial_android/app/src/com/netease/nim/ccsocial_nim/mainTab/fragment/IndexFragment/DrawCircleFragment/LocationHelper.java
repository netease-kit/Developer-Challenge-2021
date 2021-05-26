package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.DrawCircleFragment;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.Toast;

import com.baidu.geofence.GeoFence;
import com.baidu.geofence.GeoFenceClient;
import com.baidu.geofence.GeoFenceListener;
import com.baidu.geofence.model.DPoint;
import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.mapapi.map.MyLocationConfiguration;
import com.baidu.mapapi.model.LatLng;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.netease.nim.ccsocial_nim.NimApplication;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.RequestCallback;
import com.netease.nimlib.sdk.msg.MessageBuilder;
import com.netease.nimlib.sdk.msg.MsgService;
import com.netease.nimlib.sdk.msg.constant.SessionTypeEnum;
import com.netease.nimlib.sdk.msg.model.IMMessage;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ResponseData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class LocationHelper {
    private static volatile LocationHelper mHelper;
    private LocationClient locationClient;

    private double latitude;
    private double longitude;
    private String mAddress;
    private String city;
    private String cityCode;
    private boolean isLocation = false;
    private LocationListener locationListener;

    private static final String GEOFENCE_BROADCAST_ACTION = "com.netease.nim.ccsocial_nim";
    private GeoFenceClient mGeoFenceClient;
    private List<GeoFence> geoFences=new ArrayList<>();

    private Gson gson = new Gson();
    private MediaPlayer mediaPlayer;

    private int PAGE_SIZE=10;
    private int PAGE_NUM=1;

    private Map<String,String> Map_tid=new HashMap<>();
    private String activity_tid;

    private LocationHelper() {
        locationClient = new LocationClient(NimApplication.mContext);
        locationClient.registerLocationListener(new BDLocationListener() {

            @Override
            public void onReceiveLocation(BDLocation arg0) {
                String address = arg0.getAddrStr();
                if (!TextUtils.isEmpty(address)) {
                    latitude = arg0.getLatitude();
                    longitude = arg0.getLongitude();
                    mAddress = address;
                    city = arg0.getCity();
                    cityCode = arg0.getCityCode();
                    isLocation = true;
                }
                if (locationListener != null) {
                    locationListener.onLocation(mAddress, latitude, longitude);
                }
            }
        });
        LocationClientOption option = new LocationClientOption();
        // option.setCoorType("gcj02");// 返回的定位结果是百度经纬度,默认值gcj02
        option.setCoorType("BD09LL");
        option.setIsNeedAddress(true);// 位置，一定要设置，否则后面得不到地址
        option.setOpenGps(true);// 打开GPS
        option.setScanSpan(LocationClientOption.MIN_SCAN_SPAN * 3);// 多长时间进行一次请求
        option.setLocationMode(LocationClientOption.LocationMode.Hight_Accuracy);// 高精度
        locationClient.setLocOption(option);// 使用设置
    }

    public static LocationHelper getInstance() {
        if (mHelper == null) {
            mHelper = new LocationHelper();
        }
        return mHelper;
    }

    public String getCity() {
        return city;
    }

    public String getCityCode() {
        return cityCode;
    }

    public synchronized void starLocation(LocationListener listener) {
        if (locationClient != null) {
            this.locationListener = listener;
            locationClient.start();
        }
    }

    public synchronized void stopLocation() {
        if (locationClient != null) {
            locationClient.stop();
            this.locationListener = null;
        }
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getAddress() {
        return mAddress;
    }

    public boolean isLocation() {
        return isLocation;
    }

    public interface LocationListener {
        void onLocation(String address, double latitude, double longitude);
//        void onLocationShow(String address, double latitude, double longitude,)
    }

    /**
     * 获得活动信息，创建围栏
     */
    @SuppressLint("CheckResult")
    public void initMyGeoFence() {
        String labels = "";
        String startTime = "";
        String endTime = "";
        String status = "started";
        RetrofitManager.create(ApiService.class).getUserActivityByCondition(Constants.SP_USER_DATA.get("userCcid").getAsString(),labels,startTime,endTime,status,PAGE_NUM,PAGE_SIZE)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res.getCode());
                        System.out.println(res.getData());
                        System.out.println(res.getMsg());
                        JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                        if (jsonObject.getAsJsonArray("activityList") != null){
                            JsonArray activityArray =  jsonObject.getAsJsonArray("activityList");
                            for (int i = 0; i < activityArray.size(); i++) {
                                JsonObject item = activityArray.get(i).getAsJsonObject();
                                getState(item.get("activityId").getAsInt(),item);
                            }
                        }else{
                            IToastUtils.iToast("暂未加入活动或活动未开始", Toast.LENGTH_SHORT);
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) {
                        System.out.println(throwable);
                        IToastUtils.iToast(R.string.text_network_fail, Toast.LENGTH_SHORT);
                    }
                });
    }

    /**
     * 判断是否已进入过圈内
     * @param activityId
     * @param itemActivity
     */
    @SuppressLint("CheckResult")
    private void getState(Integer activityId, JsonObject itemActivity) {
        System.out.println("到这"+itemActivity);
        RetrofitManager.create(ApiService.class).getActivityByActivityId(activityId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res.getCode());
                        System.out.println(res.getData());
                        System.out.println(res.getMsg());
                        JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                        if (jsonObject.getAsJsonArray("activityMemberList") != null){
                            JsonArray activityArray =  jsonObject.get("activityMemberList").getAsJsonArray();
                            for (int i = 0; i < activityArray.size(); i++) {
                                JsonObject item = activityArray.get(i).getAsJsonObject();
                                JsonObject user= item.get("user").getAsJsonObject();
                                if (user.get("userCcid").getAsString().equals(Constants.SP_USER_DATA.get("userCcid").getAsString())&&item.get("state").getAsInt()==0){
                                    if (itemActivity.get("activityStatus").getAsString().equals("进行中")){
                                        activity_tid=itemActivity.get("activityTid").getAsString();
                                        createFence(new LatLng(itemActivity.get("activityLat").getAsDouble(),itemActivity.get("activityLong").getAsDouble()),String.valueOf(itemActivity.get("activityId").getAsInt()));
                                    }
                                }
                            }
                        }else{
                            IToastUtils.iToast("暂未加入活动或活动未开始", Toast.LENGTH_SHORT);
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) {
                        System.out.println("失败"+throwable);
                        IToastUtils.iToast("用户状态请求失败", Toast.LENGTH_SHORT);
                    }
                });
    }

    /**
     * 初始化地理围栏
     * @param context
     */
    public void initFenceClient(Context context) {
        mGeoFenceClient = new GeoFenceClient(context);
        mGeoFenceClient.setActivateAction(GeoFenceClient.GEOFENCE_IN);
        IntentFilter filter = new IntentFilter();         //注册
        filter.addAction(GEOFENCE_BROADCAST_ACTION);
        context.registerReceiver(mGeoFenceReceiver, filter);
        mGeoFenceClient.createPendingIntent(GEOFENCE_BROADCAST_ACTION);
        mediaPlayer = MediaPlayer.create(context, R.raw.ding);
    }

    /**
     * 添加地理围栏
     * @param location
     * @param id
     */
    public void createFence(LatLng location, String id) {
        DPoint dPoint=new DPoint(location.latitude,location.longitude);
        mGeoFenceClient.addGeoFence(dPoint, GeoFenceClient.BD09LL,100,id);
        Map_tid.put(id, activity_tid);
        mGeoFenceClient.setGeoFenceListener(geoFenceListener);
    }

    public BroadcastReceiver mGeoFenceReceiver = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {
            Bundle bundle = intent.getExtras();
            String customId = bundle.getString(GeoFence.BUNDLE_KEY_CUSTOMID);
            String fenceId = bundle.getString(GeoFence.BUNDLE_KEY_FENCEID);
            GeoFence geoFence = bundle.getParcelable(GeoFence.BUNDLE_KEY_FENCE);
            int status = bundle.getInt(GeoFence.BUNDLE_KEY_FENCESTATUS);
            switch (status) {
//                case GeoFence.INIT_STATUS_IN:
//                    IToastUtils.iToast(customId+"围栏初始状态:在围栏内", Toast.LENGTH_SHORT);
//                    break;
//                case GeoFence.INIT_STATUS_OUT:
//                    IToastUtils.iToast(customId+"围栏初始状态:在围栏外", Toast.LENGTH_SHORT);
//                    break;
                case GeoFence.STATUS_LOCFAIL:
                    IToastUtils.iToast("定位失败,无法判定目标当前位置和围栏之间的状态", Toast.LENGTH_SHORT);
                    break;
                case GeoFence.STATUS_OUT:
                    IToastUtils.iToast("离开活动范围"+customId, Toast.LENGTH_SHORT);
                    break;
                case GeoFence.STATUS_IN:
                    IToastUtils.iToast("进入活动范围"+customId, Toast.LENGTH_SHORT);
                    updateMyState(customId, Constants.SP_USER_DATA.get("userCcid").getAsString());
                    sendMessage(customId);
                    mediaPlayer.start();
//                    sendNotice(context);
                    break;
                default:
                    break;
            }
        }
    };

    /**
     * 更新用户进圈状态
     * @param customId
     * @param userCcid
     */
    @SuppressLint("CheckResult")
    private void updateMyState(String customId, String userCcid) {
        RetrofitManager.create(ApiService.class).updateUserLoacteState(userCcid,Integer.parseInt(customId), 1)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res.getCode());
                        System.out.println(res.getData());
                        System.out.println(res.getMsg());
                        if (res.getCode()==1){
                            IToastUtils.iToast("状态更新成功", Toast.LENGTH_SHORT);
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) {
                        System.out.println(throwable);
                        IToastUtils.iToast(R.string.text_network_fail, Toast.LENGTH_SHORT);
                    }
                });
    }

    /**
     * 向群聊发送信息
     * @param customId
     */
    private void sendMessage(String customId) {
        String tid=Map_tid.get(customId);
        IMMessage textMessage = MessageBuilder.createTextMessage(tid, SessionTypeEnum.Team, "我已经到达活动场地啦");
        NIMClient.getService(MsgService.class).sendMessage(textMessage,false).setCallback(new RequestCallback<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                removeGeoFence();
                IToastUtils.iToast("信息已发送", Toast.LENGTH_SHORT);
            }

            @Override
            public void onFailed(int i) {
                System.out.println(i);
                IToastUtils.iToast("信息发送失败", Toast.LENGTH_SHORT);
            }

            @Override
            public void onException(Throwable throwable) {
                System.out.println("信息发送失败原因"+throwable);
                throwable.printStackTrace();
            }
        });
    }

    public void removeGeoFence(){
        mGeoFenceClient.removeGeoFence();
    }

    final GeoFenceListener geoFenceListener=new GeoFenceListener() {
        @Override
        public void onGeoFenceCreateFinished(List<GeoFence> list, int i, String s) {
            if(i == GeoFence.ADDGEOFENCE_SUCCESS){//判断围栏是否创建成功
                System.out.println("添加围栏成功!!");
                System.out.println(s);
                geoFences.addAll(list);
                //geoFenceList是已经添加的围栏列表，可据此查看创建的围栏
//                drawCircle(list.get(0));
            } else {
                System.out.println("添加围栏失败!!");
            }
        }
    };
}

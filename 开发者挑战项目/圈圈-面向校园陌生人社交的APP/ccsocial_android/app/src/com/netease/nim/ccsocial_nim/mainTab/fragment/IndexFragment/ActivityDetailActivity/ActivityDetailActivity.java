package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.ActivityDetailActivity;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.mainTab.MainActivity;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.DrawCircleFragment.ChooseLocationProvider;
import com.netease.nim.uikit.api.model.location.LocationProvider;
import com.netease.nim.uikit.common.activity.UI;
import com.netease.nim.uikit.impl.NimUIKitImpl;
import com.netease.nimlib.sdk.NimIntent;
import com.outman.framework.base.BaseUIActivity;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.ImageAsyncTask;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ResponseData;
import com.outman.framework.view.ImageClipView.CircleImageView;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class ActivityDetailActivity extends BaseUIActivity implements View.OnClickListener{
    private Context context;
    private TextView eduBindLabel;
    private CircleImageView imgHeadImage;
    private TextView textDetailActivityLabel;
    private ImageView imgDetailActivityPnum;
    private TextView textDetailActivityPnumLabel;
    private RecyclerView imgDetailActivityUserList;
    private TextView textDetailActivityPnum;
    private ImageView imgDetailActivityStart;
    private TextView textDetailActivityStartLabel;
    private TextView textDetailActivityStart;
    private ImageView imgDetailActivityEnd;
    private TextView textDetailActivityEndLabel;
    private TextView textDetailActivityEnd;
    private ImageView imgDetailActivityPos;
    private TextView textDetailActivityPosLabel;
    private TextView textDetailActivityPos;
    private ImageView imgDetailActivityMap;
    private ImageView imgDetailActivityPrivate;
    private TextView textDetailActivityPrivateLabel;
    private TextView textDetailActivityPrivate;
    private TextView textDetailActivityDetail;
    private Button btnDetailActivityJoin;
    private Button btnDetailActivityJoinS;

    private Gson gson;
    //活动Id
    private int activityId;
    private JsonArray activityMemberList;
    private JsonObject activityInfo;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail_activity);
        this.context = getContext();
        gson = new Gson();
        initView();
        initData();
    }


    @SuppressLint("CheckResult")
    private void initData() {
        Intent intent = this.getIntent();
        activityId = intent.getIntExtra("activityId",-1);
        System.out.println(activityId);

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
                        activityMemberList =  jsonObject.get("activityMemberList").getAsJsonArray();
                        activityInfo =  jsonObject.get("activityInfo").getAsJsonObject();
                        System.out.println(activityMemberList);
                        System.out.println(activityInfo);
                        initActivityDetail();

                    }
                },new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast("error",Toast.LENGTH_SHORT);
                    }
                });
    }

    @SuppressLint("SetTextI18n")
    private void initActivityDetail() {
        if(activityMemberList != null && activityInfo != null){
            //头像
            //TODO 这里之后判断是否为空
            if(!activityInfo.has("activityPic")){
                View drawCircleView = LayoutInflater.from(this).inflate(R.layout.layout_draw_activity_circle,null,false);
                TextView circle = (TextView)drawCircleView.findViewById(R.id.text_draw_circle);
                for (int i = 0; i <Constants.activityCircleIds.size() ; i++) {
                    if(Constants.activityCircleIds.get(i) == activityInfo.get("activityLabel").getAsInt()){
                        circle.setText(Constants.activityCircleLabels.get(i));
                        GradientDrawable shapeColor = (GradientDrawable)circle.getBackground();
                        shapeColor.setColor(Constants.ColorArray[i]);
                    }
                }
                imgHeadImage.setImageDrawable(getDrawable(R.drawable.icon_index_activity));
            }else{
                //设置传递进去的参数，是doInBackground获取的
                ImageAsyncTask myAsyncTask=new ImageAsyncTask(imgHeadImage);
                myAsyncTask.execute(activityInfo.get("activityPic").getAsString());
            }
            //标题
            textDetailActivityLabel.setText(activityInfo.get("activityName").getAsString());
            textDetailActivityPnum.setText(activityInfo.get("activityPeopleNum").getAsString() + "/" + activityInfo.get("activityMaxPeopleNum").getAsString() + "人");
            textDetailActivityStart.setText(activityInfo.get("activityStartTime").getAsString());
            textDetailActivityEnd.setText(activityInfo.get("activityEndTime").getAsString());
            textDetailActivityPos.setText(activityInfo.get("activityLocation").getAsString());
            textDetailActivityPrivate.setText(activityInfo.get("activityIsPrivate").getAsInt() == 0 ?"公开":"私密");
            textDetailActivityDetail.setText(activityInfo.get("activityDescribe").getAsString());

        }
    }

    private void initView() {
        eduBindLabel = (TextView) findViewById(R.id.edu_bind_label);
        imgHeadImage = (CircleImageView) findViewById(R.id.img_head_image);
        textDetailActivityLabel = (TextView) findViewById(R.id.text_detail_activity_label);
        imgDetailActivityPnum = (ImageView) findViewById(R.id.img_detail_activity_pnum);
        textDetailActivityPnumLabel = (TextView) findViewById(R.id.text_detail_activity_pnum_label);
        imgDetailActivityUserList = (RecyclerView) findViewById(R.id.img_detail_activity_user_list);
        textDetailActivityPnum = (TextView) findViewById(R.id.text_detail_activity_pnum);
        imgDetailActivityStart = (ImageView) findViewById(R.id.img_detail_activity_start);
        textDetailActivityStartLabel = (TextView) findViewById(R.id.text_detail_activity_start_label);
        textDetailActivityStart = (TextView) findViewById(R.id.text_detail_activity_start);
        imgDetailActivityEnd = (ImageView) findViewById(R.id.img_detail_activity_end);
        textDetailActivityEndLabel = (TextView) findViewById(R.id.text_detail_activity_end_label);
        textDetailActivityEnd = (TextView) findViewById(R.id.text_detail_activity_end);
        imgDetailActivityPos = (ImageView) findViewById(R.id.img_detail_activity_pos);
        textDetailActivityPosLabel = (TextView) findViewById(R.id.text_detail_activity_pos_label);
        textDetailActivityPos = (TextView) findViewById(R.id.text_detail_activity_pos);
        imgDetailActivityMap = (ImageView) findViewById(R.id.img_detail_activity_map);
        imgDetailActivityPrivate = (ImageView) findViewById(R.id.img_detail_activity_private);
        textDetailActivityPrivateLabel = (TextView) findViewById(R.id.text_detail_activity_private_label);
        textDetailActivityPrivate = (TextView) findViewById(R.id.text_detail_activity_private);
        textDetailActivityDetail = (TextView) findViewById(R.id.text_detail_activity_detail);
        btnDetailActivityJoin = (Button) findViewById(R.id.btn_detail_activity_join);
        btnDetailActivityJoinS = (Button) findViewById(R.id.btn_detail_activity_join_s);

        textDetailActivityPos.setOnClickListener(this);
        imgDetailActivityMap.setOnClickListener(this);
        btnDetailActivityJoin.setOnClickListener(this);
        btnDetailActivityJoinS.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.text_detail_activity_pos:
            case R.id.img_detail_activity_map:
                showMap();
                break;
            case R.id.btn_detail_activity_join:
                goToChat(0);
                break;
            case R.id.btn_detail_activity_join_s:
                goToChat(1);
                break;
        }
    }

    private void showMap() {
        System.out.println("百度冲");
        if (NimUIKitImpl.getLocationProvider() != null) {
//            LocationAttachment location = (LocationAttachment) message.getAttachment();
//            NimUIKitImpl.getLocationProvider().openMap(context, location.getLongitude(), location.getLatitude(), location.getAddress());
            ShowLocationProvider showLocationProvider = new ShowLocationProvider();
            showLocationProvider.openMap(
                    getContext(),activityInfo.get("activityLong").getAsDouble(),activityInfo.get("activityLat").getAsDouble(),activityInfo.get("activityLocation").getAsString());
        }
    }

    @SuppressLint("CheckResult")
    private void goToChat(int i) {
        System.out.println("加入群聊");
        System.out.println("活动id:" + activityId);
        System.out.println("用户信息：" + Constants.SP_USER_DATA.get("userCcid").getAsString());

        RetrofitManager.create(ApiService.class).joinActivity(Constants.SP_USER_DATA.get("userCcid").getAsString(),activityId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res.getCode());
                        System.out.println(res.getData());
                        System.out.println(res.getMsg());
                        Intent intent = new Intent(ActivityDetailActivity.this, MainActivity.class);
                        switch (res.getCode()){
                            case 1:
                                IToastUtils.iToast("加入成功",Toast.LENGTH_SHORT);
                                intent.putExtra("pagerCurrentItem",2);
                                startActivity(intent);
                                break;
                            case -1:
                                IToastUtils.iToast("加入失败",Toast.LENGTH_SHORT);
                                break;
                            case -2:
                                IToastUtils.iToast("已加入",Toast.LENGTH_SHORT);
                                intent.putExtra("pagerCurrentItem",2);
                                startActivity(intent);
                                break;
                            case -3:
                                IToastUtils.iToast("活动人数已满",Toast.LENGTH_SHORT);
                                break;
                        }


                    }
                },new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast("error",Toast.LENGTH_SHORT);
                    }
                });
    }
}

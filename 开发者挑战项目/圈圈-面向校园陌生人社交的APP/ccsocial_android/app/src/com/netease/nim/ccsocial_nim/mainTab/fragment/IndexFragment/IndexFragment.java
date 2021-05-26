package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomsheet.BottomSheetBehavior;
import com.google.android.material.bottomsheet.BottomSheetDialog;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.chatroom.activity.ChatRoomIndependentActivity;
import com.netease.nim.ccsocial_nim.main.fragment.MainTabFragment;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.ActivityDetailActivity.ActivityDetailActivity;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.DrawCircleFragment.DrawActivityActivity;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.DrawCircleFragment.LocationHelper;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MoreActivityActivity.MoreActivityActivity;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MyCircleActivity.MyCircleActivity;
import com.outman.framework.adapter.ActivityItemAdapter;
import com.outman.framework.entity.ActivityItem;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.CircleImageView;
import com.outman.framework.utils.GridItemDecoration;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.Image2File;
import com.outman.framework.utils.ImageAsyncTask;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ResponseData;

import java.util.ArrayList;
import java.util.List;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

import static com.outman.framework.entity.Constants.activityCircleIds;
import static com.outman.framework.entity.Constants.activityCircleLabels;
import static com.outman.framework.entity.Constants.activityCircleMainLabels;


public class IndexFragment extends MainTabFragment implements View.OnClickListener{
    private TextView textIndexSlogen;
    //    private ImageView imgIndexSearch;
//    private ImageView imgIndexSetting;
    private CircleImageView imgIndexUserPhoto;
    private Bitmap bitmap;
    private LinearLayout layoutIndexDraw;
    private ImageView imgIndexDraw;
    private TextView textIndexDraw;
    private LinearLayout layoutIndexMyCircle;
    private TextView textIndexMyCircle;

    private TextView textIndexLabelActivity;
    private TextView textIndexMoreActivity;
    private ImageView imgIndexMoreActivity;
    private RecyclerView layoutIndexBoxActivity;
    private TextView textIndexLabelTopic;
    private TextView textIndexMoreTopic;
    private ImageView imgIndexMoreTopic;
    private RecyclerView layoutIndexBoxTopic;

    private ActivityItem activityItem;
    private List<ActivityItem> activityList;

    private View bottomSheet;
    private BottomSheetBehavior behavior;
    private ImageView imgIndexActivity;
    private TextView textIndexActivity;
    private ImageView imgIndexTopics;
    private TextView textIndexTopics;

    private Intent intent;

    private Gson gson = new Gson();

    private IndexFragment fragment;

    @Override
    protected void onInit() {
        System.out.println(Constants.SP_USER_DATA);
        initView(getView());
        initData(getView());
        initDrawCircleLabel();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_index,null);
        return view;
    }

    @Override
    public void onResume() {
        super.onResume();
        initView(getView());
        initData(getView());
        initDrawCircleLabel();
        LocationHelper.getInstance().initFenceClient(getContext());
        LocationHelper.getInstance().initMyGeoFence();
    }
    @Override
    public void onStop() {
        super.onStop();
        LocationHelper.getInstance().removeGeoFence();
    }
    @Override
    public void onDestroy(){
        super.onDestroy();
        LocationHelper.getInstance().removeGeoFence();
    }

    private void initView(View view) {
//        textIndexSlogen = (TextView) view.findViewById(R.id.text_index_slogen);
//        imgIndexSearch = (ImageView) view.findViewById(R.id.img_index_search);
//        imgIndexSetting = (ImageView) view.findViewById(R.id.img_index_setting);
        imgIndexUserPhoto = (CircleImageView) view.findViewById(R.id.img_index_user_photo);
        layoutIndexDraw = (LinearLayout) view.findViewById(R.id.layout_index_draw);
        imgIndexDraw = (ImageView) view.findViewById(R.id.img_index_draw);
        textIndexDraw = (TextView) view.findViewById(R.id.text_index_draw);
        layoutIndexMyCircle = (LinearLayout) view.findViewById(R.id.layout_index_my_circle);
        textIndexMyCircle = (TextView) view.findViewById(R.id.text_index_my_circle);
        textIndexLabelActivity = (TextView) view.findViewById(R.id.text_index_label_activity);
        textIndexMoreActivity = (TextView) view.findViewById(R.id.text_index_more_activity);
        imgIndexMoreActivity = (ImageView) view.findViewById(R.id.img_index_more_activity);
        layoutIndexBoxActivity = (RecyclerView) view.findViewById(R.id.layout_index_box_activity);
        textIndexLabelTopic = (TextView) view.findViewById(R.id.text_index_label_topic);
        textIndexMoreTopic = (TextView) view.findViewById(R.id.text_index_more_topic);
        imgIndexMoreTopic = (ImageView) view.findViewById(R.id.img_index_more_topic);
        layoutIndexBoxTopic = (RecyclerView) view.findViewById(R.id.layout_index_box_topic);

        GridItemDecoration dividerItemDecoration = new GridItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        dividerItemDecoration.setDrawable(getResources().getDrawable(R.drawable.shape_divider_light));
        layoutIndexBoxActivity.addItemDecoration(dividerItemDecoration);
        layoutIndexBoxTopic.addItemDecoration(dividerItemDecoration);

        layoutIndexDraw.setOnClickListener(this);
        layoutIndexMyCircle.setOnClickListener(this);
        textIndexMyCircle.setOnClickListener(this);
        textIndexMoreActivity.setOnClickListener(this);
//        imgIndexSetting.setOnClickListener(this);

        bottomSheet = view.findViewById(R.id.bottom_sheet);
        behavior = BottomSheetBehavior.from(bottomSheet);
        behavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
            @Override
            public void onStateChanged(@NonNull View bottomSheet, @BottomSheetBehavior.State int newState) {
                String state = "null";
                switch (newState) {
                    case 1:
                        state = "STATE_DRAGGING";
                        break;
                    case 2:
                        state = "STATE_SETTLING";
                        break;
                    case 3:
                        state = "STATE_EXPANDED";
                        break;
                    case 4:
                        state = "STATE_COLLAPSED";
                        break;
                    case 5:
                        state = "STATE_HIDDEN";
                        break;
                }
                Log.d("MainActivity", "newState:" + state);
            }

            @Override
            public void onSlide(@NonNull View bottomSheet, float slideOffset) {
                Log.d("BottomSheetDemo", "slideOffset:" + slideOffset);
            }
        });

//        new Thread(new Runnable(){
//            @Override
//            public void run() {
//
//            }
//        }).start();
    }
    //Constants.SP_USER_DATA.get("userCcid").getAsString(),
    @SuppressLint("CheckResult")
    private void initData(View view) {
        System.out.println(Constants.SP_USER_DATA.get("userCcid").getAsString());
        RetrofitManager.create(ApiService.class).getUserByCcid(Constants.SP_USER_DATA.get("userCcid").getAsString())
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res.getCode());
                        System.out.println(res.getData());
                        System.out.println(res.getMsg());
                        switch (res.getCode()){
                            case 1:
//                                IToastUtils.iToast(R.string.text_send_code_success, Toast.LENGTH_SHORT);
                                Gson gson = new Gson();
                                JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                                Constants.SP_USER_DATA = jsonObject.getAsJsonObject("userInfo");
//                                Constants.SP_TOKEN = jsonObject.get("token").toString();

//                                头像更新--设置传递进去的参数，是doInBackground获取的
                                if(Constants.SP_USER_DATA.has("userAvatar")){
                                    ImageAsyncTask myAsyncTask=new ImageAsyncTask(imgIndexUserPhoto);
                                    myAsyncTask.execute(Constants.SP_USER_DATA.get("userAvatar").getAsString());
                                }else{
                                    imgIndexUserPhoto.setImageDrawable(getResources().getDrawable(R.drawable.icon_default_boy));
                                }
                                break;
                            case -1:
                                IToastUtils.iToast(R.string.text_send_code_fail,Toast.LENGTH_SHORT);
                                break;
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast(R.string.text_send_code_fail,Toast.LENGTH_SHORT);
                    }
                });




//        bitmap = Image2File.getURLimage(Constants.SP_USER_DATA.get("userAvatar").getAsString());
//        System.out.println("343");
//        System.out.println(bitmap);
//        if(bitmap != null){
//            imgIndexUserPhoto.setImageBitmap(bitmap);
//        }
        RetrofitManager.create(ApiService.class).getRecommendActivityList(Constants.SP_USER_DATA.get("userCcid").getAsString(),5)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {

                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res.getCode());
                        System.out.println(res.getData());
                        System.out.println(res.getMsg());
                        JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                        JsonArray activityArray =  jsonObject.getAsJsonArray("activityList");

                        activityList = new ArrayList<>();
                        for (int i = 0; i < activityArray.size(); i++) {
                            JsonObject item = activityArray.get(i).getAsJsonObject();
                            activityItem = new ActivityItem();
                            activityItem.setActivityId(item.get("activityId").getAsInt());
                            activityItem.setActivityPeopleNum(item.get("activityPeopleNum").getAsInt());
                            activityItem.setActivityMaxPeopleNum(item.get("activityMaxPeopleNum").getAsInt());
                            activityItem.setActivityLocation(item.get("activityLocation").getAsString());
                            activityItem.setActivityIsPrivate(item.get("activityIsPrivate").getAsString());
                            activityItem.setActivityDescribe(item.get("activityDescribe").getAsString());
                            activityItem.setActivityStatus(item.get("activityStatus").getAsString());
                            activityItem.setActivityStartTime(item.get("activityStartTime").getAsString());
                            activityItem.setActivityEndTime(item.get("activityEndTime").getAsString());
                            activityItem.setActivityLabel(item.get("activityLabel").getAsInt());
                            activityItem.setActivityName(item.get("activityName").getAsString());
                            activityItem.setActivityCreateTime(item.get("activityCreateTime").getAsString());
                            activityList.add(activityItem);
                        }
                        initActivityView(view);
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast(R.string.text_send_code_fail,Toast.LENGTH_SHORT);
                    }
                });
    }

    private void initActivityView(View view) {//渲染活动子视图
        final LinearLayoutManager mLayoutManager = new LinearLayoutManager(getContext());
        layoutIndexBoxActivity.setLayoutManager(mLayoutManager);
        ActivityItemAdapter linkLabelAdapter = new ActivityItemAdapter(getContext(), activityList);
        linkLabelAdapter.setGetListener(new ActivityItemAdapter.GetListener() {
            @Override
            public void onClick(int position) {
                System.out.println("进圈：" + position);
                Intent intent = new Intent(getActivity(), ActivityDetailActivity.class);
                intent.putExtra("activityId",activityList.get(position).getActivityId());
                startActivity(intent);
            }
        });
        layoutIndexBoxActivity.setAdapter(linkLabelAdapter);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.layout_index_draw:
                System.out.println("画个圈");
                showDrawType();
                break;
            case R.id.layout_index_my_circle:
            case R.id.text_index_my_circle:
                System.out.println("我的圈子");
                goToMyCircle();
                break;
            case R.id.text_index_more_activity:
                goToMore();
                break;
//            case R.id.img_index_setting:
//                intent = new Intent();
//                intent.setClass(getActivity(), LoginActivity.class);
//                startActivity(intent);
        }
    }

    private void goToMore() {
        Intent intent = new Intent();
        intent.setClass(getActivity(), MoreActivityActivity.class);
        startActivity(intent);
    }

    private void goToMyCircle() {
        Intent intent = new Intent();
        intent.setClass(getActivity(), MyCircleActivity.class);
        startActivity(intent);
    }

    private void showDrawType() {

        BottomSheetDialog dialog = new BottomSheetDialog(getContext());
        //设置抽屉中视图
        dialog.setContentView(R.layout.layout_index_bottom_sheet);
        dialog.show();
        imgIndexActivity = (ImageView) dialog.findViewById(R.id.img_index_activity);
        textIndexActivity = (TextView) dialog.findViewById(R.id.text_index_activity);
        imgIndexTopics = (ImageView) dialog.findViewById(R.id.img_index_topics);
        textIndexTopics = (TextView) dialog.findViewById(R.id.text_index_topics);
        intent = new Intent();
        imgIndexActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println("活动");
                intent.setClass(getActivity(), DrawActivityActivity.class);
                startActivity(intent);
                dialog.hide();
            }
        });
        textIndexActivity.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println("活动");
                intent.setClass(getActivity(), DrawActivityActivity.class);
                startActivity(intent);
                dialog.hide();
            }
        });
        imgIndexTopics.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println("话题");
                /// TODO: 2020/11/18 预留方法
            }
        });
        textIndexTopics.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println("话题");
                /// TODO: 2020/11/18 预留方法
            }
        });


    }
    @SuppressLint("CheckResult")
    private void initDrawCircleLabel() {
        //获取活动Label
        activityCircleMainLabels.clear();
        activityCircleLabels.clear();
        activityCircleIds.clear();
        RetrofitManager.create(ApiService.class).getActivityLabels()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        Gson gson = new Gson();
                        JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                        JsonArray activityLabels =  jsonObject.getAsJsonArray("typeList");
                        System.out.println(activityLabels);
                        for (int i = 0; i <activityLabels.size() ; i++) {
                            @SuppressLint("CheckResult") JsonObject typeLabel = activityLabels.get(i).getAsJsonObject();
                            //主标签
                            String mainLabels = typeLabel.get("labelType").getAsString();
                            activityCircleMainLabels.add(mainLabels);
                            //子标签
                            JsonArray labels = new JsonArray();
                            labels = typeLabel.getAsJsonArray("labelList");
                            for (int j = 0; j <labels.size(); j++) {
                                JsonObject label = new JsonObject();
                                label = labels.get(j).getAsJsonObject();
                                System.out.println(label);
                                activityCircleLabels.add(label.get("labelName").getAsString());
                                activityCircleIds.add(label.get("labelId").getAsInt());
                            }
                        }
                        System.out.println("获取数据成功");
                        System.out.println(activityCircleMainLabels);
                        System.out.println(activityCircleLabels);
                        System.out.println(activityCircleIds);


                    }
                },new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast("error", Toast.LENGTH_SHORT);
                    }
                });
    }

}

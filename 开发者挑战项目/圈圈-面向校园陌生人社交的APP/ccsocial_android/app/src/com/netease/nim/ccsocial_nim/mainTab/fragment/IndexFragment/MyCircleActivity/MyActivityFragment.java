package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MyCircleActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.ActivityDetailActivity.ActivityDetailActivity;
import com.outman.framework.adapter.ActivityItemAdapter;
import com.outman.framework.entity.ActivityItem;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.DampScrollView;
import com.outman.framework.utils.GridItemDecoration;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ResponseData;
import com.outman.framework.utils.datepicker.DateFormatUtils;
import com.outman.framework.view.LodingView;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.ArrayList;
import java.util.List;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class MyActivityFragment extends MyCircleTabFragment {
    private ActivityItem activityItem;
    private List<ActivityItem> activityList;

    private DampScrollView fragmentScroll;
    private MyActivityFragment fragment;
    private RecyclerView layoutIndexBoxActivity;

    private Intent intent;
    private Gson gson = new Gson();
    private Boolean isRequest;

    private int PAGE_SIZE;
    private int PAGE_NUM;
    private int TOTAL_NUM;

    private LodingView lodingView;


    @Override
    protected void onInit() {
        initView(getView());
        initData(getView());
        isRequest = false;
    }

    @Override
    public void onResume() {
        super.onResume();
        initView(getView());
        initData(getView());
        isRequest = false;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_my_activity_circle,null);
        EventBus.getDefault().register(this);
        return view;
    }

    @SuppressLint("ClickableViewAccessibility")
    private void initView(View view) {
        PAGE_SIZE = 10;
        PAGE_NUM = 1;
        activityList = new ArrayList<>();
        GridItemDecoration dividerItemDecoration = new GridItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        dividerItemDecoration.setDrawable(getResources().getDrawable(R.drawable.shape_divider_light));
        fragmentScroll = (DampScrollView) view.findViewById(R.id.fragment_scroll);
        layoutIndexBoxActivity = (RecyclerView) view.findViewById(R.id.layout_index_box_activity);
        layoutIndexBoxActivity.addItemDecoration(dividerItemDecoration);
        fragmentScroll.setScanScrollChangedListener(new DampScrollView.ISmartScrollChangedListener() {
            @Override
            public void onScrolledToBottom() {
                if(TOTAL_NUM > PAGE_NUM * PAGE_SIZE && !isRequest){
                    isRequest = true;
                    System.out.println("到底了");
                    PAGE_NUM = PAGE_NUM + 1;
                    initData(getView());
                }

            }

            @Override
            public void onScrolledToTop() {
                System.out.println("到顶了");
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

    @SuppressLint("CheckResult")
    private void initData(View view) {
        String labels = "";
        String startTime = "";
        String endTime = "";
        String status = "";
        for (int i = 0; i < Constants.chooseLabelList.size() ; i++) {
            labels += Constants.chooseLabelList.get(i).getLabelId() + "-";
        }
        System.out.println(labels);
        if(Constants.startTime.equals("不限")){
            startTime = "";
        }else{
            startTime = DateFormatUtils.long2Str(DateFormatUtils.str2Long(Constants.startTime,false),true) ;
        }
        if(Constants.endTime.equals("不限")){
            endTime = "";
        }else{
            endTime = DateFormatUtils.long2Str(DateFormatUtils.str2Long(Constants.endTime,false),true);
        }
        if(Constants.chooseStatus.getStatusId() == -1){
            status = "";
        }else if(Constants.chooseStatus.getStatusId() == 0){
            status = "ready";
        }else if(Constants.chooseStatus.getStatusId() == 1){
            status = "started";
        }else if(Constants.chooseStatus.getStatusId() == 2){
            status = "end";
        }
        System.out.println(startTime);
        System.out.println(endTime);

//        lodingView = new LodingView(getContext());
//        lodingView.show(getString(R.string.ysf_ptr_loading));

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
                        TOTAL_NUM = jsonObject.get("totalNum").getAsInt();
                        if (jsonObject.getAsJsonArray("activityList") != null){
                            JsonArray activityArray =  jsonObject.getAsJsonArray("activityList");
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
                        }else{
                            if (activityList.size() == 0){
//                                activityList.clear();
                                IToastUtils.iToast("暂无活动",Toast.LENGTH_SHORT);
                            }else{
                                IToastUtils.iToast("到底啦",Toast.LENGTH_SHORT);
                            }
                            initActivityView(view);
                        }
                        isRequest = false;
//                        lodingView.hide();

                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
//                        lodingView.hide();
                        IToastUtils.iToast(R.string.text_network_fail, Toast.LENGTH_SHORT);
                        isRequest = false;
                    }
                });
    }

    //处理eventbus
    @Subscribe(threadMode = ThreadMode.MAIN)
    public void handleMessage( String event) {
        System.out.println(event);
        lodingView = new LodingView(getContext());
        lodingView.show("正在加载...");
        PAGE_NUM = 1;
        activityList.clear();
        initData(getView());
        lodingView.hide();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        EventBus.getDefault().unregister(this);
    }
}

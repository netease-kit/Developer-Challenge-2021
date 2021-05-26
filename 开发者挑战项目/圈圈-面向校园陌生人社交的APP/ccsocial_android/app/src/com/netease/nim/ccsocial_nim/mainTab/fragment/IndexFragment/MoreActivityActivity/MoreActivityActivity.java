package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MoreActivityActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.ViewPager;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.gyf.immersionbar.ImmersionBar;
import com.netease.nim.ccsocial_nim.R;

import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.ActivityDetailActivity.ActivityDetailActivity;
import com.netease.nim.uikit.common.activity.UI;
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

import static com.blankj.utilcode.util.SnackbarUtils.getView;

public class MoreActivityActivity extends UI {
    private ActivityItem activityItem;
    private List<ActivityItem> activityList;

    private DampScrollView fragmentScroll;
    private RecyclerView layoutIndexBoxActivity;

    private Intent intent;
    private Gson gson = new Gson();
    private Boolean isRequest;

    private int PAGE_SIZE;
    private int PAGE_NUM;
    private int TOTAL_NUM;

    private LodingView lodingView;

    //上下文
    private Context mContext;

    private FrameLayout mMainLayout;

    public static void start(Context context) {
        start(context, null);
    }

    public static void start(Context context, Intent extras) {
        Intent intent = new Intent();
        intent.setClass(context, MoreActivityActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        if (extras != null) {
            intent.putExtras(extras);
        }
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mContext = getApplicationContext();
        setContentView(R.layout.activity_more_activity);
        EventBus.getDefault().register(this);
        ImmersionBar.with(this)
                .statusBarDarkFont(true)
                .fitsSystemWindows(true)  //使用该属性,必须指定状态栏颜色
                .statusBarColor(R.color.colorWhite)
                .init();
        init();
    }

    private void init() {
        initView();
        initData();
        isRequest = false;
    }

    @Override
    public void onResume() {
        super.onResume();
        initView();
        initData();
        isRequest = false;
    }


    @SuppressLint("ClickableViewAccessibility")
    private void initView() {
        PAGE_SIZE = 10;
        PAGE_NUM = 1;
        activityList = new ArrayList<>();
        lodingView = new LodingView(this);
        GridItemDecoration dividerItemDecoration = new GridItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        dividerItemDecoration.setDrawable(getResources().getDrawable(R.drawable.shape_divider_light));
        fragmentScroll = (DampScrollView) findViewById(R.id.fragment_scroll);
        layoutIndexBoxActivity = (RecyclerView) findViewById(R.id.layout_index_box_activity);
        layoutIndexBoxActivity.addItemDecoration(dividerItemDecoration);
        fragmentScroll.setScanScrollChangedListener(new DampScrollView.ISmartScrollChangedListener() {
            @Override
            public void onScrolledToBottom() {
                if(TOTAL_NUM > PAGE_NUM * PAGE_SIZE && !isRequest){
                    isRequest = true;
                    System.out.println("到底了");
                    PAGE_NUM = PAGE_NUM + 1;
                    initData();
                }


            }

            @Override
            public void onScrolledToTop() {
                System.out.println("到顶了");
            }

        });

    }


    private void initActivityView() {//渲染活动子视图
        final LinearLayoutManager mLayoutManager = new LinearLayoutManager(getBaseContext());
        layoutIndexBoxActivity.setLayoutManager(mLayoutManager);
        ActivityItemAdapter linkLabelAdapter = new ActivityItemAdapter(getContext(), activityList);
        linkLabelAdapter.setGetListener(new ActivityItemAdapter.GetListener() {
            @Override
            public void onClick(int position) {
                System.out.println("进圈：" + position);
                Intent intent = new Intent(getContext(), ActivityDetailActivity.class);
                intent.putExtra("activityId",activityList.get(position).getActivityId());
                startActivity(intent);
            }
        });
        layoutIndexBoxActivity.setAdapter(linkLabelAdapter);
    }

    @SuppressLint("CheckResult")
    private void initData() {
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

        RetrofitManager.create(ApiService.class).getActivityByCondition(labels,startTime,endTime,status,PAGE_NUM,PAGE_SIZE)
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
                            initActivityView();

                        }else{
                            if (activityList.size() == 0){
//                                activityList.clear();
                                IToastUtils.iToast("暂无活动", Toast.LENGTH_SHORT);
                            }else{
                                IToastUtils.iToast("到底啦",Toast.LENGTH_SHORT);
                            }
                            initActivityView();
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
        lodingView = new LodingView(this);
        lodingView.show("正在加载...");
        PAGE_NUM = 1;
        activityList.clear();
        initData();
        lodingView.hide();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        EventBus.getDefault().unregister(this);
    }

}

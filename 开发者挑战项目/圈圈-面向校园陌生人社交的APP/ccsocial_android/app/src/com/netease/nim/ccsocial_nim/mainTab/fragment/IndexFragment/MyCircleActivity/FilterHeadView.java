package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MyCircleActivity;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ObjectAnimator;
import android.annotation.SuppressLint;
import android.content.Context;

import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.blankj.utilcode.util.SizeUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.mainTab.adapter.MyActivityCircleFilterAdapterStatus;
import com.netease.nim.ccsocial_nim.mainTab.adapter.MyActivityCircleFilterAdapterTypeLeft;
import com.netease.nim.ccsocial_nim.mainTab.adapter.MyActivityCircleFilterAdapterTypeRight;
import com.outman.framework.entity.ChooseStatus;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ResponseData;
import com.outman.framework.utils.SpaceItemDecoration;
import com.outman.framework.utils.datepicker.CustomDatePicker;
import com.outman.framework.utils.datepicker.DateFormatUtils;

import org.greenrobot.eventbus.EventBus;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

/**
 * Created by apple on 2019-09-30.
 * description:头部筛选框控件，继承LinearLayout
 */
public class FilterHeadView extends LinearLayout {

    private Context mContext;
    private LinearLayout mHeadView;
    private LinearLayout llHeadType;
    private LinearLayout llHeadStatus;
    private LinearLayout llHeadTime;
    private TextView txHeadType;
    private TextView txHeadStatus;
    private TextView txHeadTime;
    // frame内容布局
    private FrameLayout mFlContent;
//    private View mViewMask;
    private LinearLayout rlContent;
    private RecyclerView filterLeft;
    private RecyclerView filterRight;
    private LinearLayout filterTimer;
    private TextView filterStartTime;
    private TextView filterEndTime;
    //时间控件
    private CustomDatePicker mStartTimerPicker;
    private CustomDatePicker mEndTimerPicker;

    private LinearLayout tabBarFilter;
    private Button btnFilterReset;
    private Button btnFilterSure;

    //左右联动适配器
    private LinearLayoutManager mManagerLeft;
    private LinearLayoutManager mManagerRight;

    //状态常量
    private static int chooseTab = -1;
    //筛选类型
    private JsonArray activityLabels;
    //筛选状态
    private List<ChooseStatus> statusList = new ArrayList();

    /**
     * 是否来自点击
     */
    private boolean mIsFromClick = false;

    private int mContentHeight;
    private boolean isHasShow = false;

    public FilterHeadView(@NonNull Context context) {
        this(context,null);
    }

    public FilterHeadView(@NonNull Context context, @Nullable AttributeSet attrs) {
        this(context, attrs,0);
    }

    public FilterHeadView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.mContext = context;
        init();
        initTimerPicker();
        initViews();
        initData();
    }

    @SuppressLint("CheckResult")
    private void initData() {
        //筛选栏字体初始化
        if(Constants.chooseLabelList.size() != 0){
            txHeadType.setTextColor(getResources().getColor(R.color.colorPrimaryBlue));
        }else{
            txHeadType.setTextColor(getResources().getColor(R.color.colorFontGray));
        }
        if(Constants.chooseStatus.getStatusId() != -1){
            txHeadStatus.setTextColor(getResources().getColor(R.color.colorPrimaryBlue));
        }else{
            txHeadStatus.setTextColor(getResources().getColor(R.color.colorFontGray));
        }
        if(!Constants.startTime.equals("不限") || !Constants.endTime.equals("不限")){
            txHeadTime.setTextColor(getResources().getColor(R.color.colorPrimaryBlue));
        }else{
            txHeadTime.setTextColor(getResources().getColor(R.color.colorFontGray));
        }
        //获取活动Label
        RetrofitManager.create(ApiService.class).getActivityLabels()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        Gson gson = new Gson();
                        JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                        activityLabels =  jsonObject.getAsJsonArray("typeList");
                        System.out.println(activityLabels);
                    }
                },new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast("error", Toast.LENGTH_SHORT);
                    }
                });
        //活动状态默认值
        statusList.clear();
        statusList.add(new ChooseStatus(-1,"全 部"));
        statusList.add(new ChooseStatus(0,"未开始"));
        statusList.add(new ChooseStatus(1,"进行中"));
        statusList.add(new ChooseStatus(2,"已结束"));
        //日期默认值
        filterStartTime.setText(Constants.startTime);
        filterEndTime.setText(Constants.endTime);
    }

    private void initViews() {
        mFlContent.setVisibility(GONE);
        tabBarFilter.setVisibility(GONE);
    }

    /**
     * 进行初始化的操作
     */
    private void init() {
        View rootView = LayoutInflater.from(mContext).inflate(R.layout.layout_my_circle_filter,this);
        mHeadView = rootView.findViewById(R.id.llHead);
        llHeadType = (LinearLayout) findViewById(R.id.llHeadType);
        llHeadStatus = (LinearLayout) findViewById(R.id.llHeadStatus);
        llHeadTime = (LinearLayout) findViewById(R.id.llHeadTime);
        txHeadType = (TextView) findViewById(R.id.txHeadType);
        txHeadStatus = (TextView) findViewById(R.id.txHeadStatus);
        txHeadTime = (TextView) findViewById(R.id.txHeadTime);


        mFlContent = rootView.findViewById(R.id.flContent);
//        mViewMask = rootView.findViewById(R.id.view_mask_bg);
        rlContent = (LinearLayout)findViewById(R.id.rlContent);
        filterLeft = (RecyclerView) findViewById(R.id.filter_left);
        filterRight = (RecyclerView) findViewById(R.id.filter_right);
        filterTimer = (LinearLayout) findViewById(R.id.filter_timer);
        filterStartTime = (TextView) findViewById(R.id.filter_start_time);
        filterEndTime = (TextView) findViewById(R.id.filter_end_time);

        tabBarFilter = (LinearLayout) findViewById(R.id.tab_bar_filter);
        btnFilterReset = (Button) findViewById(R.id.btn_filter_reset);
        btnFilterSure = (Button) findViewById(R.id.btn_filter_sure);
        // 添加间距
        filterRight.addItemDecoration(new SpaceItemDecoration(2,
                SizeUtils.dp2px( 10),
                SizeUtils.dp2px( 10)));
        initListener();
    }

    private void initActivityTypeFilterView(View view) {//渲染类型筛选子视图
        final LinearLayoutManager mLayoutManager = new LinearLayoutManager(getContext());
        filterLeft.setLayoutManager(mLayoutManager);

        MyActivityCircleFilterAdapterTypeLeft linkLabelAdapter = new MyActivityCircleFilterAdapterTypeLeft(Constants.activityCircleMainLabels,getContext());

        linkLabelAdapter.setGetListener(new MyActivityCircleFilterAdapterTypeLeft.GetListener() {
            @Override
            public void onClick(int position) {
//                把点击的下标回传给适配器 确定下标
                linkLabelAdapter.setmPosition(position);
                linkLabelAdapter.notifyDataSetChanged();
                IToastUtils.iToast(getContext(),""+position,Toast.LENGTH_SHORT);

                final GridLayoutManager mItemLayoutManager = new GridLayoutManager(getContext(),2);
                filterRight.setLayoutManager(mItemLayoutManager);
                MyActivityCircleFilterAdapterTypeRight linkItemAdapter =
                        new MyActivityCircleFilterAdapterTypeRight(activityLabels.get(position).getAsJsonObject().getAsJsonArray("labelList"),getContext());
                linkItemAdapter.setGetListener(new MyActivityCircleFilterAdapterTypeRight.GetListener() {
                    @Override
                    public void onClick(int pos) {
                        //把点击的下标回传给适配器 确定下标
                        linkItemAdapter.setmPosition(pos);
                        linkItemAdapter.notifyDataSetChanged();
                        IToastUtils.iToast(getContext(),""+pos,Toast.LENGTH_SHORT);
                    }
                });
                linkItemAdapter.setHasStableIds(true);
                filterRight.setAdapter(linkItemAdapter);
            }
        });
        linkLabelAdapter.setHasStableIds(true);
        filterLeft.setAdapter(linkLabelAdapter);

        linkLabelAdapter.setmPosition(0);
        linkLabelAdapter.notifyDataSetChanged();
        final GridLayoutManager mItemLayoutManager = new GridLayoutManager(getContext(),2);
        filterRight.setLayoutManager(mItemLayoutManager);
        MyActivityCircleFilterAdapterTypeRight linkItemAdapter =
                new MyActivityCircleFilterAdapterTypeRight(activityLabels.get(0).getAsJsonObject().getAsJsonArray("labelList"),getContext());
        linkItemAdapter.setGetListener(new MyActivityCircleFilterAdapterTypeRight.GetListener() {
            @Override
            public void onClick(int position) {
                //把点击的下标回传给适配器 确定下标
                linkItemAdapter.setmPosition(position);
                linkItemAdapter.notifyDataSetChanged();
                IToastUtils.iToast(getContext(),""+position,Toast.LENGTH_SHORT);
            }
        });
        linkItemAdapter.setHasStableIds(true);
        filterRight.setAdapter(linkItemAdapter);
    }

    private void initActivityStatusFilterView(View view){
        final LinearLayoutManager mLayoutManager = new LinearLayoutManager(getContext());
        filterLeft.setLayoutManager(mLayoutManager);
        MyActivityCircleFilterAdapterStatus labelStatusAdapter = new MyActivityCircleFilterAdapterStatus(statusList,getContext());
        labelStatusAdapter.setGetListener(new MyActivityCircleFilterAdapterStatus.GetListener() {
            @Override
            public void onClick(int position) {
//                把点击的下标回传给适配器 确定下标
                labelStatusAdapter.setmPosition(position);
                labelStatusAdapter.notifyDataSetChanged();
                IToastUtils.iToast(getContext(),""+position,Toast.LENGTH_SHORT);

            }
        });
        labelStatusAdapter.setHasStableIds(true);
        filterLeft.setAdapter(labelStatusAdapter);
    }

    private void initListener(){
        // 头部head的点击事件...
        llHeadType.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                if (chooseTab == 0 && isHasShow){
                    return;
                }
                chooseTab = 0;
                show(0);
            }
        });
        llHeadStatus.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                if (chooseTab == 1 && isHasShow){
                    return;
                }
                chooseTab = 1;
                show(1);
            }
        });
        llHeadTime.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                if (chooseTab == 2 && isHasShow){
                    return;
                }
                chooseTab = 2;
                show(2);
            }
        });

//        mViewMask.setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                System.out.println("145");
//                hide();
//            }
//        });

        filterStartTime.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                showTimeChoose(0);
            }
        });

        filterEndTime.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                showTimeChoose(1);
            }
        });

        btnFilterReset.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Constants.chooseLabelList.clear();
                Constants.chooseStatus = new ChooseStatus(-1,"全部");
                Constants.startTime = "不限";
                Constants.endTime = "不限";
                filterStartTime.setText("不限");
                filterEndTime.setText("不限");
                if (chooseTab == 0){
                    initActivityTypeFilterView(getRootView());
                }else if (chooseTab == 1){
                    initActivityStatusFilterView(getRootView());
                }
                getActivityData();
                hide();
            }
        });
        btnFilterSure.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                getActivityData();
                hide();
            }
        });
    }

    private void getActivityData() {
        System.out.println(Constants.chooseLabelList.toString());
        System.out.println(Constants.chooseStatus);
        System.out.println(Constants.startTime);
        System.out.println(Constants.endTime);
        EventBus.getDefault().post("refresh");
    }

    private void showTimeChoose(int type) {
        if(type == 0){
            mStartTimerPicker.show(filterStartTime.getText().toString());
        }else{
            mEndTimerPicker.show(filterEndTime.getText().toString());
        }

    }

    private void initTimerPicker() {
        long nowTime = System.currentTimeMillis();
        Date d = new Date(nowTime);
        Calendar c = Calendar.getInstance();
        c.setTime(d);
        //跨度设置：往前1年，往后1月内的活动
        c.add(Calendar.MONTH,1);
        //最大值时间
        String endTime = DateFormatUtils.long2Str(c.getTimeInMillis(), true);
        //最小值时间
        c.add(Calendar.YEAR,-1);
        String beginTime_e = DateFormatUtils.long2Str(c.getTimeInMillis(), true);
        String beginTime_s = DateFormatUtils.long2Str(c.getTimeInMillis(), true);

//        filterStartTime.setText(beginTime_s);
//        filterEndTime.setText(beginTime_e);
        filterStartTime.setText(Constants.startTime);
        filterEndTime.setText(Constants.endTime);

        mStartTimerPicker = new CustomDatePicker(getContext(), new CustomDatePicker.Callback() {
            @Override
            public void onTimeSelected(long timestamp) {
                if(filterEndTime.getText().toString().equals("不限")){
                    filterStartTime.setText(DateFormatUtils.long2Str(timestamp, false));
                    Constants.startTime = DateFormatUtils.long2Str(timestamp, false);
                    return;
                }
                if(timestamp > DateFormatUtils.str2Long(filterEndTime.getText().toString(),false)){
                    IToastUtils.iToast("开始时间不能大于结束时间！",Toast.LENGTH_SHORT);
                    return;
                }
                filterStartTime.setText(DateFormatUtils.long2Str(timestamp, false));
                Constants.startTime = DateFormatUtils.long2Str(timestamp, false);
            }
        }, beginTime_s, endTime);
        mEndTimerPicker = new CustomDatePicker(getContext(), new CustomDatePicker.Callback() {
            @Override
            public void onTimeSelected(long timestamp) {
                if(filterStartTime.getText().toString().equals("不限")){
                    filterEndTime.setText(DateFormatUtils.long2Str(timestamp, false));
                    Constants.endTime = DateFormatUtils.long2Str(timestamp, false);
                    return;
                }
                if(timestamp < DateFormatUtils.str2Long(filterStartTime.getText().toString(),false)){
                    IToastUtils.iToast("结束时间不能小于开始时间！",Toast.LENGTH_SHORT);
                    return;
                }
                filterEndTime.setText(DateFormatUtils.long2Str(timestamp, false));
                Constants.endTime = DateFormatUtils.long2Str(timestamp, false);
            }
        }, beginTime_e, endTime);

        // 允许点击屏幕或物理返回键关闭
        mStartTimerPicker.setCancelable(true);
        mEndTimerPicker.setCancelable(true);
        // 显示时和分
        mStartTimerPicker.setCanShowPreciseTime(false);
        mEndTimerPicker.setCanShowPreciseTime(false);
        // 允许循环滚动
        mStartTimerPicker.setScrollLoop(true);
        mEndTimerPicker.setScrollLoop(true);
        // 允许滚动动画
        mStartTimerPicker.setCanShowAnim(true);
        mEndTimerPicker.setCanShowAnim(true);
    }

    private void show(int num){
//        if (isHasShow){
//            return;
//        }
        isHasShow = true;
        mFlContent.setVisibility(VISIBLE);
        if (mContentHeight == 0 && chooseTab==-1){
            // 设置动画
            rlContent.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
                @Override
                public void onGlobalLayout() {
                    mContentHeight = rlContent.getMeasuredHeight();
                    rlContent.getViewTreeObserver().removeOnGlobalLayoutListener(this);
                    // 测量需要一定时间
                    // 从顶部进入界面
                    ObjectAnimator outIn = ObjectAnimator.ofFloat(rlContent, "translationY", -mContentHeight, 0);
                    outIn.setDuration(400);
                    outIn.start();
                }
            });
        }else {
            ObjectAnimator outIn = ObjectAnimator.ofFloat(rlContent, "translationY", -mContentHeight, 0);
            outIn.setDuration(400);
            outIn.start();
        }
        switch (num){
            case 0:
                filterRight.setVisibility(VISIBLE);
                filterLeft.setVisibility(VISIBLE);
                filterTimer.setVisibility(GONE);
                tabBarFilter.setVisibility(VISIBLE);
                initActivityTypeFilterView(getRootView());
                break;
            case 1:
                filterRight.setVisibility(GONE);
                filterTimer.setVisibility(GONE);
                filterLeft.setVisibility(VISIBLE);
                tabBarFilter.setVisibility(VISIBLE);
                initActivityStatusFilterView(getRootView());
                break;
            case 2:
                filterRight.setVisibility(GONE);
                filterLeft.setVisibility(GONE);
                filterTimer.setVisibility(VISIBLE);
                tabBarFilter.setVisibility(VISIBLE);
                break;
        }

    }

    private void hide(){
        ObjectAnimator outOut = ObjectAnimator.ofFloat(rlContent, "translationY", 0, -mContentHeight);
        outOut.setDuration(400);
        outOut.addListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
                super.onAnimationEnd(animation);
                mFlContent.setVisibility(GONE);
                tabBarFilter.setVisibility(GONE);
                isHasShow = false;
            }
        });
        outOut.start();
        chooseTab = -1;
        if(Constants.chooseLabelList.size() != 0){
            txHeadType.setTextColor(getResources().getColor(R.color.colorPrimaryBlue));
        }else{
            txHeadType.setTextColor(getResources().getColor(R.color.colorFontGray));
        }
        if(Constants.chooseStatus.getStatusId() != -1){
            txHeadStatus.setTextColor(getResources().getColor(R.color.colorPrimaryBlue));
        }else{
            txHeadStatus.setTextColor(getResources().getColor(R.color.colorFontGray));
        }
        if(!Constants.startTime.equals("不限") || !Constants.endTime.equals("不限")){
            txHeadTime.setTextColor(getResources().getColor(R.color.colorPrimaryBlue));
        }else{
            txHeadTime.setTextColor(getResources().getColor(R.color.colorFontGray));
        }
    }
}

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
 * description:??????????????????????????????LinearLayout
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
    // frame????????????
    private FrameLayout mFlContent;
//    private View mViewMask;
    private LinearLayout rlContent;
    private RecyclerView filterLeft;
    private RecyclerView filterRight;
    private LinearLayout filterTimer;
    private TextView filterStartTime;
    private TextView filterEndTime;
    //????????????
    private CustomDatePicker mStartTimerPicker;
    private CustomDatePicker mEndTimerPicker;

    private LinearLayout tabBarFilter;
    private Button btnFilterReset;
    private Button btnFilterSure;

    //?????????????????????
    private LinearLayoutManager mManagerLeft;
    private LinearLayoutManager mManagerRight;

    //????????????
    private static int chooseTab = -1;
    //????????????
    private JsonArray activityLabels;
    //????????????
    private List<ChooseStatus> statusList = new ArrayList();

    /**
     * ??????????????????
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
        //????????????????????????
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
        if(!Constants.startTime.equals("??????") || !Constants.endTime.equals("??????")){
            txHeadTime.setTextColor(getResources().getColor(R.color.colorPrimaryBlue));
        }else{
            txHeadTime.setTextColor(getResources().getColor(R.color.colorFontGray));
        }
        //????????????Label
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
        //?????????????????????
        statusList.clear();
        statusList.add(new ChooseStatus(-1,"??? ???"));
        statusList.add(new ChooseStatus(0,"?????????"));
        statusList.add(new ChooseStatus(1,"?????????"));
        statusList.add(new ChooseStatus(2,"?????????"));
        //???????????????
        filterStartTime.setText(Constants.startTime);
        filterEndTime.setText(Constants.endTime);
    }

    private void initViews() {
        mFlContent.setVisibility(GONE);
        tabBarFilter.setVisibility(GONE);
    }

    /**
     * ????????????????????????
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
        // ????????????
        filterRight.addItemDecoration(new SpaceItemDecoration(2,
                SizeUtils.dp2px( 10),
                SizeUtils.dp2px( 10)));
        initListener();
    }

    private void initActivityTypeFilterView(View view) {//???????????????????????????
        final LinearLayoutManager mLayoutManager = new LinearLayoutManager(getContext());
        filterLeft.setLayoutManager(mLayoutManager);

        MyActivityCircleFilterAdapterTypeLeft linkLabelAdapter = new MyActivityCircleFilterAdapterTypeLeft(Constants.activityCircleMainLabels,getContext());

        linkLabelAdapter.setGetListener(new MyActivityCircleFilterAdapterTypeLeft.GetListener() {
            @Override
            public void onClick(int position) {
//                ???????????????????????????????????? ????????????
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
                        //???????????????????????????????????? ????????????
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
                //???????????????????????????????????? ????????????
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
//                ???????????????????????????????????? ????????????
                labelStatusAdapter.setmPosition(position);
                labelStatusAdapter.notifyDataSetChanged();
                IToastUtils.iToast(getContext(),""+position,Toast.LENGTH_SHORT);

            }
        });
        labelStatusAdapter.setHasStableIds(true);
        filterLeft.setAdapter(labelStatusAdapter);
    }

    private void initListener(){
        // ??????head???????????????...
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
                Constants.chooseStatus = new ChooseStatus(-1,"??????");
                Constants.startTime = "??????";
                Constants.endTime = "??????";
                filterStartTime.setText("??????");
                filterEndTime.setText("??????");
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
        //?????????????????????1????????????1???????????????
        c.add(Calendar.MONTH,1);
        //???????????????
        String endTime = DateFormatUtils.long2Str(c.getTimeInMillis(), true);
        //???????????????
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
                if(filterEndTime.getText().toString().equals("??????")){
                    filterStartTime.setText(DateFormatUtils.long2Str(timestamp, false));
                    Constants.startTime = DateFormatUtils.long2Str(timestamp, false);
                    return;
                }
                if(timestamp > DateFormatUtils.str2Long(filterEndTime.getText().toString(),false)){
                    IToastUtils.iToast("???????????????????????????????????????",Toast.LENGTH_SHORT);
                    return;
                }
                filterStartTime.setText(DateFormatUtils.long2Str(timestamp, false));
                Constants.startTime = DateFormatUtils.long2Str(timestamp, false);
            }
        }, beginTime_s, endTime);
        mEndTimerPicker = new CustomDatePicker(getContext(), new CustomDatePicker.Callback() {
            @Override
            public void onTimeSelected(long timestamp) {
                if(filterStartTime.getText().toString().equals("??????")){
                    filterEndTime.setText(DateFormatUtils.long2Str(timestamp, false));
                    Constants.endTime = DateFormatUtils.long2Str(timestamp, false);
                    return;
                }
                if(timestamp < DateFormatUtils.str2Long(filterStartTime.getText().toString(),false)){
                    IToastUtils.iToast("???????????????????????????????????????",Toast.LENGTH_SHORT);
                    return;
                }
                filterEndTime.setText(DateFormatUtils.long2Str(timestamp, false));
                Constants.endTime = DateFormatUtils.long2Str(timestamp, false);
            }
        }, beginTime_e, endTime);

        // ??????????????????????????????????????????
        mStartTimerPicker.setCancelable(true);
        mEndTimerPicker.setCancelable(true);
        // ???????????????
        mStartTimerPicker.setCanShowPreciseTime(false);
        mEndTimerPicker.setCanShowPreciseTime(false);
        // ??????????????????
        mStartTimerPicker.setScrollLoop(true);
        mEndTimerPicker.setScrollLoop(true);
        // ??????????????????
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
            // ????????????
            rlContent.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
                @Override
                public void onGlobalLayout() {
                    mContentHeight = rlContent.getMeasuredHeight();
                    rlContent.getViewTreeObserver().removeOnGlobalLayoutListener(this);
                    // ????????????????????????
                    // ?????????????????????
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
        if(!Constants.startTime.equals("??????") || !Constants.endTime.equals("??????")){
            txHeadTime.setTextColor(getResources().getColor(R.color.colorPrimaryBlue));
        }else{
            txHeadTime.setTextColor(getResources().getColor(R.color.colorFontGray));
        }
    }
}

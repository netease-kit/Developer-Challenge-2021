package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MyCircleActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.viewpager.widget.ViewPager;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.gyf.immersionbar.ImmersionBar;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.common.ui.viewpager.FadeInOutPageTransformer;

import com.netease.nim.ccsocial_nim.main.reminder.ReminderItem;
import com.netease.nim.ccsocial_nim.main.reminder.ReminderManager;
import com.netease.nim.ccsocial_nim.mainTab.adapter.MyCircleTabPagerAdapter;
import com.netease.nim.uikit.common.activity.UI;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ResponseData;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

import static com.outman.framework.entity.Constants.activityCircleIds;
import static com.outman.framework.entity.Constants.activityCircleLabels;
import static com.outman.framework.entity.Constants.activityCircleMainLabels;

public class MyCircleActivity extends UI implements ViewPager.OnPageChangeListener,
        ReminderManager.UnreadNumChangedCallback{
    private PagerSlidingMyCircleTabStrip tabs;

    private ViewPager pager;

    private int scrollState;

    private MyCircleTabPagerAdapter adapter;

    //上下文
    private Context mContext;

    private FrameLayout mMainLayout;

    public static void start(Context context) {
        start(context, null);
    }

    public static void start(Context context, Intent extras) {
        Intent intent = new Intent();
        intent.setClass(context, MyCircleActivity.class);
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
        setContentView(R.layout.activity_my_circle_activity);
        ImmersionBar.with(this)
                .statusBarDarkFont(true)
                .fitsSystemWindows(true)  //使用该属性,必须指定状态栏颜色
                .statusBarColor(R.color.colorWhite)
                .init();
        init();
    }

    private void init() {
        findViews();
        setupPager();
        setupTabs();
    }

    private void setupTabs() {
        tabs.setOnCustomTabListener(new PagerSlidingMyCircleTabStrip.OnCustomTabListener() {

            @Override
            public int getTabLayoutResId(int position) {
                return R.layout.tab_layout_my_circle;
            }

            @Override
            public boolean screenAdaptation() {
                return true;
            }
        });
        tabs.setViewPager(pager);
        tabs.setOnTabClickListener(adapter);
        tabs.setOnTabDoubleTapListener(adapter);
    }
    private void setupPager() {
        adapter = new MyCircleTabPagerAdapter(getSupportFragmentManager(), this, pager);
        pager.setOffscreenPageLimit(adapter.getCacheCount());
        pager.setPageTransformer(true, new FadeInOutPageTransformer());
        pager.setAdapter(adapter);
        pager.setOnPageChangeListener(this);
    }
    private void findViews() {
        tabs = findView(R.id.tabs);
        pager = findView(R.id.main_tab_pager);
    }

    private void selectPage() {
        if (scrollState == ViewPager.SCROLL_STATE_IDLE) {
            adapter.onPageSelected(pager.getCurrentItem());
        }
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
        tabs.onPageScrolled(position, positionOffset, positionOffsetPixels);
        adapter.onPageScrolled(position);
    }

    @Override
    public void onPageSelected(int position) {
        tabs.onPageSelected(position);
        selectPage();
    }

    @Override
    public void onPageScrollStateChanged(int state) {
        tabs.onPageScrollStateChanged(state);
        scrollState = state;
        selectPage();
    }

    @Override
    public void onUnreadNumChanged(ReminderItem item) {

    }
}

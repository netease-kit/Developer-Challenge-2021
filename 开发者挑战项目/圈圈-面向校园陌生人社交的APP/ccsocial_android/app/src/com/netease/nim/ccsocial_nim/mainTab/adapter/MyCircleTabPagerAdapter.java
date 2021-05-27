package com.netease.nim.ccsocial_nim.mainTab.adapter;

import android.content.Context;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.viewpager.widget.ViewPager;

import com.netease.nim.ccsocial_nim.main.model.MyCircleTab;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MyCircleActivity.MyCircleTabFragment;

import java.util.List;

public class MyCircleTabPagerAdapter extends MyCircleSlidingTabPagerAdapter{

    @Override
    public int getCacheCount() {
        return MyCircleTab.values().length;
    }

    public MyCircleTabPagerAdapter(FragmentManager fm, Context context, ViewPager pager) {
        super(fm, MyCircleTab.values().length, context.getApplicationContext(), pager);
        for (MyCircleTab tab : MyCircleTab.values()) {
            try {
                MyCircleTabFragment fragment = null;
                List<Fragment> fs = fm.getFragments();
                if (fs != null) {
                    for (Fragment f : fs) {
                        if (f.getClass() == tab.clazz) {
                            fragment = (MyCircleTabFragment) f;
                            break;
                        }
                    }
                }
                if (fragment == null) {
                    fragment = tab.clazz.newInstance();
                }
                fragment.setState(this);
                fragment.attachTabData(tab);
                fragments[tab.tabIndex] = fragment;
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int getCount() {
        return MyCircleTab.values().length;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        MyCircleTab tab = MyCircleTab.fromTabIndex(position);
        int resId = tab != null ? tab.resId : 0;
        return resId != 0 ? context.getText(resId) : "";
    }

}
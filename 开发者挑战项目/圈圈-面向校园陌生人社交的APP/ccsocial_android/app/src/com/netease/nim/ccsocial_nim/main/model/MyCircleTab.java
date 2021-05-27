package com.netease.nim.ccsocial_nim.main.model;

import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.main.reminder.ReminderId;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MyCircleActivity.MyActivityFragment;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MyCircleActivity.MyCircleTabFragment;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MyCircleActivity.MyTopicsFragment;

public enum MyCircleTab {
    ACTIVITY(0, ReminderId.INVALID, MyActivityFragment.class, R.string.text_my_activity_circle, R.layout.fragment_my_activity_circle),

    TOPICS(1, ReminderId.INVALID, MyTopicsFragment.class, R.string.text_my_topics_circle, R.layout.fragment_my_topics_circle);

    public final int tabIndex;

    public final int reminderId;

    public final Class<? extends MyCircleTabFragment> clazz;

    public final int resId;

    public final int fragmentId;

    public final int layoutId;

    MyCircleTab(int index, int reminderId, Class<? extends MyCircleTabFragment> clazz, int resId, int layoutId) {
        this.tabIndex = index;
        this.reminderId = reminderId;
        this.clazz = clazz;
        this.resId = resId;
        this.fragmentId = index;
        this.layoutId = layoutId;
    }

    public static final MyCircleTab fromReminderId(int reminderId) {
        for (MyCircleTab value : MyCircleTab.values()) {
            if (value.reminderId == reminderId) {
                return value;
            }
        }

        return null;
    }

    public static final MyCircleTab fromTabIndex(int tabIndex) {
        for (MyCircleTab value : MyCircleTab.values()) {
            if (value.tabIndex == tabIndex) {
                return value;
            }
        }

        return null;
    }
}

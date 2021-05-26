package com.netease.nim.ccsocial_nim.main.model;

import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.main.fragment.ChatRoomListFragment;
import com.netease.nim.ccsocial_nim.main.fragment.ContactListFragment;
import com.netease.nim.ccsocial_nim.main.fragment.MainTabFragment;
import com.netease.nim.ccsocial_nim.main.fragment.SessionListFragment;
import com.netease.nim.ccsocial_nim.main.reminder.ReminderId;
import com.netease.nim.ccsocial_nim.mainTab.fragment.ContactFragment.ContactFragment;
import com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.IndexFragment;
import com.netease.nim.ccsocial_nim.mainTab.fragment.MeFragment.MeFragment;

public enum MainTab {
    INDEX(0, ReminderId.INDEX, IndexFragment.class, R.string.text_main_index, R.layout.fragment_index),

    CONTACT(1, ReminderId.CONTACT, ContactFragment.class, R.string.text_main_contact, R.layout.contacts_list),

    RECENT_CONTACTS(2, ReminderId.SESSION, SessionListFragment.class, R.string.text_main_chat, R.layout.session_list),

    ME_INFO(3, ReminderId.ME_INFO, MeFragment.class, R.string.text_main_me, R.layout.fragment_me);
//    CHAT_ROOM(2, ReminderId.INVALID, ChatRoomListFragment.class, R.string.chat_room, R.layout.chat_room_tab);

    public final int tabIndex;

    public final int reminderId;

    public final Class<? extends MainTabFragment> clazz;

    public final int resId;

    public final int fragmentId;

    public final int layoutId;

    MainTab(int index, int reminderId, Class<? extends MainTabFragment> clazz, int resId, int layoutId) {
        this.tabIndex = index;
        this.reminderId = reminderId;
        this.clazz = clazz;
        this.resId = resId;
        this.fragmentId = index;
        this.layoutId = layoutId;
    }

    public static final MainTab fromReminderId(int reminderId) {
        for (MainTab value : MainTab.values()) {
            if (value.reminderId == reminderId) {
                return value;
            }
        }

        return null;
    }

    public static final MainTab fromTabIndex(int tabIndex) {
        for (MainTab value : MainTab.values()) {
            if (value.tabIndex == tabIndex) {
                return value;
            }
        }

        return null;
    }
}

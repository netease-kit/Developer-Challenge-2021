package com.netease.nim.ccsocial_nim.main.fragment;

import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.main.model.MainTab;

/**
 * 聊天室主TAB页
 * Created by huangjun on 2015/12/11.
 */
public class ChatRoomListFragment extends MainTabFragment {
    private com.netease.nim.ccsocial_nim.chatroom.fragment.ChatRoomListFragment fragment;

    public ChatRoomListFragment() {
        setContainerId(MainTab.ME_INFO.fragmentId);
    }

    @Override
    protected void onInit() {
        // 采用静态集成，这里不需要做什么了
        fragment = (com.netease.nim.ccsocial_nim.chatroom.fragment.ChatRoomListFragment) getActivity().getSupportFragmentManager().findFragmentById(R.id.chat_rooms_fragment);
    }

    @Override
    public void onCurrent() {
        super.onCurrent();
        if (fragment != null) {
            fragment.onCurrent();
        }
    }
}

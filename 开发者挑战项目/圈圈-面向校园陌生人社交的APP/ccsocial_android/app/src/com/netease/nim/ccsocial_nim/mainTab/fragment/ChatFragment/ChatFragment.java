package com.netease.nim.ccsocial_nim.mainTab.fragment.ChatFragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.netease.nim.ccsocial_nim.R;
import com.outman.framework.base.BaseFragment;

public class ChatFragment extends BaseFragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_chat,null);
        return view;
    }
}


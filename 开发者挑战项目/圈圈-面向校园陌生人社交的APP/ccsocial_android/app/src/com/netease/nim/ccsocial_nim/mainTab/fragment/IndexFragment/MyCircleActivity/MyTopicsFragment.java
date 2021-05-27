package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.MyCircleActivity;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.mainTab.fragment.MeFragment.MeFragment;

public class MyTopicsFragment extends MyCircleTabFragment {

    private MeFragment fragment;

    @Override
    protected void onInit() {

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_my_topics_circle,null);
        return view;
    }
}

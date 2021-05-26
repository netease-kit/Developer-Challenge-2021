package com.netease.nim.ccsocial_nim.mainTab.fragment.MeFragment;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.netease.nim.ccsocial_nim.DemoCache;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.main.fragment.MainTabFragment;
import com.netease.nim.ccsocial_nim.mainTab.fragment.ContactFragment.activity.UserProfileEditItemActivity;
import com.netease.nim.ccsocial_nim.mainTab.fragment.ContactFragment.activity.UserProfileSettingActivity;
import com.netease.nim.uikit.business.contact.ContactsFragment;
import com.outman.framework.base.BaseFragment;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.ImageAsyncTask;
import com.outman.framework.view.FunctionItemView;
import com.outman.framework.view.ImageClipView.CircleImageView;

import static com.netease.nim.ccsocial_nim.mainTab.fragment.ContactFragment.activity.UserProfileEditItemActivity.REQUEST_CODE;
import static com.netease.nim.uikit.business.session.constant.Extras.EXTRA_DATA;

public class MeFragment extends MainTabFragment implements View.OnClickListener {
    private static final String EXTRA_KEY = "EXTRA_KEY";
    private static final String EXTRA_DATA = "EXTRA_DATA";
    public static final int REQUEST_CODE = 1000;

    private MeFragment fragment;

    private CircleImageView imgHeadImage;
    private TextView userName;
    private TextView userPhone;
    private LinearLayout meItemToast;
    private LinearLayout meItemWallet;
    private LinearLayout meItemHistory;
    private LinearLayout meItemCredibility;
    private FunctionItemView meItemInfo;
    private FunctionItemView meItemSafe;
    private FunctionItemView meItemCredit;
    private FunctionItemView meItemLike;
    private FunctionItemView meItemHelp;
    private FunctionItemView meItemGood;
    private FunctionItemView meItemSetting;


    @Override
    protected void onInit() {
        initView(getView());
        initData();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_me,null);
        return view;
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void onClick(View v) {

    }

    private void initView(View view) {
        imgHeadImage = (CircleImageView) view.findViewById(R.id.img_head_image);
        userName = (TextView) view.findViewById(R.id.user_name);
        userPhone = (TextView) view.findViewById(R.id.user_phone);
        meItemToast = (LinearLayout) view.findViewById(R.id.me_item_toast);
        meItemWallet = (LinearLayout) view.findViewById(R.id.me_item_wallet);
        meItemHistory = (LinearLayout) view.findViewById(R.id.me_item_history);
        meItemCredibility = (LinearLayout) view.findViewById(R.id.me_item_credibility);
        meItemInfo = (FunctionItemView) view.findViewById(R.id.me_item_info);
        meItemSafe = (FunctionItemView) view.findViewById(R.id.me_item_safe);
        meItemCredit = (FunctionItemView) view.findViewById(R.id.me_item_credit);
        meItemLike = (FunctionItemView) view.findViewById(R.id.me_item_like);
        meItemHelp = (FunctionItemView) view.findViewById(R.id.me_item_help);
        meItemGood = (FunctionItemView) view.findViewById(R.id.me_item_good);
        meItemSetting = (FunctionItemView) view.findViewById(R.id.me_item_setting);

        meItemInfo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                goToUserInfo();
            }
        });

    }

    private void initData() {
        if(Constants.SP_USER_DATA.has("userAvatar")){
            //设置传递进去的参数，是doInBackground获取的
            ImageAsyncTask myAsyncTask=new ImageAsyncTask(imgHeadImage);
            myAsyncTask.execute(Constants.SP_USER_DATA.get("userAvatar").getAsString());
        }else{
            imgHeadImage.setImageDrawable(getResources().getDrawable(R.drawable.icon_default_boy));
        }

        if(Constants.SP_USER_DATA.has("userName")){
            userName.setText(Constants.SP_USER_DATA.get("userName").getAsString());
        }else{
            userName.setText("未设置用户名");
        }

        userPhone.setText(Constants.SP_USER_DATA.get("userPhone").getAsString());
    }

    private void goToUserInfo(){
        UserProfileSettingActivity.start(getContext(), DemoCache.getAccount());
    }


}

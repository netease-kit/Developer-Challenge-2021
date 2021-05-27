package com.netease.nim.ccsocial_nim.mainTab.fragment.ContactFragment.activity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.netease.nim.uikit.common.ToastHelper;

import com.netease.nim.ccsocial_nim.DemoCache;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.uikit.api.NimUIKit;
import com.netease.nim.uikit.api.model.SimpleCallback;
import com.netease.nim.uikit.api.wrapper.NimToolBarOptions;
import com.netease.nim.uikit.common.activity.ToolBarOptions;
import com.netease.nim.uikit.common.activity.UI;
import com.netease.nim.uikit.common.ui.dialog.DialogMaker;
import com.netease.nim.uikit.common.ui.dialog.EasyAlertDialogHelper;
import com.netease.nim.uikit.common.ui.widget.ClearableEditTextWithIcon;
import com.netease.nimlib.sdk.ResponseCode;
import com.netease.nimlib.sdk.uinfo.model.NimUserInfo;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ResponseData;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

/**
 * 添加好友页面
 * Created by huangjun on 2015/8/11.
 */
public class AddFriendActivity extends UI {

    private ClearableEditTextWithIcon searchEdit;
    private JsonObject searchUserData;

    public static final void start(Context context) {
        Intent intent = new Intent();
        intent.setClass(context, AddFriendActivity.class);
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.add_friend_activity);

        ToolBarOptions options = new NimToolBarOptions();
        options.titleId = R.string.add_buddy;
        setToolBar(R.id.toolbar, options);

        findViews();
        initActionbar();
    }

    private void findViews() {
        searchEdit = findView(R.id.search_friend_edit);
        searchEdit.setDeleteImage(R.drawable.nim_grey_delete_icon);
    }

    private void initActionbar() {
        TextView toolbarView = findView(R.id.action_bar_right_clickable_textview);
        toolbarView.setText(R.string.search);
        toolbarView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (TextUtils.isEmpty(searchEdit.getText().toString())) {
                    ToastHelper.showToast(AddFriendActivity.this, R.string.not_allow_empty);
                } else if (searchEdit.getText().toString().equals(Constants.SP_USER_DATA.get("userCcid").getAsString())) {
                    ToastHelper.showToast(AddFriendActivity.this, R.string.add_friend_self_tip);
                } else {
                    getUserAccid();
                }
            }
        });
    }

    @SuppressLint("CheckResult")
    private void  getUserAccid(){
        //CCID转ACCID
        RetrofitManager.create(ApiService.class).getUserByCcid(searchEdit.getText().toString().toLowerCase())
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res.getCode());
                        System.out.println(res.getData());
                        System.out.println(res.getMsg());
                        switch (res.getCode()){
                            case 1:
                                IToastUtils.iToast(R.string.text_send_code_success, Toast.LENGTH_SHORT);
                                Gson gson = new Gson();
                                JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                                searchUserData = jsonObject.getAsJsonObject("userInfo");
                                query();
                                break;
                            case -1:
                                IToastUtils.iToast(R.string.text_send_code_fail,Toast.LENGTH_SHORT);
                                break;
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast(R.string.text_send_code_fail,Toast.LENGTH_SHORT);
                    }
                });

    }

    private void query() {
        DialogMaker.showProgressDialog(this, null, false);
        final String account = searchUserData.get("userAccid").getAsString().toLowerCase();
        final String userCcid = searchUserData.get("userCcid").getAsString().toLowerCase();
        final String userName = searchUserData.has("userName")?searchUserData.get("userName").getAsString().toLowerCase():"匿名圈友";
        final String userAvatar = searchUserData.has("userAvatar")?searchUserData.get("userAvatar").getAsString():null;

        NimUIKit.getUserInfoProvider().getUserInfoAsync(account, new SimpleCallback<NimUserInfo>() {
            @Override
            public void onResult(boolean success, NimUserInfo result, int code) {
                DialogMaker.dismissProgressDialog();
                if (success) {
                    if (result == null) {
                        EasyAlertDialogHelper.showOneButtonDiolag(AddFriendActivity.this, R.string.user_not_exsit,
                                R.string.user_tips, R.string.ok, false, null);
                    } else {
                        UserProfileActivity.start(AddFriendActivity.this, account, userCcid,userName,userAvatar);
                    }
                } else if (code == 408) {
                    ToastHelper.showToast(AddFriendActivity.this, R.string.network_is_not_available);
                } else if (code == ResponseCode.RES_EXCEPTION) {
                    ToastHelper.showToast(AddFriendActivity.this, "on exception");
                } else {
                    ToastHelper.showToast(AddFriendActivity.this, "on failed:" + code);
                }
            }
        });
    }
}

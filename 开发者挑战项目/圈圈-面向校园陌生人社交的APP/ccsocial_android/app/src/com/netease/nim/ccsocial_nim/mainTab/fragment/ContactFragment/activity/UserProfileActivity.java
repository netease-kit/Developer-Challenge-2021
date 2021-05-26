package com.netease.nim.ccsocial_nim.mainTab.fragment.ContactFragment.activity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.gyf.immersionbar.ImmersionBar;
import com.netease.nim.ccsocial_nim.DemoCache;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.config.preference.UserPreferences;
import com.netease.nim.ccsocial_nim.mainTab.fragment.ContactFragment.constant.UserConstant;
import com.netease.nim.ccsocial_nim.main.model.Extras;
import com.netease.nim.ccsocial_nim.session.SessionHelper;
import com.netease.nim.uikit.api.NimUIKit;
import com.netease.nim.uikit.api.model.SimpleCallback;
import com.netease.nim.uikit.api.model.contact.ContactChangedObserver;
import com.netease.nim.uikit.api.wrapper.NimToolBarOptions;
import com.netease.nim.uikit.business.uinfo.UserInfoHelper;
import com.netease.nim.uikit.common.ToastHelper;
import com.netease.nim.uikit.common.activity.ToolBarOptions;
import com.netease.nim.uikit.common.activity.UI;
import com.netease.nim.uikit.common.ui.dialog.DialogMaker;
import com.netease.nim.uikit.common.ui.dialog.EasyAlertDialog;
import com.netease.nim.uikit.common.ui.dialog.EasyAlertDialogHelper;
import com.netease.nim.uikit.common.ui.dialog.EasyEditDialog;
import com.netease.nim.uikit.common.ui.imageview.HeadImageView;
import com.netease.nim.uikit.common.ui.widget.SwitchButton;
import com.netease.nim.uikit.common.util.log.LogUtil;
import com.netease.nim.uikit.common.util.sys.NetworkUtil;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.Observer;
import com.netease.nimlib.sdk.RequestCallback;
import com.netease.nimlib.sdk.RequestCallbackWrapper;
import com.netease.nimlib.sdk.ResponseCode;
import com.netease.nimlib.sdk.friend.FriendService;
import com.netease.nimlib.sdk.friend.FriendServiceObserve;
import com.netease.nimlib.sdk.friend.constant.VerifyType;
import com.netease.nimlib.sdk.friend.model.AddFriendData;
import com.netease.nimlib.sdk.friend.model.MuteListChangedNotify;
import com.netease.nimlib.sdk.msg.MsgService;
import com.netease.nimlib.sdk.msg.constant.SessionTypeEnum;
import com.netease.nimlib.sdk.msg.model.RecentContact;
import com.netease.nimlib.sdk.msg.model.StickTopSessionInfo;
import com.netease.nimlib.sdk.uinfo.constant.GenderEnum;
import com.netease.nimlib.sdk.uinfo.model.NimUserInfo;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.ImageAsyncTask;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ResponseData;

import java.util.List;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

/**
 * 用户资料页面
 * Created by huangjun on 2015/8/11.
 */
public class UserProfileActivity extends UI {

    private static final String TAG = UserProfileActivity.class.getSimpleName();

    private final boolean FLAG_ADD_FRIEND_DIRECTLY = false; // 是否直接加为好友开关，false为需要好友申请

    private final String KEY_BLACK_LIST = "black_list";

    private final String KEY_MSG_NOTICE = "msg_notice";

    private final String KEY_RECENT_STICKY = "recent_contacts_sticky";

    private String account;
    private String userCcid;
    private String userName;
    private String userAvatar;

    // 基本信息
    private HeadImageView headImageView;

    private TextView nameText;

    private ImageView genderImage;

    private TextView accountText;

    private TextView birthdayText;

    private TextView mobileText;

    private TextView emailText;

    private TextView signatureText;

    private RelativeLayout birthdayLayout;

    private RelativeLayout phoneLayout;

    private RelativeLayout emailLayout;

    private RelativeLayout signatureLayout;

    private RelativeLayout aliasLayout;

    private TextView nickText;

    // 开关
    private ViewGroup toggleLayout;

    private Button addFriendBtn;

    private Button removeFriendBtn;

    private Button chatBtn;

    private SwitchButton blackSwitch;

    private SwitchButton noticeSwitch;

    private SwitchButton stickySwitch;
    public static void start(Context context, String account) {
        Intent intent = new Intent();
        intent.setClass(context, UserProfileActivity.class);
        intent.putExtra(Extras.EXTRA_ACCOUNT, account);
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
    }
    public static void start(Context context, String account,String userCcid,String userName,String userAvatar) {
        Intent intent = new Intent();
        intent.setClass(context, UserProfileActivity.class);
        intent.putExtra(Extras.EXTRA_ACCOUNT, account);
        intent.putExtra(Extras.EXTRA_USER_CCID, userCcid);
        intent.putExtra(Extras.EXTRA_USER_NAME, userName);
        intent.putExtra(Extras.EXTRA_USER_AVATAR, userAvatar);
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.user_profile_activity);
        ImmersionBar.with(this)
                .statusBarDarkFont(true)
                .fitsSystemWindows(true)  //使用该属性,必须指定状态栏颜色
                .statusBarColor(com.netease.nim.uikit.R.color.white)
                .init();
        account = getIntent().getStringExtra(Extras.EXTRA_ACCOUNT);
        userCcid = getIntent().getStringExtra(Extras.EXTRA_USER_CCID);
        userName = getIntent().getStringExtra(Extras.EXTRA_USER_NAME);
        userAvatar = getIntent().getStringExtra(Extras.EXTRA_USER_AVATAR);
        if (TextUtils.isEmpty(account)) {
            ToastHelper.showToast(UserProfileActivity.this, "传入的帐号为空");
            finish();
            return;
        }
        ToolBarOptions options = new NimToolBarOptions();
        options.titleId = R.string.user_profile;
        setToolBar(R.id.toolbar, options);

        initActionbar();
        findViews();
        registerObserver(true);

        ImmersionBar.with(this)
                .statusBarDarkFont(true)
                .fitsSystemWindows(true)  //使用该属性,必须指定状态栏颜色
                .statusBarColor(R.color.colorPrimaryWhite)
                .init();
    }

    @Override
    protected void onResume() {
        super.onResume();
        updateUserInfo();
        updateToggleView();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        registerObserver(false);
    }

    private void registerObserver(boolean register) {
        NimUIKit.getContactChangedObservable().registerObserver(friendDataChangedObserver, register);
        NIMClient.getService(FriendServiceObserve.class).observeMuteListChangedNotify(muteListChangedNotifyObserver,
                register);
    }

    Observer<MuteListChangedNotify> muteListChangedNotifyObserver = new Observer<MuteListChangedNotify>() {

        @Override
        public void onEvent(MuteListChangedNotify notify) {
            setToggleBtn(noticeSwitch, !notify.isMute());
        }
    };

    ContactChangedObserver friendDataChangedObserver = new ContactChangedObserver() {

        @Override
        public void onAddedOrUpdatedFriends(List<String> account) {
            updateUserOperatorView();
        }

        @Override
        public void onDeletedFriends(List<String> account) {
            updateUserOperatorView();
        }

        @Override
        public void onAddUserToBlackList(List<String> account) {
            updateUserOperatorView();
        }

        @Override
        public void onRemoveUserFromBlackList(List<String> account) {
            updateUserOperatorView();
        }
    };

    private void findViews() {
        headImageView = findView(R.id.user_head_image);
        nameText = findView(R.id.user_name);
        genderImage = findView(R.id.gender_img);
        accountText = findView(R.id.user_account);
        toggleLayout = findView(R.id.toggle_layout);
        addFriendBtn = findView(R.id.add_buddy);
        chatBtn = findView(R.id.begin_chat);
        removeFriendBtn = findView(R.id.remove_buddy);
        birthdayLayout = findView(R.id.birthday);
        nickText = findView(R.id.user_nick);
        birthdayText = birthdayLayout.findViewById(R.id.value);
        phoneLayout = findView(R.id.phone);
        mobileText = phoneLayout.findViewById(R.id.value);
        emailLayout = findView(R.id.email);
        emailText = emailLayout.findViewById(R.id.value);
        signatureLayout = findView(R.id.signature);
        signatureText = signatureLayout.findViewById(R.id.value);
        aliasLayout = findView(R.id.alias);
        ((TextView) birthdayLayout.findViewById(R.id.attribute)).setText(R.string.birthday);
        ((TextView) phoneLayout.findViewById(R.id.attribute)).setText(R.string.phone);
        ((TextView) emailLayout.findViewById(R.id.attribute)).setText(R.string.email);
        ((TextView) signatureLayout.findViewById(R.id.attribute)).setText(R.string.signature);
        ((TextView) aliasLayout.findViewById(R.id.attribute)).setText(R.string.alias);
        addFriendBtn.setOnClickListener(onClickListener);
        chatBtn.setOnClickListener(onClickListener);
        removeFriendBtn.setOnClickListener(onClickListener);
        aliasLayout.setOnClickListener(v -> UserProfileEditItemActivity.startActivity(UserProfileActivity.this, UserConstant.KEY_ALIAS, account));
    }

    private void initActionbar() {
        TextView toolbarView = findView(R.id.action_bar_right_clickable_textview);
        if (!TextUtils.equals(account, DemoCache.getAccount())) {
            toolbarView.setVisibility(View.GONE);
            return;
        } else {
            toolbarView.setVisibility(View.VISIBLE);
        }
        toolbarView.setText(R.string.edit);
        toolbarView.setOnClickListener(v -> UserProfileSettingActivity.start(UserProfileActivity.this, account));
    }

    private void setToggleBtn(SwitchButton btn, boolean isChecked) {
        btn.setCheck(isChecked);
    }

    private void updateUserInfo() {
        if (NimUIKit.getUserInfoProvider().getUserInfo(account) != null) {
            updateUserInfoView();
            return;
        }
        NimUIKit.getUserInfoProvider().getUserInfoAsync(account, (SimpleCallback<NimUserInfo>) (success, result, code) -> updateUserInfoView());
    }

    private void updateUserInfoView() {
//        accountText.setText("圈圈帐号：" + userCcid);
        System.out.println("997");
        System.out.println(userCcid);
        headImageView.loadBuddyAvatar(account);
        //设置传递进去的参数，是doInBackground获取的
        if(userAvatar != null){
            ImageAsyncTask myAsyncTask=new ImageAsyncTask(headImageView);
            myAsyncTask.execute(userAvatar);
        }else{
            headImageView.setImageDrawable(getResources().getDrawable(R.drawable.icon_default_boy));
        }

        final NimUserInfo userInfo = (NimUserInfo) NimUIKit.getUserInfoProvider().getUserInfo(account);
        if (userInfo == null) {
            LogUtil.e(TAG, "userInfo is null when updateUserInfoView");
            return;
        }
        System.out.println(userInfo.getName());
        if(userInfo.getName() != null ){
            accountText.setText(userInfo.getName());
            nameText.setText(userInfo.getName());
        }else{
            if (TextUtils.equals(userCcid, Constants.SP_USER_DATA.get("userCcid").toString())) {
                nameText.setText(Constants.SP_USER_DATA.get("userName").toString());
            }else{
                nameText.setText("未设置用户名");
            }
        }
        if (userInfo.getGenderEnum() == GenderEnum.MALE) {
            genderImage.setVisibility(View.VISIBLE);
            genderImage.setBackgroundResource(R.drawable.nim_male);
        } else if (userInfo.getGenderEnum() == GenderEnum.FEMALE) {
            genderImage.setVisibility(View.VISIBLE);
            genderImage.setBackgroundResource(R.drawable.nim_female);
        } else {
            genderImage.setVisibility(View.GONE);
        }
        if (!TextUtils.isEmpty(userInfo.getBirthday())) {
            birthdayLayout.setVisibility(View.VISIBLE);
            birthdayText.setText(userInfo.getBirthday());
        } else {
            birthdayLayout.setVisibility(View.GONE);
        }
        if (!TextUtils.isEmpty(userInfo.getMobile())) {
            phoneLayout.setVisibility(View.VISIBLE);
            mobileText.setText(userInfo.getMobile());
        } else {
            phoneLayout.setVisibility(View.GONE);
        }
        if (!TextUtils.isEmpty(userInfo.getEmail())) {
            emailLayout.setVisibility(View.VISIBLE);
            emailText.setText(userInfo.getEmail());
        } else {
            emailLayout.setVisibility(View.GONE);
        }
        if (!TextUtils.isEmpty(userInfo.getSignature())) {
            signatureLayout.setVisibility(View.VISIBLE);
            signatureText.setText(userInfo.getSignature());
        } else {
            signatureLayout.setVisibility(View.GONE);
        }

    }

    private void updateUserOperatorView() {
        chatBtn.setVisibility(View.VISIBLE);
        if (NIMClient.getService(FriendService.class).isMyFriend(account)) {
            removeFriendBtn.setVisibility(View.VISIBLE);
            addFriendBtn.setVisibility(View.GONE);
            updateAlias(true);
        } else {
            addFriendBtn.setVisibility(View.VISIBLE);
            removeFriendBtn.setVisibility(View.GONE);
            updateAlias(false);
        }
    }

    private void updateToggleView() {
        if (DemoCache.getAccount() != null && !DemoCache.getAccount().equals(account)) {
            boolean black = NIMClient.getService(FriendService.class).isInBlackList(account);
            boolean notice = NIMClient.getService(FriendService.class).isNeedMessageNotify(account);
            if (blackSwitch == null) {
                blackSwitch = addToggleItemView(KEY_BLACK_LIST, R.string.black_list, black);
            } else {
                setToggleBtn(blackSwitch, black);
            }
            if (noticeSwitch == null) {
                noticeSwitch = addToggleItemView(KEY_MSG_NOTICE, R.string.msg_notice, notice);
            } else {
                setToggleBtn(noticeSwitch, notice);
            }
            if (NIMClient.getService(FriendService.class).isMyFriend(account)) {
                RecentContact recentContact = NIMClient.getService(MsgService.class).queryRecentContact(account,
                        SessionTypeEnum.P2P);
                boolean isSticky = NIMClient.getService(MsgService.class).isStickTopSession(account, SessionTypeEnum.P2P);
                if (stickySwitch == null) {
                    stickySwitch = addToggleItemView(KEY_RECENT_STICKY, R.string.recent_sticky, isSticky);
                } else {
                    setToggleBtn(stickySwitch, isSticky);
                }
            }
            updateUserOperatorView();
        }
    }


    private SwitchButton addToggleItemView(String key, int titleResId, boolean initState) {
        ViewGroup vp = (ViewGroup) getLayoutInflater().inflate(R.layout.nim_user_profile_toggle_item, null);
        ViewGroup.LayoutParams vlp = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                (int) getResources()
                        .getDimension(R.dimen.isetting_item_height));
        vp.setLayoutParams(vlp);
        TextView titleText = vp.findViewById(R.id.user_profile_title);
        titleText.setText(titleResId);
        SwitchButton switchButton = vp.findViewById(R.id.user_profile_toggle);
        switchButton.setCheck(initState);
        switchButton.setOnChangedListener(onChangedListener);
        switchButton.setTag(key);
        toggleLayout.addView(vp);
        return switchButton;
    }

    private void updateAlias(boolean isFriend) {
        if (isFriend) {
            aliasLayout.setVisibility(View.VISIBLE);
            aliasLayout.findViewById(R.id.arrow_right).setVisibility(View.VISIBLE);
            String alias = NimUIKit.getContactProvider().getAlias(account);
            String name = UserInfoHelper.getUserName(account);
            if(name.length()==32){
                name = "匿名用户";
            }
            if (!TextUtils.isEmpty(alias)) {
                nickText.setVisibility(View.VISIBLE);
                nameText.setText("备注：" + alias);
//                nickText.setText("昵称：" + name);
            } else {
                nameText.setVisibility(View.GONE);
                nickText.setText("昵称：" + name);
            }
        } else {
            aliasLayout.setVisibility(View.GONE);
            aliasLayout.findViewById(R.id.arrow_right).setVisibility(View.GONE);
            nickText.setVisibility(View.GONE);
//            nameText.setText(UserInfoHelper.getUserName(account));

            if(account.equals(Constants.SP_USER_DATA.has("userAccid"))){//是自己
                if(Constants.SP_USER_DATA.has("userName")){
                    nameText.setText(Constants.SP_USER_DATA.get("userName").getAsString());
                }else {
                    nameText.setText("未设置用户名");
                }
                accountText.setText(Constants.SP_USER_DATA.get("userCcid").getAsString());
            }else{
                final NimUserInfo userInfo = (NimUserInfo) NimUIKit.getUserInfoProvider().getUserInfo(account);
                if (userInfo == null) {
                    LogUtil.e(TAG, "userInfo is null when updateUserInfoView");
                    return;
                }
                System.out.println(userInfo.getName());
                if(userInfo.getName() != null ){
                    nameText.setText(userInfo.getName());
                }else{
                    nameText.setText("未设置用户名");
                }
                accountText.setText(userCcid);
            }
        }
    }

    private SwitchButton.OnChangedListener onChangedListener = (v, checkState) -> {
        final String key = (String) v.getTag();
        if (KEY_RECENT_STICKY.equals(key)) {
            updateSticky(checkState);
        }else if (key.equals(KEY_BLACK_LIST)) {
            updateBlack(checkState);
        } else if (key.equals(KEY_MSG_NOTICE)) {
            updateNotice(checkState);
        }
    };

    private void updateNotice(boolean checkState) {
        if (!NetworkUtil.isNetAvailable(UserProfileActivity.this)) {
            ToastHelper.showToast(UserProfileActivity.this, R.string.network_is_not_available);
            noticeSwitch.setCheck(!checkState);
            return;
        }
        NIMClient.getService(FriendService.class).setMessageNotify(account, checkState).setCallback(
                new RequestCallback<Void>() {

                    @Override
                    public void onSuccess(Void param) {
                        if (checkState) {
                            ToastHelper.showToast(UserProfileActivity.this, "开启消息提醒成功");
                        } else {
                            ToastHelper.showToast(UserProfileActivity.this, "关闭消息提醒成功");
                        }
                    }

                    @Override
                    public void onFailed(int code) {
                        if (code == 408) {
                            ToastHelper.showToast(UserProfileActivity.this, R.string.network_is_not_available);
                        } else {
                            ToastHelper.showToast(UserProfileActivity.this, "on failed:" + code);
                        }
                        noticeSwitch.setCheck(!checkState);
                    }

                    @Override
                    public void onException(Throwable exception) {
                    }
                });
    }

    private void updateBlack(boolean checkState) {
        if (!NetworkUtil.isNetAvailable(UserProfileActivity.this)) {
            ToastHelper.showToast(UserProfileActivity.this, R.string.network_is_not_available);
            blackSwitch.setCheck(!checkState);
            return;
        }
        if (checkState) {
            NIMClient.getService(FriendService.class).addToBlackList(account).setCallback(
                    new RequestCallback<Void>() {

                        @Override
                        public void onSuccess(Void param) {
                            ToastHelper.showToast(UserProfileActivity.this, "加入黑名单成功");
                        }

                        @Override
                        public void onFailed(int code) {
                            if (code == 408) {
                                ToastHelper.showToast(UserProfileActivity.this, R.string.network_is_not_available);
                            } else {
                                ToastHelper.showToast(UserProfileActivity.this, "on failed：" + code);
                            }
                            blackSwitch.setCheck(false);
                        }

                        @Override
                        public void onException(Throwable exception) {
                        }
                    });
        } else {
            NIMClient.getService(FriendService.class).removeFromBlackList(account).setCallback(
                    new RequestCallback<Void>() {

                        @Override
                        public void onSuccess(Void param) {
                            ToastHelper.showToast(UserProfileActivity.this, "移除黑名单成功");
                        }

                        @Override
                        public void onFailed(int code) {
                            if (code == 408) {
                                ToastHelper.showToast(UserProfileActivity.this, R.string.network_is_not_available);
                            } else {
                                ToastHelper.showToast(UserProfileActivity.this, "on failed:" + code);
                            }
                            blackSwitch.setCheck(true);
                        }

                        @Override
                        public void onException(Throwable exception) {
                        }
                    });
        }
    }

    private void updateSticky(boolean checkState) {
        MsgService msgService = NIMClient.getService(MsgService.class);
        //查询之前是不是存在会话记录
        RecentContact recentContactFromDB = msgService.queryRecentContact(account, SessionTypeEnum.P2P);
        //置顶
        if (checkState) {
            //如果之前不存在，创建一条空的会话记录
            final RecentContact recent = recentContactFromDB != null ? recentContactFromDB :
                    msgService.createEmptyRecentContact(account, SessionTypeEnum.P2P, 0, System.currentTimeMillis(), true);
            // 执行置顶操作
            msgService.addStickTopSession(account, SessionTypeEnum.P2P, "").setCallback(new RequestCallbackWrapper<StickTopSessionInfo>() {
                @Override
                public void onResult(int code, StickTopSessionInfo result, Throwable exception) {
                    if (ResponseCode.RES_SUCCESS == code) {
                        msgService.updateRecentAndNotify(recent);
                    }
                }
            });
        }
        //取消置顶
        else {
            msgService.removeStickTopSession(account, SessionTypeEnum.P2P, "").setCallback(new RequestCallbackWrapper<Void>() {
                @Override
                public void onResult(int code, Void result, Throwable exception) {
                    if (ResponseCode.RES_SUCCESS == code && recentContactFromDB != null) {
                        msgService.updateRecentAndNotify(recentContactFromDB);
                    }
                }
            });

        }
    }

    private View.OnClickListener onClickListener = new View.OnClickListener() {

        @Override
        public void onClick(View v) {
            if (v == addFriendBtn) {
                if (FLAG_ADD_FRIEND_DIRECTLY) {
                    doAddFriend(null, true);  // 直接加为好友
                } else {
                    onAddFriendByVerify(); // 发起好友验证请求
                }
            } else if (v == removeFriendBtn) {
                onRemoveFriend();
            } else if (v == chatBtn) {
                onChat();
            }
        }
    };

    /**
     * 通过验证方式添加好友
     */
    private void onAddFriendByVerify() {
        final EasyEditDialog requestDialog = new EasyEditDialog(this);
        requestDialog.setEditTextMaxLength(32);
        requestDialog.setTitle(getString(R.string.add_friend_verify_tip));
        requestDialog.addNegativeButtonListener(R.string.cancel, v -> requestDialog.dismiss());
        requestDialog.addPositiveButtonListener(R.string.send, v -> {
            requestDialog.dismiss();
            String msg = requestDialog.getEditMessage();
            doAddFriend(msg, false);
        });
        requestDialog.setOnCancelListener(dialog -> {
        });
        requestDialog.show();
    }

    @SuppressLint("CheckResult")
    private void doAddFriend(String msg, boolean addDirectly) {
        if (!NetworkUtil.isNetAvailable(this)) {
            ToastHelper.showToast(UserProfileActivity.this, R.string.network_is_not_available);
            return;
        }
        if (!TextUtils.isEmpty(account) && account.equals(DemoCache.getAccount())) {
            ToastHelper.showToast(UserProfileActivity.this, "不能加自己为好友");
            return;
        }
        RetrofitManager.create(ApiService.class).sendFriendApply(Constants.SP_USER_DATA.get("userCcid").getAsString(),userCcid,msg)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        switch (res.getCode()){
                            case 1:
                                IToastUtils.iToast("好友验证发送成功", Toast.LENGTH_SHORT);
                                break;
                            case -1:
                                IToastUtils.iToast("好友验证发送失败",Toast.LENGTH_SHORT);
                                break;
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast("好友验证发送失败",Toast.LENGTH_SHORT);
                    }
                });
//        final VerifyType verifyType = addDirectly ? VerifyType.DIRECT_ADD : VerifyType.VERIFY_REQUEST;
//        DialogMaker.showProgressDialog(this, "", true);
//        NIMClient.getService(FriendService.class).addFriend(new AddFriendData(account, verifyType, msg)).setCallback(
//                new RequestCallback<Void>() {
//
//                    @Override
//                    public void onSuccess(Void param) {
//                        DialogMaker.dismissProgressDialog();
//                        updateUserOperatorView();
//                        if (VerifyType.DIRECT_ADD == verifyType) {
//                            ToastHelper.showToast(UserProfileActivity.this, "添加好友成功");
//                        } else {
//                            ToastHelper.showToast(UserProfileActivity.this, "添加好友请求发送成功");
//                        }
//                    }
//
//                    @Override
//                    public void onFailed(int code) {
//                        DialogMaker.dismissProgressDialog();
//                        if (code == 408) {
//                            ToastHelper.showToast(UserProfileActivity.this, R.string.network_is_not_available);
//                        } else {
//                            ToastHelper.showToast(UserProfileActivity.this, "on failed:" + code);
//                        }
//                    }
//
//                    @Override
//                    public void onException(Throwable exception) {
//                        DialogMaker.dismissProgressDialog();
//                    }
//                });
        Log.i(TAG, "onAddFriendByVerify");
    }

    private void onRemoveFriend() {
        Log.i(TAG, "onRemoveFriend");
        if (!NetworkUtil.isNetAvailable(this)) {
            ToastHelper.showToast(UserProfileActivity.this, R.string.network_is_not_available);
            return;
        }
        EasyAlertDialog dialog = EasyAlertDialogHelper.createOkCancelDiolag(this, getString(R.string.remove_friend), getString(R.string.remove_friend_tip), true, new EasyAlertDialogHelper.OnDialogActionListener() {

            @Override
            public void doCancelAction() {
            }

            @Override
            public void doOkAction() {
                DialogMaker.showProgressDialog(UserProfileActivity.this, "", true);
                boolean deleteAlias = UserPreferences.isDeleteFriendAndDeleteAlias();
                NIMClient.getService(FriendService.class).deleteFriend(account, deleteAlias).setCallback(
                        new RequestCallback<Void>() {

                            @Override
                            public void onSuccess(Void param) {
                                DialogMaker.dismissProgressDialog();
                                ToastHelper.showToast(UserProfileActivity.this, R.string.remove_friend_success);
                                finish();
                            }

                            @Override
                            public void onFailed(int code) {
                                DialogMaker.dismissProgressDialog();
                                if (code == 408) {
                                    ToastHelper.showToast(UserProfileActivity.this, R.string.network_is_not_available);
                                } else {
                                    ToastHelper.showToast(UserProfileActivity.this, "on failed:" + code);
                                }
                            }

                            @Override
                            public void onException(Throwable exception) {
                                DialogMaker.dismissProgressDialog();
                            }
                        });
            }
        });
        if (!isFinishing() && !isDestroyedCompatible()) {
            dialog.show();
        }
    }

    private void onChat() {
        Log.i(TAG, "onChat");
        SessionHelper.startP2PSession(this, account);
    }
}

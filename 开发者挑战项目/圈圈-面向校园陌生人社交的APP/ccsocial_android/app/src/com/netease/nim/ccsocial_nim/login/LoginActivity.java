package com.netease.nim.ccsocial_nim.login;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.ColorStateList;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.StateListDrawable;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.Editable;
import android.text.InputFilter;
import android.text.InputType;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnKeyListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.content.res.AppCompatResources;


import com.blankj.utilcode.util.RegexUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.gyf.immersionbar.ImmersionBar;
import com.lzy.okgo.OkGo;
import com.netease.nim.ccsocial_nim.DemoCache;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.config.preference.Preferences;
import com.netease.nim.ccsocial_nim.config.preference.UserPreferences;
import com.netease.nim.ccsocial_nim.mainTab.MainActivity;
import com.netease.nim.ccsocial_nim.register.EduBindActivity;
import com.netease.nim.ccsocial_nim.register.InterestChooseActivity;
import com.netease.nim.ccsocial_nim.register.RegisterActivity;
import com.netease.nim.uikit.api.NimUIKit;
import com.netease.nim.uikit.common.ToastHelper;
import com.netease.nim.uikit.common.activity.UI;
import com.netease.nim.uikit.common.ui.dialog.DialogMaker;
import com.netease.nim.uikit.common.ui.dialog.EasyAlertDialogHelper;
import com.netease.nim.uikit.common.util.log.LogUtil;
import com.netease.nim.uikit.common.util.string.MD5;
import com.netease.nim.uikit.support.permission.MPermission;
import com.netease.nim.uikit.support.permission.annotation.OnMPermissionDenied;
import com.netease.nim.uikit.support.permission.annotation.OnMPermissionGranted;
import com.netease.nim.uikit.support.permission.annotation.OnMPermissionNeverAskAgain;
import com.netease.nimlib.sdk.AbortableFuture;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.RequestCallback;
import com.netease.nimlib.sdk.StatusBarNotificationConfig;
import com.netease.nimlib.sdk.auth.AuthService;
import com.netease.nimlib.sdk.auth.ClientType;
import com.netease.nimlib.sdk.auth.LoginInfo;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.UserBean;
import com.outman.framework.utils.NetUtils.bean.ResponseData;
import com.outman.framework.view.LodingView;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

/**
 * 登录/注册界面
 * <p/>
 * Created by huangjun on 2015/2/1.
 */
public class LoginActivity extends UI implements OnKeyListener, View.OnClickListener {

    private static final String TAG = LoginActivity.class.getSimpleName();

    private static final String KICK_OUT = "KICK_OUT";
    private static final String KICK_OUT_DESC = "KICK_OUT_DESC";

    private final int BASIC_PERMISSION_REQUEST_CODE = 110;

    private EditText text_login_phone;
    private ImageView img_login_code;
    private EditText text_login_code;
    private TextView btn_send_code;
    private TextView btn_register_to_login;
    private Button btn_login;
//    private ImageView img_login_type;//text_login_code_pwd_login
    private TextView btn_login_type;

    private ImageView img_login_read;

    private Boolean loginByPwd = false;//true为密码登录，false为验证码登录
    private Boolean isReadSure = false;//阅读确认

    private LodingView lodingView;

    private static final int H_TIME = 1001;
    private static int TIME = 60;
    private Handler mHandler = new Handler(new Handler.Callback() {
        @Override
        public boolean handleMessage(@NonNull Message msg) {
            switch (msg.what){
                case H_TIME:
                    TIME--;
                    btn_send_code.setText(TIME + "s");
                    if(TIME > 0){
                        mHandler.sendEmptyMessageDelayed(H_TIME,1000);
                    }else{
                        btn_send_code.setEnabled(true);
                        btn_send_code.setText(getString(R.string.text_login_send));
                        TIME = 60;
                    }
                    break;
            }
            return false;
        }
    });

    private AbortableFuture<LoginInfo> loginRequest;

    private boolean registerMode = false; // 注册模式

    private boolean registerPanelInited = false; // 注册面板是否初始化

    public static void start(Context context) {
        start(context, false, "");
    }

    public static void start(Context context, boolean kickOut, String kickOutDesc) {
        Intent intent = new Intent(context, LoginActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        intent.putExtra(KICK_OUT, kickOut);
        intent.putExtra(KICK_OUT_DESC, kickOutDesc);
        context.startActivity(intent);
    }

    @Override
    protected boolean displayHomeAsUpEnabled() {
        return false;
    }

    @Override
    public boolean onKey(View v, int keyCode, KeyEvent event) {
        return false;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ImmersionBar.with(this)
                .statusBarDarkFont(true)
                .fitsSystemWindows(true)  //使用该属性,必须指定状态栏颜色
                .navigationBarColor(R.color.colorWhite)
                .navigationBarDarkIcon(true)
                .statusBarColor(R.color.colorWhite)
                .init();

        requestBasicPermission();
        onParseIntent();
//        initRightTopBtn();
//        initLeftTopBtn();
        setupLoginPanel();
//        setupRegisterPanel();
    }

    /**
     * 基本权限管理
     */
    private final String[] BASIC_PERMISSIONS = new String[]{
            Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE};

    private void requestBasicPermission() {
        MPermission.with(LoginActivity.this).setRequestCode(BASIC_PERMISSION_REQUEST_CODE)
                   .permissions(BASIC_PERMISSIONS).request();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        MPermission.onRequestPermissionsResult(this, requestCode, permissions, grantResults);
    }

    @OnMPermissionGranted(BASIC_PERMISSION_REQUEST_CODE)
    public void onBasicPermissionSuccess() {
        ToastHelper.showToast(this, "授权成功");
    }

    @OnMPermissionDenied(BASIC_PERMISSION_REQUEST_CODE)
    @OnMPermissionNeverAskAgain(BASIC_PERMISSION_REQUEST_CODE)
    public void onBasicPermissionFailed() {
        ToastHelper.showToast(this, "授权失败");
    }

    private void onParseIntent() {
        if (!getIntent().getBooleanExtra(KICK_OUT, false)) {
            return;
        }

        String desc = getIntent().getStringExtra(KICK_OUT_DESC);
        if (!TextUtils.isEmpty(desc)) {
            EasyAlertDialogHelper.showOneButtonDiolag(LoginActivity.this,
                    getString(R.string.kickout_notify), desc, getString(R.string.ok),
                    true, null);
            return;
        }

        int type = NIMClient.getService(AuthService.class).getKickedClientType();
        int customType = NIMClient.getService(AuthService.class).getKickedCustomClientType();
        String client;
        switch (type) {
            case ClientType.Web:
                client = "网页端";
                break;
            case ClientType.Windows:
            case ClientType.MAC:
                client = "电脑端";
                break;
            case ClientType.REST:
                client = "服务端";
                break;
            default:
                client = "移动端";
                break;
        }
        EasyAlertDialogHelper.showOneButtonDiolag(LoginActivity.this,
                                                  getString(R.string.kickout_notify),
                                                  String.format(getString(R.string.kickout_content),
                                                                client + customType), getString(R.string.ok),
                                                  true, null);

    }

    /**
     * 登录面板
     */
    @SuppressLint("ResourceAsColor")
    private void setupLoginPanel() {
        text_login_phone = (EditText) findViewById(R.id.text_edu_user);
        img_login_code = (ImageView) findViewById(R.id.img_edu_pwd);
        text_login_code = (EditText) findViewById(R.id.text_edu_pwd);
        text_login_code.setInputType(InputType.TYPE_CLASS_NUMBER|InputType.TYPE_NUMBER_VARIATION_PASSWORD);

        text_login_phone.setFilters(new InputFilter[]{new InputFilter.LengthFilter(11)});
        text_login_code.setFilters(new InputFilter[]{new InputFilter.LengthFilter(26)});
        text_login_phone.addTextChangedListener(textWatcher);
        text_login_code.addTextChangedListener(textWatcher);

        btn_send_code = (TextView) findViewById(R.id.btn_send_code);
        btn_register_to_login = (TextView)findView(R.id.btn_register_to_login);
        btn_register_to_login.setOnClickListener(this);
        btn_login = (Button) findViewById(R.id.btn_register);
        btn_send_code.setOnClickListener(this);

        //登录静默状态设置
        StateListDrawable shapeColor = (StateListDrawable)btn_login.getBackground();
        Drawable current = shapeColor.getCurrent();
        GradientDrawable gradientDrawable = (GradientDrawable) current;
        gradientDrawable.setColor(R.color.colorPrimaryGray);
        btn_login.setEnabled(false);
        btn_login.setOnClickListener(this);

        btn_login_type = (TextView) findViewById(R.id.btn_login_type);
        img_login_read = (ImageView) findViewById(R.id.img_login_read);

        lodingView = new LodingView(this);

        //TODO 为方便登录，默认登录账号密码+默认勾选阅读
        text_login_phone.setText("13563385918");
        loginType();
        text_login_code.setText("123456");
        readSure();

        if(Constants.SP_USER_DATA != null){
            text_login_phone.setText(Constants.SP_USER_DATA.get("userPhone").getAsString());
        }
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View v) {
        System.out.println(v.getId());
        switch (v.getId()) {
            case R.id.btn_send_code:
                sendSMS();
                break;
            case R.id.btn_register:
                System.out.println("登录");
                getLoginInfo(v.getContext());
                break;
            case R.id.btn_register_to_login:
            case R.id.img_register_arrow:
                goToRegister();
                break;
            case R.id.btn_login_type:
                System.out.println("手机密码登录");
                loginType();
                break;
            case R.id.img_login_read:
                System.out.println("确认阅读");
                readSure();
                break;
        }
    }

    private void readSure() {
        isReadSure = !isReadSure;
        if(isReadSure){
            img_login_read.setImageResource(R.drawable.icon_login_sure_b);
            IToastUtils.iToast("已同意用户协议", Toast.LENGTH_SHORT);

        }else{
            img_login_read.setImageResource(R.drawable.icon_login_sure_g);
            IToastUtils.iToast("未同意用户协议", Toast.LENGTH_SHORT);

        }
    }


    /**
     * 登录
     */
    @SuppressLint("CheckResult")
    private void getLoginInfo(Context context) {
        String user = text_login_phone.getText().toString().trim();
        String pwd = text_login_code.getText().toString().trim();

        if(user.equals("")){
            IToastUtils.iToast(R.string.text_login_phone_null,Toast.LENGTH_SHORT);
            return;
        }
        if(pwd.equals("")){
            IToastUtils.iToast(loginByPwd?R.string.text_login_pw_null:R.string.text_login_code_null,Toast.LENGTH_SHORT);
            return;
        }
        if(!isReadSure){
            IToastUtils.iToast(R.string.text_login_not_sure,Toast.LENGTH_SHORT);
            return;
        }
        lodingView.show("正在登录...");
        if(loginByPwd){
            //构建body
            UserBean userdata = new UserBean();
            userdata.setUserPhone(user);
            userdata.setUserPassword(pwd);
            userdata.setCode(pwd);

            RetrofitManager.create(ApiService.class).userLogin(userdata)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(new Consumer<ResponseData>() {
                        @Override
                        public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                            System.out.println(res.getCode());
                            System.out.println(res.getData());
                            System.out.println(res.getMsg());
                            Intent intent = new Intent();
                            switch (res.getCode()){
                                case 1:
                                    lodingView.hide();
                                    IToastUtils.iToast(R.string.text_login_success,Toast.LENGTH_SHORT);
                                    Gson gson = new Gson();
                                    JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                                    Constants.SP_USER_DATA = jsonObject.getAsJsonObject("userInfo");
                                    Constants.SP_TOKEN = jsonObject.get("token").getAsString();
                                    login();//网易登录
                                    finish();
                                    break;
                                case -1:
                                    lodingView.hide();
                                    IToastUtils.iToast(R.string.login_failed,Toast.LENGTH_SHORT);
                                    break;
                                case -2:
                                    lodingView.hide();
                                    IToastUtils.iToast(R.string.text_login_phone_no_register,Toast.LENGTH_SHORT);
                                    break;
                                case -3:
                                    lodingView.hide();
                                    IToastUtils.iToast(R.string.text_login_phone_no_pwd,Toast.LENGTH_SHORT);
                                    break;
                            }
                        }
                    }, new Consumer<Throwable>() {
                        @Override
                        public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                            System.out.println(throwable);
                            lodingView.hide();
                            IToastUtils.iToast(R.string.text_login_fail,Toast.LENGTH_SHORT);
                        }
                    });
        }else{
            RetrofitManager.create(ApiService.class).userLoginByPhone(pwd,user)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(new Consumer<ResponseData>() {
                        @Override
                        public void accept(@io.reactivex.annotations.NonNull ResponseData res) {
                            System.out.println(res.getCode());
                            System.out.println(res.getData());
                            System.out.println(res.getMsg());
                            Intent intent = new Intent();
                            switch (res.getCode()) {
                                case 1:
                                    lodingView.hide();
                                    IToastUtils.iToast(R.string.text_login_success,Toast.LENGTH_SHORT);
                                    Gson gson = new Gson();
                                    JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                                    System.out.println(jsonObject);
                                    Constants.SP_USER_DATA = jsonObject.getAsJsonObject("userInfo");
                                    Constants.SP_TOKEN = jsonObject.get("token").getAsString();
                                    login();//网易登录
                                    break;
                                case -1:
                                    lodingView.hide();
                                    IToastUtils.iToast("用户密码未设置", Toast.LENGTH_SHORT);//未设置密码
                                    break;
                                case -2:
                                    lodingView.hide();
                                    IToastUtils.iToast("未注册", Toast.LENGTH_SHORT);//未注册
                                    break;
                                case -3:
                                    lodingView.hide();
                                    IToastUtils.iToast(R.string.text_login_code_error, Toast.LENGTH_SHORT);//验证码错误
                                    break;
                            }
                        }
                    }, new Consumer<Throwable>() {
                        @Override
                        public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                            System.out.println(throwable);
                            IToastUtils.iToast(R.string.text_login_fail,Toast.LENGTH_SHORT);
                        }
                    });
        }

    }

    /**
     * 注册
     */
    private void goToRegister() {
        startActivity(new Intent(getBaseContext(), RegisterActivity.class));
    }
    /**
     * 登录类型切换
     */
    private void loginType() {
        loginByPwd = ! loginByPwd;
        text_login_code.setText("");
        if(loginByPwd){

            img_login_code.setImageResource(R.drawable.icon_login_pwd);
            text_login_code.setHint(R.string.text_login_password);
            text_login_code.setInputType(InputType.TYPE_CLASS_TEXT|InputType.TYPE_TEXT_VARIATION_PASSWORD);
            btn_send_code.setVisibility(View.GONE);
            btn_login_type.setText(R.string.text_login_code_pwd_login);

        }else{
            img_login_code.setImageResource(R.drawable.icon_login_code);
            text_login_code.setHint(R.string.text_login_code);
            text_login_code.setInputType(InputType.TYPE_CLASS_NUMBER|InputType.TYPE_NUMBER_VARIATION_PASSWORD);
            btn_send_code.setVisibility(View.VISIBLE);
            btn_login_type.setText(R.string.text_login_phone_pwd_login);
        }

    }

    /**
     * 发送验证码
     */
    @SuppressLint("CheckResult")
    private void sendSMS(){
        String phone = text_login_phone.getText().toString().trim();
        if(TextUtils.isEmpty(phone)){
            IToastUtils.iToast(R.string.text_login_phone_null,Toast.LENGTH_SHORT);
            return;
        }else if(!RegexUtils.isMobileExact(phone)){
            IToastUtils.iToast(R.string.text_login_phone_error,Toast.LENGTH_SHORT);
            return;
        }
        System.out.println("发送验证码");
        btn_send_code.setEnabled(false);
        mHandler.sendEmptyMessage(H_TIME);
        RetrofitManager.create(ApiService.class).userSendCode(phone)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) {
                        System.out.println(res.getCode());
                        System.out.println(res.getData());
                        System.out.println(res.getMsg());
                        if(res.getCode() == 1){
                            //TODO
                            IToastUtils.iToast(R.string.text_send_code_success,Toast.LENGTH_SHORT);
                            IToastUtils.iToastHead("模拟验证码0000", Toast.LENGTH_LONG);
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

    private TextWatcher textWatcher = new TextWatcher() {

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
        }

        @Override
        public void afterTextChanged(Editable s) {
            if (registerMode) {
                return;
            }
            boolean isEnable = text_login_phone.getText().length() > 0 &&
                               text_login_code.getText().length() > 0;
            System.out.println(isEnable);
            updateLoginBtn(btn_login, isEnable);
        }
    };

    private void updateLoginBtn(TextView loginBtn, boolean isEnable) {
        if(isEnable){
//            loginBtn.setBackgroundResource(R.drawable.shape_circle);
            StateListDrawable shapeColor = (StateListDrawable)btn_login.getBackground();
            Drawable current = shapeColor.getCurrent();
            GradientDrawable gradientDrawable = (GradientDrawable) current;
            ColorStateList color = AppCompatResources.getColorStateList(OkGo.getContext(), R.color.colorPrimaryBlue);
            gradientDrawable.setColor(color);
            loginBtn.setEnabled(isEnable);
        }else{
            StateListDrawable shapeColor = (StateListDrawable)btn_login.getBackground();
            Drawable current = shapeColor.getCurrent();
            GradientDrawable gradientDrawable = (GradientDrawable) current;
            ColorStateList color = AppCompatResources.getColorStateList(OkGo.getContext(), R.color.colorPrimaryGray);
            gradientDrawable.setColor(color);
            btn_login.setEnabled(isEnable);
        }

//        loginBtn.setTextColor(getResources().getColor(R.color.color_blue_0888ff));
//        loginBtn.setPadding(ScreenUtil.dip2px(10), 0, ScreenUtil.dip2px(10), 0);
    }

    /**
     * ***************************************** 登录 **************************************
     */
    private void login() {
//        DialogMaker.showProgressDialog(this, null, getString(R.string.logining), true, dialog -> {
//            if (loginRequest != null) {
//                loginRequest.abort();
//                onLoginDone();
//            }
//        }).setCanceledOnTouchOutside(false);
        if (loginRequest != null) {
            loginRequest.abort();
            onLoginDone();
        }
        final String account = Constants.SP_USER_DATA.get("userAccid").getAsString();
        final String token = Constants.SP_TOKEN;
        int subtype = 0;

        // 登录     "outman","123456"
        loginRequest = NimUIKit.login(new LoginInfo(account, token, null, subtype),
                                      new RequestCallback<LoginInfo>() {

                                          @Override
                                          public void onSuccess(LoginInfo param) {
                                              LogUtil.i(TAG, "login success");
                                              onLoginDone();
                                              DemoCache.setAccount(account);
                                              saveLoginInfo(account, token);
                                              // 初始化消息提醒配置
                                              initNotificationConfig();
                                              Intent intent = new Intent();
                                              if (!Constants.SP_USER_DATA.has("userHobbies")){
                                                  intent.setClass(LoginActivity.this, InterestChooseActivity.class);
                                              }else if(!Constants.SP_USER_DATA.has(("userEducationalId"))){
                                                  intent.setClass(LoginActivity.this, EduBindActivity.class);
                                              }else{
                                                  intent.setClass(LoginActivity.this, MainActivity.class);
//                                                  MainActivity.start(LoginActivity.this,null);
                                              }
                                              startActivity(intent);
//                                              finish();
                                          }

                                          @Override
                                          public void onFailed(int code) {
                                              onLoginDone();
                                              if (code == 302 || code == 404) {
                                                  ToastHelper.showToast(LoginActivity.this,
                                                                        R.string.login_failed);
                                              } else {
                                                  ToastHelper.showToast(LoginActivity.this,
                                                                        "登录失败: " + code);
                                              }
                                          }

                                          @Override
                                          public void onException(Throwable exception) {
                                              ToastHelper.showToast(LoginActivity.this,
                                                                    R.string.login_exception);
                                              onLoginDone();
                                          }
                                      });
    }

    private void initNotificationConfig() {
        // 初始化消息提醒
        NIMClient.toggleNotification(UserPreferences.getNotificationToggle());
        // 加载状态栏配置
        StatusBarNotificationConfig statusBarNotificationConfig = UserPreferences.getStatusConfig();
        if (statusBarNotificationConfig == null) {
            statusBarNotificationConfig = DemoCache.getNotificationConfig();
            UserPreferences.setStatusConfig(statusBarNotificationConfig);
        }
        // 更新配置
        NIMClient.updateStatusBarNotificationConfig(statusBarNotificationConfig);
    }

    private void onLoginDone() {
        loginRequest = null;
        DialogMaker.dismissProgressDialog();
    }

    private void saveLoginInfo(final String account, final String token) {
        Preferences.saveUserAccount(account);
        Preferences.saveUserToken(token);
    }

    //DEMO中使用 username 作为 NIM 的account ，md5(password) 作为 token
    //开发者需要根据自己的实际情况配置自身用户系统和 NIM 用户系统的关系
    private String tokenFromPassword(String password) {
        String appKey = readAppKey(this);
        boolean isDemo = "45c6af3c98409b18a84451215d0bdd6e".equals(appKey) ||
                         "fe416640c8e8a72734219e1847ad2547".equals(appKey) ||
                         "a24e6c8a956a128bd50bdffe69b405ff".equals(appKey);
        return isDemo ? MD5.getStringMD5(password) : password;
    }

    private static String readAppKey(Context context) {
        try {
            ApplicationInfo appInfo = context.getPackageManager().getApplicationInfo(
                    context.getPackageName(), PackageManager.GET_META_DATA);
            if (appInfo != null) {
                return appInfo.metaData.getString("com.netease.nim.appKey");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}

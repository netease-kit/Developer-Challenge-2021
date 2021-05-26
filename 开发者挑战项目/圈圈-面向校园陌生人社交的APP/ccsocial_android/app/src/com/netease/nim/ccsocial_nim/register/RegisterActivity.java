package com.netease.nim.ccsocial_nim.register;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.ColorStateList;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.StateListDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore;
import android.text.Editable;
import android.text.InputType;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.content.res.AppCompatResources;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import com.blankj.utilcode.util.RegexUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import com.gyf.immersionbar.ImmersionBar;
import com.lzy.okgo.OkGo;
import com.netease.nim.ccsocial_nim.DemoCache;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.config.preference.Preferences;
import com.netease.nim.ccsocial_nim.config.preference.UserPreferences;
import com.netease.nim.ccsocial_nim.login.LoginActivity;
import com.netease.nim.ccsocial_nim.mainTab.MainActivity;
import com.netease.nim.ccsocial_nim.mainTab.fragment.ContactFragment.activity.UserProfileSettingActivity;
import com.netease.nim.ccsocial_nim.mainTab.fragment.ContactFragment.helper.UserUpdateHelper;
import com.netease.nim.uikit.api.NimUIKit;
import com.netease.nim.uikit.api.model.SimpleCallback;
import com.netease.nim.uikit.business.session.actions.PickImageAction;
import com.netease.nim.uikit.common.ToastHelper;
import com.netease.nim.uikit.common.ui.dialog.DialogMaker;
import com.netease.nim.uikit.common.util.log.LogUtil;
import com.netease.nimlib.sdk.AbortableFuture;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.RequestCallback;
import com.netease.nimlib.sdk.RequestCallbackWrapper;
import com.netease.nimlib.sdk.ResponseCode;
import com.netease.nimlib.sdk.StatusBarNotificationConfig;
import com.netease.nimlib.sdk.auth.LoginInfo;
import com.netease.nimlib.sdk.nos.NosService;
import com.netease.nimlib.sdk.uinfo.constant.UserInfoFieldEnum;
import com.netease.nimlib.sdk.uinfo.model.NimUserInfo;
import com.outman.framework.base.BaseUIActivity;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.Image2File;
import com.outman.framework.utils.ImageCompress;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.UserBean;
import com.outman.framework.utils.NetUtils.bean.ResponseData;
import com.outman.framework.view.ImageClipView.CircleImageView;
import com.outman.framework.view.LodingView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;

import static com.outman.framework.utils.FileUtil.getRealFilePathFromUri;
import static com.outman.framework.utils.fixInputMethodManagerLeak.fixInputMethodManagerLeak;
import static java.lang.System.currentTimeMillis;

public class RegisterActivity extends BaseUIActivity implements View.OnClickListener {
    private AbortableFuture<LoginInfo> loginRequest;
    // constant
    private static final int PICK_AVATAR_REQUEST = 0x0E;
    private static final int AVATAR_TIME_OUT = 30000;
//    头像
    private CircleImageView headImage;
    private TextView textChoosePhoto;
    //调用照相机返回图片文件
    private File tempFile;
    private Bitmap resultBitmap;
    private LodingView lodingView;
    //请求相机
    public static final int REQUEST_CAPTURE = 100;
    //请求相册
    public static final int REQUEST_PICK = 101;
    //请求截图
    public static final int REQUEST_CROP_PHOTO = 102;
    //请求访问外部存储
    public static final int READ_EXTERNAL_STORAGE_REQUEST_CODE = 103;
    //请求写入外部存储
    public static final int WRITE_EXTERNAL_STORAGE_REQUEST_CODE = 104;
//    布局
    private TextView registerLabel;
    private ImageView imgRegisterUser;
    private EditText textRegisterPhone;
    private ImageView imgRegisterCode;
    private EditText textRegisterCode;
    private TextView btnSendCode;
    private ImageView imgRegisterPwd;
    private EditText textRegisterPwd;
    private Button btnRegister;
    private TextView btnRegisterToLogin;
    private ImageView imgRegisterArrow;
    private ImageView imgRegisterRead;
    private TextView textRegisterRead;
    private TextView btnRegisterRead;

    private Boolean isReadSure = false;//阅读确认

    // data
    AbortableFuture<String> uploadAvatarFuture;
    private NimUserInfo userInfo;

    private static final int H_TIME = 1001;
    private static int TIME = 60;
    private Handler mHandler = new Handler(new Handler.Callback() {
        @Override
        public boolean handleMessage(@NonNull Message msg) {
            switch (msg.what){
                case H_TIME:
                    TIME--;
                    btnSendCode.setText(TIME + "s");
                    if(TIME > 0){
                        mHandler.sendEmptyMessageDelayed(H_TIME,1000);
                    }else{
                        btnSendCode.setEnabled(true);
                        btnSendCode.setText(getString(R.string.text_login_send));
                        TIME = 60;
                    }
                    break;
            }
            return false;
        }
    });



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        ImmersionBar.with(this)
                .statusBarDarkFont(true)
                .fitsSystemWindows(true)  //使用该属性,必须指定状态栏颜色
                .navigationBarColor(R.color.colorWhite)
                .navigationBarDarkIcon(true)
                .statusBarColor(R.color.colorWhite)
                .init();
        initView();
        initData();

    }

    private void initData() {
        Resources res = getResources();
        BitmapDrawable d = (BitmapDrawable) res.getDrawable(R.drawable.icon_default_boy);
        Bitmap img = d.getBitmap();

        String fn = "icon_default_boy.jpg";
//        //创建拍照存储的图片文件
        File fileDir = new File( Environment.getExternalStorageDirectory(),"image");
        if(!fileDir.exists()){
            fileDir.getParentFile().mkdir();
        }
        String path =fileDir.getPath() + System.currentTimeMillis() + ".jpg" ;
        try{
            OutputStream os = new FileOutputStream(path);
            img.compress(Bitmap.CompressFormat.JPEG, 100, os);
            os.close();
        }catch(Exception e){
            Log.e("TAG", "", e);
        }
        tempFile = new File(path);
    }

    @Override
    protected void onStart() {
        super.onStart();
        TIME = 60;
    }

    private void initView() {
        registerLabel = (TextView) findViewById(R.id.edu_bind_label);
        imgRegisterUser = (ImageView) findViewById(R.id.img_edu_user);
        textRegisterPhone = (EditText) findViewById(R.id.text_edu_user);
        imgRegisterCode = (ImageView) findViewById(R.id.img_edu_pwd);
        textRegisterCode = (EditText) findViewById(R.id.text_edu_pwd);
        btnSendCode = (TextView) findViewById(R.id.btn_send_code);
        imgRegisterPwd = (ImageView) findViewById(R.id.img_register_pwd);
        textRegisterPwd = (EditText) findViewById(R.id.text_register_pwd);
        btnRegister = (Button) findViewById(R.id.btn_register);
        btnRegisterToLogin = (TextView) findViewById(R.id.btn_register_to_login);
        imgRegisterArrow = (ImageView) findViewById(R.id.img_register_arrow);
        imgRegisterRead = (ImageView) findViewById(R.id.img_register_read);
        textRegisterRead = (TextView) findViewById(R.id.text_register_read);
        btnRegisterRead = (TextView) findViewById(R.id.btn_register_read);

        textRegisterCode.setInputType(InputType.TYPE_CLASS_NUMBER|InputType.TYPE_NUMBER_VARIATION_PASSWORD);
        textRegisterPwd.setInputType(InputType.TYPE_CLASS_NUMBER|InputType.TYPE_NUMBER_VARIATION_PASSWORD);

        textRegisterPhone.addTextChangedListener(textWatcher);
        textRegisterPwd.addTextChangedListener(textWatcher);
        textRegisterCode.addTextChangedListener(textWatcher);

        headImage = (CircleImageView) findViewById(R.id.img_head_image);
        textChoosePhoto = (TextView) findViewById(R.id.text_choose_photo);
        btnRegister.setOnClickListener(this);
        imgRegisterRead.setOnClickListener(this);
        headImage.setOnClickListener(this);
        textChoosePhoto.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.btn_send_code:
                sendSMS();
                break;
            case R.id.btn_register_to_login:
            case R.id.img_register_arrow:
                goTologin();
                break;
            case R.id.btn_register:
                register();
                break;
            case  R.id.text_choose_photo:
            case R.id.img_head_image:
                uploadHeadImage();
                break;
            case R.id.img_register_read:
                System.out.println("确认阅读");
                readSure();
                break;
        }
    }

    private void goTologin() {
        startActivity(new Intent(getBaseContext(), LoginActivity.class));
        finish();
    }

    private void readSure() {
        isReadSure = !isReadSure;
        if(isReadSure){
            imgRegisterRead.setImageResource(R.drawable.icon_login_sure_b);
            IToastUtils.iToast("已同意用户协议", Toast.LENGTH_SHORT);

        }else{
            imgRegisterRead.setImageResource(R.drawable.icon_login_sure_g);
            IToastUtils.iToast("未同意用户协议", Toast.LENGTH_SHORT);

        }
    }

    @SuppressLint("CheckResult")
    private void register() {
        String user = textRegisterPhone.getText().toString().trim();
        String code = textRegisterCode.getText().toString().trim();
        String pwd = textRegisterPwd.getText().toString().trim();


        if(user.equals("")){
            IToastUtils.iToast(R.string.text_login_phone_null,Toast.LENGTH_SHORT);
            return;
        }
        if(pwd.equals("")){
            IToastUtils.iToast(R.string.text_login_pw_null,Toast.LENGTH_SHORT);
            return;
        }
        if(code.equals("")){
            IToastUtils.iToast(R.string.text_login_code_null,Toast.LENGTH_SHORT);
            return;
        }
        if(!isReadSure){
            IToastUtils.iToast(R.string.text_login_not_sure,Toast.LENGTH_SHORT);
            return;
        }
        //构建body
        UserBean userdata = new UserBean();
        userdata.setUserPhone(user);
        userdata.setUserPassword(pwd);
        lodingView = new LodingView(this);
        RetrofitManager.create(ApiService.class).userRegister(code,userdata)
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
                                IToastUtils.iToast(R.string.text_register_success,Toast.LENGTH_SHORT);

                                lodingView.show("正在登录...");
                                Gson gson = new Gson();
                                JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                                Constants.SP_USER_DATA = jsonObject.getAsJsonObject("userInfo");
                                Constants.SP_TOKEN = jsonObject.get("token").getAsString();
                                //直接登录
                                new Thread(){
                                    @Override
                                    public void run() {
                                        uploadImg();
                                        login();
                                    }
                                }.start();
                                lodingView.hide();
                                break;
                            case -1:
                                IToastUtils.iToast(R.string.text_register_phone_fail,Toast.LENGTH_SHORT);
                                break;
                            case -2:
                                IToastUtils.iToast(R.string.text_login_code_error,Toast.LENGTH_SHORT);
                                break;
                            case -3:
                                IToastUtils.iToast(R.string.text_register_fail,Toast.LENGTH_SHORT);
                                break;

                        }

                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast(R.string.text_register_fail,Toast.LENGTH_SHORT);
                    }
                });
    }
    /**
     * 更新头像
     */
    private void updateAvatar(File file) {

        DialogMaker.showProgressDialog(this, null, null, true, new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                cancelUpload(R.string.user_info_update_cancel);
            }
        }).setCanceledOnTouchOutside(true);

        new Handler().postDelayed(outimeTask, AVATAR_TIME_OUT);
        uploadAvatarFuture = NIMClient.getService(NosService.class).upload(file, PickImageAction.MIME_JPEG);
        uploadAvatarFuture.setCallback(new RequestCallbackWrapper<String>() {
            @Override
            public void onResult(int code, String url, Throwable exception) {
                if (code == ResponseCode.RES_SUCCESS && !TextUtils.isEmpty(url)) {
                    UserUpdateHelper.update(UserInfoFieldEnum.AVATAR, url, new RequestCallbackWrapper<Void>() {
                        @Override
                        public void onResult(int code, Void result, Throwable exception) {
                            if (code == ResponseCode.RES_SUCCESS) {
                                ToastHelper.showToast(RegisterActivity.this, R.string.head_update_success);
                            } else {
                                ToastHelper.showToast(RegisterActivity.this, R.string.head_update_failed);
                            }
                        }
                    }); // 更新资料
                } else {
                    ToastHelper.showToast(RegisterActivity.this, R.string.user_info_update_failed);
                }
            }
        });
    }

    private void cancelUpload(int resId) {
        if (uploadAvatarFuture != null) {
            uploadAvatarFuture.abort();
            ToastHelper.showToast(RegisterActivity.this, resId);
        }
    }
    private Runnable outimeTask = new Runnable() {
        @Override
        public void run() {
            cancelUpload(R.string.user_info_update_failed);
        }
    };


    /**
     * ***************************************** 登录 **************************************
     */
    private void login() {
        System.out.println(Constants.SP_USER_DATA.toString());
        System.out.println(Constants.SP_TOKEN);
        final String account = Constants.SP_USER_DATA.get("userAccid").getAsString();
        final String token = Constants.SP_TOKEN;
        int subtype = 0;

        if (loginRequest != null) {
            loginRequest.abort();
            onLoginDone();
        }

        // 登录     "outman","123456"
        loginRequest = NimUIKit.login(new LoginInfo(account, token, null, subtype),
                new RequestCallback<LoginInfo>() {

                    @Override
                    public void onSuccess(LoginInfo param) {
                        onLoginDone();
                        DemoCache.setAccount(account);
                        saveLoginInfo(account, token);
                        // 初始化消息提醒配置
                        initNotificationConfig();
                        Intent intent = new Intent();
                        if (!Constants.SP_USER_DATA.has("userHobbies")){//  userMajorId
                            intent.setClass(RegisterActivity.this, InterestChooseActivity.class);
                        }else if(!Constants.SP_USER_DATA.has(("userEducationalId"))){
                            intent.setClass(RegisterActivity.this, EduBindActivity.class);
                        }else{
                            intent.setClass(RegisterActivity.this, MainActivity.class);
//                                                  MainActivity.start(LoginActivity.this,null);
                        }
                        startActivity(intent);
                        finish();
                    }

                    @Override
                    public void onFailed(int code) {
                        onLoginDone();
                        System.out.println(code);
                        if (code == 302 || code == 404) {
                            ToastHelper.showToast(RegisterActivity.this,
                                    R.string.login_failed);
                        } else {
                            ToastHelper.showToast(RegisterActivity.this,
                                    "登录失败: " + code);
                        }
                    }

                    @Override
                    public void onException(Throwable exception) {
                        ToastHelper.showToast(RegisterActivity.this,
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

    @SuppressLint("CheckResult")
    private void sendSMS() {
        String phone = textRegisterPhone.getText().toString().trim();
        if(TextUtils.isEmpty(phone)){
            IToastUtils.iToast(R.string.text_login_phone_null, Toast.LENGTH_SHORT);
            return;
        }else if(!RegexUtils.isMobileExact(phone)){
            IToastUtils.iToast(R.string.text_login_phone_error,Toast.LENGTH_SHORT);
            return;
        }
        System.out.println("发送验证码");
        btnSendCode.setEnabled(false);
        mHandler.sendEmptyMessage(H_TIME);
        RetrofitManager.create(ApiService.class).userSendCode(phone)
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
                                IToastUtils.iToast(R.string.text_send_code_success,Toast.LENGTH_SHORT);
                                IToastUtils.iToastHead("模拟验证码0000", Toast.LENGTH_LONG);
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
    /**
     * 上传头像
     */
    private void uploadHeadImage() {
        View view = LayoutInflater.from(this).inflate(R.layout.layout_clip_popupwindow, null);
        TextView btnCarema = (TextView) view.findViewById(R.id.btn_camera);
        TextView btnPhoto = (TextView) view.findViewById(R.id.btn_photo);
        TextView btnCancel = (TextView) view.findViewById(R.id.btn_cancel);
        final PopupWindow popupWindow = new PopupWindow(view, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        popupWindow.setBackgroundDrawable(getResources().getDrawable(android.R.color.transparent));
        popupWindow.setOutsideTouchable(true);
        View parent = LayoutInflater.from(this).inflate(R.layout.activity_main, null);
        popupWindow.showAtLocation(parent, Gravity.BOTTOM, 0, 0);
        //popupWindow在弹窗的时候背景半透明
        final WindowManager.LayoutParams params = getWindow().getAttributes();
        params.alpha = 0.5f;
        getWindow().setAttributes(params);
        popupWindow.setOnDismissListener(new PopupWindow.OnDismissListener() {
            @Override
            public void onDismiss() {
                params.alpha = 1.0f;
                getWindow().setAttributes(params);
            }
        });

        btnCarema.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //权限判断
                if (ContextCompat.checkSelfPermission(RegisterActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                        != PackageManager.PERMISSION_GRANTED) {
                    //申请WRITE_EXTERNAL_STORAGE权限
                    ActivityCompat.requestPermissions(RegisterActivity.this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                            WRITE_EXTERNAL_STORAGE_REQUEST_CODE);
                } else {
                    //跳转到调用系统相机
                    gotoCamera();
                }
                popupWindow.dismiss();
            }
        });
        btnPhoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //权限判断
                if (ContextCompat.checkSelfPermission(RegisterActivity.this, Manifest.permission.READ_EXTERNAL_STORAGE)
                        != PackageManager.PERMISSION_GRANTED) {
                    //申请READ_EXTERNAL_STORAGE权限
                    ActivityCompat.requestPermissions(RegisterActivity.this, new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                         READ_EXTERNAL_STORAGE_REQUEST_CODE);
                } else {
                    //跳转到相册
                    gotoPhoto();
                }
                popupWindow.dismiss();
            }
        });
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                popupWindow.dismiss();
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
            boolean isEnable = textRegisterPhone.getText().length() > 0 &&
                    textRegisterCode.getText().length() > 0 &&
                    textRegisterPwd.getText().length() > 0;
            System.out.println(isEnable);
            updateLoginBtn(btnRegister, isEnable);
        }
    };
    private void updateLoginBtn(TextView loginBtn, boolean isEnable) {
        if(isEnable){
//            loginBtn.setBackgroundResource(R.drawable.shape_circle);
            StateListDrawable shapeColor = (StateListDrawable)btnRegister.getBackground();
            Drawable current = shapeColor.getCurrent();
            GradientDrawable gradientDrawable = (GradientDrawable) current;
            ColorStateList color = AppCompatResources.getColorStateList(OkGo.getContext(), R.color.colorPrimaryBlue);
            gradientDrawable.setColor(color);
            loginBtn.setEnabled(isEnable);
        }else{
            StateListDrawable shapeColor = (StateListDrawable)btnRegister.getBackground();
            Drawable current = shapeColor.getCurrent();
            GradientDrawable gradientDrawable = (GradientDrawable) current;
            ColorStateList color = AppCompatResources.getColorStateList(OkGo.getContext(), R.color.colorPrimaryGray);
            gradientDrawable.setColor(color);
            btnRegister.setEnabled(isEnable);
        }

//        loginBtn.setTextColor(getResources().getColor(R.color.color_blue_0888ff));
//        loginBtn.setPadding(ScreenUtil.dip2px(10), 0, ScreenUtil.dip2px(10), 0);
    }

    /**
     * 外部存储权限申请返回
     */
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == WRITE_EXTERNAL_STORAGE_REQUEST_CODE) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission Granted
                gotoCamera();
            }
        } else if (requestCode == READ_EXTERNAL_STORAGE_REQUEST_CODE) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission Granted
                gotoPhoto();
            }
        }
    }


    /**
     * 跳转到相册
     */
    private void gotoPhoto() {
        System.out.println( "*****************打开图库********************");
        //跳转到调用系统图库
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(Intent.createChooser(intent, "请选择图片"), REQUEST_PICK);
    }


    /**
     * 跳转到照相机
     */
    private void gotoCamera() {
        System.out.println( "*****************打开相机********************");
        //创建拍照存储的图片文件
        File fileDir = new File( Environment.getExternalStorageDirectory(),"image");
        if(!fileDir.exists()){
            fileDir.getParentFile().mkdir();
        }

        tempFile = new File(fileDir.getPath(), currentTimeMillis() + ".jpg");

        //跳转到调用系统相机
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            //设置7.0中共享文件，分享路径定义在xml/file_paths.xml
            intent.setFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
            Uri contentUri = FileProvider.getUriForFile(this, "com.netease.nim.ccsocial_nim.fileprovider", tempFile);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, contentUri);
        } else {
            intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(tempFile));
        }
        startActivityForResult(intent, REQUEST_CAPTURE);
    }
    @SuppressLint("CheckResult")
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        switch (requestCode) {
            case REQUEST_CAPTURE: //调用系统相机返回
                System.out.println("997");
                System.out.println(requestCode);
                System.out.println(resultCode);
                if (resultCode == RESULT_OK) {
                    System.out.println("999");
                    gotoClipActivity(Uri.fromFile(tempFile));
                    System.out.println(Uri.fromFile(tempFile));
                }
                break;
            case REQUEST_PICK:  //调用系统相册返回
                if (resultCode == RESULT_OK) {
                    Uri uri = intent.getData();
                    gotoClipActivity(uri);
                }
                break;
            case REQUEST_CROP_PHOTO:  //剪切图片返回
                if (resultCode == RESULT_OK) {
                    final Uri uri = intent.getData();
                    if (uri == null) {
                        return;
                    }
                    String cropImagePath = getRealFilePathFromUri(getApplicationContext(), uri);
                    Bitmap bitMap = BitmapFactory.decodeFile(cropImagePath);
                    //图片上传压缩
                    tempFile = Image2File.compressImage(bitMap);
                    //图片展示压缩
                    lodingView = new LodingView(this);
                    lodingView.show("正在压缩...");
                    resultBitmap = ImageCompress.comp(bitMap);
                    System.out.println("987");
                    System.out.println(resultBitmap);
                    headImage.setImageBitmap(resultBitmap);
                    lodingView.hide();
                    //图片返回


                }
                break;
        }
    }
    /**
     * 打开截图界面
     */
    public void gotoClipActivity(Uri uri) {
        if (uri == null) {
            return;
        }
        System.out.println("998");
        Intent intent = new Intent();
        intent.setClass(this, ClipImageActivity.class);
        intent.setData(uri);
        startActivityForResult(intent, REQUEST_CROP_PHOTO);
    }

    /**
     * 头像上传
     */
    @SuppressLint("CheckResult")
    public void uploadImg(){
        //头像上传接口
        String userCcid = Constants.SP_USER_DATA.get("userCcid").getAsString();
        System.out.println(userCcid);
        System.out.println(tempFile.getName());
        RequestBody requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), tempFile);
        MultipartBody.Part body =
                MultipartBody.Part.createFormData("imgFile", tempFile.getName(), requestFile);
        RequestBody user =
                RequestBody.create(
                        MediaType.parse("multipart/form-data"), userCcid);

        RetrofitManager.create(ApiService.class).uploadAvatar(body,user)
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
                            System.out.println("008");
                            updateAvatar(tempFile);
                            System.out.println("009");
                            IToastUtils.iToast(getContext(),R.string.text_upload_done,Toast.LENGTH_SHORT);
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast(getContext(),R.string.text_send_code_fail,Toast.LENGTH_SHORT);
                    }
                });

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        try {
            fixInputMethodManagerLeak(this);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}

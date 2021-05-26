package com.netease.nim.ccsocial_nim.register;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.text.Editable;
import android.text.InputFilter;
import android.text.InputType;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.content.res.AppCompatResources;

import com.gyf.immersionbar.ImmersionBar;
import com.lzy.okgo.OkGo;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.mainTab.MainActivity;
import com.outman.framework.base.BaseUIActivity;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.UserBean;
import com.outman.framework.utils.NetUtils.bean.ResponseData;

import org.greenrobot.eventbus.EventBus;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class EduBindActivity extends BaseUIActivity implements View.OnClickListener {
    private TextView eduBindSkip;
    private EditText textEduUser;
    private EditText textEduPwd;
    private Button btnBindSure;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edu_bind);
        ImmersionBar.with(this)
                .statusBarDarkFont(true)
                .fitsSystemWindows(true)  //使用该属性,必须指定状态栏颜色
                .navigationBarColor(R.color.colorWhite)
                .navigationBarDarkIcon(true)
                .statusBarColor(R.color.colorWhite)
                .init();
        initView();
    }

    private void initView() {
        eduBindSkip = (TextView) findViewById(R.id.edu_bind_skip);
        textEduUser = (EditText) findViewById(R.id.text_edu_user);
        textEduPwd = (EditText) findViewById(R.id.text_edu_pwd);
        textEduPwd.setInputType(InputType.TYPE_CLASS_NUMBER|InputType.TYPE_NUMBER_VARIATION_PASSWORD);
        btnBindSure = (Button) findViewById(R.id.btn_bind_sure);

        textEduUser.setFilters(new InputFilter[]{new InputFilter.LengthFilter(11)});
        textEduPwd.setFilters(new InputFilter[]{new InputFilter.LengthFilter(26)});
        textEduUser.addTextChangedListener(textWatcher);
        textEduPwd.addTextChangedListener(textWatcher);

        //登录静默状态设置
        GradientDrawable shapeColor = (GradientDrawable)btnBindSure.getBackground();
        ColorStateList color = AppCompatResources.getColorStateList(OkGo.getContext(), R.color.colorPrimaryGray);
        shapeColor.setColor(color);
        btnBindSure.setEnabled(false);
        btnBindSure.setOnClickListener(this);

        eduBindSkip.setOnClickListener(this);
        btnBindSure.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.edu_bind_skip:
                skip();
                break;
            case R.id.btn_bind_sure:
                sure();
                break;

        }
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
            boolean isEnable = textEduUser.getText().length() > 0 &&
                    textEduPwd.getText().length() > 0;
            System.out.println(isEnable);
            updateBtn(btnBindSure, isEnable);
        }
    };

    private void updateBtn(Button btn, boolean isEnable) {
        btn.setEnabled(isEnable);
        if(isEnable){
            GradientDrawable shapeColor = (GradientDrawable)btn.getBackground();
            ColorStateList color = AppCompatResources.getColorStateList(OkGo.getContext(), R.color.colorPrimaryBlue);
            shapeColor.setColor(color);
        }else{
            GradientDrawable shapeColor = (GradientDrawable)btn.getBackground();
            ColorStateList color = AppCompatResources.getColorStateList(OkGo.getContext(), R.color.colorPrimaryGray);
            shapeColor.setColor(color);
        }

    }

    @SuppressLint("CheckResult")
    private void sure() {
        System.out.println(Constants.SP_USER_DATA);
        String userCcid = Constants.SP_USER_DATA.get("userCcid").getAsString();
        String eduUser = textEduUser.getText().toString();
        String eduPwd = textEduPwd.getText().toString();
        System.out.println(userCcid);
        System.out.println(eduUser);
        System.out.println(eduPwd);
        if(eduUser.equals("")){
            IToastUtils.iToast(R.string.text_login_phone_null, Toast.LENGTH_SHORT);
            return;
        }
        if(eduPwd.equals("")){
            IToastUtils.iToast(R.string.text_login_pw_null,Toast.LENGTH_SHORT);
            return;
        }
        UserBean user = new UserBean();
        user.setUserCcid(userCcid);
        user.setUserEducationalId(eduUser);
        user.setUserEducationalPassword(eduPwd);
        RetrofitManager.create(ApiService.class).bindEducationalAccount(user)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @SuppressLint("CheckResult")
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res.getCode());
                        System.out.println(res.getData());
                        System.out.println(res.getMsg());
                        if(res.getCode() == 1){
                            IToastUtils.iToast(R.string.text_edu_bind_true,Toast.LENGTH_SHORT);
                            startActivity(new Intent(getBaseContext(), MainActivity.class));
                        }else{
                            IToastUtils.iToast(R.string.text_edu_bind_false,Toast.LENGTH_SHORT);
                        }

                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast(R.string.text_edu_bind_false,Toast.LENGTH_SHORT);
                    }
                });
    }

    private void skip() {
        Intent intent = new Intent();
        intent.setClass(this, MainActivity.class);
        startActivity(intent);
        finish();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}

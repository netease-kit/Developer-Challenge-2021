package com.netease.nim.ccsocial_nim.register;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import com.gyf.immersionbar.ImmersionBar;
import com.lzy.okgo.OkGo;
import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.mainTab.MainActivity;
import com.outman.framework.adapter.InterestChooseAdapter;
import com.outman.framework.base.BaseActivity;
import com.outman.framework.entity.Constants;
import com.outman.framework.entity.InterestChooseItem;
import com.outman.framework.entity.InterestTypeItem;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ResponseData;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.ArrayList;
import java.util.List;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class InterestChooseActivity extends BaseActivity implements View.OnClickListener{
//    private HashSet mTageSet;
//    private ArrayList mTagList;
//
    private RecyclerView interest_item_box;
    private Button btn_interest_sure;
    private TextView eduBindSkip;

    private List<InterestChooseItem> interestChooseItemList = new ArrayList<>();
    private List<InterestTypeItem> interestTypeItemList = new ArrayList<>();
    private List<InterestChooseItem> LabelList = new ArrayList<>();
//    private List<String> list1 = new ArrayList<>();
//    private List<String> list2 = new ArrayList<>();
//    private List<String> list3 = new ArrayList<>();
    private Gson gson = new Gson();

    private List<Integer> selectedList = new ArrayList<>();

    private InterestChooseItem linkLabelBean;

    private Drawable drawable_btn_blue;
    private Drawable drawable_btn_gray;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EventBus.getDefault().register(this);
        setContentView(R.layout.activity_interest_choose);
        ImmersionBar.with(this)
                .statusBarDarkFont(true)
                .fitsSystemWindows(true)  //使用该属性,必须指定状态栏颜色
                .navigationBarColor(R.color.colorWhite)
                .navigationBarDarkIcon(true)
                .statusBarColor(R.color.colorWhite)
                .init();
        initData();

    }

    @SuppressLint({"UseCompatLoadingForDrawables", "CheckResult"})
    private void initData() {
        interest_item_box = findViewById(R.id.interest_item_box);
        eduBindSkip = (TextView) findViewById(R.id.edu_bind_skip);
        btn_interest_sure = findViewById(R.id.btn_bind_sure);
        eduBindSkip.setOnClickListener(this);
        btn_interest_sure.setOnClickListener(this);
        btn_interest_sure.setClickable(false);

        drawable_btn_blue = getApplicationContext().getResources().getDrawable(R.drawable.shape_toast_bg_blue);
        drawable_btn_gray = getApplicationContext().getResources().getDrawable(R.drawable.shape_toast_bg_gray);

        //获取活动Label
        RetrofitManager.create(ApiService.class).getActivityLabels()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        Gson gson = new Gson();
                        JsonObject jsonObject = gson.toJsonTree(res.getData()).getAsJsonObject();
                        JsonArray activityLabels =  jsonObject.getAsJsonArray("typeList");

                        System.out.println(activityLabels);
                        for (int i = 0; i <activityLabels.size() ; i++) {
                            JsonObject typeLabel = activityLabels.get(i).getAsJsonObject();
                            //类型
                            InterestTypeItem typeItem = new InterestTypeItem();
                            typeItem.setTypeId(i);
                            typeItem.setTypeName(typeLabel.get("labelType").getAsString());

                            typeItem.setTypeNum(typeLabel.get("labelNum").getAsInt());
                            interestTypeItemList.add(typeItem);
                            //子标签
                            JsonArray labels = new JsonArray();
                            labels = typeLabel.getAsJsonArray("labelList");
                            for (int j = 0; j <labels.size(); j++) {
                                JsonObject label = new JsonObject();
                                label = labels.get(j).getAsJsonObject();
                                linkLabelBean = new InterestChooseItem();
                                linkLabelBean.setTypeId(i);
                                linkLabelBean.setTagId(label.get("labelId").getAsInt());
                                linkLabelBean.setTagName(label.get("labelName").getAsString());
                                linkLabelBean.setSelected(false);
                                interestChooseItemList.add(linkLabelBean);
                            }
                        }
                        //渲染标签
                        initView();
                    }
                },new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast("error",Toast.LENGTH_SHORT);
                    }
                });

    }
    private void initView() {
        final GridLayoutManager mLayoutManager = new GridLayoutManager(getApplicationContext(), 4);
        mLayoutManager.setSpanSizeLookup(new GridLayoutManager.SpanSizeLookup() {
            @Override
            public int getSpanSize(int position) {
                int type = interest_item_box.getAdapter().getItemViewType(position);//获得返回值
                if (type == 99) {
                    return mLayoutManager.getSpanCount();
                } else {
                    return 1;
                }
            }
        });
        //传入标签列表数据
        System.out.println(interestTypeItemList.toString());
        for (InterestTypeItem type:interestTypeItemList) {
            InterestChooseItem typeItem = new InterestChooseItem();
            typeItem.setTagName(type.getTypeName()+" ");
            typeItem.setTypeId(-1);
            typeItem.setSelected(false);
            LabelList.add(typeItem);

            for (InterestChooseItem chooseItem:interestChooseItemList) {
                if(chooseItem.getTypeId() == type.getTypeId()){
                    LabelList.add(chooseItem);
                }
            }
        }
        System.out.println(LabelList);
        interest_item_box.setLayoutManager(mLayoutManager);
        InterestChooseAdapter linkLabelAdapter = new InterestChooseAdapter(getApplicationContext(),LabelList);
        interest_item_box.setAdapter(linkLabelAdapter);
    }


    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.btn_bind_sure:
                sureSelected();
                break;
            case R.id.adater_label:
                selected();
                break;
            case R.id.edu_bind_skip:
                skip();
                break;
        }
    }

    private void skip() {
        Intent intent = new Intent();
        if(!Constants.SP_USER_DATA.has(("userEducationalId"))){
            intent.setClass(this, EduBindActivity.class);
            finish();
        }else{
            intent.setClass(this, MainActivity.class);
            finish();
        }
        startActivity(intent);
    }

    private void selected() {
        boolean least = false;
        for (int i = 0; i < interestChooseItemList.size(); i++) {
            if (interestChooseItemList.get(i).getSelected()) {
                least = true;
            }
        }
        if (!least) {
            btn_interest_sure.setBackground(drawable_btn_gray);
            btn_interest_sure.setClickable(false);
            return;
        }else{
            btn_interest_sure.setBackground(drawable_btn_blue);
            btn_interest_sure.setClickable(true);

        }
    }

    @SuppressLint("CheckResult")
    private void sureSelected() {

        selectedList.clear();
        for (int i = 0; i < interestChooseItemList.size(); i++) {
            if (interestChooseItemList.get(i).getSelected()) {
                selectedList.add(interestChooseItemList.get(i).getTagId());
            }
        }
        //TODO 传输格式 1-2-3-4-5
        String selectedLabel = "";
        for (int labelId:selectedList) {
            selectedLabel += labelId + "-";
        }
        System.out.println(selectedLabel);

        RetrofitManager.create(ApiService.class).addUserHobbies(Constants.SP_USER_DATA.get("userCcid").getAsString(),selectedLabel)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res);
                        if(res.getCode() == 1){
                            if(Constants.SP_USER_DATA.has("userEducationalId")){
                                Intent intent = new Intent();
                                intent.setClass(getBaseContext(), MainActivity.class);
                                startActivity(intent);
                            }else{
                                Intent intent = new Intent();
                                intent.setClass(getBaseContext() , EduBindActivity.class);
                                startActivity(intent);
                                finish();
                            }

                        }

                    }
                },new Consumer<Throwable>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull Throwable throwable) throws Exception {
                        System.out.println(throwable);
                        IToastUtils.iToast("error",Toast.LENGTH_SHORT);
                    }
                });


    }

    //处理eventbus
    @Subscribe(threadMode = ThreadMode.MAIN)
    public void handleMessage( List<InterestChooseItem> event) {
        selected();
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        EventBus.getDefault().unregister(this);
    }
}

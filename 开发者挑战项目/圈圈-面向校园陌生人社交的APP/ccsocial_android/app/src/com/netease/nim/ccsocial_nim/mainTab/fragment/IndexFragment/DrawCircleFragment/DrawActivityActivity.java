package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.DrawCircleFragment;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.netease.nim.ccsocial_nim.R;
import com.netease.nim.ccsocial_nim.mainTab.MainActivity;
import com.netease.nim.uikit.api.model.location.LocationProvider;
import com.netease.nim.uikit.impl.NimUIKitImpl;
import com.outman.framework.base.BaseUIActivity;
import com.outman.framework.entity.Constants;
import com.outman.framework.utils.IToastUtils;
import com.outman.framework.utils.NetUtils.ApiService;
import com.outman.framework.utils.NetUtils.RetrofitManager;
import com.outman.framework.utils.NetUtils.bean.ActivityBean;
import com.outman.framework.utils.NetUtils.bean.ResponseData;
import com.outman.framework.utils.datepicker.CustomDatePicker;
import com.outman.framework.utils.datepicker.DateFormatUtils;
import com.outman.framework.view.AmountView;
import com.outman.framework.view.CarouselView.CarrouselLayout;
import com.outman.framework.view.CarouselView.OnCarrouselItemClickListener;
import com.outman.framework.view.CarouselView.OnCarrouselItemSelectedListener;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

import static com.outman.framework.entity.Constants.activityCircleIds;
import static com.outman.framework.entity.Constants.activityCircleLabels;

public class DrawActivityActivity extends BaseUIActivity implements View.OnClickListener{
    private Context context;
    private int width;
    private CarrouselLayout carrousel;
    private AmountView amountView;
    private EditText textDrawActivityLabel;
    private ImageView imgDrawActivityPnum;
    private TextView textDrawActivityPnumLabel;
    private ImageView imgDrawActivityStart;
    private TextView textDrawActivityStartLabel;
    private TextView textDrawActivityStart;
    private ImageView imgDrawActivityStartRight;
    private ImageView imgDrawActivityEnd;
    private TextView textDrawActivityEndLabel;
    private TextView textDrawActivityEnd;
    private ImageView imgDrawActivityEndRight;
    private ImageView imgDrawActivityPos;
    private TextView textDrawActivityPosLabel;
    private TextView textDrawActivityPos;
    private ImageView imgDrawActivityPosRight;
    private EditText textDrawActivityDetail;
    private Switch switchDrawActivityIsPrivate;
    private Button btnDrawActivitySure;

    private CustomDatePicker mStartTimerPicker;
    private CustomDatePicker mEndTimerPicker;

    private double longitude;
    private double latitude;
    private String address;

    private boolean[] select;

    private ActivityBean newActivity = new ActivityBean();


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_draw_activity);
        this.context = getContext();


        //???????????????
        initCarrousel();
        initLinstener();
        initView();
        initData();
        initTimerPicker();

    }


    @Override
    protected void onResume() {
        super.onResume();
//        Intent intent = getIntent();
//        longitude = intent.getDoubleExtra(LocationExtras.LONGITUDE,0.00);
//        latitude = intent.getDoubleExtra(LocationExtras.LATITUDE,0.00);
//        address = intent.getStringExtra(LocationExtras.ADDRESS);
//        System.out.println(longitude);
//        System.out.println(latitude);
//        System.out.println(address);

    }

    private void initView() {
        amountView = (AmountView) findViewById(R.id.amount_view);
        textDrawActivityLabel = (EditText) findViewById(R.id.text_draw_activity_label);
        imgDrawActivityPnum = (ImageView) findViewById(R.id.img_draw_activity_pnum);
        textDrawActivityPnumLabel = (TextView) findViewById(R.id.text_draw_activity_pnum_label);
        imgDrawActivityStart = (ImageView) findViewById(R.id.img_draw_activity_start);
        textDrawActivityStartLabel = (TextView) findViewById(R.id.text_draw_activity_start_label);
        textDrawActivityStart = (TextView) findViewById(R.id.text_draw_activity_start);
        imgDrawActivityStartRight = (ImageView) findViewById(R.id.img_draw_activity_start_right);
        imgDrawActivityEnd = (ImageView) findViewById(R.id.img_draw_activity_end);
        textDrawActivityEndLabel = (TextView) findViewById(R.id.text_draw_activity_end_label);
        textDrawActivityEnd = (TextView) findViewById(R.id.text_draw_activity_end);
        imgDrawActivityEndRight = (ImageView) findViewById(R.id.img_draw_activity_end_right);
        imgDrawActivityPos = (ImageView) findViewById(R.id.img_draw_activity_pos);
        textDrawActivityPosLabel = (TextView) findViewById(R.id.text_draw_activity_pos_label);
        textDrawActivityPos = (TextView) findViewById(R.id.text_draw_activity_pos);
        imgDrawActivityPosRight = (ImageView) findViewById(R.id.img_draw_activity_pos_right);
        textDrawActivityDetail = (EditText) findViewById(R.id.text_draw_activity_detail);
        switchDrawActivityIsPrivate = (Switch) findViewById(R.id.switch_draw_activity_is_private);
        btnDrawActivitySure = (Button) findViewById(R.id.btn_draw_activity_sure);

        textDrawActivityStart.setOnClickListener(this);
        imgDrawActivityStartRight.setOnClickListener(this);
        textDrawActivityEnd.setOnClickListener(this);
        imgDrawActivityEndRight.setOnClickListener(this);
        textDrawActivityPos.setOnClickListener(this);
        imgDrawActivityPosRight.setOnClickListener(this);
        btnDrawActivitySure.setOnClickListener(this);
//        switchDrawActivityIsPrivate.setOnCheckedChangeListener();
        textDrawActivityDetail.setText("");
        textDrawActivityDetail.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (event.getKeyCode() == KeyEvent.KEYCODE_ENTER) {
                    InputMethodManager imm = null;
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                        imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
                    }
                    imm.hideSoftInputFromWindow(textDrawActivityDetail.getWindowToken(),0);
                    return true;
                }
                return false;
            }
        });

        amountView.setGoods_storage(100);
        amountView.setOnAmountChangeListener(new AmountView.OnAmountChangeListener() {
            @Override
            public void onAmountChange(View view, int amount) {
                newActivity.setActivityMaxPeopleNum(amount);
//                IToastUtils.iToast("?????????"+ amount,Toast.LENGTH_SHORT);
            }
        });

    }
    @SuppressLint("CheckResult")
    private void initData() {

    }
    @SuppressLint("CheckResult")
    private void initCarrousel() {
        carrousel = (CarrouselLayout)findViewById(R.id.carrousel);
        select = new boolean[activityCircleLabels.size()];
        Random r = new Random();
        for (int i = 0; i <activityCircleLabels.size() ; i++) {
            addTextView(activityCircleLabels.get(i),i%12);
        }

        DisplayMetrics dm = new DisplayMetrics();
        WindowManager windowManager = (WindowManager) this.getSystemService(Context.WINDOW_SERVICE);
        windowManager.getDefaultDisplay().getMetrics(dm);
        width = dm.widthPixels;
        carrousel.setR(width/3)//??????R?????????
                .setRotationX(-20)
                .setAutoRotation(false)//??????????????????
                .setAutoRotationTime(1500);//?????????????????????  ????????????
        carrousel.refreshLayout();

    }

    private void initLinstener() {
        carrousel.setOnCarrouselItemClickListener(new OnCarrouselItemClickListener() {
            @Override
            public void onItemClick(View view, int position) {
                carrousel.setSelectItem(position);
                int labelId = activityCircleIds.get(position);
//                Toast.makeText(DrawActivityActivity.this, "activityId:" + labelId, Toast.LENGTH_SHORT).show();
                newActivity.setActivityLabel(labelId);
            }

        });
        /**
         * ????????????
         */
        carrousel.setOnCarrouselItemSelectedListener(new OnCarrouselItemSelectedListener() {
            @Override
            public void selected(View view, int position) {
                System.out.println("position:" + position);
                int labelId = activityCircleIds.get(position);
//                IToastUtils.iToast(activityCircleLabels.get(position),Toast.LENGTH_SHORT);
//                Toast.makeText(DrawActivityActivity.this, activityCircleLabels.get(position), Toast.LENGTH_SHORT).show();
                newActivity.setActivityLabel(labelId);

                for (int i = 0; i < carrousel.getChildCount(); i++) {
                    TextView text = (TextView) carrousel.getChildAt(i);
                    ViewGroup.LayoutParams ps = text.getLayoutParams();
                    ps.height = 260;
                    ps.width = 260;
                    text.setLayoutParams(ps);
                }
                TextView text = (TextView) view;
                ViewGroup.LayoutParams ps = text.getLayoutParams();
                ps.height = 260;
                ps.width = 260;
                text.setLayoutParams(ps);
            }
        }
        );
    }
    @SuppressLint("UseCompatLoadingForDrawables")
    private void addTextView(String labelName,int index) {
        System.out.println(labelName);
        View drawCircleView = LayoutInflater.from(this).inflate(R.layout.layout_draw_activity_circle,null,false);
        TextView circle = (TextView)drawCircleView.findViewById(R.id.text_draw_circle);
        circle.setText(labelName);
        GradientDrawable shapeColor = (GradientDrawable)circle.getBackground();
        Random myRandom = new Random();
        shapeColor.setColor(Constants.ColorArray[index]);

        carrousel.addView(circle);
        System.out.println(carrousel.getViews());
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.text_draw_activity_start:
            case R.id.img_draw_activity_start_right:
                showTimeChoose(0);
                break;
            case R.id.text_draw_activity_end:
            case R.id.img_draw_activity_end_right:
                showTimeChoose(1);
                break;
            case R.id.text_draw_activity_pos:
            case R.id.img_draw_activity_pos_right:
                showMap();
                break;
            case R.id.btn_draw_activity_sure:
                sure();
                break;
        }
    }

    @SuppressLint("CheckResult")
    private void sure() {
        //Id
        //??????
        newActivity.setActivityName(textDrawActivityLabel.getText().toString());
        //????????????
        //??????
        newActivity.setActivityStartTime(textDrawActivityStart.getText().toString());
        newActivity.setActivityEndTime(textDrawActivityEnd.getText().toString());
        //??????
        if (address.length()>30){
            address=address.substring(0,30);
        }
        newActivity.setActivityLocation(address);
        //?????????

        newActivity.setActivityLong(Double.parseDouble(String.format("%.6f", longitude)));
        newActivity.setActivityLat(Double.parseDouble(String.format("%.6f", latitude)));
        //??????
        newActivity.setActivityRange(1.00);
        //??????
        newActivity.setActivityIsPrivate(switchDrawActivityIsPrivate.isChecked()?1:0);
        //??????
        newActivity.setActivityDescribe(textDrawActivityDetail.getText().toString());
        System.out.println(newActivity.toString());

        String errorMsg;
        if(newActivity.getActivityName().equals("") || newActivity.getActivityName().equals(null)){
            errorMsg = "??????????????????";
            return;
        }else if(newActivity.getActivityStartTime().equals("") || newActivity.getActivityStartTime().equals(null)){
            errorMsg = "???????????????????????????";
            return;
        }else if(newActivity.getActivityEndTime().equals("") || newActivity.getActivityEndTime().equals(null)){
            errorMsg = "???????????????????????????";
            return;
        }else if(newActivity.getActivityLocation().equals("") || newActivity.getActivityLocation().equals(null)){
            errorMsg = "?????????????????????";
            return;
        }else if(newActivity.getActivityDescribe().equals("") || newActivity.getActivityDescribe().equals(null)){
            newActivity.setActivityDescribe(" ");
        }

        RetrofitManager.create(ApiService.class).createActivity(Constants.SP_USER_DATA.get("userCcid").getAsString(),newActivity)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ResponseData>() {
                    @Override
                    public void accept(@io.reactivex.annotations.NonNull ResponseData res) throws Exception {
                        System.out.println(res);
                        if(res.getCode() == 1){
                           Intent intent = new Intent(getContext(), MainActivity.class);
                           startActivity(intent);
                           finish();
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

    private void showMap() {
        if (NimUIKitImpl.getLocationProvider() != null) {
//            LocationAttachment location = (LocationAttachment) message.getAttachment();
//            NimUIKitImpl.getLocationProvider().openMap(context, location.getLongitude(), location.getLatitude(), location.getAddress());
            ChooseLocationProvider chooseLocationProvider = new ChooseLocationProvider();
            chooseLocationProvider.requestLocation(this, new LocationProvider.Callback() {
                @Override
                public void onSuccess(double longit, double latit, String add) {
                    longitude = longit;
                    latitude = latit;
                    address = add;
                    textDrawActivityPos.setText(address);
//                    chooseLocationProvider.openMap(getContext(),longitude,latitude,address);
                }
            });
        }

    }

    private void showTimeChoose(int type) {
        if(type == 0){
            mStartTimerPicker.show(textDrawActivityStart.getText().toString());
        }else{
            mEndTimerPicker.show(textDrawActivityEnd.getText().toString());
        }

    }
    private void initTimerPicker() {
        long nowTime = System.currentTimeMillis();
        Date d = new Date(nowTime);
        Calendar c = Calendar.getInstance();
        c.setTime(d);
        c.add(Calendar.HOUR,8);
        String beginTime_s = DateFormatUtils.long2Str(nowTime, true);
        c.add(Calendar.HOUR,1);
        String beginTime_e = DateFormatUtils.long2Str(c.getTimeInMillis(), true);
        c.add(Calendar.MONTH,3);
        String endTime = DateFormatUtils.long2Str(c.getTimeInMillis(), true);

        textDrawActivityStart.setText(beginTime_s);
        textDrawActivityEnd.setText(beginTime_e);

        // ??????????????????????????????????????????????????????yyyy-MM-dd HH:mm
        mStartTimerPicker = new CustomDatePicker(this, new CustomDatePicker.Callback() {
            @Override
            public void onTimeSelected(long timestamp) {
                if(timestamp > DateFormatUtils.str2Long(textDrawActivityEnd.getText().toString(),true)){
                    IToastUtils.iToast("???????????????????????????????????????",Toast.LENGTH_SHORT);
                    return;
                }
                textDrawActivityStart.setText(DateFormatUtils.long2Str(timestamp, true));
            }
        }, beginTime_s, endTime);
        mEndTimerPicker = new CustomDatePicker(this, new CustomDatePicker.Callback() {
            @Override
            public void onTimeSelected(long timestamp) {
                if(timestamp < DateFormatUtils.str2Long(textDrawActivityStart.getText().toString(),true)){
                    IToastUtils.iToast("???????????????????????????????????????",Toast.LENGTH_SHORT);
                    return;
                }
                textDrawActivityEnd.setText(DateFormatUtils.long2Str(timestamp, true));
            }
        }, beginTime_e, endTime);
        // ??????????????????????????????????????????
        mStartTimerPicker.setCancelable(true);
        mEndTimerPicker.setCancelable(true);
        // ???????????????
        mStartTimerPicker.setCanShowPreciseTime(true);
        mEndTimerPicker.setCanShowPreciseTime(true);
        // ??????????????????
        mStartTimerPicker.setScrollLoop(true);
        mEndTimerPicker.setScrollLoop(true);
        // ??????????????????
        mStartTimerPicker.setCanShowAnim(true);
        mEndTimerPicker.setCanShowAnim(true);
    }
}

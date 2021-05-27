package com.outman.framework.view;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;

import android.widget.LinearLayout;
import android.widget.TextView;

import com.outman.framework.R;

public class FunctionItemView extends LinearLayout {
    private View expandView;

    private boolean isShowBottomLine;
    private boolean isShowLeftIcon;
    private boolean isShowRightArrow;
    private ImageView imgMeIconItem;
    private TextView textMeLeft;
    private TextView textMeRight;
    private ImageView imgMeRightItem;
    public FunctionItemView(Context context) {
        super(context);
    }

    public FunctionItemView(Context context, AttributeSet attrs) {
        super(context, attrs);
        expandView = LayoutInflater.from(getContext()).inflate(
                R.layout.layout_function_item, null);
        imgMeIconItem = expandView.findViewById(R.id.img_me_icon_item);
        textMeLeft =   expandView.findViewById(R.id.text_me_left);
        textMeRight =  expandView.findViewById(R.id.text_me_right);
        imgMeRightItem =  expandView.findViewById(R.id.img_me_right_item);

        TypedArray ta = context.obtainStyledAttributes(attrs, R.styleable.layout_function_item);

        isShowLeftIcon = ta.getBoolean(R.styleable.layout_function_item_show_left_icon, true);//得到是否显示左侧图标属性标识
        isShowRightArrow = ta.getBoolean(R.styleable.layout_function_item_show_right_arrow, true);//得到是否显示右侧图标属性标识

        imgMeIconItem.setBackground(ta.getDrawable(R.styleable.layout_function_item_left_icon));//设置左侧图标
        textMeLeft.setText(ta.getString(R.styleable.layout_function_item_left_text));//设置左侧标题文字
        textMeRight.setText(ta.getString(R.styleable.layout_function_item_right_text));//设置右侧文字描述

        imgMeIconItem.setVisibility(isShowLeftIcon ? View.VISIBLE : View.INVISIBLE);//设置左侧箭头图标是否显示
        imgMeRightItem.setVisibility(isShowRightArrow ? View.VISIBLE : View.INVISIBLE);//设置右侧箭头图标是否显示
        ta.recycle();

        LinearLayout.LayoutParams params = new LayoutParams(
                LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        params.gravity = Gravity.CENTER;
        addView(expandView, params);
    }
    public FunctionItemView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);

        expandView = LayoutInflater.from(getContext()).inflate(
                R.layout.layout_function_item, null);
        imgMeIconItem = expandView.findViewById(R.id.img_me_icon_item);
        textMeLeft =   expandView.findViewById(R.id.text_me_left);
        textMeRight =  expandView.findViewById(R.id.text_me_right);
        imgMeRightItem =  expandView.findViewById(R.id.img_me_right_item);

        TypedArray ta = context.obtainStyledAttributes(attrs, R.styleable.layout_function_item);

        isShowLeftIcon = ta.getBoolean(R.styleable.layout_function_item_show_left_icon, true);//得到是否显示左侧图标属性标识
        isShowRightArrow = ta.getBoolean(R.styleable.layout_function_item_show_right_arrow, true);//得到是否显示右侧图标属性标识

        imgMeIconItem.setBackground(ta.getDrawable(R.styleable.layout_function_item_left_icon));//设置左侧图标
        textMeLeft.setText(ta.getString(R.styleable.layout_function_item_left_text));//设置左侧标题文字
        textMeRight.setText(ta.getString(R.styleable.layout_function_item_right_text));//设置右侧文字描述

        imgMeIconItem.setVisibility(isShowLeftIcon ? View.VISIBLE : View.INVISIBLE);//设置左侧箭头图标是否显示
        imgMeRightItem.setVisibility(isShowRightArrow ? View.VISIBLE : View.INVISIBLE);//设置右侧箭头图标是否显示
        ta.recycle();

        LinearLayout.LayoutParams params = new LayoutParams(
                LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        params.gravity = Gravity.CENTER;
        addView(expandView, params);
    }


}

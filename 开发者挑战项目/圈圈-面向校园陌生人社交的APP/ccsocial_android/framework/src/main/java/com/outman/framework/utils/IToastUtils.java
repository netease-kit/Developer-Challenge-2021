package com.outman.framework.utils;

import android.content.Context;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.lzy.okgo.OkGo;
import com.outman.framework.R;
import com.outman.framework.base.BaseUIActivity;

public class IToastUtils {

    public static void iToast(int str, int showTime) {
        Context context = OkGo.getContext();
        if(context != null){
            View view= LayoutInflater.from(context).inflate(R.layout.layout_toast,null);
            TextView tv_msg = (TextView) view.findViewById(R.id.tvToast);
            tv_msg.setText(context.getString(str));
            Toast toast = new Toast(context);
//        toast.setGravity(Gravity.BOTTOM|Gravity.CENTER, 0, 20);
            toast.setDuration(showTime);
            toast.setView(view);
            toast.show();
        }


    }

    public static void iToastHead(String str, int showTime) {
        Context context = OkGo.getContext();
        if(context != null){
            View view= LayoutInflater.from(context).inflate(R.layout.layout_toast,null);
            TextView tv_msg = (TextView) view.findViewById(R.id.tvToast);
            tv_msg.setText(str);
            Toast toast = new Toast(context);
            toast.setDuration(showTime);
            toast.setView(view);
            toast.setGravity(Gravity.TOP,0,0);
            toast.show();
            toast.show();
        }


    }

    public static void iToast(String str, int showTime) {
        Context context = OkGo.getContext();
        if(context != null){
            View view= LayoutInflater.from(context).inflate(R.layout.layout_toast,null);
            TextView tv_msg = (TextView) view.findViewById(R.id.tvToast);
            tv_msg.setText(str);
            Toast toast = new Toast(context);
//        toast.setGravity(Gravity.BOTTOM|Gravity.CENTER, 0, 20);
            toast.setDuration(showTime);
            toast.setView(view);
            toast.show();
        }


    }
    public static void iToast(Context context,int str, int showTime) {
        if(context != null){
            View view= LayoutInflater.from(context).inflate(R.layout.layout_toast,null);
            TextView tv_msg = (TextView) view.findViewById(R.id.tvToast);
            tv_msg.setText(str);
            Toast toast = new Toast(context);
//        toast.setGravity(Gravity.BOTTOM|Gravity.CENTER, 0, 20);
            toast.setDuration(showTime);
            toast.setView(view);
            toast.show();
        }


    }
    public static void iToast(Context context,String str, int showTime) {
        if(context != null){
            View view= LayoutInflater.from(context).inflate(R.layout.layout_toast,null);
            TextView tv_msg = (TextView) view.findViewById(R.id.tvToast);
            tv_msg.setText(str);
            Toast toast = new Toast(context);
//        toast.setGravity(Gravity.BOTTOM|Gravity.CENTER, 0, 20);
            toast.setDuration(showTime);
            toast.setView(view);
            toast.show();
        }


    }
}

package com.outman.framework.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.outman.framework.R;
import com.outman.framework.entity.InterestChooseItem;

import org.greenrobot.eventbus.EventBus;

import java.util.List;

/**
 * Created by wangtao on 2018/4/18.
 */

public class InterestChooseAdapter extends RecyclerView.Adapter {

    private Context context;
    private final int TYPE = 99;
    private final int LABEL = 100;
    private List<InterestChooseItem> LabelList;

    public InterestChooseAdapter(Context context, List<InterestChooseItem> LabelList) {
        this.context = context;
        this.LabelList = LabelList;


    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        RecyclerView.ViewHolder holder = null;
        if (viewType == TYPE) {
            holder = new TypeHolder(LayoutInflater.from(context).inflate(R.layout.adapter_activity_label_title, null));
        } else {
            holder = new LabelHolder(LayoutInflater.from(context).inflate(R.layout.adapter_activity_label_content, null));
        }
        return holder;
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        if (getItemViewType(position) == TYPE) {
            ((TypeHolder) holder).setData(position);
        } else {
            ((LabelHolder) holder).setData(position);
        }
    }

    @Override
    public int getItemCount() {
        return LabelList.size();
    }

    @Override
    public int getItemViewType(int position) {
        if (LabelList.get(position).getTagName().contains(" ")) {
            return TYPE;
        } else {
            return LABEL;
        }
    }
    class TypeHolder extends RecyclerView.ViewHolder {

        private final TextView adapterTitle;

        public TypeHolder(View inflate) {
            super(inflate);
            adapterTitle = (TextView) inflate.findViewById(R.id.adater_title);
        }

        @SuppressLint("WrongConstant")
        public void setData(int position) {
            adapterTitle.setText(LabelList.get(position).getTagName());
            adapterTitle.setEnabled(false);
        }
    }
    private class LabelHolder extends RecyclerView.ViewHolder {
        private TextView adaterLabel;
        private final LinearLayout llContent;


        private ColorStateList color_g = context.getResources().getColorStateList(R.color.colorFontBlack);
        private Drawable drawable_g = context.getResources().getDrawable(R.drawable.shape_radius_gray_10dp);
        private ColorStateList color_b = context.getResources().getColorStateList(R.color.colorPrimaryWhite);
        private Drawable drawable_b = context.getResources().getDrawable(R.drawable.shape_radius_blue_10dp);


        public LabelHolder(View inflate) {
            super(inflate);
            adaterLabel = (TextView) inflate.findViewById(R.id.adater_label);
            llContent = (LinearLayout) inflate.findViewById(R.id.ii_content);
            LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
            layoutParams.setMargins(10,10,10,10);
            llContent.setLayoutParams(layoutParams);
        }

        public void setData(final int position) {
            adaterLabel.setText(LabelList.get(position).getTagName());
            adaterLabel.setOnClickListener(new View.OnClickListener() {
                @SuppressLint("ResourceAsColor")
                @Override
                public void onClick(View v) {
                    if (adaterLabel.isSelected()) {
                        System.out.println(1);
                        adaterLabel.setSelected(false);
                        adaterLabel.setTextColor(color_g);
                        adaterLabel.setBackground(drawable_g);
                        LabelList.get(position).setSelected(false);

                    } else {
                        System.out.println(2);
                        adaterLabel.setSelected(true);
                        adaterLabel.setTextColor(color_b);
                        adaterLabel.setBackground(drawable_b);
                        LabelList.get(position).setSelected(true);

                    }
                    EventBus.getDefault().post(LabelList);
                }
            });
        }

    }


}

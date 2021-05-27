package com.outman.framework.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.outman.framework.R;
import com.outman.framework.entity.ActivityItem;

import org.greenrobot.eventbus.EventBus;

import java.util.List;

public class ActivityItemAdapter extends RecyclerView.Adapter {
    private Context context;
    private List<ActivityItem> list;

    public ActivityItemAdapter(Context context, List<ActivityItem> list) {
        this.context = context;
        this.list = list;
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        RecyclerView.ViewHolder holder = null;
        holder = new ActivityHolder(LayoutInflater.from(context).inflate(R.layout.fragment_index_item_activity,null));
        return holder;
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        ((ActivityHolder)holder).setData(position);
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    private class ActivityHolder extends RecyclerView.ViewHolder {
        private LinearLayout item_activity_content;
        private LinearLayout itemActivityContent;
        private ImageView imgActivityItem;
        private TextView textLabelActivityItem;
        private TextView textPnumActivityItem;
        private TextView textPosActivityItem;
        private TextView textDateActivityItem;
        private TextView textStatusActivityItem;
        private TextView btnIntoActivityItem;


        public ActivityHolder(View inflate) {
            super(inflate);
            item_activity_content = (LinearLayout)inflate.findViewById(R.id.item_activity_content);
            itemActivityContent = (LinearLayout) inflate.findViewById(R.id.item_activity_content);
            imgActivityItem = (ImageView) inflate.findViewById(R.id.img_activity_item);
            textLabelActivityItem = (TextView) inflate.findViewById(R.id.text_label_activity_item);
            textPnumActivityItem = (TextView) inflate.findViewById(R.id.text_pnum_activity_item);
            textPosActivityItem = (TextView) inflate.findViewById(R.id.text_pos_activity_item);
            textDateActivityItem = (TextView) inflate.findViewById(R.id.text_date_activity_item);
            textStatusActivityItem = (TextView) inflate.findViewById(R.id.text_status_activity_item);
            btnIntoActivityItem = (TextView) inflate.findViewById(R.id.btn_into_activity_item);


            LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);

            layoutParams.setMargins(10,10,10,10);
            item_activity_content.setLayoutParams(layoutParams);
        }

        @SuppressLint("ResourceAsColor")
        public void setData(final int position) {
            switch (list.get(position).getActivityLabel()){
                case 1:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_01));
                    break;
                case 2:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_02));
                    break;
                case 3:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_03));
                    break;
                case 4:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_04));
                    break;
                case 5:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_05));
                    break;
                case 6:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_06));
                    break;
                case 7:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_07));
                    break;
                case 8:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_08));
                    break;
                case 9:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_09));
                    break;
                case 10:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_10));
                    break;
                case 11:
                    imgActivityItem.setImageDrawable(context.getResources().getDrawable(R.drawable.icon_activity_11));
                    break;
            }

            textLabelActivityItem.setText(list.get(position).getActivityName());
            textPnumActivityItem.setText(list.get(position).getActivityPeopleNum() + "/" + list.get(position).getActivityMaxPeopleNum() +"人");
            textPosActivityItem.setText("地点: " + list.get(position).getActivityLocation());
            textDateActivityItem.setText("时间: " + list.get(position).getActivityStartTime());
            textStatusActivityItem.setText(list.get(position).getActivityStatus());
            if(list.get(position).getActivityStatus().equals("未开始")){
                textStatusActivityItem.setTextColor(0xff4DB849);
            }else if(list.get(position).getActivityStatus().equals("进行中")){
                textStatusActivityItem.setTextColor(0xffF0D54F);
            }else if(list.get(position).getActivityStatus().equals("已结束")){
                textStatusActivityItem.setTextColor(0xffE26060);
            }
            btnIntoActivityItem.setOnClickListener(new View.OnClickListener() {
                @SuppressLint("ResourceAsColor")
                @Override
                public void onClick(View v) {
                    //TODO 跳转详情页
//                    EventBus.getDefault().post(list);
                    getListener.onClick(position);
                }
            });
        }
    }
    public interface GetListener {

        void onClick(int position);
    }

    private GetListener getListener;

    public void setGetListener(GetListener getListener) {
        this.getListener = getListener;
    }
    private  int mPosition;

    public int getmPosition() {
        return mPosition;
    }

    public void setmPosition(int mPosition) {
        this.mPosition = mPosition;
    }
}

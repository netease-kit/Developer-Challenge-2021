package com.netease.nim.ccsocial_nim.mainTab.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.JsonArray;
import com.netease.nim.ccsocial_nim.R;
import com.outman.framework.entity.ChooseLabel;
import com.outman.framework.entity.Constants;

import java.util.ArrayList;

public class MyActivityCircleFilterAdapterTypeRight extends RecyclerView.Adapter<MyActivityCircleFilterAdapterTypeRight.ViewHolder> {
    public JsonArray list = new JsonArray();
    public Context con;
    public LayoutInflater inflater;
    public ArrayList<Boolean> selected;
    public int sum;

    public MyActivityCircleFilterAdapterTypeRight(JsonArray list, Context con){
        this.con=con;
        this.list=list;
        System.out.println(list.toString());
        selected = new ArrayList<>();
        ChooseLabel newLabel = new ChooseLabel();
        for (int i = 0; i < list.size() ; i++) {
            newLabel.setLabelId(Integer.parseInt(list.get(i).getAsJsonObject().get("labelId").getAsString()));
            if(Constants.chooseLabelList.contains(newLabel)){
                selected.add(true);
            }else{
                selected.add(false);
            }

        }
        inflater= LayoutInflater.from(con);
    }

    @Override
    public MyActivityCircleFilterAdapterTypeRight.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view= inflater.inflate(R.layout.layout_activity_filter_right_item,parent,false);
        MyActivityCircleFilterAdapterTypeRight.ViewHolder viewHolder=new MyActivityCircleFilterAdapterTypeRight.ViewHolder(view);
        return viewHolder;

    }

    @SuppressLint({"ResourceAsColor", "UseCompatLoadingForDrawables"})
    @Override
    public void onBindViewHolder(final MyActivityCircleFilterAdapterTypeRight.ViewHolder holder, int position) {
        holder.label_right.setText(list.get(position).getAsJsonObject().get("labelName").getAsString());
        if(selected.get(position)){
            holder.label_right.setTextColor(con.getResources().getColor(R.color.colorPrimaryWhite));
            holder.label_right.setBackground(con.getResources().getDrawable(R.color.colorPrimaryBlue));
        }else{
            holder.label_right.setTextColor(con.getResources().getColor(R.color.colorFontGray));
            holder.label_right.setBackground(con.getResources().getDrawable(R.color.colorPrimaryWhite));
        }
        //点击事件
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getListener.onClick(position);
                System.out.println("getmPosition:" + getmPosition());
                System.out.println("postiion:" + position);
                if(getmPosition() == position){
                    if(selected.get(position)){
                        holder.label_right.setTextColor(con.getResources().getColor(R.color.colorFontGray));
                        holder.label_right.setBackground(con.getResources().getDrawable(R.color.colorPrimaryWhite));
                        selected.set(position,false);
                        refreshChooseData();
                    }else{
                        holder.label_right.setTextColor(con.getResources().getColor(R.color.colorPrimaryWhite));
                        holder.label_right.setBackground(con.getResources().getDrawable(R.color.colorPrimaryBlue));
                        selected.set(position,true);
                        refreshChooseData();
                    }
                    notifyDataSetChanged();

                }
            }
        });

    }

    private void refreshChooseData() {
        for (int i = 0; i < list.size() ; i++) {
            System.out.println(Integer.parseInt(list.get(i).getAsJsonObject().get("labelId").getAsString()));
            ChooseLabel label = new ChooseLabel();
            if (selected.get(i)){
                label.setLabelId(Integer.parseInt(list.get(i).getAsJsonObject().get("labelId").getAsString()));
                System.out.println(label);
                System.out.println(selected.get(i));
                if(!Constants.chooseLabelList.contains(label)){
                    label.setLabelName(list.get(i).getAsJsonObject().get("labelName").getAsString());
                    Constants.chooseLabelList.add(label);
                }
            }else{
                label.setLabelId(Integer.parseInt(list.get(i).getAsJsonObject().get("labelId").getAsString()));
                if(Constants.chooseLabelList.contains(label)){
                    Constants.chooseLabelList.remove(label);
                }
            }
        }
        System.out.println( Constants.chooseLabelList.toString());
    }


    @Override
    public int getItemCount() {
        return list.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder{
        public TextView label_right;

        public ViewHolder(View itemView) {
            super(itemView);
            label_right= (TextView) itemView.findViewById(R.id.label_right);
        }
    }

    public interface GetListener {

        void onClick(int position);
    }

    private MyActivityCircleFilterAdapterTypeRight.GetListener getListener;

    public void setGetListener(MyActivityCircleFilterAdapterTypeRight.GetListener getListener) {
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

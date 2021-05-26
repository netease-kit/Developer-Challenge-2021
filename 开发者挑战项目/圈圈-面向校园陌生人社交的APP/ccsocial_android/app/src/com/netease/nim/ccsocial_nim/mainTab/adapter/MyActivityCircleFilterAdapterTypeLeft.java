package com.netease.nim.ccsocial_nim.mainTab.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.netease.nim.ccsocial_nim.R;

import java.util.ArrayList;
import java.util.List;

public class MyActivityCircleFilterAdapterTypeLeft extends RecyclerView.Adapter<MyActivityCircleFilterAdapterTypeLeft.ViewHolder> {
    public List<String> list=new ArrayList<>();
    public Context con;
    public LayoutInflater inflater;


    public MyActivityCircleFilterAdapterTypeLeft(List<String> list, Context con){
        this.con=con;
        this.list=list;
        inflater= LayoutInflater.from(con);
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view= inflater.inflate(R.layout.layout_activity_filter_left_item,parent,false);
        ViewHolder viewHolder=new ViewHolder(view);
        return viewHolder;

    }
    //        if(position == 0){
//            holder.itemView.callOnClick();
//        }
    @SuppressLint({"ResourceAsColor", "UseCompatLoadingForDrawables"})
    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.label_left.setText(list.get(position));

        //点击事件
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getListener.onClick(position);
                notifyDataSetChanged();
            }
        });
        if(getmPosition() == position){
            holder.label_left.setTextColor(con.getResources().getColor(R.color.colorPrimaryBlue));
        }else{
            holder.label_left.setTextColor(con.getResources().getColor(R.color.colorFontGray));
        }
    }


    @Override
    public int getItemCount() {
        return list.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder{
        public TextView label_left;

        public ViewHolder(View itemView) {
            super(itemView);
            label_left= (TextView) itemView.findViewById(R.id.label_left);
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

package com.outman.framework.utils;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;

//我们要传入一个URL，所以第一个参数我们定义为String类型
//第二个参数是进度，所以我们传进去一个integer，它就是publishProgress(value)的参数类型
//因为我们需要返回的一个参数类型是一张图片，所以设置为bitmap类型
//从这里我们可以知道，以后如果有返回复杂参数的时候，我们还需要定义javaBean类型
public class ImageAsyncTask extends AsyncTask<String,Integer,Bitmap>{

//    private ProgressBar mProgressBar;
    private ImageView mImageView;

    public ImageAsyncTask(ImageView mImageView) {
        super();
//        this.mProgressBar = mProgressBar;
        this.mImageView = mImageView;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        //将隐藏的mProgressBar显示出来
//        mProgressBar.setVisibility(View.VISIBLE);


    }
    //该方法传进来的是一个可变长的数组String... params
    //因为我们只传进来一个URL，所以只要取这个数组索引为0的值就行了
    @Override
    protected Bitmap doInBackground(String... params) {

        String url=params[0];
        Bitmap bitmap=null;
        URLConnection connection;
        InputStream is;
        //模拟更新进度
        for(int i=0;i<100;i++){
            //判断
            if(isCancelled())
            {
                //跳出线程
                break;
            }
            publishProgress(i);
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {

                e.printStackTrace();
            }
        }
        //通过URL.openConnection方法获得一个URLConnection对象
        try {

            URL myurl = new URL(url);
            connection=myurl.openConnection();
            connection.connect();
            is=connection.getInputStream();
            //包装一下
            BufferedInputStream bis=new BufferedInputStream(is);
            //将一个输入流解析为一个BitMap对象
            bitmap=BitmapFactory.decodeStream(is);
            //关闭输入流
            is.close();
            bis.close();
        } catch (MalformedURLException e) {
            Log.i("info", "MalformedURLException");
            e.printStackTrace();
        } catch (IOException e) {
            Log.i("info", "IOException:"+e.toString());
            e.printStackTrace();
        }

        return bitmap;
    }

    //操作UI，获取doInBackground从返回的bitmap图像
    @Override
    protected void onPostExecute(Bitmap bitmap) {
        super.onPostExecute(bitmap);
        /*mProgressBar.setVisibility(View.GONE);*/
        mImageView.setImageBitmap(bitmap);
        this.cancel(true);


    }

    @Override
    protected void onProgressUpdate(Integer... values) {
        super.onProgressUpdate(values);
        if(isCancelled()){
            return;
        }
        //从doInBackground的publishProgress方法获取到i值
        //为什么是value[0],原理跟doInBackground获取URL原理一样
//        mProgressBar.setProgress(values[0]);
    }

}
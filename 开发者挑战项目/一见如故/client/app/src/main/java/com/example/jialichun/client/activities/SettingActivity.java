package com.example.jialichun.client.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.example.jialichun.client.R;
import com.netease.nimlib.sdk.NIMClient;
import com.netease.nimlib.sdk.SDKOptions;
import com.netease.nimlib.sdk.auth.LoginInfo;

public class SettingActivity extends AppCompatActivity {
    private Intent intent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_setting);
        NIMClient.init(this, new LoginInfo("1", "a2b6d2c7b6530cbe25cdc5ab5df0dda8"), new SDKOptions());
    }
    public void onClickBack(View v) {
        // TODO Auto-generated method stub
        this.finish();
    }
    public void Logou(View v) {
        // TODO Auto-generated method stub
        MyApplication application = (MyApplication)this.getApplicationContext();
        application.setState(false);
        Intent intent=new Intent(SettingActivity.this,MainActivity.class);
        startActivity(intent);

    }
    public void onClickMessage(View v){
        intent = new Intent(this,MessageActivity.class);
        startActivity(intent);
    }
}

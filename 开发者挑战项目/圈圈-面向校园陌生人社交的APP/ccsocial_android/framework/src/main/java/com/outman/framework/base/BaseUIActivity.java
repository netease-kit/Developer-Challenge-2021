package com.outman.framework.base;

import android.content.Context;
import android.os.Bundle;

import com.outman.framework.utils.SystemUIUtils;

public class BaseUIActivity extends BaseActivity {
    /**
     * -BaseActivity 所有统一功能：语言切换，请求权限
     *  -BaseUIActivity 单一功能：沉静式
     *  -BaseBackActivity 返回键
     * @param savedInstanceState
     */
    private static Context mContext;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SystemUIUtils.fixSystemUI(this);
        mContext = getApplicationContext();


    }


    public static Context getContext(){
        return mContext;
    }

}

package com.netease.nim.ccsocial_nim.mainTab.fragment.IndexFragment.ActivityDetailActivity;

import android.animation.ValueAnimator;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.view.animation.ScaleAnimation;

public class AnimatorUtil {
    private static AnimatorUtil animatorUtil;

    public static AnimatorUtil getInstance() {
        if (animatorUtil == null) {
            animatorUtil = new AnimatorUtil();
        }
        return animatorUtil;
    }

    public static ValueAnimator getValueAnimator(int min, int max, ValueAnimator.AnimatorUpdateListener animatorUpdateListener) {
        ValueAnimator valueAnimator = ValueAnimator.ofInt(min, max);
        valueAnimator.setDuration(3000);
        valueAnimator.setInterpolator(new LinearInterpolator());
        valueAnimator.addUpdateListener(animatorUpdateListener);
        //无限循环
        valueAnimator.setRepeatCount(ValueAnimator.INFINITE);
        //从头开始动画
        valueAnimator.setRepeatMode(ValueAnimator.RESTART);
        valueAnimator.start();
        return valueAnimator;
    }
}

package com.outman.framework.entity;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

/**
 * 常量类
 */
public class Constants {
    //是否第一次进入APP
    public static final String SP_IS_FIRST_APP = "is_First_App";
    //Token
    public static String SP_TOKEN = "token";
    //OSS地址
    public static String SP_OSS_DOMAIN = "http://oss.ccsocial.cn/";
    //用户信息
    public static JsonObject SP_USER_DATA = null;
    //圈圈标签
    public static List<String> activityCircleMainLabels = new ArrayList<String>();
    public static List<String> activityCircleLabels = new ArrayList<String>();
    public static List<Integer> activityCircleIds = new ArrayList<Integer>();
    //圈圈颜色
    public static int[] ColorArray =new int[]{
            0xffbc5c4f,
            0xfff78266,
            0xffffd37d,
            0xffbcd976,
            0xff7ec1ff,
            0xff61b9b6,
            0xffca92c8,
            0xffff889b,
            0xff8180ce,
            0xff376188,
            0xffa3a595,
            0xfffc9d9a,
    };
    //筛选器选择Item
    public static String chooseRes = "";
    public static List<ChooseLabel> chooseLabelList = new ArrayList<>();
    public static ChooseStatus chooseStatus = new ChooseStatus(-1,"全部");
    public static String startTime = "不限";
    public static String endTime = "不限";




}

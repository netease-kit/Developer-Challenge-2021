package com.outman.framework.utils.NetUtils;

import android.content.Intent;

import com.outman.framework.utils.NetUtils.bean.ActivityBean;
import com.outman.framework.utils.NetUtils.bean.UserBean;
import com.outman.framework.utils.NetUtils.bean.ResponseData;

import io.reactivex.Observable;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Query;


public interface ApiService {
    /**
     * 用户模块
     * @param res
     * @return
     */
    //账号登录
    @POST("user/login")
    Observable<ResponseData> userLogin(@Body UserBean res);
    //手机号登录
    @POST("user/loginByPhone")
    Observable<ResponseData> userLoginByPhone(@Query("code")String code, @Query("userPhone")String userPhone);
    //发送验证码
    @POST("user/sendVerificationCode")
    Observable<ResponseData> userSendCode(@Query("userPhone")String userPhone);
    //注册
    @POST("user/register")
    Observable<ResponseData> userRegister(@Query ("code")String code, @Body UserBean res);
    //添加兴趣爱好
    @POST("user/addUserHobbies")
    Observable<ResponseData> addUserHobbies(@Query("userCcid") String userCcid, @Query("labels")String labels);
    //添加教务账号
    @POST("user/bindEducationalAccount")
    Observable<ResponseData> bindEducationalAccount(@Body UserBean res);
    //头像上传
    @Multipart @POST("user/uploadAvatar")
    Observable<ResponseData> uploadAvatar(@Part MultipartBody.Part imgFile, @Part("userCcid") RequestBody userCcid);
    //根据ID获取用户信息
    @GET("user/getUserByCcid")
    Observable<ResponseData> getUserByCcid(@Query("userCcid")String userCcid);
    /**
     * 活动模块
     * @return
     */
    //获取所有活动标签
    @GET("activity/getActivityLabels")
    Observable<ResponseData> getActivityLabels();
    //获取用户参与活动列表
    @GET("activity/getUserActivityByCondition")
    Observable<ResponseData> getUserActivityByCondition(@Query("userCcid")String userCcid,@Query("labels") String labels,@Query("startTime") String startTime,@Query("endTime") String endTime,
                                                        @Query("status") String status,@Query("pageNum")Integer pageNum,@Query("pageSize") Integer pageSize);
    //获取用户推荐活动
    @GET("activity/getRecommendActivityList")
    Observable<ResponseData> getRecommendActivityList(@Query("userCcid")String userCcid,@Query("listSize")int listSize);
    //根据条件筛选活动（所有）
    @GET("activity/getActivityByCondition")
    Observable<ResponseData> getActivityByCondition(@Query("labels") String labels,@Query("startTime") String startTime,@Query("endTime") String endTime,
                                                    @Query("status") String status,@Query("pageNum")Integer pageNum,@Query("pageSize") Integer pageSize);
    //创建活动
    @POST("activity/createActivity")
    Observable<ResponseData> createActivity(@Query("userCcid") String userCcid, @Body ActivityBean activityBean);
    //根据Id获取活动信息
    @GET("activity/getActivityByActivityId")
    Observable<ResponseData> getActivityByActivityId(@Query("activityId") Integer activityId);
    //加入活动
    @POST("activity/joinActivity")
    Observable<ResponseData> joinActivity(@Query("userCcid") String userCcid, @Query("activityId") Integer activityId);
    //更新用户活动状态
    @POST("activity/updateUserLoacteState")
    Observable<ResponseData> updateUserLoacteState(@Query("userCcid")String userCcid,@Query("activityId") Integer activityId,@Query("userState") Integer userState);
    /**
     * 好友模块
     */
    //添加好友
    @POST("friends/addFriend")
    Observable<ResponseData> addFriend(@Query("userAccid")String userAccid,@Query("friendAccid")String friendAccid,@Query("type")Integer type);
    //发起申请
    @POST("friends/sendFriendApply")
    Observable<ResponseData> sendFriendApply(@Query("userCcid")String userCcid,@Query("friendCcid")String friendCcid,@Query("msg")String msg);


}
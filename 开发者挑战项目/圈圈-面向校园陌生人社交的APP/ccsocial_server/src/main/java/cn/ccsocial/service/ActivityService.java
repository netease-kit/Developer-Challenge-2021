package cn.ccsocial.service;

import cn.ccsocial.model.Activity;
import cn.ccsocial.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ActivityService {


    /**
     * 根据activityId获取活动
     * @param activityId
     * @return
     */
    Activity getActivityByActivityId(String activityId);

    /**
     * 获取活动参与人员信息
     * @param activityId
     * @return
     */
    List<Object> getActivityMemberList(String activityId);

    /**
     * 活动圈/话题圈模糊查询
     * @param searchType activity(活动)/topic(话题)
     * @param key
     * @return
     */
    Map<String, Object> getCirclesByKey(String searchType,String key,int pageSize,int pageNum);

    /**
     * 筛选所有活动
     * @return Map<String, Object> (活动列表、活动总数）
     */
    Map<String, Object> getActivityByCondition(String labels,String startTime,String endTime,String status,int pageSize,int pageNum) throws Exception;

    /**
     * 根据ccid筛选用户参与活动
     * @param userCcid
     * @return Map<String, Object> (活动列表、活动总数）
     */
    Map<String, Object> getUserActivityByCondition(String userCcid,String labels,String startTime,String endTime,String status,int pageSize,int pageNum) throws Exception;

     /**
     * 根据ccid推荐活动给用户列表
     * @param ccid
     * @return List<Activity>
     */
    List<Activity> getRecommendActivityList(String ccid,int listSize) throws Exception ;

    /**
     * 创建活动
     * @param activity
     * @return
     */
    Map<String, Object> createActivity(Activity activity,String userCcid) throws Exception;

    /**
     * 头像上传
     * @param imgFile
     * @param activityId
     * @return 0：数据库保存失败 1：上传成功 -1：其他错误
     */
    int uploadPic(MultipartFile imgFile, String activityId);

    /**
     * 修改活动
     * @param activity
     * @param userCcid
     * @return 1:修改成功 -1：活动不存在，修改失败 -2：为用户权限不够，修改活动失败 -3：活动最大人数不可低于当前参与人数，修改活动失败 4：其他错误
     */
    int editActivity (Activity activity,String userCcid) throws Exception;

    /**
     * 删除活动
     * @param activityId
     * @param userCcid
     * @return 1:用户身份为creator，删除成功 -1：用户身份不为creator，删除失败 0：活动状态异常
     */
    int deleteActivity(String activityId,String userCcid);

    /**
     * 加入活动
     * @param activityId
     * @param userCcid
     * @return 1：加入成功 -1：加入失败 -2：已加入该活动 -3：活动人数已满
     */
    int joinActivity(String activityId,String userCcid) throws Exception ;

    /**
     * 退出活动
     * @param activityId
     * @param userCcid
     * @return 1:退出成功 -1：退出失败 -2：用户身份为creator无法退出
     */
    int quitActivity(String activityId,String userCcid) throws Exception ;

    /**
     * 获取所有活动Label List
     * @return Map<String, Object>
     */
    List getActivityLabels();
}

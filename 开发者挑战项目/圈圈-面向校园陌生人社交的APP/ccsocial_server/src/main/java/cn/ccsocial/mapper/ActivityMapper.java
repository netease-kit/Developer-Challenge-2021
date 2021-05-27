package cn.ccsocial.mapper;

import cn.ccsocial.model.*;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ActivityMapper {

    /**
     * 获取所有活动Label
     * @return List<Label>
     */
    List<Label> getActivityLabels();

    /**
     * 获取所有活动Label类型
     * @return List<Label>
     */
    String[] getActivityLabelTypes();

    /**
     * 根据类型获取所有活动Label
     * @return List<Label>
     */
    List<Label> getActivityLabelByType(String labelType);

    /**
     * 根据类型获取所有活动Label
     * @return List<Label>
     */
    List<Label> getActivityLabelByTypes(String[] labelTypesArr);

    /**
     * 根据labelId数组获取所有活动Label
     * @return List<Label>
     */
    List<Label> getActivityLabelBylabelIds(String[] labelIdArr);

//    /**
//     * 创建活动
//     * @param activity
//     * @return
//     */
//    int createActivity(Activity activity);
    /**
       * 创建活动
       * @param activity
       * @return
       */
    Activity createActivity(Activity activity);

    /**
     * 修改活动
     * @param activity
     * @return
     */
    int updateActivity(Activity activity);

    /**
     * 删除活动
     * @param activityId
     * @return
     */
    int deleteActivity(String activityId);

    /**
     * 绑定云信tid
     * @param activityId
     * @param activityTid
     * @return
     */
    int bindTid(String activityId,String activityTid);

    /**
     * 查询某一类型label的数目
     * @return int
     */
    int selectTypeLabelNum(String labelType);

    /**
     * 根据activityId获取活动
     */
    Activity getActivityByActivityId(String activityId);

    /**
     * 获取所有活动列表
     * @return List<Activity>
     */
    List<Activity> selectRecommendActivity(int listSize);

    /**
     * 获取所有活动列表
     * @return List<Activity>
     */
    List<Activity> selectActivity();

    /**
     * 根据label获取活动列表
     * @param labels
     * @return List<Activity>
     */
    List<Activity> selectRecommendActivityByLabel(String[] labels,int listSize);

    /**
     * 活动圈模糊查询activity(活动)(数量)
     * @param key
     * @return
     */
    int countActivityByKey(String key);

    /**
     * 活动圈模糊查询activity(活动)
     * @param key
     * @return
     */
    List<Activity> selectActivityByKey(@Param("key")String key,@Param("page")Page page);

    /**
     * 条件获取所有活动数量
     * @return
     */
    int countActivityByCondition(List<Label> labelList,String nowTimeStamp,String endTimeStamp,String startTimeStamp,String status);

    /**
     * 条件获取所有活动
     * @return
     */
    List<Activity> selectActivityByCondition(List<Label> labelList,String nowTimeStamp,String endTimeStamp,String startTimeStamp,String status,Page page);

    /**
     * 条件获取用户所有活动数量
     * @return
     */
    int countUserActivityByCondition(String userCcid,List<Label> labelList,String nowTimeStamp,String endTimeStamp,String startTimeStamp,String status);

    /**
     * 头像上传
     * @param activityId
     * @param picPath
     * @return
     */
    int uploadPic(String activityId,String picPath);

    /**
     * 条件获取用户所有活动
     * @return
     */
    List<Activity> selectUserActivityByCondition(String userCcid,List<Label> labelList,String nowTimeStamp,String endTimeStamp,String startTimeStamp,String status,Page page);

    /**
     * 查询活动发起人accid
     * @param activityId
     * @return creatorAccid
     */
    String selectCreatorAccid(String activityId);

    /**
     * 获取相同activity数量 **暂未实现
     * @param userCcid
     * @param friendCcid
     * @return
     */
    int getCommonActivityNumByCcid(String userCcid,String friendCcid);

}

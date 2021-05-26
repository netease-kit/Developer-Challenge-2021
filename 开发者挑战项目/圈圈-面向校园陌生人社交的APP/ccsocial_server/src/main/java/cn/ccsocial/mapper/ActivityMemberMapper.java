package cn.ccsocial.mapper;

import cn.ccsocial.model.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ActivityMemberMapper {

    /**
     * 获取用户在活动中的身份
     * @return
     */
    String selectIdentifyById(String activityId,String userCcid);

    /**
     * 根据activityId获取活动中参与用户的Ccid列表
     * @param activityId
     * @return
     */
    List<String> selectCcidByActivityId(String activityId);

    /**
     * 根据activityId判断人数是否超过上线
     * @param activityId
     * @return
     */
    int groupIsNotFull(String activityId);

    /**
     * 建立人和活动关系
     * @param activityId
     * @param userCcid
     * @return
     */
    int setActivityMember(String activityId,String userCcid,String userActivityIdentify);

    /**
     * 根据activityId获取活动参与人数
     * @param activityId
     * @return int
     */
    int countPeopleNumByActivityId(String activityId);

    /**
     * 根据ccid获取用户参与活动总数量
     * @param userCcid
     * @return List<ActivityMember>
     */
    int countByCcid(String userCcid);

    /**
     * 根据ccid获取用户参与活动关系列表(分页实现)
     * @param userCcid
     * @param page
     * @return
     */
    List<ActivityMember> selectByCcid(@Param("userCcid")String userCcid,@Param("page")Page page);

    /**
     *
     * 根据activityId和userCcid查询用户是否已加入
     * @param activityId
     * @param userCcid
     * @return
     */
    int countById(String activityId,String userCcid);

    /**
     * 删除活动
     * @param activityId
     */
    int deleteActivity(String activityId);

    /**
     * 退出活动
     * @param activityId
     * @param userCcid
     */
    int quitActivity(String activityId,String userCcid);
}

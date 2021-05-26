package cn.ccsocial.model;

import java.util.Date;

public class Activity {

    /**
     * 主键:activityId
     */
    private String activityId;

    /**
     * 活动名称
     */
    private String activityName;

    /**
     * 活动目前参与人数
     */
    private String activityPeopleNum;

    /**
     * 活动最大参与人数
     */
    private String activityMaxPeopleNum;

    /**
     * 活动地点
     */
    private String activityLocation;

    /**
     * 活动是否私密
     */
    private String activityIsPrivate;

    /**
     * 活动描述
     */
    private String activityDescribe;

    /**
     * 活动状态：进行中/已结束/未开始
     */
    private String activityStatus;

    /**
     * 活动开始时间
     */
    private String activityStartTime;

    /**
     * 活动结束时间
     */
    private String activityEndTime;

    /**
     * 活动类型标签
     */
    private String activityLabel;

    /**
     * 活动创建时间
     */
    private String activityCreateTime;

    /**
     * 活动经度
     */
    private String activityLong;

    /**
     * 活动纬度
     */
    private String activityLat;

    /**
     * 活动范围
     */
    private String activityRange;

    /**
     * 活动群组号
     */
    private String activityTid;

    /**
     * 活动图片
     */
    private String activityPic;

    /**
     * 活动发起人
     */
    private String activityCreator;

    public String getActivityId() {
        return activityId;
    }

    public void setActivityId(String activityId) {
        this.activityId = activityId;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getActivityPeopleNum() {
        return activityPeopleNum;
    }

    public void setActivityPeopleNum(String activityPeopleNum) {
        this.activityPeopleNum = activityPeopleNum;
    }

    public String getActivityMaxPeopleNum() {
        return activityMaxPeopleNum;
    }

    public void setActivityMaxPeopleNum(String activityMaxPeopleNum) {
        this.activityMaxPeopleNum = activityMaxPeopleNum;
    }

    public String getActivityLocation() {
        return activityLocation;
    }

    public void setActivityLocation(String activityLocation) {
        this.activityLocation = activityLocation;
    }

    public String getActivityIsPrivate() {
        return activityIsPrivate;
    }

    public void setActivityIsPrivate(String activityIsPrivate) {
        this.activityIsPrivate = activityIsPrivate;
    }

    public String getActivityDescribe() {
        return activityDescribe;
    }

    public void setActivityDescribe(String activityDescribe) {
        this.activityDescribe = activityDescribe;
    }

    public String getActivityStatus() {
        return activityStatus;
    }

    public void setActivityStatus(String activityStatus) {
        this.activityStatus = activityStatus;
    }

    public String getActivityCreateTime() {
        return activityCreateTime;
    }

    public void setActivityCreateTime(String activityCreateTime) {
        this.activityCreateTime = activityCreateTime;
    }

    public String getActivityStartTime() {
        return activityStartTime;
    }

    public void setActivityStartTime(String activityStartTime) {
        this.activityStartTime = activityStartTime;
    }

    public String getActivityEndTime() {
        return activityEndTime;
    }

    public void setActivityEndTime(String activityEndTime) {
        this.activityEndTime = activityEndTime;
    }

    public String getActivityLabel() {
        return activityLabel;
    }

    public void setActivityLabel(String activityLabel) {
        this.activityLabel = activityLabel;
    }

    public String getActivityLong() {
        return activityLong;
    }

    public void setActivityLong(String activityLong) {
        this.activityLong = activityLong;
    }

    public String getActivityLat() {
        return activityLat;
    }

    public void setActivityLat(String activityLat) {
        this.activityLat = activityLat;
    }

    public String getActivityRange() {
        return activityRange;
    }

    public void setActivityRange(String activityRange) {
        this.activityRange = activityRange;
    }

    public String getActivityTid() {
        return activityTid;
    }

    public void setActivityTid(String activityTid) {
        this.activityTid = activityTid;
    }

    public String getActivityPic() {
        return activityPic;
    }

    public void setActivityPic(String activityPic) {
        this.activityPic = activityPic;
    }

    public String getActivityCreator() {
        return activityCreator;
    }

    public void setActivityCreator(String activityCreator) {
        this.activityCreator = activityCreator;
    }
}

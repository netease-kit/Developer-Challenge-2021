package com.outman.framework.entity;

public class ActivityItem {
    private int activityId;
    private int activityLabel;
    private int activityPeopleNum;
    private int activityMaxPeopleNum;
    private String activityName;
    private String  activityLocation;
    private String  activityIsPrivate;
    private String activityDescribe;
    private String  activityStatus;
    private String   activityStartTime;
    private String   activityEndTime;
    private String   activityCreateTime;

    public String getActivityPic() {
        return activityPic;
    }

    public void setActivityPic(String activityPic) {
        this.activityPic = activityPic;
    }

    private String activityPic;

    public int getActivityId() {
        return activityId;
    }

    public void setActivityId(int activityId) {
        this.activityId = activityId;
    }

    public int getActivityLabel() {
        return activityLabel;
    }

    public void setActivityLabel(int activityLabel) {
        this.activityLabel = activityLabel;
    }

    public int getActivityPeopleNum() {
        return activityPeopleNum;
    }

    public void setActivityPeopleNum(int activityPeopleNum) {
        this.activityPeopleNum = activityPeopleNum;
    }

    public int getActivityMaxPeopleNum() {
        return activityMaxPeopleNum;
    }

    public void setActivityMaxPeopleNum(int activityMaxPeopleNum) {
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

    public String getActivityCreateTime() {
        return activityCreateTime;
    }

    public void setActivityCreateTime(String activityCreateTime) {
        this.activityCreateTime = activityCreateTime;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    @Override
    public String toString() {
        return "ActivityItem{" +
                "activityId=" + activityId +
                ", activityLabel=" + activityLabel +
                ", activityPeopleNum=" + activityPeopleNum +
                ", activityMaxPeopleNum=" + activityMaxPeopleNum +
                ", activityName='" + activityName + '\'' +
                ", activityLocation='" + activityLocation + '\'' +
                ", activityIsPrivate='" + activityIsPrivate + '\'' +
                ", activityDescribe='" + activityDescribe + '\'' +
                ", activityStatus='" + activityStatus + '\'' +
                ", activityStartTime='" + activityStartTime + '\'' +
                ", activityEndTime='" + activityEndTime + '\'' +
                ", activityCreateTime='" + activityCreateTime + '\'' +
                '}';
    }
}

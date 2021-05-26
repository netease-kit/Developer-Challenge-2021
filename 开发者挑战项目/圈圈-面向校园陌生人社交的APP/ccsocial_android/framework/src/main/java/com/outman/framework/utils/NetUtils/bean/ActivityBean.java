package com.outman.framework.utils.NetUtils.bean;

public class ActivityBean {
    private int activityLabel;
    private int activityMaxPeopleNum;
    private int activityIsPrivate;
    private String activityName;
    private String activityLocation;
    private Double activityLong;
    private Double activityLat;
    private Double activityRange;
    private String activityDescribe;
    private String activityStartTime;
    private String activityEndTime;


    public int getActivityLabel() {
        return activityLabel;
    }

    public void setActivityLabel(int activityLabel) {
        this.activityLabel = activityLabel;
    }

    public int getActivityMaxPeopleNum() {
        return activityMaxPeopleNum;
    }

    public void setActivityMaxPeopleNum(int activityMaxPeopleNum) {
        this.activityMaxPeopleNum = activityMaxPeopleNum;
    }

    public int getActivityIsPrivate() {
        return activityIsPrivate;
    }

    public void setActivityIsPrivate(int activityIsPrivate) {
        this.activityIsPrivate = activityIsPrivate;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getActivityLocation() {
        return activityLocation;
    }

    public void setActivityLocation(String activityLocation) {
        this.activityLocation = activityLocation;
    }

    public String getActivityDescribe() {
        return activityDescribe;
    }

    public void setActivityDescribe(String activityDescribe) {
        this.activityDescribe = activityDescribe;
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

    public Double getActivityLong() {
        return activityLong;
    }

    public void setActivityLong(Double activityLong) {
        this.activityLong = activityLong;
    }

    public Double getActivityLat() {
        return activityLat;
    }

    public void setActivityLat(Double activityLat) {
        this.activityLat = activityLat;
    }

    public Double getActivityRange() {
        return activityRange;
    }

    public void setActivityRange(Double activityRange) {
        this.activityRange = activityRange;
    }

    @Override
    public String toString() {
        return "ActivityBean{" +
                "activityLabel=" + activityLabel +
                ", activityMaxPeopleNum=" + activityMaxPeopleNum +
                ", activityIsPrivate=" + activityIsPrivate +
                ", activityName='" + activityName + '\'' +
                ", activityLocation='" + activityLocation + '\'' +
                ", activityLong=" + activityLong +
                ", activityLat=" + activityLat +
                ", activityRange=" + activityRange +
                ", activityDescribe='" + activityDescribe + '\'' +
                ", activityStartTime='" + activityStartTime + '\'' +
                ", activityEndTime='" + activityEndTime + '\'' +
                '}';
    }
}

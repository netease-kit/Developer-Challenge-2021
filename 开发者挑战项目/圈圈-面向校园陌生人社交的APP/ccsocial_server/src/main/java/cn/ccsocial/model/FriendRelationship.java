package cn.ccsocial.model;

import java.util.Date;

public class FriendRelationship {
    /**
     * 主键：userCcid和friendCcid
     */
    private String userCcid;
    private String friendCcid;
    private String friendNotContactDays;
    private String friendCommonActivityNum;
    private String userRemarks;
    private String friendRemarks;
    private String userGroup;
    private String friendGroup;
    private String friendCreateTime;

    public String getUserCcid() {
        return userCcid;
    }

    public void setUserCcid(String userCcid) {
        this.userCcid = userCcid;
    }

    public String getFriendCcid() {
        return friendCcid;
    }

    public void setFriendCcid(String friendCcid) {
        this.friendCcid = friendCcid;
    }

    public String getFriendNotContactDays() {
        return friendNotContactDays;
    }

    public void setFriendNotContactDays(String friendNotContactDays) {
        this.friendNotContactDays = friendNotContactDays;
    }

    public String getFriendCommonActivityNum() {
        return friendCommonActivityNum;
    }

    public void setFriendCommonActivityNum(String friendCommonActivityNum) {
        this.friendCommonActivityNum = friendCommonActivityNum;
    }

    public String getUserRemarks() {
        return userRemarks;
    }

    public void setUserRemarks(String userRemarks) {
        this.userRemarks = userRemarks;
    }

    public String getFriendRemarks() {
        return friendRemarks;
    }

    public void setFriendRemarks(String friendRemarks) {
        this.friendRemarks = friendRemarks;
    }

    public String getUserGroup() {
        return userGroup;
    }

    public void setUserGroup(String userGroup) {
        this.userGroup = userGroup;
    }

    public String getFriendGroup() {
        return friendGroup;
    }

    public void setFriendGroup(String friendGroup) {
        this.friendGroup = friendGroup;
    }

    public String getFriendCreateTime() {
        return friendCreateTime;
    }

    public void setFriendCreateTime(String friendCreateTime) {
        this.friendCreateTime = friendCreateTime;
    }
}

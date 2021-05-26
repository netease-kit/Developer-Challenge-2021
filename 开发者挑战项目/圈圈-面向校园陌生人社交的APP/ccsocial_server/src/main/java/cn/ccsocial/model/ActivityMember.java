package cn.ccsocial.model;

public class ActivityMember {
    private String activityId;
    private String userCcid;
    private String userActivityIdentify;

    public String getActivityId() {
        return activityId;
    }

    public void setActivityId(String activityId) {
        this.activityId = activityId;
    }

    public String getUserCcid() {
        return userCcid;
    }

    public void setUserCcid(String userCcid) {
        this.userCcid = userCcid;
    }

    public String getUserActivityIdentify() {
        return userActivityIdentify;
    }

    public void setUserActivityIdentify(String userActivityIdentify) {
        this.userActivityIdentify = userActivityIdentify;
    }
}

package cn.ccsocial.model;

public class EducationalAccount {
    private String userEducationalId;
    private String userEducationalPassword;
    private String userCcid;

    public String getUserEducationalId() {
        return userEducationalId;
    }

    public void setUserEducationalId(String userEducationalId) {
        this.userEducationalId = userEducationalId;
    }

    public String getUserEducationalPassword() {
        return userEducationalPassword;
    }

    public void setUserEducationalPassword(String userEducationalPassword) {
        this.userEducationalPassword = userEducationalPassword;
    }

    public String getUserCcid() {
        return userCcid;
    }

    public void setUserCcid(String userCcid) {
        this.userCcid = userCcid;
    }
}

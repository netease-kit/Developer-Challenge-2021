package cn.ccsocial.model;

public class Friend {
    private String updatetime;
    private String faccid;
    private String fccid;

    public String getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(String updatetime) {
        this.updatetime = updatetime;
    }

    public String getFaccid() {
        return faccid;
    }

    public void setFaccid(String faccid) {
        this.faccid = faccid;
    }

    public Friend() {
    }

    public Friend(String updatetime, String faccid) {
        this.updatetime = updatetime;
        this.faccid = faccid;
    }

    public String getFccid() {
        return fccid;
    }

    public void setFccid(String fccid) {
        this.fccid = fccid;
    }
}

package cn.ccsocial.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Label {
    private String labelId;
    private String labelType;
    private String labelName;

    public String getLabelId() {
        return labelId;
    }

    public void setLabelId(String labelId) {
        this.labelId = labelId;
    }
    @JsonIgnore(true)
    public String getLabelType() {
        return labelType;
    }
    @JsonProperty
    public void setLabelType(String labelType) {
        this.labelType = labelType;
    }

    public String getLabelName() {
        return labelName;
    }

    public void setLabelName(String labelName) {
        this.labelName = labelName;
    }
}

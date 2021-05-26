package cn.ccsocial.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LabelHobbit {
    private String labelId;
    private String labelType;
    private String labelName;
    /**
     * 标签喜好度
     */
    private Double labelHobbitValue;

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

    public Double getLabelHobbitValue() {
        return labelHobbitValue;
    }

    public void setLabelHobbitValue(Double labelHobbitValue) {
        this.labelHobbitValue = labelHobbitValue;
    }

    public LabelHobbit(Label label,Double labelHobbitValue) {
        this.labelId=label.getLabelId();
        this.labelType = label.getLabelType();
        this.labelName = label.getLabelName();
        this.labelHobbitValue = labelHobbitValue;
    }
}

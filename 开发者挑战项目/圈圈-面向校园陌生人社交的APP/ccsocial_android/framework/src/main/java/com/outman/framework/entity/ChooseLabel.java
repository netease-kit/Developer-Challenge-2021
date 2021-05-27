package com.outman.framework.entity;

import java.util.Objects;

public class ChooseLabel {
    private int labelId;
    private String labelName;

    public int getLabelId() {
        return labelId;
    }

    public void setLabelId(int labelId) {
        this.labelId = labelId;
    }

    public String getLabelName() {
        return labelName;
    }

    public void setLabelName(String labelName) {
        this.labelName = labelName;
    }

    @Override
    public String toString() {
        return "ChooseLabel{" +
                "labelId=" + labelId +
                ", labelName='" + labelName + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChooseLabel that = (ChooseLabel) o;
        return labelId == that.labelId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(labelId);
    }
}

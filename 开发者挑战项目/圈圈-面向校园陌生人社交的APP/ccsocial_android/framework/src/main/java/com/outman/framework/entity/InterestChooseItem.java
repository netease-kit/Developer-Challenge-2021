package com.outman.framework.entity;

public class InterestChooseItem {
    private int tagId;
    private Boolean isSelected;
    private String tagName;
    private int typeId;

    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    public Boolean getSelected() {
        return isSelected;
    }

    public void setSelected(Boolean selected) {
        isSelected = selected;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    @Override
    public String toString() {
        return "InterestChooseItem{" +
                "tagId=" + tagId +
                ", isSelected=" + isSelected +
                ", tagName='" + tagName + '\'' +
                ", typeId=" + typeId +
                '}';
    }
}

package com.netease.nim.ccsocial_nim.main.model;

/**
 * Created by hzxuwen on 2015/6/29.
 */
public class SettingTemplate {
    private int id;
    private int icon;
    private int type;
    private String title; // left title
    private String detail; // right detail
    private boolean visible;
    private boolean checked;
    private int checkedId; // type==TYPE_THREE_CHOOSE_ONE; 默认被选中项的ID

    public SettingTemplate(int id, String title) {
        this(id, title, 0);
    }

    public SettingTemplate(int id, int type) {
        this(id, null, type, 0);
    }

    public SettingTemplate(int id, String title, String detail) {
        this(id, title, 0);
        this.detail = detail;
    }

    public SettingTemplate(int id, String title, int type) {
        this(id, title, type, 0);
    }

    public SettingTemplate(int id, String title, int type, boolean checked) {
        this(id, title, type, 0);
        this.checked = checked;
    }


    public SettingTemplate(int id, String title, int type, Void icon, int checkedId) {
        this(id, title, type, 0);
        this.checkedId = checkedId;
    }

    public SettingTemplate(int id, String title, int type, int icon) {
        this.id = id;
        this.icon = icon;
        this.title = title;
        this.type = type;
        this.visible = true;
    }

    public static SettingTemplate makeSeperator() {
        return new SettingTemplate(0, SettingType.TYPE_SEPERATOR);
    }

    public static SettingTemplate addLine() {
        return new SettingTemplate(0, SettingType.TYPE_LINE);
    }

    public int getId() {
        return id;
    }

    public int getIcon() {
        return icon;
    }

    public int getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getDetail() {
        return detail;
    }

    public boolean isVisible() {
        return visible;
    }

    public boolean getChekced() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public int getCheckedId() {
        return this.checkedId;
    }

    public void setCheckedId(int checkedId) {
        this.checkedId = checkedId;
    }
}

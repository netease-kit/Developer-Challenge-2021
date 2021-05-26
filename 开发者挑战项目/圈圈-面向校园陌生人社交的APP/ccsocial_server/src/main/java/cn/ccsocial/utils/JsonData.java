package cn.ccsocial.utils;

public class JsonData {

    /**
     * 状态码 1表示成功过，0表示处理中，-1 表示失败
     */
    private Integer code;

    /**
     * 业务数据
     */
    private Object data;

    /**
     * 信息表示
     */
    private String msg;

    public  JsonData(){}

    public  JsonData(Integer code, Object data, String msg){
        this.code = code;
        this.data = data;
        this.msg = msg;
    }


    /**
     * 成功，不用返回数据
     * @return
     */
    public static JsonData buildSuccess(){
        return new JsonData(1,null,null);
    }

    /**
     * 成功，返回数据
     * @param data
     * @return
     */
    public static JsonData buildSuccess(Object data){
        return new JsonData(1,data,null);
    }

    /**
     * 成功，返回数据+msg
     * @param data
     * @return
     */
    public static JsonData buildSuccess(Object data,String msg){
        return new JsonData(1,data,msg);
    }
    /**
     * 成功，自定义错误码和信息
     * @return
     */
    public static JsonData buildSuccess(int code,Object data,String msg){
        return new JsonData(code,data,msg);
    }

    /**
     * 失败，固定状态码
     * @param msg
     * @return
     */
    public static JsonData buildError(String  msg){
        return new JsonData(-1 ,null,msg);
    }


    /**
     * 失败，自定义错误码和信息
     * @param code
     * @param msg
     * @return
     */
    public static JsonData buildError(Integer code , String  msg){
        return new JsonData(code ,null,msg);
    }

    /**
     * 失败，自定义错误码和信息
     * @param code
     * @param data
     * @param msg
     * @return
     */
    public static JsonData buildError(Integer code ,Object data, String  msg){
        return new JsonData(code ,data,msg);
    }


    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}

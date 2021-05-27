package cn.ccsocial.utils;

import cn.ccsocial.mapper.ActivityMapper;
import cn.ccsocial.mapper.ActivityMemberMapper;
import cn.ccsocial.model.Activity;
import cn.ccsocial.model.ActivityMember;
import cn.ccsocial.model.Page;
import cn.ccsocial.model.User;
import cn.ccsocial.service.impl.ActivityServiceImpl;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.io.File;
import java.security.MessageDigest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 工具类
 */
@Component
public class CommonUtils {

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(CommonUtils.class);
    AliyunOSSUtil aliyunOSSUtil = new AliyunOSSUtil();
    @Resource
    private ActivityMemberMapper activityMemberMapper;

    private static CommonUtils commonUtils;

    @PostConstruct
    public void init() {
        commonUtils = this;
        // 初使化时将已静态化的configParam实例化
        commonUtils.activityMemberMapper = this.activityMemberMapper;
    }

    /**
     * MD5加密工具类
     * @param data
     * @return
     */
    public static String MD5(String data)  {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] array = md.digest(data.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder();
            for (byte item : array) {
                sb.append(Integer.toHexString((item & 0xFF) | 0x100).substring(1, 3));
            }

            return sb.toString().toUpperCase();
        } catch (Exception exception) {
        }
        return null;
    }

    /**
     * 数组转字符串类
     * @param strArr
     * @return []
     */
    public static String arrParseToStr(String[] strArr)  {
        logger.info(strArr[0]);
        String str="[";
        if(strArr == null){
            return "";
        }else{
            for(int i=0;i<strArr.length;i++){
                str +="\"" +strArr[i]+"\"";
                if(i!=strArr.length-1){
                    str+=",";
                }
            }
        str+="]";
        return str;
        }
    }

    /**
     * 获取唯一的Ccid类
     * @param length
     * @return
     */
    public static String getCcid(int length)  {
        String ccid = Integer.toString((int)((Math.random()*9+1)*Math.pow(10,length-1)));
        return "cc"+ccid;
    }

    /**
     * 获取指定长度字符串
     * @param length
     * @return
     */
    public static String getRandomString(int length)  {
        RandomStringUtils randomStringUtils=new RandomStringUtils();
        String str=randomStringUtils.randomAlphanumeric(length);
        return str;
    }

    /**
     * 计算并获取CheckSum
     * @param appSecret
     * @param nonce
     * @param curTime
     * @return
     */
        public static String getCheckSum(String appSecret, String nonce, String curTime) {
            return encode("sha1", appSecret + nonce + curTime);
        }

        private static String encode(String algorithm, String value) {
            if (value == null) {
                return null;
            }
            try {
                MessageDigest messageDigest
                        = MessageDigest.getInstance(algorithm);
                messageDigest.update(value.getBytes());
                return getFormattedText(messageDigest.digest());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        private static String getFormattedText(byte[] bytes) {
            int len = bytes.length;
            StringBuilder buf = new StringBuilder(len * 2);
            for (int j = 0; j < len; j++) {
                buf.append(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);
                buf.append(HEX_DIGITS[bytes[j] & 0x0f]);
            }
            return buf.toString();
        }
        private static final char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5',
                '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
    /**
     * 判断活动状态
     * @param activity
     * @return
     */
    public static String getActivityStatus(Activity activity) {
        String startTime = activity.getActivityStartTime();
        String endTime = activity.getActivityEndTime();
        String nowTime = DateUtil.getTime();
        Date nowTimeDate = DateUtil.getYMDate(nowTime);
        Date startTimeDate = DateUtil.getYMDate(startTime);
        Date endTimeDate = DateUtil.getYMDate(endTime);
        String status;
        if(nowTimeDate.after(startTimeDate)){
            if(nowTimeDate.after(endTimeDate)){
                status="已结束";
            }else{
                status="进行中";
            }
        }else{
            status="未开始";
        }
        return status;
    }
    /**
     * 将List<Activity>中所有Activity进行时间戳转换成yyyy-MM-dd HH:mm,并且将显示活动的状态
     * @param activity
     * @return
     */
    public Activity activityConvert(Activity activity) {
            //日期时间戳转化成正常格式
            String startTime=DateUtil.StampToTime(activity.getActivityStartTime());
            String endTime=DateUtil.StampToTime(activity.getActivityEndTime());
            String createTime=DateUtil.StampToTime(activity.getActivityCreateTime());
            activity.setActivityStartTime(startTime);
            activity.setActivityEndTime(endTime);
            activity.setActivityCreateTime(createTime);
            //设置状态
            String status = CommonUtils.getActivityStatus(activity);
            activity.setActivityStatus(status);
            //设置参与人数
            String peopleNum = String.valueOf(commonUtils.activityMemberMapper.countPeopleNumByActivityId(activity.getActivityId()));
            activity.setActivityPeopleNum(peopleNum);
            //图片路径绝对路径转化为相对路径
            String activityPic = activity.getActivityPic();
            String picPath = aliyunOSSUtil.getPicPath(activityPic);
            activity.setActivityPic(picPath);
            return activity;
        }

    /**
     * 将List<Activity>中所有Activity进行时间戳转换成yyyy-MM-dd HH:mm,并且将显示活动的状态
     * @param activityList)
     * @return
     */
    public List<Activity> activityListConvert(List<Activity> activityList) {
        for(int i = 0;i<activityList.size();i++){
            this.activityConvert(activityList.get(i));
        }
        return activityList;
    }

    /**
     * 用户格式清洗
     * @param user
     */
    public User userFormat(User user) {
        //头像绝对路径转化为相对路径
        String avatarName = user.getUserAvatar();
        String avatarPath = aliyunOSSUtil.getPicPath(avatarName);
        user.setUserAvatar(avatarPath);
        String createTime=DateUtil.StampToTime(user.getUserCreateTime());
        user.setUserCreateTime(createTime);
        return user;
    }

    /**
     * 分页工具类 传入页面大小、页号和总数
     * @param pageSize
     * @param pageNum
     * @param totalNum
     * @return 返回页面起始位置和查询条数
     */
    public Page pageLimit(int pageSize,int pageNum, int totalNum) {
        //总页号
        double doublePageTotalNum = Math.ceil((double)totalNum/pageSize);
        logger.info(Double.toString(doublePageTotalNum));
        int pageTotalNum = (int) doublePageTotalNum;
        logger.info(Integer.toString(pageTotalNum));
        //最后一页的数量
        int lastPageQty = totalNum%pageSize;

        System.out.println("pageTotalNum："+pageTotalNum+"lastPageQty："+lastPageQty);
        if(pageNum < pageTotalNum){
        /**
         * 情况一：正常情况,不在最后一页，页面也不止一页
         */
            Page page =new Page((pageNum-1)*pageSize,pageSize);
            return page;
        }else if(pageNum == pageTotalNum){
        /**
         * 情况二：在最后一页
         */
            int nowPageNum ;
            if(lastPageQty==0){
                //最后一页是满的
                nowPageNum = pageSize;
            }else{
                //最后一页不是满的
                nowPageNum = lastPageQty;
            }
            Page page =new Page((pageNum-1)*pageSize,nowPageNum);
            return page;
        }else{
        /**
         * 情况三：异常情况 不返回
         */
            Page page =new Page(-1,-1);
            return page;
        }
    }

    /**
     * 状态码工具类
     * @param status
     * @return
     */
     public int getCode(String status){
         int code = 0;
         if(status.equals("ready")){
             code = 1;
         }else if(status.equals("started")){
             code = 2;
         }else if(status.equals("end")){
             code = 3;
         }
         return code;
     }
}

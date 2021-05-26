package cn.ccsocial.utils;


import cn.ccsocial.model.Activity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

    /**
     * 将长时间格式时间转换为字符串 yyyy-MM-dd HH:mm:ss
     *
     * @param dateDate
     * @return
     */
    public static String dateToStrLong(Date dateDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(dateDate);
        return dateString;
    }

    /**
     * 将长时间格式时间转换为字符串 yyyy-MM-dd HH:mm
     *
     * @param dateDate
     * @return
     */
    public static String dateToStrLo(Date dateDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String dateString = formatter.format(dateDate);
        return dateString;
    }

    /**
     * 将短时间格式时间转换为字符串 yyyy-MM-dd
     *
     * @param dateDate
     * @param
     * @return
     */
    public static String dateToStr(Date dateDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = formatter.format(dateDate);
        return dateString;
    }

    /**
     * 将短时间格式时间转换为字符串yyyy年MM月dd日
     *
     * @param dateDate
     * @param
     * @return
     */
    public static String dateToDateStr(Date dateDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日");
        String dateString = formatter.format(dateDate);
        return dateString;
    }

    /**
     * 获取时间 年 月 日 小时:分;秒 yyyy-MM-dd HH:mm
     *
     * @return
     */
    public static String getTime() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date currentTime = new Date();
        String dateString = formatter.format(currentTime);
        return dateString;
    }
    /**
     * 获取时间 年 月 日 小时:分;秒 yyyy-MM-dd HH:mm
     *
     * @return
     */
    public static String getTimeStamp() throws Exception{
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date currentTime = new Date();
        String dateString = formatter.format(currentTime);
        String stamp = DateUtil.TimeToStamp(dateString);
        return stamp;
    }
    /**
     * 获取时间 小时:分;秒 HH:mm:ss
     *
     * @return
     */
    public static String getTimeShort() {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
        Date currentTime = new Date();
        String dateString = formatter.format(currentTime);
        return dateString;
    }

    /**
     * 获取Y - M的date
     *
     * @return 返回时间类型 yyyy-MM-dd HH:mm
     */
    public static Date getYMDate(String time) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date = null;
        try {
            date = formatter.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 获取Y - M的date
     *
     * @return 返回时间类型 yyyy-MM-dd HH:mm
     */
    public static Date getYMSDate(String time) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
            date = formatter.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 一个date修改方法,修改参数，正负 可以实现增加减少
     */
    public static Date doDate(Date date,int y,int m,int d){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        d += c.get(Calendar.DATE);
        m += c.get(Calendar.MONTH);
        y += c.get(Calendar.YEAR);
        c.set(Calendar.DATE, d);
        c.set(Calendar.MONTH, m);
        c.set(Calendar.YEAR, y);
        return c.getTime();
    }

    /**
     * 时间戳转换为yyyy-MM-dd HH:mm格式/
     */
    public static String StampToTime(String strStamp) {
        long stamp = Long.parseLong(strStamp);
        Date date = new Date(stamp);//新建一个时间对象
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");//你要转换成的时间格式,大小写不要变
        String time = sdf.format(date);//转换你的时间
        return time;
    }

    /**
     *yyyy-MM-dd格式转换为时间戳
     */
    public static String TimeToStamp(String date) throws Exception {
        final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        final Date datetime = sdf.parse(date);//将你的日期转换为时间戳
        final long time = datetime.getTime();
        //System.out.println(date+"转换后是："+time);
        return Long.toString(time);
    }

    public static String getFileTime() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date currentTime = new Date();
        String dateString = formatter.format(currentTime);
        return dateString;
    }

    public static String getTimeByMinute(int minute) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, minute);
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(calendar.getTime());
    }

    /**
     * 判断日期是否合法
     * @param str
     * @return
     */
    public static boolean check (String str) {
        //System.out.println(str);
        SimpleDateFormat sd=new SimpleDateFormat("yyyy-MM-dd HH:mm");//括号内为日期格式，y代表年份，M代表年份中的月份（为避免与小时中的分钟数m冲突，此处用M），d代表月份中的天数
        try {
            sd.setLenient(false);//此处指定日期/时间解析是否不严格，在true是不严格，false时为严格
            sd.parse(str);//从给定字符串的开始解析文本，以生成一个日期
        }
        catch (Exception e) {
            return false;
        }
        return true;
    }
}
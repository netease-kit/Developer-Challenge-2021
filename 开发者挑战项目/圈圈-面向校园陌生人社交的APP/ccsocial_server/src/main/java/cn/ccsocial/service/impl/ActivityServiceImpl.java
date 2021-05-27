package cn.ccsocial.service.impl;

import cn.ccsocial.mapper.*;
import cn.ccsocial.model.*;
import cn.ccsocial.service.ActivityService;
import cn.ccsocial.utils.AliyunOSSUtil;
import cn.ccsocial.utils.CommonUtils;
import cn.ccsocial.utils.DateUtil;
import cn.ccsocial.utils.YunxinAPI;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileOutputStream;
import java.rmi.server.ExportException;
import java.util.*;

@Service
public class ActivityServiceImpl implements ActivityService{

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(ActivityServiceImpl.class);
    @Resource
    private ActivityMapper activityMapper;
    @Resource
    private ActivityMemberMapper activityMemberMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private FriendMapper friendMapper;
    @Resource
    private UserHobbitsMapper userHobbitsMapper;
    @Resource
    private YunxinAPI yunxinAPI;


    CommonUtils commonUtils = new CommonUtils();

    @Override
    public Activity getActivityByActivityId(String activityId) {
        Activity activity = activityMapper.getActivityByActivityId(activityId);
        if(activity!=null){
            activity=commonUtils.activityConvert(activity);
            return activity;
        }else{
            return null;
        }
    }

    @Override
    public List<Object> getActivityMemberList(String activityId) {
        List<String> CcidList = activityMemberMapper.selectCcidByActivityId(activityId);
        List<Object> activityMemberList = new ArrayList<>();
        for(String userCcid : CcidList){
            Map<String, Object> map = new HashMap<String, Object>();
            User user = userMapper.selectByCcid(userCcid);
            commonUtils.userFormat(user);
            map.put("user",user);
            map.put("identify",activityMemberMapper.selectIdentifyById(activityId,userCcid));
            activityMemberList.add(map);
        }
        return activityMemberList;
    }

    @Override
    public List getActivityLabels() {
        String[] typeArr = activityMapper.getActivityLabelTypes();
        System.out.println(typeArr.toString());
        List labelList = new ArrayList();
        int i;
        String type;
        for(i=0;i<typeArr.length;i++){
            type=typeArr[i];
            System.out.println(type);
            List<Label> labels = activityMapper.getActivityLabelByType(type);
            Map<String, Object> labelMap = new HashMap<String, Object>();
            int labelNum = activityMapper.selectTypeLabelNum(type);
            labelMap.put("labelList", labels);
            labelMap.put("labelNum", labelNum);
            labelMap.put("labelType", type);
            labelList.add(labelMap);
        }
        return labelList;
    }

    /**
     * @param  searchType：传入格式：activity(活动)   topic(话题)
     */
    @Override
    public Map<String, Object> getCirclesByKey(String searchType,String key,int pageSize,int pageNum){
        /**
         * 初始化参数
         */
        //活动总数
        int activityTotalNum;
        //Page类的类型，里面有查询起始位置和页面查询数量
        Page page;
        //筛选之后的活动列表
        List<Activity> activityList;
        //结果activityListMap：里面有活动总数和活动列表
        Map<String, Object> activityListMap = new HashMap<String, Object>();

        if(searchType==null&&searchType.equals("")){
            /**
             * 默认：目前是活动查询
             */
            activityTotalNum = activityMapper.countActivityByKey(key);
            //生成返回Page类的类型，里面有查询起始位置和页面查询数量
            page = commonUtils.pageLimit(pageSize,pageNum,activityTotalNum);
            activityList= activityMapper.selectActivityByKey(key,page);
            commonUtils.activityListConvert(activityList);
            activityListMap.put("activityList", activityList);
            return activityListMap;
        }else if (searchType.equals("activity")){
            /**
             * 活动查询
             */
            activityTotalNum = activityMapper.countActivityByKey(key);
            //生成返回Page类的类型，里面有查询起始位置和页面查询数量
            page = commonUtils.pageLimit(pageSize,pageNum,activityTotalNum);
            if(page.getStartLoaction()==-1||page.getPageQty()==-1) {
                activityListMap.put("activityList", null);
            }else{
                activityList= activityMapper.selectActivityByKey(key,page);
                commonUtils.activityListConvert(activityList);
                activityListMap.put("activityList", activityList);
            }
            activityListMap.put("totalNum", activityTotalNum);
            return activityListMap;
        }else if (searchType.equals("topic")){
            /**
             * 话题查询
             */
            //map.put("topicList", topicList);
            return activityListMap;
        }else{
            return null;
        }
    }

    /**
     * @param  status：传入格式：ready(未开始)  started(已开始)  end(已结束)
     */
    @Override
    public Map<String, Object> getActivityByCondition(String labels,String startTime,String endTime,String status,int pageSize,int pageNum) throws Exception{
        /**
         * 初始化参数
         */
        //活动总数
        int activityTotalNum;
        //Page类的类型，里面有查询起始位置和页面查询数量
        Page page;
        //筛选之后的活动列表
        List<Activity> activityList;
        //结果activityListMap：里面有活动总数和活动列表
        Map<String, Object> activityListMap = new HashMap<String, Object>();
        //时间戳定义
        String startTimeStamp ;
        String endTimeStamp ;
        String nowTimeStamp = DateUtil.getTimeStamp();
        //labelType数组
        String[] labelIdArr;
        //label列表
        List<Label> labelList = new ArrayList<>();

        /**
         * 时间数据转换为时间戳类型
         */
        if(startTime==null||startTime.equals("")) {
            startTimeStamp = "";
        }else{
            startTimeStamp = DateUtil.TimeToStamp(startTime);
        }
        if(endTime==null||endTime.equals("")) {
            endTimeStamp = "";
        }else{
            endTimeStamp = DateUtil.TimeToStamp(endTime);
        }

        if(labels!=null&&!labels.equals("")){
            //获得传入用户选择的label,生成labelString数组
            labelIdArr = labels.split("-");
            //通过labelIdArr获取label列表
            labelList=activityMapper.getActivityLabelBylabelIds(labelIdArr);
        }else{
            //label为空则默认用户选择了所有类型,生成labelList
            labelList = activityMapper.getActivityLabels();
        }
        //获取activity总数
        activityTotalNum = activityMapper.countActivityByCondition(labelList,nowTimeStamp,endTimeStamp,startTimeStamp,status);
        activityListMap.put("totalNum",activityTotalNum);
        //生成返回Page类的类型，里面有查询起始位置和页面查询数量
        page = commonUtils.pageLimit(pageSize,pageNum,activityTotalNum);
        if(page.getStartLoaction()==-1||page.getPageQty()==-1) {
            activityListMap.put("activityList", null);
        }else {
            //根据Page类进行LIMIT查询
            activityList = activityMapper.selectActivityByCondition(labelList, nowTimeStamp, endTimeStamp, startTimeStamp, status, page);
            commonUtils.activityListConvert(activityList);
            activityListMap.put("activityList", activityList);
        }
        return activityListMap;
    }

    @Override
    public Map<String, Object> getUserActivityByCondition(String userCcid,String labels,String startTime,String endTime,String status,int pageSize,int pageNum)throws Exception{
        /**
         * 初始化参数
         */
        //活动总数
        int activityTotalNum;
        //Page类的类型，里面有查询起始位置和页面查询数量
        Page page;
        //筛选之后的活动列表
        List<Activity> activityList;
        //结果activityListMap：里面有活动总数和活动列表
        Map<String, Object> activityListMap = new HashMap<String, Object>();
        //时间戳定义
        String startTimeStamp ;
        String endTimeStamp ;
        String nowTimeStamp = DateUtil.getTimeStamp();
        //labelType数组
        String[] labelIdArr;
        //label列表
        List<Label> labelList = new ArrayList<>();

        /**
         * 时间数据转换为时间戳类型
         */
        if(startTime==null||startTime.equals("")) {
            startTimeStamp = "";
        }else{
            startTimeStamp = DateUtil.TimeToStamp(startTime);
        }
        if(endTime==null||endTime.equals("")) {
            endTimeStamp = "";
        }else{
            endTimeStamp = DateUtil.TimeToStamp(endTime);
        }

        if(labels!=null&&!labels.equals("")){
            //获得传入用户选择的label,生成labelString数组
            labelIdArr = labels.split("-");
            //通过labelIdArr获取label列表
            labelList=activityMapper.getActivityLabelBylabelIds(labelIdArr);
        }else{
            //label为空则默认用户选择了所有类型,生成labelList
            labelList = activityMapper.getActivityLabels();
        }
        //获取activity总数
        activityTotalNum = activityMapper.countUserActivityByCondition(userCcid,labelList,nowTimeStamp,endTimeStamp,startTimeStamp,status);
        activityListMap.put("totalNum",activityTotalNum);
        //生成返回Page类的类型，里面有查询起始位置和页面查询数量
        page = commonUtils.pageLimit(pageSize,pageNum,activityTotalNum);
        if(page.getStartLoaction()==-1||page.getPageQty()==-1) {
            activityListMap.put("activityList", null);
        }else {
            //根据Page类进行LIMIT查询
            activityList = activityMapper.selectUserActivityByCondition(userCcid,labelList, nowTimeStamp, endTimeStamp, startTimeStamp, status, page);
            commonUtils.activityListConvert(activityList);
            activityListMap.put("activityList", activityList);
        }
        return activityListMap;
    }

    @Override
    public List<Activity> getRecommendActivityList(String userCcid,int listSize) throws Exception {
/**
 * 基于用户自选兴趣标签的推荐
 */
        String labels=userMapper.selectHobbieByCcid(userCcid);
        List<Activity> activityList = new ArrayList<>();
        logger.info(labels);
        if(labels!=null) {
            /**
             * 情况一：按照用户选择的兴趣标签进行推荐
             */
            logger.info(labels);
            String[] arrStr = labels.split("-");
            activityList=activityMapper.selectRecommendActivityByLabel(arrStr,listSize);
            if (activityList.size()<listSize){
            activityList = activityMapper.selectRecommendActivity(listSize);
            }
        }else{
            /**
             * 情况二：用户未选择兴趣标签
             */
            activityList = activityMapper.selectRecommendActivity(listSize);
        }

/**
 * 基于用户模型的协同过滤推荐V1.0
 */
////所有label列表
//     List<Label> labelList =activityMapper.getActivityLabels();
////获取好友列表
//     String[] friendCcidArr = friendMapper.getFriendsList(userCcid);
//     int p;
//    for(int i=0;i<labelList.size();i++){
//        p=0;
//        for(String friendCcid:friendCcidArr){
//            p+=userHobbitsMapper.getHobbitsValueByCcid(friendCcid);
//        }
//        LabelHobbit labelHobbit = new LabelHobbit(labelList.get(i),p);
//    }

/**
 * 基于用户模型的协同过滤推荐V2.0
 */
//所有label列表
     List<Label> labelList = activityMapper.getActivityLabels();
//获取好友列表
     List<String> friendCcidArr = friendMapper.getFriendsList(userCcid);
     int commonActivityNum;
     double p;
    for(int i=0;i<labelList.size();i++){
        p=0;
        for(String friendCcid:friendCcidArr){
            commonActivityNum = activityMapper.getCommonActivityNumByCcid(userCcid,friendCcid);
            p+=userHobbitsMapper.getHobbitsValueByCcid(friendCcid);
            p=p*(1+0.1*commonActivityNum);
        }
        LabelHobbit labelHobbit = new LabelHobbit(labelList.get(i),p);
    }
        commonUtils.activityListConvert(activityList);
        return activityList;
}



    @Override
    public Map<String, Object> createActivity(Activity activity,String userCcid) throws Exception{
        //时间信息初始化
        String nowTime = DateUtil.getTime();
        String startTime = activity.getActivityStartTime();
        String endTime = activity.getActivityEndTime();
        boolean startTimeIsLegal = DateUtil.check(startTime);
        boolean endTimeIsLegal = DateUtil.check(startTime);
        //返回map初始化
        Map<String, Object> map = new HashMap<>();
        if(startTimeIsLegal&&endTimeIsLegal) {
            String createTimeStamp = DateUtil.TimeToStamp(nowTime);
            String startTimeStamp = DateUtil.TimeToStamp(startTime);
            String endTimeStamp = DateUtil.TimeToStamp(endTime);
            activity.setActivityStartTime(startTimeStamp);
            activity.setActivityEndTime(endTimeStamp);
            activity.setActivityCreateTime(createTimeStamp);
            activity.setActivityCreator(userCcid);
            //通过存储过程创建活动并且返回activityId
            Activity resActivity = activityMapper.createActivity(activity);
            logger.info(String.valueOf("activityId:"+resActivity.getActivityId()));
            //userActivityIdentify:creator（发起人）/partcipant（普通成员）
            String userActivityIdentify = "creator";
            activityMemberMapper.setActivityMember(resActivity.getActivityId(),userCcid,userActivityIdentify);
            //用户兴趣数据添加
            userHobbitsMapper.userHobbitsAdd(userCcid,activity.getActivityLabel());
            //创建云信IM群组
            String userAccid = userMapper.selectAccidByCcid(userCcid);
            String activityTid = yunxinAPI.createGroup(resActivity.getActivityId(),userAccid,null);
            //res2反映创建活动绑定tid是否成功
            int res2 = activityMapper.bindTid(resActivity.getActivityId(),activityTid);
            activity.setActivityTid(activityTid);
            Activity resActivity2 = commonUtils.activityConvert(activity);
            map.put("code",1);
            map.put("activityInfo",resActivity2);
        }else{
            map.put("code",-1);
        }
        return map;
    }

    /**
     * @return 0：数据库保存失败 1：上传成功 -1：其他错误
     */
    @Override
    public int uploadPic(MultipartFile imgFile, String activityId){
        AliyunOSSUtil aliyunOSSUtil = new AliyunOSSUtil();
        try {
            if(imgFile != null){
                String filename = imgFile.getOriginalFilename();
                if(!"".equals(filename.trim())){
                    //生成图片缓存
                    File newFile = new File(filename);
                    FileOutputStream os = new FileOutputStream(newFile);
                    os.write(imgFile.getBytes());
                    os.close();
                    imgFile.transferTo(newFile);
                    String originPath ="imgs/activityPic/";
                    Activity activity = activityMapper.getActivityByActivityId(activityId);
                    String originalPicPath = activity.getActivityPic();
                    //如果avatar不为空的话就先将其删除
                    if(originalPicPath!=null&&!originalPicPath.equals("")) {
                        logger.info("originalPicPath：" + originalPicPath);
                        aliyunOSSUtil.deleteFile(originalPicPath);
                    }
                    //上传到OSS
                    String fileName = aliyunOSSUtil.uploadFile(activityId, newFile, originPath);
                    //具体文件路径并存储到数据库
                    String picPath = originPath + fileName;
                    //清除图片缓存
                    newFile.delete();
                    int res = activityMapper.uploadPic(activityId, picPath);
                    //修改成功返回1，修改失败返回0
                    return res;
                }
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return -1;
    }

    @Override
    public int editActivity(Activity activity,String userCcid) throws Exception{
        if(activityMemberMapper.selectIdentifyById(activity.getActivityId(),userCcid)=="creator") {
            String startTimeStamp = null;
            String endTimeStamp = null;
            if (activity.getActivityStartTime() != null) {
                String startTime = activity.getActivityStartTime();
                startTimeStamp = DateUtil.TimeToStamp(startTime);
                activity.setActivityStartTime(startTimeStamp);
            }
            if (activity.getActivityEndTime() != null) {
                String endTime = activity.getActivityEndTime();
                endTimeStamp = DateUtil.TimeToStamp(endTime);
                activity.setActivityEndTime(endTimeStamp);
            }
            int res = activityMapper.updateActivity(activity);
//修改成功返回1，不成功返回0
            return res;
        }else{
            //用户权限不够
            return -1;
        }
    }

    @Override
    public int deleteActivity(String activityId,String userCcid){
        //先获取用户在活动中的身份，若为发起人才能删除活动
        String identify = activityMemberMapper.selectIdentifyById(activityId,userCcid);
        if(identify.equals("creator")){
            //删除关系表中数据
            int res1 = activityMemberMapper.deleteActivity(activityId);
            //删除活动表中数据
            int res2 = activityMapper.deleteActivity(activityId);
            if (res1 > 0 && res2 > 0) {
                //用户身份为creator，删除成功返回1
                return 1;
            } else {
                //活动不存在，删除失败
                return -2;
            }
        }else {
            //用户身份不为creator，返回-1
            return -1;
        }
    }

    @Override
    public int joinActivity(String activityId,String userCcid) throws Exception{
//      确保不能重复加入，先作是否存在关系的审查,否则存在覆盖关系
        int activityMemberNum = activityMemberMapper.countById(activityId,userCcid);
//      判断群聊人数是否已满,返回1则代表群聊没满，可以继续加入
        int groupIsFull = activityMemberMapper.groupIsNotFull(activityId);
        logger.info(Integer.toString(activityMemberNum));
        if(activityMemberNum >0) {
            return -2;
        }else if(groupIsFull != 1){
//      判断群聊人数判断返回0，说明活动人数大于等于最大人数限制了
            return -3;
        }else{
            //userActivityIdentify:creator（发起人）/partcipant（普通成员）
            String userActivityIdentify = "partcipant";
            Activity resActivity = activityMapper.getActivityByActivityId(activityId);
            //用户-活动关系表中加入数据，并且在用户兴趣权重表中加入数据
            int res = activityMemberMapper.setActivityMember(activityId, userCcid, userActivityIdentify);
            //查询用户accid
            String userAccid = userMapper.selectAccidByCcid(userCcid);
            String[] members ={userAccid};
            //查询发起人accid
            String creatorAccid = activityMapper.selectCreatorAccid(activityId);
            logger.info("userAccid:"+userAccid+"+creatorAccid"+creatorAccid);
            //调用云信接口将用户加入聊天群组
            String code = yunxinAPI.joinGroup(resActivity.getActivityTid(),creatorAccid,members);
            logger.info("code:"+code);
            if ((res == 1)&&(code.equals("200"))) {
                return 1;
            } else if(res == 1){
                //加入失败，清除服务器端加入数据
                activityMemberMapper.quitActivity(activityId, userCcid);
                return -1;
            }else {
                return -1;
            }
        }
    }

    @Override
    public int quitActivity(String activityId,String userCcid) throws Exception{
        //先获取用户在活动中的身份，若为发起人则无法退出活动，需要转让发起人之后才能退出
        String identify = activityMemberMapper.selectIdentifyById(activityId,userCcid);
        if(identify.equals("creator")){
            return -2;
        }else {
            int res = activityMemberMapper.quitActivity(activityId, userCcid);
            // String activityTid = yunxinAPI.quitGroup(resActivity.getActivityId(),userAccid,null);
            if (res == 1) {
                return 1;
            } else {
                return -1;
            }
        }
    }
}

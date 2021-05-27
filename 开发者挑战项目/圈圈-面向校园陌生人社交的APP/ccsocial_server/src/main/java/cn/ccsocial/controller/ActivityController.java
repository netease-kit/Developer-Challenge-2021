package cn.ccsocial.controller;

import cn.ccsocial.model.Activity;
import cn.ccsocial.model.ActivityMember;
import cn.ccsocial.model.Label;
import cn.ccsocial.model.User;
import cn.ccsocial.service.ActivityService;
import cn.ccsocial.service.TokenService;
import cn.ccsocial.service.UserService;
import cn.ccsocial.utils.CommonUtils;
import cn.ccsocial.utils.DateUtil;
import cn.ccsocial.utils.JsonData;
import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.spring.web.json.Json;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/pub/activity")
@Api(tags = "活动服务相关接口")
public class ActivityController {
    @Resource
    private ActivityService activityService;
    @Resource
    private UserService userService;

    /**
     * 活动圈/话题圈模糊查询（分页）
     * @param searchType
     * @param key
     * @param pageSize
     * @param pageNum
     * @return
     * @throws Exception
     */
    @GetMapping("getCirclesByKey")
    @ApiOperation(value = "活动圈/话题圈模糊查询（分页）",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;活动圈模糊查询</br>"+
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "searchType：传入格式：activity(活动)/topic(话题)</span>"+
                    "key：传入格式：文本</span>"+
                    "pageSize：页大小<br/>"+
                    "pageNum：页号(从1开始！)<br/>")
    public JsonData getCirclesByKey(String searchType,String key,int pageSize,int pageNum) throws Exception
    {
        Map<String, Object> activityListMap = activityService.getCirclesByKey(searchType,key,pageSize,pageNum);
        activityListMap.put("pageNum", pageNum);
        activityListMap.put("pageSize", pageSize);
        if(activityListMap!=null) {
            return JsonData.buildSuccess(activityListMap, "查询活动列表成功！");
        }else{
            return JsonData.buildError("查询活动列表失败！");
        }
    }

    /**
     * 根据条件筛选活动（分页）
     * @return
     */
    @GetMapping("getActivityByCondition")
    @ApiOperation(value = "根据条件筛选活动（分页）",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;根据条件筛选活动</br>"+
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "labels：传入格式：\"id-id-id\",若为空则默认所有类别<span style='color:red;'>以”-“作为分割</span><br/>"+
                    "startTime：传入格式：\"2020-11-09\",若为空则默认所有时间<br/>"+
                    "endTime：传入格式：\"2020-11-09\",若为空则默认所有时间，并且同时要做endTime大于startTime的限制<br/>"+
                    "status：传入格式：ready(未开始)\\started(已开始)\\end(已结束),若为空则默认所有状态"+
                    "pageSize：页大小<br/>"+
                    "pageNum：页号<br/>")
    public JsonData getActivityByCondition(String labels,String startTime,String endTime,String status,int pageSize,int pageNum) throws Exception
    {
        Map<String, Object> activityListMap = activityService.getActivityByCondition(labels,startTime,endTime,status,pageSize,pageNum);
        if(activityListMap!=null) {
            activityListMap.put("pageNum", pageNum);
            activityListMap.put("pageSize", pageSize);
            return JsonData.buildSuccess(activityListMap, "获取活动列表成功！");
        }else{
            return JsonData.buildError("获取活动列表失败！");
        }
    }

    /**
     * 根据条件筛选用户参与活动（分页）
     * @return
     */
    @GetMapping("getUserActivityByCondition")
    @ApiOperation(value = "列出某一用户全部参与活动信息（分页）",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;用来查询某一用户所参与的所有活动信息的接口<br>" +
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "labels：传入格式：\"id-id-id\",若为空则默认所有类别<span style='color:red;'>以”-“作为分割</span><br/>"+
                    "startTime：传入格式：\"2020-11-09\",若为空则默认所有时间<br/>"+
                    "endTime：传入格式：\"2020-11-09\",若为空则默认所有时间，并且同时要做endTime大于startTime的限制<br/>"+
                    "status：传入格式：ready(未开始)\\started(已开始)\\end(已结束),若为空则默认所有状态"+
                    "userCcid：用户ccid<br/>"+
                    "pageSize：页大小<br/>"+
                    "pageNum：页号<br/>"+
                    "<span style='color:red;'>返回参数：</span><br/>"+
                    "code:\"1\"为获取成功<br>" +
                    "code:\"-1\"为获取失败，<br>"+
                    "code:\"-2\"为ccid不存在，<br>")
    public JsonData getUserActivityByCondition(String userCcid,String labels,String startTime,String endTime,String status,int pageSize,int pageNum)throws Exception
    {
        Map<String, Object> activityListMap = activityService.getUserActivityByCondition(userCcid,labels,startTime,endTime,status,pageSize,pageNum);

        if(userService.getUserByCcid(userCcid)!=null) {
            if(activityListMap!=null) {
                /**
                 * activityListMap中有活动列表和总数,加入页大小和页号返回给前端
                 */
                activityListMap.put("pageNum", pageNum);
                activityListMap.put("pageSize", pageSize);
                return  JsonData.buildSuccess(activityListMap,"条件筛选用户参与活动成功！");
            }else{
                return JsonData.buildError(-1,"获取活动列表失败！");
            }

        }else{
            return  JsonData.buildError(-2,"ccid不存在！");
        }
    }

    /**
     * 获取所有活动Label
     * @return
     */
    @GetMapping("getActivityLabels")
    @ApiOperation(value = "获取所有活动Label",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;获取所有活动类型Label，返回Label类型列表")
    public JsonData getActivityLabel()
    {
        List typeList = activityService.getActivityLabels();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("typeList", typeList);
        return JsonData.buildSuccess(map,"获取推荐活动列表成功！");
    }

    /**
     * 获取推荐活动列表
     * @return
     */
    @GetMapping("getRecommendActivityList")
    @ApiOperation(value = "获取推荐活动列表",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;获取推荐活动列表的接口，传入ccid和list的大小返回Activity对象列表</br>" +
                    "code:\"1\"为获取推荐活动列表成功</br>" +
                    "code:\"-1\"获取推荐活动列表失败，")
    public JsonData getRecommendActivityList(String userCcid,int listSize) throws Exception
    {
        List<Activity> activityList = activityService.getRecommendActivityList(userCcid,listSize);
        if(activityList!=null) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("activityList", activityList);
            return JsonData.buildSuccess(map,"获取推荐活动列表成功！");
        }else{
            return JsonData.buildError(-1,"获取推荐活动列表失败！");
        }
    }

    /**
     * 创建活动
     * @return
     */
    @PostMapping("createActivity")
    @ApiOperation(value = "创建活动接口",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;创建活动<br>" +
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "<span style='color:red;'>时间类型格式：yyyy-MM-dd HH:mm</span><br>"+
                    "userCcid：创建人ccid<br>"+
                    "activityLabel：活动类型标签<br/>"+
                    "activityIsPrivate：0/1 <br/> "+
                    "<span style='color:red;'>返回参数：</span><br/>"+
                    "code:\"1\"为创建活动成功，<br>" +
                    "code:\"-1\"为传入数据格式错误，<br>" +
                    "code:\"-2\"为创建活动失败，<br>")
    public JsonData createActivity(@RequestBody Activity activity,String userCcid) throws Exception
    {
        Map<String, Object>  res = activityService.createActivity(activity,userCcid);
        if (res.get("code").equals(1)) {
            Map<String, Object> map = new HashMap<>();
            map.put("activityInfo",res.get("activityInfo"));
            return JsonData.buildSuccess( map,"创建活动成功");
        }else if(res.get("code").equals(-1)) {
            return JsonData.buildError(-1,"传入数据格式错误");
        }else{
            return JsonData.buildError(-2 ,"创建活动失败");
        }
    }

    /**
     * 活动图片上传
     * @param imgFile
     * @param activityId
     * @return
     */
    @PostMapping("/uploadActivityPic")
    @ApiOperation(value = "活动图片上传",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;传入文件imgFile和activityId<br/>" +
                    "Content-Type:form-data<br/>" )
    public JsonData uploadAvatar(@RequestParam("imgFile") MultipartFile imgFile, String activityId){
        if (imgFile.isEmpty()) {
            return JsonData.buildError(-1,"请选择文件！");
        }
        int flag = activityService.uploadPic(imgFile,activityId);
        if(flag==1){
            return JsonData.buildSuccess("上传成功！");
        }else{
            return JsonData.buildError(2,"上传失败！");
        }
    }

    /**
     * 修改活动
     * @return
     */
    @PostMapping("editActivity")
    @ApiOperation(value = "修改活动接口",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;修改活动<br>" +
                    "<span style='color:red;'>传入参数：（参数为空则不修改）</span><br>"+
                    "<span style='color:red;'>时间类型格式：yyyy-MM-dd HH:mm</span><br>"+
                    "activityName<br>"+
                    "activityMaxPeopleNum<br>"+
                    "activityLocation<br>"+
                    "activityIsPrivate<br>"+
                    "activityDescribe<br>"+
                    "activityStartTime<br>"+
                    "activityEndTime<br>"+
                    "activityLabel<br>"+
                    "activityLong<br>"+
                    "activityLat<br>"+
                    "activityRange<br>"+
                    "<span style='color:red;'>返回参数：</span><br/>"+
                    "code:\"1\"为修改活动成功<br>" +
                    "code:\"-1\"为用户权限不够，修改活动失败<br>" +
                    "code:\"-2\"活动不存在，修改失败<br>" +
                    "code:\"-3\"活动最大人数不可低于当前参与人数，修改活动失败<br>"+
                    "code:\"-4\"其他错误，修改活动失败<br>")
    public JsonData editActivity(@RequestBody Activity activity,String userCcid) throws Exception
    {
        int res = activityService.editActivity(activity,userCcid);
        if (res == 1) {
            return JsonData.buildSuccess( null,"修改活动成功");
        }else if(res == -1) {
            return JsonData.buildError( -1,"为用户权限不够，修改活动失败");
        }else {
            return JsonData.buildError(-2 ,"活动不存在，修改失败！");
        }
    }

    /**
     * 删除活动
     * @return
     */
    @DeleteMapping("deleteActivity")
    @ApiOperation(value = "删除活动接口",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;删除活动<br>" +
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "userCcid：创建人ccid<br>"+
                    "activityId：活动id<br/>"+
                    "<span style='color:red;'>返回参数：</span><br/>"+
                    "code:\"1\"删除活动成功，<br>" +
                    "code:\"-1\"为用户身份不是发起人，没有删除权限，<br>" +
                    "code:\"-2\"活动状态异常，删除活动失败，<br>")
    public JsonData deleteActivity(String activityId,String userCcid) throws Exception
    {
        int res = activityService.deleteActivity(activityId,userCcid);
        if (res == 1 ) {
            return JsonData.buildSuccess( null,"删除活动成功！");
        }else if (res == -1 ) {
            return JsonData.buildError( -1,"用户身份不是发起人，没有删除权限！");
        }else{
            return JsonData.buildError(-2,"删除活动失败");
        }
    }


    /**
     * 用户加入活动
     * @return
     */
    @PostMapping("joinActivity")
    @ApiOperation(value = "用户加入活动",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;用户加入活动<br>" +
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "activityId：活动Id<br>"+
                    "userCcid：用户ccid<br/>"+
                    "<span style='color:red;'>返回参数：</span><br/>"+
                    "code:\"1\"为用户加入活动成功，<br>" +
                    "code:\"-1\"为用户加入活动失败，<br>"+
                    "code:\"-2\"用户已加入该活动，无法重复加入<br>"+
                    "code:\"-3\"活动人数已满<br>")
    public JsonData joinActivity(String activityId,String userCcid) throws Exception
    {
        int res = activityService.joinActivity(activityId,userCcid);
        if (res == 1) {
            return JsonData.buildSuccess( null,"用户加入活动成功！");
        }else if (res == -2){
            return JsonData.buildError(-2 ,"用户已加入该活动，无法重复加入！");
        }else if (res == -3){
            return JsonData.buildError(-2 ,"活动人数已满！");
        }else{
        return JsonData.buildError(-1 ,"用户加入活动失败！");
    }
    }

    /**
     * 用户退出活动
     * @return
     */
    @DeleteMapping("quitActivity")
    @ApiOperation(value = "用户退出活动",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;用户退出活动<br>" +
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "activityId：活动Id<br>"+
                    "userCcid：用户ccid<br/>"+
                    "<span style='color:red;'>返回参数：</span><br/>"+
                    "code:\"1\"为加入活动成功，<br>" +
                    "code:\"-1\"为加入活动失败，<br>"+
                    "code:\"-2\"为用户身份为creator，退出活动失败，<br>")
    public JsonData quitActivity(String activityId,String userCcid) throws Exception
    {
        int res = activityService.quitActivity(activityId,userCcid);
        if (res==1) {
            return JsonData.buildSuccess( null,"用户退出活动成功");
        }else if(res==-2) {
            return JsonData.buildError( -2,"请转让发起人身份后再退出活动");
        }else{
            return JsonData.buildError(-1 ,"用户退出活动失败");
        }
    }

    /**
     * 根据Activityid获取活动信息
     * @return
     */
    @GetMapping("getActivityByActivityId")
    @ApiOperation(value = "根据Activityid获取活动信息",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;根据Activityid获取活动信息"+
            "code:\"1\"为活动信息获取成功，<br>" +
            "code:\"-1\"为活动不存在，<br>")
    public JsonData getActivity(String activityId)
    {
        //获取活动基本信息
        Activity activity = activityService.getActivityByActivityId(activityId);
        if(activity!=null) {
            //获取活动参与人员信息
            List<Object> activityMemberList = activityService.getActivityMemberList(activityId);
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("activityInfo", activity);
            map.put("activityMemberList", activityMemberList);
            return JsonData.buildSuccess(map, "活动信息获取成功！");
        }else{
            return JsonData.buildError( "活动不存在！");
        }
    }
}

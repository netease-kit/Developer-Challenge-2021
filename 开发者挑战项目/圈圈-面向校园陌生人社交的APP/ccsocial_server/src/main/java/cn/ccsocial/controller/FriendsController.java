package cn.ccsocial.controller;

import cn.ccsocial.model.User;
import cn.ccsocial.service.FriendService;
import cn.ccsocial.utils.JsonData;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/pub/friends")
@Api(tags = "好友服务相关接口")
public class FriendsController {
    @Resource
    private FriendService friendService;

    /**
     * 好友列表展示
     * @param userCcid
     * @return
     */
    @GetMapping("getFriendList")
    @ApiOperation(value = "好友列表接口",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;根据用户userCcid查询该所有好友")
    public JsonData getFriendList(String userCcid) throws Exception{
        List<User> friendsUserList = friendService.getFriendList(userCcid);
        Map<String, Object> map = new HashMap<String, Object>();
        if(friendsUserList!=null){
            map.put("friendsUserList",friendsUserList);
            return JsonData.buildSuccess(map);
        }else {
            return JsonData.buildSuccess(-1,"用户信息有误");
        }
    }

    /**
     * 发送添加好友申请
     * @param userCcid
     * @param friendCcid
     * @param msg
     * @return
     */
    @PostMapping("sendFriendApply")
    @ApiOperation(value = "发送好友申请接口",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;发送好友申请"+
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "userCcid：发送人ccid<br>"+
                    "friendCcid：被添加人ccid<br/>"+
                    "msg：申请理由<br/>"+
                    "<span style='color:red;'>返回参数：</span><br/>"+
                    "code:\"1\"为好友申请发送成功，<br>" +
                    "code:\"-1\"该好友关系已存在，发送失败<br>" )
    public JsonData sendFriendApply(String userCcid,String friendCcid,String msg) throws Exception{
        int res = friendService.sendFriendApply(userCcid,friendCcid,msg);
        if(res==1) {
            return JsonData.buildSuccess("好友申请发送成功！");
        }else{
            return JsonData.buildError(-1,"该好友关系已存在，发送失败！");
        }
    }

    /**
     * 添加好友(通过/拒绝加好友)
     * @param userAccid
     * @param friendAccid
     * @param type
     * @param msg
     * @return
     */
    @PostMapping("addFriend")
    @ApiOperation(value = "通过好友申请",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;添加好友接口"+
            "<span style='color:red;'>传入参数：</span><br>"+
            "userCcid：发送人ccid<br>"+
            "friendCcid：被添加人ccid<br/>"+
            "type：1同意加好友，2拒绝加好友<br/>"+
            "msg：申请理由<br/>"+
            "<span style='color:red;'>返回参数：</span><br/>"+
            "code:\"1\"好友申请添加成功，<br>" +
            "code:\"2\"好友申请拒绝成功，<br>" +
            "code:\"-1\"其他错误，请联系后台人员！<br>" )
        public JsonData addFriend(String userAccid,String friendAccid,int type,String msg) throws Exception{
        int res = friendService.addFriend(userAccid,friendAccid,type,msg);
        if(res==1) {
            return JsonData.buildSuccess("好友申请添加成功！");
        }else if(res==2) {
            return JsonData.buildSuccess(2, null, "好友申请拒绝成功！");
        }else{
            return JsonData.buildError(-1,"其他错误，请联系后台人员！");
        }
    }

    /**
     * 删除好友
     * @param userAccid
     * @param friendAccid
     * @return
     */
    @DeleteMapping("delFriend")
    @ApiOperation(value = "删除好友",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;删除好友接口"+
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "userCcid：发送人ccid<br>"+
                    "friendCcid：被删除人ccid<br/>"+
                    "<span style='color:red;'>返回参数：</span><br/>"+
                    "code:\"1\"好友删除成功，<br>" +
                    "code:\"-1\"好友删除失败<br>" )
    public JsonData delFriend(String userAccid,String friendAccid) throws Exception{
        String res = friendService.delFriend(userAccid,friendAccid);
        if(res.equals("200")) {
            return JsonData.buildSuccess("好友删除成功！");
        }else {
            return JsonData.buildError(-1,"不存在好友关系，好友删除失败！");
        }
    }
}
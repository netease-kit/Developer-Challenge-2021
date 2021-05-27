package cn.ccsocial.controller;

import cn.ccsocial.model.ActivityMember;
import cn.ccsocial.model.EducationalAccount;
import cn.ccsocial.model.User;
import cn.ccsocial.service.TokenService;
import cn.ccsocial.utils.CommonUtils;
import cn.ccsocial.utils.JsonData;
import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.*;
import cn.ccsocial.service.UserService;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.*;

@RestController
@RequestMapping("api/v1/pub/user")
@Api(tags = "用户服务相关接口")
public class UserController {
    @Resource
    private TokenService tokenService;
    @Resource
    private UserService userService;

    /**
     * 列出全部用户
     * @return
     */
    @GetMapping("list")
    @ApiOperation(value = "查询所有用户接口",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;用来查询所有用户信息的接口")
    public JsonData listUser()
    {
        List<User> userList= userService.getUserList();
        if(userList!=null) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("userList", userList);
            return JsonData.buildSuccess(map, "获取成功！");
        }else{
            return JsonData.buildError("获取失败！");
        }
    }

    /**
     * 注册用户
     * @return
     */
    @PostMapping("register")
    @ApiOperation(value = "注册用户接口",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;注册用户，" +
                    "<span style='color:red;'>传userPhone手机号、userPassword密码（暂时可以不设置）、userSex性别、userName昵称</span>")
    @ApiResponses({
            @ApiResponse(code=1,message="注册成功，返回token"),
            @ApiResponse(code=-1,message="注册失败，手机号已被注册" ),
            @ApiResponse(code=-2,message="验证码错误"),
            @ApiResponse(code=-3,message="接收用户对象出现错误")
    })
    public JsonData registerUser(@RequestBody User user,String code) throws Exception {
        if (userService.verificationCodeIsTure(user.getUserPhone(), code)) {
            String accid = userService.registerUser(user);
            if (accid.equals("error")) {
                return JsonData.buildError(-3, "接收用户对象出现错误");
            } else if (accid.equals("exists")) {
                return JsonData.buildError(-1, "该手机号已被注册");
            } else {
                //注册用户并且返回token
                String token = tokenService.generateTokenByRegister(accid);
                User res_user = userService.registerByPhone(user.getUserPhone());
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("userInfo", res_user);
                map.put("token", token);
                return JsonData.buildSuccess(map, "注册成功!");
            }
        } else {
                return JsonData.buildError(-2,"验证码错误!");
        }
    }

    /**
     * 用户登录
     * @return
     */
    @PostMapping("login")
    @ApiOperation(value = "用户密码登录接口",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;用户登录接口"+
                    "code:\"1\"为登录成功，" +
                    "code:\"-1\"为登录失败，" )
    public JsonData login(@RequestBody User user) {
        try {
            User res_user = userService.userLogin(user.getUserPhone(), user.getUserPassword());
            if (res_user != null) {
                //生成token，保存token
                String token=tokenService.generateTokenByLogin(res_user.getUserAccid());
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("userInfo", res_user);
                map.put("token", token);
                return JsonData.buildSuccess(map,"登录成功!");
            } else {
                return JsonData.buildError("Login Error!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonData.buildError("Login Error!");
    }

    /**
     * 发送验证码
     * @return
     */
    @PostMapping("sendVerificationCode")
    @ApiOperation(value = "发送验证码",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;建议设置60s重新刷新。"+
                    "code:\"1\"为发送成功，" +
                    "code:\"-1\"为发送失败，" )
    public JsonData sendVerificationCode(String userPhone) {
            try {
                String code = userService.sendVerificationCode(userPhone);
                if (code != null) {
                    return JsonData.buildSuccess("Success!");
                } else {
                    return JsonData.buildError("Send Error!");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        return JsonData.buildError("Send Error!");
    }

    /**
     * 用户手机号登录
     * @return
     */
    @PostMapping("loginByPhone")
    @ApiOperation(value = "用户手机号登录接口",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;传入参数：手机号phone，验证码code。成功返回token<br>"+
                    "code:\"1\"为发送成功用户已注册，" +
                    "code:\"-1\"为用户密码未设置，" +
                    "code:\"-2\"为发送成功用户未注册，" +
                    "code:\"-3\"为验证码错误")
    @ApiResponses({
            @ApiResponse(code=1,message="登录成功"),
            @ApiResponse(code=-1,message="密码输入错误"),
            @ApiResponse(code=-2,message="用户未注册"),
            @ApiResponse(code=-3,message="用户未设置密码"),
    })
    public JsonData loginByPhone(String userPhone,String code) {
        if(userService.phoneIsRegister(userPhone)){
            try {
                User res_user = userService.loginByPhone(userPhone,code);
                if (res_user != null) {
                    if(res_user.getUserPassword()!=null) {
                        String token = tokenService.generateTokenByLogin(res_user.getUserAccid());
                        Map<String, Object> map = new HashMap<String, Object>();
                        map.put("userInfo", res_user);
                        map.put("token", token);
                        return JsonData.buildSuccess(map,"登录成功!");
                    }else{
                        String token = tokenService.generateTokenByLogin(res_user.getUserAccid());
                        tokenService.save(res_user.getUserAccid(), token);
                        return  JsonData.buildError(-1,"登录成功，用户密码未设置!");
                    }
                } else {
                    return JsonData.buildError(-3,"验证码错误!");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else{
        return JsonData.buildError(-2,"手机账号未注册!");
    }
        return JsonData.buildError(-3,"其他错误!");
    }

    /**
     * 根据Ccid获取用户信息
     * @return
     */
    @GetMapping("getUserByCcid")
    @ApiOperation(value = "根据Ccid获取用户信息",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;根据Ccid获取用户信息"+
                    "code:\"1\"为获取成功，" +
                    "code:\"-1\"为获取失败，" )
    public JsonData getUserByCcid(String userCcid)
    {
        User user = userService.getUserByCcid(userCcid);
        if(user!=null) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("userInfo", user);
            return JsonData.buildSuccess(map, "用户信息获取成功!");
        }else{
            return JsonData.buildError("用户信息不存在!");
        }
    }

    /**
     * 设置用户密码
     * @return
     */
    @PutMapping("setUserPassword")
    @ApiOperation(value = "设置用户密码",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;添加密码或者修改密码都是这个借口")
    public JsonData setUserPassword(@RequestBody User user)
    {
        int flag = userService.setUserPassword(user.getUserCcid(),user.getUserPassword());
        if(flag>0) {
            return JsonData.buildSuccess(null, "设置成功！");
        }else{
            return JsonData.buildError( "设置失败！");
        }
    }

    /**
     * 添加用户兴趣标签
     * @return
     */
    @PostMapping("addUserHobbies")
    @ApiOperation(value = "传入拼接标签",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;传入ccid和拼接label_id，例：1-3-12")
    public JsonData addUserHobbies(String userCcid,String labels)
    {
        userService.addUserHobbies(userCcid,labels);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("userCcid", userCcid);
        map.put("labels", labels);
        return JsonData.buildSuccess(map,"设置成功");
    }

    /**
     * 绑定教务
     * @return
     */
    @PostMapping("bindEducationalAccount")
    @ApiOperation(value = "绑定教务",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;绑定教务，更换绑定也是通过这个接口" +
                    "<span style='color:red;'>传入参数：</span><br>"+
                    "activityId：活动Id<br>"+
                    "userCcid：用户ccid<br/>"+
                    "<span style='color:red;'>返回参数：</span><br/>"+
                    "code:\"1\"：绑定教务成功，<br>" +
                    "code:\"-1\"：绑定教务失败，<br>"+
                    "code:\"-2\"：传入参数有误错误<br>")
    public JsonData bindEducationalAccount(@RequestBody EducationalAccount educationalAccount) throws Exception {
        if ((educationalAccount.getUserEducationalId()!=null)&&(educationalAccount.getUserEducationalPassword()!=null)
                &&(educationalAccount.getUserCcid()!=null)) {
            int res = userService.bindEducationalAccount(educationalAccount);
            if (res==1) {
                return JsonData.buildSuccess("绑定教务成功!");
            }else if (res==-1) {
                return JsonData.buildError(-1, "绑定教务失败，账号密码错误!");
            } else {
                return JsonData.buildError(-3, "绑定教务失败，未知错误!");
            }
        } else {
            return JsonData.buildError(-2,"传入参数有误错误!");
        }
    }

    /**
     * 头像上传
     * @param imgFile
     * @param userCcid
     * @return
     */
    @PostMapping("/uploadAvatar")
    @ApiOperation(value = "头像上传",
            notes = "<span style='color:red;'>描述:</span>&nbsp;&nbsp;传入文件imgFile和userCcid<br/>" +
                    "Content-Type:form-data<br/>" )
    public JsonData uploadAvatar(@RequestParam("imgFile")MultipartFile imgFile, String userCcid){
        if (imgFile.isEmpty()) {
            return JsonData.buildError(-1,"请选择文件！");
        }
        int flag = userService.uploadAvatar(imgFile,userCcid);
        if(flag==1){
            return JsonData.buildSuccess("上传成功！");
        }else{
            return JsonData.buildError(2,"上传失败！");
        }
    }
}

package cn.ccsocial.service.impl;

import cn.ccsocial.config.YunxinConfig;
import cn.ccsocial.mapper.UserMapper;
import cn.ccsocial.model.EducationalAccount;
import cn.ccsocial.model.User;
import cn.ccsocial.utils.*;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import cn.ccsocial.service.UserService;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private static Map<String, User> sessionMap = new HashMap<>();

    @Resource
    private UserMapper userMapper;
    @Resource
    RedisAPI redisAPI;
    @Resource
    YunxinAPI yunxinAPI;
    CommonUtils commonUtils = new CommonUtils();
    String curTime;

    @Override
    public List<User> getUserList() {
        return userMapper.getUserList();
    }

    @Override
    public String registerUser(User user) throws Exception{
        if (user!=null){
            if(userMapper.selectByPhone(user.getUserPhone())==null){
                //可以调整Ccid的长度，以便于后期维护
                String ccid = CommonUtils.getCcid(6);
                //如果ccid已存在，则重新生成
                do{
                    user.setUserCcid(CommonUtils.getCcid(6));
                }while(userMapper.countByCcid(ccid)>0);
                String accid=ccid+CommonUtils.getRandomString(24);
                user.setUserPassword(CommonUtils.MD5(user.getUserPassword()));
                user.setUserAccid(accid);
                String nowTime = DateUtil.getTime();
                String createTimeStamp = DateUtil.TimeToStamp(nowTime);
                user.setUserCreateTime(createTimeStamp);
                userMapper.registerUser(user);
                return accid;
            }else{
                return "exists";
            }
        }else{
            return "error";
        }
    }

    @Override
    public String sendVerificationCode(String mobile) throws Exception {
        //调用云信API短信接口 暂时不可用
        //yunxinAPI.sendVerificationCode(mobile);
        //设置验证码失效的时间，这里设置600s，即十分钟
        String testcode="0000";
        //redisAPI.set(mobile,code,600);
        redisAPI.set(mobile,testcode);
        return testcode;
    }

    @Override
    public Boolean verificationCodeIsTure(String userPhone,String code)throws Exception{
        String rightCode = redisAPI.get(userPhone);
        if (code.equals(rightCode)){
            return true;
        }else{
            return false;
        }
    }
    @Override
    public User userLogin(String userPhone,String password)throws Exception{
        User user = userMapper.selectByPhone(userPhone);
        String dePassword=CommonUtils.MD5(password);
        if (user.getUserPassword().equals(dePassword)){
            if(user!=null) {
                user = commonUtils.userFormat(user);
            }
            return user;
        }else{
            return null;
        }
    }

    @Override
    public User loginByPhone(String userPhone,String code)throws Exception{
        String rightCode = redisAPI.get(userPhone);
        if (code.equals(rightCode)){
            User user = userMapper.selectByPhone(userPhone);
            if(user!=null) {
                user = commonUtils.userFormat(user);
            }
            return user;
        }else{
            return null;
        }
    }

    @Override
    public User registerByPhone(String userPhone)throws Exception{
        User user = userMapper.selectByPhone(userPhone);
        if(user!=null) {
            user = commonUtils.userFormat(user);
        }
        return user;
    }

    @Override
    public User getUserByCcid(String ccid) {
        User user = userMapper.selectByCcid(ccid);
        if(user!=null) {
            user = commonUtils.userFormat(user);
        }
        return user;
    }

    @Override
    public boolean phoneIsRegister(String phone){
        if(userMapper.selectByPhone(phone)!=null){
            return true;
        }else{
            return false;
        }

    }

    @Override
    public int setUserPassword(String userCcid,String userPassword){
        int succcessnum = userMapper.setUserPassword(userCcid,CommonUtils.MD5(userPassword));
        return succcessnum;
    }

    @Override
    public int addUserHobbies (String userCcid,String labels){
           int succcessnum = userMapper.addUserHobbie(userCcid,labels);
        return succcessnum;
    }

    /**
     * @return 0：数据库保存失败 1：上传成功 -1：其他错误
     */
    @Override
    public int uploadAvatar(MultipartFile imgFile, String userCcid){
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
                    String originPath ="imgs/avatar/";
                    User user = userMapper.selectByCcid(userCcid);
                    String originalAvatarPath = user.getUserAvatar();
                    //如果avatar不为空的话就先将其删除
                    if(originalAvatarPath!=null&&!originalAvatarPath.equals("")) {
                        logger.info("originalAvatarPath：" + originalAvatarPath);
                        aliyunOSSUtil.deleteFile(originalAvatarPath);

                    }
                    //上传到OSS
                    String fileName = aliyunOSSUtil.uploadFile(userCcid, newFile, originPath);
                    //具体文件路径并存储到数据库
                    String avatarPath = originPath + fileName;
                    //清除图片缓存
                    newFile.delete();
                    int res = userMapper.uploadAvatar(userCcid, avatarPath);
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
    public int bindEducationalAccount(EducationalAccount educationalAccount){
//      之后要在这里请求登录教务，验证账号密码是否正确
//      教务的密码采用加密处理
        educationalAccount.setUserEducationalId(educationalAccount.getUserEducationalId());
        educationalAccount.setUserEducationalPassword(CommonUtils.MD5(educationalAccount.getUserEducationalPassword()));
        int res = userMapper.bindEducationalAccount(educationalAccount);
        return res;
    }
}

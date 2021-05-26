package cn.ccsocial.utils;

import cn.ccsocial.config.YunxinConfig;
import cn.ccsocial.model.Friend;
import cn.ccsocial.service.impl.ActivityServiceImpl;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class YunxinAPI {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(YunxinAPI.class);
    @Autowired
    private YunxinConfig yunxinConfig;
    String curTime;

    /**
     * 发送验证码
     * @param mobile 手机号
     * @throws Exception
     */
    public void sendVerificationCode(String mobile) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "http://api.netease.im/sms/sendcode.action";
        HttpPost httpPost = new HttpPost(url);

        curTime = String.valueOf((new Date()).getTime() / 1000L);
        String checkSum = CommonUtils.getCheckSum(yunxinConfig.getAppSecret(), yunxinConfig.getNonce() ,curTime);//参考 计算CheckSum的java代码

        // 设置请求的header
        httpPost.addHeader("AppKey", yunxinConfig.getAppKey());
        httpPost.addHeader("Nonce", yunxinConfig.getNonce());
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("mobile", mobile));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        //执行请求
        HttpResponse response = httpClient.execute(httpPost);

        String res= EntityUtils.toString(response.getEntity(), "utf-8");
        JSONObject resObj= JSONObject.parseObject(res);
        String code = resObj.get("obj").toString();
    }

    /**
     * 云信API添加好友（发送申请、同意和拒绝）
     * @param accid 用户accid
     * @param faccid 好友accid
     * @param type 1直接加好友，2请求加好友，3同意加好友，4拒绝加好友
     * @return code 状态码
     * @throws Exception
     */
    public String addFriend(String accid,String faccid,String type,String msg) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "https://api.netease.im/nimserver/friend/add.action";
        HttpPost httpPost = new HttpPost(url);

        curTime = String.valueOf((new Date()).getTime() / 1000L);
        String checkSum = CommonUtils.getCheckSum(yunxinConfig.getAppSecret(), yunxinConfig.getNonce() ,curTime);//参考 计算CheckSum的java代码

        // 设置请求的header
        httpPost.addHeader("AppKey", yunxinConfig.getAppKey());
        httpPost.addHeader("Nonce", yunxinConfig.getNonce());
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");

        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("accid", accid));
        nvps.add(new BasicNameValuePair("faccid", faccid));
        nvps.add(new BasicNameValuePair("type", type));
        nvps.add(new BasicNameValuePair("msg", msg));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response = httpClient.execute(httpPost);
        String res= EntityUtils.toString(response.getEntity(), "utf-8");
        logger.info(res.toString());
        JSONObject resObj= JSONObject.parseObject(res);
        String code = resObj.getString("code");
        logger.info(code);
        return code;
    }

    /**
     * 云信API删除好友（发送申请、同意和拒绝）
     * @param accid 用户accid
     * @param faccid 要删除的好友accid
     * @return code 状态码
     * @throws Exception
     */
    public String delFriend(String accid,String faccid) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "https://api.netease.im/nimserver/friend/delete.action";
        HttpPost httpPost = new HttpPost(url);

        curTime = String.valueOf((new Date()).getTime() / 1000L);
        String checkSum = CommonUtils.getCheckSum(yunxinConfig.getAppSecret(), yunxinConfig.getNonce() ,curTime);//参考 计算CheckSum的java代码

        // 设置请求的header
        httpPost.addHeader("AppKey", yunxinConfig.getAppKey());
        httpPost.addHeader("Nonce", yunxinConfig.getNonce());
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");

        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("accid", accid));
        nvps.add(new BasicNameValuePair("faccid", faccid));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response = httpClient.execute(httpPost);
        String res= EntityUtils.toString(response.getEntity(), "utf-8");
        logger.info(res.toString());
        JSONObject resObj= JSONObject.parseObject(res);
        String code = resObj.getString("code");
        logger.info(code);
        return code;
    }

    /**
     * 云信API获取好友列表
     * @param accid
     * @param updatetime 用户注册时间（更新时间戳，接口返回该时间戳之后有更新的好友列表）
     * @throws Exception
     */
    public List<Friend> getFriends(String accid, String updatetime) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "http://api.netease.im/nimserver/friend/get.action";
        HttpPost httpPost = new HttpPost(url);

        curTime = String.valueOf((new Date()).getTime() / 1000L);
        String checkSum = CommonUtils.getCheckSum(yunxinConfig.getAppSecret(), yunxinConfig.getNonce() ,curTime);//参考 计算CheckSum的java代码

        // 设置请求的header
        httpPost.addHeader("AppKey", yunxinConfig.getAppKey());
        httpPost.addHeader("Nonce", yunxinConfig.getNonce());
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");

        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("accid", accid));
        nvps.add(new BasicNameValuePair("updatetime", updatetime));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response = httpClient.execute(httpPost);
        String res= EntityUtils.toString(response.getEntity(), "utf-8");
        logger.info(res.toString());
        JSONObject resObj= JSONObject.parseObject(res);
        JSONArray jsonArray = (JSONArray)resObj.get("friends");
        List<Friend> friendList = (List<Friend>)JSONArray.parseArray(jsonArray.toString(), Friend.class);
//        Object objArr = resObj.get("friends");
//        objArr[2]
        return friendList;
    }

    /**
     * 云信API创建群组
     * @param tname 小组名称
     * @param ownerAccid 群主用户帐号
     * @param members 邀请的群成员列表accid Array
     * @return groupTid
     * @throws Exception
     */
    public String createGroup(String tname, String ownerAccid,String[] members) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "https://api.netease.im/nimserver/team/create.action";
        HttpPost httpPost = new HttpPost(url);

        curTime = String.valueOf((new Date()).getTime() / 1000L);
        String checkSum = CommonUtils.getCheckSum(yunxinConfig.getAppSecret(), yunxinConfig.getNonce() ,curTime);//参考 计算CheckSum的java代码

        // 设置请求的header
        httpPost.addHeader("AppKey", yunxinConfig.getAppKey());
        httpPost.addHeader("Nonce", yunxinConfig.getNonce());
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");

        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        //群名称，最大长度64字符
        nvps.add(new BasicNameValuePair("tname", tname));
        //群主用户帐号，最大长度32字符
        nvps.add(new BasicNameValuePair("owner", ownerAccid));
        //邀请的群成员列表accid Array
        if(members!=null) {
            String membersStr = CommonUtils.arrParseToStr(members);
            logger.info(membersStr);
            nvps.add(new BasicNameValuePair("members", membersStr));
        }else{
            nvps.add(new BasicNameValuePair("members", "[\"cc8291060r8ZOlC4Zuz5CI0lFPoEcVWG\"]"));
        }
        //邀请发送的文字，最大长度150字符
        nvps.add(new BasicNameValuePair("msg", "123"));
        //管理后台建群时，0不需要被邀请人同意加入群，1需要被邀请人同意才可以加入群。其它会返回414
        nvps.add(new BasicNameValuePair("magree", "0"));
        //群建好后，sdk操作时，0不用验证，1需要验证,2不允许任何人加入。其它返回414
        nvps.add(new BasicNameValuePair("joinmode", "0"));

        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response = httpClient.execute(httpPost);
        String res= EntityUtils.toString(response.getEntity(), "utf-8");
        JSONObject resObj= JSONObject.parseObject(res);
        String groupTid = (String)resObj.get("tid");
        return groupTid;
    }

    /**
     * 云信API加入群组
     * @param tid 小组名称
     * @param ownerAccid 群主用户帐号
     * @param members 邀请的群成员列表accid Array
     * @return groupTid
     * @throws Exception
     */
    public String joinGroup(String tid, String ownerAccid,String[] members) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "https://api.netease.im/nimserver/team/add.action";
        HttpPost httpPost = new HttpPost(url);

        curTime = String.valueOf((new Date()).getTime() / 1000L);
        String checkSum = CommonUtils.getCheckSum(yunxinConfig.getAppSecret(), yunxinConfig.getNonce() ,curTime);//参考 计算CheckSum的java代码

        // 设置请求的header
        httpPost.addHeader("AppKey", yunxinConfig.getAppKey());
        httpPost.addHeader("Nonce", yunxinConfig.getNonce());
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");

        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        //群名称，最大长度64字符
        nvps.add(new BasicNameValuePair("tid", tid));
        //群主用户帐号，最大长度32字符
        nvps.add(new BasicNameValuePair("owner", ownerAccid));
        //邀请的群成员列表accid Array
        if(members!=null) {
            logger.info(members[0]);
            String membersStr = CommonUtils.arrParseToStr(members);
            logger.info(membersStr);
            nvps.add(new BasicNameValuePair("members", membersStr));
        }
        //邀请发送的文字，最大长度150字符
        nvps.add(new BasicNameValuePair("msg", "请您加入活动群聊！"));
        //管理后台建群时，0不需要被邀请人同意加入群，1需要被邀请人同意才可以加入群。其它会返回414
        nvps.add(new BasicNameValuePair("magree", "0"));

        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response = httpClient.execute(httpPost);
        String res= EntityUtils.toString(response.getEntity(), "utf-8");
        JSONObject resObj= JSONObject.parseObject(res);
        String code = resObj.getString("code");
        logger.info("addGroupCode："+code);
        return code;
    }

//    /**
//     * 云信API退出群组
//     * @param tname 小组名称
//     * @param ownerAccid 群主用户帐号
//     * @param members 邀请的群成员列表accid Array
//     * @return groupTid
//     * @throws Exception
//     */
//    public String createGroup(String tname, String ownerAccid,String[] members) throws Exception {
//        DefaultHttpClient httpClient = new DefaultHttpClient();
//        String url = "https://api.netease.im/nimserver/team/create.action";
//        HttpPost httpPost = new HttpPost(url);
//
//        curTime = String.valueOf((new Date()).getTime() / 1000L);
//        String checkSum = CommonUtils.getCheckSum(yunxinConfig.getAppSecret(), yunxinConfig.getNonce() ,curTime);//参考 计算CheckSum的java代码
//
//        // 设置请求的header
//        httpPost.addHeader("AppKey", yunxinConfig.getAppKey());
//        httpPost.addHeader("Nonce", yunxinConfig.getNonce());
//        httpPost.addHeader("CurTime", curTime);
//        httpPost.addHeader("CheckSum", checkSum);
//        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");
//
//        // 设置请求的参数
//        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
//        //群名称，最大长度64字符
//        nvps.add(new BasicNameValuePair("tname", tname));
//        //群主用户帐号，最大长度32字符
//        nvps.add(new BasicNameValuePair("owner", ownerAccid));
//        //邀请的群成员列表accid Array
//        if(members!=null) {
//            String membersStr = CommonUtils.arrParseToStr(members);
//            logger.info(membersStr);
//            nvps.add(new BasicNameValuePair("members", membersStr));
//        }else{
//            nvps.add(new BasicNameValuePair("members", "[\"cc241999QwIUpM8nrnb0MCcKmsoPkDdF\"]"));
//        }
//        //邀请发送的文字，最大长度150字符
//        nvps.add(new BasicNameValuePair("msg", "123"));
//        //管理后台建群时，0不需要被邀请人同意加入群，1需要被邀请人同意才可以加入群。其它会返回414
//        nvps.add(new BasicNameValuePair("magree", "0"));
//        //群建好后，sdk操作时，0不用验证，1需要验证,2不允许任何人加入。其它返回414
//        nvps.add(new BasicNameValuePair("joinmode", "0"));
//
//        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));
//
//        // 执行请求
//        HttpResponse response = httpClient.execute(httpPost);
//        String res= EntityUtils.toString(response.getEntity(), "utf-8");
//        JSONObject resObj= JSONObject.parseObject(res);
//        String groupTid = (String)resObj.get("tid");
//        return groupTid;
//    }


}

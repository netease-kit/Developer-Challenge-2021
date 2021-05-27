package cn.ccsocial.service.impl;

import cn.ccsocial.config.YunxinConfig;
import cn.ccsocial.model.User;
import cn.ccsocial.utils.CommonUtils;
import cn.ccsocial.utils.RedisAPI;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.ccsocial.service.TokenService;
import cn.ccsocial.utils.DateUtil;
import cn.ccsocial.utils.MD5;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class TokenServiceImpl  implements TokenService {
    @Resource
    private RedisAPI redisAPI;
    @Autowired
    private YunxinConfig yunxinConfig;
    String curTime;
    DateUtil dateUtil;

    @Override
    public String generateTokenByRegister(String accid) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "http://api.netease.im/nimserver/user/create.action";
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
        nvps.add(new BasicNameValuePair("accid", accid));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response = httpClient.execute(httpPost);

        //保存token
        String strResObj= EntityUtils.toString(response.getEntity(), "utf-8");
        JSONObject resObj = JSONObject.parseObject(strResObj);
        String token = resObj.getJSONObject("info").get("token").toString();
        redisAPI.set(accid,token);
        return token;
    }

    @Override
    public String generateTokenByLogin(String accid) throws Exception {

        DefaultHttpClient httpClient = new DefaultHttpClient();
        String url = "http://api.netease.im/nimserver/user/refreshToken.action";
        HttpPost httpPost = new HttpPost(url);

        curTime = String.valueOf((new Date()).getTime() / 1000L);
        System.out.println(yunxinConfig.getAppSecret()+ yunxinConfig.getNonce() +curTime);
        String checkSum = CommonUtils.getCheckSum(yunxinConfig.getAppSecret(), yunxinConfig.getNonce() ,curTime);//参考 计算CheckSum的java代码

        // 设置请求的header
        httpPost.addHeader("AppKey", yunxinConfig.getAppKey());
        httpPost.addHeader("Nonce", yunxinConfig.getNonce());
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // 设置请求的参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("accid", accid));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

        // 执行请求
        HttpResponse response = httpClient.execute(httpPost);

        String strResObj=EntityUtils.toString(response.getEntity(), "utf-8");
        JSONObject resObj= JSONObject.parseObject(strResObj);
        String token = resObj.getJSONObject("info").get("token").toString();
        redisAPI.set(accid,token);
        return token;
    }

    @Override
    // pc-32位加密的用户名-用户id-年月日时分 秒-6位随机数
    // 前缀 PC-NAME-USERID-CREATIONDATE-RONDEM(6位)
    // 生成token
    public String generateToken(User user) throws Exception {
        StringBuilder  str=new StringBuilder();
        str.append("token:");

        str.append(MD5.getMd5(user.getUserName(),32)+"-");
        str.append(user.getUserPhone().toString()+"-");
        str.append(dateUtil.TimeToStamp(dateUtil.getFileTime()));
        str.append(MD5.getMd5(user.getUserPhone(),6));

        return str.toString();
    }
    @Override
// 保存token信息
    public void save(String accid,String token) throws Exception {
            redisAPI.set(accid,token);
    }

    @Override
    public boolean validate(String userAgent, String token) throws Exception {
        String agentMd5 = token.split("-")[4];
        if(!redisAPI.exists(token)){
            return false;
        }else if(!MD5.getMd5(userAgent,6).equals(agentMd5)){
            return false;
        }
        return true;
    } }
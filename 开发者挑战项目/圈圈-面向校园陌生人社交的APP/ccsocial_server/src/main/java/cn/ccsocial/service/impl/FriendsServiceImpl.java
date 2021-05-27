package cn.ccsocial.service.impl;

import cn.ccsocial.mapper.FriendMapper;
import cn.ccsocial.mapper.UserMapper;
import cn.ccsocial.model.Friend;
import cn.ccsocial.model.FriendRelationship;
import cn.ccsocial.model.User;
import cn.ccsocial.service.FriendService;
import cn.ccsocial.utils.CommonUtils;
import cn.ccsocial.utils.DateUtil;
import cn.ccsocial.utils.YunxinAPI;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service
public class FriendsServiceImpl implements FriendService {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(FriendsServiceImpl.class);
    @Resource
    private YunxinAPI yunxinAPI;
    @Resource
    private UserMapper userMapper;
    @Resource
    private FriendMapper friendMapper;

    @Override
    public List<User> getFriendList(String userCcid) throws Exception{
        User user = userMapper.selectByCcid(userCcid);
        if(user!=null) {
            String accid = user.getUserAccid();
            String createTime = user.getUserCreateTime();
            List<Friend> friendList = yunxinAPI.getFriends(accid, createTime);
            List<User> friendsUserList = userMapper.selectByFaccids(friendList);
            return friendsUserList;
        }else {
            return null;
        }
    }

    @Override
    public int sendFriendApply(String userCcid,String friendCcid,String msg) throws Exception{
        if(friendMapper.getFriendRelationship(userCcid,friendCcid) == null) {
            String accid = userMapper.selectAccidByCcid(userCcid);
            String fccid = userMapper.selectAccidByCcid(friendCcid);
            //调用云信API的发送好友请求接口
            yunxinAPI.addFriend(accid,fccid,"2",msg);
            return 1;
        }else {
            return -1;
        }
    }

    @Override
    public int addFriend(String userAccid,String friendAccid,int type,String msg)throws Exception{
            //调用云信API的发送好友请求接口
            if(type==1) {
                //通过好友申请
                yunxinAPI.addFriend(userAccid, friendAccid, "3", msg);
                String nowTime = DateUtil.getTime();
                String friendCreateTime = DateUtil.TimeToStamp(nowTime);
                int res = friendMapper.addFriendByAccid(userAccid,friendAccid,friendCreateTime);
                logger.info("res:"+String.valueOf(res));
                return res;
            }else{
                //拒绝好友申请
                yunxinAPI.addFriend(userAccid, friendAccid, "4", msg);
                return 2;
            }
    }

    @Override
    public String delFriend(String userAccid,String friendAccid)throws Exception{
        //调用云信API的删除好友接口
            //通过好友申请
            String code = yunxinAPI.delFriend(userAccid, friendAccid);
            int res = friendMapper.delFriendByAccid(userAccid,friendAccid);
            logger.info("deleteFriend：code："+code+"res:"+String.valueOf(res));
            return code;
    }
}
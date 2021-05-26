package cn.ccsocial.service;

import cn.ccsocial.model.User;

import java.util.List;
import java.util.Map;

public interface FriendService {
    /**
     * 获取好友列表
     * @param userCcid
     * @return
     */
    List<User> getFriendList(String userCcid) throws Exception;

    /**
     * 发送添加好友申请
     * 添加成功返回1 已经是好友返回-1
     * @param userCcid
     * @param friendCcid
     * @param msg 申请信息
     * @return
     */
    int sendFriendApply(String userCcid,String friendCcid,String msg) throws Exception;

    /**
     * 添加好友
     * @param userAccid
     * @param friendAccid
     * @return 1通过 2拒绝 -1错误
     */
    int addFriend(String userAccid,String friendAccid,int type,String msg) throws Exception;

    /**
     * 删除好友
     * @param userAccid
     * @param friendAccid
     * @return 1通过 2拒绝 -1错误
     */
    String delFriend(String userAccid,String friendAccid) throws Exception;
}
